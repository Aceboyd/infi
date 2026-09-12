"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError("");
    try {
      const submission = new FormData();
      submission.append("access_key", "4337e269-ce61-482a-9a82-b5b00d0ca23c");
      submission.append("subject", "New INFINI contact inquiry");
      submission.append("from_name", "INFINI Contact Form");
      for (const [field, value] of Object.entries(formData)) {
        submission.append(field, value);
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submission,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your message. Please try again.");
      }
      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
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

            <p className="mt-5 text-sm leading-7 text-[#bdc9c0] max-w-md">
              Whether you are exploring portfolio diversification across our six core sectors or seeking custom wealth management, our team is here to guide your journey.
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
          <div className="rounded-2xl border border-[#53675b] bg-[#1d2b24] p-8 shadow-2xl sm:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#adc9a1]/20 text-[#adc9a1] border border-[#adc9a1]/30">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-3xl text-white">Message Sent</h3>
                <p className="mx-auto max-w-sm text-sm text-[#bdc9c0] leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been sent to our team. We will reply to <span className="text-[#adc9a1] font-mono">{formData.email}</span>.
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
                  <p className="mt-1 text-xs text-[#bdc9c0]">Fill in your details below to request a portfolio consultation.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#e1e8dc]">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#63766a] bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#a3b0a7] outline-none focus:border-[#d88761] focus:ring-2 focus:ring-[#d88761]/40 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#e1e8dc]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#63766a] bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#a3b0a7] outline-none focus:border-[#d88761] focus:ring-2 focus:ring-[#d88761]/40 transition"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#e1e8dc]">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#63766a] bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#a3b0a7] outline-none focus:border-[#d88761] focus:ring-2 focus:ring-[#d88761]/40 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#e1e8dc]">Sector of Interest</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#63766a] bg-[#101714] px-4 py-3 text-sm text-white outline-none focus:border-[#d88761] focus:ring-2 focus:ring-[#d88761]/40 transition"
                    >
                      <option value="General Inquiry">General Advisory</option>
                      <option value="Cryptocurrency">Cryptocurrency & Web3</option>
                      <option value="Stocks & Equities">Stocks & Global Equities</option>
                      <option value="Tech Infrastructure">Tech Infrastructure</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Real Estate & REITs">Real Estate & REITs</option>
                      <option value="Foreign Exchange">Foreign Exchange (Forex)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#e1e8dc]">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your investment objectives or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-[#63766a] bg-[#101714] px-4 py-3 text-sm text-white placeholder-[#a3b0a7] outline-none focus:border-[#d88761] focus:ring-2 focus:ring-[#d88761]/40 transition"
                  />
                </div>

                {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
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
