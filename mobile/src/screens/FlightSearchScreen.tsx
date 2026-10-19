import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const FLIGHTS = [
  { id: '1', airline: 'United Airlines', from: 'ORD', to: 'LAX', depart: '06:00', arrive: '08:30', duration: '4h 30m', stops: 'Nonstop', price: 189, class: 'Economy', seats: 4 },
  { id: '2', airline: 'American Airlines', from: 'ORD', to: 'LAX', depart: '09:15', arrive: '12:45', duration: '5h 30m', stops: '1 stop', price: 142, class: 'Economy', seats: 12 },
  { id: '3', airline: 'Delta Air Lines', from: 'ORD', to: 'LAX', depart: '12:30', arrive: '14:55', duration: '4h 25m', stops: 'Nonstop', price: 215, class: 'Economy', seats: 2 },
  { id: '4', airline: 'Southwest', from: 'MDW', to: 'LAX', depart: '07:45', arrive: '10:20', duration: '4h 35m', stops: 'Nonstop', price: 129, class: 'Economy', seats: 18 },
];

const AIRLINE_EMOJI: Record<string, string> = {
  'United Airlines': '🔵',
  'American Airlines': '🔴',
  'Delta Air Lines': '🟣',
  'Southwest': '🟡',
};

export default function FlightSearchScreen({ navigation }: any) {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [selected, setSelected] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'time'>('price');

  const sorted = [...FLIGHTS].sort((a, b) => sortBy === 'price' ? a.price - b.price : a.depart.localeCompare(b.depart));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Search</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Mio AI card */}
        <View style={styles.aiCard}>
          <View style={styles.mioAvatar}><Text style={styles.mioAvatarText}>M</Text></View>
          <Text style={styles.aiText}>I found {FLIGHTS.length} flights from Chicago to Los Angeles. Prices start from $129.</Text>
        </View>

        {/* Trip type toggle */}
        <View style={styles.toggleContainer}>
          {(['roundtrip', 'oneway'] as const).map(type => (
            <TouchableOpacity key={type} style={[styles.toggleBtn, tripType === type && styles.toggleBtnActive]} onPress={() => setTripType(type)}>
              <Text style={[styles.toggleText, tripType === type && styles.toggleTextActive]}>
                {type === 'roundtrip' ? 'Round Trip' : 'One Way'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Route summary */}
        <View style={styles.routeCard}>
          <View style={styles.routePoint}>
            <Text style={styles.routeCode}>ORD</Text>
            <Text style={styles.routeCity}>Chicago</Text>
          </View>
          <View style={styles.routeMiddle}>
            <Text style={styles.routeArrow}>✈</Text>
            <Text style={styles.routeDate}>Oct 24 – Oct 26</Text>
          </View>
          <View style={styles.routePoint}>
            <Text style={styles.routeCode}>LAX</Text>
            <Text style={styles.routeCity}>Los Angeles</Text>
          </View>
        </View>

        {/* Sort */}
        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          {(['price', 'time'] as const).map(s => (
            <TouchableOpacity key={s} style={[styles.sortChip, sortBy === s && styles.sortChipActive]} onPress={() => setSortBy(s)}>
              <Text style={[styles.sortChipText, sortBy === s && styles.sortChipTextActive]}>{s === 'price' ? 'Cheapest' : 'Earliest'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Flight cards */}
        {sorted.map(flight => (
          <TouchableOpacity
            key={flight.id}
            style={[styles.flightCard, selected === flight.id && styles.flightCardSelected]}
            onPress={() => setSelected(flight.id)}
            activeOpacity={0.8}
          >
            <View style={styles.flightTop}>
              <View style={styles.airlineRow}>
                <Text style={{ fontSize: 18 }}>{AIRLINE_EMOJI[flight.airline]}</Text>
                <Text style={styles.airlineName}>{flight.airline}</Text>
                {flight.stops === 'Nonstop' && <View style={styles.nonstopBadge}><Text style={styles.nonstopText}>Nonstop</Text></View>}
              </View>
              <Text style={styles.flightPrice}>${flight.price}</Text>
            </View>
            <View style={styles.flightTimes}>
              <View style={styles.timePoint}>
                <Text style={styles.timeCode}>{flight.depart}</Text>
                <Text style={styles.airportCode}>{flight.from}</Text>
              </View>
              <View style={styles.flightLine}>
                <Text style={styles.duration}>{flight.duration}</Text>
                <View style={styles.line} />
                <Text style={styles.stopsLabel}>{flight.stops}</Text>
              </View>
              <View style={styles.timePoint}>
                <Text style={styles.timeCode}>{flight.arrive}</Text>
                <Text style={styles.airportCode}>{flight.to}</Text>
              </View>
            </View>
            <View style={styles.flightBottom}>
              <Text style={styles.seatsLeft}>{flight.seats} seats left</Text>
              <TouchableOpacity style={styles.selectBtn} onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.selectBtnText}>Select</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 80 }} />
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
  aiCard: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 16, backgroundColor: '#f5f3ff', borderRadius: 14, padding: 14 },
  mioAvatar: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  mioAvatarText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  aiText: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 18 },
  toggleContainer: { flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#f3f4f6', borderRadius: 14, padding: 4, marginBottom: 16 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: '#ffffff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  toggleText: { fontSize: 13, fontWeight: '600', color: '#9ca3af' },
  toggleTextActive: { color: '#0f1035' },
  routeCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, backgroundColor: '#f5f3ff', borderRadius: 16, padding: 16, marginBottom: 16 },
  routePoint: { flex: 1, alignItems: 'center' },
  routeCode: { fontSize: 22, fontWeight: '800', color: '#0f1035' },
  routeCity: { fontSize: 11, color: '#9ca3af', marginTop: 2 },
  routeMiddle: { flex: 1, alignItems: 'center' },
  routeArrow: { fontSize: 22, color: '#7c3aed', marginBottom: 2 },
  routeDate: { fontSize: 11, color: '#7c3aed', fontWeight: '600' },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginBottom: 12 },
  sortLabel: { fontSize: 12, color: '#9ca3af' },
  sortChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: '#f3f4f6' },
  sortChipActive: { backgroundColor: '#7c3aed' },
  sortChipText: { fontSize: 12, fontWeight: '600', color: '#6b7280' },
  sortChipTextActive: { color: '#fff' },
  flightCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1.5, borderColor: '#ede9fe', padding: 16 },
  flightCardSelected: { borderColor: '#7c3aed', backgroundColor: '#fdfcff' },
  flightTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  airlineRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  airlineName: { fontSize: 13, fontWeight: '600', color: '#374151' },
  nonstopBadge: { backgroundColor: '#ecfdf5', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  nonstopText: { fontSize: 10, color: '#10b981', fontWeight: '700' },
  flightPrice: { fontSize: 22, fontWeight: '800', color: '#7c3aed' },
  flightTimes: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  timePoint: { alignItems: 'center', width: 50 },
  timeCode: { fontSize: 18, fontWeight: '700', color: '#0f1035' },
  airportCode: { fontSize: 11, color: '#9ca3af', fontWeight: '600' },
  flightLine: { flex: 1, alignItems: 'center' },
  duration: { fontSize: 11, color: '#9ca3af', marginBottom: 3 },
  line: { height: 1, width: '100%', backgroundColor: '#e5e7eb', marginBottom: 3 },
  stopsLabel: { fontSize: 11, color: '#6b7280' },
  flightBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderColor: '#f3f4f6' },
  seatsLeft: { fontSize: 12, color: '#ef4444', fontWeight: '600' },
  selectBtn: { backgroundColor: '#7c3aed', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  selectBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
