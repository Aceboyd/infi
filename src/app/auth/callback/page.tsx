"use client";

import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const [error, setError] = useState("");
  useEffect(() => { const params = new URLSearchParams(window.location.hash.slice(1)); const access_token = params.get("access_token"); const refresh_token = params.get("refresh_token"); if (!access_token || !refresh_token) { setError("This recovery link is invalid or has expired."); return; } fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_token, refresh_token, expires_in: Number(params.get("expires_in")) || undefined }) }).then((response) => { if (!response.ok) throw new Error(); window.location.assign("/reset-password"); }).catch(() => setError("We couldn't start your password recovery session. Please request a new link.")); }, []);
  return <main className="grid min-h-screen place-items-center bg-[#f3eee6] p-6 text-center text-[#213028]"><div><h1 className="font-serif text-3xl">{error ? "Recovery unavailable" : "Securing your reset link…"}</h1>{error && <p className="mt-3 text-sm text-[#758179]">{error}</p>}</div></main>;
}
