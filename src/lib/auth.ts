import { cookies } from "next/headers";

const accessCookie = "infini-access-token";
const refreshCookie = "infini-refresh-token";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Add it to .env.local.`);
  return value;
}

export function supabaseUrl() {
  return required("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
}

export function supabaseAnonKey() {
  return required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function serviceRoleKey() {
  return required("SUPABASE_SERVICE_ROLE_KEY");
}

export function supabaseHeaders(token = supabaseAnonKey()) {
  return { apikey: supabaseAnonKey(), Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export function setSessionCookies(response: Response, session: { access_token: string; refresh_token: string; expires_in?: number }) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const maxAge = session.expires_in ?? 60 * 60;
  response.headers.append("Set-Cookie", `${accessCookie}=${encodeURIComponent(session.access_token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax; HttpOnly${secure}`);
  response.headers.append("Set-Cookie", `${refreshCookie}=${encodeURIComponent(session.refresh_token)}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly${secure}`);
}

export function clearSessionCookies(response: Response) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append("Set-Cookie", `${accessCookie}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly${secure}`);
  response.headers.append("Set-Cookie", `${refreshCookie}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly${secure}`);
}

export async function currentAccessToken() {
  return (await cookies()).get(accessCookie)?.value;
}

export async function getCurrentUser() {
  const token = await currentAccessToken();
  if (!token) return null;
  const response = await fetch(`${supabaseUrl()}/auth/v1/user`, { headers: supabaseHeaders(token), cache: "no-store" });
  return response.ok ? response.json() : null;
}
