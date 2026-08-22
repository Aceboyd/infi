import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import IntroLoader from "@/components/IntroLoader";
import { MarketSnapshot, Reveal } from "@/components/Reveal";
import ForexCrossRates from "@/components/ForexCrossRates";
import TestimonialPopup from "@/components/TestimonialPopup";
import TestimonyGallery from "@/components/TestimonyGallery";
import HeroCarousel from "@/components/HeroCarousel";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const principles = [
  {
    title: "Clarity over noise",
    copy: "A considered view of your wealth, designed to make every decision feel more deliberate.",
    icon: BarChart3,
  },
  {
    title: "Built around trust",
    copy: "Institutional-grade safeguards, transparent reporting, and a team that stays accountable.",
    icon: ShieldCheck,
  },
  {
    title: "Always in context",
    copy: "Your long-term goals stay in focus while the platform handles the detail beneath them.",
    icon: Sparkles,
  },
];

const services = [
  {
    name: "Foundation",
    detail: "For building a confident financial base.",
    amount: "From $5,000",
    tone: "bg-[#1d2b24]",
  },
  {
    name: "Perspective",
    detail: "For a portfolio shaped around your life.",
    amount: "From $25,000",
    tone: "bg-[#c9754d]",
  },
  {
    name: "Legacy",
    detail: "For the people and plans beyond today.",
    amount: "By conversation",
    tone: "bg-[#d9b66f]",
  },
];

const faqs = [
  [
    "What does INFINI help me manage?",
    "INFINI brings your investments, goals, and long-term financial decisions into one clear perspective. Your account is designed to make progress easier to understand and act on.",
  ],
  [
    "How do I get started?",
    "Create an account, tell us a little about your goals, and we will guide you through the next steps. The process is designed to be straightforward and personal.",
  ],
  [
    "How is my information protected?",
    "We use secure account access, encryption, and carefully controlled operational processes to protect your information. Verification is part of how we keep your account safe.",
  ],
  [
    "Can I speak with someone about my plan?",
    "Yes. INFINI is built around access to thoughtful guidance, not just a dashboard. Your account can grow with your questions and changing priorities.",
  ],
];

const investmentTypes = [
  {
    title: "Managed portfolios",
    copy: "Diversified strategies shaped around your goals, horizon, and comfort with risk.",
    mark: "01",
  },
  {
    title: "Global opportunities",
    copy: "A wider view across markets, sectors, and ideas that can strengthen your long-term plan.",
    mark: "02",
  },
  {
    title: "Purposeful cash",
    copy: "Keep liquidity working intelligently while preserving room for the moments that matter.",
    mark: "03",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3eee6] text-[#213028]">
      <IntroLoader />
      <SiteHeader />
      <section className="relative bg-[#15211c] text-[#f5f0e8]">
        <div className="absolute right-[-11rem] top-[-12rem] h-[36rem] w-[36rem] rounded-full border border-[#adc9a1]/20" />
        <div className="absolute right-[-4rem] top-[-5rem] h-[22rem] w-[22rem] rounded-full border border-[#c9754d]/20" />
        <div className="relative mx-auto flex min-h-[570px] max-w-7xl items-center justify-center px-6 pb-24 pt-32 lg:min-h-[650px] lg:px-10 lg:pb-32 lg:pt-40">
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[#d88761]">
              A more considered way to grow
            </p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] tracking-[-0.035em] sm:text-7xl">
              Your wealth deserves a <em className="text-[#d88761]">clearer</em>{" "}
              point of view.
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-[#afbbb0]">
              INFINI brings investment strategy, personal guidance, and calm
              technology together, so the decisions shaping your future feel
              entirely yours.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-[#c9754d] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#d88761]"
              >
                Start your journey <ArrowRight className="ml-3" size={17} />
              </Link>
              <Link
                href="#approach"
                className="inline-flex items-center justify-center border border-white/15 px-6 py-4 text-sm text-[#d7ded5] transition hover:border-white/40"
              >
                Discover INFINI <ChevronDown className="ml-3" size={16} />
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 z-0"><HeroCarousel /></div>
        </div>
      </section>
      <section
        id="approach"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-32"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            The INFINI approach
          </p>
          <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
            Financial management with more humanity.
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-xl leading-9 text-[#526158]">
            We believe financial confidence comes from seeing the whole picture.
            That means thoughtful strategy, honest conversations, and tools that
            respect your attention.
          </p>
          <p className="mt-7 text-sm leading-7 text-[#758179]">
            From your first contribution to the milestones that matter most,
            INFINI gives you a steady partner and an intelligent place to make
            your next move.
          </p>
          <Link
            href="/sign-up"
            className="mt-9 inline-flex items-center text-sm font-medium text-[#c9754d]"
          >
            Meet your clearer future <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>
      <section
        id="principles"
        className="border-y border-[#d9d2c8] bg-[#eae3d9] px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
                What we stand for
              </p>
              <h2 className="mt-4 font-serif text-4xl tracking-[-0.025em]">
                Principles, not promises.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#758179]">
              The standards behind every decision, conversation, and line of
              code.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {principles.map(({ title, copy, icon: Icon }, index) => (
              <div key={title} className="border-t border-[#c9c0b5] pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#c9754d]">
                    0{index + 1}
                  </span>
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#758179]"
                  />
                </div>
                <h3 className="mt-10 font-serif text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#758179]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
              Ways to work together
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.025em] sm:text-5xl">
              A plan with room to grow.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#758179]">
            Every INFINI relationship starts with where you are, then grows with
            where you want to go.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`${service.tone} flex min-h-[285px] flex-col justify-between p-7 ${index === 2 ? "text-[#253027]" : "text-[#fffaf4]"}`}
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.23em] opacity-70">
                  0{index + 1}
                </span>
                <h3 className="mt-16 font-serif text-3xl">{service.name}</h3>
                <p className="mt-3 max-w-[210px] text-sm leading-6 opacity-75">
                  {service.detail}
                </p>
              </div>
              <div className="flex items-end justify-between border-t border-current/20 pt-4 text-xs">
                <span className="opacity-70">{service.amount}</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="border-y border-[#d9d2c8] bg-[#eae3d9] px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
              Investment types
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Different tools. One considered strategy.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#758179]">
              Build a portfolio that can meet today&apos;s needs while staying
              faithful to the future you are creating.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {investmentTypes.map((type) => (
              <div key={type.title} className="border-t border-[#c9c0b5] pt-5">
                <span className="font-serif text-2xl text-[#c9754d]">
                  {type.mark}
                </span>
                <h3 className="mt-14 font-serif text-2xl">{type.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#758179]">
                  {type.copy}
                </p>
                <span className="mt-8 block text-xl text-[#c9754d]">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="forex-matrix"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-28"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            Exchange rate matrix
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            Stay oriented in a moving world.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-[#758179]">
            Live currency relationships, presented with the context to make them
            useful.
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[#8b968e]">
            Powered by TradingView
          </p>
        </div>
        <div className="border border-[#d3cbc0] bg-[#faf7f2] p-3 sm:p-5">
          <div className="flex items-center justify-between border-b border-[#d3cbc0] px-2 pb-4">
            <div>
              <h3 className="font-serif text-2xl">Global reference rates</h3>
              <p className="mt-1 text-xs text-[#758179]">Live market data</p>
            </div>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#758179]">
              <i className="h-2 w-2 rounded-full bg-[#adc9a1]" /> Live
            </span>
          </div>
          <ForexCrossRates />
        </div>
      </section>
      <section className="border-y border-[#d9d2c8] bg-[#f8f4ee] px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
              A wider lens
            </p>
            <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              The market, in context.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#758179]">
              Stay close to the signals that matter without letting the noise
              take over. INFINI turns movement into perspective.
            </p>
            <Link
              href="/sign-up"
              className="mt-8 inline-flex items-center text-sm text-[#c9754d]"
            >
              Explore your perspective <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
          <Reveal>
            <MarketSnapshot />
          </Reveal>
        </div>
      </section>
      <section className="border-y border-[#d9d2c8] bg-[#15211c] px-6 py-24 text-[#f5f0e8] lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#d88761]">
              How it works
            </p>
            <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight sm:text-5xl">
              A clear beginning to a lasting relationship.
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            {[
              "Tell us your story",
              "Shape your strategy",
              "See the full picture",
              "Move with confidence",
            ].map((step, index) => (
              <div key={step} className="border-t border-white/15 pt-4">
                <p className="font-serif text-2xl text-[#d88761]">
                  0{index + 1}
                </p>
                <h3 className="mt-8 font-serif text-xl">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-[#9eaaa0]">
                  A thoughtful next step, with the right amount of guidance and
                  space to make it yours.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-32">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            Quietly protected
          </p>
          <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
            The confidence to look further ahead.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#758179]">
            Your financial life deserves a serious standard of care. We pair
            secure technology with transparent practices, so you can focus on
            the decisions that matter.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center text-sm text-[#c9754d]"
          >
            See how we work <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-[#d3cbc0] p-6">
            <ShieldCheck className="text-[#c9754d]" size={22} />
            <h3 className="mt-12 font-serif text-2xl">Secure by design</h3>
            <p className="mt-3 text-sm leading-6 text-[#758179]">
              Protection is considered at every point of your experience.
            </p>
          </div>
          <div className="mt-8 border border-[#d3cbc0] bg-[#eae3d9] p-6 sm:mt-16">
            <BarChart3 className="text-[#c9754d]" size={22} />
            <h3 className="mt-12 font-serif text-2xl">Clear reporting</h3>
            <p className="mt-3 text-sm leading-6 text-[#758179]">
              Understand what is happening and why, without the jargon.
            </p>
          </div>
        </div>
      </section>
      <TestimonyGallery />
      <section className="border-t border-[#d9d2c8] bg-[#eae3d9] px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
              Questions, answered
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Start with what you want to know.
            </h2>
          </div>
          <div className="border-t border-[#c9c0b5]">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group border-b border-[#c9c0b5] py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl marker:hidden">
                  <span>{question}</span>
                  <span className="text-2xl font-light text-[#c9754d] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-4 text-sm leading-7 text-[#758179]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-[#d9d2c8] px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
              About INFINI
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Built for the long view.
            </h2>
          </div>
          <div>
            <p className="text-xl leading-9 text-[#526158]">
              INFINI Financial Management exists to make wealth feel more
              understandable, more personal, and more useful to the life around
              it.
            </p>
            <div className="mt-10 grid gap-6 border-t border-[#d3cbc0] pt-6 sm:grid-cols-3">
              <div>
                <h3 className="font-serif text-xl">Our mission</h3>
                <p className="mt-3 text-xs leading-6 text-[#758179]">
                  Make better financial decisions easier to see.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl">Our vision</h3>
                <p className="mt-3 text-xs leading-6 text-[#758179]">
                  A future where confidence is part of every plan.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl">Our values</h3>
                <p className="mt-3 text-xs leading-6 text-[#758179]">
                  Clarity, care, and a respect for the details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#15211c] px-6 py-20 text-[#f5f0e8] lg:px-10 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#d88761]">
              Independent standards
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Carefully built. Clearly held.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-5 text-xs text-[#9eaaa0] sm:grid-cols-4">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#adc9a1]" /> Secure access
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#adc9a1]" /> Clear
              reporting
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#adc9a1]" /> Client first
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#adc9a1]" /> Built to last
            </span>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="bg-[#c9754d] px-6 py-20 text-white lg:px-10 lg:py-24"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-9 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#f7d8c3]">
              Your next chapter
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Make room for what comes next.
            </h2>
          </div>
          <Link
            href="/sign-up"
            className="inline-flex w-fit items-center border border-white/40 px-6 py-4 text-sm transition hover:bg-white hover:text-[#c9754d]"
          >
            Create your account <ArrowRight className="ml-3" size={17} />
          </Link>
        </div>
      </section>
      <SiteFooter />

      <TestimonialPopup />
    </main>
  );
}
