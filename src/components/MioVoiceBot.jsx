/**
 * MioVoiceBot — Real voice input via Web Speech API
 * Listens for voice commands, parses intent, saves session, returns results.
 */
import { useState, useRef, useCallback, useEffect } from "react";
import MicIcon from "icon:mic";
import MicOffIcon from "icon:mic-off";
import { pb } from "../lib/pb.js";

// ── Intent parser ──────────────────────────────────────────────────────
function parseIntent(text) {
  const t = text.toLowerCase();
  const categories = {
    food: /food|eat|restaurant|order|pizza|burger|delivery|dinner|lunch|breakfast|sushi|coffee|grocery|groceries/,
    travel: /hotel|fly|flight|trip|travel|book a room|airbnb|stay|chicago|london|paris|new york/,
    shopping: /buy|shop|order|find|search|price|shoe|shoe|sneaker|headphone|laptop|phone|under \$|cost/,
    events: /ticket|concert|show|event|game|match|festival|movie|film/,
    services: /plumber|cleaner|electrician|handyman|book|appointment|fix|repair|service/,
    payments: /pay|bill|invoice|transfer|send money|payment/,
  };
  for (const [cat, rx] of Object.entries(categories)) {
    if (rx.test(t)) return cat;
  }
  return "shopping";
}

// ── Response generator ─────────────────────────────────────────────────
function generateResponse(text, category) {
  const t = text.toLowerCase();
  const responses = {
    food: [
      `Great choice! I found top-rated restaurants near you. DoorDash has 3 options ready — the best pick is rated 4.8 stars with 25-min delivery.`,
      `Found 6 food options matching "${text.slice(0, 30)}". The most popular has 2,400 reviews and delivers in under 30 minutes.`,
    ],
    travel: [
      `I found 5 hotels matching your request. The top pick is rated 4.7 stars — available tonight from $189/night with free cancellation.`,
      `Searching flights and hotels… Found 3 great bundles. The best value saves you $120 versus booking separately.`,
    ],
    shopping: [
      `Found 5 great options! The top pick matches your budget — 4.7 stars with 2-day delivery. Want me to add it to your cart?`,
      `Here are the best deals for "${text.slice(0, 30)}". I found one that's 20% off today only — highly rated with 3,200 reviews.`,
    ],
    events: [
      `Found tickets available! Best seats start from $45. Fully mobile delivery, no service fee for you as a Mio user.`,
      `3 events match your search. The top one has seats in section A with a great view — want me to reserve 2 tickets?`,
    ],
    services: [
      `I matched you with 4 top-rated pros near you. The best available can come tomorrow morning — rated 4.9 with 340 reviews.`,
      `Found a trusted professional for you. Background-checked, insured, and available this week. Shall I request a quote?`,
    ],
    payments: [
      `Your payment can be processed securely. I'll use your saved card ending in 4242 — want me to complete the transaction?`,
      `I can handle that payment for you. Shall I use Apple Pay or your saved card?`,
    ],
  };
  const pool = responses[category] || responses.shopping;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Main component ─────────────────────────────────────────────────────
export default function MioVoiceBot({ onResult, compact = false }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("idle"); // idle | listening | processing | done | error
  const [supported, setSupported] = useState(true);
  const recogRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
    }
    return () => {
      if (recogRef.current) recogRef.current.abort();
    };
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recogRef.current = recognition;
    setListening(true);
    setStatus("listening");
    setTranscript("");
    setResponse("");

    recognition.onresult = (e) => {
      const interim = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setTranscript(interim);
    };

    recognition.onend = async () => {
      setListening(false);
      const finalText = recogRef.current?._finalTranscript || transcript;
      if (!finalText && !transcript) {
        setStatus("idle");
        return;
      }
      const usedText = finalText || transcript;
      setStatus("processing");
      const category = parseIntent(usedText);
      const resp = generateResponse(usedText, category);

      // Save to backend
      try {
        await pb.collection("voice_sessions").create({
          transcript: usedText,
          category,
          response: resp,
          user_id: pb.authStore.record?.id || "anonymous",
        });
      } catch (_) {
        // Silently continue — voice still works without auth
      }

      setResponse(resp);
      setStatus("done");
      if (onResult) onResult({ transcript: usedText, category, response: resp });
    };

    recognition.onerror = (e) => {
      if (e.error === "no-speech" || e.error === "aborted") {
        setStatus("idle");
      } else {
        setStatus("error");
      }
      setListening(false);
    };

    // Keep ref of final transcript across async boundary
    recognition.onspeechend = () => {
      recogRef.current._finalTranscript = transcript;
    };

    recognition.start();
  }, [transcript, onResult]);

  const stopListening = useCallback(() => {
    if (recogRef.current) recogRef.current.stop();
    setListening(false);
  }, []);

  const reset = () => {
    setTranscript("");
    setResponse("");
    setStatus("idle");
  };

  // ── Compact mic button only ──
  if (compact) {
    return (
      <button
        onClick={listening ? stopListening : startListening}
        disabled={!supported}
        aria-label={listening ? "Stop listening" : "Start voice input"}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "none",
          background: listening
            ? "linear-gradient(135deg,#ef4444,#dc2626)"
            : "linear-gradient(135deg,#7c3aed,#4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: supported ? "pointer" : "not-allowed",
          boxShadow: listening ? "0 0 0 8px rgba(239,68,68,0.2)" : "none",
          transition: "all 0.3s",
          flexShrink: 0,
        }}
      >
        {listening ? (
          <MicOffIcon size={18} color="#fff" />
        ) : (
          <MicIcon size={18} color="#fff" />
        )}
      </button>
    );
  }

  // ── Full panel ──
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        border: "1.5px solid #ede9fe",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(124,58,237,0.10)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Syne,sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#fff",
            }}
          >
            M
          </span>
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontFamily: "Syne,sans-serif",
              fontWeight: 800,
              fontSize: 16,
              color: "#fff",
            }}
          >
            Mio AI Assistant
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
            {status === "listening"
              ? "Listening… speak now"
              : status === "processing"
              ? "Processing your request…"
              : status === "done"
              ? "Here's what I found"
              : supported
              ? "Tap the mic and ask me anything"
              : "Voice not supported in this browser"}
          </p>
        </div>
        {status === "done" && (
          <button
            onClick={reset}
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 12px",
              cursor: "pointer",
            }}
          >
            New request
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px" }}>
        {/* Mic button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <button
            onClick={listening ? stopListening : startListening}
            disabled={!supported || status === "processing"}
            aria-label={listening ? "Stop listening" : "Ask Mio with your voice"}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "none",
              background: listening
                ? "linear-gradient(135deg,#ef4444,#dc2626)"
                : "linear-gradient(135deg,#7c3aed,#4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: supported ? "pointer" : "not-allowed",
              boxShadow: listening
                ? "0 0 0 16px rgba(239,68,68,0.15), 0 0 0 32px rgba(239,68,68,0.07)"
                : "0 8px 32px rgba(124,58,237,0.35)",
              transition: "all 0.3s",
              animation: listening ? "pulse-glow 1.5s infinite" : "none",
            }}
          >
            {listening ? (
              <MicOffIcon size={32} color="#fff" />
            ) : (
              <MicIcon size={32} color="#fff" />
            )}
          </button>
        </div>

        {/* Wave animation while listening */}
        {status === "listening" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 4,
              height: 32,
              marginBottom: 16,
            }}
          >
            {[0.5, 0.9, 0.7, 1, 0.6, 0.85, 0.5, 0.95, 0.7].map((h, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  width: 4,
                  height: `${h * 100}%`,
                  borderRadius: 3,
                  background: "linear-gradient(180deg,#a78bfa,#7c3aed)",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div
            style={{
              background: "#f5f3ff",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 12,
            }}
          >
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, color: "#7c3aed" }}>
              You said:
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#0f1035", fontWeight: 500 }}>
              "{transcript}"
            </p>
          </div>
        )}

        {/* Response */}
        {response && (
          <div
            style={{
              background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
              borderRadius: 12,
              padding: "12px 16px",
              border: "1px solid #bbf7d0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 10, color: "#fff" }}>M</span>
              </div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#15803d" }}>
                Mio found results
              </p>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#0f1035", lineHeight: 1.5 }}>
              {response}
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <p style={{ textAlign: "center", fontSize: 13, color: "#ef4444", margin: 0 }}>
            Microphone access was denied. Please allow microphone access in your browser settings and try again.
          </p>
        )}

        {/* Suggestions */}
        {status === "idle" && supported && (
          <div>
            <p style={{ fontSize: 11, color: "#71767f", textAlign: "center", margin: "0 0 10px" }}>
              Try saying:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "Find me running shoes under $150",
                "Order pizza near me",
                "Book a hotel in Chicago for tonight",
                "Find concert tickets for this weekend",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setTranscript(s);
                    const category = parseIntent(s);
                    const resp = generateResponse(s, category);
                    setResponse(resp);
                    setStatus("done");
                    if (onResult) onResult({ transcript: s, category, response: resp });
                  }}
                  style={{
                    background: "#f8f7ff",
                    border: "1px solid #ede9fe",
                    borderRadius: 10,
                    padding: "8px 14px",
                    textAlign: "left",
                    fontSize: 13,
                    color: "#4c1d95",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  "{s}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
