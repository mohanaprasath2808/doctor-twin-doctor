export type OtpFlowSource = "login" | "sso-sign-in" | "user-pin" | "face-id-setup";

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
