import { openDB } from "idb";

const DB_NAME = "DigitalKrishiDB";
const STORE_NAME = "offline_sync_queue";

// Initialize IndexedDB
async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

// Save field log or query locally when offline
export async function saveOfflineAction(actionType, payload) {
  const db = await initDB();
  const entry = {
    actionType,
    payload,
    timestamp: new Date().toISOString()
  };
  await db.add(STORE_NAME, entry);
  console.log("[IndexedDB] Offline action queued:", entry);
}

// Synchronize queued actions with Express server when online
export async function syncOfflineQueue() {
  if (!navigator.onLine) return;

  const db = await initDB();
  const allQueue = await db.getAll(STORE_NAME);

  if (allQueue.length === 0) return;

  console.log(`[Offline Sync] Flushing ${allQueue.length} queued records to server...`);

  for (const item of allQueue) {
    try {
      const response = await fetch("/api/sync/offline-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        await db.delete(STORE_NAME, item.id);
      }
    } catch (err) {
      console.error("[Offline Sync Error] Server sync failed for item:", item.id);
      break; // Stop syncing until next reconnection event
    }
  }
}

// Listen for network connectivity online event
if (typeof window !== "undefined") {
  window.addEventListener("online", syncOfflineQueue);
}
