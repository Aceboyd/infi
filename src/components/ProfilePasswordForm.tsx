"use client";

import { useState } from "react";

export default function ProfilePasswordForm() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmation) return setMessage("Your new passwords do not match.");
    setSaving(true); setMessage("");
    const response = await fetch("/api/auth/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const body = await response.json();
    setSaving(false);
    if (!response.ok) return setMessage(body.error ?? "Unable to update your password.");
    setPassword(""); setConfirmation(""); setMessage("Password updated successfully.");
  }

  return <>
    <button onClick={() => { setOpen(true); setMessage(""); }} className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-[#a7b1a8] transition hover:bg-white/5 hover:text-white"><span className="inline-flex h-[17px] w-[17px] items-center justify-center rounded border border-current text-[10px]">•••</span><span>Profile & security</span></button>
    {open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5" role="dialog" aria-modal="true" aria-labelledby="password-heading">
      <form onSubmit={submit} className="w-full max-w-md bg-[#f3eee6] p-7 text-[#213028] shadow-2xl sm:p-9">
        <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.22em] text-[#c9754d]">Profile & security</p><h2 id="password-heading" className="mt-3 font-serif text-3xl">Change password</h2></div><button type="button" onClick={() => setOpen(false)} className="text-2xl text-[#758179]" aria-label="Close">×</button></div>
        <p className="mt-3 text-sm leading-6 text-[#758179]">Choose a strong password with at least 8 characters.</p>
        <label className="mt-6 block text-xs text-[#526158]">New password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={8} required className="mt-2 h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]" /></label>
        <label className="mt-5 block text-xs text-[#526158]">Confirm new password<input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} type="password" minLength={8} required className="mt-2 h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]" /></label>
        {message && <p className={`mt-4 text-sm ${message.includes("success") ? "text-[#527e50]" : "text-[#a94835]"}`} role="status">{message}</p>}
        <button disabled={saving} className="mt-7 h-12 w-full bg-[#c9754d] text-sm text-white disabled:opacity-60">{saving ? "Updating…" : "Update password"}</button>
      </form>
    </div>}
  </>;
}
