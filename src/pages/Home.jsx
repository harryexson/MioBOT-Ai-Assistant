import { useState, useEffect } from "react";
import { Link } from "react-router";
import MicIcon from "icon:mic";
import PlayIcon from "icon:play-circle";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";
import StarIcon from "icon:star";
import ZapIcon from "icon:zap";
import ShieldIcon from "icon:shield-check";
import SmartphoneIcon from "icon:smartphone";

const CATEGORIES = [
  { icon: "🛍️", label: "Shopping", desc: "Find and buy anything" },
  { icon: "🍔", label: "Food & Dining", desc: "Order pickup or delivery" },
  { icon: "✈️", label: "Travel & Hotels", desc: "Book flights and hotels" },
  { icon: "📅", label: "Services", desc: "Appointments & bookings" },
  { icon: "💳", label: "Payments", desc: "Pay bills, invoices & more" },
  { icon: "🎟️", label: "Events", desc: "Find and book tickets" },
  { icon: "📡", label: "NFC & In-Store", desc: "Tap, order and pay" },
  { icon: "✨", label: "And More", desc: "Explore all possibilities" },
];

const CHAT_STEPS = [
  { role: "user", text: "Mio, order my usual from McDonald's." },
  { role: "mio", text: "Found your usual — Big Mac combo. Estimated arrival 25 min. Confirm?" },
  { role: "user", text: "Yes, confirm." },
  { role: "mio", text: "Order placed! Track it live in the app." },
];

const STATS = [
  { value: "1M+", label: "Happy Users" },
  { value: "50,000+", label: "Businesses" },
  { value: "4.8★", label: "App Rating" },
  { value: "All in One", label: "Shop. Book. Pay." },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Frequent traveller",
    text: "I booked flights, a hotel, and airport transfers in one conversation. Mio understood exactly what I needed without me having to repeat myself.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Small business owner",
    text: "My customers love ordering through Mio. It's like having a 24/7 personal assistant for everyone who walks through my door.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Busy parent",
    text: "From grocery deliveries to booking the kids' appointments — Mio handles everything. The voice feature is a game-changer.",
    rating: 5,
  },
];

function WaveIcon() {
  return (
    <div className="flex items-end gap-[3px] h-5" aria-hidden="true">
      {[0.3, 0.6, 1, 0.7, 0.4, 0.8, 1, 0.5, 0.3].map((h, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function ChatDemo() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= CHAT_STEPS.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 1200 + visible * 400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="flex flex-col gap-3 p-4">
      {CHAT_STEPS.slice(0, visible).map((step, i) => (
        <div
          key={i}
          className={`flex ${step.role === "user" ? "justify-end" : "justify-start"} chat-bubble`}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {step.role === "mio" && (
            <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-xs font-display font-700 text-white mr-2 shrink-0 mt-auto">
              M
            </div>
          )}
          <div
            className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
              step.role === "user"
                ? "bg-[#f0edff] text-[#0f1035] rounded-br-sm"
                : "gradient-bg text-white rounded-bl-sm"
            }`}
          >
            {step.text}
          </div>
        </div>
      ))}
      {visible < CHAT_STEPS.length && (
        <div className="flex justify-start">
          <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-xs font-display font-700 text-white mr-2 shrink-0">M</div>
          <div className="bg-[#f0edff] px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
            <WaveIcon />
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryCard({ icon, label, desc, delay = 0 }) {
  return (
    <div
      className="bg-white border border-[#e8e4ff] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#7c3aed]/40 hover:shadow-lg hover:shadow-violet-100 transition-all cursor-pointer group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-[#f0edff] rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="font-display font-700 text-[#0f1035] text-sm leading-tight mb-0.5">{label}</p>
        <p className="text-[#0f1035]/55 text-xs">{desc}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white">
        {/* Soft violet orb background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="hero-orb w-[500px] h-[500px] bg-violet-200/60 top-1/4 right-0 translate-x-1/4" />
          <div className="hero-orb w-[300px] h-[300px] bg-indigo-100/80 bottom-1/4 left-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#e8e4ff] rounded-full px-4 py-1.5 text-xs font-semibold text-[#7c3aed] mb-6">
              <ZapIcon className="w-3.5 h-3.5" aria-hidden="true" />
              AI Powered Assistant
            </div>

            <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-[#0f1035] leading-[0.95] tracking-tight mb-4">
              Talk. Find. Book.
              <br />
              <span className="gradient-text">Order. Pay.</span>
            </h1>

            <p className="text-lg text-[#0f1035]/80 mb-2 font-semibold">One assistant. Endless possibilities.</p>
            <p className="text-[#0f1035]/55 text-base leading-relaxed max-w-md mb-8">
              Mio helps you shop, dine, travel, book services and handle payments — all through natural conversation.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/onboarding"
                className="gradient-bg text-white font-semibold px-7 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-violet-200 flex items-center gap-2"
              >
                Get Mio Free
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="#demo"
                className="bg-[#0f1035] text-white font-medium px-7 py-3.5 rounded-xl hover:bg-[#1a1b4b] transition-all flex items-center gap-2"
              >
                <PlayIcon className="w-4 h-4" aria-hidden="true" />
                Watch Video
              </a>
            </div>

            {/* App badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#" className="bg-[#0f1035] rounded-xl px-4 py-2.5 flex items-center gap-3 hover:bg-[#1a1b4b] transition-all" aria-label="Download on App Store">
                <span className="text-2xl" aria-hidden="true">🍎</span>
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">Download on the</p>
                  <p className="text-white font-semibold text-sm leading-tight">App Store</p>
                </div>
              </a>
              <a href="#" className="bg-[#0f1035] rounded-xl px-4 py-2.5 flex items-center gap-3 hover:bg-[#1a1b4b] transition-all" aria-label="Get it on Google Play">
                <span className="text-2xl" aria-hidden="true">▶️</span>
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">Get it on</p>
                  <p className="text-white font-semibold text-sm leading-tight">Google Play</p>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#f0edff]">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-700 text-[#7c3aed] text-xl">{value}</p>
                  <p className="text-[#0f1035]/55 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone mockup + floating cards */}
          <div className="relative flex justify-center animate-slide-up-2">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-violet-200/60 rounded-[40px] blur-3xl scale-90" aria-hidden="true" />

              {/* Phone */}
              <div className="phone-mockup w-72 h-[580px] relative animate-float bg-white">
                <div className="absolute inset-0 pt-12 pb-4 px-4 flex flex-col">
                  {/* Phone header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-display font-700 text-white">M</div>
                    <div>
                      <p className="text-[#0f1035] text-sm font-display font-700">Mio</p>
                      <p className="text-[#0f1035]/50 text-xs">Your AI Assistant for Everyday Life</p>
                    </div>
                    <div className="ml-auto w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                      <MicIcon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Chat area */}
                  <div className="flex-1 overflow-hidden">
                    <ChatDemo />
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-2xl px-4 py-3 flex items-center gap-2 mt-2">
                    <span className="text-[#0f1035]/50 text-xs flex-1">Ask Mio anything…</span>
                    <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
                      <MicIcon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating category chips */}
              {[
                { label: "Food & Dining", emoji: "🍔", pos: "top-16 -right-28", delay: "0s" },
                { label: "Hotels & Travel", emoji: "🏨", pos: "top-1/2 -right-24", delay: "0.4s" },
                { label: "Shopping", emoji: "🛍️", pos: "bottom-24 -right-20", delay: "0.8s" },
                { label: "Bookings & Services", emoji: "📅", pos: "bottom-8 -left-4", delay: "1.2s" },
              ].map(({ label, emoji, pos, delay }) => (
                <div
                  key={label}
                  className={`absolute ${pos} bg-white border border-[#e8e4ff] shadow-lg shadow-violet-100 rounded-2xl px-3 py-2 flex items-center gap-2 animate-float-delay hidden sm:flex`}
                  style={{ animationDelay: delay }}
                  aria-hidden="true"
                >
                  <span className="text-base">{emoji}</span>
                  <span className="text-[#0f1035] text-xs font-semibold whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need */}
      <section id="demo" className="py-24 px-4 sm:px-6 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-[#0f1035] mb-3">
              Everything You Need.{" "}
              <span className="gradient-text">Just Ask Mio.</span>
            </h2>
            <p className="text-[#0f1035]/55 text-lg max-w-xl mx-auto">
              One conversation unlocks every service category — no switching apps, no searching.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.label} {...cat} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* AI in action */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[#e8e4ff] rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 grid lg:grid-cols-2 gap-12 items-center bg-white shadow-sm shadow-violet-50">
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#e8e4ff] rounded-full px-4 py-1.5 text-xs font-semibold text-[#7c3aed] mb-6">
                <SmartphoneIcon className="w-3.5 h-3.5" aria-hidden="true" />
                Voice-First Experience
              </div>
              <h2 className="font-display font-700 text-3xl sm:text-4xl text-[#0f1035] mb-4 leading-tight">
                Just speak naturally.<br />
                <span className="gradient-text">Mio understands.</span>
              </h2>
              <p className="text-[#0f1035]/60 leading-relaxed mb-8">
                No menus to navigate. No forms to fill. Mio listens, understands your intent across every service category, compares options, and only acts with your confirmation.
              </p>

              <ul className="space-y-4">
                {[
                  "Searches multiple providers instantly",
                  "Compares prices, availability, and reviews",
                  "Requires your confirmation before any purchase",
                  "Remembers your preferences across sessions",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-[#7c3aed] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-[#0f1035]/75 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-xl mt-8 hover:opacity-90 transition-all shadow-md shadow-violet-200"
              >
                Try Mio Free
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Product visual */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-100/80 rounded-3xl blur-2xl scale-110" aria-hidden="true" />
                <div className="phone-mockup w-64 h-[520px] relative animate-float bg-white">
                  <div className="absolute inset-0 pt-12 pb-6 px-4 flex flex-col gap-2">
                    <p className="text-[#0f1035]/50 text-[10px] uppercase tracking-widest text-center mb-2">AI Shopping Assistant</p>
                    {/* Product card */}
                    <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-2xl p-3 flex flex-col gap-2">
                      <div className="w-full h-24 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-xl flex items-center justify-center text-4xl">
                        🎧
                      </div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <p className="text-[#0f1035] text-xs font-semibold leading-tight">Sony WH-1000XMS</p>
                          <p className="text-[#0f1035]/50 text-[10px]">Best noise-cancelling headphones</p>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[9px] text-emerald-700 font-semibold whitespace-nowrap">Top rated</div>
                      </div>
                      <p className="text-[#0f1035] font-display font-700 text-xl">$399</p>
                      <button className="gradient-bg text-white text-xs font-semibold py-2 rounded-xl w-full">Add to cart</button>
                    </div>

                    {/* Hotel results */}
                    {[
                      { name: "The Langham Chicago", price: "$229/night", stars: "4.8" },
                      { name: "Renaissance Chicago", price: "$189/night", stars: "4.6" },
                    ].map((h) => (
                      <div key={h.name} className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl p-2.5 flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-lg flex items-center justify-center text-lg shrink-0">🏨</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#0f1035] text-[10px] font-semibold truncate">{h.name}</p>
                          <p className="text-[#0f1035]/50 text-[9px]">★ {h.stars} · {h.price}</p>
                        </div>
                        <button className="text-[#7c3aed] text-[9px] font-semibold shrink-0">View</button>
                      </div>
                    ))}

                    {/* Bottom input */}
                    <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl px-3 py-2 flex items-center gap-2 mt-auto">
                      <span className="text-[#0f1035]/50 text-[10px] flex-1">Ask a follow up…</span>
                      <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                        <MicIcon className="w-3 h-3 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating query bubble */}
                <div className="absolute -top-4 -right-4 sm:-right-16 bg-white border border-[#e8e4ff] shadow-lg shadow-violet-100 rounded-2xl px-4 py-3 max-w-[180px] hidden sm:block" aria-hidden="true">
                  <p className="text-[#0f1035] text-xs font-medium">"Find me running shoes under $150"</p>
                </div>

                {/* Floating result chips */}
                <div className="absolute -bottom-4 -right-2 sm:-right-16 flex flex-col gap-2 hidden sm:flex" aria-hidden="true">
                  {["Found 5 great options", "Compare features", "Add to cart", "Secure checkout"].map((item, i) => (
                    <div key={item} className="bg-white border border-[#e8e4ff] shadow-sm shadow-violet-100 rounded-xl px-3 py-2 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg gradient-bg flex items-center justify-center text-xs">
                        {["🔍", "📋", "🛒", "🔒"][i]}
                      </div>
                      <span className="text-[#0f1035] text-[11px] font-medium whitespace-nowrap">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Screens */}
      <section className="py-24 px-4 sm:px-6 bg-[#f8f7ff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-[#0f1035] mb-3">
              Mobile App — <span className="gradient-text">Beautifully Simple</span>
            </h2>
            <p className="text-[#0f1035]/55 text-lg max-w-xl mx-auto">
              Get started in seconds. Mio walks you through everything.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 items-end">
            {/* Screen 1: Welcome */}
            <div className="phone-mockup h-[400px] sm:h-[440px] lg:h-[480px] relative bg-white">
              <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mt-4 mb-3">
                  <span className="text-white font-display font-800 text-xl">M</span>
                </div>
                <p className="text-[#0f1035] font-display font-700 text-base mb-1">Mio</p>
                <p className="text-[#0f1035]/55 text-[10px] mb-6">Your AI Assistant for Everyday Life</p>
                <div className="w-full mt-auto space-y-2">
                  <div className="gradient-bg rounded-xl py-2.5 w-full text-white text-xs font-semibold">Get Started</div>
                  <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl py-2.5 w-full text-[#0f1035]/70 text-xs font-medium">Sign In</div>
                  <p className="text-[#0f1035]/45 text-[9px] pt-1">Skip for now</p>
                </div>
              </div>
            </div>

            {/* Screen 2: Onboarding choice */}
            <div className="phone-mockup h-[400px] sm:h-[440px] lg:h-[480px] relative bg-white">
              <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col">
                <p className="text-[#0f1035] text-xs font-semibold text-center mb-1">What would you like to use Mio for?</p>
                <p className="text-[#0f1035]/55 text-[9px] text-center mb-4">Choose one or add more later</p>
                {["🛍️ Shopping", "🍔 Food & Restaurants", "✈️ Travel & Hotels", "📅 Services & Bookings", "💳 Pay Bills & Invoices", "🎟️ Events & Tickets", "⚡ Other"].map((item) => (
                  <div key={item} className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl px-3 py-2.5 mb-1.5">
                    <span className="text-[11px] text-[#0f1035]/80">{item}</span>
                  </div>
                ))}
                <div className="mt-auto gradient-bg rounded-xl py-2.5 text-white text-xs font-semibold text-center">Continue</div>
              </div>
            </div>

            {/* Screen 3: AI Shopping — centre, taller */}
            <div className="phone-mockup h-[440px] sm:h-[490px] lg:h-[540px] relative bg-white col-span-2 sm:col-span-1" style={{ transform: "translateY(-20px)" }}>
              <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col">
                <p className="text-[#0f1035] text-xs font-semibold text-center mb-4">AI Shopping Assistant</p>
                <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-2xl p-3 mb-3">
                  <div className="w-full h-20 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-xl flex items-center justify-center text-3xl mb-2">🎧</div>
                  <p className="text-[#0f1035] text-xs font-semibold">Sony WH-1000XMS</p>
                  <p className="text-[#0f1035]/50 text-[9px]">Best noise-cancelling headphones</p>
                  <p className="text-[#0f1035] font-display font-700 text-lg">$399</p>
                  <div className="flex gap-1 mt-1">
                    <div className="bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 text-[8px] text-emerald-700 font-semibold">Top rated</div>
                    <div className="bg-[#f0edff] border border-[#e8e4ff] rounded px-1.5 py-0.5 text-[8px] text-[#7c3aed] font-semibold">Best quality</div>
                  </div>
                  <button className="gradient-bg text-white text-xs font-semibold py-2 rounded-xl w-full mt-2">Add to cart</button>
                </div>
                <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-[#0f1035]/50 text-[10px] flex-1">Ask anything…</span>
                  <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                    <MicIcon className="w-3 h-3 text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 4: Hotel results */}
            <div className="phone-mockup h-[400px] sm:h-[440px] lg:h-[480px] relative hidden sm:block bg-white">
              <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col gap-2">
                <p className="text-[#0f1035] text-xs font-semibold text-center mb-1">Find me a hotel in Chicago next weekend</p>
                <p className="text-[#0f1035]/50 text-[9px] text-center mb-2">Oct 24 – Oct 26 (2 nights)</p>
                {[
                  { name: "The Langham Chicago", stars: "4.8", price: "$229/night" },
                  { name: "Renaissance Chicago", stars: "4.6", price: "$189/night" },
                  { name: "Hyatt Place Chicago", stars: "4.4", price: "$179/night" },
                ].map((h) => (
                  <div key={h.name} className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl p-2.5">
                    <div className="w-full h-10 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-lg mb-1.5 flex items-center justify-center text-lg">🏨</div>
                    <p className="text-[#0f1035] text-[10px] font-semibold">{h.name}</p>
                    <p className="text-[#0f1035]/50 text-[9px]">★ {h.stars}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[#0f1035] text-[10px] font-semibold">{h.price}</p>
                      <button className="gradient-bg text-white text-[9px] px-2 py-1 rounded-lg">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen 5: Payment */}
            <div className="phone-mockup h-[400px] sm:h-[440px] lg:h-[480px] relative hidden lg:block bg-white">
              <div className="absolute inset-0 pt-10 pb-4 px-4 flex flex-col gap-3">
                <p className="text-[#0f1035] text-xs font-semibold text-center mb-1">Add a payment method</p>
                {[
                  { icon: "💳", label: "Credit or Debit Card" },
                  { icon: "🍎", label: "Apple Pay" },
                  { icon: "🔵", label: "Google Pay" },
                  { icon: "🔗", label: "Link (Stripe)" },
                  { icon: "🅿️", label: "PayPal" },
                ].map((pm) => (
                  <div key={pm.label} className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-xl px-3 py-2.5 flex items-center gap-2.5">
                    <span className="text-base">{pm.icon}</span>
                    <p className="text-[#0f1035] text-xs font-medium">{pm.label}</p>
                  </div>
                ))}
                <div className="mt-auto">
                  <p className="text-[#0f1035]/50 text-[9px] text-center mb-2">Your payment information is safe and securely encrypted.</p>
                  <div className="gradient-bg rounded-xl py-2.5 text-white text-xs font-semibold text-center">Continue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Dashboard Teaser */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[#e8e4ff] rounded-3xl p-8 sm:p-12 overflow-hidden relative bg-white shadow-sm shadow-violet-50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#e8e4ff] rounded-full px-4 py-1.5 text-xs font-semibold text-[#7c3aed] mb-6">
                  🏢 For Businesses
                </div>
                <h2 className="font-display font-700 text-3xl sm:text-4xl text-[#0f1035] mb-4 leading-tight">
                  Your business,<br />
                  <span className="gradient-text">inside Mio.</span>
                </h2>
                <p className="text-[#0f1035]/60 leading-relaxed mb-6">
                  Reach customers where they already are. Mio surfaces your menu, services, and availability — and handles orders, bookings, and payments automatically.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Real-time orders and revenue dashboard", "Menu & catalog management", "Customer analytics and insights", "NFC in-store tap-to-order integration"].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-[#7c3aed] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-[#0f1035]/75 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/merchant" className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-md shadow-violet-200">
                  Add Your Business
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Dashboard preview */}
              <div className="bg-[#f8f7ff] border border-[#e8e4ff] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[#0f1035] font-display font-700 text-base">Good morning, Alex!</p>
                    <p className="text-[#0f1035]/50 text-xs">Here's what's happening at Bella Vista Restaurant today.</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#f0edff] border border-[#e8e4ff] flex items-center justify-center text-sm">👤</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Total Orders", value: "1,248", change: "+12%" },
                    { label: "Revenue", value: "$18,932", change: "+10%" },
                    { label: "Customers", value: "892", change: "+14%" },
                    { label: "Avg. Order", value: "$15.16", change: "+6.6%" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white border border-[#e8e4ff] rounded-xl p-3">
                      <p className="text-[#0f1035]/50 text-[10px] mb-1">{s.label}</p>
                      <p className="text-[#0f1035] font-display font-700 text-base">{s.value}</p>
                      <p className="text-emerald-600 text-[10px] font-semibold">{s.change}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[#0f1035]/50 text-xs mb-2 uppercase tracking-wide">Top Items</p>
                  {[
                    { name: "Margherita Pizza", orders: 342 },
                    { name: "Chicken Alfredo", orders: 281 },
                    { name: "Caesar Salad", orders: 214 },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-[#f0edff]">
                      <span className="text-[#0f1035]/75 text-xs">{item.name}</span>
                      <span className="text-[#0f1035] font-semibold text-xs">{item.orders}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFC In-Store */}
      <section className="py-20 px-4 sm:px-6 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-[#0f1035] mb-3">
              Mio + <span className="gradient-text">NFC In-Store</span>
            </h2>
            <p className="text-[#0f1035]/55 text-lg max-w-xl mx-auto">
              Tap to open menus, customise your order, pay securely — all through Mio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📡", step: "1", title: "Tap NFC Tag", desc: "Open the full restaurant menu instantly" },
              { icon: "🤖", step: "2", title: "Order with Mio", desc: "Customise your order conversationally" },
              { icon: "🔒", step: "3", title: "Pay Securely", desc: "Using your saved card or digital wallet" },
              { icon: "✅", step: "4", title: "Get Confirmation", desc: "Track your order in real time" },
            ].map((card) => (
              <div key={card.step} className="bg-white border border-[#e8e4ff] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#7c3aed]/40 hover:shadow-lg hover:shadow-violet-100 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[#0f1035]/20 text-3xl font-display font-800">{card.step}</span>
                </div>
                <div>
                  <p className="text-[#0f1035] font-display font-600 text-base mb-1">{card.title}</p>
                  <p className="text-[#0f1035]/55 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-700 text-3xl sm:text-4xl text-[#0f1035] mb-3">
              Loved by <span className="gradient-text">1 million+ people</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-[#e8e4ff] rounded-2xl p-6 shadow-sm shadow-violet-50">
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-[#0f1035]/75 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <p className="text-[#0f1035] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#0f1035]/50 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-4 sm:px-6 bg-[#f8f7ff]">
        <div className="max-w-5xl mx-auto bg-white border border-[#e8e4ff] rounded-3xl p-8 sm:p-12 text-center shadow-sm shadow-violet-50">
          <ShieldIcon className="w-10 h-10 text-[#7c3aed] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display font-700 text-2xl sm:text-3xl text-[#0f1035] mb-3">
            Secure by design. Private by default.
          </h2>
          <p className="text-[#0f1035]/60 max-w-xl mx-auto">
            Mio never invents inventory, booking availability, or payment confirmations. Every purchase and reservation requires your explicit confirmation. Your data stays yours.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 text-center relative overflow-hidden bg-[#0f1035]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-700/30 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display font-800 text-5xl sm:text-6xl text-white mb-4 leading-tight">
            Ready to talk<br />
            <span className="gradient-text">to everything?</span>
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-lg mx-auto">
            Join over a million people who shop, eat, travel, and pay through Mio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/onboarding"
              className="gradient-bg text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet text-lg"
            >
              Get Mio Free
            </Link>
            <Link
              to="/merchant"
              className="bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/15 transition-all text-lg"
            >
              For Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1035] border-t border-white/10 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-800 text-sm">M</span>
            </div>
            <span className="font-display font-700 text-white text-lg">Mio</span>
          </div>
          <p className="text-white/60 text-sm">© 2026 Mio AI. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-white/60 text-sm hover:text-white/80 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
