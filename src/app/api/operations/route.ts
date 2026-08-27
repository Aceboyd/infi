import { NextResponse } from "next/server";
import { adminHeaders, currentUserOrThrow } from "@/lib/operations";
import { supabaseUrl } from "@/lib/auth";

const requestTypes = new Set([
  "deposit",
  "withdrawal",
  "kyc",
  "loan",
  "credit",
  "card",
  "crypto",
  "stocks",
  "tech",
  "ai",
  "thc",
  "real-estate",
  "oil-drilling",
  "agritech",
  "forex",
  "rare-metals",
  "sector_investment",
]);

export async function GET() {
  try {
    const user = await currentUserOrThrow();
    const headers = adminHeaders();
    const [accountResponse, profileResponse, requestsResponse] = await Promise.all([
      fetch(`${supabaseUrl()}/rest/v1/accounts?user_id=eq.${user.id}&select=*&limit=1`, { headers, cache: "no-store" }),
      fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${user.id}&select=*&limit=1`, { headers, cache: "no-store" }),
      fetch(`${supabaseUrl()}/rest/v1/service_requests?user_id=eq.${user.id}&select=*&order=created_at.desc&limit=15`, { headers, cache: "no-store" }),
    ]);

    const [accountsData, profileData, requestsData] = await Promise.all([
      accountResponse.json(),
      profileResponse.json(),
      requestsResponse.json(),
    ]);

    const accounts = Array.isArray(accountsData) ? accountsData : [];
    const profiles = Array.isArray(profileData) ? profileData : [];
    const requests = Array.isArray(requestsData) ? requestsData : [];

    const rawAccount = accounts[0] ?? null;
    const profile = profiles[0] ?? null;
    const userMetaOnboarding = (user.user_metadata?.onboarding as Record<string, unknown>) || {};
    const profileOnboarding = (profile?.onboarding as Record<string, unknown>) || {};
    const onboarding = { ...profileOnboarding, ...userMetaOnboarding };

    const account = rawAccount
      ? {
          ...rawAccount,
          email: user.email || profile?.email || rawAccount.email || "",
          invested_balance: Number(onboarding.invested_balance ?? 0),
          total_profit: Number(onboarding.total_profit ?? 0),
          bonus_balance: Number(onboarding.bonus_balance ?? 0),
          account_tier: String(onboarding.account_tier ?? "Standard"),
          admin_message: String(onboarding.admin_message ?? ""),
        }
      : {
          user_id: user.id,
          email: user.email || profile?.email || "",
          available_balance: 0,
          currency: "USD",
          kyc_status: "not_started",
          credit_limit: 0,
        };

    const transactionResponse = rawAccount
      ? await fetch(`${supabaseUrl()}/rest/v1/account_transactions?account_id=eq.${rawAccount.id}&select=*&order=created_at.desc&limit=15`, { headers, cache: "no-store" })
      : null;

    const transactionsData = transactionResponse?.ok ? await transactionResponse.json() : [];
    const dbTransactions = Array.isArray(transactionsData) ? transactionsData : [];

    // Synthesize pending requests into transactions so withdrawal, deposit & loan requests always show up in transaction history!
    const syntheticTxFromRequests = requests.map((req) => {
      const direction = req.kind === "withdrawal" ? "debit" : "credit";
      const statusText = req.status === "approved" ? "APPROVED" : req.status === "rejected" ? "REJECTED" : "PENDING APPROVAL";
      return {
        id: req.id,
        account_id: rawAccount?.id || user.id,
        direction,
        amount: Number(req.amount ?? 0),
        description: `${req.kind.toUpperCase()} Request — [${statusText}]`,
        created_at: req.created_at || new Date().toISOString(),
      };
    });

    const allTx = [...dbTransactions];
    const existingIds = new Set(dbTransactions.map((t) => t.id));

    for (const syn of syntheticTxFromRequests) {
      if (!existingIds.has(syn.id)) {
        allTx.push(syn);
      }
    }

    allTx.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ account, requests, transactions: allTx, profile });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error && error.message === "UNAUTHORIZED" ? "Sign in to continue." : "Unable to load your account." },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUserOrThrow();
    const { kind, amount, details } = await request.json();
    if (!requestTypes.has(kind)) return NextResponse.json({ error: "Invalid request type." }, { status: 400 });
    const parsedAmount = amount === "" || amount === undefined || amount === null ? null : Number(amount);

    const headers = adminHeaders();

    // Fetch user account details
    const accountRes = await fetch(`${supabaseUrl()}/rest/v1/accounts?user_id=eq.${user.id}&select=*&limit=1`, { headers, cache: "no-store" });
    const accountData = accountRes.ok ? await accountRes.json() : [];
    const account = accountData[0] ?? null;

    // --- WITHDRAWAL SPECIFIC LOGIC ---
    if (kind === "withdrawal") {
      if (!parsedAmount || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        return NextResponse.json({ error: "Please enter a valid withdrawal amount." }, { status: 400 });
      }

      const availableBal = Number(account?.available_balance ?? 0);
      if (parsedAmount > availableBal) {
        return NextResponse.json(
          { error: `Insufficient available balance. Your balance is $${availableBal.toLocaleString("en-US", { minimumFractionDigits: 2 })}.` },
          { status: 400 }
        );
      }

      // Deduct balance from user account
      if (account) {
        const newBal = Math.max(0, availableBal - parsedAmount);
        await fetch(`${supabaseUrl()}/rest/v1/accounts?id=eq.${account.id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ available_balance: newBal, updated_at: new Date().toISOString() }),
        });
      }
    }

    // --- CREDIT / LOAN / OTHER FINANCIAL AMOUNTS VALIDATION ---
    if (
      ["loan", "credit", "crypto", "stocks", "tech", "ai", "thc", "real-estate", "oil-drilling", "agritech", "forex", "rare-metals", "sector_investment"].includes(kind) &&
      amount !== "" && amount !== undefined && amount !== null &&
      (!Number.isFinite(parsedAmount) || (parsedAmount ?? 0) <= 0)
    ) {
      return NextResponse.json({ error: "Enter a valid amount." }, { status: 400 });
    }

    // 1. Create service_requests record
    let createdReq = null;
    try {
      const response = await fetch(`${supabaseUrl()}/rest/v1/service_requests`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          user_id: user.id,
          kind,
          amount: parsedAmount,
          details: typeof details === "object" && details ? details : {},
          status: "pending",
        }),
      });

      if (response.ok) {
        const body = await response.json();
        createdReq = Array.isArray(body) ? body[0] : body;
      }
    } catch {
      // fallback
    }

    // 2. Insert into account_transactions so it immediately shows in transaction history as pending
    if (account?.id) {
      const directionMap: Record<string, string> = {
        withdrawal: "debit",
        deposit: "credit",
        loan: "credit",
        credit: "credit",
      };
      const direction = directionMap[kind] || "credit";
      const txDesc = `${kind.toUpperCase()} Request — [PENDING APPROVAL]`;

      await fetch(`${supabaseUrl()}/rest/v1/account_transactions`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          account_id: account.id,
          direction,
          amount: parsedAmount ?? 0,
          description: txDesc,
        }),
      });
    }

    return NextResponse.json(
      {
        success: true,
        request: createdReq || { id: Date.now().toString(), user_id: user.id, kind, amount: parsedAmount, status: "pending" },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Sign in to continue." }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await currentUserOrThrow();
    const { currency } = await request.json();
    if (!currency || !["USD", "EUR", "GBP", "JPY"].includes(currency)) {
      return NextResponse.json({ error: "Invalid currency choice." }, { status: 400 });
    }

    const headers = adminHeaders();
    await fetch(`${supabaseUrl()}/rest/v1/accounts?user_id=eq.${user.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ currency }),
    });

    return NextResponse.json({ success: true, currency });
  } catch {
    return NextResponse.json({ error: "Failed to update currency." }, { status: 400 });
  }
}
