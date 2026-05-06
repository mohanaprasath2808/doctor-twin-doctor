import {
  FETCH_BACKUP_CODES_URL,
  GET_USER_URL,
  LOGIN_URL,
  REFRESH_TOKEN_URL,
  RESEND_OTP_URL,
  RESET_PASSWORD_URL,
  SET_USER_PIN_URL,
  VERIFY_BACKUP_CODE_URL,
  VERIFY_OTP_URL,
  VERIFY_USER_PIN_URL,
} from "../constants/url";
import { getAccessToken, getRefreshToken } from "../utils/authStorage";
import type { ApiSessionUser } from "../types/session";
import { jwtDecode } from "jwt-decode";
import { setSecureItem } from "../utils/secureStorage";
import { AUTH_STORAGE_KEYS } from "../utils/authStorage";

type JwtPayload = { exp?: number };

//GENERATE NEW ACCESS TOKEN
export const generateNewAccessToken = async (): Promise<string | null> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  let body: any = {};
  try {
    body = await response.json();
  } catch {
    // non-JSON
  }

  if (!response.ok) return null;
  const payload = body?.data ?? body;
  const nextAccess = payload?.access_token;
  const nextRefresh = payload?.refresh_token;
  if (!nextAccess) return null;

  await setSecureItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, String(nextAccess));
  if (nextRefresh) await setSecureItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, String(nextRefresh));
  return String(nextAccess);
};

//VALIDATE TOKEN
export const validateToken = async (): Promise<string | null> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const exp = decoded?.exp;
    if (!exp) return accessToken;
    const isValid = exp * 1000 > Date.now();
    if (isValid) return accessToken;
    return await generateNewAccessToken();
  } catch {
    return accessToken;
  }
};

//LOGIN DOCTOR
export const handleLogin = async (email: string, password: string) => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      login_role: "doctor",
    }),
  });
  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }
  console.log(data, "data in handleLogin");

  return data;
};

//VERIFY OTP
export const handleVerifyOtp = async (email: string, otp: string, otp_type: string) => {
  const requestBody = {
    email,
    code: otp,
    otp_type,
    role: "doctor",
  };
  console.log(requestBody, "requestBody in handleVerifyOtp");
  const response = await fetch(VERIFY_OTP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};

//RESEND OTP
export const handleResendOtp = async (email: string, otp_type: string) => {
  console.log(email, "email in handleResendOtp");
  console.log(otp_type, "otp_type in handleResendOtp");
  const response = await fetch(RESEND_OTP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp_type }),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};

//RESET PASSWORD
export const handleResetPassword = async (
  token: string,
  email: string,
  confirmPassword: string,
) => {
  const requestBody = {
    token,
    email,
    new_password: confirmPassword,
    role: "doctor",
  };
  console.log(requestBody, "requestBody in handleResetPassword");
  const response = await fetch(RESET_PASSWORD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return data;
};

//SET USER PIN
export const handleSetUserPin = async (user_id: string, pin: string) => {
  const accessToken = await validateToken();
  if (!accessToken) return { ok: false, data: { error: "Session expired" } };
  const requestBody = {
    user_id,
    pin,
  };
  console.log(requestBody, "requestBody in handleSetUserPin");
  const response = await fetch(SET_USER_PIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};

//GET USER
export const handleGetUser = async () => {
  const accessToken = await validateToken();
  if (!accessToken) return {} as ApiSessionUser;
  const response = await fetch(GET_USER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  if (data) {
    const anyData: any = data;
    const me: any = anyData?.data;

    const normalized: ApiSessionUser = {
      ...me,
      user_pin_set: me?.user_pin_set ?? me?.userPinSet,
      face_id_set: me?.face_id_set ?? me?.faceIdSet,
    };
    return normalized;
  }

  return data as ApiSessionUser;
};

//VERIFY USER PIN
export const handleVerifyUserPin = async (user_id: string, pin: string) => {
  const accessToken = await validateToken();
  if (!accessToken) return { ok: false, data: { error: "Session expired" } };
  const requestBody = {
    user_id,
    pin,
  };
  const response = await fetch(VERIFY_USER_PIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};

//FETCH BACKUP CODES
export const handleFetchBackupCodes = async (email: string) => {
  const accessToken = await validateToken();
  if (!accessToken) return { ok: false, data: { error: "Session expired" } };
  const response = await fetch(FETCH_BACKUP_CODES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email }),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};

//VERIFY BACKUP CODE
export const handleVerifyBackupCode = async (email: string, backup_code: string) => {
  const accessToken = await validateToken();
  if (!accessToken) return { ok: false, data: { error: "Session expired" } };
  const requestBody = {
    email,
    backupcode: backup_code,
  };
  const response = await fetch(VERIFY_BACKUP_CODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};

//REFRESH TOKEN
export const handleRefreshToken = async () => {
  const refreshToken = await getRefreshToken();
  const response = await fetch(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    // non-JSON body
  }

  return { ok: response.ok, data };
};
