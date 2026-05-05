import { LOGIN_URL, RESEND_OTP_URL, RESET_PASSWORD_URL, VERIFY_OTP_URL } from "../constants/url";

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
