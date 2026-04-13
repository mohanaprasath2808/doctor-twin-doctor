import React, { createContext, ReactNode, useState } from "react";

export interface AuthContextType {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProps {
    children: ReactNode;
}
const AuthContextProvider : React.FC<AuthContextProps> = ({children}: {children: React.ReactNode}) => {
    const [isLogin,setIsLogin] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={{
            isLogin,
            setIsLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;