/**
 * Web Push Notification Service
 * 
 * Uses the Web Push API (VAPID) for browser push notifications.
 * 
 * SAFETY MEASURES:
 * - Non-blocking sends (fire-and-forget)
 * - Individual subscription errors don't affect others
 * - Automatic cleanup of expired/invalid subscriptions
 * - Concurrency-limited batch sending
 * 
 * Environment variables:
 *   VAPID_PUBLIC_KEY     - VAPID public key (generate with web-push)
 *   VAPID_PRIVATE_KEY    - VAPID private key
 *   VAPID_SUBJECT        - Contact email (e.g., "mailto:admin@avivandoelfuego.org")
 */

import webPush from "web-push";

// ─── Configuration ───────────────────────────────────────────────────────────

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@avivandoelfuego.org";

export const isPushConfigured = !!(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);

if (isPushConfigured) {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  console.log("[push] Web Push notifications configured");
} else {
  console.log("[push] Web Push disabled (set VAPID_PUBLIC_KEY + VAPID_PRIVATE_KEY to enable)");
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
}

// ─── Send to single subscription ────────────────────────────────────────────

/**
 * Send a push notification to a single subscription.
 * Returns false if the subscription is expired/invalid (should be removed).
 */
export async function sendPushToSubscription(
  subscription: PushSubscriptionData,
  payload: PushPayload,
  opciones?: { ttl?: number }
): Promise<boolean> {
  if (!isPushConfigured) return false;

  try {
    await webPush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
      JSON.stringify(payload),
      // 10 s por envío; ttl: cuánto espera el servicio de avisos si el teléfono está apagado (los del juego vencen)
      { timeout: 10_000, ...(opciones?.ttl ? { TTL: Math.round(opciones.ttl) } : {}) }
    );
    return true;
  } catch (error: unknown) {
    const statusCode = (error as { statusCode?: number })?.statusCode;
    if (statusCode === 410 || statusCode === 404) {
      // Gone or Not Found — subscription expired, should be cleaned up
      return false;
    }
    console.error(`[push] Failed to send to ${subscription.endpoint.slice(0, 50)}...:`, 
      error instanceof Error ? error.message : error);
    return true; // Keep subscription (might be a temporary error)
  }
}

/**
 * Send push notification to multiple subscriptions.
 * Returns array of endpoints that should be removed (expired).
 */
export async function sendPushToMany(
  subscriptions: Array<{ id: number; subscription: PushSubscriptionData }>,
  payload: PushPayload,
  opciones?: { ttl?: number }
): Promise<number[]> {
  if (!isPushConfigured || subscriptions.length === 0) return [];

  const BATCH_SIZE = 10; // Send 10 at a time to avoid overwhelming
  const expiredIds: number[] = [];

  for (let i = 0; i < subscriptions.length; i += BATCH_SIZE) {
    const batch = subscriptions.slice(i, i + BATCH_SIZE);
    
    const results = await Promise.allSettled(
      batch.map(async ({ id, subscription }) => {
        const alive = await sendPushToSubscription(subscription, payload, opciones);
        if (!alive) expiredIds.push(id);
      })
    );

    // Log any rejected promises (shouldn't happen, but just in case)
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[push] Unexpected rejection:", result.reason);
      }
    }
  }

  return expiredIds;
}

/**
 * Get the VAPID public key for client-side subscription.
 */
export function getVapidPublicKey(): string {
  return VAPID_PUBLIC_KEY;
}

/**
 * Generate VAPID keys (utility for initial setup).
 * Run: npx tsx -e "import('./server/push').then(m => console.log(m.generateVapidKeys()))"
 */
export function generateVapidKeys(): { publicKey: string; privateKey: string } {
  return webPush.generateVAPIDKeys();
}
