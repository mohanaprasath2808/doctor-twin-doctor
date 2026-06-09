export type OtpVerificationFlow = "signup" | "faceId" | "pinOtp" | "login" | "otpFromChooser";

export type OtpVerificationRouteParams = {
  otpType: OtpVerificationFlow;
  phone?: string;
  forgotPin?: boolean;
  loginWithOtp?: boolean;
};

export type UserPinRouteParams = {
  mode?: "create" | "verify";
};

export type SignUpRouteParams = {
  phone?: string;
};
