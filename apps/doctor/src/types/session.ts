/** User object as returned by auth APIs (nested under tokens). */
export type ApiSessionUser = {
  user_id: string;
  email: string;
  name: string;
  phone?: string | null;
  date_of_birth?: string | null;
  role: string;
  location_code?: string | null;
  is_active?: boolean;
  mfa_enabled?: boolean;
  user_pin_set?: boolean;
  face_id_set?: boolean;
  last_login_at?: string | null;
};
