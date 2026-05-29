import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { useToast } from "react-native-toast-notifications";

import { ENDPOINTS } from "../api/endpoints";
import { api } from "../api/axios";
import { ROLE_OPTIONS } from "../components/BottomSheets/StaffRoleBottomSheetModal";
import type { StaffMember, StaffRole } from "../screens/App/Staff/staffTypes";

export type FetchStaffParams = {
  role?: StaffRole | string;
  search?: string;
  page?: number;
  limit?: number;
};

export interface AppContextType {
  staffList: StaffMember[];
  setStaffList: React.Dispatch<React.SetStateAction<StaffMember[]>>;
  loadingStaff: boolean;
  fetchStaff: (
    params?: FetchStaffParams,
  ) => Promise<{ ok: boolean; data?: StaffMember[]; error?: string }>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const mapApiStaffToMember = (raw: Record<string, unknown>): StaffMember => {
  const role = (raw?.role ?? raw?.staff_role ?? "ma") as StaffRole;
  const roleLabel =
    (raw?.role_label as string | undefined) ??
    (raw?.roleLabel as string | undefined) ??
    ROLE_OPTIONS.find((o) => o.role === role)?.label ??
    String(role);

  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    firstName: String(raw?.first_name ?? raw?.firstName ?? ""),
    lastName: String(raw?.last_name ?? raw?.lastName ?? ""),
    phone: String(raw?.phone ?? raw?.phone_number ?? ""),
    dob: String(raw?.dob ?? raw?.date_of_birth ?? raw?.dateOfBirth ?? ""),
    email: String(raw?.email ?? ""),
    role,
    roleLabel,
  };
};

const extractStaffArray = (payload: unknown): Record<string, unknown>[] => {
  if (Array.isArray(payload)) {
    return payload as Record<string, unknown>[];
  }
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const key of ["staff", "list", "items", "rows", "data"]) {
      const value = record[key];
      if (Array.isArray(value)) {
        return value as Record<string, unknown>[];
      }
    }
  }
  return [];
};

interface AppContextProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const toast = useToast();
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const fetchStaff = useCallback(
    async (params?: FetchStaffParams) => {
      const { role, search, page = 1, limit = 50 } = params ?? {};
      const requestBody = {
        ...(role && role !== "all" ? { role } : {}),
        ...(search?.trim() ? { search: search.trim() } : {}),
        page,
        limit,
      };

      try {
        setLoadingStaff(true);
        const response = await api.post(ENDPOINTS.FETCH_STAFF, requestBody);
        const data: any = response?.data;

        if (data?.ok === true) {
          const rows = extractStaffArray(data?.data).map(mapApiStaffToMember);
          setStaffList(rows);
          return { ok: true, data: rows };
        }

        const message = data?.error || "Failed to load staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } catch (error: any) {
        const errorData = error?.response?.data || error;
        console.error(errorData, "error in fetchStaff");
        const message = errorData?.error || "Failed to load staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } finally {
        setLoadingStaff(false);
      }
    },
    [toast],
  );

  return (
    <AppContext.Provider
      value={{
        staffList,
        setStaffList,
        loadingStaff,
        fetchStaff,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
