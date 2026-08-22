"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.96", "start 0.3"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.28, 1], [0.3, 0.82, 1]);

  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, scale, y, opacity, transformPerspective: 1400, transformStyle: "preserve-3d", transformOrigin: "center bottom", backfaceVisibility: "hidden" }} className={`min-w-0 ${className}`}>
      {children}
    </motion.div>
  );
}

export function MarketSnapshot() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.3"] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [14, -3]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [-5, 4]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -10]);

  return (
    <motion.div ref={ref} style={{ rotateY, rotateX, y, transformPerspective: 1200 }} className="relative mx-auto w-full max-w-[430px]">
      <div className="absolute -inset-5 border border-[#c9754d]/20" />
      <div className="relative border border-[#ffffff]/10 bg-[#1d2b24] p-6 text-[#f5f0e8] shadow-2xl sm:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-[10px] uppercase tracking-[0.24em] text-[#8fa293]">Market perspective</p><p className="mt-2 font-serif text-2xl">Global markets</p></div><span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#adc9a1]/40 text-[#adc9a1]">↗</span></div>
        <div className="mt-7 grid grid-cols-2 gap-5"><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#77837b]">MSCI World</p><p className="mt-2 text-lg">3,842.17</p><p className="mt-1 text-xs text-[#adc9a1]">+1.24%</p></div><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#77837b]">S&amp;P 500</p><p className="mt-2 text-lg">5,631.28</p><p className="mt-1 text-xs text-[#adc9a1]">+0.68%</p></div></div>
        <div className="mt-8 h-28"><svg viewBox="0 0 390 110" className="h-full w-full" preserveAspectRatio="none"><path d="M0 88 C36 81 50 83 78 67 S121 73 145 56 S184 59 208 43 S252 51 274 35 S320 44 345 20 S370 21 390 10" fill="none" stroke="#adc9a1" strokeWidth="3" strokeLinecap="round" /><path d="M0 105 C46 95 68 102 96 88 S143 94 172 77 S212 84 238 72 S285 78 311 59 S350 67 390 48" fill="none" stroke="#d88761" strokeWidth="2" strokeDasharray="5 6" /></svg></div>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-[#77837b]"><span>Updated moments ago</span><span className="text-[#d88761]">View insights →</span></div>
      </div>
    </motion.div>
  );
}
