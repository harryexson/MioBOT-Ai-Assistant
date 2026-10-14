import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, StatusBar, FlatList,
} from 'react-native';

const HOTELS = [
  { id: '1', name: 'The Langham Chicago', stars: 4.8, reviews: 347, price: 229, category: 'Luxury', amenities: ['WiFi', 'Spa', 'Pool', 'Gym'], emoji: '🏨' },
  { id: '2', name: 'Renaissance Chicago', stars: 4.6, reviews: 891, price: 189, category: 'Business', amenities: ['WiFi', 'Restaurant', 'Bar', 'Gym'], emoji: '🏩' },
  { id: '3', name: 'Hyatt Place Chicago', stars: 4.4, reviews: 512, price: 179, category: 'Boutique', amenities: ['WiFi', 'Pool', 'Free Breakfast'], emoji: '🏪' },
  { id: '4', name: 'Marriott Magnificent Mile', stars: 4.5, reviews: 723, price: 209, category: 'Business', amenities: ['WiFi', 'Restaurant', 'Gym', 'Concierge'], emoji: '🏦' },
];

export default function HotelSearchScreen({ navigation }: any) {
  const [city, setCity] = useState('Chicago');
  const [checkin, setCheckin] = useState('Oct 24');
  const [checkout, setCheckout] = useState('Oct 26');
  const [guests, setGuests] = useState('2');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hotel Search</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Mio AI suggestion */}
        <View style={styles.aiCard}>
          <View style={styles.mioAvatar}><Text style={styles.mioAvatarText}>M</Text></View>
          <Text style={styles.aiText}>Here are some top-rated options for Oct 24 – Oct 26 (2 nights).</Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchBox}>
          <View style={styles.searchRow}>
            <Text style={styles.searchLabel}>📍 City</Text>
            <TextInput style={styles.searchInput} value={city} onChangeText={setCity} />
          </View>
          <View style={styles.divider} />
          <View style={styles.searchRowHalf}>
            <View style={[styles.searchRow, { flex: 1, borderRightWidth: 1, borderColor: '#f3f4f6' }]}>
              <Text style={styles.searchLabel}>📅 Check-in</Text>
              <TextInput style={styles.searchInput} value={checkin} onChangeText={setCheckin} />
            </View>
            <View style={[styles.searchRow, { flex: 1 }]}>
              <Text style={styles.searchLabel}>📅 Check-out</Text>
              <TextInput style={styles.searchInput} value={checkout} onChangeText={setCheckout} />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.searchRow}>
            <Text style={styles.searchLabel}>👥 Guests</Text>
            <TextInput style={styles.searchInput} value={guests} onChangeText={setGuests} keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Search Hotels</Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        <Text style={styles.resultsLabel}>{HOTELS.length} hotels found</Text>
        {HOTELS.map(hotel => (
          <TouchableOpacity
            key={hotel.id}
            style={[styles.hotelCard, selected === hotel.id && styles.hotelCardSelected]}
            onPress={() => setSelected(hotel.id)}
            activeOpacity={0.8}
          >
            <View style={styles.hotelImg}>
              <Text style={{ fontSize: 36 }}>{hotel.emoji}</Text>
              <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>{hotel.category}</Text></View>
            </View>
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.starsRow}>
                <Text style={styles.stars}>★ {hotel.stars}</Text>
                <Text style={styles.reviews}>({hotel.reviews} reviews)</Text>
              </View>
              <View style={styles.amenitiesRow}>
                {hotel.amenities.slice(0, 3).map(a => (
                  <View key={a} style={styles.amenityChip}><Text style={styles.amenityText}>{a}</Text></View>
                ))}
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${hotel.price}<Text style={styles.perNight}>/night</Text></Text>
                <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('Checkout')}>
                  <Text style={styles.viewBtnText}>Book Now</Text>
                </TouchableOpacity>
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
  headerTitle: { fontFamily: 'System', fontWeight: '700', fontSize: 17, color: '#0f1035' },
  scroll: { flex: 1 },
  aiCard: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 16, backgroundColor: '#f5f3ff', borderRadius: 14, padding: 14 },
  mioAvatar: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  mioAvatarText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  aiText: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 18 },
  searchBox: { margin: 16, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1.5, borderColor: '#ede9fe', overflow: 'hidden', shadowColor: '#7c3aed', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  searchRowHalf: { flexDirection: 'row' },
  searchLabel: { fontSize: 12, color: '#9ca3af', width: 80 },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '600', color: '#0f1035' },
  divider: { height: 1, backgroundColor: '#f3f4f6', marginHorizontal: 16 },
  searchBtn: { margin: 12, backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  searchBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  resultsLabel: { fontSize: 13, color: '#9ca3af', marginHorizontal: 16, marginBottom: 8, fontWeight: '600' },
  hotelCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1.5, borderColor: '#ede9fe', overflow: 'hidden', shadowColor: '#7c3aed', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  hotelCardSelected: { borderColor: '#7c3aed', backgroundColor: '#fdfcff' },
  hotelImg: { height: 100, backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  categoryBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#7c3aed', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  categoryBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  hotelInfo: { padding: 14 },
  hotelName: { fontSize: 15, fontWeight: '700', color: '#0f1035', marginBottom: 4 },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  stars: { color: '#f59e0b', fontWeight: '700', fontSize: 13 },
  reviews: { color: '#9ca3af', fontSize: 12 },
  amenitiesRow: { flexDirection: 'row', gap: 6, marginBottom: 10, flexWrap: 'wrap' },
  amenityChip: { backgroundColor: '#f5f3ff', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  amenityText: { fontSize: 11, color: '#7c3aed', fontWeight: '600' },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 20, fontWeight: '800', color: '#7c3aed' },
  perNight: { fontSize: 12, fontWeight: '400', color: '#9ca3af' },
  viewBtn: { backgroundColor: '#7c3aed', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
  viewBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
