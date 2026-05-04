import { create } from "zustand";

import type { MessageItem, NotificationItem } from "../types/app";

export type { MessageItem, NotificationItem } from "../types/app";

type AppState = {
  // loading
  loading: boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  //notifications
  notificationsData: NotificationItem[];
  setNotificationsData: (
    value: NotificationItem[] | ((prev: NotificationItem[]) => NotificationItem[]),
  ) => void;
  //messages
  messagesData: MessageItem[];
  setMessagesData: (value: MessageItem[] | ((prev: MessageItem[]) => MessageItem[])) => void;
};

export const useAppStore = create<AppState>((set) => ({
  loading: false,
  setLoading: (value) =>
    set((s) => ({
      loading: typeof value === "function" ? value(s.loading) : value,
    })),
  notificationsData: [],
  messagesData: [],
  setNotificationsData: (value) =>
    set((s) => ({
      notificationsData: typeof value === "function" ? value(s.notificationsData) : value,
    })),
  setMessagesData: (value) =>
    set((s) => ({
      messagesData: typeof value === "function" ? value(s.messagesData) : value,
    })),
}));
