"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

const aboutLinks = [
  ["History", "history"],
  ["Client education", "client-education"],
  ["Our team", "our-team"],
  ["Privacy policy", "privacy-policy"],
  ["Assets under management", "assets-under-management"],
];

export default function SiteHeader() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex w-full items-center justify-between border-b border-white/10 bg-[#15211c]/95 px-6 py-5 shadow-lg backdrop-blur-md lg:px-10">
      <Logo light />
      <div className="hidden items-center gap-7 text-xs text-[#b6c0b6] md:flex">
        <a href="#home" className="hover:text-white">Home</a>
        <a href="#approach" className="hover:text-white">Our approach</a>
        <a href="#principles" className="hover:text-white">Principles</a>
        <Link href="/blog" className="hover:text-white">Blog</Link>
        <div className="relative">
          <button onClick={() => setAboutOpen(!aboutOpen)} aria-expanded={aboutOpen} className="flex items-center gap-1 hover:text-white">About <ChevronDown size={13} className={`transition ${aboutOpen ? "rotate-180" : ""}`} /></button>
          {aboutOpen && <div className="absolute right-0 top-8 w-56 border border-[#d3cbc0] bg-[#faf7f2] p-2 text-[#213028] shadow-2xl">{aboutLinks.map(([label, slug]) => <Link key={slug} href={`/about/${slug}`} onClick={() => setAboutOpen(false)} className="block px-3 py-2.5 text-xs transition hover:bg-[#eae3d9] hover:text-[#c9754d]">{label}</Link>)}</div>}
        </div>
        <a href="#contact" className="hover:text-white">Contact</a>
      </div>
      <div className="flex items-center gap-3"><Link href="/sign-in" className="hidden px-4 py-2 text-xs text-[#d7ded5] hover:text-white sm:block">Sign in</Link><Link href="/sign-up" className="hidden border border-[#c9754d] px-4 py-2.5 text-xs text-[#f7d8c3] transition hover:bg-[#c9754d] hover:text-white sm:block">Begin your plan <ArrowRight className="ml-2 inline" size={14} /></Link><button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#b6c0b6] md:hidden" aria-label="Toggle navigation">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
  {mobileOpen && <div className="absolute inset-x-4 top-[70px] border border-white/10 bg-[#1d2b24] p-4 text-sm text-[#d7ded5] shadow-2xl md:hidden"><div className="grid gap-1"><a href="#home" onClick={() => setMobileOpen(false)} className="px-3 py-2.5">Home</a><a href="#approach" onClick={() => setMobileOpen(false)} className="px-3 py-2.5">Our approach</a><a href="#principles" onClick={() => setMobileOpen(false)} className="px-3 py-2.5">Principles</a><Link href="/blog" className="px-3 py-2.5">Blog</Link><p className="px-3 pb-1 pt-3 text-[10px] uppercase tracking-[0.18em] text-[#d88761]">About</p>{aboutLinks.map(([label, slug]) => <Link key={slug} href={`/about/${slug}`} onClick={() => setMobileOpen(false)} className="px-3 py-2.5">{label}</Link>)}<a href="#contact" onClick={() => setMobileOpen(false)} className="px-3 py-2.5">Contact</a></div></div>}
    </nav>
  );
}
