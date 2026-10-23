import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { useMioStore } from "../store/useStore";
import { sendMessage } from "../services/chat";

type VoiceState = "idle" | "listening" | "processing" | "speaking";

export default function VoiceChatScreen({ navigation }: any) {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const latestTranscript = useRef("");
  const processedTranscript = useRef("");
  const conversation = useMioStore((s) => s.conversation);
  const startConversation = useMioStore((s) => s.startConversation);

  useEffect(() => {
    startConversation("general");
  }, []);

  useSpeechRecognitionEvent("start", () => setState("listening"));
  useSpeechRecognitionEvent("result", (event) => {
    const recognized = event.results[0]?.transcript?.trim();
    if (!recognized) return;
    latestTranscript.current = recognized;
    setTranscript(recognized);
  });
  useSpeechRecognitionEvent("end", () => {
    const recognized = latestTranscript.current.trim();
    if (recognized && recognized !== processedTranscript.current) {
      processedTranscript.current = recognized;
      setState("processing");
      void processVoiceInput(recognized);
    } else {
      setState("idle");
    }
  });
  useSpeechRecognitionEvent("error", (event) => {
    setResponse(event.error === "not-allowed"
      ? "Microphone or speech recognition permission was denied. Allow access in your device settings and try again."
      : event.error === "no-speech" || event.error === "speech-timeout"
        ? "I didn't catch that. Tap the microphone and try again."
        : "Voice input is unavailable right now. Please try again or continue in text chat.");
    setState("idle");
  });

  useEffect(() => () => {
    ExpoSpeechRecognitionModule.abort();
    Speech.stop();
  }, []);

  // Pulse animation when listening
  useEffect(() => {
    if (state === "listening") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.4, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [state]);

  async function handleMicPress() {
    if (state === "speaking") {
      Speech.stop();
      setState("idle");
      return;
    }
    if (state === "listening") {
      setState("processing");
      ExpoSpeechRecognitionModule.stop();
      return;
    }
    if (state === "processing") return;
    setTranscript("");
    setResponse("");
    latestTranscript.current = "";
    processedTranscript.current = "";
    try {
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setResponse("Mio needs microphone and speech recognition access to hear your request. You can enable it in device settings.");
        setState("idle");
        return;
      }
      setState("listening");
      ExpoSpeechRecognitionModule.start({ lang: "en-US", interimResults: true, continuous: false, maxAlternatives: 1 });
    } catch {
      setResponse("Voice input could not start on this device. Please continue in text chat.");
      setState("idle");
    }
  }

  async function processVoiceInput(text: string) {
    try {
      const res = await sendMessage({
        conversationId: conversation?.id,
        messages: [{ role: "user", content: text }],
        category: "general",
      });
      setResponse(res.message);
      setState("speaking");
      Speech.speak(res.message, {
        language: "en",
        rate: 0.9,
        onDone: () => setState("idle"),
        onError: () => setState("idle"),
      });
    } catch {
      setResponse("I'm having trouble connecting right now. Please try again.");
      setState("idle");
    }
  }

  const orbColor: [string, string] = state === "listening"
    ? ["#7c3aed", "#4f46e5"]
    : state === "processing"
    ? ["#f59e0b", "#d97706"]
    : state === "speaking"
    ? ["#22c55e", "#16a34a"]
    : ["#6b7280", "#4b5563"];

  const stateLabel = {
    idle: "Tap to speak",
    listening: "Listening...",
    processing: "Thinking...",
    speaking: "Speaking — tap to stop",
  }[state];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { Speech.stop(); navigation.goBack(); }} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Voice Mode</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Chat", {})} style={styles.textBtn}>
          <Text style={styles.textBtnText}>Text</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Animated orb */}
        <View style={styles.orbWrap}>
          {state === "listening" && (
            <Animated.View style={[styles.orbRing, { transform: [{ scale: pulseAnim }] }]} />
          )}
        <TouchableOpacity onPress={handleMicPress} activeOpacity={0.85} disabled={state === "processing"} accessibilityRole="button" accessibilityLabel={state === "listening" ? "Stop voice input" : state === "speaking" ? "Stop spoken response" : "Start voice input"}>
            <LinearGradient colors={orbColor} style={styles.orb}>
              {state === "listening" && (
                <View style={styles.waveRow}>
                  {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
                    <View key={i} style={[styles.wavebar, { height: `${h * 60}%` as any }]} />
                  ))}
                </View>
              )}
              {state !== "listening" && (
                <Text style={styles.orbIcon}>
                  {state === "idle" ? "🎤" : state === "processing" ? "⟳" : "🔊"}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.stateLabel}>{stateLabel}</Text>

        {/* Transcript */}
        {transcript ? (
          <View style={styles.transcriptCard}>
            <Text style={styles.transcriptLabel}>You said</Text>
            <Text style={styles.transcriptText}>"{transcript}"</Text>
          </View>
        ) : (
          <View style={styles.promptWrap}>
            <Text style={styles.promptText}>{state === "listening" ? "Speak naturally. Mio is listening." : "Tap the microphone and say what you need."}</Text>
          </View>
        )}

        {/* Response */}
        {response ? (
          <View style={styles.responseCard}>
            <View style={styles.responseHeader}>
              <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.mioAvatar}>
                <Text style={styles.mioAvatarText}>M</Text>
              </LinearGradient>
              <Text style={styles.mioLabel}>Mio</Text>
            </View>
            <Text style={styles.responseText}>{response}</Text>
            <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate("Chat", { initialMessage: transcript })}>
              <Text style={styles.continueBtnText}>Continue in chat →</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* Bottom hint */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Mio AI Voice Engine</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f1035" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14 },
  closeBtn: { width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  closeText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  title: { flex: 1, textAlign: "center", color: "#fff", fontWeight: "800", fontSize: 17 },
  textBtn: { backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  textBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  content: { flex: 1, alignItems: "center", paddingHorizontal: 24, paddingTop: 40 },
  orbWrap: { position: "relative", alignItems: "center", justifyContent: "center", marginBottom: 28 },
  orbRing: { position: "absolute", width: 160, height: 160, borderRadius: 80, borderWidth: 2, borderColor: "rgba(124,58,237,0.4)", backgroundColor: "rgba(124,58,237,0.08)" },
  orb: { width: 120, height: 120, borderRadius: 60, alignItems: "center", justifyContent: "center", shadowColor: "#7c3aed", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.5, shadowRadius: 24, elevation: 12 },
  waveRow: { flexDirection: "row", alignItems: "center", gap: 4, height: 40 },
  wavebar: { width: 4, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 2, minHeight: 8 },
  orbIcon: { fontSize: 44 },
  stateLabel: { color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: "600", marginBottom: 32 },
  transcriptCard: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 16, width: "100%", marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  transcriptLabel: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "700", textTransform: "uppercase", marginBottom: 6 },
  transcriptText: { color: "#fff", fontSize: 16, fontWeight: "700", lineHeight: 24 },
  promptWrap: { paddingHorizontal: 16, marginBottom: 16 },
  promptText: { color: "rgba(255,255,255,0.4)", fontSize: 14, textAlign: "center", fontStyle: "italic" },
  responseCard: { backgroundColor: "#fff", borderRadius: 20, padding: 16, width: "100%", marginTop: 8 },
  responseHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  mioAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  mioAvatarText: { color: "#fff", fontWeight: "900", fontSize: 12 },
  mioLabel: { color: "#7c3aed", fontWeight: "800", fontSize: 14 },
  responseText: { color: "#0f1035", fontSize: 15, lineHeight: 23, marginBottom: 14 },
  continueBtn: { backgroundColor: "#f0edff", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  continueBtnText: { color: "#7c3aed", fontWeight: "700", fontSize: 13 },
  footer: { paddingBottom: 32, alignItems: "center" },
  footerText: { color: "rgba(255,255,255,0.2)", fontSize: 12 },
});
