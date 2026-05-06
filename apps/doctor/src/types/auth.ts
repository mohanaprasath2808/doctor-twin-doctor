import type { ApiSessionUser } from "./session";

export type SetIsLoginValue = boolean | ((prev: boolean) => boolean);

export type SetUserDataValue =
  | ApiSessionUser
  | null
  | ((prev: ApiSessionUser | null) => ApiSessionUser | null);

export type SetLocalStorageUserDataValue =
  | ApiSessionUser
  | null
  | ((prev: ApiSessionUser | null) => ApiSessionUser | null);

export type AuthState = {
  isLogin: boolean;
  setIsLogin: (value: SetIsLoginValue) => void;
  userData: ApiSessionUser | null;
  setUserData: (value: SetUserDataValue) => void;
  localStorageUserData: ApiSessionUser | null;
  setLocalStorageUserData: (value: SetLocalStorageUserDataValue) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string | null; refreshToken: string | null }) => void;
  isLoadingUser: boolean;
  userError: string | null;
  hydrateFromStorage: () => Promise<void>;
  getUser: () => Promise<ApiSessionUser | null>;
  logout: () => Promise<void>;
};
