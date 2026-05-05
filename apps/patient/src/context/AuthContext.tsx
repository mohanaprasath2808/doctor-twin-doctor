import React, { createContext, ReactNode, useState } from "react";
import { LOGIN_URL, SIGNUP_URL } from "../constants/url";
import { useToast } from "react-native-toast-notifications";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getApiMessage = (payload: any, fallback: string): string => {
  const message = payload?.message ?? payload?.detail;
  if (typeof message === "string" && message.trim()) return message.trim();
  if (Array.isArray(message) && message.length > 0) {
    const first = message[0];
    if (typeof first === "string" && first.trim()) return first.trim();
    if (first && typeof first?.msg === "string" && first.msg.trim()) return first.msg.trim();
  }
  return fallback;
};

const parseResponseBody = async (request: Response) => {
  const raw = await request.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return { message: raw };
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  //handle login
  const handleLogin = async (phoneNumber: string) => {
    try {
      const request = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          login_role: "patient",
        }),
      });
      const response = await parseResponseBody(request);
      const ok = request.ok && (response as any)?.ok !== false;
      const message = ok ? undefined : getApiMessage(response, "Login failed. Please try again.");
      if (!ok && message) {
        toast.show(String(message), { type: "danger" });
      }
      return { ok, data: response, message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      console.log(message, "error in handleLogin");
      toast.show(message, { type: "danger" });
      return { ok: false, message };
    }
  };

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
      const response = await parseResponseBody(request);
      console.log(response, "response in handleSignUp");
      const ok = request.ok && (response as any)?.ok !== false;
      if (ok) {
        return { ok: true, data: response, message: undefined };
      } else {
        const message = getApiMessage(response, "Signup failed. Please try again.");
        return { ok: false, message };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      console.log(message, "error in handleSignUp");
      toast.show(message, { type: "danger" });
      return { ok: false, message };
    }
  };
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, handleLogin, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
