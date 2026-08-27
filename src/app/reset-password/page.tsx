"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState(""); const [confirmation, setConfirmation] = useState(""); const [message, setMessage] = useState(""); const [ready, setReady] = useState(false);
  useEffect(() => { fetch("/api/auth/me").then((response) => setReady(response.ok)); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (password !== confirmation) return setMessage("Your passwords do not match."); const response = await fetch("/api/auth/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }); const body = await response.json(); if (!response.ok) return setMessage(body.error ?? "Unable to reset password."); window.location.assign("/dashboard"); }
  return <main className="grid min-h-screen place-items-center bg-[#f3eee6] p-6 text-[#213028]"><form onSubmit={submit} className="w-full max-w-md bg-[#fffaf4] p-8 shadow-sm sm:p-10"><Logo /><p className="mt-10 text-[10px] uppercase tracking-[.28em] text-[#c9754d]">Account recovery</p><h1 className="mt-4 font-serif text-4xl">Choose a new password</h1>{!ready ? <p className="mt-4 text-sm leading-6 text-[#758179]">Checking your secure recovery link…</p> : <><label className="mt-7 block text-xs text-[#526158]">New password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={8} required className="mt-2 h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]" /></label><label className="mt-5 block text-xs text-[#526158]">Confirm new password<input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} type="password" minLength={8} required className="mt-2 h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]" /></label><button className="mt-6 h-12 w-full bg-[#c9754d] text-sm text-white">Save new password</button></>}{message && <p className="mt-4 text-sm text-[#a94835]">{message}</p>}<p className="mt-6 text-center text-sm text-[#758179]"><Link href="/sign-in" className="text-[#c9754d]">Back to sign in</Link></p></form></main>;
}
