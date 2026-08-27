"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

function SignInContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError("");
    const response = await fetch("/api/auth/sign-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const body = await response.json(); setSubmitting(false);
    if (!response.ok) return setError(body.error ?? "Unable to sign in.");
    if (body.isAdmin) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
    router.refresh();
  }
  return (
    <>
    <main className="grid min-h-screen bg-[#f3eee6] text-[#213028] md:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden min-h-[260px] overflow-hidden bg-cover bg-center p-6 text-[#f5f0e8] sm:min-h-[300px] sm:p-10 md:flex md:min-h-screen md:flex-col md:justify-between" style={{ backgroundImage: "linear-gradient(rgba(21,33,28,.48), rgba(21,33,28,.84)), url(https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=85)" }}>
        <div className="hidden md:block"><Logo light /></div>
        <div className="max-w-md">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#d88761]">
            Welcome back
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
            Your bigger picture is waiting.
          </h1>
          <p className="mt-6 text-sm leading-7 text-[#afbbb0]">
            Pick up where you left off with a calm, considered view of your
            financial future.
          </p>
        </div>
        <p className="text-xs text-[#77837b]">
          Private wealth management, made clear.
        </p>
      </section>
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-12 flex items-center justify-between md:hidden">
            <Logo />
            <Link href="/" aria-label="Back home" className="text-[#77837b]">
              <ArrowLeft size={18} />
            </Link>
          </div>
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
              Member access
            </p>
            <h2 className="mt-4 font-serif text-4xl">Welcome back.</h2>
            <p className="mt-3 text-sm text-[#758179]">
              Sign in to view your financial picture.
            </p>
            {searchParams.get("registered") === "1" && <p className="mt-3 text-sm text-[#527e50]" role="status">Your account is ready. Sign in to continue.</p>}
          </div>
          <form className="space-y-5" onSubmit={submit}>
            <label className="block">
              <span className="mb-2 block text-xs text-[#526158]">
                Email address
              </span>
              <span className="relative block">
                <Mail
                  className="absolute left-3 top-3.5 text-[#8c988f]"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 w-full border border-[#d3cbc0] bg-transparent pl-10 pr-4 text-sm outline-none transition placeholder:text-[#a3aaa3] focus:border-[#c9754d]"
                />
              </span>
            </label>
            <label className="block">
              <div className="mb-2 flex justify-between">
                <span className="text-xs text-[#526158]">Password</span>
                <Link href="/forgot-password" className="text-xs text-[#c9754d]">
                  Forgot password?
                </Link>
              </div>
              <span className="relative block">
                <LockKeyhole
                  className="absolute left-3 top-3.5 text-[#8c988f]"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-12 w-full border border-[#d3cbc0] bg-transparent pl-10 pr-12 text-sm outline-none transition placeholder:text-[#a3aaa3] focus:border-[#c9754d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-3.5 text-[#8c988f]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>
            {error && <p className="text-sm text-[#a94835]" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 flex h-12 w-full items-center justify-center bg-[#c9754d] text-sm text-white transition hover:bg-[#b66543]"
            >
              {submitting ? "Signing in…" : <>Sign in <ArrowRight className="ml-2" size={16} /></>}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-[#758179]">
            New to INFINI?{" "}
            <Link href="/sign-up" className="text-[#c9754d]">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3eee6]" />}>
      <SignInContent />
    </Suspense>
  );
}
