"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const people = [
  ["Lucas", "MEXICO", 33000, "https://i.pravatar.cc/160?img=12"],
  ["Amina", "NIGERIA", 12500, "https://i.pravatar.cc/160?img=47"],
  ["James", "USA", 47000, "https://i.pravatar.cc/160?img=68"],
  ["Chloe", "CANADA", 28000, "https://i.pravatar.cc/160?img=32"],
  ["Raj", "INDIA", 35000, "https://i.pravatar.cc/160?img=11"],
  ["Zara", "UK", 22000, "https://i.pravatar.cc/160?img=44"],
  ["Wei", "CHINA", 39000, "https://i.pravatar.cc/160?img=59"],
  ["Ahmed", "EGYPT", 15000, "https://i.pravatar.cc/160?img=53"],
  ["Liam", "AUSTRALIA", 27000, "https://i.pravatar.cc/160?img=13"],
] as const;

export default function TestimonyGallery() {
  const [slide, setSlide] = useState(0);
  const totalSlides = Math.ceil(people.length / 3);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % totalSlides), 5500);
    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const visiblePeople = people.slice(slide * 3, slide * 3 + 3);

  return <section id="testimonials" className="border-t border-[#d9d2c8] bg-[#f8f4ee] px-6 py-24 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">Testimony</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">A global community, moving forward.</h2></div><div className="flex items-end justify-between gap-8"><p className="max-w-xs text-sm leading-6 text-[#758179]">Real goals look different for everyone. The clarity is shared.</p><div className="flex gap-2"><button onClick={() => setSlide((current) => (current - 1 + totalSlides) % totalSlides)} aria-label="Previous testimonies" className="flex h-9 w-9 items-center justify-center border border-[#c9c0b5] text-[#758179] transition hover:border-[#c9754d] hover:text-[#c9754d]"><ArrowLeft size={15} /></button><button onClick={() => setSlide((current) => (current + 1) % totalSlides)} aria-label="Next testimonies" className="flex h-9 w-9 items-center justify-center border border-[#c9c0b5] text-[#758179] transition hover:border-[#c9754d] hover:text-[#c9754d]"><ArrowRight size={15} /></button></div></div></div><div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">{visiblePeople.map(([name, country, , image]) => <article key={name} className="group"><div className="aspect-[1.15] w-[70%] max-w-[250px] overflow-hidden bg-[#eae3d9] sm:w-[92%] sm:max-w-none"><div className="h-full w-full bg-cover bg-center grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" style={{ backgroundImage: `url(${image})` }} /></div><div className="mt-4"><h3 className="font-serif text-2xl">{name}</h3><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#758179]">{country}</p><p className="mt-3 text-sm leading-6 text-[#758179]">“A clearer view has made my next decision feel much easier.”</p></div></article>)}</div><div className="mt-10 flex gap-2">{Array.from({ length: totalSlides }, (_, index) => <button key={index} onClick={() => setSlide(index)} aria-label={`Show testimony slide ${index + 1}`} className={`h-1 transition-all ${index === slide ? "w-8 bg-[#c9754d]" : "w-3 bg-[#c9c0b5]"}`} />)}</div></div></section>;
}
