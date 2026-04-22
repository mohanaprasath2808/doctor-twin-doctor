import * as SecureStore from "expo-secure-store";

const LOCAL_SESSION_KEY = "doctor_local_session_v1";

function randomUuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function getLocalSessionId(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(LOCAL_SESSION_KEY);
  } catch {
    return null;
  }
}

export async function hasLocalSession(): Promise<boolean> {
  const id = await getLocalSessionId();
  return id != null && id.length > 0;
}

/** Call once after first successful sign-in (demo: Emergency Access). Creates a local session until API tokens exist. */
export async function ensureLocalSessionId(): Promise<string> {
  const existing = await getLocalSessionId();
  if (existing) return existing;
  const id = randomUuid();
  await SecureStore.setItemAsync(LOCAL_SESSION_KEY, id);
  return id;
}

export async function clearLocalSession(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(LOCAL_SESSION_KEY);
  } catch {
    // ignore
  }
}
