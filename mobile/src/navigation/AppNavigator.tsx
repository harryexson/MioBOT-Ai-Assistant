import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";

// ── Tab icon ──────────────────────────────────────────────────────────────────

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {focused ? (
        <LinearGradient
          colors={["#7c3aed", "#4f46e5"]}
          style={{ width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>{emoji}</Text>
        </LinearGradient>
      ) : (
        <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, opacity: 0.5 }}>{emoji}</Text>
        </View>
      )}
    </View>
  );
}

// ── Bottom tab navigator ──────────────────────────────────────────────────────

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          paddingTop: 6,
          paddingBottom: 8,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },
        tabBarActiveTintColor: "#7c3aed",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatScreen}
        initialParams={{}}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💬" focused={focused} />,
          tabBarLabel: "Ask Mio",
        }}
      />
      <Tab.Screen
        name="Orders"
        component={HomeScreen} // replace with OrdersScreen when built
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📦" focused={focused} />,
          tabBarLabel: "Orders",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen} // replace with ProfileScreen when built
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

// ── Root stack navigator ──────────────────────────────────────────────────────

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
