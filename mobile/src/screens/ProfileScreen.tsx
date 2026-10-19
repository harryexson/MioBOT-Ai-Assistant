import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Switch, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signOut } from "../services/supabase";
import { useMioStore } from "../store/useStore";

const MENU_SECTIONS = [
  {
    title: "Account",
    items: [
      { emoji: "👤", label: "Personal information", screen: "EditProfile" },
      { emoji: "📍", label: "Saved addresses", screen: "Addresses" },
      { emoji: "💳", label: "Payment methods", screen: "PaymentMethods" },
      { emoji: "🔔", label: "Notifications", screen: "Notifications" },
    ],
  },
  {
    title: "Mio AI",
    items: [
      { emoji: "🎤", label: "Voice preferences", screen: "VoiceSettings" },
      { emoji: "🛍️", label: "Shopping preferences", screen: "ShoppingPrefs" },
      { emoji: "📜", label: "Conversation history", screen: "History" },
      { emoji: "🔒", label: "Privacy & data", screen: "Privacy" },
    ],
  },
  {
    title: "Support",
    items: [
      { emoji: "❓", label: "Help centre", screen: "Help" },
      { emoji: "💬", label: "Chat with support", screen: "Support" },
      { emoji: "⭐", label: "Rate Mio AI", screen: "Rate" },
      { emoji: "📄", label: "Terms & Privacy Policy", screen: "Terms" },
    ],
  },
];

export default function ProfileScreen({ navigation }: any) {
  const user = useMioStore((s) => s.user);
  const setUser = useMioStore((s) => s.setUser);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const fullName = user?.user_metadata?.full_name ?? "Mio User";
  const email = user?.email ?? "user@example.com";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  async function handleSignOut() {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await signOut().catch(() => {});
          setUser(null);
          navigation.replace("Onboarding");
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={{ fontSize: 22 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar card */}
        <View style={styles.avatarCard}>
          <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
          <View style={styles.avatarInfo}>
            <Text style={styles.avatarName}>{fullName}</Text>
            <Text style={styles.avatarEmail}>{email}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {[
            { value: "12", label: "Orders" },
            { value: "3", label: "Saved" },
            { value: "4.8★", label: "Rating" },
          ].map((s) => (
            <View key={s.label} style={styles.stat}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick toggles */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleEmoji}>🎤</Text>
            <Text style={styles.toggleLabel}>Voice assistant</Text>
            <Switch
              value={voiceEnabled}
              onValueChange={setVoiceEnabled}
              trackColor={{ false: "#e5e7eb", true: "#a78bfa" }}
              thumbColor={voiceEnabled ? "#7c3aed" : "#f3f4f6"}
            />
          </View>
          <View style={[styles.toggleRow, { borderTopWidth: 1, borderTopColor: "#f3f4f6" }]}>
            <Text style={styles.toggleEmoji}>🔔</Text>
            <Text style={styles.toggleLabel}>Push notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#e5e7eb", true: "#a78bfa" }}
              thumbColor={notificationsEnabled ? "#7c3aed" : "#f3f4f6"}
            />
          </View>
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, idx > 0 && styles.menuItemBorder]}
                  onPress={() => navigation.navigate(item.screen as never)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuEmoji}>{item.emoji}</Text>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.85}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Mio AI v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for everyday life</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f7ff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: "900", color: "#0f1035" },
  settingsBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  avatarCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#e8e4ff", shadowColor: "#7c3aed", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  avatar: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 24 },
  avatarInfo: { flex: 1 },
  avatarName: { fontSize: 17, fontWeight: "800", color: "#0f1035" },
  avatarEmail: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  editBtn: { backgroundColor: "#f0edff", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  editBtnText: { color: "#7c3aed", fontWeight: "700", fontSize: 13 },
  stats: { flexDirection: "row", marginHorizontal: 20, backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#e8e4ff" },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "900", color: "#7c3aed" },
  statLabel: { fontSize: 11, color: "#6b7280", marginTop: 2, fontWeight: "600" },
  toggleCard: { backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: "#e8e4ff", overflow: "hidden" },
  toggleRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  toggleEmoji: { fontSize: 20 },
  toggleLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: "#0f1035" },
  section: { paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },
  menuCard: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#e8e4ff", overflow: "hidden" },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  menuItemBorder: { borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  menuEmoji: { fontSize: 20, width: 28 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: "#0f1035" },
  menuArrow: { fontSize: 22, color: "#d1d5db" },
  signOutBtn: { backgroundColor: "#fff", borderRadius: 16, padding: 16, alignItems: "center", borderWidth: 1.5, borderColor: "#fecaca" },
  signOutText: { color: "#ef4444", fontWeight: "700", fontSize: 15 },
  footer: { alignItems: "center", paddingVertical: 24, gap: 4 },
  footerText: { fontSize: 12, color: "#d1d5db" },
});
