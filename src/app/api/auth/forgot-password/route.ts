import { NextResponse } from "next/server";
import { passwordResetEmail } from "@/lib/email";
import { serviceRoleKey, supabaseUrl } from "@/lib/auth";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const serviceRole = serviceRoleKey();
  const generated = await fetch(`${supabaseUrl()}/auth/v1/admin/generate_link`, { method: "POST", headers: { apikey: serviceRole, Authorization: `Bearer ${serviceRole}`, "Content-Type": "application/json" }, body: JSON.stringify({ type: "recovery", email, redirect_to: `${appUrl}/auth/callback?next=/reset-password` }) });
  // Deliberately always return success: don't reveal whether an email belongs to an account.
  if (generated.ok && process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const payload = await generated.json();
    const actionLink = payload?.properties?.action_link;
    if (actionLink) {
      const template = passwordResetEmail({ name: payload?.user?.user_metadata?.first_name, resetUrl: actionLink });
      await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [email], subject: "Reset your INFINI password", ...template }) });
    }
  }
  return NextResponse.json({ ok: true });
}
