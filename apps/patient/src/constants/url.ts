// const BASE_URL = "https://doctor-twin-ai-production.up.railway.app"; old python backend
// const BASE_URL = "https://doctor-twin-be-production.up.railway.app/api/v1";
const BASE_URL = "https://4gtw9tgz-3000.inc1.devtunnels.ms/api/v1";


//AUTH APIs
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const SIGNUP_URL = `${BASE_URL}/auth/signup`;
export const VERIFY_OTP_URL = `${BASE_URL}/auth/verify-otp`;
export const RESEND_OTP_URL = `${BASE_URL}/auth/resend-otp`;
export const REFRESH_TOKEN_URL = `${BASE_URL}/auth/refresh`;
export const SET_USER_PIN_URL = `${BASE_URL}/auth/set-pin`;
export const VERIFY_USER_PIN_URL = `${BASE_URL}/auth/verify-pin`;

//USER APIs
export const GET_USER_URL = `${BASE_URL}/auth/me`;

// APPOINTMENT APIs
export const APPOINTMENT_URL = `${BASE_URL}/appointments`;
export const FETCH_APPOINTMENTS_URL = `${BASE_URL}/appointments/list`;
