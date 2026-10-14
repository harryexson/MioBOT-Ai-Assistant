import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMioStore } from "../store/useStore";
import { useMioPayment } from "../services/stripe";

export default function CartScreen({ navigation }: any) {
  const cart = useMioStore((s) => s.cart);
  const removeFromCart = useMioStore((s) => s.removeFromCart);
  const updateQuantity = useMioStore((s) => s.updateQuantity);
  const clearCart = useMioStore((s) => s.clearCart);
  const cartTotal = useMioStore((s) => s.cartTotal);
  const { pay } = useMioPayment();

  async function handleCheckout() {
    if (cart.length === 0) return;
    try {
      const stripeItems = cart.map((item) => ({
        id: item.id,
        type: item.type,
        quantity: item.quantity,
        metadata: item.metadata,
      }));
      const result = await pay(stripeItems);
      if (result.success) {
        clearCart();
        Alert.alert("Order placed!", `Your order #${result.orderId?.slice(-6).toUpperCase()} is confirmed. Track it in Orders.`, [
          { text: "View Orders", onPress: () => navigation.navigate("Orders") },
          { text: "Done", style: "cancel" },
        ]);
      }
    } catch (e: any) {
      Alert.alert("Payment failed", e.message ?? "Please try again.");
    }
  }

  const deliveryFee = cart.length > 0 ? 4.99 : 0;
  const total = cartTotal() + deliveryFee;

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>My Cart</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Ask Mio to find something — just say what you need.</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate("ChatTab", {})}>
            <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.emptyBtnGrad}>
              <Text style={styles.emptyBtnText}>Ask Mio →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Cart ({cart.length})</Text>
        <TouchableOpacity onPress={() => Alert.alert("Clear cart?", "Remove all items?", [{ text: "Cancel" }, { text: "Clear", style: "destructive", onPress: clearCart }])}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemImage}>
              <Text style={{ fontSize: 32 }}>{item.type === "food" ? "🍔" : item.type === "hotel" ? "🏨" : item.type === "flight" ? "✈️" : "🛍️"}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              {item.metadata?.retailer && <Text style={styles.itemRetailer}>from {String(item.metadata.retailer)}</Text>}
              <View style={styles.itemPriceRow}>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                <View style={styles.qtyControl}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.id)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${cartTotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        }
      />

      {/* Checkout bar */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutInfo}>
          <Text style={styles.checkoutTotal}>${total.toFixed(2)}</Text>
          <Text style={styles.checkoutItems}>{cart.reduce((n, i) => n + i.quantity, 0)} items</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout} activeOpacity={0.85}>
          <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.checkoutBtnGrad}>
            <Text style={styles.checkoutBtnText}>Pay now →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  backText: { fontSize: 28, color: "#0f1035", lineHeight: 36 },
  title: { flex: 1, textAlign: "center", fontWeight: "900", color: "#0f1035", fontSize: 18 },
  clearText: { color: "#ef4444", fontWeight: "600", fontSize: 14 },
  list: { padding: 16, gap: 12 },
  cartItem: { flexDirection: "row", gap: 12, backgroundColor: "#f8f7ff", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "#e8e4ff" },
  itemImage: { width: 60, height: 60, backgroundColor: "#fff", borderRadius: 12, alignItems: "center", justifyContent: "center" },
  itemContent: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: "700", color: "#0f1035", lineHeight: 20, marginBottom: 2 },
  itemRetailer: { fontSize: 11, color: "#9ca3af", marginBottom: 8 },
  itemPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemPrice: { fontSize: 16, fontWeight: "900", color: "#7c3aed" },
  qtyControl: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: { width: 28, height: 28, backgroundColor: "#fff", borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e8e4ff" },
  qtyBtnText: { fontSize: 16, color: "#7c3aed", fontWeight: "800" },
  qtyValue: { fontSize: 14, fontWeight: "800", color: "#0f1035", minWidth: 18, textAlign: "center" },
  removeBtn: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  removeText: { color: "#9ca3af", fontSize: 16 },
  summary: { backgroundColor: "#f8f7ff", borderRadius: 16, padding: 16, margin: 4, marginTop: 8, borderWidth: 1, borderColor: "#e8e4ff" },
  summaryTitle: { fontSize: 15, fontWeight: "800", color: "#0f1035", marginBottom: 12 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: "#6b7280" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#0f1035" },
  totalRow: { borderTopWidth: 1, borderTopColor: "#e8e4ff", paddingTop: 10, marginTop: 4, marginBottom: 0 },
  totalLabel: { fontSize: 16, fontWeight: "800", color: "#0f1035" },
  totalValue: { fontSize: 20, fontWeight: "900", color: "#7c3aed" },
  checkoutBar: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  checkoutInfo: { flex: 1 },
  checkoutTotal: { fontSize: 22, fontWeight: "900", color: "#0f1035" },
  checkoutItems: { fontSize: 12, color: "#9ca3af" },
  checkoutBtn: { borderRadius: 16, overflow: "hidden" },
  checkoutBtnGrad: { paddingHorizontal: 24, paddingVertical: 14 },
  checkoutBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  emptyEmoji: { fontSize: 64, marginBottom: 20 },
  emptyTitle: { fontSize: 22, fontWeight: "900", color: "#0f1035", marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: "#6b7280", textAlign: "center", lineHeight: 22, marginBottom: 28 },
  emptyBtn: { borderRadius: 16, overflow: "hidden" },
  emptyBtnGrad: { paddingHorizontal: 28, paddingVertical: 14 },
  emptyBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
