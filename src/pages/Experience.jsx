import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  Send,
  Mic,
  MicOff,
  ShoppingBag,
  Utensils,
  Plane,
  CalendarDays,
  Heart,
  ArrowLeft,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { Orb, Footer } from "./Home";
import useSpeechInput from "../components/useSpeechInput";
const scenarios = [
  {
    key: "shop",
    icon: ShoppingBag,
    prompt: "Find headphones under $200",
    title: "Everyday wireless headphones",
    detail: "Noise cancelling · 40-hour battery",
    price: "$149",
    reply:
      "Here’s a sample pick that leaves room in your budget. What matters most: sound, comfort, or battery life?",
  },
  {
    key: "food",
    icon: Utensils,
    prompt: "Find pizza for tonight",
    title: "Wood-fired margherita",
    detail: "Fresh basil · Mozzarella · 12 inch",
    price: "$18",
    reply:
      "A classic for a cozy night in. Here’s a sample menu pick. Any dietary preferences?",
  },
  {
    key: "travel",
    icon: Plane,
    prompt: "Plan a weekend away",
    title: "A quiet city escape",
    detail: "Boutique hotel · 2 guests",
    price: "$189 / night",
    reply:
      "A change of scenery sounds lovely. Here’s an example stay. Which city and dates are you considering?",
  },
  {
    key: "plan",
    icon: CalendarDays,
    prompt: "Help me plan my Saturday",
    title: "A little time for you",
    detail: "Coffee at 10 · A walk at 12 · Dinner at 7",
    price: "Your day",
    reply:
      "Let’s leave room for the good stuff. Here’s a simple sample plan you can make your own.",
  },
];
function readSaved() {
  try {
    const data = JSON.parse(localStorage.getItem("mio-saved") || "[]");
    return Array.isArray(data)
      ? data.filter((k) => scenarios.some((s) => s.key === k))
      : [];
  } catch {
    return [];
  }
}
export default function Experience() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(readSaved);
  const [tab, setTab] = useState("chat");
  const [notice, setNotice] = useState("");
  const [conversationId, setConversationId] = useState();
  const [loading, setLoading] = useState(false);
  const voice = useSpeechInput(setInput);
  async function ask(text) {
    if (!text.trim() || loading) return;
    const q = text.trim();
    const s = /pizza|food|dinner|eat/i.test(q)
      ? scenarios[1]
      : /travel|hotel|weekend|flight|away/i.test(q)
        ? scenarios[2]
        : /plan|saturday|appointment/i.test(q)
          ? scenarios[3]
          : /headphone|shop|buy|shoe/i.test(q)
            ? scenarios[0]
            : null;
    const index = messages.length;
    const history = messages.flatMap((message) => [
      { role: "user", content: message.q },
      ...(message.reply && !message.error ? [{ role: "assistant", content: message.reply }] : []),
    ]).slice(-19);
    history.push({ role: "user", content: q });
    setMessages((m) => [...m, { q, s }]);
    setInput("");
    setTab("chat");
    setLoading(true);
    try {
      const response = await fetch(new URL("api/ai/chat", document.baseURI), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, category: s?.key || "general", messages: history }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Mio could not complete that request.");
      setConversationId(result.conversationId);
      setMessages((current) => current.map((message, itemIndex) => itemIndex === index ? { ...message, reply: result.message } : message));
    } catch (error) {
      setMessages((current) => current.map((message, itemIndex) => itemIndex === index ? { ...message, reply: error.message || "Mio could not reach its backend.", error: true } : message));
    } finally {
      setLoading(false);
    }
  }
  function save(s) {
    const next = saved.includes(s.key)
      ? saved.filter((k) => k !== s.key)
      : [...saved, s.key];
    setSaved(next);
    try {
      localStorage.setItem("mio-saved", JSON.stringify(next));
    } catch {
      setNotice("Saved for this visit. Browser storage is unavailable.");
    }
  }
  function card(s) {
    return (
      <div className="experience-pick" key={s.key}>
        <div className="pick-symbol">
          <s.icon size={32} />
        </div>
        <div>
          <small>SAMPLE PICK</small>
          <h3>{s.title}</h3>
          <p>{s.detail}</p>
          <b>{s.price}</b>
        </div>
        <button
          aria-label={
            saved.includes(s.key) ? "Unsave " + s.title : "Save " + s.title
          }
          onClick={() => save(s)}
        >
          <Heart
            size={19}
            fill={saved.includes(s.key) ? "currentColor" : "none"}
          />
        </button>
      </div>
    );
  }
  return (
    <main id="main" className="experience">
      <aside>
        <Link to="/" className="text-link">
          <ArrowLeft size={15} /> Back to Mio
        </Link>
        <div className="experience-sidebar">
          <span className="eyebrow">YOUR EVERYDAY COMPANION</span>
          <h1>
            A little help
            <br />
            starts here.
          </h1>
          <button
            className={tab === "chat" ? "selected" : ""}
            onClick={() => setTab("chat")}
          >
            ✳ Conversation
          </button>
          <button
            className={tab === "saved" ? "selected" : ""}
            onClick={() => setTab("saved")}
          >
            <Heart size={16} /> Saved picks <span>{saved.length}</span>
          </button>
          <Link className="settings-sidebar-link" to="/settings">
            <SlidersHorizontal size={16} /> Preferences & privacy
          </Link>
          <button
            onClick={() => {
              setMessages([]);
              setConversationId(undefined);
              setTab("chat");
            }}
          >
            + New conversation
          </button>
        </div>
        <p className="preview-note">
          MIO AI · EARLY ACCESS
          <br />
          Chat requires an account and a configured AI provider. Saved inspiration is sample content.
        </p>
      </aside>
      <section className="experience-main">
        <header>
          <span>YOUR SPACE</span>
          <span className="preview-tag">AI conversation</span>
        </header>
        {tab === "saved" ? (
          <div className="saved-picks">
            <h2>Your little collection.</h2>
            <p>Good finds, kept together.</p>
            {saved.length ? (
              scenarios.filter((s) => saved.includes(s.key)).map(card)
            ) : (
              <div className="empty-state">
                <Heart size={35} />
                <h3>Something good will go here.</h3>
                <p>Tap the heart on a sample pick to save it.</p>
                <button
                  className="button-primary"
                  onClick={() => setTab("chat")}
                >
                  Explore with Mio
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="conversation" aria-live="polite">
              {!messages.length ? (
                <div className="experience-welcome">
                  <Orb />
                  <span className="eyebrow">HELLO, YOU.</span>
                  <h2>What’s on your mind?</h2>
                  <p>
                    A craving, a getaway, a little everyday task.
                    <br />
                    Let’s start with what you need.
                  </p>
                  <div className="prompt-grid">
                    {scenarios.map((s) => (
                      <button key={s.key} onClick={() => ask(s.prompt)}>
                        <s.icon size={20} />
                        {s.prompt}
                        <ArrowUpRight size={15} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <article className="message-pair" key={i}>
                    <div className="user-message">{m.q}</div>
                    <div className="assistant-message">
                      <Orb small />
                      <div>
                        <p>{m.reply || (loading && i === messages.length - 1 ? "Mio is thinking…" : "")}</p>
                        {m.error && /sign in/i.test(m.reply || "") && <Link to="/signin" className="text-link">Sign in to continue</Link>}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
            <form
              className="chat-compose"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <label className="sr-only" htmlFor="chat-input">
                Your message to Mio
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Mio anything…"
                maxLength={500}
              />
              <button
                type="button"
                className={`voice-compose-button${voice.listening ? " is-listening" : ""}`}
                onClick={voice.toggle}
                disabled={!voice.supported || loading}
                aria-label={voice.listening ? "Stop voice input" : "Start voice input"}
                aria-pressed={voice.listening}
                title={voice.supported ? (voice.listening ? "Stop listening" : "Ask by voice") : "Voice input is unavailable in this browser"}
              >
                {voice.listening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button disabled={!input.trim() || loading} aria-label="Send message">
                <Send size={19} />
              </button>
            </form>
            <p className="compose-note" role="status" aria-live="polite">
              {voice.notice || (voice.supported
                ? "Type or tap the microphone to say your request. Review the transcript before sending."
                : "Voice input is unavailable in this browser. You can still type your request.")}
            </p>
          </>
        )}
        <p role="status">{notice}</p>
      </section>
    </main>
  );
}
