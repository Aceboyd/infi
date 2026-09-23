import { NextResponse } from "next/server";
import { requestSupabaseAuth } from "@/lib/auth-request";

export async function POST(request: Request) {
  const { email, password, firstName, lastName, country, onboarding } = (await request.json().catch(() => null)) ?? {};
  if (typeof email !== "string" || typeof password !== "string" || !email.includes("@") || password.length < 8) return NextResponse.json({ error: "Enter a valid email and a password of at least 8 characters." }, { status: 400 });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  // This is the Auth HTTP API (not the JavaScript SDK): metadata belongs in the
  // top-level `data` property, otherwise GoTrue silently stores only the email.
  const result = await requestSupabaseAuth("signup", { email: email.trim(), password, email_redirect_to: `${appUrl}/auth/callback`, data: { first_name: firstName, last_name: lastName, country, onboarding } });
  if (result.error) return result.error;
  // A new account must sign in explicitly instead of being signed in automatically.
  return NextResponse.json({ ok: true });
}
