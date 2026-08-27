"use client";

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import ProfilePasswordForm from "@/components/ProfilePasswordForm";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PieChart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Portfolio", icon: PieChart },
  { label: "Transactions", icon: ArrowUpRight },
  { label: "Documents", icon: FileText },
];

const holdings = [
  { name: "Global Equity", symbol: "GEQ", value: "$31,842.00", change: "+8.4%", color: "#c9754d", width: "76%" },
  { name: "Stable Income", symbol: "SIF", value: "$18,420.50", change: "+4.2%", color: "#adc9a1", width: "52%" },
  { name: "Emerging Markets", symbol: "EMF", value: "$9,675.20", change: "+12.8%", color: "#d9b66f", width: "34%" },
];

const activities = [
  { title: "Dividend received", detail: "Global Equity Fund", amount: "+$284.20", date: "Today", positive: true },
  { title: "Monthly contribution", detail: "Stable Income Fund", amount: "+$1,200.00", date: "18 Aug 2026", positive: true },
  { title: "Platform fee", detail: "Account management", amount: "-$42.00", date: "15 Aug 2026", positive: false },
];

export function UserDashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-[#101513] text-[#f5f0e8]">
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-[258px] flex-col border-r border-white/10 bg-[#151c19] px-5 py-7 transition-transform duration-300 lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2">
          <div>
            <p className="font-serif text-2xl tracking-[0.18em] text-[#f5f0e8]">INFINI</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[#a7b1a8]">Financial management</p>
          </div>
          <button className="rounded-md p-2 text-[#a7b1a8] lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="mt-14 px-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#77837b]">Workspace</div>
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.label} className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition ${item.active ? "bg-[#c9754d] text-[#fffaf4]" : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"}`}><Icon size={17} strokeWidth={1.7} /><span>{item.label}</span>{item.active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#f8dfc4]" />}</button>;
          })}
        </nav>
        <div className="mt-10 px-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#77837b]">Account</div>
        <nav className="mt-4 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-[#a7b1a8] transition hover:bg-white/5 hover:text-white"><ShieldCheck size={17} strokeWidth={1.7} /><span>Verification</span><span className="ml-auto rounded-full bg-[#adc9a1]/15 px-2 py-0.5 text-[9px] text-[#adc9a1]">Verified</span></button>
          <ProfilePasswordForm />
        </nav>
        <div className="mt-auto border-t border-white/10 pt-5"><div className="flex items-center gap-3 px-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9b66f] font-serif text-sm text-[#253027]">AJ</div><div><p className="text-sm text-[#f5f0e8]">Alex Johnson</p><p className="text-[11px] text-[#77837b]">Personal account</p></div><MoreHorizontal className="ml-auto text-[#77837b]" size={18} /></div></div>
      </aside>

      <main className="min-h-screen lg:pl-[258px]">
        <header className="flex h-[82px] items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-12"><button className="rounded-md p-2 text-[#a7b1a8] lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="hidden items-center gap-2 text-xs text-[#77837b] sm:flex"><span>Workspace</span><span>/</span><span className="text-[#d7ded5]">Overview</span></div><div className="ml-auto flex items-center gap-4"><button aria-label="Search" className="text-[#a7b1a8] transition hover:text-white"><Search size={18} /></button><button aria-label="Notifications" className="relative text-[#a7b1a8] transition hover:text-white"><Bell size={18} /><span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[#c9754d]" /></button><div className="hidden h-5 w-px bg-white/10 sm:block" /><button className="hidden items-center gap-2 text-sm text-[#d7ded5] sm:flex">2026 <ChevronDown size={14} className="text-[#77837b]" /></button></div></header>
        <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-[#c9754d]">Tuesday, 20 August 2026</p><h1 className="font-serif text-4xl tracking-[-0.02em] text-[#f5f0e8] sm:text-5xl">Good morning, Alex.</h1><p className="mt-3 text-sm text-[#8e9b91]">Here is your financial picture at a glance.</p></div><button className="flex w-fit items-center gap-2 border border-white/15 px-4 py-2.5 text-xs text-[#d7ded5] transition hover:border-[#c9754d] hover:text-white"><SlidersHorizontal size={15} /> Customize view</button></div>
          <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr_1fr]">
            <div className="relative overflow-hidden rounded-sm bg-[#c9754d] p-6 text-[#fffaf4] sm:p-8"><div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/20" /><div className="absolute -right-2 -top-12 h-44 w-44 rounded-full border border-white/15" /><div className="relative"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.22em] text-[#f7d8c3]">Total portfolio value</p><button onClick={() => setShowBalance(!showBalance)} aria-label="Toggle balance visibility" className="text-[#f7d8c3]">{showBalance ? <Eye size={17} /> : <EyeOff size={17} />}</button></div><p className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">{showBalance ? "$68,942.70" : "••••••••"}</p><div className="mt-7 flex items-center gap-2 text-sm text-[#fff0e4]"><span className="flex items-center gap-1 rounded-full bg-black/10 px-2 py-1"><ArrowUpRight size={14} /> 7.84%</span><span className="text-[#f7d8c3]">vs. last month</span></div></div></div>
            <div className="border border-white/10 bg-[#151c19] p-6 sm:p-8"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.22em] text-[#77837b]">Available cash</p><Wallet size={17} className="text-[#adc9a1]" /></div><p className="mt-6 font-serif text-3xl">{showBalance ? "$8,420.50" : "••••••"}</p><p className="mt-4 text-xs text-[#adc9a1]">Ready to invest or withdraw</p></div>
            <div className="border border-white/10 bg-[#151c19] p-6 sm:p-8"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.22em] text-[#77837b]">This year</p><ArrowUpRight size={17} className="text-[#d9b66f]" /></div><p className="mt-6 font-serif text-3xl">+ $4,982.18</p><p className="mt-4 text-xs text-[#adc9a1]">12.64% annual return</p></div>
          </section>
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]"><div className="border border-white/10 bg-[#151c19] p-6 sm:p-8"><div className="flex items-start justify-between"><div><h2 className="font-serif text-2xl">Portfolio performance</h2><p className="mt-1 text-xs text-[#77837b]">Growth of your invested capital</p></div><button className="flex items-center gap-2 border border-white/10 px-3 py-2 text-[11px] text-[#a7b1a8]">1Y <ChevronDown size={13} /></button></div><div className="mt-8 h-[220px] w-full"><svg viewBox="0 0 700 220" className="h-full w-full overflow-visible" preserveAspectRatio="none" aria-label="Portfolio growth chart"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c9754d" stopOpacity=".3" /><stop offset="100%" stopColor="#c9754d" stopOpacity="0" /></linearGradient></defs><g stroke="#ffffff" strokeOpacity=".07"><line x1="0" x2="700" y1="30" y2="30" /><line x1="0" x2="700" y1="90" y2="90" /><line x1="0" x2="700" y1="150" y2="150" /><line x1="0" x2="700" y1="210" y2="210" /></g><path d="M0 183 C45 178 58 160 92 169 S145 155 175 162 S218 130 248 145 S290 126 320 135 S365 101 395 120 S430 111 460 95 S500 108 530 82 S575 75 602 88 S650 45 700 29 L700 220 L0 220 Z" fill="url(#chart-fill)" /><path d="M0 183 C45 178 58 160 92 169 S145 155 175 162 S218 130 248 145 S290 126 320 135 S365 101 395 120 S430 111 460 95 S500 108 530 82 S575 75 602 88 S650 45 700 29" fill="none" stroke="#d88761" strokeWidth="3" strokeLinecap="round" /><circle cx="700" cy="29" r="5" fill="#f5f0e8" stroke="#c9754d" strokeWidth="3" /></svg></div><div className="mt-3 flex justify-between text-[10px] text-[#77837b]"><span>Aug 25</span><span>Oct</span><span>Dec</span><span>Feb</span><span>Apr</span><span>Jun</span><span>Aug 26</span></div></div>
            <div className="border border-white/10 bg-[#151c19] p-6 sm:p-8"><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl">Allocation</h2><p className="mt-1 text-xs text-[#77837b]">Across 3 strategies</p></div><button aria-label="View allocation details" className="text-[#77837b] hover:text-white"><MoreHorizontal size={19} /></button></div><div className="mt-7 flex items-center gap-6"><div className="relative h-36 w-36 shrink-0 rounded-full" style={{ background: "conic-gradient(#c9754d 0deg 167deg, #adc9a1 167deg 263deg, #d9b66f 263deg 328deg, #53645b 328deg 360deg)" }}><div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-[#151c19]"><span className="font-serif text-xl">100%</span></div></div><div className="space-y-4 text-xs">{[["Global Equity", "46%", "#c9754d"], ["Stable Income", "27%", "#adc9a1"], ["Emerging Markets", "18%", "#d9b66f"], ["Cash", "9%", "#53645b"]].map(([label, value, color]) => <div key={label} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} /><span className="text-[#a7b1a8]">{label}</span><span className="ml-auto text-[#f5f0e8]">{value}</span></div>)}</div></div></div></section>
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]"><div className="border border-white/10 bg-[#151c19] p-6 sm:p-8"><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl">Your holdings</h2><p className="mt-1 text-xs text-[#77837b]">Current positions and performance</p></div><button className="text-xs text-[#c9754d] hover:text-[#f5f0e8]">View portfolio <span aria-hidden="true">→</span></button></div><div className="mt-7 space-y-6">{holdings.map((holding) => <div key={holding.symbol}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${holding.color}22`, color: holding.color }}>{holding.symbol.slice(0, 2)}</div><div><p className="text-sm text-[#e1e5df]">{holding.name}</p><p className="text-[10px] uppercase tracking-[0.15em] text-[#77837b]">{holding.symbol}</p></div></div><div className="text-right"><p className="text-sm">{holding.value}</p><p className="text-[11px] text-[#adc9a1]">{holding.change}</p></div></div><div className="mt-3 h-1 bg-white/5"><div className="h-full" style={{ width: holding.width, backgroundColor: holding.color }} /></div></div>)}</div></div><div className="border border-white/10 bg-[#151c19] p-6 sm:p-8"><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl">Recent activity</h2><p className="mt-1 text-xs text-[#77837b]">Latest account movements</p></div><button aria-label="Help" className="text-[#77837b] hover:text-white"><CircleHelp size={18} /></button></div><div className="mt-6 space-y-5">{activities.map((activity) => <div key={activity.title} className="flex items-start gap-3"><div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.positive ? "bg-[#adc9a1]/10 text-[#adc9a1]" : "bg-[#c9754d]/10 text-[#c9754d]"}`}>{activity.positive ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><p className="truncate text-xs text-[#e1e5df]">{activity.title}</p><p className={`text-xs ${activity.positive ? "text-[#adc9a1]" : "text-[#d7ded5]"}`}>{activity.amount}</p></div><p className="mt-1 text-[11px] text-[#77837b]">{activity.detail} · {activity.date}</p></div></div>)}</div><button className="mt-7 w-full border-t border-white/10 pt-4 text-left text-xs text-[#c9754d]">View all activity <span aria-hidden="true">→</span></button></div></section>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return <LandingPage />;
}
