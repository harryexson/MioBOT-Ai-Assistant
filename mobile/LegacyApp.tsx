import React, { useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "./src/services/stripe";
import AppNavigator from "./src/navigation/AppNavigator";
import { supabase } from "./src/services/supabase";
import { useMioStore } from "./src/store/useStore";

export default function App() {
  const setUser = useMioStore((s) => s.setUser);

  useEffect(() => {
    // Restore session on app launch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY} merchantIdentifier="merchant.com.mioai.app">
      <AppNavigator />
    </StripeProvider>
  );
}
