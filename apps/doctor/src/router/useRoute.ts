import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useRoute = () => {
    const context = useContext(AuthContext);
        if(!context){
            throw new Error('useRoute must be used within AuthContextProvider');
        }
        const {isLogin} = context;
    return isLogin ? 'app' : 'auth';
}