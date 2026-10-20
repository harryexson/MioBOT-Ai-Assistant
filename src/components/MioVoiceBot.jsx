import { useState } from "react";
import { useNavigate } from "react-router";
import { Mic, ArrowUpRight } from "lucide-react";
import useSpeechInput from "./useSpeechInput";
export default function MioVoiceBot() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { supported, listening, notice, toggle } = useSpeechInput(setQuery);
  return <div className="voice-discovery">
    <div><span className="eyebrow">A NATURAL PLACE TO START</span><h3>Your voice.<br />Your words. Your Mio.</h3><p>Try browser voice input or type a request to explore the sample catalog.</p></div>
    <form onSubmit={event => { event.preventDefault(); if(query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`); }}>
      <label htmlFor="home-discovery">What’s on your mind?</label>
      <div className="voice-discovery-input"><input id="home-discovery" placeholder="Find headphones under $200" value={query} onChange={event => setQuery(event.target.value)} maxLength={300} required /><button type="button" disabled={!supported} onClick={toggle} aria-label={listening ? "Stop voice input" : "Start voice input"} aria-pressed={listening}><Mic size={20} /></button></div>
      <p role="status">{notice || (supported ? "Voice input starts only when you choose the microphone." : "Typed search is available. Voice needs a supported browser.")}</p>
      <button className="button-primary" type="submit" disabled={!query.trim()}>Explore sample results <ArrowUpRight size={16} /></button>
    </form>
  </div>;
}
