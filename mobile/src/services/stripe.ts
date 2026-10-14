/**
 * Stripe payments — React Native
 *
 * Uses @stripe/stripe-react-native.
 * The publishable key (safe for client) comes from your .env.
 * The secret key NEVER lives here — only on your server.
 *
 * Setup:
 *   1. Add <StripeProvider publishableKey={...}> at the root of App.tsx
 *   2. Your backend creates PaymentIntents and returns the clientSecret
 *   3. This file calls useStripe() hooks to complete the payment
 */

import { useStripe } from "@stripe/stripe-react-native";
import { createCheckoutSession, confirmOrder } from "./mioApi";

export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

// ── Payment sheet ─────────────────────────────────────────────────────────────

interface UsePaymentSheetResult {
  pay: (items: Parameters<typeof createCheckoutSession>[0]) => Promise<{ success: boolean; orderId?: string }>;
}

/**
 * Hook — call inside a component wrapped by <StripeProvider>.
 *
 * Usage:
 *   const { pay } = useMioPayment();
 *   const result = await pay(cartItems);
 */
export function useMioPayment(): UsePaymentSheetResult {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  async function pay(items: Parameters<typeof createCheckoutSession>[0]) {
    // 1. Create a Stripe PaymentIntent on your server via Mio API
    const { clientSecret, orderId } = await createCheckoutSession(items);

    // 2. Initialise the Stripe Payment Sheet
    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Mio AI",
      googlePay: {
        merchantCountryCode: "US",
        testEnv: true, // set false in production
      },
      applePay: {
        merchantCountryCode: "US",
      },
      style: "automatic",
    });

    if (initError) throw new Error(initError.message);

    // 3. Present the sheet — user selects/adds payment method
    const { error: presentError } = await presentPaymentSheet();
    if (presentError) {
      if (presentError.code === "Canceled") return { success: false };
      throw new Error(presentError.message);
    }

    // 4. Confirm the order in Mio backend
    await confirmOrder(orderId, "completed");

    return { success: true, orderId };
  }

  return { pay };
}

// ── Apple Pay / Google Pay one-tap ───────────────────────────────────────────

export function useMioExpressPay() {
  const { confirmPlatformPayPayment } = useStripe();

  async function expressCheckout(clientSecret: string, amount: number, currency = "usd") {
    const { error } = await confirmPlatformPayPayment(clientSecret, {
      googlePay: {
        testEnv: true,
        merchantName: "Mio AI",
        merchantCountryCode: "US",
        currencyCode: currency.toUpperCase(),
        billingAddressConfig: { format: "FULL", isPhoneNumberRequired: true },
      },
      applePay: {
        cartItems: [{ label: "Mio Order", amount: String(amount / 100), paymentType: "Immediate" }],
        merchantCountryCode: "US",
        currencyCode: currency.toUpperCase(),
        requiredBillingContactFields: ["phoneNumber", "postalAddress"],
      },
    });

    if (error) throw new Error(error.message);
    return { success: true };
  }

  return { expressCheckout };
}
