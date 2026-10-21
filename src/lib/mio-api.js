async function request(resource, options = {}) {
  const response = await fetch(`/api/data/${resource}`, {
    credentials: "include",
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Mio could not complete that request.");
  return payload;
}

export const mioApi = {
  submitWaitlist: (body) => request("waitlist", { method: "POST", body }),
  submitPartnerSignup: (body) => request("partner-signups", { method: "POST", body }),
  saveSearch: (body) => request("searches", { method: "POST", body }),
  getSearches: () => request("searches"),
  getOrders: () => request("orders"),
  getSubscriptions: () => request("subscriptions"),
  getCommissions: () => request("commissions"),
};
