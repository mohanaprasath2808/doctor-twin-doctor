import { useAuthStore } from "../store/useAuthStore";

export const useRoute = () => {
  const isLogin = useAuthStore((s) => s.isLogin);
  return isLogin ? "app" : "auth";
};
