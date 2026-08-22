"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=85",
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <div className="relative h-full min-h-[570px] w-full max-w-none overflow-hidden border-0 bg-[#1d2b24]">
      <AnimatePresence mode="wait">
        <motion.div key={slide} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.8 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(21,33,28,.05), rgba(21,33,28,.42)), url(${slide})` }} />
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 flex justify-end p-6 sm:p-8"><div className="flex items-center gap-5"><div className="flex gap-2">{slides.map((item, index) => <button key={item} onClick={() => setActive(index)} aria-label={`Show hero slide ${index + 1}`} className={`h-1 transition-all ${active === index ? "w-8 bg-[#d88761]" : "w-3 bg-white/70"}`} />)}</div><div className="flex gap-2"><button onClick={() => setActive((active - 1 + slides.length) % slides.length)} aria-label="Previous hero slide" className="flex h-8 w-8 items-center justify-center border border-white/40 text-white hover:bg-white/10"><ArrowLeft size={14} /></button><button onClick={() => setActive((active + 1) % slides.length)} aria-label="Next hero slide" className="flex h-8 w-8 items-center justify-center border border-white/40 text-white hover:bg-white/10"><ArrowRight size={14} /></button></div></div></div>
    </div>
  );
}
