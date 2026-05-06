import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { api } from "../api/axios";
import { secureStorage } from "../storage/secureStorage";
import { useToast } from "react-native-toast-notifications";

export type VerifyOtpParams = {
  otp_type: string;
  role: string;
  code: string;
  email: string;
};

export interface AuthContextType {
  /** False until secure storage has been read (avoid flashing Login before App). */
  isHydrated: boolean;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resendOtp: (email: string, otpType: string) => Promise<{ ok: boolean, expires_at: number | null }>;
  verifyOtp: (params: VerifyOtpParams) => Promise<{ verified: boolean, token: string | null }>;
  resetPassword: (role: string, token: string, email: string, newPassWord: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const accessToken = await secureStorage.getItem("accessToken");
        if (cancelled) return;
        if (accessToken) {
          setUserToken(accessToken);
          setIsLogin(true);
        } else {
          setUserToken(null);
          setIsLogin(false);
        }
      } catch {
        if (!cancelled) {
          setUserToken(null);
          setIsLogin(false);
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      const response: any = await api.post(
        ENDPOINTS.LOGIN,
        {
          login_role: "staff",
          email: email,
          password: password
        }
      );

      const data = response?.data;

      if (data?.ok === true) {
        const accessToken = data?.data?.access_token;
        const refreshToken = data?.data?.refresh_token;
        const user = data?.data?.user;

        await secureStorage.setItem("accessToken", accessToken);
        await secureStorage.setItem("refreshToken", refreshToken);
        await secureStorage.setItem("user", JSON.stringify(user ?? {}));
        setUserToken(accessToken);
        setIsLogin(true);
        toast.show("Login successful", {
          type: "success",
        });
      } else {
        throw new Error("Login failed");
      }

      console.log(response?.data, "response");

    } catch (error: any) {
      const errorData = error?.response?.data;
      console.error(errorData, "error in login");
      toast.show(errorData?.error || "Login failed", { type: "danger" });
    } finally {
      setIsLoading(false);
    }

  };

  const resendOtp = async (email: string, otpType: string) => {

    try {
      setIsLoading(true);
      const response: any = await api.post(
        ENDPOINTS.RESEND_OTP,
        { email: email, otp_type: otpType }
      );

      const responseData = response?.data;
      console.log(responseData, "data");
      if (responseData?.ok === true) {
        toast.show(`OTP is ${responseData?.data?.otp}`, {
          type: "success",
        });
        return { ok: true, expires_at: responseData?.data?.expires_in_minutes };
      }
      toast.show("Failed to send reset password email", {
        type: "danger",
      });
      return { ok: false, expires_at: null };
    } catch (error: any) {
      const errorData = error?.response?.data;
      console.error(errorData, "error in resendOtp");
      toast.show(errorData?.error || "Failed to send reset password email", {
        type: "danger",
      });
      return { ok: false, expires_at: null };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async ({
    otp_type,
    role,
    code,
    email,
  }: VerifyOtpParams): Promise<{ verified: boolean, token: string | null, expires_at: number | null }> => {

    try {
      setIsLoading(true);
      const response = await api.post(ENDPOINTS.VERIFY_OTP, {
        otp_type,
        role,
        code,
        email: email,
      });
      const data: any = response?.data;
      console.log(data, "data");
      if (data?.ok === true) {
        toast.show("OTP verified", { type: "success" });
        return {
          verified: data?.data?.verified, token: data?.data?.token, expires_at: data?.data?.expires_in_seconds
        };
      }
      toast.show("Invalid or expired OTP", { type: "danger" });
      return { verified: false, token: null, expires_at: null };
    } catch (error: any) {
      const errorData = error?.response?.data;
      console.error(errorData, "error in verifyOtp");
      toast.show(errorData?.error || "Could not verify OTP. Try again.", { type: "danger" });
      return { verified: false, token: null, expires_at: null };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await secureStorage.removeItem(
      "accessToken",
    );

    await secureStorage.removeItem(
      "refreshToken",
    );
    await secureStorage.removeItem(
      "user",
    );

    setUserToken(null);
    setIsLogin(false);
  };

  const resetPassword = async (role: string, token: string, email: string, newPassWord: string) => {
    try {
      setIsLoading(true);
      const response = await api.post(ENDPOINTS.RESET_PASSWORD, {
        role,
        token,
        email,
        new_password: newPassWord,
      });
      const data: any = response?.data;
      console.log(data, "data");
      if (data?.ok === true) {
        toast.show("Password reset successfully", { type: "success" });
        return true;
      }
      toast.show("Failed to reset password", { type: "danger" });
      return false;
    }
    catch (error: any) {
      const errorData = error?.response?.data;
      console.error(errorData, "error in resetPassword");
      toast.show(errorData?.error || "Failed to reset password", { type: "danger" });
      return false;
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isHydrated,
        isLogin,
        setIsLogin,
        isLoading,
        userToken,
        login,
        logout,
        resendOtp,
        verifyOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
