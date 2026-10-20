import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  Send,
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
  function ask(text) {
    if (!text.trim()) return;
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
    setMessages((m) => [...m, { q, s }]);
    setInput("");
    setTab("chat");
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
              setTab("chat");
            }}
          >
            + New conversation
          </button>
        </div>
        <p className="preview-note">
          PRODUCT PREVIEW
          <br />
          Sample results. No live AI, orders, bookings, or payments.
        </p>
      </aside>
      <section className="experience-main">
        <header>
          <span>YOUR SPACE</span>
          <span className="preview-tag">Interactive preview</span>
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
                        <p>
                          {m.s
                            ? m.s.reply
                            : "This preview can walk you through shopping, dining, travel, or planning. Try “Find headphones under $200” or choose a suggestion below."}
                        </p>
                        {m.s && card(m.s)}
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
              <button disabled={!input.trim()} aria-label="Send message">
                <Send size={19} />
              </button>
            </form>
            <p className="compose-note">
              A concept demo with sample suggestions. Your conversation stays in
              this session.
            </p>
          </>
        )}
        <p role="status">{notice}</p>
      </section>
    </main>
  );
}
