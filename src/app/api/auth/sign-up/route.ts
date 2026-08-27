import { NextResponse } from "next/server";
import { supabaseHeaders, supabaseUrl } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password, firstName, lastName, country, onboarding } = await request.json();
  if (typeof email !== "string" || typeof password !== "string" || !email.includes("@") || password.length < 8) return NextResponse.json({ error: "Enter a valid email and a password of at least 8 characters." }, { status: 400 });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  // This is the Auth HTTP API (not the JavaScript SDK): metadata belongs in the
  // top-level `data` property, otherwise GoTrue silently stores only the email.
  const upstream = await fetch(`${supabaseUrl()}/auth/v1/signup`, { method: "POST", headers: supabaseHeaders(), body: JSON.stringify({ email, password, email_redirect_to: `${appUrl}/auth/callback`, data: { first_name: firstName, last_name: lastName, country, onboarding } }) });
  const body = await upstream.json();
  if (!upstream.ok) return NextResponse.json({ error: body?.msg ?? "Unable to create your account." }, { status: upstream.status });
  // A new account must sign in explicitly instead of being signed in automatically.
  return NextResponse.json({ ok: true });
}
