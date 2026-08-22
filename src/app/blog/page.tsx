import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

const fallbackArticles = [
  { headline: "Goldmine rush", summary: "While Bitcoin remains the king of the crypto realm, altcoins and alternative digital assets continue to draw attention.", date: "January 23, 2024" },
  { headline: "London stocks boosted by miners, banks; post weekly gains", summary: "UK shares advanced, driven by gains in miners and banks as the indexes closed the week higher.", date: "February 18, 2024" },
  { headline: "Wall St Week Ahead: Nvidia earnings test US stock market AI dreams", summary: "The chipmaker&apos;s earnings report could offer an important test for the market&apos;s enthusiasm around artificial intelligence.", date: "February 18, 2024" },
  { headline: "Nonfarm payrolls seen up 210K — data week ahead", summary: "Median forecasts point to another important week of US economic data and labor-market signals.", date: "March 2, 2024" },
  { headline: "March madness: What to expect from ASX stocks this month", summary: "With summer ending and earnings season complete, investors are turning their attention to the next market catalysts.", date: "March 2, 2024" },
  { headline: "Bitcoin repeats a bull move that could propel BTC to $180K", summary: "One cryptocurrency analyst suggests market psychology may repeat a pattern seen during previous Bitcoin cycles.", date: "March 2, 2024" },
];

type NewsArticle = {
  headline: string;
  summary: string;
  url: string;
  image?: string;
  source?: string;
  datetime?: number;
  date?: string;
};

const fallbackNews = () => fallbackArticles.map((article) => ({ ...article, summary: article.summary.replace("&apos;", "'") , url: "#", source: "INFINI editorial" }));

async function getFinanceNews(): Promise<{ articles: NewsArticle[]; live: boolean }> {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return { articles: fallbackNews(), live: false };

  try {
    const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${apiKey}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Finance news request failed");
    const news = (await response.json()) as NewsArticle[];
    return { articles: news.filter((article) => article.headline && article.url).slice(0, 6), live: true };
  } catch {
    return { articles: fallbackNews(), live: false };
  }
}

export default async function BlogPage() {
  const { articles, live } = await getFinanceNews();

  return (
    <main className="min-h-screen bg-[#f3eee6] text-[#213028]">
      <header className="border-b border-[#d3cbc0] px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#758179] hover:text-[#c9754d]"
          >
            <ArrowLeft size={15} /> Back home
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex items-center gap-3"><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">INFINI journal</p><span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#758179]"><i className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#78966e]" : "bg-[#d9b66f]"}`} /> {live ? "Live market feed" : "Editorial preview"}</span></div>
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><h1 className="mt-5 max-w-2xl font-serif text-5xl leading-tight sm:text-7xl">Latest News</h1><p className="mt-4 max-w-xl text-sm leading-7 text-[#758179]">Market developments, investment perspectives, and financial stories worth understanding.</p></div><label className="flex h-11 items-center border border-[#d3cbc0] bg-[#faf7f2] px-3 text-xs text-[#758179]"><span className="mr-3">Search</span><input type="search" placeholder="Search news" className="w-28 bg-transparent outline-none placeholder:text-[#a3aaa3]" /></label></div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {articles.map((article, index) => (
            <article key={`${article.headline}-${index}`} className="group border-t border-[#c9c0b5] pt-5">
              <span className="font-serif text-2xl text-[#c9754d]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {article.image && <div className="mt-8 aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />}
              <h2 className="mt-8 font-serif text-2xl">{article.headline}</h2>
              <p className="mt-4 text-sm leading-7 text-[#758179]">{article.summary}</p>
              <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[#8a958c]"><span>{article.source ?? "INFINI editorial"}</span><span>{article.date ?? (article.datetime ? new Date(article.datetime * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Latest" )}</span></div>
              {article.url !== "#" ? <a href={article.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center text-xs text-[#c9754d]">Read more <ArrowRight className="ml-1" size={14} /></a> : <button className="mt-5 inline-flex items-center text-xs text-[#c9754d]">Read more <ArrowRight className="ml-1" size={14} /></button>}
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
