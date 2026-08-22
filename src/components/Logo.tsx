import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="INFINI home">
      <span className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${light ? "border-[#f7d8c3]" : "border-[#c9754d]"}`}>
        <span className={`absolute h-4 w-4 rounded-full border-2 ${light ? "border-[#f7d8c3]" : "border-[#c9754d]"}`} />
        <span className={`absolute h-1.5 w-1.5 rounded-full ${light ? "bg-[#f7d8c3]" : "bg-[#c9754d]"}`} />
      </span>
      <span>
        <span className={`block font-serif text-xl tracking-[0.17em] ${light ? "text-[#fffaf4]" : "text-[#213028]"}`}>INFINI</span>
        <span className={`block text-[8px] uppercase tracking-[0.27em] ${light ? "text-[#f7d8c3]" : "text-[#77837b]"}`}>Financial management</span>
      </span>
    </Link>
  );
}