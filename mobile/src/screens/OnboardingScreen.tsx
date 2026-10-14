import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, TextInput, KeyboardAvoidingView, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signUp } from "../services/supabase";
import { useMioStore } from "../store/useStore";

const { width } = Dimensions.get("window");

const INTERESTS = [
  { id: "shopping", emoji: "🛍️", label: "Shopping" },
  { id: "food", emoji: "🍔", label: "Food & Dining" },
  { id: "travel", emoji: "✈️", label: "Travel & Hotels" },
  { id: "services", emoji: "📅", label: "Services" },
  { id: "payments", emoji: "💳", label: "Payments" },
  { id: "events", emoji: "🎟️", label: "Events" },
  { id: "nfc", emoji: "📡", label: "NFC In-Store" },
  { id: "groceries", emoji: "🛒", label: "Groceries" },
];

const STEPS = [
  { id: "welcome", title: "Welcome to Mio", subtitle: "Your AI Assistant for Everyday Life" },
  { id: "interests", title: "What would you like to use Mio for?", subtitle: "Choose all that apply — you can change this later" },
  { id: "voice", title: "Enable voice assistant?", subtitle: "Talk to Mio hands-free, anytime" },
  { id: "account", title: "Create your account", subtitle: "Start shopping, booking, and paying" },
  { id: "done", title: "You're all set!", subtitle: "Mio is ready to help" },
];

export default function OnboardingScreen({ navigation }: any) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useMioStore((s) => s.setUser);

  function toggleInterest(id: string) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function handleCreateAccount() {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await signUp(email, password, fullName);
      if (data.user) {
        setUser(data.user);
        setStep(4);
      }
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function finish() {
    navigation.replace("Main");
  }

  const current = STEPS[step];

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Progress dots */}
          <View style={styles.dots}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === step && styles.dotActive, i < step && styles.dotDone]}
              />
            ))}
          </View>

          {/* Step: Welcome */}
          {step === 0 && (
            <View style={styles.center}>
              <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.logoBox}>
                <Text style={styles.logoText}>M</Text>
              </LinearGradient>
              <Text style={styles.h1}>{current.title}</Text>
              <Text style={styles.subtitle}>{current.subtitle}</Text>
              <Text style={styles.body}>
                Shop, dine, travel, book services and handle payments — all through natural conversation.
              </Text>
              <TouchableOpacity style={styles.btn} onPress={next} activeOpacity={0.85}>
                <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.btnGrad}>
                  <Text style={styles.btnText}>Get Started</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Sign In</Text>
              </TouchableOpacity>
              <Text style={styles.skip}>Skip for now</Text>
            </View>
          )}

          {/* Step: Interests */}
          {step === 1 && (
            <View>
              <Text style={styles.h1}>{current.title}</Text>
              <Text style={styles.subtitle}>{current.subtitle}</Text>
              <View style={styles.grid}>
                {INTERESTS.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.chip, interests.includes(item.id) && styles.chipActive]}
                    onPress={() => toggleInterest(item.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chipEmoji}>{item.emoji}</Text>
                    <Text style={[styles.chipLabel, interests.includes(item.id) && styles.chipLabelActive]}>
                      {item.label}
                    </Text>
                    {interests.includes(item.id) && <Text style={styles.chipCheck}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.btn} onPress={next} activeOpacity={0.85}>
                <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.btnGrad}>
                  <Text style={styles.btnText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Step: Voice */}
          {step === 2 && (
            <View style={styles.center}>
              <View style={styles.voiceOrb}>
                <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.voiceGrad}>
                  <Text style={styles.voiceIcon}>🎤</Text>
                </LinearGradient>
              </View>
              <Text style={styles.h1}>{current.title}</Text>
              <Text style={styles.subtitle}>{current.subtitle}</Text>
              <Text style={styles.body}>
                Just say "Hey Mio" to start a conversation. Order food, find hotels, or make payments — all hands-free.
              </Text>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Enable Voice Assistant</Text>
                <TouchableOpacity
                  style={[styles.toggle, voiceEnabled && styles.toggleOn]}
                  onPress={() => setVoiceEnabled((v) => !v)}
                >
                  <View style={[styles.toggleThumb, voiceEnabled && styles.toggleThumbOn]} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.btn} onPress={next} activeOpacity={0.85}>
                <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.btnGrad}>
                  <Text style={styles.btnText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Step: Account */}
          {step === 3 && (
            <View>
              <Text style={styles.h1}>{current.title}</Text>
              <Text style={styles.subtitle}>{current.subtitle}</Text>
              <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="At least 8 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
              </View>
              <TouchableOpacity
                style={[styles.btn, loading && styles.btnDisabled]}
                onPress={handleCreateAccount}
                disabled={loading}
                activeOpacity={0.85}
              >
                <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.btnGrad}>
                  <Text style={styles.btnText}>{loading ? "Creating account…" : "Create Account"}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.legal}>
                By continuing, you agree to Mio's Terms of Service and Privacy Policy.
              </Text>
            </View>
          )}

          {/* Step: Done */}
          {step === 4 && (
            <View style={styles.center}>
              <View style={styles.doneCircle}>
                <Text style={styles.doneCheck}>✓</Text>
              </View>
              <Text style={styles.h1}>{current.title}</Text>
              <Text style={styles.subtitle}>{current.subtitle}</Text>
              <Text style={styles.body}>
                Start by asking Mio anything — shop for a gift, find a restaurant, book a flight, or just say "Hey Mio".
              </Text>
              <TouchableOpacity style={styles.btn} onPress={finish} activeOpacity={0.85}>
                <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.btnGrad}>
                  <Text style={styles.btnText}>Start Using Mio →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 24, paddingTop: 16, flexGrow: 1 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#e8e4ff" },
  dotActive: { width: 24, backgroundColor: "#7c3aed" },
  dotDone: { backgroundColor: "#a78bfa" },
  center: { alignItems: "center" },
  logoBox: { width: 80, height: 80, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  logoText: { fontSize: 40, fontWeight: "900", color: "#fff" },
  h1: { fontSize: 28, fontWeight: "900", color: "#0f1035", textAlign: "center", marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: "#7c3aed", textAlign: "center", marginBottom: 12, fontWeight: "600" },
  body: { fontSize: 14, color: "#6b7280", textAlign: "center", lineHeight: 22, marginBottom: 32, maxWidth: 300 },
  btn: { width: "100%", borderRadius: 16, overflow: "hidden", marginBottom: 12 },
  btnGrad: { paddingVertical: 16, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  btnDisabled: { opacity: 0.6 },
  link: { marginBottom: 8 },
  linkText: { color: "#7c3aed", fontWeight: "600", fontSize: 14 },
  skip: { color: "#9ca3af", fontSize: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 32 },
  chip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, backgroundColor: "#f8f7ff", borderWidth: 1.5, borderColor: "#e8e4ff", width: (width - 58) / 2 },
  chipActive: { borderColor: "#7c3aed", backgroundColor: "#f0edff" },
  chipEmoji: { fontSize: 18 },
  chipLabel: { flex: 1, fontSize: 13, fontWeight: "600", color: "#374151" },
  chipLabelActive: { color: "#7c3aed" },
  chipCheck: { color: "#7c3aed", fontWeight: "800", fontSize: 14 },
  voiceOrb: { width: 100, height: 100, borderRadius: 50, overflow: "hidden", marginBottom: 24, shadowColor: "#7c3aed", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  voiceGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  voiceIcon: { fontSize: 40 },
  toggleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f8f7ff", borderRadius: 14, padding: 16, width: "100%", marginBottom: 24 },
  toggleLabel: { fontSize: 15, fontWeight: "600", color: "#0f1035" },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: "#e5e7eb", justifyContent: "center", padding: 2 },
  toggleOn: { backgroundColor: "#7c3aed" },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 2 },
  toggleThumbOn: { transform: [{ translateX: 20 }] },
  form: { marginBottom: 24, gap: 4 },
  label: { fontSize: 13, fontWeight: "700", color: "#374151", marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1.5, borderColor: "#e8e4ff", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: "#0f1035", backgroundColor: "#f8f7ff" },
  error: { color: "#ef4444", fontSize: 13, fontWeight: "600", marginTop: 8 },
  legal: { fontSize: 11, color: "#9ca3af", textAlign: "center", lineHeight: 16 },
  doneCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#f0fdf4", alignItems: "center", justifyContent: "center", marginBottom: 24, borderWidth: 2, borderColor: "#bbf7d0" },
  doneCheck: { fontSize: 40, color: "#22c55e" },
});
