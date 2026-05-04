import { create } from "zustand";

import type { AuthState } from "../types/auth";
import { getStoredSessionUser } from "../utils/authStorage";

export type { AuthState, SetIsLoginValue, SetUserDataValue } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
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
  hydrateFromStorage: async () => {
    const user = await getStoredSessionUser();
    set({ userData: user });
  },
}));
