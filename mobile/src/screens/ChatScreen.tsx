import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { useMioStore } from "../store/useStore";
import { sendMessage, type Message } from "../services/mioApi";
import { addMessage as saveMessage } from "../services/supabase";

const QUICK_REPLIES = [
  "Tell me more",
  "Compare options",
  "Add to cart",
  "Book now",
  "Find something cheaper",
];

interface ChatMessage extends Message {
  id: string;
  timestamp: Date;
  results?: unknown[];
}

export default function ChatScreen({ route, navigation }: any) {
  const { initialMessage, category } = route.params ?? {};
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const conversation = useMioStore((s) => s.conversation);
  const startConversation = useMioStore((s) => s.startConversation);
  const user = useMioStore((s) => s.user);

  useEffect(() => {
    startConversation(category ?? "general");
    if (initialMessage) {
      setTimeout(() => send(initialMessage), 300);
    }
  }, []);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Save user message
    if (conversation?.id && user) {
      saveMessage(conversation.id, "user", text.trim()).catch(() => {});
    }

    try {
      const history: Message[] = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendMessage(
        conversation?.id ?? "temp",
        history,
        category
      );

      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
        results: response.results,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Speak the response
      Speech.speak(response.message, {
        language: "en",
        rate: 0.9,
        pitch: 1,
      });

      // Save assistant message
      if (conversation?.id && user) {
        saveMessage(conversation.id, "assistant", response.message).catch(() => {});
      }
    } catch {
      const errMsg: ChatMessage = {
        id: `e_${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  function renderMessage({ item }: { item: ChatMessage }) {
    const isUser = item.role === "user";
    return (
      <View style={[styles.msgRow, isUser && styles.msgRowUser]}>
        {!isUser && (
          <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.mioAvatar}>
            <Text style={styles.mioAvatarText}>M</Text>
          </LinearGradient>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
          {!isUser && (
            <Text style={styles.mioLabel}>Mio</Text>
          )}
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>
            {item.content}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>M</Text>
          </LinearGradient>
          <View>
            <Text style={styles.headerName}>Mio</Text>
            <Text style={styles.headerStatus}>● Online</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("VoiceChat")} style={styles.voiceBtn}>
          <Text style={styles.voiceBtnText}>🎤</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View style={styles.empty}>
              <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.emptyOrb}>
                <Text style={styles.emptyOrbText}>M</Text>
              </LinearGradient>
              <Text style={styles.emptyTitle}>Hi, I'm Mio!</Text>
              <Text style={styles.emptySubtitle}>Ask me anything — shop, dine, travel, book, or pay.</Text>
              <View style={styles.suggestions}>
                {["Find me running shoes under $150", "Book a hotel in Paris", "Order pizza nearby"].map((s) => (
                  <TouchableOpacity key={s} style={styles.suggestion} onPress={() => send(s)}>
                    <Text style={styles.suggestionText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
        />

        {/* Loading indicator */}
        {loading && (
          <View style={styles.typingRow}>
            <LinearGradient colors={["#7c3aed", "#4f46e5"]} style={styles.mioAvatar}>
              <Text style={styles.mioAvatarText}>M</Text>
            </LinearGradient>
            <View style={styles.typingBubble}>
              <ActivityIndicator size="small" color="#7c3aed" />
            </View>
          </View>
        )}

        {/* Quick replies */}
        {messages.length > 0 && !loading && (
          <View>
            <FlatList
              horizontal
              data={QUICK_REPLIES}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickReplies}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.quickReply} onPress={() => send(item)}>
                  <Text style={styles.quickReplyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask Mio anything..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => send(input)}
            disabled={!input.trim() || loading}
          >
            <LinearGradient
              colors={input.trim() ? ["#7c3aed", "#4f46e5"] : ["#e5e7eb", "#e5e7eb"]}
              style={styles.sendGrad}
            >
              <Text style={styles.sendIcon}>↑</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  back: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  backText: { fontSize: 28, color: "#0f1035", lineHeight: 36 },
  headerCenter: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  headerAvatarText: { color: "#fff", fontWeight: "900", fontSize: 16 },
  headerName: { fontWeight: "800", color: "#0f1035", fontSize: 15 },
  headerStatus: { fontSize: 11, color: "#22c55e", fontWeight: "600" },
  voiceBtn: { width: 36, height: 36, backgroundColor: "#f0edff", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  voiceBtnText: { fontSize: 18 },
  messages: { padding: 16, paddingBottom: 8, flexGrow: 1 },
  msgRow: { flexDirection: "row", marginBottom: 12, gap: 8, alignItems: "flex-end" },
  msgRowUser: { justifyContent: "flex-end" },
  mioAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  mioAvatarText: { color: "#fff", fontWeight: "900", fontSize: 12 },
  bubble: { maxWidth: "78%", borderRadius: 18, padding: 12 },
  bubbleUser: { backgroundColor: "#7c3aed", borderBottomRightRadius: 4 },
  bubbleAssistant: { backgroundColor: "#f8f7ff", borderWidth: 1, borderColor: "#e8e4ff", borderBottomLeftRadius: 4 },
  mioLabel: { fontSize: 10, color: "#7c3aed", fontWeight: "700", marginBottom: 4 },
  bubbleText: { fontSize: 14, color: "#0f1035", lineHeight: 21 },
  bubbleTextUser: { color: "#fff" },
  timestamp: { fontSize: 10, color: "#9ca3af", marginTop: 4, textAlign: "right" },
  typingRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingBottom: 8 },
  typingBubble: { backgroundColor: "#f8f7ff", borderRadius: 18, padding: 12, borderWidth: 1, borderColor: "#e8e4ff" },
  quickReplies: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  quickReply: { backgroundColor: "#f0edff", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#e8e4ff" },
  quickReplyText: { color: "#7c3aed", fontWeight: "600", fontSize: 12 },
  inputRow: { flexDirection: "row", gap: 10, padding: 12, borderTopWidth: 1, borderTopColor: "#f3f4f6", alignItems: "flex-end" },
  input: { flex: 1, backgroundColor: "#f8f7ff", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 11, fontSize: 14, color: "#0f1035", borderWidth: 1, borderColor: "#e8e4ff", maxHeight: 120 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, overflow: "hidden" },
  sendBtnDisabled: { opacity: 0.5 },
  sendGrad: { flex: 1, alignItems: "center", justifyContent: "center" },
  sendIcon: { color: "#fff", fontSize: 20, fontWeight: "900", lineHeight: 24 },
  empty: { flex: 1, alignItems: "center", paddingTop: 60, paddingHorizontal: 24 },
  emptyOrb: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  emptyOrbText: { color: "#fff", fontWeight: "900", fontSize: 36 },
  emptyTitle: { fontSize: 24, fontWeight: "900", color: "#0f1035", marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: "#6b7280", textAlign: "center", lineHeight: 22, marginBottom: 28 },
  suggestions: { gap: 10, width: "100%" },
  suggestion: { backgroundColor: "#f8f7ff", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#e8e4ff" },
  suggestionText: { color: "#0f1035", fontWeight: "600", fontSize: 13 },
});
