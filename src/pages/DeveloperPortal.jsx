import { useState } from "react";
import CodeIcon from "icon:code";
import KeyIcon from "icon:key";
import BookOpenIcon from "icon:book-open";
import ZapIcon from "icon:zap";
import CopyIcon from "icon:copy";
import CheckIcon from "icon:check";
import TerminalIcon from "icon:terminal";
import LayersIcon from "icon:layers";
import ArrowRightIcon from "icon:arrow-right";
import ExternalLinkIcon from "icon:external-link";
import ShieldIcon from "icon:shield-check";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/v1/products/search",
    desc: "Search products across all providers",
    params: ["q", "category", "provider", "limit"],
  },
  {
    method: "POST",
    path: "/v1/cart/create",
    desc: "Create a new cart session for a user",
    params: ["provider_id", "items[]", "user_token"],
  },
  {
    method: "GET",
    path: "/v1/bookings/availability",
    desc: "Check availability for hotels, flights, or appointments",
    params: ["provider", "date_from", "date_to", "guests"],
  },
  {
    method: "POST",
    path: "/v1/transactions/confirm",
    desc: "Confirm a pending transaction with explicit user approval",
    params: ["transaction_id", "user_token", "confirmation"],
  },
  {
    method: "GET",
    path: "/v1/providers",
    desc: "List all providers and their supported operations",
    params: ["category", "status"],
  },
  {
    method: "POST",
    path: "/v1/nfc/session",
    desc: "Generate a signed, expiring NFC session context",
    params: ["merchant_id", "context_type", "ttl"],
  },
];

const METHOD_COLOR = {
  GET: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  POST: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  PUT: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  DELETE: "bg-red-500/20 text-red-300 border-red-500/30",
};

const SDKS = [
  { name: "JavaScript / TypeScript", icon: "🟡", install: "npm install @mio-ai/sdk", badge: "Official" },
  { name: "React Native", icon: "⚛️", install: "npm install @mio-ai/react-native", badge: "Official" },
  { name: "Python", icon: "🐍", install: "pip install mio-ai", badge: "Official" },
  { name: "iOS Swift", icon: "🍎", install: "Swift Package Manager", badge: "Official" },
  { name: "Android Kotlin", icon: "🤖", install: "implementation 'ai.mio:sdk:1.0'", badge: "Official" },
  { name: "REST API", icon: "🌐", install: "No SDK needed — use any HTTP client", badge: "Standard" },
];

const GUIDES = [
  { title: "Quick Start", desc: "Get your first API call working in 5 minutes", icon: ZapIcon, time: "5 min" },
  { title: "Authentication", desc: "API keys, JWT tokens, and sandbox vs production", icon: ShieldIcon, time: "10 min" },
  { title: "Provider Adapters", desc: "Integrate your own provider or connect an existing one", icon: LayersIcon, time: "30 min" },
  { title: "Embeddable Widget", desc: "Add the Mio assistant to any website in one line", icon: CodeIcon, time: "15 min" },
  { title: "NFC & EasyTap Go", desc: "Build tap-to-order and in-store Mio sessions", icon: ZapIcon, time: "20 min" },
  { title: "Webhooks", desc: "Receive real-time events for orders, bookings, and payments", icon: TerminalIcon, time: "15 min" },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 rounded text-gray-500 hover:text-gray-800 text-xs transition-colors"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? <CheckIcon size={12} className="text-emerald-400" /> : <CopyIcon size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, lang = "bash" }) {
  return (
    <div className="relative bg-black/40 border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8">
        <span className="text-gray-400 text-xs">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm text-gray-700 overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const EXAMPLE_CODE = `import { MioClient } from '@mio-ai/sdk';

const mio = new MioClient({
  apiKey: process.env.MIO_API_KEY,
  sandbox: true, // use sandbox for testing
});

// Search products across all providers
const results = await mio.products.search({
  q: 'running shoes',
  category: 'retail',
  limit: 10,
});

// Create a cart
const cart = await mio.cart.create({
  items: [{ id: results[0].id, qty: 1 }],
});

// Confirm requires explicit user approval
const order = await mio.transactions.confirm({
  transactionId: cart.transactionId,
  userToken: session.userToken,
  confirmation: true,
});`;

const WIDGET_CODE = `<!-- Add Mio to any page — one line -->
<script src="https://cdn.mio-ai.com/widget/v1.js"
  data-api-key="YOUR_PUBLIC_KEY"
  data-merchant-id="YOUR_MERCHANT_ID"
  data-theme="dark">
</script>`;

export default function DeveloperPortal() {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="border-b border-white/8 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-sm border border-violet-500/30 text-violet-300 text-xs font-medium mb-6">
            <CodeIcon size={12} />
            Developer Portal — API v1.0
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy mb-4">
            Build with <span className="gradient-text">Mio AI</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Integrate voice-first commerce, booking, and payments into your app or website using the Mio API. One integration, every service category.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-5 py-2.5 rounded-xl gradient-bg text-navy font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              Get API Key <ArrowRightIcon size={14} />
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-white border border-border shadow-sm border border-white/12 text-navy text-sm hover:bg-white/8 transition-colors flex items-center gap-2">
              <BookOpenIcon size={14} /> Read Docs
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* API Key box */}
        <section>
          <div className="bg-white border border-border shadow-sm rounded-xl p-6 border border-violet-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                  <KeyIcon size={18} className="text-navy" />
                </div>
                <div>
                  <h2 className="text-navy font-semibold">Your API Keys</h2>
                  <p className="text-gray-500 text-sm">Sandbox mode active — safe for testing</p>
                </div>
              </div>
              <div className="sm:ml-auto">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">Sandbox</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Public Key", value: "pk_test_4xR9mK2vNbLqP7wZ…" },
                { label: "Secret Key", value: "sk_test_••••••••••••••••••••••" },
              ].map((k) => (
                <div key={k.label} className="bg-black/30 border border-white/8 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{k.label}</p>
                    <p className="text-navy text-sm font-mono">{k.value}</p>
                  </div>
                  <CopyButton text={k.value} />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3">Secret keys must never be exposed in client-side code. Use environment variables only.</p>
          </div>
        </section>

        {/* Quick start */}
        <section>
          <h2 className="text-navy font-display font-bold text-xl mb-5">Quick Start</h2>
          <div className="space-y-4">
            <CodeBlock lang="bash" code="npm install @mio-ai/sdk" />
            <CodeBlock lang="javascript" code={EXAMPLE_CODE} />
          </div>
        </section>

        {/* Embeddable widget */}
        <section>
          <h2 className="text-navy font-display font-bold text-xl mb-2">Embeddable Widget</h2>
          <p className="text-gray-500 text-sm mb-4">Drop a fully working Mio AI assistant onto any website — voice, chat, cards, and maps included.</p>
          <CodeBlock lang="html" code={WIDGET_CODE} />
          <div className="mt-4 p-4 bg-white border border-border shadow-sm rounded-xl border border-white/8 flex items-start gap-3">
            <ZapIcon size={16} className="text-violet-400 mt-0.5 shrink-0" />
            <p className="text-gray-600 text-sm">The widget connects to your approved provider list only. No raw credentials are exposed — only your public key is needed in client-side code.</p>
          </div>
        </section>

        {/* API Reference */}
        <section>
          <h2 className="text-navy font-display font-bold text-xl mb-5">API Reference</h2>
          <div className="space-y-3">
            {ENDPOINTS.map((ep) => (
              <div key={ep.path}>
                <button
                  className="w-full text-left p-4 bg-white border border-border shadow-sm rounded-xl border border-white/8 hover:border-violet-500/30 transition-colors"
                  onClick={() => setSelectedEndpoint(selectedEndpoint === ep.path ? null : ep.path)}
                  aria-expanded={selectedEndpoint === ep.path}
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${METHOD_COLOR[ep.method]}`}>{ep.method}</span>
                    <code className="text-gray-800 text-sm font-mono">{ep.path}</code>
                    <span className="text-gray-500 text-xs hidden sm:block">{ep.desc}</span>
                  </div>
                </button>
                {selectedEndpoint === ep.path && (
                  <div className="mt-1 p-4 bg-black/30 border border-white/8 rounded-xl space-y-3">
                    <p className="text-gray-700 text-sm">{ep.desc}</p>
                    <div>
                      <p className="text-gray-500 text-xs font-medium mb-2">Parameters</p>
                      <div className="flex flex-wrap gap-2">
                        {ep.params.map((p) => (
                          <code key={p} className="px-2 py-0.5 bg-white/6 border border-white/10 rounded text-xs text-violet-300">{p}</code>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SDKs */}
        <section>
          <h2 className="text-navy font-display font-bold text-xl mb-5">SDKs & Libraries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SDKS.map((sdk) => (
              <div key={sdk.name} className="bg-white border border-border shadow-sm rounded-xl p-4 border border-white/8 hover:border-violet-500/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">{sdk.icon}</span>
                    <p className="text-navy text-sm font-medium">{sdk.name}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-500/30">{sdk.badge}</span>
                </div>
                <code className="text-gray-500 text-xs font-mono">{sdk.install}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section>
          <h2 className="text-navy font-display font-bold text-xl mb-5">Guides & Tutorials</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES.map((g) => (
              <button key={g.title} className="text-left bg-white border border-border shadow-sm rounded-xl p-4 border border-white/8 hover:border-violet-500/30 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <g.icon size={18} className="text-violet-400" />
                  <span className="text-gray-500 text-xs">{g.time} read</span>
                </div>
                <p className="text-navy font-medium text-sm mb-1">{g.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{g.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-violet-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Read guide <ArrowRightIcon size={10} />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
