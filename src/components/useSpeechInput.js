import { useEffect, useRef, useState } from "react";
export default function useSpeechInput(onTranscript) {
  const callback = useRef(onTranscript);
  callback.current = onTranscript;
  const recognition = useRef(null);
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    setSupported(true);
    const engine = new SpeechRecognition();
    engine.lang = "en-US";
    engine.interimResults = false;
    engine.onresult = event => { callback.current(event.results[0][0].transcript); setNotice("Transcript ready. Review it, then send your request."); };
    engine.onstart = () => setListening(true);
    engine.onend = () => setListening(false);
    engine.onerror = () => { setListening(false); setNotice("Voice input could not start. You can type instead."); };
    recognition.current = engine;
    return () => { engine.onresult = null; engine.onstart = null; engine.onend = null; engine.onerror = null; engine.abort(); recognition.current = null; };
  }, []);
  function toggle() {
    if (!recognition.current) return;
    if (listening) recognition.current.stop();
    else {
      setNotice("Listening. Your browser’s speech service handles audio recognition.");
      try { recognition.current.start(); } catch { setNotice("Voice input is already active. You can type instead."); }
    }
  }
  return { supported, listening, notice, toggle };
}
