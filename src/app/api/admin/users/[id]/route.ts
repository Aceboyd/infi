import { NextResponse } from "next/server";
import { adminHeaders, requireAdmin, syncUserRole } from "@/lib/operations";
import { supabaseUrl } from "@/lib/auth";

type ParamsPromise = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: ParamsPromise) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await request.json();

    const {
      available_balance,
      credit_limit,
      invested_balance,
      total_profit,
      bonus_balance,
      kyc_status,
      account_tier,
      currency,
      admin_message,
      transaction,
    } = body;

    const headers = adminHeaders();

    // 1. Fetch current profile & account
    const [profileRes, accountRes] = await Promise.all([
      fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${id}&select=*&limit=1`, { headers, cache: "no-store" }),
      fetch(`${supabaseUrl()}/rest/v1/accounts?user_id=eq.${id}&select=*&limit=1`, { headers, cache: "no-store" }),
    ]);

    const profileData = profileRes.ok ? await profileRes.json() : [];
    const accountData = accountRes.ok ? await accountRes.json() : [];

    let profile = profileData[0];
    let account = accountData[0];

    // If profile or account missing in REST tables, upsert automatically using auth admin details
    if (!profile) {
      const authUserRes = await fetch(`${supabaseUrl()}/auth/v1/admin/users/${id}`, { headers, cache: "no-store" });
      const authUserData = authUserRes.ok ? await authUserRes.json() : null;
      const meta = authUserData?.user_metadata || {};
      const newProfileRes = await fetch(`${supabaseUrl()}/rest/v1/profiles`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          id,
          email: authUserData?.email || "",
          first_name: meta.first_name || "",
          last_name: meta.last_name || "",
          country: meta.country || "",
          role: "user",
          onboarding: meta.onboarding || {},
        }),
      });
      profile = newProfileRes.ok ? (await newProfileRes.json())[0] : { id, onboarding: {} };
    }

    if (!account) {
      const newAcctRes = await fetch(`${supabaseUrl()}/rest/v1/accounts`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          user_id: id,
          available_balance: available_balance !== undefined ? Number(available_balance) : 0,
          credit_limit: credit_limit !== undefined ? Number(credit_limit) : 0,
          kyc_status: kyc_status || "not_started",
          currency: currency || "USD",
        }),
      });
      account = newAcctRes.ok ? (await newAcctRes.json())[0] : null;
    }

    // 2. Update account fields if provided
    const accountUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (available_balance !== undefined && Number.isFinite(Number(available_balance))) {
      accountUpdates.available_balance = Number(available_balance);
    }
    if (credit_limit !== undefined && Number.isFinite(Number(credit_limit))) {
      accountUpdates.credit_limit = Number(credit_limit);
    }
    if (kyc_status !== undefined && typeof kyc_status === "string") {
      accountUpdates.kyc_status = kyc_status;
    }
    if (currency !== undefined && typeof currency === "string" && currency.trim() !== "") {
      accountUpdates.currency = currency.toUpperCase();
    }

    if (account && Object.keys(accountUpdates).length > 1) {
      await fetch(`${supabaseUrl()}/rest/v1/accounts?id=eq.${account.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(accountUpdates),
      });
    }

    // 3. Update onboarding metadata in Supabase Auth & public.profiles
    const { role } = body;
    const authUserRes = await fetch(`${supabaseUrl()}/auth/v1/admin/users/${id}`, { headers, cache: "no-store" });
    const authUserData = authUserRes.ok ? await authUserRes.json() : null;

    const currentMeta = (authUserData?.user_metadata as Record<string, unknown>) || {};
    const currentOnboarding = (currentMeta.onboarding as Record<string, unknown>) || (profile?.onboarding as Record<string, unknown>) || {};

    const updatedOnboarding: Record<string, unknown> = {
      ...currentOnboarding,
      invested_balance: invested_balance !== undefined ? Number(invested_balance) : currentOnboarding.invested_balance ?? 0,
      total_profit: total_profit !== undefined ? Number(total_profit) : currentOnboarding.total_profit ?? 0,
      bonus_balance: bonus_balance !== undefined ? Number(bonus_balance) : currentOnboarding.bonus_balance ?? 0,
      account_tier: account_tier !== undefined ? String(account_tier) : currentOnboarding.account_tier ?? "Standard",
      admin_message: admin_message !== undefined ? String(admin_message) : currentOnboarding.admin_message ?? "",
    };

    // Update Supabase Auth metadata (always succeeds)
    await fetch(`${supabaseUrl()}/auth/v1/admin/users/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        user_metadata: {
          ...currentMeta,
          onboarding: updatedOnboarding,
        },
      }),
    });

    // Also attempt REST profile update
    const profilePatch: Record<string, unknown> = {
      onboarding: updatedOnboarding,
      updated_at: new Date().toISOString(),
    };

    if (role && (role === "admin" || role === "user")) {
      profilePatch.role = role;
      await syncUserRole(id, role);
    }

    try {
      await fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(profilePatch),
      });
    } catch {
      // ignore
    }

    // 4. Inject optional transaction if requested by admin
    if (account && transaction && typeof transaction === "object") {
      const txAmount = Number(transaction.amount);
      const txDirection = transaction.direction === "debit" ? "debit" : "credit";
      const txDesc = String(transaction.description || "Admin Account Adjustment");

      if (Number.isFinite(txAmount) && txAmount > 0) {
        await fetch(`${supabaseUrl()}/rest/v1/account_transactions`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            account_id: account.id,
            direction: txDirection,
            amount: txAmount,
            description: txDesc,
          }),
        });

        // Also adjust available balance automatically if transaction was added
        if (available_balance === undefined) {
          const newBal = txDirection === "credit" ? Number(account.available_balance) + txAmount : Math.max(0, Number(account.available_balance) - txAmount);
          await fetch(`${supabaseUrl()}/rest/v1/accounts?id=eq.${account.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ available_balance: newBal }),
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: "User account updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update user account." },
      { status: 500 }
    );
  }
}
