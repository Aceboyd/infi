import { NextResponse } from "next/server";
import { adminHeaders, requireAdmin } from "@/lib/operations";
import { supabaseUrl } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const headers = adminHeaders();

    const [authRes, profilesResponse, accountsResponse] = await Promise.all([
      fetch(`${supabaseUrl()}/auth/v1/admin/users`, { headers, cache: "no-store" }),
      fetch(`${supabaseUrl()}/rest/v1/profiles?select=*&order=created_at.desc`, { headers, cache: "no-store" }),
      fetch(`${supabaseUrl()}/rest/v1/accounts?select=*`, { headers, cache: "no-store" }),
    ]);

    const authData = authRes.ok ? await authRes.json() : null;
    const authUsers = Array.isArray(authData?.users) ? authData.users : [];

    const profiles = profilesResponse.ok ? await profilesResponse.json() : [];
    const accounts = accountsResponse.ok ? await accountsResponse.json() : [];

    const accountsByUserId = new Map<string, Record<string, unknown>>();
    if (Array.isArray(accounts)) {
      for (const acct of accounts) {
        if (acct.user_id) {
          accountsByUserId.set(String(acct.user_id), acct as Record<string, unknown>);
        }
      }
    }

    const userMap = new Map<string, Record<string, unknown>>();

    // 1. Add all registered users from Supabase Auth admin API
    for (const au of authUsers) {
      const uId = String(au.id);
      const meta = (au.user_metadata as Record<string, unknown>) || {};
      const appMeta = (au.app_metadata as Record<string, unknown>) || {};
      userMap.set(uId, {
        id: uId,
        email: String(au.email || ""),
        first_name: String(meta.first_name || ""),
        last_name: String(meta.last_name || ""),
        country: String(meta.country || ""),
        role: String(appMeta.role || meta.role || "user"),
        created_at: String(au.created_at || new Date().toISOString()),
        onboarding: meta.onboarding || {},
      });
    }

    // 2. Add or merge profiles table rows
    if (Array.isArray(profiles)) {
      for (const p of profiles) {
        const pId = String(p.id);
        const existing = userMap.get(pId) || {};
        userMap.set(pId, {
          ...existing,
          id: pId,
          email: String(p.email || existing.email || ""),
          first_name: String(p.first_name || existing.first_name || ""),
          last_name: String(p.last_name || existing.last_name || ""),
          country: String(p.country || existing.country || ""),
          role: String(p.role || existing.role || "user"),
          created_at: String(p.created_at || existing.created_at || new Date().toISOString()),
          onboarding: p.onboarding || existing.onboarding || {},
        });
      }
    }

    // 3. Map final list with account balances
    const users = Array.from(userMap.values()).map((user) => {
      const uId = String(user.id);
      const acct = accountsByUserId.get(uId) || {};
      const onboarding = (user.onboarding as Record<string, unknown>) || {};

      return {
        id: uId,
        email: String(user.email || ""),
        first_name: String(user.first_name || ""),
        last_name: String(user.last_name || ""),
        country: String(user.country || ""),
        role: String(user.email || "").toLowerCase() === "info@infinifinancialmanagement.com" || user.role === "admin" ? "admin" : String(user.role || "user"),
        created_at: String(user.created_at || new Date().toISOString()),
        account_id: acct.id || null,
        available_balance: Number(acct.available_balance ?? 0),
        credit_limit: Number(acct.credit_limit ?? 0),
        kyc_status: String(acct.kyc_status ?? "not_started"),
        currency: String(acct.currency ?? "USD"),
        invested_balance: Number(onboarding.invested_balance ?? 0),
        total_profit: Number(onboarding.total_profit ?? 0),
        bonus_balance: Number(onboarding.bonus_balance ?? 0),
        account_tier: String(onboarding.account_tier ?? "Standard"),
        admin_message: String(onboarding.admin_message ?? ""),
      };
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error && error.message === "FORBIDDEN" ? "Administrator access required." : "Sign in to continue." },
      { status: 403 }
    );
  }
}
