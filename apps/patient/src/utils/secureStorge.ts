import * as SecureStore from "expo-secure-store";

//SET SECURE ITEM
export const setSecureItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

//GET SECURE ITEM
export const getSecureItem = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

//DELETE SECURE ITEM
export const deleteSecureItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
