import PocketBase from 'pocketbase';
export const backendConfigured = Boolean(import.meta.env.VITE_POCKETBASE_URL);
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');
export const unavailableMessage = 'Account and application services are not connected in this preview. You can explore Mio without signing in.';
pb.beforeSend = (url, options) => {
  if (!backendConfigured) throw new Error(unavailableMessage);
  return { url, options };
};
