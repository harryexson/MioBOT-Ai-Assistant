import { useState } from "react";
import { Link } from "react-router";
import CheckIcon from "icon:check-circle";
import ArrowRightIcon from "icon:arrow-right";
import ArrowLeftIcon from "icon:arrow-left";
import MicIcon from "icon:mic";

const STEPS = [
  { id: "welcome", title: "Welcome to Mio" },
  { id: "interests", title: "What do you need?" },
  { id: "voice", title: "Enable Voice" },
  { id: "payment", title: "Add Payment" },
  { id: "done", title: "You're all set!" },
];

const INTERESTS = [
  { icon: "🛍️", label: "Shopping" },
  { icon: "🍔", label: "Food & Restaurants" },
  { icon: "✈️", label: "Travel & Hotels" },
  { icon: "📅", label: "Services & Bookings" },
  { icon: "💳", label: "Pay Bills & Invoices" },
  { icon: "🎟️", label: "Events & Tickets" },
  { icon: "📡", label: "NFC & In-Store" },
  { icon: "⚡", label: "Other" },
];

const PAYMENTS = [
  { icon: "💳", label: "Credit or Debit Card" },
  { icon: "🍎", label: "Apple Pay" },
  { icon: "🔵", label: "Google Pay" },
  { icon: "🔗", label: "Link (Stripe)" },
  { icon: "🅿️", label: "PayPal" },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [paymentChosen, setPaymentChosen] = useState(null);

  const toggleInterest = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-700/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label="Onboarding progress">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                i <= step ? "gradient-bg" : "bg-white/15"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-white font-display font-800 text-3xl">M</span>
              </div>
              <h1 className="font-display font-700 text-3xl text-white mb-3">Welcome to Mio</h1>
              <p className="text-white/60 mb-8 leading-relaxed">
                Your voice-first AI assistant for shopping, dining, travel, bookings, and payments. All in one place.
              </p>
              <button
                onClick={next}
                className="w-full gradient-bg text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-base"
              >
                Get Started
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <p className="text-white/65 text-sm mt-4">Already have an account? <Link to="/" className="text-violet-soft hover:text-white transition-colors">Sign in</Link></p>
            </div>
          )}

          {/* Step 1: Interests */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-700 text-2xl text-white mb-1">What would you like to use Mio for?</h2>
              <p className="text-white/50 text-sm mb-6">Choose one or add more later</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {INTERESTS.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => toggleInterest(label)}
                    className={`glass-light rounded-xl px-3 py-3 flex items-center gap-2.5 text-left transition-all border ${
                      selected.includes(label)
                        ? "border-violet-500/60 bg-violet-600/20"
                        : "border-transparent hover:border-white/20"
                    }`}
                    aria-pressed={selected.includes(label)}
                  >
                    <span className="text-base" aria-hidden="true">{icon}</span>
                    <span className="text-white text-sm font-medium">{label}</span>
                    {selected.includes(label) && (
                      <CheckIcon className="w-4 h-4 text-violet-soft ml-auto shrink-0" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="glass-light text-white/70 px-4 py-3 rounded-xl hover:text-white transition-colors flex items-center gap-2">
                  <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                </button>
                <button onClick={next} className="flex-1 gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Continue
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Voice */}
          {step === 2 && (
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl transition-all ${voiceEnabled ? "gradient-bg" : "glass-light"}`}>
                <MicIcon className={`w-9 h-9 ${voiceEnabled ? "text-white" : "text-white/50"}`} aria-hidden="true" />
              </div>
              <h2 className="font-display font-700 text-2xl text-white mb-3">Enable Voice</h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                Speak naturally to Mio — ask questions, place orders, and get updates hands-free.
              </p>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`w-full py-4 rounded-xl font-semibold transition-all mb-4 flex items-center justify-center gap-2 ${
                  voiceEnabled
                    ? "gradient-bg text-white"
                    : "glass-light text-white/80 hover:text-white"
                }`}
                aria-pressed={voiceEnabled}
              >
                <MicIcon className="w-5 h-5" aria-hidden="true" />
                {voiceEnabled ? "Voice Enabled ✓" : "Enable Voice Access"}
              </button>
              <div className="flex gap-3">
                <button onClick={back} className="glass-light text-white/70 px-4 py-3 rounded-xl hover:text-white transition-colors">
                  <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                </button>
                <button onClick={next} className="flex-1 glass-light text-white/70 py-3 rounded-xl hover:text-white transition-colors text-sm">
                  Skip for now
                </button>
                {voiceEnabled && (
                  <button onClick={next} className="flex-1 gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
                    Next <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="font-display font-700 text-2xl text-white mb-1">Add a payment method</h2>
              <p className="text-white/50 text-sm mb-5">Your payment information is safe and securely encrypted.</p>
              <div className="space-y-2 mb-5">
                {PAYMENTS.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setPaymentChosen(label)}
                    className={`w-full glass-light rounded-xl px-4 py-3 flex items-center gap-3 text-left transition-all border ${
                      paymentChosen === label
                        ? "border-violet-500/60 bg-violet-600/20"
                        : "border-transparent hover:border-white/20"
                    }`}
                    aria-pressed={paymentChosen === label}
                  >
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    <span className="text-white text-sm font-medium">{label}</span>
                    {paymentChosen === label && (
                      <CheckIcon className="w-4 h-4 text-violet-soft ml-auto" aria-hidden="true" />
                    )}
                  </button>
                ))}
                <button className="w-full glass-light rounded-xl px-4 py-3 flex items-center gap-3 border border-transparent hover:border-white/20 transition-all">
                  <span className="text-xl text-violet-soft" aria-hidden="true">+</span>
                  <span className="text-white/60 text-sm">Add Later</span>
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="glass-light text-white/70 px-4 py-3 rounded-xl hover:text-white transition-colors">
                  <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                </button>
                <button onClick={next} className="flex-1 gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
                  Continue
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <CheckIcon className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h2 className="font-display font-700 text-3xl text-white mb-3">You're all set!</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Mio is ready to help. Just speak or type — your personal AI assistant is always here.
              </p>
              <Link
                to="/"
                className="w-full gradient-bg text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-base"
              >
                Start Using Mio
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
