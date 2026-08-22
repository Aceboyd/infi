"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  return (
    <>
    <main className="min-h-screen bg-[#f3eee6] text-[#213028]">
      <header className="absolute inset-x-6 top-6 z-20 flex items-center justify-between sm:inset-x-10 lg:hidden">
        <Logo />
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-[#758179] hover:text-[#c9754d]"
        >
          <ArrowLeft size={15} /> Back home
        </Link>
      </header>
      <div className="mx-auto grid min-h-screen w-full lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-cover bg-center p-8 pt-24 text-[#f5f0e8] sm:p-10 sm:pt-28 lg:min-h-screen lg:pt-10" style={{ backgroundImage: "linear-gradient(rgba(21,33,28,.48), rgba(21,33,28,.84)), url(https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=85)" }}>
          <Logo light />
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            Begin with clarity
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight tracking-[-0.03em] sm:text-6xl">
            A better relationship with your money.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#d7ded5]">
            Create your INFINI account and bring your goals, investments, and
            next decisions into one considered place.
          </p>
          <div className="mt-10 space-y-4 text-sm text-[#f0e7dc]">
            <p className="flex items-center gap-3">
              <Check className="text-[#c9754d]" size={17} /> Personal portfolio
              perspective
            </p>
            <p className="flex items-center gap-3">
              <Check className="text-[#c9754d]" size={17} /> Transparent
              reporting and insights
            </p>
            <p className="flex items-center gap-3">
              <Check className="text-[#c9754d]" size={17} /> Guidance built
              around your goals
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#faf7f2] p-6 py-24 sm:p-10 lg:py-16">
          <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="font-serif text-3xl">Create your account</h2>
            <p className="mt-2 text-sm text-[#758179]">
              It takes less than two minutes.
            </p>
          </div>
          {step === 1 ? <form className="grid gap-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#c9754d]">First, let&apos;s get to know you</p>
            <label><span className="mb-2 block text-xs text-[#526158]">Choose an account type</span><select className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option>Please choose an option</option><option>Joint</option><option>Individual</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">What are your primary investment goals?</span><select className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option>Please choose an option</option><option>Capital Preservation</option><option>Regular Income Generation</option><option>Long-Term Growth</option><option>Diversification</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">What is your risk tolerance?</span><select className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option>Please choose an option</option><option>Very Low</option><option>Low</option><option>Moderate</option><option>High</option><option>Very High</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">Are you currently working with a financial advisor?</span><select className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option>Please choose an option</option><option>Yes</option><option>No</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">How satisfied are you with your current wealth management solutions?</span><select className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option>Please choose an option</option><option>Very Satisfied</option><option>Satisfied</option><option>Neutral</option><option>Dissatisfied</option><option>Very Dissatisfied</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">Additional financial information</span><textarea rows={4} placeholder="Tell us anything you would like us to know" className="w-full resize-none border border-[#d3cbc0] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#a3aaa3] focus:border-[#c9754d]" /></label>
            <button type="button" onClick={() => setStep(2)} className="flex h-12 items-center justify-center bg-[#c9754d] text-sm text-white transition hover:bg-[#b66543]">Next step <ArrowRight className="ml-2" size={16} /></button>
          </form> : <form className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                First name
              </span>
              <input
                placeholder="Alex"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                Last name
              </span>
              <input
                placeholder="Johnson"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-xs text-[#526158]">
                Email address
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                Password
              </span>
              <input
                type="password"
                placeholder="8+ characters"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">Country</span>
              <select className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Nigeria</option>
              </select>
            </label>
            <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-[#758179] sm:col-span-2">
              <input type="checkbox" className="mt-1 accent-[#c9754d]" /> I
              agree to the INFINI terms of service and privacy policy.
            </label>
            <button
              type="submit"
              className="flex h-12 items-center justify-center bg-[#c9754d] text-sm text-white transition hover:bg-[#b66543] sm:col-span-2"
            >
              Create account <ArrowRight className="ml-2" size={16} />
            </button>
          </form>}
          <p className="mt-7 text-center text-sm text-[#758179]">
            Already a member?{" "}
            <Link href="/sign-in" className="text-[#c9754d]">
              Sign in
            </Link>
          </p>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
