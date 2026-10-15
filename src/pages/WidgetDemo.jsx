import { useState, useEffect, useRef } from "react";
import MicIcon from "icon:mic";
import SendIcon from "icon:send";
import XIcon from "icon:x";
import ChevronDownIcon from "icon:chevron-down";
import ShoppingBagIcon from "icon:shopping-bag";
import MapPinIcon from "icon:map-pin";
import StarIcon from "icon:star";
import ClockIcon from "icon:clock";

const DEMO_FLOWS = {
  shopping: [
    { role: "mio", text: "Hi! I'm Mio. What are you looking for today?" },
    { role: "user", text: "Find me wireless headphones under $150" },
    { role: "mio", text: "Searching across 8 retail providers…", typing: true },
    {
      role: "mio", text: "Found 3 great options for you:", cards: [
        { name: "Sony WH-1000XM4", price: "$128", rating: "4.8", store: "Amazon", img: "🎧" },
        { name: "Jabra Evolve2 55", price: "$142", rating: "4.6", store: "Best Buy", img: "🎵" },
        { name: "Beats Studio Pro", price: "$149", rating: "4.7", store: "Apple Store", img: "🎶" },
      ]
    },
    { role: "user", text: "I'll take the Sony ones" },
    { role: "mio", text: "Adding Sony WH-1000XM4 to your cart from Amazon — $128 + free shipping. Confirm purchase?" },
    { role: "user", text: "Yes, confirm" },
    { role: "mio", text: "Order placed! You'll receive a confirmation email shortly. Anything else?" },
  ],
  food: [
    { role: "mio", text: "Hi! I'm Mio. I can help you order food, book a table, or find nearby restaurants." },
    { role: "user", text: "Order a margherita pizza for delivery" },
    { role: "mio", text: "Looking for pizza delivery near you…", typing: true },
    {
      role: "mio", text: "Top picks nearby:", cards: [
        { name: "Napoli Express", price: "$14.90", rating: "4.9", store: "0.4 mi · 25 min", img: "🍕" },
        { name: "Pizza Roma", price: "$12.50", rating: "4.7", store: "0.8 mi · 35 min", img: "🍕" },
      ]
    },
    { role: "user", text: "Napoli Express please" },
    { role: "mio", text: "Margherita pizza from Napoli Express — $14.90, arrives in ~25 min. Confirm?" },
    { role: "user", text: "Confirmed!" },
    { role: "mio", text: "Order placed! Track your delivery live in the app." },
  ],
  travel: [
    { role: "mio", text: "Hello! I can help with flights, hotels, and transport. Where are you headed?" },
    { role: "user", text: "I need a hotel in NYC for 2 nights next weekend" },
    { role: "mio", text: "Checking availability across 6 hotel providers…", typing: true },
    {
      role: "mio", text: "Available hotels:", cards: [
        { name: "The Standard NYC", price: "$189/night", rating: "4.8", store: "Midtown · Free cancel", img: "🏨" },
        { name: "Arlo Nomad", price: "$159/night", rating: "4.6", store: "NoMad · Includes breakfast", img: "🛎️" },
      ]
    },
    { role: "user", text: "Book Arlo Nomad please" },
    { role: "mio", text: "2 nights at Arlo Nomad — $318 total, includes breakfast, free cancellation. Confirm?" },
    { role: "user", text: "Yes book it" },
    { role: "mio", text: "Booked! Confirmation sent to your email. Enjoy New York!" },
  ],
};

function ProductCard({ card }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 border border-white/12">
      <span className="text-2xl" aria-hidden="true">{card.img}</span>
      <div className="flex-1 min-w-0">
        <p className="text-navy text-xs font-medium truncate">{card.name}</p>
        <p className="text-gray-500 text-xs">{card.store}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-violet-300 text-xs font-bold">{card.price}</p>
        <div className="flex items-center gap-0.5">
          <StarIcon size={9} className="text-amber-400" />
          <span className="text-gray-500 text-xs">{card.rating}</span>
        </div>
      </div>
    </div>
  );
}

function MioWidget({ scenario, onClose }) {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const flow = DEMO_FLOWS[scenario];

  useEffect(() => {
    setMessages([]);
    setStep(0);
    setIsTyping(false);
  }, [scenario]);

  useEffect(() => {
    if (step >= flow.length) return;
    const msg = flow[step];
    if (msg.role === "mio") {
      if (msg.typing) {
        setIsTyping(true);
        const t = setTimeout(() => {
          setIsTyping(false);
          setMessages((m) => [...m, msg]);
          setStep((s) => s + 1);
        }, 1400);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setMessages((m) => [...m, msg]);
          setStep((s) => s + 1);
        }, step === 0 ? 400 : 600);
        return () => clearTimeout(t);
      }
    }
  }, [step, flow]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    if (!inputVal.trim()) return;
    if (step < flow.length && flow[step].role === "user") {
      setMessages((m) => [...m, { role: "user", text: inputVal }]);
      setInputVal("");
      setStep((s) => s + 1);
    } else {
      setMessages((m) => [...m, { role: "user", text: inputVal }]);
      setInputVal("");
      setTimeout(() => {
        setMessages((m) => [...m, { role: "mio", text: "Got it! How else can I help you today?" }]);
      }, 800);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleVoice() {
    setListening((v) => !v);
    if (!listening && step < flow.length && flow[step].role === "user") {
      setTimeout(() => {
        setInputVal(flow[step].text);
        setListening(false);
      }, 1200);
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col bg-[#0c0c28] border border-violet-500/30 rounded-2xl shadow-2xl shadow-violet-900/40 overflow-hidden" style={{ height: 520 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-gradient-to-r from-violet-600/20 to-indigo-600/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-navy font-display font-bold text-xs">M</div>
          <div>
            <p className="text-navy text-sm font-semibold leading-none">Mio AI</p>
            <p className="text-emerald-400 text-xs">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1" aria-label="Close widget">
          <XIcon size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "mio" && (
              <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs mr-1.5 mt-auto shrink-0">M</div>
            )}
            <div className={`max-w-[85%] space-y-1.5 ${msg.role === "user" ? "" : ""}`}>
              <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-violet-600/80 text-navy rounded-br-sm"
                  : "bg-white/10 text-navy rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
              {msg.cards && (
                <div className="space-y-1.5 ml-0">
                  {msg.cards.map((card, ci) => <ProductCard key={ci} card={card} />)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs mr-1.5 mt-auto shrink-0">M</div>
            <div className="px-3 py-2 rounded-2xl rounded-bl-sm bg-white/10 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} aria-hidden="true" />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/8 p-3 flex items-center gap-2">
        <button
          onClick={handleVoice}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${listening ? "bg-violet-500 animate-pulse" : "bg-white/8 hover:bg-white/12"}`}
          aria-label={listening ? "Stop listening" : "Start voice input"}
          aria-pressed={listening}
        >
          <MicIcon size={14} className="text-navy" />
        </button>
        <label htmlFor="mio-input" className="sr-only">Type a message</label>
        <input
          id="mio-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type or tap the mic…"
          className="flex-1 bg-white/8 border border-white/10 rounded-xl px-3 py-1.5 text-navy text-xs placeholder:text-gray-400 outline-hidden focus:border-violet-500/50"
        />
        <button
          onClick={handleSend}
          disabled={!inputVal.trim()}
          className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity disabled:opacity-40"
          aria-label="Send message"
        >
          <SendIcon size={13} className="text-navy" />
        </button>
      </div>
    </div>
  );
}

export default function WidgetDemo() {
  const [scenario, setScenario] = useState("shopping");
  const [widgetOpen, setWidgetOpen] = useState(true);

  const scenarios = [
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "travel", label: "Travel", icon: "✈️" },
  ];

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-white/8">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-sm border border-violet-500/30 text-violet-300 text-xs font-medium mb-6">
            Embeddable Mio Widget
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Add Mio to <span className="gradient-text">any website</span>
          </h1>
          <p className="text-gray-600 text-lg mb-3">
            One line of code gives your visitors a fully capable voice and chat AI assistant — shopping, ordering, booking, and payments included.
          </p>
        </div>
      </section>

      {/* Demo area */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: mock site */}
            <div className="relative">
              <div className="bg-white border border-border shadow-sm rounded-2xl border border-white/8 overflow-hidden">
                {/* Mock browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="flex-1 bg-white/6 rounded px-3 py-1 text-gray-400 text-xs font-mono">yourwebsite.com</div>
                </div>
                {/* Mock site content */}
                <div className="p-6 min-h-72 relative">
                  <div className="space-y-4">
                    <div className="h-4 w-2/3 bg-white/8 rounded-full" />
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                    <div className="h-3 w-4/5 bg-white/5 rounded-full" />
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-white/4 rounded-xl border border-white/6" />
                      ))}
                    </div>
                    <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                    <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                  </div>
                  {/* Floating widget button */}
                  {!widgetOpen && (
                    <button
                      onClick={() => setWidgetOpen(true)}
                      className="absolute bottom-4 right-4 w-12 h-12 rounded-full gradient-bg shadow-lg shadow-violet-900/40 flex items-center justify-center text-navy font-display font-bold text-lg animate-pulse-glow"
                      aria-label="Open Mio assistant"
                    >
                      M
                    </button>
                  )}
                  {widgetOpen && (
                    <div className="absolute bottom-4 right-4">
                      <MioWidget scenario={scenario} onClose={() => setWidgetOpen(false)} />
                    </div>
                  )}
                </div>
              </div>
              {!widgetOpen && (
                <p className="text-center text-gray-500 text-sm mt-3">Click the Mio button to open the assistant</p>
              )}
            </div>

            {/* Right: controls + code */}
            <div className="space-y-6">
              <div>
                <h2 className="text-navy font-display font-bold text-2xl mb-2">Try a live demo</h2>
                <p className="text-gray-500 text-sm">Pick a scenario and interact with the Mio widget — type or tap the mic button.</p>
              </div>

              {/* Scenario selector */}
              <div>
                <p className="text-gray-600 text-xs font-medium mb-2">Scenario</p>
                <div className="flex gap-2">
                  {scenarios.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setScenario(s.id); setWidgetOpen(true); }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        scenario === s.id
                          ? "gradient-bg text-navy"
                          : "bg-white border border-border shadow-sm border border-white/12 text-gray-600 hover:text-navy hover:bg-white/8"
                      }`}
                      aria-pressed={scenario === s.id}
                    >
                      <span aria-hidden="true">{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-3">
                {[
                  { icon: "🎙️", title: "Voice & Chat", desc: "Natural conversation in spoken or typed form" },
                  { icon: "🃏", title: "Rich Product Cards", desc: "Images, prices, ratings, and availability inline" },
                  { icon: "✅", title: "Explicit Confirmation", desc: "Every purchase requires a clear user approval" },
                  { icon: "🔒", title: "Secure by Design", desc: "No credentials in client code — public key only" },
                  { icon: "🎨", title: "Fully Themeable", desc: "Match your brand with a single data attribute" },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3 p-3 bg-white border border-border shadow-sm rounded-xl border border-white/8">
                    <span className="text-xl" aria-hidden="true">{f.icon}</span>
                    <div>
                      <p className="text-navy text-sm font-medium">{f.title}</p>
                      <p className="text-gray-500 text-xs">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
