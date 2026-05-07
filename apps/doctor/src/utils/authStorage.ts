import type { ApiSessionUser } from "../types/session";
import { deleteSecureItem, getSecureItem, setSecureItem } from "./secureStorage";

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: `access_token`,
  REFRESH_TOKEN: `refresh_token`,
  USER_DATA: `user_data`,
  ONBOARDING_COMPLETED: "onboarding_completed",
} as const;
export async function getAccessToken(): Promise<string | null> {
  return getSecureItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return getSecureItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
}

export async function getStoredSessionUser(): Promise<ApiSessionUser | null> {
  const raw = await getSecureItem(AUTH_STORAGE_KEYS.USER_DATA);

  if (!raw) return null;
  try {
    return JSON.parse(raw) as ApiSessionUser;
  } catch {
    return null;
  }
}

/** True when an access token is stored (logged-in session). */
export async function hasAuthSession(): Promise<boolean> {
  const t = await getAccessToken();
  return t != null && t.length > 0;
}

export async function hasCompletedOnboarding(): Promise<boolean> {
  const raw = await getSecureItem(AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED);
  return raw === "true";
}

export async function setCompletedOnboarding(value: boolean): Promise<void> {
  await setSecureItem(AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED, value ? "true" : "false");
}

export async function clearAuthSession(): Promise<void> {
  await Promise.all([
    deleteSecureItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN),
    deleteSecureItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN),
    deleteSecureItem(AUTH_STORAGE_KEYS.USER_DATA),
    deleteSecureItem(AUTH_STORAGE_KEYS.ONBOARDING_COMPLETED),
  ]);
}
