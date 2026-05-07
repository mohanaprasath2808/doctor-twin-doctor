import { deleteSecureItem, getSecureItem } from "./secureStorge";

export const AUTH_LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: `access_token`,
  REFRESH_TOKEN: `refresh_token`,
  USER_DATA: `user_data`,
  ONBOARDING_COMPLETED: "onboarding_completed",
} as const;

//GET ACCESS TOKEN
export const getAccessToken = async () => {
  return await getSecureItem(AUTH_LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
};

//GET REFRESH TOKEN
export const getRefreshToken = async () => {
  return await getSecureItem(AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

//GET USER DATA
export const getUserData = async () => {
  return await getSecureItem(AUTH_LOCAL_STORAGE_KEYS.USER_DATA);
};

//GET ONBOARDING COMPLETED
export const getOnboardingCompleted = async () => {
  return await getSecureItem(AUTH_LOCAL_STORAGE_KEYS.ONBOARDING_COMPLETED);
};

export const clearAuthSession = async () => {
  await Promise.all([
    deleteSecureItem(AUTH_LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
    deleteSecureItem(AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN),
    deleteSecureItem(AUTH_LOCAL_STORAGE_KEYS.USER_DATA),
    deleteSecureItem(AUTH_LOCAL_STORAGE_KEYS.ONBOARDING_COMPLETED),
  ]);
};
