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
  { icon: "💳", label: "Credit or Debit Card", sub: "Secured with Stripe" },
  { icon: "🍎", label: "Apple Pay", sub: "" },
  { icon: "🔵", label: "Google Pay", sub: "" },
  { icon: "🔗", label: "Link (Stripe)", sub: "" },
  { icon: "🅿️", label: "PayPal", sub: "" },
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
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 16px 48px", background: "#f8f7ff" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }} role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label="Onboarding progress">
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#e5e7eb", transition: "background 0.3s" }} />
          ))}
        </div>

        {/* Card */}
        <div style={{ background: "#ffffff", borderRadius: 28, padding: 36, boxShadow: "0 8px 40px rgba(124,58,237,0.1)", border: "1px solid #ede9fe" }}>

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
                <span style={{ color: "#fff", fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28 }}>M</span>
              </div>
              <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 28, color: "#0f1035", marginBottom: 10 }}>Welcome to Mio</h1>
              <p style={{ color: "#6b7280", marginBottom: 28, lineHeight: 1.6, fontSize: 15 }}>
                Your voice-first AI assistant for shopping, dining, travel, bookings, and payments. All in one place.
              </p>
              <button onClick={next} className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 0" }}>
                Get Started <ArrowRightIcon size={18} aria-hidden="true" />
              </button>
              <p style={{ color: "#71767f", fontSize: 13, marginTop: 14 }}>
                Already have an account?{" "}
                <Link to="/" style={{ color: "#7c3aed", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
              </p>
            </div>
          )}

          {/* Step 1: Interests */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f1035", marginBottom: 4 }}>What would you like to use Mio for?</h2>
              <p style={{ color: "#71767f", fontSize: 13, marginBottom: 20 }}>Choose one or add more later</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {INTERESTS.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => toggleInterest(label)}
                    style={{
                      background: selected.includes(label) ? "#f5f3ff" : "#f9fafb",
                      border: selected.includes(label) ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb",
                      borderRadius: 14,
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    aria-pressed={selected.includes(label)}
                  >
                    <span style={{ fontSize: 18 }} aria-hidden="true">{icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: selected.includes(label) ? "#7c3aed" : "#374151" }}>{label}</span>
                    {selected.includes(label) && <CheckIcon size={13} style={{ color: "#7c3aed", marginLeft: "auto" }} aria-hidden="true" />}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={back} style={{ background: "#f3f4f6", border: "none", borderRadius: 12, padding: "12px 16px", cursor: "pointer", color: "#374151" }}>
                  <ArrowLeftIcon size={16} aria-hidden="true" />
                </button>
                <button onClick={next} className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "12px 0" }}>
                  Continue <ArrowRightIcon size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Voice */}
          {step === 2 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", background: voiceEnabled ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#f3f4f6", transition: "all 0.3s", boxShadow: voiceEnabled ? "0 8px 24px rgba(124,58,237,0.3)" : "none" }}>
                <MicIcon size={34} style={{ color: voiceEnabled ? "#ffffff" : "#9ca3af" }} aria-hidden="true" />
              </div>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f1035", marginBottom: 10 }}>Enable Voice</h2>
              <p style={{ color: "#6b7280", marginBottom: 24, lineHeight: 1.6, fontSize: 14 }}>
                Speak naturally to Mio — ask questions, place orders, and get updates hands-free.
              </p>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: voiceEnabled ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#f3f4f6", color: voiceEnabled ? "#fff" : "#374151", transition: "all 0.3s" }}
                aria-pressed={voiceEnabled}
              >
                <MicIcon size={18} aria-hidden="true" />
                {voiceEnabled ? "Voice Enabled ✓" : "Enable Voice Access"}
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={back} style={{ background: "#f3f4f6", border: "none", borderRadius: 12, padding: "12px 16px", cursor: "pointer", color: "#374151" }}>
                  <ArrowLeftIcon size={16} aria-hidden="true" />
                </button>
                <button onClick={next} style={{ flex: 1, background: "transparent", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "12px 0", cursor: "pointer", color: "#71767f", fontSize: 13, fontWeight: 500 }}>
                  Skip for now
                </button>
                {voiceEnabled && (
                  <button onClick={next} className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "12px 0" }}>
                    Next <ArrowRightIcon size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f1035", marginBottom: 4 }}>Add a payment method</h2>
              <p style={{ color: "#71767f", fontSize: 13, marginBottom: 18 }}>Your payment information is safe and securely encrypted.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {PAYMENTS.map(({ icon, label, sub }) => (
                  <button
                    key={label}
                    onClick={() => setPaymentChosen(label)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: paymentChosen === label ? "#f5f3ff" : "#f9fafb", border: paymentChosen === label ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb", borderRadius: 12, cursor: "pointer", transition: "all 0.15s" }}
                    aria-pressed={paymentChosen === label}
                  >
                    <span style={{ fontSize: 22, width: 32, textAlign: "center" }} aria-hidden="true">{icon}</span>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f1035" }}>{label}</p>
                      {sub && <p style={{ margin: 0, fontSize: 11, color: "#71767f" }}>{sub}</p>}
                    </div>
                    {paymentChosen === label && <CheckIcon size={14} style={{ color: "#7c3aed", marginLeft: "auto" }} aria-hidden="true" />}
                  </button>
                ))}
                <button style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "transparent", border: "1.5px dashed #e5e7eb", borderRadius: 12, cursor: "pointer" }}>
                  <span style={{ fontSize: 20, color: "#7c3aed", width: 32, textAlign: "center" }}>+</span>
                  <span style={{ fontSize: 13, color: "#71767f" }}>Add Later</span>
                </button>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={back} style={{ background: "#f3f4f6", border: "none", borderRadius: 12, padding: "12px 16px", cursor: "pointer", color: "#374151" }}>
                  <ArrowLeftIcon size={16} aria-hidden="true" />
                </button>
                <button onClick={next} className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "12px 0" }}>
                  Continue <ArrowRightIcon size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === 4 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
                <CheckIcon size={40} style={{ color: "#ffffff" }} aria-hidden="true" />
              </div>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 28, color: "#0f1035", marginBottom: 10 }}>You're all set!</h2>
              <p style={{ color: "#6b7280", marginBottom: 28, lineHeight: 1.6, fontSize: 15 }}>
                Mio is ready to help. Just speak or type — your personal AI assistant is always here.
              </p>
              <Link to="/" className="btn-primary" style={{ display: "flex", justifyContent: "center", padding: "14px 0", fontSize: 15, textDecoration: "none" }}>
                Start Using Mio <ArrowRightIcon size={18} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
