import type { ApiSessionUser } from "./session";

export type SetIsLoginValue = boolean | ((prev: boolean) => boolean);

export type SetUserDataValue =
  | ApiSessionUser
  | null
  | ((prev: ApiSessionUser | null) => ApiSessionUser | null);

export type AuthState = {
  isLogin: boolean;
  setIsLogin: (value: SetIsLoginValue) => void;
  /** Mirrors `USER_DATA` in secure storage; hydrate on launch and update when session changes. */
  userData: ApiSessionUser | null;
  setUserData: (value: SetUserDataValue) => void;
  hydrateFromStorage: () => Promise<void>;
};
