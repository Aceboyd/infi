"use client";

import React from "react";

type LogoProps = {
  code: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export default function BrandLogoBadge({ code, size = "md", className = "" }: LogoProps) {
  const normalized = code.toLowerCase().trim();

  const sizeClasses = {
    sm: "h-7 w-7 text-xs rounded-md",
    md: "h-10 w-10 text-sm rounded-lg",
    lg: "h-14 w-14 text-base rounded-xl",
    xl: "h-20 w-20 text-xl rounded-2xl",
  }[size];

  // Render authentic styled SVG/CSS logo representations
  switch (normalized) {
    case "google":
    case "googl":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center font-bold font-sans text-white shadow-md relative overflow-hidden bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] ${className}`}
          title="Google (Alphabet)"
        >
          <div className="absolute inset-0 bg-[#4285F4] opacity-20" />
          <span className="relative z-10 text-white font-extrabold text-[115%] drop-shadow">G</span>
        </div>
      );

    case "amazon":
    case "amzn":
      return (
        <div
          className={`${sizeClasses} flex flex-col items-center justify-center bg-[#131921] font-bold text-white shadow-md relative p-1 ${className}`}
          title="Amazon"
        >
          <span className="font-sans font-black text-white text-[105%] tracking-tighter leading-none">a</span>
          <svg className="w-3.5 h-1.5 text-[#FF9900] mt-0.5" viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M2 5 Q12 9 22 2 M18 1 L22 2 L20 6" />
          </svg>
        </div>
      );

    case "netflix":
    case "nflx":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-black font-black text-[#E50914] shadow-md ${className}`}
          title="Netflix"
        >
          <span className="font-serif tracking-widest text-[120%] transform -scale-y-95 font-extrabold">N</span>
        </div>
      );

    case "tesla":
    case "tsla":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#EAEAEA] text-[#E82127] font-black shadow-md ${className}`}
          title="Tesla"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 4.5c4 0 7-1 9-2.5-.5 2-2.5 4.5-9 4.5s-8.5-2.5-9-4.5c2 1.5 5 2.5 9 2.5zm0 2.5c2.5 0 4 .2 5 .5l-1 10.5h-8l-1-10.5c1-.3 2.5-.5 5-.5z" />
          </svg>
        </div>
      );

    case "apple":
    case "aapl":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#1C1C1E] text-white shadow-md ${className}`}
          title="Apple"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.1-3.32-2.65-7.25-7.3-11.79-13.96-6.41-9.45-11.44-19.86-15.08-31.25-3.64-11.39-5.46-22.18-5.46-32.38 0-14.65 3.73-26.4 11.19-35.26 7.46-8.86 16.73-13.37 27.81-13.52 4.7 0 9.87 1.15 15.52 3.46 5.65 2.31 9.49 3.46 11.52 3.46 1.83 0 5.8-1.22 11.91-3.66 6.11-2.44 11.35-3.56 15.72-3.36 12.24.58 21.84 4.88 28.81 12.9-10.7 6.47-15.93 15.52-15.7 27.16.23 9.07 3.59 16.6 10.07 22.58 6.49 5.98 14.19 9.3 23.11 9.96-2.23 6.64-4.83 13.06-7.8 19.26zM119.22 31.84c0-7.3 2.65-14.28 7.95-20.94 5.3-6.66 11.98-10.63 20.04-11.9.12 1.05.18 1.98.18 2.79 0 7.34-2.71 14.4-8.13 21.18-5.42 6.78-12.22 10.74-20.04 11.87z" />
          </svg>
        </div>
      );

    case "microsoft":
    case "msft":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#111] p-1.5 shadow-md ${className}`}
          title="Microsoft"
        >
          <div className="grid grid-cols-2 gap-1 w-5 h-5">
            <div className="bg-[#F25022] rounded-sm" />
            <div className="bg-[#7FBA00] rounded-sm" />
            <div className="bg-[#00A4EF] rounded-sm" />
            <div className="bg-[#FFB900] rounded-sm" />
          </div>
        </div>
      );

    case "nvidia":
    case "nvda":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#000] font-black text-[#76B900] shadow-md border border-[#76B900]/30 ${className}`}
          title="Nvidia"
        >
          <span className="font-mono text-[110%] tracking-tight">NV</span>
        </div>
      );

    case "bitcoin":
    case "btc":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#F7931A] text-white font-bold rounded-full shadow-md ${className}`}
          title="Bitcoin"
        >
          <span className="font-serif text-[125%] font-extrabold">₿</span>
        </div>
      );

    case "ethereum":
    case "eth":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-gradient-to-b from-[#627EEA] to-[#3B426B] text-white rounded-full shadow-md ${className}`}
          title="Ethereum"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 784 1277">
            <path d="M392.07 0L383.5 29.11V873.74L392.07 882.29L784.13 650.54L392.07 0Z" opacity="0.6" />
            <path d="M392.07 0L0 650.54L392.07 882.29V472.33V0Z" />
            <path d="M392.07 956.52L387.24 962.41V1265.51L392.07 1276.99L784.37 724.89L392.07 956.52Z" opacity="0.6" />
            <path d="M392.07 1276.99V956.52L0 724.89L392.07 1276.99Z" />
          </svg>
        </div>
      );

    case "solana":
    case "sol":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-gradient-to-tr from-[#9945FF] to-[#14F195] text-white font-bold shadow-md ${className}`}
          title="Solana"
        >
          <span className="font-mono text-[105%] font-black tracking-tighter">SOL</span>
        </div>
      );

    case "binance":
    case "bnb":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#F3BA2F] text-[#14151A] font-black shadow-md ${className}`}
          title="Binance"
        >
          <span className="font-sans text-[105%] font-extrabold">BNB</span>
        </div>
      );

    case "cardano":
    case "ada":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#0033AD] text-white font-bold rounded-full shadow-md ${className}`}
          title="Cardano"
        >
          <span className="font-mono text-[100%] font-black">ADA</span>
        </div>
      );

    case "tsmc":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#CC0000] text-white font-black shadow-md ${className}`}
          title="TSMC"
        >
          <span className="font-mono text-[95%] font-extrabold tracking-tighter">TSMC</span>
        </div>
      );

    case "thc":
    case "cbd":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#1E4D2B] text-[#76C987] font-bold rounded-full shadow-md border border-[#76C987]/30 ${className}`}
          title="Medical THC & Extract"
        >
          <span className="font-serif text-[105%] font-black">THC</span>
        </div>
      );

    case "reit":
    case "estate":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#1C2833] text-[#D4AC0D] font-bold shadow-md border border-[#D4AC0D]/30 ${className}`}
          title="Real Estate REIT"
        >
          <span className="font-mono text-[90%] font-extrabold tracking-tighter">REIT</span>
        </div>
      );

    case "oil":
    case "brent":
    case "rig":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#17202A] text-[#E67E22] font-black shadow-md border border-[#E67E22]/30 ${className}`}
          title="Petroleum & Oil Drilling"
        >
          <span className="font-mono text-[90%] font-black">OIL</span>
        </div>
      );

    case "agri":
    case "farm":
    case "agritech":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#145A32] text-[#2ECC71] font-bold shadow-md ${className}`}
          title="AgTech & Smart Farm"
        >
          <span className="font-mono text-[85%] font-black">AGRI</span>
        </div>
      );

    case "forex":
    case "fx":
    case "eurusd":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#1B4F72] text-[#5DADE2] font-black shadow-md ${className}`}
          title="Forex Exchange"
        >
          <span className="font-mono text-[85%] font-black">FX</span>
        </div>
      );

    case "gold":
    case "metals":
    case "bullion":
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-gradient-to-tr from-[#B7950B] to-[#F1C40F] text-[#1C2833] font-black rounded-full shadow-md ${className}`}
          title="Rare Metals & Gold Bullion"
        >
          <span className="font-serif text-[105%] font-extrabold">AU</span>
        </div>
      );

    default:
      return (
        <div
          className={`${sizeClasses} flex items-center justify-center bg-[#243229] border border-white/10 text-[#c9754d] font-bold font-mono shadow-md ${className}`}
        >
          {code.slice(0, 4).toUpperCase()}
        </div>
      );
  }
}

/**
 * Grid of stock logos inspired by real stock & trading apps (e.g. Google G, Amazon a—, Netflix N, Tesla T)
 */
export function RealStockLogosGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto p-3 bg-white/5 rounded-2xl border border-white/10 shadow-2xl">
      {/* Google G */}
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 transition transform hover:scale-105">
        <BrandLogoBadge code="google" size="lg" />
        <span className="mt-2 text-[11px] font-bold text-gray-800 tracking-tight">Alphabet (GOOGL)</span>
      </div>

      {/* Amazon a— */}
      <div className="flex flex-col items-center justify-center bg-[#131921] p-4 rounded-xl shadow-lg border border-gray-800 transition transform hover:scale-105">
        <BrandLogoBadge code="amazon" size="lg" />
        <span className="mt-2 text-[11px] font-bold text-white tracking-tight">Amazon (AMZN)</span>
      </div>

      {/* Netflix N */}
      <div className="flex flex-col items-center justify-center bg-black p-4 rounded-xl shadow-lg border border-gray-900 transition transform hover:scale-105">
        <BrandLogoBadge code="netflix" size="lg" />
        <span className="mt-2 text-[11px] font-bold text-white tracking-tight">Netflix (NFLX)</span>
      </div>

      {/* Tesla T */}
      <div className="flex flex-col items-center justify-center bg-[#F4F4F5] p-4 rounded-xl shadow-lg border border-gray-200 transition transform hover:scale-105">
        <BrandLogoBadge code="tesla" size="lg" />
        <span className="mt-2 text-[11px] font-bold text-gray-900 tracking-tight">Tesla (TSLA)</span>
      </div>
    </div>
  );
}
