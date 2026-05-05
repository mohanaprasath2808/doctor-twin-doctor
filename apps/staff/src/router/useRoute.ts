import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export type AuthStackRoute = "loading" | "auth" | "app";

export const useRoute = (): AuthStackRoute => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useRoute must be used within AuthContextProvider");
  }

  const { isHydrated, isLogin } = context;
  if (!isHydrated) {
    return "loading";
  }
  return isLogin ? "app" : "auth";
};
