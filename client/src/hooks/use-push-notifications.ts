import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./use-auth";

/**
 * Hook for Web Push notification subscription management.
 * Handles VAPID key fetching, permission requests, and subscription sync.
 */
export function usePushNotifications() {
  const { user } = useAuth();
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [loading, setLoading] = useState(false);

  // Check browser support
  useEffect(() => {
    const supported = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  // Check if already subscribed when user is authenticated
  useEffect(() => {
    if (!isSupported || !user) return;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        setIsSubscribed(!!sub);
      } catch {
        // Ignore errors
      }
    })();
  }, [isSupported, user]);

  const subscribe = useCallback(async () => {
    if (!isSupported || !user) return false;
    setLoading(true);

    try {
      // Get VAPID key from server
      const keyRes = await fetch("/api/push/vapid-key");
      const { key, configured } = await keyRes.json();
      if (!configured || !key) {
        console.log("[push] Server push not configured");
        return false;
      }

      // Request notification permission
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return false;

      // Subscribe via Push API
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      });

      // Send subscription to server
      const subJson = subscription.toJSON();
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          endpoint: subJson.endpoint,
          keys: subJson.keys,
        }),
      });

      setIsSubscribed(true);
      return true;
    } catch (err) {
      console.error("[push] Subscribe error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isSupported, user]);

  const unsubscribe = useCallback(async () => {
    if (!isSupported) return false;
    setLoading(true);

    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        // Unsubscribe from browser
        await subscription.unsubscribe();

        // Remove from server
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
      }

      setIsSubscribed(false);
      return true;
    } catch (err) {
      console.error("[push] Unsubscribe error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isSubscribed,
    permission,
    loading,
    subscribe,
    unsubscribe,
  };
}

// Convert VAPID key from base64 URL to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
