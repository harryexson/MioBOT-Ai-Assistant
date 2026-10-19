import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMioStore } from "../store/useStore";

const { width } = Dimensions.get("window");

const MOCK_PRODUCT = {
  id: "prod-001",
  name: "Sony WH-1000XM5 Wireless Headphones",
  brand: "Sony",
  price: 349.00,
  originalPrice: 399.00,
  currency: "USD",
  rating: 4.8,
  reviewCount: 12847,
  description: "Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery life. Crystal clear hands-free calling. Multipoint connection for two devices simultaneously.",
  features: [
    "Industry-leading noise cancellation",
    "30-hour battery life",
    "Multipoint connection (2 devices)",
    "DSEE Extreme audio upscaling",
    "Speak-to-Chat technology",
  ],
  retailers: [
    { name: "Best Buy", price: 349.00, inStock: true, delivery: "Free, 2 days" },
    { name: "Amazon", price: 328.00, inStock: true, delivery: "Free, 1 day (Prime)" },
    { name: "Sony Store", price: 399.00, inStock: true, delivery: "Free, 3–5 days" },
  ],
  emoji: "🎧",
  category: "Electronics",
};

export default function ProductDetailScreen({ route, navigation }: any) {
  const product = route.params?.product ?? MOCK_PRODUCT;
  const [selectedRetailer, setSelectedRetailer] = useState(0);
  const [qty, setQty] = useState(1);
  const addToCart = useMioStore((s) => s.addToCart);

  function handleAddToCart() {
    addToCart({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.retailers[selectedRetailer].price,
      currency: product.currency,
      quantity: qty,
      metadata: { retailer: product.retailers[selectedRetailer].name },
    });
    navigation.navigate("Cart");
  }

  const bestRetailer = product.retailers[selectedRetailer];
  const saving = product.originalPrice - bestRetailer.price;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.brand}</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={{ fontSize: 20 }}>⬆️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image area */}
        <View style={styles.imageArea}>
          <LinearGradient colors={["#f0edff", "#e8e4ff"]} style={styles.imageGrad}>
            <Text style={styles.productEmoji}>{product.emoji}</Text>
          </LinearGradient>
          {saving > 0 && (
            <View style={styles.savingBadge}>
              <Text style={styles.savingText}>Save ${saving.toFixed(0)}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Category + rating */}
          <View style={styles.metaRow}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</Text>
            </View>
          </View>

          {/* Name */}
          <Text style={styles.name}>{product.name}</Text>

          {/* Best price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${bestRetailer.price.toFixed(2)}</Text>
            {product.originalPrice > bestRetailer.price && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Features */}
          <View style={styles.features}>
            <Text style={styles.sectionLabel}>Key Features</Text>
            {product.features.map((f: string) => (
              <View key={f} style={styles.featureRow}>
                <Text style={styles.featureCheck}>✓</Text>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Retailers */}
          <View style={styles.retailers}>
            <Text style={styles.sectionLabel}>Best prices found by Mio</Text>
            {product.retailers.map((r: typeof MOCK_PRODUCT["retailers"][0], i: number) => (
              <TouchableOpacity
                key={r.name}
                style={[styles.retailerCard, selectedRetailer === i && styles.retailerCardActive]}
                onPress={() => setSelectedRetailer(i)}
              >
                <View style={styles.retailerLeft}>
                  <Text style={styles.retailerName}>{r.name}</Text>
                  <Text style={styles.retailerDelivery}>{r.delivery}</Text>
                </View>
                <View style={styles.retailerRight}>
                  <Text style={styles.retailerPrice}>${r.price.toFixed(2)}</Text>
                  <Text style={styles.retailerStock}>{r.inStock ? "In stock" : "Out of stock"}</Text>
                </View>
                {selectedRetailer === i && (
                  <View style={styles.selectedDot} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity */}
          <View style={styles.qtyRow}>
            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomTotal}>${(bestRetailer.price * qty).toFixed(2)}</Text>
          <Text style={styles.bottomRetailer}>from {bestRetailer.name}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart} activeOpacity={0.85}>
          <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.addBtnGrad}>
            <Text style={styles.addBtnText}>Add to cart</Text>
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
  headerTitle: { flex: 1, textAlign: "center", fontWeight: "800", color: "#0f1035", fontSize: 16 },
  shareBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  imageArea: { position: "relative", margin: 16, borderRadius: 20, overflow: "hidden" },
  imageGrad: { height: 220, alignItems: "center", justifyContent: "center" },
  productEmoji: { fontSize: 96 },
  savingBadge: { position: "absolute", top: 12, right: 12, backgroundColor: "#7c3aed", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  savingText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  content: { padding: 20 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  category: { fontSize: 12, fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: 0.5 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  starIcon: { fontSize: 14, color: "#f59e0b" },
  rating: { fontSize: 14, fontWeight: "800", color: "#0f1035" },
  reviewCount: { fontSize: 12, color: "#9ca3af" },
  name: { fontSize: 20, fontWeight: "900", color: "#0f1035", marginBottom: 8, lineHeight: 28 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  price: { fontSize: 28, fontWeight: "900", color: "#7c3aed" },
  originalPrice: { fontSize: 16, color: "#9ca3af", textDecorationLine: "line-through" },
  description: { fontSize: 14, color: "#6b7280", lineHeight: 22, marginBottom: 20 },
  features: { marginBottom: 20 },
  sectionLabel: { fontSize: 14, fontWeight: "800", color: "#0f1035", marginBottom: 10 },
  featureRow: { flexDirection: "row", gap: 8, alignItems: "flex-start", marginBottom: 6 },
  featureCheck: { color: "#7c3aed", fontWeight: "800", fontSize: 14, marginTop: 1 },
  featureText: { flex: 1, fontSize: 14, color: "#374151", lineHeight: 21 },
  retailers: { marginBottom: 20 },
  retailerCard: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 14, borderWidth: 1.5, borderColor: "#e8e4ff", marginBottom: 8, backgroundColor: "#f8f7ff" },
  retailerCardActive: { borderColor: "#7c3aed", backgroundColor: "#f0edff" },
  retailerLeft: { flex: 1 },
  retailerName: { fontSize: 14, fontWeight: "700", color: "#0f1035" },
  retailerDelivery: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  retailerRight: { alignItems: "flex-end" },
  retailerPrice: { fontSize: 16, fontWeight: "900", color: "#7c3aed" },
  retailerStock: { fontSize: 11, color: "#22c55e", fontWeight: "600" },
  selectedDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#7c3aed", marginLeft: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 100 },
  qtyControl: { flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: "#f8f7ff", borderRadius: 14, padding: 4, borderWidth: 1, borderColor: "#e8e4ff" },
  qtyBtn: { width: 36, height: 36, backgroundColor: "#fff", borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e8e4ff" },
  qtyBtnText: { fontSize: 20, color: "#7c3aed", fontWeight: "800", lineHeight: 26 },
  qtyValue: { fontSize: 18, fontWeight: "900", color: "#0f1035", minWidth: 28, textAlign: "center" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", gap: 12, padding: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  bottomPrice: { flex: 1 },
  bottomTotal: { fontSize: 22, fontWeight: "900", color: "#0f1035" },
  bottomRetailer: { fontSize: 12, color: "#9ca3af" },
  addBtn: { borderRadius: 16, overflow: "hidden" },
  addBtnGrad: { paddingHorizontal: 28, paddingVertical: 14 },
  addBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
