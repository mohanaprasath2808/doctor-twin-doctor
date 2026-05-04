import { LOGIN_URL, RESEND_OTP_URL, VERIFY_OTP_URL } from "../constants/url";

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
