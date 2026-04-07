import React, { createContext, ReactNode, useState } from "react";

type NotificationItem = {
  id: number;
  title: string;
};

export interface AppContextType {
  notificationsData: NotificationItem[];
  setNotificationsData: React.Dispatch<
    React.SetStateAction<NotificationItem[]>
  >;
  messagesData: MessageItem[];
  setMessagesData: React.Dispatch<React.SetStateAction<MessageItem[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

type MessageItem = {
  id: number;
  title: string;
};

const AppContextProvider: React.FC<AppContextProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notificationsData, setNotificationsData] = useState<
    NotificationItem[]
  >([]);
  const [messagesData, setMessagesData] = useState<MessageItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        notificationsData,
        setNotificationsData,
        messagesData,
        setMessagesData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
