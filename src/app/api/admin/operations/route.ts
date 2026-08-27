import { NextResponse } from "next/server";
import { adminHeaders, requireAdmin } from "@/lib/operations";
import { supabaseUrl } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const response = await fetch(`${supabaseUrl()}/rest/v1/service_requests?status=eq.pending&select=*&order=created_at.asc`, { headers: adminHeaders(), cache: "no-store" });
    const data = await response.json();
    const requests = Array.isArray(data) ? data : [];
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error && error.message === "FORBIDDEN" ? "Administrator access required." : "Sign in to continue." }, { status: 403 });
  }
}
