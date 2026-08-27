"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Coins,
  Copy,
  Cpu,
  CreditCard,
  DollarSign,
  FileText,
  Fuel,
  Gift,
  Key,
  Landmark,
  Leaf,
  LineChart,
  LoaderCircle,
  Lock,
  LogOut,
  Menu,
  Plus,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Upload,
  User,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import ForexCrossRates from "@/components/ForexCrossRates";
import BrandLogoBadge from "@/components/BrandLogoBadge";
import Logo from "@/components/Logo";

type Request = {
  id: string;
  kind: string;
  status: string;
  amount: number | null;
  created_at: string;
  admin_note?: string;
  details?: Record<string, unknown>;
};

type Account = {
  id: string;
  user_id: string;
  email?: string;
  available_balance: number;
  credit_limit: number;
  currency: string;
  kyc_status: string;
  invested_balance: number;
  total_profit: number;
  bonus_balance: number;
  account_tier: string;
  admin_message: string;
};

type Transaction = {
  id: string;
  direction: "credit" | "debit";
  amount: number;
  description: string;
  created_at: string;
};

// 10 Investment Sectors Data
const sectorsData = [
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Coins,
    tagline: "Digital Assets & DeFi Infrastructure",
    description: "Direct investment in Bitcoin, Ethereum, Solana, and yield-generating decentralized liquidity pools.",
    metrics: "24/7 Liquidity · Staking Yields up to 14.2% APY",
    logos: ["btc", "eth", "sol", "bnb"],
    assets: [
      { symbol: "BTC", name: "Bitcoin", price: "$96,420.50", change: "+4.12%", status: "Bullish" },
      { symbol: "ETH", name: "Ethereum", price: "$3,450.80", change: "+3.85%", status: "Bullish" },
      { symbol: "SOL", name: "Solana", price: "$198.30", change: "+8.40%", status: "High Volatility" },
      { symbol: "BNB", name: "Binance Coin", price: "$640.20", change: "+1.95%", status: "Steady" },
      { symbol: "ADA", name: "Cardano", price: "$0.85", change: "+2.10%", status: "Accumulation" },
    ],
  },
  {
    id: "stocks",
    name: "Stocks & Equities",
    icon: TrendingUp,
    tagline: "Global Blue-Chips & Dividend Aristocrats",
    description: "Curated baskets of top S&P 500 equities, dividend growth stocks, and global index funds.",
    metrics: "Quarterly Dividends · Low Beta Risk",
    logos: ["google", "amazon", "netflix", "tesla"],
    assets: [
      { symbol: "NVDA", name: "NVIDIA Corp", price: "$128.60", change: "+5.15%", status: "Outperforming" },
      { symbol: "AAPL", name: "Apple Inc", price: "$224.30", change: "+1.20%", status: "Stable" },
      { symbol: "MSFT", name: "Microsoft", price: "$448.90", change: "+2.05%", status: "Strong Buy" },
      { symbol: "TSLA", name: "Tesla Inc", price: "$210.40", change: "+6.80%", status: "High Growth" },
      { symbol: "AMZN", name: "Amazon.com", price: "$186.70", change: "+1.90%", status: "Bullish" },
    ],
  },
  {
    id: "tech",
    name: "Tech Infrastructure",
    icon: Cpu,
    tagline: "SaaS, Hardware & Semiconductors",
    description: "Capital deployment in next-gen cloud data centers, semiconductor fabrication, and cybersecurity.",
    metrics: "18.5% Projected Annualized Growth",
    logos: ["apple", "microsoft", "nvidia", "tsmc"],
    assets: [
      { symbol: "TSMC", name: "Taiwan Semi", price: "$172.40", change: "+3.40%", status: "Dominant Supplier" },
      { symbol: "ASML", name: "ASML Holding", price: "$980.10", change: "+2.90%", status: "Monopoly Tech" },
      { symbol: "CRWD", name: "CrowdStrike", price: "$265.80", change: "+4.10%", status: "Security Leader" },
      { symbol: "AVGO", name: "Broadcom Inc", price: "$165.20", change: "+3.75%", status: "Infrastructure" },
    ],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: Bot,
    tagline: "GenAI Models & Compute Clusters",
    description: "Direct exposure to frontier AI research labs, GPU supercomputing infrastructure, and autonomous systems.",
    metrics: "High Velocity VC Exposure",
    logos: ["nvidia", "microsoft", "google", "ai"],
    assets: [
      { symbol: "AI-COMPUTE", name: "GPU Supercompute Cluster Fund", price: "$1,450.00/unit", change: "+12.4%", status: "High Demand" },
      { symbol: "AI-MODEL", name: "Frontier LLM Equity Syndicate", price: "$820.00/unit", change: "+9.8%", status: "Expanding" },
      { symbol: "ROBO-TECH", name: "Autonomous Robotics Lab", price: "$415.00/unit", change: "+6.2%", status: "Early Stage" },
    ],
  },
  {
    id: "thc",
    name: "Medical THC & Oils",
    icon: Leaf,
    tagline: "Pharma Cannabinoids & Extract Tech",
    description: "Licensed medical cannabis cultivation, EU-GMP extraction laboratories, and international pharma supply contracts.",
    metrics: "Pharma Certified · 12.8% Est. Dividend",
    logos: ["thc", "cbd", "pharma", "hemp"],
    assets: [
      { symbol: "THC-EXTRACT", name: "EU-GMP Extraction Unit #4", price: "$520.00/share", change: "+3.2%", status: "Harvest Active" },
      { symbol: "CBD-PHARMA", name: "Clinical Cannabinoid Fund", price: "$310.00/share", change: "+1.9%", status: "Pharma Approved" },
      { symbol: "AGRI-CANN", name: "Hydroponic Facility REIT", price: "$740.00/share", change: "+4.5%", status: "High Yield" },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate & REITs",
    icon: Building2,
    tagline: "Commercial Towers & Luxury REITs",
    description: "Grade-A commercial office towers, industrial logistics fulfillment centers, and luxury residential developments.",
    metrics: "Quarterly Cash Yields · 98% Occupancy Rate",
    logos: ["reit", "estate", "lux", "tower"],
    assets: [
      { symbol: "NYC-TOWER", name: "Manhattan Financial District REIT", price: "$2,850.00/unit", change: "+1.4%", status: "Quarterly Payout" },
      { symbol: "LOGIS-REIT", name: "Global E-Commerce Logistics Hubs", price: "$1,120.00/unit", change: "+2.8%", status: "100% Leased" },
      { symbol: "LUX-RES", name: "Luxury Multi-Family Portfolio", price: "$1,980.00/unit", change: "+2.1%", status: "Stable Rental" },
    ],
  },
  {
    id: "oil-drilling",
    name: "Drilling & Petroleum",
    icon: Fuel,
    tagline: "Upstream Oil & Refined Products",
    description: "Offshore drilling rig leases, crude oil extraction projects, refinery infrastructure, and refined fuel distribution.",
    metrics: "Inflation Hedged · High Commodity Yield",
    logos: ["brent", "rig", "fuel", "oil"],
    assets: [
      { symbol: "BRENT-CRUDE", name: "North Sea Crude Extraction", price: "$84.20/bbl", change: "+2.4%", status: "High Margin" },
      { symbol: "RIG-LEASE", name: "Offshore Deepwater Drilling Rig #7", price: "$3,400.00/share", change: "+3.8%", status: "Contracted" },
      { symbol: "REFINED-DIST", name: "Petroleum Distillates & Aviation Fuel", price: "$1,250.00/unit", change: "+1.7%", status: "Active Distro" },
    ],
  },
  {
    id: "agritech",
    name: "Agriculture & Distribution",
    icon: Sprout,
    tagline: "AgTech, Food Supply & Startup VC",
    description: "Smart farming robotics, vertical hydroponics, commercial food logistics, and venture capital investing in ag startups.",
    metrics: "Essential Commodities · VC upside",
    logos: ["agri", "farm", "food", "vc"],
    assets: [
      { symbol: "SMART-FARM", name: "Autonomous Crop Robotics Syndicate", price: "$640.00/unit", change: "+4.2%", status: "Expanding" },
      { symbol: "FOOD-LOGIS", name: "Cold-Chain Supply Logistics Network", price: "$980.00/unit", change: "+2.6%", status: "Contracted" },
      { symbol: "AG-STARTUP", name: "Agri-Tech Venture Capital Fund I", price: "$1,500.00/share", change: "+8.1%", status: "Seed Active" },
    ],
  },
  {
    id: "forex",
    name: "Foreign Exchange (Forex)",
    icon: Landmark,
    tagline: "Global Currencies & FX Matrix",
    description: "Institutional forex trading in G10 and emerging market pairs with 24/5 liquidity and automated risk hedging.",
    metrics: "$7.5 Trillion Daily Volume",
    logos: ["eurusd", "forex", "fx", "gbpusd"],
    assets: [
      { symbol: "EUR/USD", name: "Euro / US Dollar", price: "1.0885", change: "+0.15%", status: "Active Trade" },
      { symbol: "GBP/USD", name: "British Pound / US Dollar", price: "1.3040", change: "+0.28%", status: "Bullish Trend" },
      { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: "145.60", change: "-0.42%", status: "Hedging Position" },
      { symbol: "USD/CHF", name: "US Dollar / Swiss Franc", price: "0.8510", change: "-0.10%", status: "Safe Haven" },
    ],
  },
  {
    id: "rare-metals",
    name: "Rare Metals & Bullion",
    icon: Sparkles,
    tagline: "Gold, Platinum, Lithium & Rare Earths",
    description: "Physical allocated precious metal vaulting (Gold, Silver, Platinum) and lithium/rare earth mining for green energy.",
    metrics: "Physical Allocated Bullion · Inflation Hedge",
    logos: ["gold", "silver", "metals", "lithium"],
    assets: [
      { symbol: "GOLD-VAULT", name: "Physical Allocated Gold Bullion (oz)", price: "$2,510.40/oz", change: "+1.85%", status: "Safe Haven" },
      { symbol: "SILVER-BULL", name: "Physical Silver Bullion (oz)", price: "$29.80/oz", change: "+2.60%", status: "Industrial Demand" },
      { symbol: "LITHIUM-RARE", name: "EV Battery Grade Lithium Hydroxide", price: "$1,850.00/ton unit", change: "+5.40%", status: "Green Growth" },
    ],
  },
];

export default function LiveUserDashboard({ name, userEmail }: { name: string; userEmail?: string }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<string>("overview"); // 'overview', 'wallet', 'transactions', or sector id
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState("USD");

  // Modal State
  const [selectedModalAction, setSelectedModalAction] = useState<{
    kind: string;
    label: string;
    needsAmount: boolean;
    defaultNote?: string;
  } | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedWalletKey, setCopiedWalletKey] = useState<string | null>(null);

  const [depositWallets, setDepositWallets] = useState({
    btc_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    eth_address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdt_trc20_address: "TYDzsYUE2SuYef3ZuSXvmwpt5zkxD59w66",
    sol_address: "7xKXtg2CW87d97TXJSDpbD5jBk45f6jSj5k2p8z24N9h",
    bank_wire_info: "Bank Name: INFINI Trust Bank Ltd | Account: 9876543210 | SWIFT/BIC: INFNUS33",
  });

  // Password Change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // KYC Upload state
  const [kycDocType, setKycDocType] = useState("Passport");
  const [kycDocNumber, setKycDocNumber] = useState("");
  const [kycDocUrl, setKycDocUrl] = useState("");
  const [uploadingKyc, setUploadingKyc] = useState(false);
  const [kycStatusMsg, setKycStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showKycModal, setShowKycModal] = useState(false);

  const refLink = `https://www.infinifinancialmanagement.com/sign-up?ref=${account?.user_id?.slice(0, 8) || "REF1082"}`;

  function handleCopyRef() {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(refLink);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  }

  function handleCopyWallet(key: string, address: string) {
    if (navigator.clipboard && address) {
      void navigator.clipboard.writeText(address);
      setCopiedWalletKey(key);
      setTimeout(() => setCopiedWalletKey(null), 2500);
    }
  }

  async function handleSignOut() {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.href = "/sign-in";
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 8) {
      setPasswordStatus({ type: "error", text: "Password must be at least 8 characters long." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", text: "Passwords do not match." });
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordStatus({ type: "error", text: data.error || "Unable to update password." });
      } else {
        setPasswordStatus({ type: "success", text: "Password updated successfully!" });
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPasswordStatus({ type: "error", text: "Failed to connect to authentication server." });
    } finally {
      setUpdatingPassword(false);
    }
  }

  async function handleFileUploadToCloudinary(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKyc(true);
    setKycStatusMsg({ type: "success", text: "Uploading document to Cloudinary (dunqe09gc)..." });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "infini_kyc");

      const res = await fetch("https://api.cloudinary.com/v1_1/dunqe09gc/image/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setKycDocUrl(data.secure_url || data.url);
        setKycStatusMsg({ type: "success", text: "Document uploaded successfully to Cloudinary!" });
      } else {
        // Fallback convert to Base64 Data URL if unsigned preset needs configuration
        const reader = new FileReader();
        reader.onload = () => {
          setKycDocUrl(reader.result as string);
          setKycStatusMsg({ type: "success", text: "Document attached successfully!" });
        };
        reader.readAsDataURL(file);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setKycDocUrl(reader.result as string);
        setKycStatusMsg({ type: "success", text: "Document attached successfully!" });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingKyc(false);
    }
  }

  async function handleKycSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!kycDocNumber && !kycDocUrl) {
      setKycStatusMsg({ type: "error", text: "Please enter your Document ID Number or attach a document file." });
      return;
    }

    setUploadingKyc(true);
    setKycStatusMsg(null);

    try {
      const res = await fetch("/api/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "kyc",
          details: {
            document_type: kycDocType,
            document_number: kycDocNumber,
            document_url: kycDocUrl,
            submitted_at: new Date().toISOString(),
          },
        }),
      });

      if (res.ok) {
        setKycStatusMsg({ type: "success", text: "KYC Document submitted! Compliance team will review your account." });
        setShowKycModal(false);
        setSuccessToast("KYC Document submitted for verification!");
        await loadData();
      } else {
        const body = await res.json();
        setKycStatusMsg({ type: "error", text: body.error || "Failed to submit KYC document." });
      }
    } catch {
      setKycStatusMsg({ type: "error", text: "Network error submitting KYC document." });
    } finally {
      setUploadingKyc(false);
    }
  }

  async function loadData() {
    try {
      const [response, settingsRes] = await Promise.all([
        fetch("/api/operations"),
        fetch("/api/settings"),
      ]);

      const body = await response.json();
      const settingsData = settingsRes.ok ? await settingsRes.json() : {};

      if (response.ok) {
        setAccount(body.account ?? null);
        if (body.account?.currency) {
          setBaseCurrency(body.account.currency);
        }
        setRequests(Array.isArray(body.requests) ? body.requests : []);
        setTransactions(Array.isArray(body.transactions) ? body.transactions : []);
      }
      if (settingsData.settings) {
        setDepositWallets(settingsData.settings);
      }
    } catch {
      // Ignore network glitch
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function handleSubmitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedModalAction) return;

    setSubmitting(true);
    setModalMessage("");
    setSuccessToast("");

    try {
      const res = await fetch("/api/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: selectedModalAction.kind,
          amount,
          details: { note },
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        setModalMessage(body.error ?? "Failed to submit request.");
      } else {
        setSuccessToast(`Your ${selectedModalAction.label} request has been submitted for admin approval.`);
        setSelectedModalAction(null);
        setAmount("");
        setNote("");
        await loadData();
      }
    } catch {
      setModalMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCurrencyChange(newCurr: string) {
    setBaseCurrency(newCurr);
    try {
      const res = await fetch("/api/operations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency: newCurr }),
      });
      if (res.ok) {
        setSuccessToast(`Base Currency updated to ${newCurr}! All balances converted.`);
        if (account) setAccount({ ...account, currency: newCurr });
      }
    } catch {
      // Local state updated
    }
  }

  const currencyRateMap: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 155.2,
  };

  const currencySymbolMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
  };

  const money = (val: number) => {
    const code = baseCurrency || account?.currency || "USD";
    const rate = currencyRateMap[code] || 1.0;
    const converted = (val || 0) * rate;
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        maximumFractionDigits: code === "JPY" ? 0 : 2,
      }).format(converted);
    } catch {
      return `${currencySymbolMap[code] || "$"}${converted.toLocaleString()}`;
    }
  };

  const selectedSector = sectorsData.find((s) => s.id === currentView);

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#f5f0e8] flex flex-col font-sans">
      {/* Mobile Top Navigation */}
      <header className="lg:hidden border-b border-white/10 bg-[#141b18] px-5 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[#c9754d]">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Logo light />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#adc9a1] bg-[#adc9a1]/10 px-2.5 py-1 rounded border border-[#adc9a1]/20">
            {money(account?.available_balance ?? 0)}
          </span>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#121916] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 overflow-y-auto">
            {/* Logo & Brand Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <Logo light />
                <p className="mt-1.5 text-[9px] uppercase tracking-[.25em] text-[#77837b]">Institutional Terminal</p>
              </div>
              <span className="rounded bg-[#c9754d]/20 px-2 py-0.5 text-[9px] font-mono text-[#d88761] uppercase">
                {account?.account_tier || "Standard"}
              </span>
            </div>

            {/* Client User Info */}
            <div className="mt-5 rounded-lg bg-[#18211d] p-3.5 border border-white/5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white truncate">{name}</p>
                <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                  account?.kyc_status === "verified" ? "bg-[#adc9a1]/20 text-[#adc9a1]" : "bg-[#d9b66f]/20 text-[#d9b66f]"
                }`}>
                  {account?.kyc_status === "verified" ? "Verified" : account?.kyc_status || "Pending"}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-[#c9754d] font-bold">
                {money(account?.available_balance ?? 0)}
              </p>
            </div>

            {/* MAIN NAVIGATION MENU */}
            <nav className="mt-6 space-y-6">
              {/* Category 1: Portfolio & Overview */}
              <div>
                <p className="px-2 text-[10px] uppercase tracking-[.22em] text-[#77837b] font-semibold">Portfolio & Assets</p>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => { setCurrentView("overview"); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      currentView === "overview" ? "bg-[#c9754d] text-white font-semibold shadow-md" : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <BarChart3 size={16} />
                    <span>Overview & Net Worth</span>
                  </button>

                  <button
                    onClick={() => { setCurrentView("wallet"); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      currentView === "wallet" ? "bg-[#c9754d] text-white font-semibold shadow-md" : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Wallet size={16} />
                    <span>Deposit & Withdraw</span>
                  </button>

                  <button
                    onClick={() => { setCurrentView("transactions"); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      currentView === "transactions" ? "bg-[#c9754d] text-white font-semibold shadow-md" : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <LineChart size={16} />
                    <span>Transaction History</span>
                  </button>
                </div>
              </div>

              {/* Category 2: 10 Investment Sectors */}
              <div>
                <p className="px-2 text-[10px] uppercase tracking-[.22em] text-[#77837b] font-semibold">10 Investment Sectors</p>
                <div className="mt-2 space-y-1">
                  {sectorsData.map((sec, idx) => {
                    const Icon = sec.icon;
                    const isActive = currentView === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => { setCurrentView(sec.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition ${
                          isActive
                            ? "bg-[#c9754d] text-white font-semibold shadow-md"
                            : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <BrandLogoBadge code={sec.logos[0]} size="sm" />
                          <span className="truncate font-medium">{sec.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono ${isActive ? "text-white/80" : "text-[#77837b]"}`}>
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: Account & Referrals */}
              <div>
                <p className="px-2 text-[10px] uppercase tracking-[.22em] text-[#77837b] font-semibold">Account & Referrals</p>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => { setCurrentView("profile"); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      currentView === "profile" ? "bg-[#c9754d] text-white font-semibold shadow-md" : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User size={16} />
                      <span>Profile & Settings</span>
                    </div>
                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-mono ${
                      account?.kyc_status === "verified" ? "bg-[#adc9a1]/20 text-[#adc9a1]" : "bg-[#d9b66f]/20 text-[#d9b66f]"
                    }`}>
                      {account?.kyc_status === "verified" ? "Verified" : "Pending"}
                    </span>
                  </button>

                  <button
                    onClick={() => { setCurrentView("referrals"); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      currentView === "referrals" ? "bg-[#c9754d] text-white font-semibold shadow-md" : "text-[#a7b1a8] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Gift size={16} />
                      <span>Referral Program</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#c9754d]">5% Yield</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer: Referrer Link, Profile & Sign Out */}
          <div className="p-4 border-t border-white/10 bg-[#0b0f0d] space-y-3">
            {/* Referral Quick Copy Bar */}
            <div className="rounded-lg bg-[#151c19] p-2.5 border border-white/5">
              <div className="flex items-center justify-between text-[10px] text-[#77837b] mb-1">
                <span className="uppercase tracking-wider font-semibold text-[#c9754d]">Referral Link</span>
                <span className="text-[#adc9a1]">5% Commission</span>
              </div>
              <button
                onClick={handleCopyRef}
                className="w-full flex items-center justify-between gap-2 rounded bg-[#0e1311] px-2.5 py-1.5 text-xs text-[#d7ded5] hover:border hover:border-[#c9754d]/40 transition"
              >
                <span className="truncate text-[11px] font-mono text-[#8e9b91]">{refLink}</span>
                {copiedRef ? <Check size={14} className="text-[#adc9a1] shrink-0" /> : <Copy size={14} className="text-[#c9754d] shrink-0" />}
              </button>
            </div>

            {/* Profile & Log Out Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setCurrentView("profile"); setSidebarOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition border ${
                  currentView === "profile"
                    ? "border-[#c9754d] bg-[#c9754d]/20 text-[#c9754d]"
                    : "border-white/10 bg-[#151c19] text-white hover:bg-white/5"
                }`}
              >
                <User size={15} />
                <span>Profile</span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#d88761]/15 px-3 py-2 text-xs font-semibold text-[#d88761] hover:bg-[#d88761] hover:text-white transition border border-[#d88761]/30"
                title="Sign Out of INFINI"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 lg:ml-72 p-6 sm:p-10 pt-8 sm:pt-14 lg:pt-16 max-w-7xl mx-auto w-full space-y-8">
          {/* Admin Announcement Alert Banner (If Any) */}
          {account?.admin_message && (
            <div className="mb-6 rounded-xl border border-[#c9754d]/40 bg-[#c9754d]/10 p-4 text-xs text-[#f7d8c3] flex items-start gap-3 shadow-lg">
              <Sparkles className="text-[#c9754d] shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Administrator Notice</p>
                <p className="mt-1 leading-5">{account.admin_message}</p>
              </div>
            </div>
          )}

          {successToast && (
            <div className="mb-6 rounded-xl border border-[#adc9a1]/40 bg-[#adc9a1]/10 p-4 text-xs text-[#adc9a1] flex items-center justify-between">
              <span>{successToast}</span>
              <button onClick={() => setSuccessToast("")} className="text-white">×</button>
            </div>
          )}

          {/* VIEW 1: OVERVIEW & PORTFOLIO DASHBOARD */}
          {currentView === "overview" && (
            <div className="space-y-8">
              {/* Header & KYC Status Notice Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">Dashboard Overview</p>
                  <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-medium">Welcome back, {name}.</h1>
                  <p className="mt-2 text-xs sm:text-sm text-[#8e9b91]">
                    Track your total investment portfolio across cryptocurrency, stocks, AI, real estate, energy, and commodities.
                  </p>
                </div>

                {/* KYC Interactive Quick Status Card */}
                {account?.kyc_status === "verified" ? (
                  <button
                    onClick={() => setCurrentView("profile")}
                    className="flex items-center gap-3 rounded-xl border border-[#adc9a1]/30 bg-[#adc9a1]/10 p-4 text-left hover:bg-[#adc9a1]/20 transition shrink-0 group"
                  >
                    <ShieldCheck size={26} className="text-[#adc9a1] shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#adc9a1] font-bold">KYC Status</p>
                      <p className="text-xs font-semibold text-white">Identity Verified</p>
                    </div>
                    <ArrowRight size={18} className="text-[#adc9a1] ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentView("profile")}
                    className="flex items-center gap-3 rounded-xl border border-[#d9b66f]/40 bg-gradient-to-r from-[#211b11] to-[#171e1b] p-4 text-left hover:border-[#c9754d] transition shrink-0 group shadow-lg"
                  >
                    <div className="p-2 rounded-lg bg-[#d9b66f]/20 text-[#d9b66f] shrink-0">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#d9b66f] font-bold">KYC Verification</span>
                        <span className="rounded bg-[#d9b66f]/20 px-2 py-0.5 text-[9px] font-bold text-[#d9b66f] uppercase">
                          {account?.kyc_status === "pending" ? "In Review" : "Unverified"}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white mt-0.5">
                        {account?.kyc_status === "pending" ? "Document Pending Review" : "Verify Account Identity"}
                      </p>
                      <p className="text-[10px] text-[#77837b]">Click to upload passport/ID document</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-[#c9754d] flex items-center justify-center text-white ml-2 shadow-md group-hover:bg-[#b66543] group-hover:translate-x-1 transition">
                      <ArrowRight size={18} />
                    </div>
                  </button>
                )}
              </div>

              {/* Main Financial Balance Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-gradient-to-br from-[#c9754d] to-[#b66543] p-6 text-white shadow-xl">
                  <p className="text-[10px] uppercase tracking-[.2em] text-[#f7d8c3] font-semibold">Available Cash</p>
                  <p className="mt-3 font-serif text-3xl font-bold">{loading ? "—" : money(account?.available_balance ?? 0)}</p>
                  <p className="mt-3 text-[11px] text-[#f7d8c3]">Settled Liquid Funds</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-[.2em] text-[#77837b] font-semibold">Invested Portfolio</p>
                  <p className="mt-3 font-serif text-3xl text-white font-bold">{loading ? "—" : money(account?.invested_balance ?? 0)}</p>
                  <p className="mt-3 text-[11px] text-[#adc9a1]">Active Across 10 Sectors</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-[.2em] text-[#77837b] font-semibold">Total Profit / Yield</p>
                  <p className="mt-3 font-serif text-3xl text-[#adc9a1] font-bold">
                    {loading ? "—" : `+${money(account?.total_profit ?? 0)}`}
                  </p>
                  <p className="mt-3 text-[11px] text-[#8e9b91]">Realized Gains & Dividends</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-[.2em] text-[#77837b] font-semibold">Credit Line & Bonus</p>
                  <p className="mt-3 font-serif text-2xl text-[#d9b66f] font-bold">
                    {loading ? "—" : money((account?.credit_limit ?? 0) + (account?.bonus_balance ?? 0))}
                  </p>
                  <p className="mt-3 text-[11px] text-[#77837b]">Credit Limit: {money(account?.credit_limit ?? 0)}</p>
                </div>
              </div>

              {/* Quick Action Sector Selector Grid */}
              <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl text-white font-medium">10 Investment Sectors</h2>
                    <p className="mt-1 text-xs text-[#77837b]">Select any sector from the sidebar or click below to invest.</p>
                  </div>
                  <span className="text-xs text-[#c9754d] font-mono font-semibold">10 Active Markets</span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {sectorsData.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setCurrentView(sec.id)}
                        className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#0e1311] p-4 text-left transition hover:border-[#c9754d] hover:bg-[#19221e] group"
                      >
                        <div className="flex items-center justify-between">
                          <Icon size={20} className="text-[#c9754d]" />
                          <ChevronRight size={14} className="text-[#77837b] group-hover:text-white transition" />
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <BrandLogoBadge code={sec.logos[0]} size="sm" />
                          <p className="font-serif text-sm text-white font-medium group-hover:text-[#c9754d]">{sec.name}</p>
                        </div>
                        <p className="mt-0.5 text-[10px] text-[#77837b] truncate">{sec.tagline}</p>
                        <div className="mt-3 grid grid-cols-4 gap-1 rounded-md bg-white/5 p-1.5 border border-white/5">
                          {sec.logos.map((logoCode) => (
                            <div key={logoCode} className="flex items-center justify-center">
                              <BrandLogoBadge code={logoCode} size="sm" />
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live FX Rates & Activity Split */}
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-xl border border-[#d3cbc0] bg-[#faf7f2] p-5 text-[#213028]">
                  <div className="flex items-center justify-between border-b border-[#d3cbc0] pb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[.2em] text-[#c9754d]">Live Market Tickers</p>
                      <h3 className="font-serif text-xl">Foreign Exchange Matrix</h3>
                    </div>
                    <span className="rounded bg-[#adc9a1]/30 px-2 py-0.5 text-[10px] uppercase text-[#254228] font-bold">Live Data</span>
                  </div>
                  <div className="mt-3">
                    <ForexCrossRates />
                  </div>
                </div>

                {/* Recent Activity Log */}
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <h3 className="font-serif text-xl text-white">Recent Account Activity</h3>
                  <div className="mt-4 space-y-3">
                    {requests.length === 0 ? (
                      <p className="py-6 text-center text-xs text-[#77837b]">No recent request activity.</p>
                    ) : (
                      requests.slice(0, 5).map((req) => (
                        <div key={req.id} className="border-b border-white/5 pb-3 last:border-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="capitalize text-white font-medium">{req.kind} Request</span>
                            <span
                              className={`text-[10px] uppercase font-bold ${
                                req.status === "approved"
                                  ? "text-[#adc9a1]"
                                  : req.status === "rejected"
                                  ? "text-[#d88761]"
                                  : "text-[#d9b66f]"
                              }`}
                            >
                              {req.status}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#77837b]">
                            {req.amount ? money(Number(req.amount)) : "Service Action"} · {new Date(req.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: SECTOR DEDICATED VIEW (Crypto, Stocks, AI, THC, Real Estate, Drilling, Ag, Forex, Rare Metals) */}
          {selectedSector && (
            <div className="space-y-8">
              {/* Sector Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-[#c9754d]/20 text-[#c9754d]">
                      {<selectedSector.icon size={26} />}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">Investment Sector View</p>
                      <div className="flex items-center gap-2.5 mt-1">
                        <BrandLogoBadge code={selectedSector.logos[0]} size="md" />
                        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">{selectedSector.name}</h1>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[#8e9b91] max-w-2xl">{selectedSector.description}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedModalAction({
                      kind: selectedSector.id,
                      label: `Invest in ${selectedSector.name}`,
                      needsAmount: true,
                      defaultNote: `Capital allocation request for ${selectedSector.name} sector.`,
                    });
                    setAmount("");
                    setNote(`Capital allocation request for ${selectedSector.name} sector.`);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c9754d] px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-[#b66543] shadow-lg shadow-[#c9754d]/20 shrink-0"
                >
                  <Plus size={16} />
                  <span>Invest in {selectedSector.name}</span>
                </button>
              </div>

              {/* Sector Highlights Card */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-5">
                  <p className="text-[10px] uppercase text-[#77837b]">Sector Performance Metric</p>
                  <p className="mt-2 font-mono text-sm text-[#adc9a1] font-semibold">{selectedSector.metrics}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-5">
                  <p className="text-[10px] uppercase text-[#77837b]">Your Available Cash</p>
                  <p className="mt-2 font-mono text-lg text-white font-bold">{money(account?.available_balance ?? 0)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-5">
                  <p className="text-[10px] uppercase text-[#77837b]">Account Tier</p>
                  <p className="mt-2 text-sm text-[#d9b66f] font-semibold uppercase">{account?.account_tier || "Standard"}</p>
                </div>
              </div>

              {/* Asset Listing Table */}
              <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                <h3 className="font-serif text-2xl text-white mb-4">Live Assets & Investment Instruments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-[#77837b] uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Asset / Ticker</th>
                        <th className="py-3 px-4">Instrument Name</th>
                        <th className="py-3 px-4">Live Price</th>
                        <th className="py-3 px-4">24h Change</th>
                        <th className="py-3 px-4">Market Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {selectedSector.assets.map((asset) => (
                        <tr key={asset.symbol} className="hover:bg-white/5 transition">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <BrandLogoBadge code={asset.symbol} size="sm" />
                              <span className="font-mono font-bold text-white">{asset.symbol}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#d7ded5] font-medium">
                            <div className="flex items-center gap-2.5">
                              <BrandLogoBadge code={asset.symbol} size="sm" />
                              <span>{asset.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-[#adc9a1]">{asset.price}</td>
                          <td className="py-4 px-4 font-mono text-[#adc9a1]">{asset.change}</td>
                          <td className="py-4 px-4">
                            <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-[#d9b66f]">
                              {asset.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedModalAction({
                                  kind: selectedSector.id,
                                  label: `Buy / Invest ${asset.symbol}`,
                                  needsAmount: true,
                                  defaultNote: `Investment request for ${asset.name} (${asset.symbol})`,
                                });
                                setAmount("");
                                setNote(`Investment request for ${asset.name} (${asset.symbol})`);
                              }}
                              className="rounded bg-[#c9754d]/20 px-3 py-1.5 text-xs text-[#d88761] hover:bg-[#c9754d] hover:text-white transition"
                            >
                              Invest
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: DEPOSIT & WITHDRAW WALLET VIEW */}
          {currentView === "wallet" && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">Wallet & Liquidity</p>
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-white">Deposit & Withdraw Funds</h1>
                <p className="mt-2 text-xs sm:text-sm text-[#8e9b91]">
                  Add capital directly via verified crypto addresses or request wire settlements. All transactions are instantly credited upon administrator confirmation.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <div className="p-3 rounded-lg bg-[#c9754d]/20 text-[#c9754d] w-fit">
                    <ArrowDownToLine size={24} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-white">Deposit Funds</h3>
                  <p className="mt-2 text-xs text-[#77837b]">Add capital to your available balance via Wire Transfer, Crypto, or Bank Credit.</p>
                  <div className="mt-6 rounded-lg border border-[#c9754d]/30 bg-[#c9754d]/10 px-3 py-2.5 text-center text-xs font-medium text-[#c9754d]">
                    Copy official deposit wallet addresses below
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <div className="p-3 rounded-lg bg-[#c9754d]/20 text-[#c9754d] w-fit">
                    <ArrowUpFromLine size={24} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-white">Withdraw Funds</h3>
                  <p className="mt-2 text-xs text-[#77837b]">Withdraw settled profits or capital back to your designated bank or wallet.</p>
                  <button
                    onClick={() => {
                      setSelectedModalAction({ kind: "withdrawal", label: "Withdraw Funds", needsAmount: true });
                      setAmount(""); setNote("");
                    }}
                    className="mt-6 w-full rounded-lg border border-white/20 py-3 text-xs font-semibold text-white hover:border-[#c9754d] transition"
                  >
                    Request Withdrawal
                  </button>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <div className="p-3 rounded-lg bg-[#c9754d]/20 text-[#c9754d] w-fit">
                    <BadgeCheck size={24} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-white">Request Credit / Loan</h3>
                  <p className="mt-2 text-xs text-[#77837b]">Apply for institutional leverage credit or portfolio-backed financing.</p>
                  <button
                    onClick={() => {
                      setSelectedModalAction({ kind: "credit", label: "Request Credit Line", needsAmount: true });
                      setAmount(""); setNote("");
                    }}
                    className="mt-6 w-full rounded-lg border border-white/20 py-3 text-xs font-semibold text-white hover:border-[#c9754d] transition"
                  >
                    Apply for Credit
                  </button>
                </div>
              </div>

              {/* OFFICIAL CRYPTO DEPOSIT ADDRESSES PANEL */}
              <div className="rounded-xl border border-white/10 bg-[#151c19] p-7 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-white font-medium">Official Crypto Wallet Deposit Addresses</h2>
                    <p className="text-xs text-[#8e9b91] mt-1">
                      Transfer funds directly to any of the institutional wallet addresses below. Click to copy the address.
                    </p>
                  </div>
                  <span className="hidden sm:inline-block rounded bg-[#adc9a1]/20 px-3 py-1 text-xs font-mono font-semibold text-[#adc9a1]">
                    System Verified
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* BTC */}
                  <div className="rounded-lg border border-white/10 bg-[#0e1311] p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <BrandLogoBadge code="btc" size="md" />
                        <div>
                          <p className="text-xs font-bold text-white">Bitcoin (BTC)</p>
                          <p className="text-[10px] text-[#77837b]">Network: Bitcoin Mainnet</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-[#d9b66f]">BTC</span>
                    </div>
                    <div className="rounded bg-black/40 p-2.5 flex items-center justify-between border border-white/5 gap-2">
                      <span className="font-mono text-xs text-[#adc9a1] truncate select-all">{depositWallets.btc_address}</span>
                      <button
                        onClick={() => handleCopyWallet("btc", depositWallets.btc_address)}
                        className="p-1.5 rounded bg-white/10 hover:bg-[#c9754d] text-white transition shrink-0"
                        title="Copy Bitcoin Address"
                      >
                        {copiedWalletKey === "btc" ? <Check size={14} className="text-[#adc9a1]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* ETH */}
                  <div className="rounded-lg border border-white/10 bg-[#0e1311] p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <BrandLogoBadge code="eth" size="md" />
                        <div>
                          <p className="text-xs font-bold text-white">Ethereum (ETH)</p>
                          <p className="text-[10px] text-[#77837b]">Network: Ethereum (ERC-20)</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-[#627EEA]">ERC-20</span>
                    </div>
                    <div className="rounded bg-black/40 p-2.5 flex items-center justify-between border border-white/5 gap-2">
                      <span className="font-mono text-xs text-[#adc9a1] truncate select-all">{depositWallets.eth_address}</span>
                      <button
                        onClick={() => handleCopyWallet("eth", depositWallets.eth_address)}
                        className="p-1.5 rounded bg-white/10 hover:bg-[#c9754d] text-white transition shrink-0"
                        title="Copy Ethereum Address"
                      >
                        {copiedWalletKey === "eth" ? <Check size={14} className="text-[#adc9a1]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* USDT */}
                  <div className="rounded-lg border border-white/10 bg-[#0e1311] p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <BrandLogoBadge code="usdt" size="md" />
                        <div>
                          <p className="text-xs font-bold text-white">Tether (USDT)</p>
                          <p className="text-[10px] text-[#77837b]">Network: TRON (TRC-20) / Ethereum</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-[#26A17B]">TRC-20</span>
                    </div>
                    <div className="rounded bg-black/40 p-2.5 flex items-center justify-between border border-white/5 gap-2">
                      <span className="font-mono text-xs text-[#adc9a1] truncate select-all">{depositWallets.usdt_trc20_address}</span>
                      <button
                        onClick={() => handleCopyWallet("usdt", depositWallets.usdt_trc20_address)}
                        className="p-1.5 rounded bg-white/10 hover:bg-[#c9754d] text-white transition shrink-0"
                        title="Copy USDT Address"
                      >
                        {copiedWalletKey === "usdt" ? <Check size={14} className="text-[#adc9a1]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* SOL */}
                  <div className="rounded-lg border border-white/10 bg-[#0e1311] p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <BrandLogoBadge code="sol" size="md" />
                        <div>
                          <p className="text-xs font-bold text-white">Solana (SOL)</p>
                          <p className="text-[10px] text-[#77837b]">Network: Solana Mainnet</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-[#9945FF]">SOL</span>
                    </div>
                    <div className="rounded bg-black/40 p-2.5 flex items-center justify-between border border-white/5 gap-2">
                      <span className="font-mono text-xs text-[#adc9a1] truncate select-all">{depositWallets.sol_address}</span>
                      <button
                        onClick={() => handleCopyWallet("sol", depositWallets.sol_address)}
                        className="p-1.5 rounded bg-white/10 hover:bg-[#c9754d] text-white transition shrink-0"
                        title="Copy Solana Address"
                      >
                        {copiedWalletKey === "sol" ? <Check size={14} className="text-[#adc9a1]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* BANK WIRE INSTRUCTIONS */}
                {depositWallets.bank_wire_info && (
                  <div className="rounded-lg border border-white/10 bg-[#0e1311] p-5">
                    <p className="text-xs font-bold text-[#adc9a1] uppercase tracking-wider">Direct Bank Wire Instructions</p>
                    <p className="mt-2 font-mono text-xs text-white/90 whitespace-pre-line leading-relaxed">
                      {depositWallets.bank_wire_info}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 4: TRANSACTION HISTORY VIEW */}
          {currentView === "transactions" && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">Account Log</p>
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-white">Full Transaction History</h1>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                <h3 className="font-serif text-xl text-white mb-4">Executed Ledger Transactions</h3>
                {transactions.length === 0 ? (
                  <p className="py-10 text-center text-xs text-[#77837b]">No settled ledger transactions recorded yet.</p>
                ) : (
                  <div className="divide-y divide-white/10">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="py-4 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-white">{tx.description}</p>
                          <p className="text-[10px] text-[#77837b] mt-0.5">{new Date(tx.created_at).toLocaleString()}</p>
                        </div>
                        <span className={`font-mono text-sm font-bold ${tx.direction === "credit" ? "text-[#adc9a1]" : "text-[#d88761]"}`}>
                          {tx.direction === "credit" ? "+" : "-"}{money(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 5: PROFILE & ACCOUNT SETTINGS VIEW */}
          {currentView === "profile" && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">Client Account</p>
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-white">Profile & Security Settings</h1>
                <p className="mt-2 text-xs sm:text-sm text-[#8e9b91]">
                  Manage your personal account profile, verification status, and security preferences.
                </p>
              </div>

              {/* Profile Card */}
              <div className="rounded-xl border border-white/10 bg-[#151c19] p-7 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#c9754d] to-[#d9b66f] flex items-center justify-center font-serif text-2xl font-bold text-white shadow-lg">
                      {name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-2xl text-white font-semibold">{name}</h2>
                        {account?.kyc_status === "verified" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#adc9a1]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#adc9a1] uppercase">
                            <ShieldCheck size={12} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#d9b66f]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#d9b66f] uppercase">
                            <ShieldAlert size={12} /> {account?.kyc_status === "pending" ? "Pending Review" : "Unverified"}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-xs text-[#77837b]">Client Account ID: {account?.user_id || "USR-10892"}</p>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d88761]/20 px-5 py-2.5 text-xs font-semibold text-[#d88761] border border-[#d88761]/40 hover:bg-[#d88761] hover:text-white transition shadow-md"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                  <div className="rounded-lg bg-[#0e1311] p-4 border border-white/5">
                    <p className="text-[10px] uppercase text-[#77837b] font-semibold">Account Tier</p>
                    <p className="mt-1 text-sm font-semibold text-[#d9b66f] uppercase">{account?.account_tier || "Standard Institutional"}</p>
                  </div>
                  <div className="rounded-lg bg-[#0e1311] p-4 border border-white/5">
                    <p className="text-[10px] uppercase text-[#77837b] font-semibold">KYC Verification</p>
                    <p className="mt-1 text-sm font-semibold text-[#adc9a1] capitalize">{account?.kyc_status || "not_started"}</p>
                  </div>
                  <div className="rounded-lg bg-[#0e1311] p-4 border border-white/5">
                    <p className="text-[10px] uppercase text-[#77837b] font-semibold">Base Currency</p>
                    <p className="mt-1 text-sm font-semibold text-white font-mono">{baseCurrency}</p>
                  </div>
                  <div className="rounded-lg bg-[#0e1311] p-4 border border-white/5">
                    <p className="text-[10px] uppercase text-[#77837b] font-semibold">Security Status</p>
                    <p className="mt-1 text-sm font-semibold text-[#adc9a1]">Protected & Encrypted</p>
                  </div>
                </div>
              </div>

              {/* KYC Document Submission Card */}
              <div className="rounded-xl border border-white/10 bg-[#151c19] p-7 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#c9754d]/20 text-[#c9754d]">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-white">KYC Document Verification</h3>
                      <p className="text-xs text-[#8e9b91]">Submit government-issued identification to verify your investment account.</p>
                    </div>
                  </div>

                  {account?.kyc_status === "verified" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#adc9a1]/20 px-4 py-2 text-xs font-bold text-[#adc9a1]">
                      <CheckCircle2 size={16} /> Account Verified
                    </span>
                  ) : account?.kyc_status === "pending" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#d9b66f]/20 px-4 py-2 text-xs font-bold text-[#d9b66f]">
                      <LoaderCircle size={16} className="animate-spin" /> Pending Compliance Review
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowKycModal(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c9754d] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#b66543] transition shadow-lg"
                    >
                      <Upload size={15} />
                      <span>Submit KYC Document</span>
                    </button>
                  )}
                </div>

                {/* Direct Inline KYC Submission Form if Not Verified */}
                {account?.kyc_status !== "verified" && (
                  <form onSubmit={handleKycSubmit} className="space-y-4 rounded-xl bg-[#0e1311] p-5 border border-white/5">
                    <h4 className="font-serif text-sm text-white font-semibold flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#c9754d]" />
                      Upload Identification Document (Cloudinary dunqe09gc)
                    </h4>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#8e9b91] uppercase">Document Type</label>
                        <select
                          value={kycDocType}
                          onChange={(e) => setKycDocType(e.target.value)}
                          className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#151c19] px-3 text-xs text-white outline-none focus:border-[#c9754d]"
                        >
                          <option value="Passport">International Passport</option>
                          <option value="Driver License">National Driver's License</option>
                          <option value="National ID">Government ID Card</option>
                          <option value="Proof of Address">Utility Bill / Proof of Address</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#8e9b91] uppercase">Document / Passport ID Number</label>
                        <input
                          type="text"
                          required
                          value={kycDocNumber}
                          onChange={(e) => setKycDocNumber(e.target.value)}
                          placeholder="e.g. A09482018"
                          className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#151c19] px-3 text-xs text-white outline-none focus:border-[#c9754d]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#8e9b91] uppercase">Upload Document Photo / File</label>
                      <div className="mt-1.5 flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUploadToCloudinary}
                          className="w-full text-xs text-[#8e9b91] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#c9754d] file:text-white hover:file:bg-[#b66543] cursor-pointer"
                        />
                        {kycDocUrl && (
                          <span className="text-[11px] text-[#adc9a1] font-mono shrink-0 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Attached
                          </span>
                        )}
                      </div>
                      {kycDocUrl && (
                        <div className="mt-3 max-w-xs overflow-hidden rounded-lg border border-white/10 bg-[#151c19] p-2">
                          <p className="text-[10px] text-[#77837b] mb-1">Uploaded Preview:</p>
                          <img src={kycDocUrl} alt="KYC Document Preview" className="max-h-28 w-full object-cover rounded" />
                        </div>
                      )}
                    </div>

                    {kycStatusMsg && (
                      <p className={`text-xs font-medium ${kycStatusMsg.type === "success" ? "text-[#adc9a1]" : "text-[#d88761]"}`}>
                        {kycStatusMsg.text}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={uploadingKyc}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#c9754d] px-6 py-3 text-xs font-semibold text-white hover:bg-[#b66543] transition disabled:opacity-50"
                    >
                      {uploadingKyc ? <LoaderCircle size={15} className="animate-spin" /> : <Upload size={15} />}
                      <span>{uploadingKyc ? "Submitting Document..." : "Submit KYC Document for Review"}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Change Password & Security Card */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Change Password Form */}
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6 space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="p-2 rounded-lg bg-[#c9754d]/20 text-[#c9754d]">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white">Change Account Password</h3>
                      <p className="text-[11px] text-[#8e9b91]">Update your sign-in password securely.</p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#8e9b91] uppercase">New Password</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 characters..."
                        className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#0e1311] px-3 text-xs text-white outline-none focus:border-[#c9754d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#8e9b91] uppercase">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password..."
                        className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#0e1311] px-3 text-xs text-white outline-none focus:border-[#c9754d]"
                      />
                    </div>

                    {passwordStatus && (
                      <p className={`text-xs font-medium ${passwordStatus.type === "success" ? "text-[#adc9a1]" : "text-[#d88761]"}`}>
                        {passwordStatus.text}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={updatingPassword}
                      className="w-full rounded-lg bg-[#c9754d] py-3 text-xs font-semibold text-white hover:bg-[#b66543] transition disabled:opacity-50"
                    >
                      {updatingPassword ? "Updating Password..." : "Update Password"}
                    </button>
                  </form>
                </div>

                {/* Account Details & Sign Out Box */}
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <div className="p-2 rounded-lg bg-[#c9754d]/20 text-[#c9754d]">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-white">My Account Details</h3>
                        <p className="text-[11px] text-[#8e9b91]">System domain & credentials overview.</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#8e9b91]">
                        <span>Email Address</span>
                        <span className="font-mono text-[#adc9a1] font-semibold">{account?.email || userEmail || "client@infinifinancialmanagement.com"}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#8e9b91]">
                        <span>Account Holder</span>
                        <span className="font-semibold text-white">{name}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#8e9b91]">
                        <span>Client User ID</span>
                        <span className="font-mono text-white">{account?.user_id || "USR-10892"}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#8e9b91]">
                        <span>Base Currency</span>
                        <select
                          value={baseCurrency}
                          onChange={(e) => handleCurrencyChange(e.target.value)}
                          className="rounded bg-[#0e1311] border border-[#c9754d]/50 px-3 py-1 text-xs font-mono font-bold text-[#c9754d] outline-none focus:border-[#c9754d] transition cursor-pointer hover:border-[#c9754d]"
                        >
                          <option value="USD">USD ($ - US Dollar)</option>
                          <option value="EUR">EUR (€ - Euro)</option>
                          <option value="GBP">GBP (£ - British Pound)</option>
                          <option value="JPY">JPY (¥ - Japanese Yen)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#d88761]/20 py-3 text-xs font-semibold text-[#d88761] border border-[#d88761]/40 hover:bg-[#d88761] hover:text-white transition"
                    >
                      <LogOut size={16} />
                      <span>Log Out of INFINI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: REFERRAL & REWARDS VIEW */}
          {currentView === "referrals" && (
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-[#c9754d]">Partnership Program</p>
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-white">Referral Rewards & Network</h1>
                <p className="mt-2 text-xs sm:text-sm text-[#8e9b91]">
                  Earn an instant 5% capital bonus on every sector allocation made by clients referred by you.
                </p>
              </div>

              {/* Referral Banner */}
              <div className="rounded-xl bg-gradient-to-br from-[#1c2722] to-[#151c19] border border-[#c9754d]/30 p-8 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9754d]/20 px-3 py-1 text-xs font-semibold text-[#c9754d]">
                      <Gift size={14} /> Referral Commission
                    </span>
                    <h2 className="mt-3 font-serif text-3xl text-white font-semibold">Earn 5% Bonus Capital</h2>
                    <p className="mt-2 text-xs text-[#a7b1a8] max-w-xl">
                      Invite accredited investors, institutions, or partners to INFINI. You receive 5% credited directly into your Available Balance for every completed deposit.
                    </p>
                  </div>

                  <button
                    onClick={handleCopyRef}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c9754d] px-6 py-3 text-xs font-semibold text-white hover:bg-[#b66543] transition shadow-lg shrink-0"
                  >
                    {copiedRef ? <Check size={16} /> : <Share2 size={16} />}
                    <span>{copiedRef ? "Link Copied!" : "Copy Invite Link"}</span>
                  </button>
                </div>

                {/* Referral Link Box */}
                <div className="mt-6 rounded-lg bg-[#0e1311] p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="w-full truncate font-mono text-xs text-[#adc9a1]">{refLink}</div>
                  <button
                    onClick={handleCopyRef}
                    className="w-full sm:w-auto rounded bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20 transition shrink-0"
                  >
                    {copiedRef ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>

              {/* Referral Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <p className="text-[10px] uppercase text-[#77837b] font-semibold">Commission Rate</p>
                  <p className="mt-2 font-serif text-3xl text-[#c9754d] font-bold">5.0%</p>
                  <p className="mt-1 text-[11px] text-[#8e9b91]">On All Referred Capital</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <p className="text-[10px] uppercase text-[#77837b] font-semibold">Total Referred Clients</p>
                  <p className="mt-2 font-serif text-3xl text-white font-bold">0</p>
                  <p className="mt-1 text-[11px] text-[#8e9b91]">Active Network Members</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151c19] p-6">
                  <p className="text-[10px] uppercase text-[#77837b] font-semibold">Earned Referral Bonus</p>
                  <p className="mt-2 font-serif text-3xl text-[#adc9a1] font-bold">{money(0)}</p>
                  <p className="mt-1 text-[11px] text-[#8e9b91]">Credited to Liquid Cash</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* REQUEST MODAL */}
      {selectedModalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-[#f5f0e8] p-7 text-[#213028] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#d3cbc0] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[.22em] text-[#c9754d] font-semibold">Service Action</p>
                <h2 className="font-serif text-2xl font-bold">{selectedModalAction.label}</h2>
              </div>
              <button onClick={() => setSelectedModalAction(null)} className="text-2xl font-light hover:text-[#c9754d]">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="mt-5 space-y-4">
              {selectedModalAction.needsAmount && (
                <div>
                  <label className="block text-xs font-semibold text-[#526158]">
                    Amount ({baseCurrency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="Enter amount..."
                    className="mt-1.5 h-12 w-full rounded-lg border border-[#d3cbc0] bg-transparent px-3 text-sm font-mono text-[#213028] outline-none focus:border-[#c9754d]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#526158]">
                  Client Reference Notes
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional note for the administrator..."
                  className="mt-1.5 w-full rounded-lg border border-[#d3cbc0] bg-transparent p-3 text-xs text-[#213028] outline-none focus:border-[#c9754d]"
                />
              </div>

              {modalMessage && <p className="text-xs text-[#a94835] font-semibold">{modalMessage}</p>}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModalAction(null)}
                  className="w-1/2 h-12 rounded-lg border border-[#d3cbc0] text-xs font-semibold text-[#526158] hover:bg-[#eae3d9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 h-12 rounded-lg bg-[#c9754d] text-xs font-semibold text-white hover:bg-[#b66543] disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit for Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
