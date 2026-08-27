import { NextResponse } from "next/server";
import { currentAccessToken, supabaseHeaders, supabaseUrl } from "@/lib/auth";

export async function PUT(request: Request) {
  const { password } = await request.json();
  if (typeof password !== "string" || password.length < 8) return NextResponse.json({ error: "Use a password of at least 8 characters." }, { status: 400 });
  const token = await currentAccessToken();
  if (!token) return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
  const upstream = await fetch(`${supabaseUrl()}/auth/v1/user`, { method: "PUT", headers: supabaseHeaders(token), body: JSON.stringify({ password }) });
  if (!upstream.ok) return NextResponse.json({ error: "We couldn't update your password. Please try again." }, { status: upstream.status });
  return NextResponse.json({ ok: true });
}
