import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, TextInput, Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMioStore } from "../store/useStore";

const CATEGORIES = [
  { id: "shopping", emoji: "🛍️", label: "Shopping", color: "#f0edff" },
  { id: "food", emoji: "🍔", label: "Food", color: "#fff7ed" },
  { id: "travel", emoji: "✈️", label: "Travel", color: "#f0f9ff" },
  { id: "services", emoji: "📅", label: "Services", color: "#f0fdf4" },
  { id: "payments", emoji: "💳", label: "Payments", color: "#eef2ff" },
  { id: "events", emoji: "🎟️", label: "Events", color: "#fdf2f8" },
  { id: "nfc", emoji: "📡", label: "NFC", color: "#faf5ff" },
  { id: "other", emoji: "✨", label: "More", color: "#fffbeb" },
];

const AI_PICKS = [
  { id: "1", name: "Sony WH-1000XM5", price: "$349", category: "Headphones", emoji: "🎧" },
  { id: "2", name: "Nike Air Max 270", price: "$150", category: "Shoes", emoji: "👟" },
  { id: "3", name: "Margherita Pizza", price: "$18", category: "Food", emoji: "🍕" },
];

const RECENT = [
  { id: "1", text: "Find me a hotel in Chicago for next weekend", time: "2h ago" },
  { id: "2", text: "Order my usual from McDonald's", time: "Yesterday" },
  { id: "3", text: "Book a haircut appointment for Saturday", time: "3d ago" },
];

export default function HomeScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const user = useMioStore((s) => s.user);

  function startChat(text?: string) {
    navigation.navigate("Chat", { initialMessage: text });
  }

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, {firstName}!</Text>
            <Text style={styles.subGreeting}>What can Mio help with today?</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.avatarGrad}>
              <Text style={styles.avatarText}>{firstName[0]?.toUpperCase() ?? "M"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search / Voice bar */}
        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.searchBar} onPress={() => startChat()} activeOpacity={0.8}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Ask Mio anything...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.micBtn} onPress={() => navigation.navigate("VoiceChat")} activeOpacity={0.85}>
            <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.micGrad}>
              <Text style={styles.micIcon}>🎤</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick action chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {["Order food", "Book hotel", "Find flights", "Nearby events", "Pay bill"].map((chip) => (
            <TouchableOpacity key={chip} style={styles.chip} onPress={() => startChat(chip)}>
              <Text style={styles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.catGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, { backgroundColor: cat.color }]}
                onPress={() => navigation.navigate("Chat", { category: cat.id })}
                activeOpacity={0.8}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Picks */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>AI Picks for You</Text>
            <TouchableOpacity onPress={() => startChat("Show me more AI picks")}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.picksRow}>
            {AI_PICKS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.pickCard} onPress={() => startChat(`Tell me more about ${item.name}`)} activeOpacity={0.85}>
                <View style={styles.pickImage}>
                  <Text style={{ fontSize: 36 }}>{item.emoji}</Text>
                </View>
                <Text style={styles.pickCategory}>{item.category}</Text>
                <Text style={styles.pickName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.pickPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.pickBtn} onPress={() => startChat(`Add ${item.name} to cart`)}>
                  <Text style={styles.pickBtnText}>Add to cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent conversations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          {RECENT.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recentCard} onPress={() => startChat(item.text)} activeOpacity={0.8}>
              <View style={styles.recentIcon}>
                <Text>💬</Text>
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentText} numberOfLines={1}>{item.text}</Text>
                <Text style={styles.recentTime}>{item.time}</Text>
              </View>
              <Text style={styles.recentArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  greeting: { fontSize: 22, fontWeight: "900", color: "#0f1035" },
  subGreeting: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  avatar: { width: 42, height: 42, borderRadius: 21, overflow: "hidden" },
  avatarGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 18 },
  searchRow: { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginBottom: 12 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f8f7ff", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, borderWidth: 1, borderColor: "#e8e4ff" },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: { color: "#9ca3af", fontSize: 14, flex: 1 },
  micBtn: { width: 50, height: 50, borderRadius: 14, overflow: "hidden" },
  micGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  micIcon: { fontSize: 22 },
  chips: { paddingHorizontal: 20, gap: 8, paddingBottom: 4 },
  chip: { backgroundColor: "#f0edff", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#e8e4ff" },
  chipText: { color: "#7c3aed", fontWeight: "600", fontSize: 13 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#0f1035", marginBottom: 12 },
  seeAll: { color: "#7c3aed", fontWeight: "600", fontSize: 13 },
  catGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  catCard: { width: "22%", aspectRatio: 1, borderRadius: 16, alignItems: "center", justifyContent: "center", gap: 4 },
  catEmoji: { fontSize: 24 },
  catLabel: { fontSize: 10, fontWeight: "700", color: "#0f1035", textAlign: "center" },
  picksRow: { gap: 12, paddingBottom: 4 },
  pickCard: { width: 150, backgroundColor: "#f8f7ff", borderRadius: 18, padding: 14, borderWidth: 1, borderColor: "#e8e4ff" },
  pickImage: { width: "100%", aspectRatio: 1, backgroundColor: "#fff", borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  pickCategory: { fontSize: 10, color: "#7c3aed", fontWeight: "700", marginBottom: 4, textTransform: "uppercase" },
  pickName: { fontSize: 13, fontWeight: "700", color: "#0f1035", marginBottom: 4, lineHeight: 18 },
  pickPrice: { fontSize: 16, fontWeight: "900", color: "#7c3aed", marginBottom: 10 },
  pickBtn: { backgroundColor: "#7c3aed", borderRadius: 10, paddingVertical: 8, alignItems: "center" },
  pickBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  recentCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#f8f7ff", borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: "#e8e4ff" },
  recentIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#f0edff", alignItems: "center", justifyContent: "center" },
  recentContent: { flex: 1 },
  recentText: { fontSize: 13, fontWeight: "600", color: "#0f1035" },
  recentTime: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  recentArrow: { fontSize: 20, color: "#d1d5db" },
});
