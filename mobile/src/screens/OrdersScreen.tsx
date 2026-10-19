import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type OrderStatus = "all" | "active" | "completed" | "cancelled";

const MOCK_ORDERS = [
  {
    id: "ORD-001",
    type: "food",
    emoji: "🍔",
    merchant: "McDonald's",
    items: "Big Mac Combo × 1",
    total: 12.99,
    status: "active",
    statusLabel: "On its way",
    statusColor: "#f59e0b",
    date: "Today, 2:14 PM",
    eta: "12 min",
  },
  {
    id: "ORD-002",
    type: "product",
    emoji: "🎧",
    merchant: "Best Buy",
    items: "Sony WH-1000XM5 × 1",
    total: 349.00,
    status: "active",
    statusLabel: "Processing",
    statusColor: "#7c3aed",
    date: "Today, 11:30 AM",
    eta: "2–4 days",
  },
  {
    id: "ORD-003",
    type: "hotel",
    emoji: "🏨",
    merchant: "The Langham Chicago",
    items: "Deluxe King Room × 2 nights",
    total: 458.00,
    status: "completed",
    statusLabel: "Completed",
    statusColor: "#22c55e",
    date: "Oct 10",
    eta: null,
  },
  {
    id: "ORD-004",
    type: "food",
    emoji: "🍕",
    merchant: "Bella Vista Restaurant",
    items: "Margherita Pizza × 2, Caesar Salad × 1",
    total: 54.50,
    status: "completed",
    statusLabel: "Delivered",
    statusColor: "#22c55e",
    date: "Oct 8",
    eta: null,
  },
  {
    id: "ORD-005",
    type: "flight",
    emoji: "✈️",
    merchant: "United Airlines",
    items: "ORD → LAX, Economy × 1",
    total: 287.00,
    status: "cancelled",
    statusLabel: "Cancelled",
    statusColor: "#ef4444",
    date: "Oct 5",
    eta: null,
  },
];

const TABS: { key: OrderStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrdersScreen({ navigation }: any) {
  const [tab, setTab] = useState<OrderStatus>("all");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = tab === "all" ? MOCK_ORDERS : MOCK_ORDERS.filter((o) => o.status === tab);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }

  function renderOrder({ item }: { item: typeof MOCK_ORDERS[0] }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OrderDetail", { order: item })}
        activeOpacity={0.85}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardIconWrap}>
            <Text style={styles.cardIcon}>{item.emoji}</Text>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.cardMerchant}>{item.merchant}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: item.statusColor + "18" }]}>
            <Text style={[styles.statusText, { color: item.statusColor }]}>{item.statusLabel}</Text>
          </View>
        </View>
        <Text style={styles.cardItems}>{item.items}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardTotal}>${item.total.toFixed(2)}</Text>
          {item.eta && (
            <View style={styles.etaBadge}>
              <Text style={styles.etaText}>ETA {item.eta}</Text>
            </View>
          )}
          <Text style={styles.cardId}>{item.id}</Text>
        </View>
        {item.status === "active" && (
          <View style={styles.trackRow}>
            <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate("Chat", { initialMessage: `Track my order ${item.id}` })}>
              <Text style={styles.trackBtnText}>Track order →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reorderBtn} onPress={() => navigation.navigate("Chat", { initialMessage: `Reorder from ${item.merchant}` })}>
              <Text style={styles.reorderBtnText}>Contact support</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.status === "completed" && (
          <View style={styles.trackRow}>
            <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate("Chat", { initialMessage: `Reorder from ${item.merchant}` })}>
              <Text style={styles.trackBtnText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity style={styles.searchIcon} onPress={() => navigation.navigate("Chat", { initialMessage: "Show my order history" })}>
          <Text style={{ fontSize: 22 }}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7c3aed" />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyTitle}>No orders here</Text>
            <Text style={styles.emptySubtitle}>Start shopping, booking, or ordering — Mio tracks everything here.</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate("ChatTab", {})}>
              <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.emptyBtnGrad}>
                <Text style={styles.emptyBtnText}>Ask Mio →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: "900", color: "#0f1035" },
  searchIcon: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  tabs: { flexDirection: "row", paddingHorizontal: 20, gap: 8, marginBottom: 12 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#f3f4f6" },
  tabActive: { backgroundColor: "#7c3aed" },
  tabText: { fontSize: 13, fontWeight: "600", color: "#6b7280" },
  tabTextActive: { color: "#fff" },
  list: { padding: 20, gap: 12, paddingTop: 4 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 16, borderWidth: 1.5, borderColor: "#f0edff", shadowColor: "#7c3aed", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  cardIconWrap: { width: 44, height: 44, backgroundColor: "#f0edff", borderRadius: 12, alignItems: "center", justifyContent: "center" },
  cardIcon: { fontSize: 22 },
  cardMeta: { flex: 1 },
  cardMerchant: { fontSize: 15, fontWeight: "800", color: "#0f1035" },
  cardDate: { fontSize: 11, color: "#9ca3af", marginTop: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: "700" },
  cardItems: { fontSize: 13, color: "#6b7280", marginBottom: 10, lineHeight: 19 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardTotal: { fontSize: 17, fontWeight: "900", color: "#0f1035", flex: 1 },
  etaBadge: { backgroundColor: "#fef9c3", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  etaText: { fontSize: 11, color: "#854d0e", fontWeight: "700" },
  cardId: { fontSize: 11, color: "#d1d5db" },
  trackRow: { flexDirection: "row", gap: 8, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  trackBtn: { flex: 1, backgroundColor: "#7c3aed", borderRadius: 10, paddingVertical: 9, alignItems: "center" },
  trackBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  reorderBtn: { flex: 1, backgroundColor: "#f0edff", borderRadius: 10, paddingVertical: 9, alignItems: "center" },
  reorderBtnText: { color: "#7c3aed", fontWeight: "700", fontSize: 13 },
  empty: { alignItems: "center", paddingTop: 60, paddingHorizontal: 32 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: "900", color: "#0f1035", marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: "#6b7280", textAlign: "center", lineHeight: 22, marginBottom: 28 },
  emptyBtn: { borderRadius: 16, overflow: "hidden" },
  emptyBtnGrad: { paddingHorizontal: 28, paddingVertical: 14 },
  emptyBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
