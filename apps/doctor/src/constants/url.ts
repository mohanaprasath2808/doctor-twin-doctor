const BASE_URL = "https://doctor-twin-ai-production.up.railway.app";

//AUTH APIs
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const VERIFY_OTP_URL = `${BASE_URL}/auth/verify-otp`;
export const RESEND_OTP_URL = `${BASE_URL}/auth/resend-otp`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;
export const SET_USER_PIN_URL = `${BASE_URL}/auth/set-pin`;
export const VERIFY_USER_PIN_URL = `${BASE_URL}/auth/verify-pin`;
export const FETCH_BACKUP_CODES_URL = `${BASE_URL}/auth/backup-code/generate`;
export const VERIFY_BACKUP_CODE_URL = `${BASE_URL}/auth/backup-code/verify`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/auth/refresh`;

//USER APIs
export const UPDATE_USER_URL = `${BASE_URL}/auth/user`;
export const GET_USER_URL = `${BASE_URL}/auth/me`;
