import PocketBase from 'pocketbase';
const configuredBaseUrl = import.meta.env.VITE_POCKETBASE_URL?.trim();
export const backendUrl = (configuredBaseUrl || 'https://pb-mzj62.aibuilder.ionos.com').replace(/\/$/, '');
export const backendConfigured = Boolean(backendUrl);
export const pb = new PocketBase(backendUrl);
export const unavailableMessage = 'Account and application services are not connected in this preview. You can explore Mio without signing in.';
pb.beforeSend = (url, options) => {
  if (!backendConfigured) throw new Error(unavailableMessage);
  return { url, options };
};
