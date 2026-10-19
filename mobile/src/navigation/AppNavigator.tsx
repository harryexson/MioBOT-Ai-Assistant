import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import VoiceChatScreen from "../screens/VoiceChatScreen";
import HotelSearchScreen from "../screens/HotelSearchScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import FlightSearchScreen from "../screens/FlightSearchScreen";
import NFCScreen from "../screens/NFCScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

function TabIcon({ emoji, focused, badge }: { emoji: string; focused: boolean; badge?: number }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {focused ? (
        <LinearGradient
          colors={["#7c3aed", "#4f46e5"]}
          style={{ width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 22 }}>{emoji}</Text>
        </LinearGradient>
      ) : (
        <View style={{ width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22, opacity: 0.5 }}>{emoji}</Text>
        </View>
      )}
      {badge && badge > 0 ? (
        <View style={{
          position: "absolute", top: 0, right: 0,
          backgroundColor: "#ef4444", borderRadius: 8, minWidth: 16, height: 16,
          alignItems: "center", justifyContent: "center", paddingHorizontal: 3
        }}>
          <Text style={{ color: "#fff", fontSize: 9, fontWeight: "800" }}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ede9fe",
          paddingBottom: 8,
          paddingTop: 6,
          height: 72,
        },
        tabBarActiveTintColor: "#7c3aed",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 2 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🤖" focused={focused} />,
          tabBarLabel: "Ask Mio",
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📦" focused={focused} badge={2} />,
          tabBarLabel: "Orders",
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        {/* Auth */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />

        {/* Main app (tabs) */}
        <Stack.Screen name="Main" component={MainTabs} options={{ animation: "fade" }} />

        {/* Modal-style screens */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="VoiceChat" component={VoiceChatScreen} options={{ presentation: "fullScreenModal", animation: "fade" }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ presentation: "card" }} />

        {/* Detail screens */}
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="OrderDetail" component={OrdersScreen} />

        {/* Service screens */}
        <Stack.Screen name="HotelSearch" component={HotelSearchScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="FlightSearch" component={FlightSearchScreen} />
        <Stack.Screen name="NFC" component={NFCScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Checkout" component={CartScreen} />

        {/* Profile sub-screens */}
        <Stack.Screen name="EditProfile" component={ProfileScreen} />
        <Stack.Screen name="Addresses" component={ProfileScreen} />
        <Stack.Screen name="PaymentMethods" component={ProfileScreen} />
        <Stack.Screen name="VoiceSettings" component={ProfileScreen} />
        <Stack.Screen name="ShoppingPrefs" component={ProfileScreen} />
        <Stack.Screen name="History" component={OrdersScreen} />
        <Stack.Screen name="Privacy" component={ProfileScreen} />
        <Stack.Screen name="Help" component={ProfileScreen} />
        <Stack.Screen name="Support" component={ChatScreen} />
        <Stack.Screen name="Rate" component={ProfileScreen} />
        <Stack.Screen name="Terms" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
