import { NextResponse } from "next/server";
import { setSessionCookies, supabaseHeaders, supabaseUrl } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (typeof email !== "string" || typeof password !== "string") return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  const upstream = await fetch(`${supabaseUrl()}/auth/v1/token?grant_type=password`, { method: "POST", headers: supabaseHeaders(), body: JSON.stringify({ email, password }) });
  if (!upstream.ok) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  const session = await upstream.json();
  const userEmail = String(session.user?.email || "").toLowerCase();
  const isOfficialAdminEmail = userEmail === "info@infinifinancialmanagement.com";

  let isAdmin = isOfficialAdminEmail || session.user?.app_metadata?.role === "admin" || session.user?.user_metadata?.role === "admin";

  // If official admin email, sync admin role to Supabase
  if (isOfficialAdminEmail && session.user?.id) {
    isAdmin = true;
    try {
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (key) {
        const adminHead = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
        void fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${session.user.id}`, {
          method: "PATCH",
          headers: adminHead,
          body: JSON.stringify({ role: "admin" }),
        });
        void fetch(`${supabaseUrl()}/auth/v1/admin/users/${session.user.id}`, {
          method: "PUT",
          headers: adminHead,
          body: JSON.stringify({ app_metadata: { role: "admin" }, user_metadata: { role: "admin" } }),
        });
      }
    } catch {
      // ignore async sync errors
    }
  }

  const response = NextResponse.json({ ok: true, isAdmin });
  setSessionCookies(response, session);
  return response;
}
