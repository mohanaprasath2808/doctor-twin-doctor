import React, {
  createContext,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { useToast } from "react-native-toast-notifications";

import { ENDPOINTS, staffById } from "../api/endpoints";
import { api } from "../api/axios";

export type FetchStaffParams = {
  roles?: string[];
  search_key?: string;
  page?: number;
  limit?: number;
};

export type FetchStaffOptions = {
  /** When true, append results to existing `staffs` (page > 1). */
  append?: boolean;
};

export type StaffListData = {
  staffs?: Record<string, unknown>[];
  total?: number;
  page?: number;
  limit?: number;
};

export type CreateStaffPayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  date_of_birth: string;
  is_active?: boolean;
};

export type UpdateStaffPayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string;
  date_of_birth: string;
  is_active: boolean;
  password?: string;
};

type ApiResult<T = unknown> = { ok: boolean; data?: T; error?: string };

export interface AppContextType {
  staffData: StaffListData;
  setStaffData: React.Dispatch<React.SetStateAction<StaffListData>>;
  loadingStaff: boolean;
  loadingMoreStaff: boolean;
  submittingStaff: boolean;
  fetchStaff: (
    params?: FetchStaffParams,
    options?: FetchStaffOptions,
  ) => Promise<{ ok: boolean; data?: StaffListData; error?: string }>;
  refetchStaffList: () => Promise<{ ok: boolean; data?: StaffListData; error?: string }>;
  createStaff: (payload: CreateStaffPayload) => Promise<ApiResult>;
  updateStaff: (userId: string, payload: UpdateStaffPayload) => Promise<ApiResult>;
  deleteStaff: (userId: string) => Promise<ApiResult>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const toast = useToast();
  const [staffData, setStaffData] = useState<StaffListData>({});
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [loadingMoreStaff, setLoadingMoreStaff] = useState(false);
  const [submittingStaff, setSubmittingStaff] = useState(false);
  const lastListParamsRef = useRef<FetchStaffParams>({ page: 1, limit: 20 });

  const fetchStaff = useCallback(
    async (params?: FetchStaffParams, options?: FetchStaffOptions) => {
      const { roles, search_key, page = 1, limit = 20 } = params ?? {};
      const { append = false } = options ?? {};
      const isLoadMore = append && page > 1;

      const requestBody = {
        ...(roles && roles.length > 0 ? { roles } : {}),
        ...(search_key?.trim() ? { search_key: search_key.trim() } : {}),
        page,
        limit,
      };

      if (!isLoadMore) {
        lastListParamsRef.current = { roles, search_key, page, limit };
      }

      try {
        if (isLoadMore) {
          setLoadingMoreStaff(true);
        } else {
          setLoadingStaff(true);
        }

        const response = await api.post(ENDPOINTS.FETCH_STAFF, requestBody);
        const data: any = response?.data;

        if (data?.ok === true) {
          const incoming: StaffListData = data?.data ?? {};

          setStaffData((prev) => {
            if (!isLoadMore) {
              return incoming;
            }

            const prevStaffs = prev.staffs ?? [];
            const nextStaffs = incoming.staffs ?? [];
            return {
              ...incoming,
              staffs: [...prevStaffs, ...nextStaffs],
            };
          });

          return { ok: true, data: incoming };
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
        if (isLoadMore) {
          setLoadingMoreStaff(false);
        } else {
          setLoadingStaff(false);
        }
      }
    },
    [toast],
  );

  const refetchStaffList = useCallback(async () => {
    return fetchStaff(lastListParamsRef.current);
  }, [fetchStaff]);

  const createStaff = useCallback(
    async (payload: CreateStaffPayload): Promise<ApiResult> => {
      try {
        setSubmittingStaff(true);
        const response = await api.post(ENDPOINTS.STAFF, payload);
        const data: any = response?.data;

        if (data?.ok === true) {
          toast.show("Staff created successfully", { type: "success" });
          await refetchStaffList();
          return { ok: true, data: data?.data };
        }

        const message = data?.error || "Failed to create staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } catch (error: any) {
        const errorData = error?.response?.data || error;
        console.error(errorData, "error in createStaff");
        const message = errorData?.error || errorData?.message || "Failed to create staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } finally {
        setSubmittingStaff(false);
      }
    },
    [toast, refetchStaffList],
  );

  const updateStaff = useCallback(
    async (userId: string, payload: UpdateStaffPayload): Promise<ApiResult> => {
      try {
        setSubmittingStaff(true);
        const response = await api.patch(staffById(userId), payload);
        const data: any = response?.data;

        if (data?.ok === true) {
          toast.show("Staff updated successfully", { type: "success" });
          await refetchStaffList();
          return { ok: true, data: data?.data };
        }

        const message = data?.error || "Failed to update staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } catch (error: any) {
        const errorData = error?.response?.data || error;
        console.error(errorData, "error in updateStaff");
        const message = errorData?.error || errorData?.message || "Failed to update staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } finally {
        setSubmittingStaff(false);
      }
    },
    [toast, refetchStaffList],
  );

  const deleteStaff = useCallback(
    async (userId: string): Promise<ApiResult> => {
      try {
        setSubmittingStaff(true);
        const response = await api.delete(staffById(userId));
        const data: any = response?.data;

        if (data?.ok === true) {
          toast.show("Staff deleted successfully", { type: "success" });
          await refetchStaffList();
          return { ok: true, data: data?.data };
        }

        const message = data?.error || "Failed to delete staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } catch (error: any) {
        const errorData = error?.response?.data || error;
        console.error(errorData, "error in deleteStaff");
        const message = errorData?.error || "Failed to delete staff";
        toast.show(message, { type: "danger" });
        return { ok: false, error: message };
      } finally {
        setSubmittingStaff(false);
      }
    },
    [toast, refetchStaffList],
  );

  return (
    <AppContext.Provider
      value={{
        staffData,
        setStaffData,
        loadingStaff,
        loadingMoreStaff,
        submittingStaff,
        fetchStaff,
        refetchStaffList,
        createStaff,
        updateStaff,
        deleteStaff,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
