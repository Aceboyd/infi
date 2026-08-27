"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#15211c] px-6 py-24 text-[#f5f0e8] lg:px-10 lg:py-32">
      {/* Background Decorative Rings */}
      <div className="absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute left-[-8rem] bottom-[-8rem] h-[25rem] w-[25rem] rounded-full border border-[#c9754d]/10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left Column: Information & Office Details */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9754d]/30 bg-[#c9754d]/10 px-3.5 py-1 text-xs font-semibold text-[#d88761]">
              <Sparkles size={14} /> Get In Touch
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
              Start a conversation with our advisors.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#9eaaa0] max-w-md">
              Whether you are exploring portfolio diversification across our 10 core sectors or seeking custom wealth management, our team is here to guide your journey.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9754d]/20 text-[#d88761] border border-[#c9754d]/30">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#77837b] font-semibold">Direct Email</p>
                  <p className="mt-1 text-sm font-mono text-white">info@infinifinancialmanagement.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9754d]/20 text-[#d88761] border border-[#c9754d]/30">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#77837b] font-semibold">Client Support Line</p>
                  <p className="mt-1 text-sm font-mono text-white">+1 (800) 463-4641</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9754d]/20 text-[#d88761] border border-[#c9754d]/30">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#77837b] font-semibold">Global Headquarters</p>
                  <p className="mt-1 text-sm text-[#d7ded5]">Infinite Tower, Suite 4800, Financial District</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <div className="rounded-2xl border border-white/10 bg-[#1d2b24]/90 p-8 shadow-2xl backdrop-blur-md sm:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#adc9a1]/20 text-[#adc9a1] border border-[#adc9a1]/30">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-3xl text-white">Message Delivered</h3>
                <p className="mx-auto max-w-sm text-sm text-[#9eaaa0] leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. An INFINI senior financial advisor has received your request and will reach out to <span className="text-[#adc9a1] font-mono">{formData.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", sector: "General Inquiry", message: "" });
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-xs font-semibold text-white hover:border-[#c9754d] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-white">Send Us a Message</h3>
                  <p className="mt-1 text-xs text-[#9eaaa0]">Fill in your details below to request a portfolio consultation.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#c4ceb7]">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#5d6a62] outline-none focus:border-[#c9754d] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c4ceb7]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#5d6a62] outline-none focus:border-[#c9754d] transition"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#c4ceb7]">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#5d6a62] outline-none focus:border-[#c9754d] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c4ceb7]">Sector of Interest</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#101714] px-4 py-3 text-sm text-white outline-none focus:border-[#c9754d] transition"
                    >
                      <option value="General Inquiry">General Advisory</option>
                      <option value="Cryptocurrency">Cryptocurrency & Web3</option>
                      <option value="Stocks & Equities">Stocks & Global Equities</option>
                      <option value="Tech Infrastructure">Tech Infrastructure</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Medical THC & Oils">Medical THC & Oils</option>
                      <option value="Real Estate & REITs">Real Estate & REITs</option>
                      <option value="Petroleum & Energy">Petroleum & Energy</option>
                      <option value="Agriculture">AgriTech & Logistics</option>
                      <option value="Foreign Exchange">Foreign Exchange (Forex)</option>
                      <option value="Rare Metals">Rare Metals & Gold Vaults</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#c4ceb7]">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your investment objectives or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#5d6a62] outline-none focus:border-[#c9754d] transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c9754d] py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#b66543] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
