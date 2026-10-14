import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import MicIcon from "icon:mic";
import ArrowRightIcon from "icon:arrow-right";
import StarIcon from "icon:star";
import CheckIcon from "icon:check-circle";
import ShieldIcon from "icon:shield-check";
import ZapIcon from "icon:zap";
import SmartphoneIcon from "icon:smartphone";
import SearchIcon from "icon:search";
import ShoppingBagIcon from "icon:shopping-bag";
import UtensilsIcon from "icon:utensils";
import PlaneIcon from "icon:plane";
import CalendarIcon from "icon:calendar";
import CreditCardIcon from "icon:credit-card";
import TicketIcon from "icon:ticket";
import WifiIcon from "icon:wifi";
import SparklesIcon from "icon:sparkles";
import MapPinIcon from "icon:map-pin";
import ClockIcon from "icon:clock";
import TruckIcon from "icon:truck";

const CATEGORIES = [
  { icon: ShoppingBagIcon, label: "Shopping", desc: "Find and buy anything", color: "from-violet-500 to-purple-600", bg: "bg-violet-50", iconColor: "text-violet-600" },
  { icon: UtensilsIcon, label: "Food & Dining", desc: "Order pickup or delivery", color: "from-orange-400 to-red-500", bg: "bg-orange-50", iconColor: "text-orange-600" },
  { icon: PlaneIcon, label: "Travel & Hotels", desc: "Book flights and hotels", color: "from-sky-400 to-blue-600", bg: "bg-sky-50", iconColor: "text-sky-600" },
  { icon: CalendarIcon, label: "Services", desc: "Appointments & bookings", color: "from-teal-400 to-emerald-600", bg: "bg-teal-50", iconColor: "text-teal-600" },
  { icon: CreditCardIcon, label: "Payments", desc: "Pay bills, invoices & more", color: "from-indigo-500 to-violet-600", bg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { icon: TicketIcon, label: "Events", desc: "Find and book tickets", color: "from-pink-500 to-rose-600", bg: "bg-pink-50", iconColor: "text-pink-600" },
  { icon: WifiIcon, label: "NFC & In-Store", desc: "Tap, order and pay", color: "from-purple-500 to-fuchsia-600", bg: "bg-purple-50", iconColor: "text-purple-600" },
  { icon: SparklesIcon, label: "And More", desc: "Explore all possibilities", color: "from-amber-400 to-orange-500", bg: "bg-amber-50", iconColor: "text-amber-600" },
];

const CHAT_STEPS = [
  { role: "user", text: "Mio, order my usual from McDonald's." },
  { role: "mio", text: "Found your usual — Big Mac combo. Estimated arrival 25 min. Confirm?" },
  { role: "user", text: "Yes, confirm." },
  { role: "mio", text: "Order placed! Track it live in the app. 🎉" },
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
    avatar: "SK",
    text: "I booked flights, a hotel, and airport transfers in one conversation. Mio understood exactly what I needed.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Restaurant owner",
    avatar: "MT",
    text: "My customers love ordering through Mio. It's like having a 24/7 personal assistant for everyone.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Busy parent",
    avatar: "PM",
    text: "From grocery deliveries to booking appointments — Mio handles everything. The voice feature is a game-changer.",
    rating: 5,
  },
];

const PHONE_SCREENS = [
  {
    title: "Welcome",
    desc: "Your AI assistant for everyday life",
    content: "onboarding",
  },
  {
    title: "AI Shopping",
    desc: "Find the best deals instantly",
    content: "shopping",
  },
  {
    title: "Travel Search",
    desc: "Hotels, flights, transfers",
    content: "travel",
  },
  {
    title: "Payments",
    desc: "Secure, one-tap checkout",
    content: "payment",
  },
];

function WaveBar() {
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
      {[0.4, 0.7, 1, 0.6, 0.3, 0.8, 1, 0.5, 0.4].map((h, i) => (
        <span
          key={i}
          className="inline-block w-[3px] rounded-full bg-white animate-[wave_1.2s_ease-in-out_infinite]"
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
    const t = setTimeout(() => setVisible((v) => v + 1), 1400 + visible * 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="space-y-3">
      {CHAT_STEPS.slice(0, visible).map((step, i) => (
        <div key={i} className={`flex ${step.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-snug ${
            step.role === "user"
              ? "bg-violet-600 text-white rounded-tr-sm"
              : "bg-white border border-violet-100 text-navy rounded-tl-sm shadow-sm"
          }`}>
            {step.role === "mio" && (
              <div className="flex items-center gap-1 mb-1">
                <div className="w-3 h-3 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-white text-[6px] font-bold">M</span>
                </div>
                <span className="text-violet-600 font-semibold text-[10px]">Mio</span>
              </div>
            )}
            {step.text}
          </div>
        </div>
      ))}
      {visible < CHAT_STEPS.length && (
        <div className="flex justify-start">
          <div className="bg-white border border-violet-100 shadow-sm px-3 py-2 rounded-2xl rounded-tl-sm">
            <div className="flex gap-1 items-center h-3">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PhoneScreen({ screen }) {
  if (screen.content === "onboarding") {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <img src="/static/stock_hero-woman-phone-cd6f41-0.jpg" alt="Mio user" className="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-violet-200" />
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h3 className="font-bold text-navy text-sm">Mio</h3>
          <p className="text-gray-500 text-xs mt-1">Your AI Assistant<br />for Everyday Life</p>
          <div className="mt-3 w-full space-y-1.5">
            {["🛍️ Shopping", "🍔 Food & Restaurants", "✈️ Travel & Hotels", "📅 Services & Bookings"].map(item => (
              <div key={item} className="flex items-center gap-2 bg-violet-50 rounded-lg px-3 py-1.5 text-xs text-navy font-medium">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 space-y-2">
          <button className="w-full gradient-bg text-white rounded-xl py-2.5 text-xs font-bold">Get Started</button>
          <button className="w-full border border-violet-200 text-violet-600 rounded-xl py-2 text-xs font-semibold">Sign In</button>
          <p className="text-center text-gray-400 text-[10px]">Skip for now</p>
        </div>
      </div>
    );
  }
  if (screen.content === "shopping") {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <SearchIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Ask anything...</span>
            <MicIcon className="w-3 h-3 text-violet-500 ml-auto" />
          </div>
        </div>
        <div className="flex-1 p-3 space-y-3 overflow-hidden">
          <div className="bg-violet-600 rounded-xl p-3 text-white">
            <p className="text-xs font-semibold mb-2">AI Shopping Assistant</p>
            <div className="bg-white/20 rounded-lg p-2 mb-2">
              <p className="text-[10px] text-violet-100">Top rated · Best quality · Best for your budget</p>
              <p className="text-xs font-bold mt-1">Sony WH-1000XMS</p>
              <p className="text-[10px] text-violet-100">Best noise cancelling headphones</p>
              <p className="text-lg font-black mt-1">$399</p>
            </div>
            <img src="/static/stock_product-headphones-1b8be0-0.jpg" alt="Sony headphones" className="w-full h-16 object-cover rounded-lg" />
          </div>
          <button className="w-full gradient-bg text-white rounded-xl py-2 text-xs font-bold">Add to cart</button>
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100">
            <SearchIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Ask a follow up...</span>
            <MicIcon className="w-3 h-3 text-violet-500 ml-auto" />
          </div>
        </div>
      </div>
    );
  }
  if (screen.content === "travel") {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white p-3 border-b border-gray-100">
          <div className="bg-violet-50 rounded-xl px-3 py-2">
            <p className="text-xs text-violet-600 font-semibold">Find me a hotel in Chicago next weekend.</p>
          </div>
          <p className="text-[10px] text-gray-400 mt-1 px-1">Here are some top-rated options for Oct 24 – Oct 26 (2 nights):</p>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-hidden">
          {[
            { name: "The Langham Chicago", stars: "4.8", price: "$229", img: "/static/stock_hotel-chicago-b82d92-0.jpg" },
            { name: "Renaissance Chicago", stars: "4.6", price: "$199", img: "/static/stock_travel-city-720400-0.jpg" },
          ].map((hotel) => (
            <div key={hotel.name} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={hotel.img} alt={hotel.name} className="w-full h-12 object-cover" />
              <div className="p-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-navy">{hotel.name}</p>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-gray-500">{hotel.stars}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-violet-600">{hotel.price}</p>
                  <p className="text-[10px] text-gray-400">/night</p>
                </div>
              </div>
              <div className="px-2 pb-2">
                <button className="w-full border border-violet-300 text-violet-600 rounded-lg py-1 text-[10px] font-bold">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // payment
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-3 border-b border-gray-100">
        <p className="text-sm font-bold text-navy">Add a payment method</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Your payment info is safe and securely encrypted.</p>
      </div>
      <div className="flex-1 p-3 space-y-2">
        {[
          { label: "Credit or Debit Card", sub: "Secured safely with Stripe", icon: "💳" },
          { label: "Apple Pay", sub: "", icon: "🍎" },
          { label: "Google Pay", sub: "", icon: "G" },
          { label: "Link (Stripe)", sub: "", icon: "🔗" },
          { label: "PayPal", sub: "", icon: "P" },
          { label: "Add Later", sub: "", icon: "+" },
        ].map((method) => (
          <div key={method.label} className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-violet-200 cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">{method.icon}</div>
            <div>
              <p className="text-xs font-semibold text-navy">{method.label}</p>
              {method.sub && <p className="text-[10px] text-gray-400">{method.sub}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3">
        <button className="w-full gradient-bg text-white rounded-xl py-2.5 text-xs font-bold">Continue</button>
      </div>
    </div>
  );
}

function MiniPhone({ screen, active, onClick, index }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`relative transition-all duration-500 cursor-pointer ${active ? "scale-105 z-10" : "scale-95 opacity-70 hover:opacity-90"}`}
      style={{ animationDelay: `${index * 0.15}s` }}
      aria-label={`View ${screen.title} screen`}
    >
      <div className="w-[100px] sm:w-[120px] h-[200px] sm:h-[240px] bg-black rounded-[20px] p-[3px] shadow-2xl relative">
        {active && <div className="absolute -inset-2 rounded-[24px] bg-violet-400/20 blur-xl -z-10" />}
        <div className="w-full h-full bg-white rounded-[18px] overflow-hidden relative">
          {/* notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-b-xl z-10" />
          <div className="pt-4 h-full overflow-hidden">
            <PhoneScreen screen={screen} />
          </div>
        </div>
      </div>
      <p className={`text-center mt-2 text-[10px] font-semibold transition-colors ${active ? "text-violet-600" : "text-gray-400"}`}>{screen.title}</p>
    </div>
  );
}

export default function Home() {
  const [activePhone, setActivePhone] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActivePhone(p => (p + 1) % PHONE_SCREENS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Soft radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-100/60 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <SparklesIcon className="w-3.5 h-3.5" />
                AI POWERED ASSISTANT
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-navy leading-[1.05] tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Talk. Find.<br />Book.<br />
                <span className="gradient-text">Order. Pay.</span>
              </h1>
              <p className="text-xl font-semibold text-navy mb-2">One assistant. Endless possibilities.</p>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                Mio helps you shop, dine, travel, book services and handle payments — all through natural conversation.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/onboarding" className="gradient-bg text-white font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-shadow text-sm">
                  Get Mio Free <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <button className="flex items-center gap-2 border border-gray-200 bg-white text-navy font-semibold px-6 py-3.5 rounded-2xl hover:border-violet-300 transition-colors text-sm shadow-sm">
                  <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  Watch Video
                </button>
              </div>
              {/* App badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl cursor-pointer hover:bg-gray-900 transition-colors">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div>
                    <p className="text-[9px] text-gray-300">Download on the</p>
                    <p className="text-xs font-bold">App Store</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl cursor-pointer hover:bg-gray-900 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M3.18 23.76c.3.17.64.22.98.15l12.49-12.49L13.23 8l-10.05 15zm16.53-9.78L16.9 12.3l-3.67 3.67 3.03 3.03 3.45-1.98c.98-.56.98-2.48 0-3.04zM3.18.24C2.88.41 2.69.72 2.69 1.12v21.77c0 .4.19.71.49.88L14.87 12 3.18.24zm13.72 7.84L13.23 8l-9.98-9.98-.07-.06 12.49 12.49 2.81-2.81c.98-.56.98-2.49.22-3.06z" fill="url(#gp)"/><defs><linearGradient id="gp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4FC3F7"/><stop offset="100%" stopColor="#1E88E5"/></linearGradient></defs></svg>
                  <div>
                    <p className="text-[9px] text-gray-300">GET IT ON</p>
                    <p className="text-xs font-bold">Google Play</p>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-lg font-black text-violet-600" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                    <p className="text-xs text-gray-400 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero image + floating cards */}
            <div className="relative flex justify-center animate-slide-up-2">
              <div className="relative w-full max-w-md">
                {/* Purple glow blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-200/60 via-purple-100/40 to-transparent rounded-[40px] blur-2xl" aria-hidden="true" />
                {/* Hero woman image */}
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-violet-200/50">
                  <img
                    src="/static/stock_hero-woman-phone-cd6f41-0.jpg"
                    alt="Person using Mio AI"
                    className="w-full h-[480px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent" />
                </div>

                {/* Floating category chips */}
                {[
                  { label: "Food & Dining", img: "/static/stock_food-mcdonalds-b65823-0.jpg", pos: "top-8 -right-8" },
                  { label: "Hotels & Travel", img: "/static/stock_hotel-chicago-b82d92-0.jpg", pos: "top-1/3 -right-12" },
                  { label: "Shopping", img: "/static/stock_product-shoes-cea126-0.jpg", pos: "top-2/3 -right-8" },
                  { label: "Bookings & Services", pos: "bottom-12 -right-4", icon: "📅" },
                ].map((chip, i) => (
                  <div
                    key={chip.label}
                    className={`absolute ${chip.pos} bg-white rounded-2xl shadow-xl shadow-violet-100/60 px-3 py-2 flex items-center gap-2 border border-violet-50 animate-float`}
                    style={{ animationDelay: `${i * 0.5}s` }}
                    aria-hidden="true"
                  >
                    {chip.img && <img src={chip.img} alt="" className="w-8 h-8 rounded-lg object-cover" />}
                    {chip.icon && <span className="text-lg">{chip.icon}</span>}
                    <span className="text-xs font-bold text-navy whitespace-nowrap">{chip.label}</span>
                  </div>
                ))}

                {/* Chat bubble */}
                <div className="absolute top-6 left-4 bg-white rounded-2xl shadow-xl shadow-violet-100/50 px-3 py-2 border border-violet-50 max-w-[180px] animate-float-delay" aria-hidden="true">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 gradient-bg rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">M</span>
                    </div>
                    <span className="text-[10px] font-semibold text-violet-600">Mio</span>
                  </div>
                  <p className="text-[10px] text-navy leading-snug">Mio, order my usual from McDonald's.</p>
                </div>

                {/* Voice orb */}
                <div className="absolute bottom-6 left-6 w-12 h-12 gradient-bg rounded-full flex items-center justify-center shadow-lg shadow-violet-400/40 animate-pulse-glow" aria-hidden="true">
                  <MicIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Everything You Need ── */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Everything You Need. <span className="gradient-text">Just Ask Mio.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">One assistant that handles every part of your day — from shopping to travel to paying bills.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.label} className="group bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md border border-gray-100 hover:border-violet-200 transition-all cursor-pointer">
                  <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${cat.iconColor}`} />
                  </div>
                  <p className="font-bold text-navy text-sm mb-1">{cat.label}</p>
                  <p className="text-gray-400 text-xs leading-tight">{cat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* AI Demo Card */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black text-navy mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Find me running shoes<br /><span className="gradient-text">under $150</span>
              </h3>
              <p className="text-gray-500 mb-6">Mio searches thousands of retailers instantly, compares prices, reads reviews, and surfaces exactly what you need — all in one reply.</p>
              <div className="space-y-3">
                {[
                  { icon: SearchIcon, text: "Found 5 great options", color: "text-violet-600", bg: "bg-violet-50" },
                  { icon: ZapIcon, text: "Compare features", color: "text-indigo-600", bg: "bg-indigo-50" },
                  { icon: ShoppingBagIcon, text: "Add to cart", color: "text-purple-600", bg: "bg-purple-50" },
                  { icon: ShieldIcon, text: "Secure checkout", color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                      <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span className="text-navy font-semibold text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Phone mockup showing search results */}
            <div className="flex justify-center">
              <div className="relative w-64">
                <div className="absolute -inset-4 bg-violet-100/50 rounded-[40px] blur-2xl" aria-hidden="true" />
                <div className="relative bg-black rounded-[32px] p-1.5 shadow-2xl shadow-violet-200/40">
                  <div className="bg-white rounded-[28px] overflow-hidden">
                    <div className="bg-navy px-4 py-3 text-center">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white text-[10px]">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 border border-white/50 rounded-sm"><div className="w-3 h-full bg-white rounded-sm" /></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">M</span>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold text-xs">Mio</p>
                          <p className="text-white/60 text-[9px]">Your AI Assistant</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 space-y-2 min-h-[300px]">
                      <ChatDemo />
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 mb-2">AI Picks for You</p>
                        <div className="flex gap-2">
                          <img src="/static/stock_product-headphones-1b8be0-0.jpg" alt="Product" className="w-12 h-12 rounded-lg object-cover" />
                          <img src="/static/stock_product-shoes-cea126-0.jpg" alt="Product" className="w-12 h-12 rounded-lg object-cover" />
                          <img src="/static/stock_food-dining-278a95-0.jpg" alt="Product" className="w-12 h-12 rounded-lg object-cover" />
                        </div>
                      </div>
                    </div>
                    {/* Bottom input */}
                    <div className="px-3 pb-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                        <span className="text-[10px] text-gray-400 flex-1">Ask Mio anything...</span>
                        <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
                          <MicIcon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile App Screens ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black text-navy mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Mobile App Screens
            </h2>
            <p className="text-gray-500 text-lg">Onboarding &amp; Key Flows</p>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            {PHONE_SCREENS.map((screen, i) => (
              <MiniPhone key={screen.title} screen={screen} active={activePhone === i} onClick={() => setActivePhone(i)} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="flex justify-center gap-2">
              {PHONE_SCREENS.map((_, i) => (
                <button key={i} onClick={() => setActivePhone(i)} className={`w-2 h-2 rounded-full transition-all ${activePhone === i ? "bg-violet-600 w-6" : "bg-gray-200"}`} aria-label={`Screen ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Business Dashboard ── */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <ZapIcon className="w-3.5 h-3.5" />
                BUSINESS DASHBOARD
              </div>
              <h2 className="text-4xl font-black text-navy mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Powerful tools for<br /><span className="gradient-text">every merchant</span>
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">Real-time orders, revenue analytics, customer insights, and team management — all in one beautiful dashboard designed for modern businesses.</p>
              <div className="space-y-3 mb-8">
                {[
                  { stat: "1,248", label: "Total Orders", icon: ShoppingBagIcon, trend: "+12%", color: "text-violet-600" },
                  { stat: "$18,932", label: "Revenue", icon: CreditCardIcon, trend: "+10%", color: "text-emerald-600" },
                  { stat: "892", label: "Customers", icon: SmartphoneIcon, trend: "+14%", color: "text-blue-600" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                      <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-violet-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-navy text-lg">{item.stat}</p>
                        <p className="text-gray-400 text-xs">{item.label}</p>
                      </div>
                      <span className={`text-sm font-bold ${item.color}`}>{item.trend}</span>
                    </div>
                  );
                })}
              </div>
              <Link to="/merchant" className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-shadow text-sm">
                View Dashboard <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-violet-100/40 rounded-3xl blur-2xl" aria-hidden="true" />
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-violet-100/50 overflow-hidden border border-violet-100">
                <div className="bg-navy px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-black text-xs">M</span>
                    </div>
                    <span className="text-white font-bold text-sm">Restaurant ▾</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-violet-400">
                      <img src="/static/stock_merchant-dashboard-b55134-0.jpg" alt="Alex Morgan" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xs font-semibold">Alex Morgan</p>
                      <p className="text-white/60 text-[10px]">Owner</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-navy text-base mb-0.5">Good morning, Alex!</h3>
                  <p className="text-gray-400 text-xs mb-4">Here's what's happening at Bella Vista Restaurant today.</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: "Total Orders", val: "1,248", trend: "↑12%" },
                      { label: "Revenue", val: "$18,932", trend: "↑10%" },
                      { label: "Customers", val: "892", trend: "↑14%" },
                      { label: "Avg. Order", val: "$15.16", trend: "↑6.6%" },
                    ].map((m) => (
                      <div key={m.label} className="bg-violet-50 rounded-xl p-2 text-center">
                        <p className="font-black text-navy text-sm">{m.val}</p>
                        <p className="text-gray-400 text-[9px]">{m.label}</p>
                        <p className="text-violet-600 text-[9px] font-bold">{m.trend}</p>
                      </div>
                    ))}
                  </div>
                  {/* Mini chart */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <div className="flex items-end gap-1 h-16">
                      {[30, 50, 40, 70, 60, 80, 55, 90, 75, 95].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h}%`, background: i === 9 ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#ede9fe" }} />
                      ))}
                    </div>
                  </div>
                  {/* Top items */}
                  <div>
                    <p className="text-xs font-bold text-navy mb-2">Top Items</p>
                    {[["Margherita Pizza", 342], ["Chicken Alfredo", 281], ["Caesar Salad", 214]].map(([name, count]) => (
                      <div key={name} className="flex items-center justify-between py-1 border-b border-gray-50">
                        <span className="text-xs text-navy">{name}</span>
                        <span className="text-xs font-bold text-violet-600">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NFC In-Store ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-300 text-xs font-bold px-3 py-1.5 rounded-full border border-violet-500/30 mb-4">
                <WifiIcon className="w-3.5 h-3.5" />
                MIO + NFC / IN-STORE EXPERIENCE
              </div>
              <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Tap. Order. Pay.<br /><span className="gradient-text">In seconds.</span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">Walk into any Mio-connected venue. Tap the NFC tag. Let Mio handle the rest — ordering, customising, and paying — without a queue.</p>
              <div className="space-y-4">
                {[
                  { icon: WifiIcon, title: "Tap NFC Tag", desc: "Open menu instantly" },
                  { icon: ShoppingBagIcon, title: "Order with Mio", desc: "Customise easily" },
                  { icon: ShieldIcon, title: "Pay Securely", desc: "Using saved card" },
                  { icon: CheckIcon, title: "Get Confirmation", desc: "Track your order" },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-center gap-4">
                      <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{step.title}</p>
                        <p className="text-white/50 text-xs">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/easytap" className="mt-8 inline-flex items-center gap-2 bg-white text-violet-600 font-bold px-6 py-3 rounded-2xl hover:bg-violet-50 transition-colors text-sm">
                Explore EasyTap Go <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-3xl" aria-hidden="true" />
              <div className="relative w-72 h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/static/stock_nfc-payment-7394dc-0.jpg" alt="NFC tap-to-pay experience" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                {/* Floating NFC badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <WifiIcon className="w-4 h-4 text-violet-600" />
                    <span className="text-xs font-bold text-navy">Tap NFC Tag</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Open menu instantly</p>
                </div>
                {/* Order confirmed badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-navy">Order Confirmed</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Track your order live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-navy mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Loved by <span className="gradient-text">1 million+ users</span>
            </h2>
            <p className="text-gray-500 text-lg">Real people, real results.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#f8f7ff] border border-violet-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-violet-100/50 transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-navy text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-xs">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-navy text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Ready to let<br /><span className="gradient-text">Mio handle it?</span>
          </h2>
          <p className="text-white/60 text-xl mb-8 max-w-2xl mx-auto">Join over a million people who shop, dine, travel, and pay smarter — just by talking.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding" className="gradient-bg text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-violet-900/50 hover:shadow-violet-900/70 transition-shadow flex items-center gap-2 justify-center">
              Get Mio Free <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link to="/features" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition-colors">
              See all features
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6">No credit card required · Free to get started</p>
        </div>
      </section>
    </div>
  );
}
