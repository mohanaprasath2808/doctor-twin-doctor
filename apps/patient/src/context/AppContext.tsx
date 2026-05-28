import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { APPOINTMENT_URL, FETCH_APPOINTMENTS_URL } from "../constants/url";
import { AuthContext } from "./AuthContext";
import { getAccessToken } from "../utils/authStorage";

export interface AppContextType {
  notificationsCount: number;
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
  fetchAppointments: (
    status?: string,
    filter? : string,
    page?: number,
    limit?: number,
  ) => Promise<{ ok: boolean; data?: any; error?: string }>;
  loadingAppointments: boolean;
  createAppointment: (payload: Record<string, any>) => Promise<{ ok: boolean; data?: any; error?: string }>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [loadingAppointments, setLoadingAppointments] = useState<boolean>(false);
  const toast = useToast();
  const authContext = useContext(AuthContext);

  const fetchAppointments = useCallback(
    async (status?: string, filter?: string, page: number = 1, limit: number = 10) => {
      setLoadingAppointments(true);
      const requestBody = {...(status && { status }), ...(filter && { filter }), page, limit};

      const accessToken =
        (await authContext?.validateToken?.()) ?? (await getAccessToken()) ?? null;

      if (!accessToken) {
        const message = "Please login again";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      }

      try {
        const request = await fetch(FETCH_APPOINTMENTS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify(requestBody),
        });

        const response: any = await request.json();
        if (response?.ok) {
          return { ok: true, data: response?.data };
        }
        return { ok: false, error: response?.error || "Something went wrong." };
      } catch (error: any) {
        const message = error?.error || "Something went wrong.";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } finally {
        setLoadingAppointments(false);
      }
    },
    [authContext, toast],
  );

  const createAppointment = useCallback(
    async (payload: Record<string, any>) => {
      const accessToken =
        (await authContext?.validateToken?.()) ?? (await getAccessToken()) ?? null;

      if (!accessToken) {
        const message = "Please login again";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      }

      try {
        const request = await fetch(APPOINTMENT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify(payload ?? {}),
        });

        const response: any = await request.json();
        if (response?.ok) {
          return { ok: true, data: response?.data };
        }
        return { ok: false, error: response?.error || "Something went wrong." };
      } catch (error: any) {
        const message = error?.error || "Something went wrong.";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      }
    },
    [authContext, toast],
  );

  
  return (
    <AppContext.Provider
      value={{
        notificationsCount,
        setNotificationsCount,
        fetchAppointments,
        loadingAppointments,
        createAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
