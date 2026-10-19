import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const NOTIFICATIONS = [
  { id: '1', type: 'order', icon: '🛍️', title: 'Order Delivered!', desc: 'Your Sony WH-1000XMS headphones have been delivered.', time: '2 min ago', unread: true },
  { id: '2', type: 'mio', icon: '🤖', title: 'Mio found a deal', desc: 'Nike Air Max are 30% off at Sports Direct — you asked me to watch for this.', time: '1 hr ago', unread: true },
  { id: '3', type: 'payment', icon: '💳', title: 'Payment confirmed', desc: '$229 paid to The Langham Chicago. Booking ref: LCH-8821.', time: '3 hrs ago', unread: false },
  { id: '4', type: 'restaurant', icon: '🍕', title: 'Your order is ready', desc: 'Bella Vista Ristorante: Table 7, your Margherita Pizza is on its way.', time: 'Yesterday', unread: false },
  { id: '5', type: 'nfc', icon: '📡', title: 'NFC Tap detected', desc: 'Mio NFC at Costa Coffee, Canary Wharf. Menu opened automatically.', time: 'Yesterday', unread: false },
  { id: '6', type: 'system', icon: '⚡', title: 'New feature available', desc: 'Flight tracking is now live! Ask Mio to track any flight in real time.', time: '2 days ago', unread: false },
];

const TYPE_COLORS: Record<string, string> = {
  order: '#10b981',
  mio: '#7c3aed',
  payment: '#3b82f6',
  restaurant: '#f59e0b',
  nfc: '#8b5cf6',
  system: '#6b7280',
};

export default function NotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => setNotifications(n => n.map(notif => ({ ...notif, unread: false })));
  const dismiss = (id: string) => setNotifications(n => n.filter(notif => notif.id !== id));

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {notifications.map(notif => (
          <View key={notif.id} style={[styles.notifCard, notif.unread && styles.notifCardUnread]}>
            <View style={[styles.notifIcon, { backgroundColor: TYPE_COLORS[notif.type] + '20' }]}>
              <Text style={{ fontSize: 22 }}>{notif.icon}</Text>
            </View>
            <View style={styles.notifBody}>
              <View style={styles.notifTop}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifTime}>{notif.time}</Text>
              </View>
              <Text style={styles.notifDesc}>{notif.desc}</Text>
            </View>
            {notif.unread && <View style={[styles.unreadDot, { backgroundColor: TYPE_COLORS[notif.type] }]} />}
            <TouchableOpacity style={styles.dismissBtn} onPress={() => dismiss(notif.id)}>
              <Text style={styles.dismissText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>🔔</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyDesc}>No new notifications right now. Mio will let you know when something needs your attention.</Text>
          </View>
        )}
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
  markRead: { fontSize: 13, color: '#7c3aed', fontWeight: '600' },
  scroll: { flex: 1 },
  notifCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 16, borderBottomWidth: 1, borderColor: '#f3f4f6', position: 'relative' },
  notifCardUnread: { backgroundColor: '#fdfcff' },
  notifIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifBody: { flex: 1 },
  notifTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: '#0f1035', flex: 1, marginRight: 8 },
  notifTime: { fontSize: 11, color: '#9ca3af', flexShrink: 0 },
  notifDesc: { fontSize: 13, color: '#6b7280', lineHeight: 18 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, position: 'absolute', top: 20, right: 36 },
  dismissBtn: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  dismissText: { fontSize: 20, color: '#d1d5db', lineHeight: 24 },
  emptyState: { alignItems: 'center', paddingVertical: 80, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#0f1035', marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: '#9ca3af', textAlign: 'center', lineHeight: 20 },
});
