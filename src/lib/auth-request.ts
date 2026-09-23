import { NextResponse } from "next/server";
import { supabaseHeaders, supabaseUrl } from "@/lib/auth";

type AuthResult<T> = { data: T; error: null } | { data: null; error: NextResponse };

const unavailable = "The sign-in service is temporarily unavailable. Please try again shortly.";

export async function requestSupabaseAuth<T>(path: string, payload: Record<string, unknown>): Promise<AuthResult<T>> {
  try {
    const response = await fetch(`${supabaseUrl()}/auth/v1/${path}`, {
      method: "POST",
      headers: supabaseHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const code = typeof body?.error_code === "string" ? body.error_code : "auth_request_failed";
      const message = [body?.msg, body?.error_description, body?.message, body?.error]
        .find((value): value is string => typeof value === "string" && value.length > 0);
      console.error("[auth] Supabase rejected request", { path, status: response.status, code });

      let status = response.status;
      let error = message ?? "Unable to complete your request. Please try again.";
      if (response.status >= 500) {
        status = 503;
        error = unavailable;
      } else if (response.status === 429) {
        error = "Too many attempts. Please wait a few minutes and try again.";
      } else if (code === "invalid_credentials") {
        status = 401;
        error = "Invalid email or password.";
      } else if (code === "email_not_confirmed") {
        error = "Please confirm your email address before signing in. Check your inbox for the confirmation link.";
      }

      return { data: null, error: NextResponse.json({ error, code }, { status }) };
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      console.error("[auth] Invalid Supabase response", { path, status: response.status });
      return { data: null, error: NextResponse.json({ error: unavailable, code: "invalid_auth_response" }, { status: 502 }) };
    }

    return { data: body as T, error: null };
  } catch (error) {
    // Keep passwords, tokens and request bodies out of authentication logs.
    console.error("[auth] Supabase request failed", { path, reason: error instanceof Error ? error.name : "UnknownError" });
    return { data: null, error: NextResponse.json({ error: unavailable, code: "auth_service_unavailable" }, { status: 503 }) };
  }
}
