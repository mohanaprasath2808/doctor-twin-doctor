import React, { createContext, ReactNode, useState } from "react";

export interface AppContextType {
  notificationsCount: number;
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);

  return (
    <AppContext.Provider value={{ notificationsCount, setNotificationsCount }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
