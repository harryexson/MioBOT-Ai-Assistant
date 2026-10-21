import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { X, ExternalLink } from "lucide-react";
import { mioApi } from "../lib/mio-api.js";
import { authBackendConfigured } from "../lib/auth-client.js";
import { useAuth } from "../lib/useAuth.jsx";
import { APPLICATIONS } from "../data/partners";
export default function IntegrationApplication({ partner, onClose }) {
  const { user } = useAuth();
  const dialog = useRef(null);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", business: "" });
  const details = APPLICATIONS.find(item => item.name.toLowerCase() === partner[0].toLowerCase());
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    element.showModal();
    return () => { element.close(); previous?.focus(); };
  }, []);
  async function submit(event) {
    event.preventDefault();
    setStatus("sending");
    try {
      await mioApi.submitPartnerSignup({ ...form, partner_name: partner[0], category: partner[1] });
      setStatus("saved");
    } catch { setStatus("error"); }
  }
  return <dialog ref={dialog} className="application-dialog" aria-labelledby="partner-application-title" onCancel={onClose}>
    <header><h2 id="partner-application-title">Explore {partner[0]}</h2><button type="button" onClick={onClose} aria-label="Close application"><X size={18} /></button></header>
    <p>{partner[7]}</p><p>Illustrative earning: {partner[4]} {partner[5]}. Provider access, eligibility, and rates require confirmation.</p>
    {details && <ul>{details.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
    {status === "saved" ? <p role="status" className="connection-note">Your interest was saved to Mio. This does not connect the provider or create an affiliate account.</p> : <form onSubmit={submit}>
      {!authBackendConfigured && <p className="connection-note">Applications cannot be submitted in this preview. You can review the requirements and visit the provider’s partner website.</p>}
      {[["name", "Your name", "text"], ["email", "Email address", "email"], ["business", "Business name", "text"]].map(([key,label,type]) => <label key={key}>{label}<input type={type} value={form[key]} required onChange={event => setForm({ ...form, [key]: event.target.value })} autoComplete={key === "business" ? "organization" : key} /></label>)}
      {status === "error" && <p role="alert">We couldn’t save your interest. Please try again later.</p>}
      <button type="submit" className="button-primary" disabled={!authBackendConfigured || status === "sending"}>{status === "sending" ? "Saving…" : "Save application interest"}</button>
    </form>}
    {details?.signupUrl ? <a href={details.signupUrl} target="_blank" rel="noreferrer" className="text-link" style={{ marginTop: 20 }}>Visit partner website <ExternalLink size={15} /></a> : <Link to="/developers" className="text-link">Review developer concepts</Link>}
  </dialog>;
}
