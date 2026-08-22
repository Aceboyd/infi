"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const stories = [
  ["Lucas", "MEXICO", 33000, "https://i.pravatar.cc/120?img=12"], ["Amina", "NIGERIA", 12500, "https://i.pravatar.cc/120?img=47"], ["James", "USA", 47000, "https://i.pravatar.cc/120?img=68"], ["Chloe", "CANADA", 28000, "https://i.pravatar.cc/120?img=32"], ["Raj", "INDIA", 35000, "https://i.pravatar.cc/120?img=11"], ["Zara", "UK", 22000, "https://i.pravatar.cc/120?img=44"], ["Wei", "CHINA", 39000, "https://i.pravatar.cc/120?img=59"], ["Ahmed", "EGYPT", 15000, "https://i.pravatar.cc/120?img=53"], ["Liam", "AUSTRALIA", 27000, "https://i.pravatar.cc/120?img=13"], ["Sofia", "BRAZIL", 31000, "https://i.pravatar.cc/120?img=45"], ["Emma", "FRANCE", 26000, "https://i.pravatar.cc/120?img=49"], ["Hiroshi", "JAPAN", 34000, "https://i.pravatar.cc/120?img=60"], ["Fatima", "PAKISTAN", 18000, "https://i.pravatar.cc/120?img=48"], ["Mateo", "ARGENTINA", 29000, "https://i.pravatar.cc/120?img=69"], ["Anika", "GERMANY", 32000, "https://i.pravatar.cc/120?img=25"],
] as const;

export default function TestimonialPopup() {
  const [storyIndex, setStoryIndex] = useState(0);
  const story = stories[storyIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setStoryIndex((current) => (current + 1) % stories.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
        <motion.aside
          key={storyIndex}
          initial={{ opacity: 0, y: 28, rotateY: 10 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ delay: 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 900 }}
          className="fixed bottom-5 left-5 z-40 w-[min(280px,calc(100vw-2.5rem))] border border-[#d3cbc0] bg-[#faf7f2] px-4 py-3 text-[#213028] shadow-2xl sm:bottom-7 sm:left-7"
        >
          <div className="flex items-center gap-3"><div className="h-8 w-8 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${story[3]})` }} /><div className="min-w-0"><p className="text-xs text-[#526158]"><span className="font-medium text-[#213028]">{story[0]}</span> from {story[1]} just earned <span className="font-medium text-[#c9754d]">${story[2].toLocaleString()}</span></p><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#8a958c]">INFINI community</p></div><ArrowUpRight size={15} className="ml-auto shrink-0 text-[#c9754d]" /></div>
        </motion.aside>
    </AnimatePresence>
  );
}
