export type OtpFlowSource = "login" | "sso-sign-in" | "pinOtp" | "faceId" | "backupcode";

/** Post-verify destination when `source` is `login` (all use the same `otp_type: login` on the API). */
export type LoginOtpNextRoute = "normalLogin" | "userPin" | "faceId";

export type OtpRouteParams = {
  source: OtpFlowSource;
  email: string;
  /** Only for `source: "login"`. */
  loginOtpNext?: LoginOtpNextRoute;
};

export type SetUserPinRouteParams = {
  mode?: "create" | "verify";
};

export type ForgotPasswordRouteParams = {
  email: string;
};

export type ResetPasswordRouteParams = {
  email: string;
};

export type SsoSignInRouteParams = {
  email: string;
};

export type BackupCodesSessionTimeoutRouteParams = {
  backupCodes: any[];
  response?: any;
};

export type DeviceTrustVerificationRouteParams = {
  prefillOtp?: string;
};
