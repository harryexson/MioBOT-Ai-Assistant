import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  TextInput, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signIn } from "../services/supabase";
import { useMioStore } from "../store/useStore";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useMioStore((s) => s.setUser);

  async function handleSignIn() {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await signIn(email, password);
      if (data.user) {
        setUser(data.user);
        navigation.replace("Main");
      }
    } catch (e: any) {
      setError(e.message ?? "Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>

          <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.logo}>
            <Text style={styles.logoText}>M</Text>
          </LinearGradient>

          <Text style={styles.h1}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your Mio account</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.btnGrad}>
              <Text style={styles.btnText}>{loading ? "Signing in…" : "Sign In"}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Social sign-in placeholders */}
          {[
            { emoji: "🍎", label: "Continue with Apple" },
            { emoji: "G", label: "Continue with Google" },
          ].map((s) => (
            <TouchableOpacity key={s.label} style={styles.socialBtn} activeOpacity={0.8}>
              <Text style={styles.socialIcon}>{s.emoji}</Text>
              <Text style={styles.socialText}>{s.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.signupRow} onPress={() => navigation.navigate("Onboarding")}>
            <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign up free</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 24, paddingTop: 12, flexGrow: 1 },
  back: { marginBottom: 24 },
  backText: { color: "#7c3aed", fontWeight: "600", fontSize: 16 },
  logo: { width: 70, height: 70, borderRadius: 22, alignItems: "center", justifyContent: "center", marginBottom: 24, alignSelf: "center" },
  logoText: { fontSize: 36, fontWeight: "900", color: "#fff" },
  h1: { fontSize: 28, fontWeight: "900", color: "#0f1035", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 15, color: "#6b7280", textAlign: "center", marginBottom: 32 },
  form: { marginBottom: 24 },
  label: { fontSize: 13, fontWeight: "700", color: "#374151", marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1.5, borderColor: "#e8e4ff", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: "#0f1035", backgroundColor: "#f8f7ff" },
  forgotRow: { alignItems: "flex-end", marginTop: 8 },
  forgotText: { color: "#7c3aed", fontWeight: "600", fontSize: 13 },
  error: { color: "#ef4444", fontSize: 13, fontWeight: "600", marginTop: 10 },
  btn: { width: "100%", borderRadius: 16, overflow: "hidden", marginBottom: 20 },
  btnGrad: { paddingVertical: 16, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  btnDisabled: { opacity: 0.6 },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  divider: { flex: 1, height: 1, backgroundColor: "#f3f4f6" },
  dividerText: { color: "#9ca3af", fontSize: 13, fontWeight: "600" },
  socialBtn: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1.5, borderColor: "#e5e7eb", borderRadius: 14, padding: 14, marginBottom: 10 },
  socialIcon: { fontSize: 20, width: 24, textAlign: "center", fontWeight: "800", color: "#0f1035" },
  socialText: { fontSize: 15, fontWeight: "600", color: "#0f1035" },
  signupRow: { alignItems: "center", marginTop: 16 },
  signupText: { fontSize: 14, color: "#6b7280" },
  signupLink: { color: "#7c3aed", fontWeight: "700" },
});
