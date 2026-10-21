import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Switch,
  Animated,
  AccessibilityInfo,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { friendlyBackendError, mobilePb, restoreSession, signIn, signOut, signUp } from "./src/services/pocketbase";
const purple = "#7645e8";
const picks = [
  {
    id: "shopping",
    icon: "headphones",
    label: "Shopping",
    prompt: "Find headphones under $200",
    name: "Everyday wireless headphones",
    detail: "Noise cancelling · 40-hour battery",
    price: "$149",
    color: "#eee7f8",
  },
  {
    id: "food",
    icon: "coffee",
    label: "Food & dining",
    prompt: "Find pizza for tonight",
    name: "Wood-fired margherita",
    detail: "Fresh basil · Mozzarella · 12 inch",
    price: "$18",
    color: "#f9eae0",
  },
  {
    id: "travel",
    icon: "map",
    label: "Travel",
    prompt: "Plan a weekend away",
    name: "A quiet city escape",
    detail: "Boutique stay · 2 guests",
    price: "$189 / night",
    color: "#e8eff8",
  },
  {
    id: "planning",
    icon: "calendar",
    label: "Everyday life",
    prompt: "Help me plan my Saturday",
    name: "A little time for you",
    detail: "Coffee at 10 · A walk at 12 · Dinner at 7",
    price: "Your day",
    color: "#e9eee4",
  },
  {
    id: "groceries",
    icon: "shopping-cart",
    label: "Groceries",
    prompt: "Help me plan groceries for the week",
    name: "A simpler weekly shop",
    detail: "Meal ideas · One sample shopping list",
    price: "Your list",
    color: "#e9eee4",
  },
  {
    id: "hotels",
    icon: "home",
    label: "Hotels",
    prompt: "Find a hotel for a weekend away",
    name: "A calm weekend stay",
    detail: "Boutique stay · Flexible dates",
    price: "$189 / night",
    color: "#e8eff8",
  },
  {
    id: "flights",
    icon: "navigation",
    label: "Flights",
    prompt: "Help me compare flights for a trip",
    name: "A smoother trip plan",
    detail: "Sample route · Compare travel options",
    price: "Trip ideas",
    color: "#e8eff8",
  },
  {
    id: "services",
    icon: "tool",
    label: "Local services",
    prompt: "Help me find someone to fix a leaky tap",
    name: "A trusted local professional",
    detail: "Home services · Compare sample options",
    price: "Request a quote",
    color: "#f9eae0",
  },
  {
    id: "events",
    icon: "ticket",
    label: "Events",
    prompt: "Find something fun to do this weekend",
    name: "Something good to look forward to",
    detail: "Local events · Music · Experiences",
    price: "Explore events",
    color: "#eee7f8",
  },
  {
    id: "payments",
    icon: "credit-card",
    label: "Payments",
    prompt: "Help me organize my monthly bills",
    name: "A clearer view of your bills",
    detail: "Planning tools · No payment details needed",
    price: "Your plan",
    color: "#e9eee4",
  },
  {
    id: "nfc",
    icon: "radio",
    label: "In-store & NFC",
    prompt: "How could Mio help me order in store?",
    name: "A quicker in-store experience",
    detail: "Tap-to-explore concept · No NFC scan",
    price: "Preview",
    color: "#f9eae0",
  },
] as const;
type Pick = (typeof picks)[number];
type Message = { text: string; pick?: Pick };
function Icon({
  name,
  size = 22,
  color = "#796887",
}: {
  name: any;
  size?: number;
  color?: string;
}) {
  return <Feather name={name} size={size} color={color} />;
}
function Orb({ small = false }: { small?: boolean }) {
  const depth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let alive = true;
    let animation: Animated.CompositeAnimation | undefined;
    function configure(reduce: boolean) {
      if (!alive) return;
      animation?.stop();
      depth.setValue(0);
      if (reduce || small) return;
      animation = Animated.sequence([
        Animated.timing(depth, { toValue: 1, duration: 1400, easing: Easing.bezier(.22, 1, .36, 1), useNativeDriver: true }),
        Animated.timing(depth, { toValue: 0, duration: 1800, easing: Easing.bezier(.22, 1, .36, 1), useNativeDriver: true }),
      ]);
      animation.start();
    }
    AccessibilityInfo.isReduceMotionEnabled().then(configure);
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", configure);
    return () => { alive = false; animation?.stop(); subscription.remove(); };
  }, [depth, small]);
  return (
    <Animated.View style={{ transform: [
      { perspective: 700 },
      { translateY: depth.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) },
      { rotateY: depth.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "10deg"] }) },
    ] }}>
    <LinearGradient
      colors={["#ddbdff", "#a66de2", "#622db7"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[s.orb, small && s.orbSmall]}
    >
      {!small && <View pointerEvents="none" style={s.orbGloss} />}
      <Icon name="activity" color="white" size={small ? 22 : 42} />
    </LinearGradient>
    </Animated.View>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <MioPreview />
    </SafeAreaProvider>
  );
}
function MioPreview() {
  const [welcome, setWelcome] = useState(true);
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [account, setAccount] = useState<any>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [accountPlan, setAccountPlan] = useState<"personal" | "business">("personal");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const scroll = useRef<ScrollView>(null);
  useEffect(() => {
    let alive = true;
    const unsubscribe = mobilePb.authStore.onChange((_token, record) => {
      if (alive) setAccount(record);
    }, true);
    restoreSession().then((record) => { if (alive) setAccount(record); }).catch(() => {});
    return () => { alive = false; unsubscribe(); };
  }, []);
  async function submitAuth() {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = authMode === "signup"
        ? await signUp(authEmail, authPassword, authName, accountPlan)
        : await signIn(authEmail, authPassword);
      setAccount(result);
      setAuthMode(null);
      setAuthPassword("");
      setAcceptedTerms(false);
    } catch (error) {
      setAuthError(friendlyBackendError(error));
    } finally {
      setAuthLoading(false);
    }
  }
  function ask(text: string) {
    if (!text.trim()) return;
    const q = text.trim();
    const pick = /pizza|food|dinner|eat/i.test(q)
      ? picks[1]
      : /grocery|groceries|supermarket|meal/i.test(q)
        ? picks[4]
      : /event|concert|ticket|fun this weekend/i.test(q)
        ? picks[8]
      : /flight|fly/i.test(q)
        ? picks[6]
      : /hotel|stay/i.test(q)
        ? picks[5]
      : /travel|weekend|away/i.test(q)
        ? picks[2]
      : /repair|fix|plumb|electrician|cleaner|service|appointment/i.test(q)
        ? picks[7]
      : /bill|payment|pay/i.test(q)
        ? picks[9]
      : /nfc|in store|in-store|tap to/i.test(q)
        ? picks[10]
        : /plan|saturday/i.test(q)
          ? picks[3]
          : /headphone|shop|buy|shoe/i.test(q)
            ? picks[0]
            : undefined;
    setMessages((m) => [...m, { text: q, pick }]);
    setQuery("");
    setTab("chat");
  }
  function toggle(id: string) {
    setSaved((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  }
  function card(p: Pick) {
    return (
      <View key={p.id} style={[s.pick, { backgroundColor: p.color }]}>
        <View style={s.pickIcon}>
          <Icon name={p.icon} size={30} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.micro}>SAMPLE PICK</Text>
          <Text style={s.pickTitle}>{p.name}</Text>
          <Text style={s.pickDetail}>{p.detail}</Text>
          <Text style={s.pickPrice}>{p.price}</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={
            (saved.includes(p.id) ? "Unsave " : "Save ") + p.name
          }
          onPress={() => toggle(p.id)}
          style={s.heart}
        >
          <Icon
            name={saved.includes(p.id) ? "check" : "heart"}
            size={19}
            color={purple}
          />
        </TouchableOpacity>
      </View>
    );
  }
  if (welcome)
    return (
      <View style={s.welcome}>
        <StatusBar style="dark" />
        <Image
          source={require("./assets/mio-portrait.png")}
          style={s.welcomeImage}
        />
        <LinearGradient
          colors={["transparent", "#fffefa"]}
          style={s.imageFade}
        />
        <SafeAreaView style={s.welcomeContent}>
          <View style={s.welcomeTop}>
            <Text style={s.logo}>
              mio<Text style={{ color: purple }}>✳</Text>
            </Text>
            <Text style={s.badge}>PRODUCT PREVIEW</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={s.eyebrow}>A LITTLE AI. A LOT MORE LIFE.</Text>
          <Text style={s.welcomeTitle}>
            Life’s calling.
            <Text style={{ color: purple }}>{"\n"}Let Mio help.</Text>
          </Text>
          <Text style={s.welcomeDescription}>
            Your everyday, made easier. One thoughtful conversation at a time.
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            style={s.primary}
            onPress={() => setWelcome(false)}
          >
            <Text style={s.primaryText}>Meet your Mio</Text>
            <Icon name="arrow-up-right" color="white" size={20} />
          </TouchableOpacity>
          <Text style={s.disclaimer}>
            Sample experiences. No account or payment needed.
          </Text>
        </SafeAreaView>
      </View>
    );
  return (
    <SafeAreaView style={s.safe} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={s.topbar}>
          <Text style={s.logo}>
            mio<Text style={{ color: purple }}>✳</Text>
          </Text>
          <Text style={s.badge}>PREVIEW</Text>
          <TouchableOpacity
            accessibilityLabel="Open profile"
            accessibilityRole="button"
            onPress={() => setTab("profile")}
            style={s.avatar}
          >
            <Icon name="user" size={18} />
          </TouchableOpacity>
        </View>
        {tab === "home" ? (
          <ScrollView contentContainerStyle={s.homeContent}>
            <Text style={s.eyebrow}>YOUR DAY, A LITTLE LIGHTER</Text>
            <Text style={s.heading}>Hello, you.{"\n"}What’s on your mind?</Text>
            <View style={s.homeOrb}>
              <Orb />
              <Text style={s.orbCaption}>A little everyday magic.</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setTab("chat")}
              style={s.askButton}
            >
              <Text style={s.placeholder}>Ask Mio anything…</Text>
              <Icon name="arrow-up-right" color={purple} />
            </TouchableOpacity>
            <View style={s.sectionHead}>
              <Text style={s.sectionTitle}>Where shall we start?</Text>
              <Icon name="sun" size={18} />
            </View>
            <View style={s.categoryGrid}>
              {picks.map((p) => (
                <TouchableOpacity
                  accessibilityRole="button"
                  key={p.id}
                  style={[s.category, { backgroundColor: p.color }]}
                  onPress={() => ask(p.prompt)}
                >
                  <Icon name={p.icon} size={26} />
                  <Text style={s.categoryName}>{p.label}</Text>
                  <Text style={s.categoryPrompt}>{p.prompt}</Text>
                  <View style={{ position: "absolute", right: 15, top: 16 }}>
                    <Icon name="arrow-up-right" size={15} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.softBanner}>
              <Icon name="shield" color={purple} />
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>Always your call.</Text>
                <Text style={s.bannerText}>
                  Explore freely. This demo never places an order or charges
                  you.
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : tab === "chat" ? (
          <>
            <View style={s.chatHeader}>
              <Text style={s.sectionTitle}>Your conversation</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="New conversation"
                onPress={() => setMessages([])}
                style={{ padding: 8 }}
              >
                <Icon name="edit" size={20} />
              </TouchableOpacity>
            </View>
            <ScrollView
              ref={scroll}
              onContentSizeChange={() =>
                scroll.current?.scrollToEnd({ animated: false })
              }
              contentContainerStyle={s.chatContent}
              keyboardShouldPersistTaps="handled"
            >
              {!messages.length ? (
                <View style={s.chatWelcome}>
                  <Orb />
                  <Text style={s.chatTitle}>Start with a little ask.</Text>
                  <Text style={s.muted}>
                    Try one of these sample conversations.
                  </Text>
                  {picks.map((p) => (
                    <TouchableOpacity
                      accessibilityRole="button"
                      key={p.id}
                      style={s.suggestion}
                      onPress={() => ask(p.prompt)}
                    >
                      <Icon name={p.icon} size={18} />
                      <Text style={s.suggestionText}>{p.prompt}</Text>
                      <Icon name="arrow-up-right" size={15} />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                messages.map((m, i) => (
                  <View key={i} style={{ marginBottom: 25 }}>
                    <View style={s.userBubble}>
                      <Text style={s.userText}>{m.text}</Text>
                    </View>
                    <View style={s.assistant}>
                      <Orb small />
                      <Text style={s.reply}>
                        {m.pick
                          ? "Let’s make a little room for the good stuff. Here’s a sample suggestion to get you started."
                          : "I can show sample shopping, dining, travel, and planning experiences. Try “Find headphones under $200”."}
                      </Text>
                    </View>
                    {m.pick && card(m.pick)}
                  </View>
                ))
              )}
            </ScrollView>
            <View style={s.composer}>
              <TextInput
                accessibilityLabel="Message to Mio"
                placeholder="Ask Mio anything…"
                placeholderTextColor="#a594ae"
                style={s.input}
                value={query}
                maxLength={500}
                onChangeText={setQuery}
                onSubmitEditing={() => ask(query)}
                returnKeyType="send"
              />
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Send message"
                disabled={!query.trim()}
                style={[s.send, { opacity: query.trim() ? 1 : 0.4 }]}
                onPress={() => ask(query)}
              >
                <Icon name="arrow-up" color="white" />
              </TouchableOpacity>
            </View>
            <Text style={s.composeNote}>
              Sample suggestions · No live AI or transactions
            </Text>
          </>
        ) : tab === "saved" ? (
          <ScrollView contentContainerStyle={s.homeContent}>
            <Text style={s.eyebrow}>YOUR LITTLE COLLECTION</Text>
            <Text style={s.heading}>Good finds,{"\n"}kept together.</Text>
            <Text style={s.muted}>Saved for this visit.</Text>
            {saved.length ? (
              picks.filter((p) => saved.includes(p.id)).map(card)
            ) : (
              <View style={s.empty}>
                <Icon name="heart" size={45} />
                <Text style={s.emptyTitle}>Something good will go here.</Text>
                <Text style={s.muted}>
                  Save a sample pick from your conversation.
                </Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  style={s.primary}
                  onPress={() => setTab("chat")}
                >
                  <Text style={s.primaryText}>Explore with Mio</Text>
                  <Icon name="arrow-up-right" color="white" />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={s.homeContent}>
            <Text style={s.eyebrow}>YOUR SPACE</Text>
            <Text style={s.heading}>{account ? "Your Mio account." : "A thoughtful start."}</Text>
            {account ? (
              <View style={s.profileCard}>
                <Icon name="user" size={34} />
                <Text style={s.emptyTitle}>Hello, {account.name || account.email}.</Text>
                <Text style={s.muted}>{account.email}</Text>
                <View style={s.planBadge}><Text style={s.planBadgeText}>{account.plan === "business" ? "Business account" : "Personal account"}</Text></View>
                <Text style={[s.muted, { textAlign: "center" }]}>Your sign-in is stored securely on this device. Orders and provider services are not connected yet.</Text>
                <TouchableOpacity accessibilityRole="button" style={s.authSecondary} onPress={() => { signOut(); setAccount(null); }}>
                  <Text style={s.authSecondaryText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            ) : authMode ? (
              <View style={[s.profileCard, s.authCard]}>
                <Text style={s.authTitle}>{authMode === "signup" ? "Create your account" : "Welcome back"}</Text>
                <Text style={[s.muted, { textAlign: "center" }]}>Sign in with the same Mio account you use on the website.</Text>
                {authMode === "signup" && <>
                  <TextInput accessibilityLabel="Full name" placeholder="Full name" placeholderTextColor="#a594ae" style={s.authInput} value={authName} onChangeText={setAuthName} autoComplete="name" />
                  <Text style={s.authLabel}>Account type</Text>
                  <View style={s.planSwitch}>
                    {(["personal", "business"] as const).map((plan) => (
                      <TouchableOpacity key={plan} accessibilityRole="button" accessibilityState={{ selected: accountPlan === plan }} onPress={() => setAccountPlan(plan)} style={[s.planOption, accountPlan === plan && s.planOptionActive]}>
                        <Text style={[s.planOptionText, accountPlan === plan && s.planOptionTextActive]}>{plan === "personal" ? "Personal" : "Business"}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>}
                <TextInput accessibilityLabel="Email address" placeholder="Email address" placeholderTextColor="#a594ae" style={s.authInput} value={authEmail} onChangeText={setAuthEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" />
                <TextInput accessibilityLabel="Password" placeholder="Password (8 characters minimum)" placeholderTextColor="#a594ae" style={s.authInput} value={authPassword} onChangeText={setAuthPassword} secureTextEntry autoCapitalize="none" autoComplete={authMode === "signup" ? "new-password" : "current-password"} />
                {authMode === "signup" && <TouchableOpacity accessibilityRole="checkbox" accessibilityState={{ checked: acceptedTerms }} style={s.consentRow} onPress={() => setAcceptedTerms((checked) => !checked)}>
                  <Icon name={acceptedTerms ? "check-square" : "square"} size={19} color={acceptedTerms ? purple : "#a594ae"} />
                  <Text style={s.consentText}>I agree to Mio’s Terms of Service and Privacy Policy.</Text>
                </TouchableOpacity>}
                {!!authError && <Text accessibilityRole="alert" style={s.authError}>{authError}</Text>}
                <TouchableOpacity accessibilityRole="button" disabled={authLoading || (authMode === "signup" && !acceptedTerms)} style={[s.primary, { opacity: authLoading || (authMode === "signup" && !acceptedTerms) ? 0.55 : 1 }]} onPress={submitAuth}>
                  <Text style={s.primaryText}>{authLoading ? "Please wait…" : authMode === "signup" ? "Create account" : "Sign in"}</Text>
                  {!authLoading && <Icon name="arrow-up-right" color="white" />}
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" style={s.authSecondary} onPress={() => { setAuthMode(authMode === "signup" ? "signin" : "signup"); setAuthError(""); }}>
                  <Text style={s.authSecondaryText}>{authMode === "signup" ? "Already have an account? Sign in" : "New to Mio? Create an account"}</Text>
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" style={s.authSecondary} onPress={() => { setAuthMode(null); setAuthError(""); }}>
                  <Text style={s.authCancel}>Back to profile</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={s.profileCard}>
                <Icon name="user" size={34} />
                <Text style={s.emptyTitle}>Make Mio yours.</Text>
                <Text style={[s.muted, { textAlign: "center" }]}>Sign in or create a personal or business account. Account access uses Mio’s PocketBase service.</Text>
                <TouchableOpacity accessibilityRole="button" style={s.primary} onPress={() => { setAuthMode("signin"); setAuthError(""); }}>
                  <Text style={s.primaryText}>Sign in</Text><Icon name="arrow-up-right" color="white" />
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" style={s.authSecondary} onPress={() => { setAuthMode("signup"); setAuthError(""); }}>
                  <Text style={s.authSecondaryText}>Create an account</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={s.sectionTitle}>Designed with you in mind</Text>
            {[
              [
                "shield",
                "Your information",
                account ? "Sign-in credentials are stored in device secure storage. Connect the production backend before using real orders or payment details." : "No account is needed to explore. Sign-in becomes available when the PocketBase server is reachable.",
              ],
              [
                "message-circle",
                "Your conversations",
                "Demo conversations and saved picks stay in memory until you close the app.",
              ],
              [
                "smartphone",
                "What’s coming",
                "Live AI, provider discovery, voice, and payments need connected services before launch.",
              ],
            ].map(([icon, title, desc]) => (
              <View key={title} style={s.profileRow}>
                <Icon name={icon} />
                <View style={{ flex: 1 }}>
                  <Text style={s.bannerTitle}>{title}</Text>
                  <Text style={s.bannerText}>{desc}</Text>
                </View>
              </View>
            ))}
            <Text style={[s.sectionTitle, { marginTop: 24, marginBottom: 8 }]}>Your preferences</Text>
            <View style={s.profileRow}>
              <Icon name="mic" />
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>Voice conversations</Text>
                <Text style={s.bannerText}>Preview preference only; voice input is not connected.</Text>
              </View>
              <Switch value={voiceEnabled} onValueChange={setVoiceEnabled} trackColor={{ true: purple }} accessibilityLabel="Voice conversations" />
            </View>
            <View style={s.profileRow}>
              <Icon name="bell" />
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>Helpful reminders</Text>
                <Text style={s.bannerText}>Preview preference only; no reminders are scheduled.</Text>
              </View>
              <Switch value={remindersEnabled} onValueChange={setRemindersEnabled} trackColor={{ true: purple }} accessibilityLabel="Helpful reminders" />
            </View>
            <View style={s.profileRow}>
              <Icon name="bookmark" />
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>Remember my interests</Text>
                <Text style={s.bannerText}>Preview preference only; sample results stay fixed.</Text>
              </View>
              <Switch value={memoryEnabled} onValueChange={setMemoryEnabled} trackColor={{ true: purple }} accessibilityLabel="Remember my interests" />
            </View>
            <View style={[s.profileCard, { alignItems: "flex-start", marginTop: 22 }]}>
              <Text style={s.sectionTitle}>Integration directory</Text>
              <Text style={[s.muted, { marginTop: 8 }]}>
                Mio is designed for shopping, food, groceries, travel, events, local services, payments, and in-store experiences. Provider connections are prospective and are not active in this preview.
              </Text>
              <View style={s.integrationChips}>
                {["Amazon · concept", "DoorDash · concept", "Booking.com · concept", "Ticketmaster · concept", "Stripe · concept"].map((name) => (
                  <View key={name} style={s.integrationChip}><Text style={s.integrationChipText}>{name}</Text></View>
                ))}
              </View>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              style={s.resetButton}
              onPress={() => {
                setMessages([]);
                setSaved([]);
                setVoiceEnabled(false);
                setRemindersEnabled(true);
                setMemoryEnabled(true);
                setWelcome(true);
                setTab("home");
              }}
            >
              <Text style={{ color: purple }}>Reset this preview</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
        <SafeAreaView edges={["bottom"]} style={s.tabSafe}>
          <View style={s.tabs}>
            {[
              ["home", "home", "Explore"],
              ["chat", "message-circle", "Ask Mio"],
              ["saved", "heart", "Saved"],
              ["profile", "user", "You"],
            ].map(([id, icon, label]) => (
              <TouchableOpacity
                accessibilityRole="tab"
                accessibilityState={{ selected: tab === id }}
                key={id}
                style={s.tab}
                onPress={() => setTab(id)}
              >
                <Icon
                  name={icon}
                  size={21}
                  color={tab === id ? purple : "#aa9cb3"}
                />
                <Text
                  style={[
                    s.tabLabel,
                    { color: tab === id ? purple : "#aa9cb3" },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fffefa" },
  welcome: { flex: 1, backgroundColor: "#fffefa" },
  welcomeImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "68%",
    resizeMode: "cover",
  },
  imageFade: { position: "absolute", top: "37%", width: "100%", height: "32%" },
  welcomeContent: { flex: 1, paddingHorizontal: 28, paddingBottom: 16 },
  welcomeTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  logo: {
    fontSize: 39,
    fontWeight: "900",
    letterSpacing: -2.5,
    color: "#292231",
  },
  badge: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: "#887294",
    backgroundColor: "#ffffffbb",
    padding: 8,
    borderRadius: 20,
  },
  eyebrow: {
    fontSize: 8,
    letterSpacing: 1.8,
    color: "#8c799c",
    fontWeight: "700",
  },
  welcomeTitle: {
    fontSize: 48,
    letterSpacing: -2,
    lineHeight: 52,
    fontWeight: "600",
    color: "#292231",
    marginVertical: 16,
  },
  welcomeDescription: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8a7995",
    maxWidth: 300,
    marginBottom: 22,
  },
  primary: {
    backgroundColor: purple,
    borderRadius: 12,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  primaryText: { fontSize: 14, fontWeight: "600", color: "white" },
  disclaimer: {
    textAlign: "center",
    fontSize: 9,
    color: "#a090aa",
    marginTop: 15,
  },
  topbar: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  avatar: {
    marginLeft: "auto",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1e8f7",
    alignItems: "center",
    justifyContent: "center",
  },
  homeContent: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 30 },
  heading: {
    fontSize: 32,
    letterSpacing: -1.3,
    lineHeight: 38,
    fontWeight: "600",
    color: "#292231",
    marginTop: 12,
    marginBottom: 15,
  },
  homeOrb: { alignItems: "center", paddingTop: 15, paddingBottom: 23 },
  orb: {
    width: 95,
    height: 95,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#e5d5f6",
    shadowColor: purple,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 4,
  },
  orbSmall: { height: 35, width: 35, borderWidth: 2 },
  orbGloss: { position: "absolute", top: 10, left: 14, width: 32, height: 14, backgroundColor: "#ffffff55", borderRadius: 20, transform: [{ rotate: "-28deg" }] },
  orbCaption: { fontSize: 10, color: "#ab93bb", marginTop: 14 },
  askButton: {
    borderWidth: 1,
    borderColor: "#e3d6ec",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  placeholder: { fontSize: 13, color: "#a08bad" },
  sectionHead: {
    marginTop: 28,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#3a2d45" },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 13,
  },
  category: { width: "47%", padding: 18, borderRadius: 20, minHeight: 145, borderWidth: 1, borderColor: "#ffffffaa", shadowColor: "#69468c", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 2 },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4c3b59",
    marginTop: 20,
  },
  categoryPrompt: {
    fontSize: 10,
    color: "#9a849f",
    lineHeight: 15,
    marginTop: 5,
  },
  softBanner: {
    flexDirection: "row",
    gap: 14,
    padding: 19,
    backgroundColor: "#f4eff8",
    borderRadius: 14,
    marginTop: 24,
  },
  bannerTitle: { fontSize: 12, fontWeight: "600", color: "#5c476c" },
  bannerText: { fontSize: 11, lineHeight: 18, color: "#9c87aa", marginTop: 5 },
  tabSafe: {
    borderTopWidth: 1,
    borderTopColor: "#eee5f2",
    backgroundColor: "#fffefa",
  },
  tabs: { flexDirection: "row", paddingVertical: 12 },
  tab: { flex: 1, alignItems: "center", gap: 6 },
  tabLabel: { fontSize: 9, fontWeight: "600" },
  chatHeader: {
    paddingHorizontal: 25,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatContent: { padding: 24, flexGrow: 1 },
  chatWelcome: { alignItems: "center", paddingTop: 20 },
  chatTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#382b42",
    letterSpacing: -0.7,
    marginTop: 23,
    marginBottom: 10,
  },
  muted: { fontSize: 11, lineHeight: 19, color: "#a18bad" },
  suggestion: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e8dfee",
    borderRadius: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  suggestionText: { fontSize: 11, flex: 1, color: "#806b91" },
  userBubble: {
    backgroundColor: "#eee3f9",
    alignSelf: "flex-end",
    padding: 15,
    borderRadius: 17,
    borderBottomRightRadius: 3,
    maxWidth: "85%",
  },
  userText: { fontSize: 12, color: "#714d8d", lineHeight: 19 },
  assistant: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
    alignItems: "flex-start",
  },
  reply: { flex: 1, fontSize: 12, lineHeight: 21, color: "#857090" },
  pick: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderRadius: 15,
    marginTop: 17,
  },
  pickIcon: {
    width: 48,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff88",
    borderRadius: 11,
  },
  micro: { fontSize: 6, letterSpacing: 1, color: "#9c82ac" },
  pickTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5c436d",
    marginTop: 5,
  },
  pickDetail: { fontSize: 8, lineHeight: 13, color: "#9b81aa", marginTop: 3 },
  pickPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: "#75538a",
    marginTop: 8,
  },
  heart: { padding: 10, backgroundColor: "#ffffffaa", borderRadius: 22 },
  composer: {
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dccce8",
    borderRadius: 14,
    padding: 8,
    gap: 10,
  },
  input: { flex: 1, fontSize: 13, padding: 8, color: "#554361" },
  send: { backgroundColor: purple, padding: 10, borderRadius: 10 },
  composeNote: {
    fontSize: 8,
    color: "#ac9ab7",
    textAlign: "center",
    padding: 9,
  },
  empty: { alignItems: "center", gap: 20, paddingTop: 70 },
  emptyTitle: {
    fontSize: 18,
    color: "#5a456a",
    fontWeight: "500",
    textAlign: "center",
  },
  profileCard: {
    padding: 30,
    backgroundColor: "#f0e8f8",
    borderRadius: 20,
    alignItems: "center",
    gap: 15,
    marginVertical: 25,
  },
  authCard: { alignItems: "stretch", padding: 22, gap: 12 },
  authTitle: { fontSize: 20, fontWeight: "700", color: "#382b42", textAlign: "center" },
  authLabel: { fontSize: 11, fontWeight: "600", color: "#806b91", marginBottom: -5 },
  authInput: { width: "100%", borderWidth: 1, borderColor: "#dccce8", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: "#fff", color: "#554361", fontSize: 13 },
  planSwitch: { flexDirection: "row", gap: 8 },
  planOption: { flex: 1, paddingVertical: 11, borderWidth: 1, borderColor: "#dccce8", borderRadius: 11, alignItems: "center", backgroundColor: "#fff" },
  planOptionActive: { borderColor: purple, backgroundColor: "#f2ebff" },
  planOptionText: { color: "#806b91", fontSize: 12, fontWeight: "600" },
  planOptionTextActive: { color: purple },
  planBadge: { backgroundColor: "#fff", borderRadius: 20, paddingVertical: 7, paddingHorizontal: 13 },
  planBadgeText: { fontSize: 11, fontWeight: "600", color: purple },
  consentRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 4 },
  consentText: { flex: 1, color: "#806b91", fontSize: 10, lineHeight: 16 },
  authError: { backgroundColor: "#fff0f0", color: "#9f3434", borderRadius: 10, padding: 11, fontSize: 11, lineHeight: 17 },
  authSecondary: { alignItems: "center", paddingVertical: 7 },
  authSecondaryText: { color: purple, fontSize: 12, fontWeight: "600" },
  authCancel: { color: "#9c87aa", fontSize: 11 },
  profileRow: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 23,
    borderBottomWidth: 1,
    borderBottomColor: "#eee4f3",
  },
  integrationChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  integrationChip: { backgroundColor: "#fff", borderRadius: 18, paddingVertical: 7, paddingHorizontal: 10 },
  integrationChipText: { color: "#6542a0", fontSize: 11, fontWeight: "600" },
  resetButton: { padding: 20, alignItems: "center", marginTop: 20 },
});
