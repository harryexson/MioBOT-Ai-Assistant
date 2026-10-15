import { useState } from "react";
import { Link } from "react-router";
import CheckIcon from "icon:check-circle";
import ShieldIcon from "icon:shield-check";
import CreditCardIcon from "icon:credit-card";
import ArrowRightIcon from "icon:arrow-right";
import LockIcon from "icon:lock";
import SmartphoneIcon from "icon:smartphone";
import ZapIcon from "icon:zap";
import ReceiptIcon from "icon:receipt";

const PAYMENT_METHODS = [
  { id: "card", label: "Card", icon: "💳", badge: null },
  { id: "apple", label: "Apple Pay", icon: "🍎", badge: null },
  { id: "google", label: "Google Pay", icon: "G", badge: null },
  { id: "paypal", label: "PayPal", icon: "🅿️", badge: null },
];

const DEMO_ORDER = {
  merchant: "Honest Burgers",
  items: [
    { name: "Double Honest", qty: 1, price: 13.50 },
    { name: "Sweet Potato Fries", qty: 1, price: 4.00 },
    { name: "Craft Lemonade", qty: 2, price: 3.50 },
  ],
  delivery: 2.49,
  tax: 1.85,
};

const FEATURES = [
  {
    icon: <ShieldIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Explicit approval always",
    desc: "Mio shows the complete order, itemised total, and final price before any payment is taken. There are no silent charges.",
  },
  {
    icon: <LockIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Tokenised payment methods",
    desc: "Raw card credentials are never stored. Payment tokens are issued by the processor, not by Mio — and they're tied to your device.",
  },
  {
    icon: <SmartphoneIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Apple Pay & Google Pay",
    desc: "Biometric-verified, one-tap payment where providers support it. No card number ever typed — or transmitted.",
  },
  {
    icon: <ZapIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Idempotent transactions",
    desc: "Every order attempt uses a unique key. Tapping \"Confirm\" twice never charges you twice — the second attempt is silently deduplicated.",
  },
  {
    icon: <ReceiptIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Receipts and refunds",
    desc: "Receipts appear instantly in your Mio payment history. Where the provider supports it, refunds and cancellations are handled inside the same conversation.",
  },
  {
    icon: <CreditCardIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Tax, fees, and final price",
    desc: "Mio always shows the full breakdown — subtotal, delivery, tax, and service fees — before you confirm. No surprises at the end.",
  },
];

const STEPS = [
  { step: 1, title: "Cart review", desc: "See every item, quantity, and price. Edit before you confirm." },
  { step: 2, title: "Delivery or pickup", desc: "Choose how and where — your saved addresses are ready to select." },
  { step: 3, title: "Payment method", desc: "Select a saved card, Apple Pay, Google Pay, or PayPal." },
  { step: 4, title: "Final confirmation", desc: "Full price breakdown with tax and fees. Tap once to confirm — or ask Mio to adjust anything." },
  { step: 5, title: "Order placed", desc: "Receipt saved to your history. Track your order live within Mio." },
];

export default function Checkout() {
  const [method, setMethod] = useState("card");
  const [stage, setStage] = useState("review"); // review | confirm | done
  const subtotal = DEMO_ORDER.items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + DEMO_ORDER.delivery + DEMO_ORDER.tax;

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
            <LockIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Checkout & Payments
          </div>
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-navy mb-4 leading-tight">
            Pay with confidence.<br />
            <span className="gradient-text">Every time.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            One unified payment experience across every service Mio handles — with complete transparency, explicit confirmation, and no hidden fees.
          </p>
        </div>

        {/* Live demo */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24 items-start">
          <div className="bg-white border border-border shadow-sm rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center text-sm">🍔</div>
              <div>
                <div className="text-navy font-semibold text-sm">{DEMO_ORDER.merchant}</div>
                <div className="text-gray-500 text-xs">Food delivery · Est. 28 min</div>
              </div>
            </div>

            {stage === "done" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 text-green-400" aria-hidden="true" />
                </div>
                <h2 className="font-display font-700 text-navy text-xl mb-2">Order placed!</h2>
                <p className="text-gray-500 text-sm mb-6">Receipt saved to your payment history.</p>
                <div className="bg-white border border-border shadow-sm rounded-xl p-4 text-left space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order total</span>
                    <span className="text-navy font-semibold">£{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Paid via</span>
                    <span className="text-navy">{PAYMENT_METHODS.find(m => m.id === method)?.label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order ref</span>
                    <span className="text-gray-600 font-mono text-xs">MIO-20241014-8821</span>
                  </div>
                </div>
                <button
                  onClick={() => setStage("review")}
                  className="text-violet-400 text-sm underline underline-offset-2"
                >
                  Reset demo
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-2 mb-5">
                  {DEMO_ORDER.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-2 border-b border-white/5">
                      <div>
                        <span className="text-navy text-sm">{item.name}</span>
                        {item.qty > 1 && <span className="text-gray-400 text-xs ml-2">×{item.qty}</span>}
                      </div>
                      <span className="text-gray-600 text-sm">£{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-gray-500 text-xs">Delivery</span>
                    <span className="text-gray-500 text-xs">£{DEMO_ORDER.delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-gray-500 text-xs">Tax</span>
                    <span className="text-gray-500 text-xs">£{DEMO_ORDER.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-navy font-semibold">Total</span>
                    <span className="text-navy font-display font-800 text-xl">£{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment method */}
                <div className="mb-5">
                  <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-3">Payment method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          method === m.id
                            ? "gradient-bg text-navy border-transparent"
                            : "bg-white border border-border shadow-sm border-white/10 text-gray-600 hover:bg-white/10"
                        }`}
                      >
                        <span aria-hidden="true">{m.icon}</span>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm button */}
                {stage === "review" ? (
                  <button
                    onClick={() => setStage("confirm")}
                    className="w-full gradient-bg text-navy font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all glow-violet text-sm"
                  >
                    Review & Confirm Order
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-white border border-border shadow-sm rounded-xl p-4 border border-violet-500/30 text-sm text-center">
                      <p className="text-navy mb-1">Confirm payment of <span className="font-display font-800 text-violet-300">£{total.toFixed(2)}</span></p>
                      <p className="text-gray-500 text-xs">via {PAYMENT_METHODS.find(m => m.id === method)?.label} · {DEMO_ORDER.merchant}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStage("review")}
                        className="flex-1 bg-white border border-border shadow-sm border border-white/10 text-gray-600 font-semibold py-3 rounded-xl hover:bg-white/10 transition-all text-sm"
                      >
                        Go back
                      </button>
                      <button
                        onClick={() => setStage("done")}
                        className="flex-2 gradient-bg text-navy font-semibold py-3 rounded-xl hover:opacity-90 transition-all glow-violet text-sm flex-1"
                      >
                        Confirm & Pay
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
                  <LockIcon className="w-3 h-3" aria-hidden="true" />
                  End-to-end encrypted · Never stores card details
                </div>
              </>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h2 className="font-display font-700 text-navy text-2xl mb-6">How Mio handles checkout</h2>
            {STEPS.map((s) => (
              <div key={s.step} className="flex gap-4 bg-white border border-border shadow-sm rounded-xl p-4 border border-white/10">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-navy text-xs font-bold shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-navy font-semibold text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature grid */}
        <section className="mb-24">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-navy text-center mb-4">
            Built for trust
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Every part of Mio's payment stack is designed so you're never charged for something you didn't explicitly approve.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white border border-border shadow-sm rounded-2xl p-6 border border-white/10 hover:bg-white/8 transition-all group">
                <div className="text-violet-400 mb-4 group-hover:scale-110 transition-transform w-fit">
                  {f.icon}
                </div>
                <h3 className="font-display font-700 text-navy text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 gradient-bg text-navy font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet text-lg"
          >
            Try Mio free
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  );
}
