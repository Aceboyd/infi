import { NextResponse } from "next/server";
import { setSessionCookies } from "@/lib/auth";

export async function POST(request: Request) {
  const { access_token, refresh_token, expires_in } = await request.json();
  if (![access_token, refresh_token].every((value) => typeof value === "string")) return NextResponse.json({ error: "Invalid recovery session." }, { status: 400 });
  const response = NextResponse.json({ ok: true });
  setSessionCookies(response, { access_token, refresh_token, expires_in });
  return response;
}
