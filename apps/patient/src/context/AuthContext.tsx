import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import {
  GET_USER_URL,
  LOGIN_URL,
  REFRESH_TOKEN_URL,
  RESEND_OTP_URL,
  SET_USER_PIN_URL,
  SIGNUP_URL,
  VERIFY_OTP_URL,
  VERIFY_USER_PIN_URL,
} from "../constants/url";
import { useToast } from "react-native-toast-notifications";
import { AuthContextType } from "../types/auth";
import {
  AUTH_LOCAL_STORAGE_KEYS,
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  getUserData,
} from "../utils/authStorage";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../constants/navigationStrings";
import { jwtDecode } from "jwt-decode";
import { setSecureItem } from "../utils/secureStorge";
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [localUserData, setLocalUserData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  console.log(localUserData, "localUserData in AuthContextProvider");
  //INITIAL FETCH
  const initialFetch = async () => {
    const localAccessToken = await getAccessToken();
    const localRefreshToken = await getRefreshToken();
    const localUserDataRaw = await getUserData();
    if (localAccessToken && localRefreshToken && localUserDataRaw) {
      setAccessToken(localAccessToken);
      setRefreshToken(localRefreshToken);
      try {
        setLocalUserData(
          typeof localUserDataRaw === "string" ? JSON.parse(localUserDataRaw) : localUserDataRaw,
        );
      } catch {
        setLocalUserData(null);
      }
      navigation.navigate(navigationStrings.CHOOSE_LOGIN_METHOD);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await initialFetch();
    };
    loadData();
  }, []);
  //handle login
  const handleLogin = async (phone: string) => {
    console.log(phone, "phone in handleLogin");
    try {
      const request = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          login_role: "patient",
        }),
      });
      const response: any = await request.json();
      console.log(response, "response in handleLogin");
      return response;
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
      return { error: message };
    }
  };

  const generateNewAccessToken = useCallback(async (): Promise<string | null> => {
    if (!refreshToken) {
      toast.show("No refresh token found", { type: "danger" });
      return null;
    }
    try {
      const response = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      const data: any = await response.json();
      if (response.ok) {
        const payload = data?.data ?? data;
        const nextAccess = payload?.access_token;
        const nextRefresh = payload?.refresh_token;
        if (!nextAccess) return null;

        setAccessToken(String(nextAccess));
        await setSecureItem(AUTH_LOCAL_STORAGE_KEYS.ACCESS_TOKEN, String(nextAccess));

        if (nextRefresh) {
          setRefreshToken(String(nextRefresh));
          await setSecureItem(AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN, String(nextRefresh));
        }

        return String(nextAccess);
      }
    } catch {
      return null;
    }
    return null;
  }, [refreshToken, toast]);

  //handle refresh token
  const validateToken = useCallback(async (): Promise<string | null> => {
    if (!accessToken || !refreshToken) {
      return null;
    }
    const decodedToken: any = jwtDecode(accessToken);
    const isAccessTokenValid = decodedToken?.exp != null && decodedToken.exp * 1000 > Date.now();
    if (isAccessTokenValid) {
      return accessToken;
    }
    return (await generateNewAccessToken()) ?? null;
  }, [accessToken, refreshToken, generateNewAccessToken]);
  //handle Signup
  const handleSignUp = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: string,
    userAgreementConsent: boolean,
  ) => {
    const requstBody = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      date_of_birth: birthDate,
      user_agreement_consent: userAgreementConsent,
      role: "patient",
    };
    console.log(requstBody, "requstBody in handleSignUp");
    try {
      const request = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requstBody),
      });
      const response = await request.json();
      console.log(response, "response in handleSignUp");
      if (response.ok) {
        return { ok: true, data: response?.data };
      } else {
        return { ok: false, error: response?.error };
      }
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      console.log(message, "error in handleSignUp");
      toast.show(message, { type: "danger" });
      return { ok: false, error: message };
    }
  };

  const handleVerifyOtp = async (phone: string, code: string, otpType: string) => {
    const requestBody = { phone, code, otp_type: otpType, role: "patient" };
    console.log(requestBody, "requestBody in handleVerifyOtp");
    try {
      const request = await fetch(VERIFY_OTP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const response: any = await request.json();
      console.log(response, "response in handleVerifyOtp");
      if (response?.ok) {
        return { ok: true, data: response?.data };
      }
      return { ok: false, error: response?.error };
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
      return { ok: false, error: message };
    }
  };

  //handle resend OTP
  const handleResendOtp = async (phone: string, otpType: string) => {
    const requestBody = { phone, otp_type: otpType };
    console.log(requestBody, "requestBody in handleResendOtp");
    const accessToken = await validateToken();
    if (!accessToken) {
      toast.show("Please login again", { type: "danger" });
      return { ok: false, error: "Please login again" };
    }
    try {
      const request = await fetch(RESEND_OTP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },

        body: JSON.stringify(requestBody),
      });
      const response: any = await request.json();
      console.log(response, "response in handleResendOtp");
      if (response?.ok) {
        return { ok: true, data: response?.data };
      }
      return { ok: false, error: response?.error };
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
      return { ok: false, error: message };
    }
  };

  //handle set user pin
  const handleSetUserPin = async (userId: string, pin: string) => {
    const requestBody = {
      user_id: userId,
      pin: pin,
    };
    console.log(requestBody, "requestBody in handleSetUserPin");
    const accessToken = await validateToken();
    if (!accessToken) {
      toast.show("Please login again", { type: "danger" });
      return { ok: false, error: "Please login again" };
    }
    try {
      const request = await fetch(SET_USER_PIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },

        body: JSON.stringify(requestBody),
      });
      const response: any = await request.json();
      console.log(response, "response in handleSetUserPin");
      if (response?.ok) {
        await handleGetUser();
        return { ok: true, data: response?.data };
      }
      return { ok: false, error: response?.error };
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
      return { ok: false, error: message };
    }
  };

  //handle verify user pin
  const handleVerifyUserPin = async (userId: string, pin: string) => {
    const requestBody = {
      user_id: userId,
      pin: pin,
    };
    console.log(requestBody, "requestBody in handleVerifyUserPin");
    const accessToken = await validateToken();
    if (!accessToken) {
      toast.show("Please login again", { type: "danger" });
      return { ok: false, error: "Please login again" };
    }
    try {
      const request = await fetch(VERIFY_USER_PIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(requestBody),
      });
      const response: any = await request.json();
      console.log(response, "response in handleVerifyUserPin");
      if (response?.ok) {
        return { ok: true, data: response?.data };
      }
      return { ok: false, error: response?.error };
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
      return { ok: false, error: message };
    }
  };

  //handle get user
  const handleGetUser = useCallback(async () => {
    const accessToken = await validateToken();
    if (!accessToken) {
      // toast.show("Please login again", { type: "danger" });
      return { ok: false, error: "Please login again" };
    }

    try {
      const request = await fetch(GET_USER_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      });
      const response: any = await request.json();
      console.log(response, "response in handleGetUser");
      if (response?.ok) {
        const nextUser = response?.data;
        setUserData(nextUser);
        return { ok: true, data: nextUser };
      }
      return { ok: false, error: response?.error };
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
      return { ok: false, error: message };
    }
  }, [toast, validateToken]);

  //logout
  const logout = async () => {
    await clearAuthSession();
    setIsLogin(false);
    setAccessToken(null);
    setRefreshToken(null);
    setLocalUserData(null);
    navigation.reset({ index: 0, routes: [{ name: navigationStrings.LOGIN }] });
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        handleLogin,
        handleVerifyOtp,
        handleResendOtp,
        handleSignUp,
        loading,
        setLoading,
        validateToken,
        generateNewAccessToken,
        accessToken,
        refreshToken,
        localUserData,
        userData,
        setUserData,
        setLocalUserData,
        setAccessToken,
        setRefreshToken,
        logout,
        handleSetUserPin,
        handleVerifyUserPin,
        handleGetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
