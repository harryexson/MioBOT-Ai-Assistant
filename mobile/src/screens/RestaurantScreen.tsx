import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const CATEGORIES = ['All', 'Nearby', 'Fast Food', 'Italian', 'Asian', 'Healthy'];

const RESTAURANTS = [
  { id: '1', name: "McDonald's", cuisine: 'Fast Food', rating: 4.2, time: '15–25 min', delivery: '$1.99', priceRange: '$', emoji: '🍔', items: ['Big Mac', 'McFlurry', 'Fries'] },
  { id: '2', name: 'Bella Vista Ristorante', cuisine: 'Italian', rating: 4.7, time: '30–45 min', delivery: '$2.49', priceRange: '$$$', emoji: '🍝', items: ['Margherita Pizza', 'Chicken Alfredo', 'Tiramisu'] },
  { id: '3', name: 'Sakura Japanese', cuisine: 'Asian', rating: 4.5, time: '25–35 min', delivery: 'Free', priceRange: '$$', emoji: '🍣', items: ['Dragon Roll', 'Miso Soup', 'Edamame'] },
  { id: '4', name: 'Green Bowl', cuisine: 'Healthy', rating: 4.6, time: '20–30 min', delivery: 'Free', priceRange: '$$', emoji: '🥗', items: ['Açaí Bowl', 'Quinoa Salad', 'Smoothie'] },
];

const MENU_ITEMS = [
  { id: '1', name: 'Margherita Pizza', desc: 'Fresh tomato, mozzarella, basil', price: 16.99, emoji: '🍕', popular: true },
  { id: '2', name: 'Chicken Alfredo', desc: 'Creamy Alfredo sauce, grilled chicken', price: 18.99, emoji: '🍝', popular: true },
  { id: '3', name: 'Caesar Salad', desc: 'Romaine, croutons, parmesan dressing', price: 12.99, emoji: '🥗', popular: false },
  { id: '4', name: 'Grilled Salmon', desc: 'Atlantic salmon, seasonal vegetables', price: 24.99, emoji: '🐟', popular: false },
  { id: '5', name: 'Tiramisu', desc: 'Classic Italian dessert with espresso', price: 8.99, emoji: '🎂', popular: true },
];

export default function RestaurantScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState<'list' | 'menu'>('list');
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[1]);
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (itemId: string) => setCart(c => ({ ...c, [itemId]: (c[itemId] || 0) + 1 }));
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  if (view === 'menu') {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setView('list')} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedRestaurant.name}</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.restaurantHero}>
          <Text style={{ fontSize: 56 }}>{selectedRestaurant.emoji}</Text>
          <View style={styles.heroInfo}>
            <Text style={styles.heroRating}>★ {selectedRestaurant.rating}</Text>
            <Text style={styles.heroTime}>{selectedRestaurant.time}</Text>
            <Text style={styles.heroDelivery}>Delivery: {selectedRestaurant.delivery}</Text>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          {MENU_ITEMS.map(item => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuEmoji}><Text style={{ fontSize: 30 }}>{item.emoji}</Text></View>
              <View style={styles.menuInfo}>
                <View style={styles.menuNameRow}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  {item.popular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
                </View>
                <Text style={styles.menuDesc}>{item.desc}</Text>
                <View style={styles.menuPriceRow}>
                  <Text style={styles.menuPrice}>${item.price}</Text>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item.id)}>
                    <Text style={styles.addBtnText}>{cart[item.id] ? `+${cart[item.id]}` : '+'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
        {cartCount > 0 && (
          <View style={styles.cartBar}>
            <Text style={styles.cartBarText}>{cartCount} items in cart</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartBarBtn}>
              <Text style={styles.cartBarBtnText}>View Cart →</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food & Dining</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.aiSuggest}>
        <View style={styles.mioAvatar}><Text style={styles.mioAvatarText}>M</Text></View>
        <Text style={styles.aiText}>What would you like to eat? I found great options near you.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]} onPress={() => setActiveCategory(cat)}>
            <Text style={[styles.categoryChipText, activeCategory === cat && styles.categoryChipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll}>
        {RESTAURANTS.map(r => (
          <TouchableOpacity key={r.id} style={styles.restaurantCard} onPress={() => { setSelectedRestaurant(r); setView('menu'); }} activeOpacity={0.8}>
            <View style={styles.restaurantImg}>
              <Text style={{ fontSize: 44 }}>{r.emoji}</Text>
              <View style={styles.priceBadge}><Text style={styles.priceBadgeText}>{r.priceRange}</Text></View>
            </View>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{r.name}</Text>
              <Text style={styles.restaurantCuisine}>{r.cuisine}</Text>
              <View style={styles.restaurantMeta}>
                <Text style={styles.metaRating}>★ {r.rating}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaTime}>{r.time}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaDelivery}>{r.delivery} delivery</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ede9fe' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 20, color: '#7c3aed' },
  headerTitle: { fontWeight: '700', fontSize: 17, color: '#0f1035' },
  scroll: { flex: 1 },
  aiSuggest: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 16, backgroundColor: '#f5f3ff', borderRadius: 14, padding: 14 },
  mioAvatar: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  mioAvatarText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  aiText: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 18 },
  categoriesScroll: { maxHeight: 52, marginBottom: 4 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6', alignSelf: 'flex-start' },
  categoryChipActive: { backgroundColor: '#7c3aed' },
  categoryChipText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  categoryChipTextActive: { color: '#ffffff' },
  restaurantCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1.5, borderColor: '#ede9fe', overflow: 'hidden' },
  restaurantImg: { height: 90, backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  priceBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#0f1035', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  priceBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  restaurantInfo: { padding: 14 },
  restaurantName: { fontSize: 16, fontWeight: '700', color: '#0f1035', marginBottom: 3 },
  restaurantCuisine: { fontSize: 12, color: '#9ca3af', marginBottom: 6 },
  restaurantMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaRating: { fontSize: 13, color: '#f59e0b', fontWeight: '700' },
  metaDot: { color: '#d1d5db' },
  metaTime: { fontSize: 12, color: '#6b7280' },
  metaDelivery: { fontSize: 12, color: '#10b981', fontWeight: '600' },
  // Menu view
  restaurantHero: { backgroundColor: '#f5f3ff', padding: 20, alignItems: 'center', flexDirection: 'row', gap: 20 },
  heroInfo: { flex: 1 },
  heroRating: { fontSize: 16, fontWeight: '700', color: '#f59e0b', marginBottom: 4 },
  heroTime: { fontSize: 13, color: '#6b7280', marginBottom: 2 },
  heroDelivery: { fontSize: 13, color: '#10b981', fontWeight: '600' },
  menuItem: { flexDirection: 'row', gap: 14, padding: 16, borderBottomWidth: 1, borderColor: '#f3f4f6' },
  menuEmoji: { width: 60, height: 60, borderRadius: 14, backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center' },
  menuInfo: { flex: 1 },
  menuNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  menuName: { fontSize: 15, fontWeight: '700', color: '#0f1035' },
  popularBadge: { backgroundColor: '#fef3c7', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  popularText: { fontSize: 10, color: '#d97706', fontWeight: '700' },
  menuDesc: { fontSize: 12, color: '#9ca3af', marginBottom: 8, lineHeight: 16 },
  menuPriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuPrice: { fontSize: 17, fontWeight: '700', color: '#7c3aed' },
  addBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 22 },
  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#7c3aed', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingBottom: 28 },
  cartBarText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  cartBarBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  cartBarBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
