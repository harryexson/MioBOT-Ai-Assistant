import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Animated } from 'react-native';

const STEPS = [
  { icon: '📡', title: 'Tap NFC Tag', desc: 'Hold your phone near the Mio NFC device', status: 'done' },
  { icon: '🤖', title: 'Mio Opens', desc: 'Your personalised menu appears instantly', status: 'done' },
  { icon: '🛒', title: 'Order & Customise', desc: 'Choose your items and personalise your order', status: 'active' },
  { icon: '💳', title: 'Pay Securely', desc: 'Tap once to pay with your saved method', status: 'pending' },
  { icon: '✅', title: 'Get Confirmation', desc: 'Instant confirmation and order tracking', status: 'pending' },
];

const SCENARIOS = [
  { emoji: '🍕', label: 'Restaurant', desc: 'Table ordering & takeaway' },
  { emoji: '🛍️', label: 'Retail', desc: 'Self-checkout & product info' },
  { emoji: '🏨', label: 'Hotel', desc: 'Room service & amenities' },
  { emoji: '🎭', label: 'Events', desc: 'Ticket validation & ordering' },
];

export default function NFCScreen({ navigation }: any) {
  const [activeStep, setActiveStep] = useState(2);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NFC & In-Store</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* NFC tap demo */}
        <View style={styles.nfcDemo}>
          <TouchableOpacity
            style={[styles.nfcOrb, scanning && styles.nfcOrbScanning, scanned && styles.nfcOrbScanned]}
            onPress={handleScan}
            activeOpacity={0.8}
          >
            <Text style={styles.nfcIcon}>{scanned ? '✅' : '📡'}</Text>
            <Text style={styles.nfcLabel}>{scanning ? 'Scanning...' : scanned ? 'Connected!' : 'Tap to Simulate NFC'}</Text>
          </TouchableOpacity>
          {!scanned && <Text style={styles.nfcHint}>Tap the button above to simulate an NFC tap</Text>}
          {scanned && (
            <View style={styles.connectedCard}>
              <Text style={styles.connectedTitle}>📍 Bella Vista Ristorante</Text>
              <Text style={styles.connectedSub}>Table 7 · Menu loaded · Ready to order</Text>
            </View>
          )}
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it works</Text>
          {STEPS.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[
                styles.stepIconWrap,
                step.status === 'done' && styles.stepDone,
                step.status === 'active' && styles.stepActive,
              ]}>
                <Text style={{ fontSize: 18 }}>{step.status === 'done' ? '✓' : step.icon}</Text>
              </View>
              {i < STEPS.length - 1 && <View style={[styles.stepLine, step.status === 'done' && styles.stepLineDone]} />}
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, step.status === 'pending' && styles.stepTitlePending]}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Scenarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Use cases</Text>
          <View style={styles.scenariosGrid}>
            {SCENARIOS.map((s, i) => (
              <TouchableOpacity key={i} style={styles.scenarioCard} activeOpacity={0.7}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>{s.emoji}</Text>
                <Text style={styles.scenarioLabel}>{s.label}</Text>
                <Text style={styles.scenarioDesc}>{s.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA for merchants */}
        <View style={styles.merchantCTA}>
          <Text style={styles.merchantTitle}>Add Mio NFC to your business</Text>
          <Text style={styles.merchantDesc}>Order your Mio NFC device and start accepting tap orders within 24 hours.</Text>
          <TouchableOpacity style={styles.merchantBtn}>
            <Text style={styles.merchantBtnText}>Get Your NFC Device →</Text>
          </TouchableOpacity>
        </View>

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
  nfcDemo: { margin: 20, alignItems: 'center' },
  nfcOrb: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#f5f3ff', borderWidth: 3, borderColor: '#ede9fe', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  nfcOrbScanning: { borderColor: '#7c3aed', backgroundColor: '#ede9fe' },
  nfcOrbScanned: { borderColor: '#10b981', backgroundColor: '#ecfdf5' },
  nfcIcon: { fontSize: 36, marginBottom: 4 },
  nfcLabel: { fontSize: 12, fontWeight: '700', color: '#7c3aed', textAlign: 'center' },
  nfcHint: { fontSize: 13, color: '#9ca3af', textAlign: 'center' },
  connectedCard: { marginTop: 12, backgroundColor: '#ecfdf5', borderRadius: 14, padding: 14, width: '100%', alignItems: 'center' },
  connectedTitle: { fontSize: 15, fontWeight: '700', color: '#0f1035', marginBottom: 4 },
  connectedSub: { fontSize: 13, color: '#10b981', fontWeight: '600' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0f1035', marginBottom: 14 },
  stepRow: { flexDirection: 'row', gap: 14, marginBottom: 16, alignItems: 'flex-start', position: 'relative' },
  stepIconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepDone: { backgroundColor: '#7c3aed' },
  stepActive: { backgroundColor: '#f5f3ff', borderWidth: 2, borderColor: '#7c3aed' },
  stepLine: { position: 'absolute', left: 21, top: 44, width: 2, height: 12, backgroundColor: '#e5e7eb' },
  stepLineDone: { backgroundColor: '#7c3aed' },
  stepText: { flex: 1, paddingTop: 6 },
  stepTitle: { fontSize: 14, fontWeight: '700', color: '#0f1035', marginBottom: 2 },
  stepTitlePending: { color: '#9ca3af' },
  stepDesc: { fontSize: 12, color: '#6b7280', lineHeight: 16 },
  scenariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  scenarioCard: { width: '47%', backgroundColor: '#f8f7ff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#ede9fe' },
  scenarioLabel: { fontSize: 14, fontWeight: '700', color: '#0f1035', marginBottom: 3 },
  scenarioDesc: { fontSize: 12, color: '#6b7280' },
  merchantCTA: { margin: 16, backgroundColor: '#0f1035', borderRadius: 20, padding: 24, alignItems: 'center' },
  merchantTitle: { fontSize: 17, fontWeight: '700', color: '#ffffff', marginBottom: 8, textAlign: 'center' },
  merchantDesc: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 16, textAlign: 'center', lineHeight: 18 },
  merchantBtn: { backgroundColor: '#7c3aed', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 11 },
  merchantBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
