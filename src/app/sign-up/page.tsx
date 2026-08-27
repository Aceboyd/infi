"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Côte d’Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Türkiye", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [onboarding, setOnboarding] = useState<Record<string, string>>({});
  const router = useRouter();

  function continueToAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setOnboarding(Object.fromEntries([...values.entries()].map(([key, value]) => [key, String(value)])));
    setStep(2);
  }

  async function createAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get("terms")) return setError("Please accept the terms to continue.");
    if (form.get("password") !== form.get("confirmPassword")) return setError("Your passwords do not match.");
    setSubmitting(true); setError("");
    const response = await fetch("/api/auth/sign-up", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password"), firstName: form.get("firstName"), lastName: form.get("lastName"), country: form.get("country"), onboarding }) });
    const body = await response.json(); setSubmitting(false);
    if (!response.ok) return setError(body.error ?? "Unable to create your account.");
    router.push("/sign-in?registered=1"); router.refresh();
  }

  return (
    <>
    <main className="min-h-screen bg-[#f3eee6] text-[#213028]">
      <header className="hidden" />
      <div className="mx-auto grid min-h-screen w-full md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[280px] flex-col justify-end overflow-hidden bg-cover bg-center p-6 pt-20 text-[#f5f0e8] sm:min-h-[340px] sm:p-10 sm:pt-28 md:flex md:min-h-screen md:justify-between md:pt-10" style={{ backgroundImage: "linear-gradient(rgba(21,33,28,.48), rgba(21,33,28,.84)), url(https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=85)" }}>
          <div className="hidden md:block"><Logo light /></div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9754d]">
            Begin with clarity
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] sm:mt-5 sm:text-5xl md:text-6xl">
            A better relationship with your money.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#d7ded5]">
            Create your INFINI account and bring your goals, investments, and
            next decisions into one considered place.
          </p>
          <div className="mt-6 hidden space-y-4 text-sm text-[#f0e7dc] md:mt-10 md:block">
            <p className="flex items-center gap-3">
              <Check className="text-[#c9754d]" size={17} /> Personal portfolio
              perspective
            </p>
            <p className="flex items-center gap-3">
              <Check className="text-[#c9754d]" size={17} /> Transparent
              reporting and insights
            </p>
            <p className="flex items-center gap-3">
              <Check className="text-[#c9754d]" size={17} /> Guidance built
              around your goals
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#faf7f2] p-5 py-12 sm:p-10 md:py-16">
          <div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-between md:hidden"><Logo /><Link href="/" className="flex items-center gap-2 text-xs text-[#758179] hover:text-[#c9754d]"><ArrowLeft size={15} /> Back home</Link></div>
          <div className="mb-8">
            <h2 className="font-serif text-3xl">Create your account</h2>
            <p className="mt-2 text-sm text-[#758179]">
              It takes less than two minutes.
            </p>
          </div>
          {step === 1 ? <form className="grid gap-5" onSubmit={continueToAccount}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#c9754d]">First, let&apos;s get to know you</p>
            <label><span className="mb-2 block text-xs text-[#526158]">Choose an account type</span><select name="account_type" required defaultValue="" className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option value="" disabled>Please choose an option</option><option>Joint</option><option>Individual</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">What are your primary investment goals?</span><select name="investment_goals" required defaultValue="" className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option value="" disabled>Please choose an option</option><option>Capital Preservation</option><option>Regular Income Generation</option><option>Long-Term Growth</option><option>Diversification</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">What is your risk tolerance?</span><select name="risk_tolerance" required defaultValue="" className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option value="" disabled>Please choose an option</option><option>Very Low</option><option>Low</option><option>Moderate</option><option>High</option><option>Very High</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">Are you currently working with a financial advisor?</span><select name="has_financial_advisor" required defaultValue="" className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option value="" disabled>Please choose an option</option><option>Yes</option><option>No</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">How satisfied are you with your current wealth management solutions?</span><select name="wealth_management_satisfaction" required defaultValue="" className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]"><option value="" disabled>Please choose an option</option><option>Very Satisfied</option><option>Satisfied</option><option>Neutral</option><option>Dissatisfied</option><option>Very Dissatisfied</option></select></label>
            <label><span className="mb-2 block text-xs text-[#526158]">Additional financial information</span><textarea name="additional_financial_information" rows={4} placeholder="Tell us anything you would like us to know" className="w-full resize-none border border-[#d3cbc0] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#a3aaa3] focus:border-[#c9754d]" /></label>
            <button type="submit" className="flex h-12 items-center justify-center bg-[#c9754d] text-sm text-white transition hover:bg-[#b66543]">Next step <ArrowRight className="ml-2" size={16} /></button>
          </form> : <form className="grid gap-5 sm:grid-cols-2" onSubmit={createAccount}>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                First name
              </span>
              <input
                name="firstName"
                required
                placeholder="Alex"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                Last name
              </span>
              <input
                name="lastName"
                required
                placeholder="Johnson"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-xs text-[#526158]">
                Email address
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                Password
              </span>
              <input
                name="password"
                type="password"
                minLength={8}
                required
                autoComplete="new-password"
                placeholder="8+ characters"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">
                Confirm password
              </span>
              <input
                name="confirmPassword"
                type="password"
                minLength={8}
                required
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm outline-none focus:border-[#c9754d]"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs text-[#526158]">Country</span>
              <select name="country" required defaultValue="" className="h-12 w-full border border-[#d3cbc0] bg-transparent px-4 text-sm text-[#758179] outline-none focus:border-[#c9754d]">
                <option value="" disabled>Select your country</option>
                {countries.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
            </label>
            <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-[#758179] sm:col-span-2">
              <input name="terms" type="checkbox" required className="mt-1 accent-[#c9754d]" /> I
              agree to the INFINI terms of service and privacy policy.
            </label>
            {error && <p className="text-sm text-[#a94835] sm:col-span-2" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 items-center justify-center bg-[#c9754d] text-sm text-white transition hover:bg-[#b66543] sm:col-span-2"
            >
              {submitting ? "Creating account…" : <>Create account <ArrowRight className="ml-2" size={16} /></>}
            </button>
          </form>}
          <p className="mt-7 text-center text-sm text-[#758179]">
            Already a member?{" "}
            <Link href="/sign-in" className="text-[#c9754d]">
              Sign in
            </Link>
          </p>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
