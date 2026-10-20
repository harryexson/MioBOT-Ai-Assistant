import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Bell, Check, Mic, RotateCcw, ShieldCheck, SlidersHorizontal, Trash2 } from "lucide-react";

const STORAGE_KEY = "mio-preview-settings";
const INTERESTS = [
  ["shopping", "Shopping"],
  ["food", "Food & dining"],
  ["travel", "Travel"],
  ["services", "Services & bookings"],
  ["events", "Events"],
  ["payments", "Payments"],
  ["nfc", "In-store & NFC"],
];
const DEFAULTS = {
  voice: false,
  reminders: true,
  remember: true,
  interests: ["shopping", "food", "travel", "services"],
};

function readSettings() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!value || typeof value !== "object") return DEFAULTS;
    return {
      voice: Boolean(value.voice),
      reminders: Boolean(value.reminders),
      remember: Boolean(value.remember),
      interests: Array.isArray(value.interests)
        ? value.interests.filter((id) => INTERESTS.some(([key]) => key === id))
        : DEFAULTS.interests,
    };
  } catch {
    return DEFAULTS;
  }
}

export default function Settings() {
  const [settings, setSettings] = useState(readSettings);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      setNotice("Your browser could not save these preview settings.");
    }
  }, [settings]);

  function toggle(key) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleInterest(id) {
    setSettings((current) => ({
      ...current,
      interests: current.interests.includes(id)
        ? current.interests.filter((item) => item !== id)
        : [...current.interests, id],
    }));
  }

  function resetPreview() {
    for (const key of [STORAGE_KEY, "mio-saved", "mio-integration-shortlist"]) {
      localStorage.removeItem(key);
    }
    setSettings(DEFAULTS);
    setNotice("Preview preferences and saved lists were cleared from this browser.");
  }

  return (
    <main id="main" className="settings-page">
      <div className="settings-wrap">
        <Link className="settings-back" to="/app"><ArrowLeft size={16} /> Back to your preview</Link>
        <header className="settings-heading">
          <span className="eyebrow"><SlidersHorizontal size={14} /> YOUR MIO</span>
          <h1>Make Mio feel like <span>you.</span></h1>
          <p>Choose the experiences you care about and shape how the preview behaves.</p>
        </header>

        <div className="settings-layout">
          <aside className="settings-rail" aria-label="Settings sections">
            <button type="button" className="active" onClick={() => document.getElementById("preferences")?.scrollIntoView({ behavior: "smooth" })}><SlidersHorizontal size={17} /> Preferences</button>
            <button type="button" onClick={() => document.getElementById("interests")?.scrollIntoView({ behavior: "smooth" })}><Mic size={17} /> Your interests</button>
            <button type="button" onClick={() => document.getElementById("privacy")?.scrollIntoView({ behavior: "smooth" })}><ShieldCheck size={17} /> Privacy & data</button>
          </aside>

          <div className="settings-content">
            <section id="preferences" className="settings-card">
              <div className="settings-card-title"><span className="settings-icon"><SlidersHorizontal size={18} /></span><div><h2>Everyday preferences</h2><p>Settings are saved in this browser for the preview.</p></div></div>
              <PreferenceRow icon={<Mic size={18} />} title="Voice conversations" description="Keep voice features ready when you explore Mio." checked={settings.voice} onChange={() => toggle("voice")} />
              <PreferenceRow icon={<Bell size={18} />} title="Helpful reminders" description="Show sample reminders for bookings and plans." checked={settings.reminders} onChange={() => toggle("reminders")} />
              <PreferenceRow icon={<SlidersHorizontal size={18} />} title="Remember my preferences" description="Use your selected interests to shape sample suggestions." checked={settings.remember} onChange={() => toggle("remember")} />
            </section>

            <section id="interests" className="settings-card">
              <div className="settings-card-title"><span className="settings-icon"><Mic size={18} /></span><div><h2>Your interests</h2><p>Choose the topics you would like to see in the Mio preview.</p></div></div>
              <div className="settings-interest-grid">
                {INTERESTS.map(([id, label]) => {
                  const selected = settings.interests.includes(id);
                  return <button key={id} type="button" aria-pressed={selected} className={selected ? "selected" : ""} onClick={() => toggleInterest(id)}><span>{label}</span>{selected && <Check size={16} />}</button>;
                })}
              </div>
            </section>

            <section id="privacy" className="settings-card">
              <div className="settings-card-title"><span className="settings-icon"><ShieldCheck size={18} /></span><div><h2>Privacy & preview data</h2><p>This demo does not create an account or send these preferences to a service.</p></div></div>
              <div className="settings-data-note"><ShieldCheck size={18} /><p>Preferences and saved sample lists stay in this browser. Conversations remain in memory for this visit. No real orders, bookings, payments, or provider connections are made.</p></div>
              <button type="button" className="settings-reset" onClick={resetPreview}><Trash2 size={16} /> Clear preview data</button>
            </section>
            <p className="settings-notice" role="status">{notice}</p>
            <div className="settings-footer"><RotateCcw size={15} /><span>You can change these choices at any time.</span><Link to="/providers">Explore integrations <ArrowLeft size={14} /></Link></div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PreferenceRow({ icon, title, description, checked, onChange }) {
  return (
    <div className="preference-row">
      <span className="preference-icon" aria-hidden="true">{icon}</span>
      <div className="preference-copy"><h3>{title}</h3><p>{description}</p></div>
      <button type="button" role="switch" aria-checked={checked} aria-label={title} className={`preference-switch ${checked ? "on" : ""}`} onClick={onChange}><span /></button>
    </div>
  );
}
