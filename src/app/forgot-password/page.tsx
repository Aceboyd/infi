"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Logo from "@/components/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); const [message, setMessage] = useState(""); const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSending(true); setMessage(""); const response = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); const body = await response.json(); setSending(false); setMessage(response.ok ? "If an INFINI account exists for this email, a reset link is on its way." : body.error ?? "Unable to send the reset email."); }
  return <main className="grid min-h-screen place-items-center bg-[#f3eee6] p-6 text-[#213028]"><form onSubmit={submit} className="w-full max-w-md bg-[#fffaf4] p-8 shadow-sm sm:p-10"><Logo /><p className="mt-10 text-[10px] uppercase tracking-[.28em] text-[#c9754d]">Account recovery</p><h1 className="mt-4 font-serif text-4xl">Reset your password</h1><p className="mt-3 text-sm leading-6 text-[#758179]">Enter your email and we&apos;ll send a secure link to reset your password.</p><label className="mt-7 block text-xs text-[#526158]">Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" className="mt-2 h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]" placeholder="you@example.com" /></label>{message && <p className="mt-4 text-sm text-[#526158]" role="status">{message}</p>}<button disabled={sending} className="mt-6 h-12 w-full bg-[#c9754d] text-sm text-white disabled:opacity-60">{sending ? "Sending…" : "Email reset link"}</button><p className="mt-6 text-center text-sm text-[#758179]"><Link href="/sign-in" className="text-[#c9754d]">Back to sign in</Link></p></form></main>;
}
