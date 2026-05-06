import { create } from "zustand";

import type { AuthState } from "../types/auth";
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  getStoredSessionUser,
} from "../utils/authStorage";
import { handleGetUser } from "../service/authService";
import type { ApiSessionUser } from "../types/session";

export type {
  AuthState,
  SetIsLoginValue,
  SetLocalStorageUserDataValue,
  SetUserDataValue,
} from "../types/auth";

export const useAuthStore = create<AuthState>((set, get) => ({
  isLogin: false,
  setIsLogin: (value) =>
    set((state) => ({
      isLogin: typeof value === "function" ? value(state.isLogin) : value,
    })),
  userData: null,
  setUserData: (value) =>
    set((state) => ({
      userData: typeof value === "function" ? value(state.userData) : value,
    })),
  localStorageUserData: null,
  setLocalStorageUserData: (value) =>
    set((state) => ({
      localStorageUserData: typeof value === "function" ? value(state.localStorageUserData) : value,
    })),
  accessToken: null,
  refreshToken: null,
  setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
  isLoadingUser: false,
  userError: null,
  hydrateFromStorage: async () => {
    const [user, accessToken, refreshToken] = await Promise.all([
      getStoredSessionUser(),
      getAccessToken(),
      getRefreshToken(),
    ]);
    set({ localStorageUserData: user, accessToken, refreshToken });
  },
  getUser: async () => {
    set({ isLoadingUser: true, userError: null });
    try {
      const data = (await handleGetUser()) as ApiSessionUser;
      console.log(data, "data in getUser");
      set({ userData: data, isLoadingUser: false });
      return data;
    } catch (e: any) {
      set({
        isLoadingUser: false,
        userError: e?.message ?? "Failed to fetch user",
      });
      return null;
    }
  },
  logout: async () => {
    await clearAuthSession();
    set({
      isLogin: false,
      userData: null,
      localStorageUserData: null,
      accessToken: null,
      refreshToken: null,
      isLoadingUser: false,
      userError: null,
    });
  },
}));
