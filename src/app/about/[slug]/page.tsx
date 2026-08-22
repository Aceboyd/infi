import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

const pages: Record<
  string,
  { label: string; title: string; copy: string; points: string[] }
> = {
  history: {
    label: "Our history",
    title: "Built for the long view.",
    copy: "INFINI Financial Management has navigated changing markets for more than three decades. Founded in 2000 by visionary investment professionals, the firm has grown through disciplined research, adaptive strategies, and an enduring commitment to its clients.",
    points: [
      "Founded in 2000 by experienced investment professionals",
      "Expanded from fundamental research into systematic and global strategies",
      "Continues to combine innovation with disciplined risk management",
    ],
  },
  "client-education": {
    label: "Client education",
    title: "Understand more. Decide with confidence.",
    copy: "Good financial decisions begin with useful context. Our education resources help you make sense of markets, strategies, and the choices in front of you.",
    points: [
      "Plain-language market guides",
      "Practical portfolio perspectives",
      "Regular insights for long-term investors",
    ],
  },
  "our-team": {
    label: "Our team",
    title: "Thoughtful people behind thoughtful plans.",
    copy: "Our team brings together investment knowledge, operational care, and a respect for the details that make every client relationship matter.",
    points: [
      "Investment and planning specialists",
      "A culture of care and accountability",
      "Guidance shaped around your goals",
    ],
  },
  "privacy-policy": {
    label: "Privacy policy",
    title: "Your information deserves care.",
    copy: "We treat your privacy as part of the trust you place in INFINI. This page will contain the full policy, data practices, and your rights before production launch.",
    points: [
      "Secure account access",
      "Controlled handling of personal information",
      "Clear choices about your data",
    ],
  },
  "assets-under-management": {
    label: "Assets under management",
    title: "A wider view of what we steward.",
    copy: "INFINI helps clients make sense of the assets they are building across strategies, markets, and stages of life. Detailed reporting will be connected to live account data through Supabase.",
    points: [
      "Portfolio reporting in one place",
      "Clear strategy and allocation context",
      "Designed for durable growth",
    ],
  },
};

const history = [
  [
    "2000-2004",
    "Early years and founding",
    "INFINI was founded by seasoned investors who shared a vision of generating superior returns while carefully managing risk. Fundamental research, disciplined analysis, and a focus on market inefficiencies shaped our earliest decisions.",
  ],
  [
    "2005-2007",
    "Steady growth and market expansion",
    "A strong track record built investor confidence. We embraced quantitative models, systematic trading, and proprietary technology to read market opportunities with greater precision and speed.",
  ],
  [
    "2008-2010",
    "Navigating financial crises",
    "Rigorous risk management helped INFINI weather the global financial crisis. We remained disciplined through uncertainty and identified distressed opportunities during the recovery.",
  ],
  [
    "2011-2015",
    "Global reach and diversification",
    "As our reputation grew, we expanded across international markets and broadened our strategies across equities, digital assets, merger arbitrage, event-driven investing, and global macro.",
  ],
  [
    "2016-present",
    "Repositioning and innovation",
    "Data analytics, machine learning, artificial intelligence, blockchain, sustainable investing, and cryptocurrencies have expanded how we understand emerging opportunities while preserving our core values.",
  ],
];

const educationTopics = [
  ["Quarterly reviews", "Each quarter, our investment and research teams publish a considered review of market performance, economic trends, political developments, and the thinking behind our strategic portfolio decisions.", "01"],
  ["Market commentary", "Our daily market notes provide straight talk about the events shaping equities, currencies, and digital assets, helping you understand what deserves attention and what can be ignored.", "02"],
  ["High-touch client service", "Portfolio management is only part of the relationship. We take time to understand your needs and provide the context, access, and confidence required for long-term decisions.", "03"],
  ["Education and information", "From market explainers to portfolio conversations, we make complex financial ideas easier to follow so you can stay informed without being overwhelmed.", "04"],
];

const clientPrograms = ["INFINI market outlook seminars", "Investment roundtables", "Portfolio perspective sessions", "Client community events"];

const aumGroups = [
  ["Private Client Group", "Personalized portfolio strategies for families and individuals, shaped around their circumstances, objectives, and long-term investment goals."],
  ["Institutional Group", "Investment solutions for corporations, pension funds, foundations, endowments, insurers, healthcare organizations, governments, and investment companies."],
  ["Retirement Solutions", "Investment choices, participant support, administration, and fiduciary-minded guidance for employer-sponsored retirement plans."],
];

const team = [
  [
    "Avery Davis",
    "Chief Executive Officer",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Maya Chen",
    "Chief Investment Officer",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Daniel Morgan",
    "Portfolio Director",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Amara Okafor",
    "Head of Client Strategy",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Leila Hassan",
    "Risk Management Lead",
    "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Noah Williams",
    "Senior Research Analyst",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Sofia Martins",
    "Global Markets Director",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Raj Patel",
    "Digital Assets Strategist",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Emma Laurent",
    "Client Relationship Director",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "James Carter",
    "Quantitative Researcher",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Fatima Rahman",
    "Compliance Director",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Hiroshi Tanaka",
    "Investment Analyst",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Zara Williams",
    "Operations Director",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Liam O'Connor",
    "Technology Lead",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Anika Weber",
    "Financial Planner",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
  ],
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug] ?? pages.history;
  if (slug === "privacy-policy") {
    return <main className="min-h-screen bg-[#f3eee6] text-[#213028]"><header className="border-b border-[#d3cbc0] px-6 py-6 lg:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between"><Logo /><Link href="/" className="flex items-center gap-2 text-xs text-[#758179] hover:text-[#c9754d]"><ArrowLeft size={15} /> Back home</Link></div></header><section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32"><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">About INFINI · Privacy and governance</p><h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">Your privacy, our responsibility.</h1><p className="mt-8 max-w-3xl text-lg leading-9 text-[#526158]">Privacy is critically important to INFINI. We respect the personally identifiable information you provide through our website and use it responsibly to improve your experience, operate our services, and protect your account.</p><div className="mt-20 grid gap-5 md:grid-cols-2"><article className="border-t border-[#c9c0b5] pt-5"><h2 className="font-serif text-3xl">Website visitors</h2><p className="mt-5 text-sm leading-7 text-[#758179]">Like most website operators, we may collect browser type, language preference, referring site, and the date and time of requests. This helps us understand how visitors use INFINI and improve the website. We may also collect IP addresses and other information when you interact with secure account areas.</p></article><article className="border-t border-[#c9c0b5] pt-5"><h2 className="font-serif text-3xl">Personally identifying information</h2><p className="mt-5 text-sm leading-7 text-[#758179]">The amount and type of information we collect depends on how you interact with INFINI. We use it only for clear operational purposes such as account access, verification, support, security, and service delivery.</p></article><article className="border-t border-[#c9c0b5] pt-5"><h2 className="font-serif text-3xl">Security</h2><p className="mt-5 text-sm leading-7 text-[#758179]">We use commercially reasonable safeguards to protect personal information. No method of internet transmission or electronic storage is completely secure, so we continue to review and improve our security practices.</p></article><article className="border-t border-[#c9c0b5] pt-5"><h2 className="font-serif text-3xl">Cookies and partners</h2><p className="mt-5 text-sm leading-7 text-[#758179]">Cookies and similar technologies may help us understand website usage and improve relevant experiences. This policy covers INFINI&apos;s own use of these technologies and does not govern third-party websites or advertising partners.</p></article></div><div className="mt-24 grid overflow-hidden bg-[#15211c] text-[#f5f0e8] lg:grid-cols-[.8fr_1.2fr]"><div className="min-h-[300px] bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(21,33,28,.3), rgba(21,33,28,.5)), url(https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=85)" }} /><div className="p-8 sm:p-12"><p className="text-[10px] uppercase tracking-[0.25em] text-[#d88761]">Business conduct</p><h2 className="mt-5 font-serif text-4xl">Integrity is part of the framework.</h2><p className="mt-5 text-sm leading-7 text-[#aeb9ae]">Our business conduct and ethics standards are built around opportunity, accountability, and integrity. We comply with applicable laws, market our services responsibly, treat clients fairly, and maintain controls that address compliance, legal, reputation, and operational risks.</p></div></div><div className="mt-20 grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-[10px] uppercase tracking-[0.25em] text-[#c9754d]">Anti-bribery and corruption framework</p><h2 className="mt-5 font-serif text-4xl leading-tight">A zero-tolerance standard.</h2></div><div className="space-y-7 text-sm leading-7 text-[#758179]"><p>INFINI is committed to operating within the laws and protocols of every jurisdiction in which it does business. Our policy forbids the actual or attempted use of bribery or corruption, directly or indirectly, to advance business interests.</p><p><strong className="font-medium text-[#213028]">Policies and procedures.</strong> Risks are addressed through our compliance framework, including anti-money laundering, counter-terrorist financing, and client-identification controls.</p><p><strong className="font-medium text-[#213028]">Due diligence.</strong> We assess third parties before entering relationships and expect appropriate controls to prevent and detect bribery and corruption throughout associated engagements.</p></div></div><div className="mt-20 border-t border-[#d3cbc0] pt-10"><p className="text-[10px] uppercase tracking-[0.25em] text-[#c9754d]">Investor relations</p><h2 className="mt-5 font-serif text-4xl">Long-term relationships, built properly.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-[#758179]">We believe lasting relationships with clients, partners, and stakeholders depend on goodwill, respect, openness, fairness, and the willingness to do the right thing.</p></div></section><SiteFooter /></main>;
  }
  if (slug === "assets-under-management") {
    return <main className="min-h-screen bg-[#f3eee6] text-[#213028]"><header className="border-b border-[#d3cbc0] px-6 py-6 lg:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between"><Logo /><Link href="/" className="flex items-center gap-2 text-xs text-[#758179] hover:text-[#c9754d]"><ArrowLeft size={15} /> Back home</Link></div></header><section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">About INFINI · Our assets under management</p><h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">A wider view of what we steward.</h1><p className="mt-8 max-w-3xl text-lg leading-9 text-[#526158]">Investment capital is brought together across the strategies and relationships we manage. Our view of assets under management includes client capital, applicable performance allocations, and eligible deferred obligations where relevant.</p><div className="mt-16 grid gap-5 border-y border-[#d3cbc0] py-8 sm:grid-cols-3"><div><span className="font-serif text-4xl text-[#c9754d]">3</span><p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#758179]">Principal groups</p></div><div><span className="font-serif text-4xl text-[#c9754d]">Global</span><p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#758179]">Client perspective</p></div><div><span className="font-serif text-4xl text-[#c9754d]">One</span><p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#758179]">Stewardship standard</p></div></div><div className="mt-20 grid gap-5 md:grid-cols-3">{aumGroups.map(([title, copy], index) => <article key={title} className="border-t border-[#c9c0b5] pt-5"><span className="font-serif text-2xl text-[#c9754d]">0{index + 1}</span><h2 className="mt-14 font-serif text-2xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#758179]">{copy}</p></article>)}</div><div className="mt-20 grid gap-10 border-t border-[#d3cbc0] pt-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">Our responsibility</p><h2 className="mt-5 font-serif text-4xl leading-tight">Capital deserves context.</h2></div><p className="max-w-2xl text-sm leading-7 text-[#758179]">Across every group, our role is to bring a disciplined investment process, transparent reporting, and thoughtful service to the people and organizations who trust INFINI with their financial future. Detailed live reporting will be connected through Supabase as the platform moves into production.</p></div></section><SiteFooter /></main>;
  }
  if (slug === "client-education") {
    return <main className="min-h-screen bg-[#f3eee6] text-[#213028]"><header className="border-b border-[#d3cbc0] px-6 py-6 lg:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between"><Logo /><Link href="/" className="flex items-center gap-2 text-xs text-[#758179] hover:text-[#c9754d]"><ArrowLeft size={15} /> Back home</Link></div></header><section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">About INFINI · Client education</p><h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">Understand the picture. Understand the decisions.</h1><p className="mt-8 max-w-3xl text-lg leading-9 text-[#526158]">As an INFINI client, you deserve to understand what is happening with your portfolio and, more importantly, the reasoning behind our decisions. We keep you informed through clear research, regular market perspective, and personal service.</p><div className="mt-20 grid gap-5 md:grid-cols-2">{educationTopics.map(([title, copy, number]) => <article key={title} className="border-t border-[#c9c0b5] pt-5"><span className="font-serif text-2xl text-[#c9754d]">{number}</span><h2 className="mt-14 font-serif text-3xl">{title}</h2><p className="mt-4 max-w-lg text-sm leading-7 text-[#758179]">{copy}</p></article>)}</div><div className="mt-24 grid gap-12 border-t border-[#d3cbc0] pt-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">Client programs</p><h2 className="mt-5 font-serif text-4xl leading-tight">More access to the thinking behind your plan.</h2></div><div><p className="text-sm leading-7 text-[#758179]">We continue to create opportunities for clients to learn, ask questions, and hear directly from senior decision makers. These programs are part of the high level of support at the heart of the INFINI client relationship.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{clientPrograms.map((program) => <div key={program} className="border border-[#d3cbc0] bg-[#eae3d9] px-4 py-4 text-sm">{program}</div>)}</div></div></div></section><SiteFooter /></main>;
  }
  if (slug === "our-team") {
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
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            About INFINI · Our team
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
            Thoughtful people behind thoughtful plans.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-[#526158]">
            Fifteen specialists bringing investment knowledge, operational care,
            and a respect for the details that make every client relationship
            matter.
          </p>
          <div className="mt-14 grid gap-6 border-y border-[#d3cbc0] py-10 text-sm leading-7 text-[#758179] lg:grid-cols-3">
            <p>At the core of INFINI is a team of financial specialists whose collective knowledge has been shaped by years of work in advanced financial modeling, quantitative analysis, and econometric research. With a nuanced understanding of derivatives pricing, stochastic calculus, and volatility dynamics, our experts build strategies with precision.</p>
            <p>Our investment professionals draw on modern portfolio theory and efficient-frontier optimization to navigate global markets, separating durable opportunity from short-term noise. Alongside them, our board brings experience across private equity, venture capital, and alternative asset management.</p>
            <p>That combined perspective supports bespoke structures, thoughtful capital raising, investment syndication, and disciplined divestiture decisions. Every recommendation is shaped by prudence, strategy, and a commitment to preserving the capital and legacies entrusted to us.</p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {team.map(([name, role, image]) => (
              <article key={name} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-[#eae3d9]">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${name === "Hiroshi Tanaka" ? "https://randomuser.me/api/portraits/men/32.jpg" : name === "Liam O'Connor" ? "https://randomuser.me/api/portraits/men/75.jpg" : image})`,
                    }}
                  />
                </div>
                <h2 className="mt-4 font-serif text-xl">{name}</h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#758179]">
                  {role}
                </p>
              </article>
            ))}
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }
  if (slug === "history") {
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
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            About INFINI · Our history
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
            Built through change. Guided by conviction.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-[#526158]">
            {page.copy}
          </p>
          <div className="mt-20 border-t border-[#d3cbc0]">
            {history.map(([period, title, copy]) => (
              <article
                key={period}
                className="grid gap-5 border-b border-[#d3cbc0] py-9 md:grid-cols-[.25fr_.75fr]"
              >
                <p className="font-serif text-2xl text-[#c9754d]">{period}</p>
                <div>
                  <h2 className="font-serif text-3xl">{title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#758179]">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }
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
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
          About INFINI · {page.label}
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          {page.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-9 text-[#526158]">
          {page.copy}
        </p>
        <div className="mt-16 grid gap-5 border-t border-[#d3cbc0] pt-8 sm:grid-cols-3">
          {page.points.map((point, index) => (
            <div key={point}>
              <span className="font-serif text-2xl text-[#c9754d]">
                0{index + 1}
              </span>
              <p className="mt-8 text-sm leading-6 text-[#758179]">{point}</p>
            </div>
          ))}
        </div>
        <Link
          href="/sign-up"
          className="mt-14 inline-flex items-center bg-[#c9754d] px-6 py-4 text-sm text-white"
        >
          Begin your plan <ArrowRight className="ml-2" size={16} />
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
