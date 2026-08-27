import { NextResponse } from "next/server";
import { adminHeaders, requireAdmin } from "@/lib/operations";
import { supabaseUrl } from "@/lib/auth";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdmin();
    const { id } = await context.params;
    const { decision, note } = await request.json();
    if (decision !== "approved" && decision !== "rejected") return NextResponse.json({ error: "Invalid decision." }, { status: 400 });

    const headers = adminHeaders();

    // 1. Try RPC stored procedure first
    try {
      const rpcRes = await fetch(`${supabaseUrl()}/rest/v1/rpc/review_service_request`, {
        method: "POST",
        headers,
        body: JSON.stringify({ request_id: id, decision, note: typeof note === "string" ? note : null, reviewer_id: admin.id }),
      });
      if (rpcRes.ok) {
        const body = await rpcRes.json();
        return NextResponse.json({ request: body });
      }
    } catch {
      // fallback to REST
    }

    // 2. Direct REST update fallback
    const reqRes = await fetch(`${supabaseUrl()}/rest/v1/service_requests?id=eq.${id}&select=*&limit=1`, { headers, cache: "no-store" });
    const reqData = reqRes.ok ? await reqRes.json() : [];
    const targetReq = reqData[0] ?? null;

    if (!targetReq) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    // Update service_requests status
    await fetch(`${supabaseUrl()}/rest/v1/service_requests?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        status: decision,
        admin_note: typeof note === "string" ? note : null,
        updated_at: new Date().toISOString(),
      }),
    });

    // Financial side effects upon decision
    if (targetReq.user_id && targetReq.amount && Number(targetReq.amount) > 0) {
      const amt = Number(targetReq.amount);
      const acctRes = await fetch(`${supabaseUrl()}/rest/v1/accounts?user_id=eq.${targetReq.user_id}&select=*&limit=1`, { headers, cache: "no-store" });
      const acctData = acctRes.ok ? await acctRes.json() : [];
      const acct = acctData[0] ?? null;

      if (acct) {
        if (decision === "approved") {
          if (targetReq.kind === "loan" || targetReq.kind === "deposit") {
            // Add to available balance
            const newBal = Number(acct.available_balance ?? 0) + amt;
            await fetch(`${supabaseUrl()}/rest/v1/accounts?id=eq.${acct.id}`, {
              method: "PATCH",
              headers,
              body: JSON.stringify({ available_balance: newBal }),
            });
          } else if (targetReq.kind === "credit") {
            // Increase credit limit
            const newCredit = Number(acct.credit_limit ?? 0) + amt;
            await fetch(`${supabaseUrl()}/rest/v1/accounts?id=eq.${acct.id}`, {
              method: "PATCH",
              headers,
              body: JSON.stringify({ credit_limit: newCredit }),
            });
          }
        } else if (decision === "rejected" && targetReq.kind === "withdrawal") {
          // Refund deducted withdrawal amount back to available balance
          const refundedBal = Number(acct.available_balance ?? 0) + amt;
          await fetch(`${supabaseUrl()}/rest/v1/accounts?id=eq.${acct.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ available_balance: refundedBal }),
          });
        }
      }
    }

    return NextResponse.json({ request: { ...targetReq, status: decision } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error && error.message === "FORBIDDEN" ? "Administrator access required." : "Sign in to continue." }, { status: 403 });
  }
}
