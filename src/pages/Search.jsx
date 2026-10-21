import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Search, Mic, ArrowUpRight, ShoppingBag, Utensils, Plane, CalendarDays, Ticket, Star } from "lucide-react";
import { searchProducts, inferCategory } from "../lib/mockProviders";
import { mioApi } from "../lib/mio-api.js";
import { useAuth } from "../lib/useAuth.jsx";
import useSpeechInput from "../components/useSpeechInput";
const categories = [["shopping","Shopping",ShoppingBag],["food","Food & dining",Utensils],["travel","Travel & hotels",Plane],["events","Events",Ticket],["services","Services",CalendarDays]];
const suggestions = { shopping: ["running shoes under $150","noise cancelling headphones","laptop bag"], food: ["pizza","sushi","burrito"], travel: ["hotels in Chicago","Airbnb"], events: ["concert tickets","NBA","jazz"], services: ["house cleaning","plumber","personal trainer"] };
export default function SearchPage({ voiceMode = false }) {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const initialQuery = params.get("q") || "";
  const initialCategory = categories.some(item => item[0] === params.get("cat")) ? params.get("cat") : inferCategory(initialQuery);
  const [query,setQuery] = useState(initialQuery);
  const [category,setCategory] = useState(initialCategory);
  const [results,setResults] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searched,setSearched] = useState(false);
  const [error,setError] = useState("");
  const [sort,setSort] = useState("relevance");
  const request = useRef(0);
  const voice = useSpeechInput(text => { setQuery(text); setCategory(inferCategory(text)); });
  const run = useCallback(async (text,cat) => {
    const sequence = ++request.current;
    setLoading(true); setSearched(true); setError("");
    try {
      const found = await searchProducts(text,cat);
      if (sequence !== request.current) return;
      setResults(found);
      if (user && text) mioApi.saveSearch({ query: text, category: cat, results_count: found.length }).catch(() => {});
    } catch { if (sequence === request.current) setError("Sample results could not load. Please try again."); }
    finally { if (sequence === request.current) setLoading(false); }
  }, [user?.id]);
  useEffect(() => { setQuery(initialQuery); setCategory(initialCategory); if(initialQuery) run(initialQuery,initialCategory); return () => { request.current++; }; }, [initialQuery,initialCategory,run]);
  const sorted = [...results].sort((a,b) => sort === "price" ? a.price - b.price : sort === "rating" ? b.rating - a.rating : 0);
  const Icon = categories.find(item => item[0] === category)?.[2] || ShoppingBag;
  return <main id="main" className="wrap platform-section sample-search">
    <span className="eyebrow">MIO / SAMPLE DISCOVERY</span><h1>{voiceMode ? "Say it your way." : "Find your next good thing."}</h1>
    <p className="platform-intro">Search the sample catalog across shopping, dining, travel, events, and services. Prices, reviews, and availability are examples.</p>
    <form className="sample-search-form" onSubmit={event => { event.preventDefault(); run(query,category); }}><label htmlFor="sample-search" className="sr-only">Search Mio</label><div><Search size={20} /><input id="sample-search" placeholder="Ask Mio anything…" value={query} onChange={event => setQuery(event.target.value)} maxLength={300} /><button type="button" onClick={voice.toggle} disabled={!voice.supported} aria-label={voice.listening ? "Stop voice input" : "Start voice input"} aria-pressed={voice.listening}><Mic size={20} /></button></div><button type="submit" className="button-primary">Search <ArrowUpRight size={16} /></button></form>
    <p role="status" className="platform-fine-print">{voice.notice || (voice.supported ? "Voice input starts only when you choose the microphone." : "Voice input is unavailable in this browser. Typed search works here.")}</p>
    <div className="category-filters" aria-label="Search category">{categories.map(([id,label,CatIcon]) => <button key={id} className={id === category ? "active" : ""} aria-pressed={id === category} onClick={() => { setCategory(id); if(searched) run(query,id); }}><CatIcon size={15} /> {label}</button>)}</div>
    <div className="search-suggestions">{suggestions[category].map(text => <button key={text} onClick={() => { setQuery(text); run(text,category); }}>{text} <ArrowUpRight size={12} /></button>)}</div>
    {error && <p role="alert" className="connection-note">{error}</p>}
    {loading ? <p role="status" className="connection-note">Finding sample options…</p> : searched ? <>
      <div className="sample-result-heading"><h2>{sorted.length} sample {sorted.length === 1 ? "result" : "results"}</h2><label>Sort <select value={sort} onChange={event => setSort(event.target.value)}><option value="relevance">Relevance</option><option value="price">Price: low to high</option><option value="rating">Rating</option></select></label></div>
      {sorted.length ? <div className="sample-result-grid">{sorted.map(item => <article key={item.id}><div className="sample-result-art"><Icon size={52} strokeWidth={1.2} /><small>SAMPLE RESULT</small></div><div><span className="eyebrow">{item.provider}</span><h3>{item.name}</h3><p>{item.city || item.venue || item.restaurant || item.availability || item.deliveryTime || "Illustrative option"}</p><p className="sample-rating"><Star size={13} /> {item.rating} · Sample rating</p><footer><b>${item.price.toFixed(2)}{category === "travel" && <small> / night</small>}</b><Link to="/checkout" className="text-link">Preview checkout <ArrowUpRight size={14} /></Link></footer></div></article>)}</div> : <div className="connection-note">No sample options matched. Try a broader request or a different category.</div>}
    </> : <div className="sample-search-empty"><Icon size={42} /><h2>A little ask goes a long way.</h2><p>Choose a suggestion, type a request, or try voice input in a supported browser.</p></div>}
  </main>;
}
