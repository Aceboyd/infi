import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";

const aboutLinks = [
  ["History", "history"],
  ["Client education", "client-education"],
  ["Our team", "our-team"],
  ["Assets under management", "assets-under-management"],
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#15211c] px-6 py-14 text-[#aeb9ae] lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div><Logo light /><p className="mt-7 max-w-xs text-sm leading-7 text-[#8f9d92]">A clearer point of view for the decisions shaping your financial future.</p><div className="mt-7 space-y-3 text-xs text-[#8f9d92]"><p className="flex items-center gap-3"><MapPin size={15} className="text-[#d88761]" /> 100 Financial District, New York</p><p className="flex items-center gap-3"><Mail size={15} className="text-[#d88761]" /> hello@infini.fm</p><p className="flex items-center gap-3"><Phone size={15} className="text-[#d88761]" /> +1 212 555 0148</p></div></div>
          <div><h2 className="text-[10px] uppercase tracking-[0.22em] text-[#d88761]">Explore</h2><div className="mt-6 grid gap-4 text-sm"><Link href="/" className="hover:text-white">Home</Link><Link href="/#approach" className="hover:text-white">Our approach</Link><Link href="/#principles" className="hover:text-white">Principles</Link><Link href="/blog" className="hover:text-white">Blog</Link></div></div>
          <div><h2 className="text-[10px] uppercase tracking-[0.22em] text-[#d88761]">About INFINI</h2><div className="mt-6 grid gap-4 text-sm">{aboutLinks.map(([label, slug]) => <Link key={slug} href={`/about/${slug}`} className="hover:text-white">{label}</Link>)}<Link href="/about/privacy-policy" className="hover:text-white">Privacy policy</Link></div></div>
          <div><h2 className="text-[10px] uppercase tracking-[0.22em] text-[#d88761]">Member access</h2><p className="mt-6 text-sm leading-6 text-[#8f9d92]">Already part of the INFINI community?</p><Link href="/sign-in" className="mt-5 inline-flex items-center text-sm text-[#f7d8c3] hover:text-white">Sign in <ArrowUpRight className="ml-2" size={15} /></Link><p className="mt-9 text-xs leading-6 text-[#8f9d92]">For questions about your plan, our team is available Monday to Friday.</p></div>
        </div>
        <div className="flex flex-col justify-between gap-5 pt-7 text-[11px] leading-5 text-[#77837b] sm:flex-row"><p>© 2026 INFINI Financial Management. All rights reserved.</p><div className="flex gap-5"><Link href="/about/privacy-policy" className="hover:text-white">Privacy</Link><Link href="/about/privacy-policy" className="hover:text-white">Terms</Link><span>Member of responsible finance</span></div></div>
      </div>
    </footer>
  );
}