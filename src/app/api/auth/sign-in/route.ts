import { NextResponse } from "next/server";
import { setSessionCookies, supabaseUrl } from "@/lib/auth";
import { requestSupabaseAuth } from "@/lib/auth-request";
import { getUserRole, type AuthenticatedUser } from "@/lib/operations";

type SignInSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user: AuthenticatedUser;
};

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => null)) ?? {};
  if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  const result = await requestSupabaseAuth<SignInSession>("token?grant_type=password", { email: email.trim(), password });
  if (result.error) return result.error;
  const session = result.data;
  if (typeof session.access_token !== "string" || typeof session.refresh_token !== "string" || !session.user?.id) {
    return NextResponse.json({ error: "Unable to start your session. Please try again.", code: "invalid_auth_response" }, { status: 502 });
  }
  const userEmail = String(session.user?.email || "").toLowerCase();
  const isOfficialAdminEmail = userEmail === "info@infinifinancialmanagement.com";

  // If official admin email, sync admin role to Supabase
  if (isOfficialAdminEmail && session.user?.id) {
    try {
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (key) {
        const adminHead = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
        void fetch(`${supabaseUrl()}/rest/v1/profiles?id=eq.${session.user.id}`, {
          method: "PATCH",
          headers: adminHead,
          body: JSON.stringify({ role: "admin" }),
        }).catch(() => {});
        void fetch(`${supabaseUrl()}/auth/v1/admin/users/${session.user.id}`, {
          method: "PUT",
          headers: adminHead,
          body: JSON.stringify({ app_metadata: { role: "admin" } }),
        }).catch(() => {});
      }
    } catch {
      // ignore async sync errors
    }
  }

  const isAdmin = session.user ? (await getUserRole(session.user)) === "admin" : false;
  const response = NextResponse.json({ ok: true, isAdmin });
  setSessionCookies(response, session);
  return response;
}
