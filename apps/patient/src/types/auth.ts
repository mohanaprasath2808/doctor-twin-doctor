export type LoginResult = {
  data?: any;
  error?: string;
};

export type SignUpResult = {
  ok: boolean;
  data?: any;
  message?: string;
};

export type VerifyOtpResult = {
  ok?: boolean;
  data?: any;
  error?: string;
};

export type ResendOtpResult = {
  ok?: boolean;
  data?: any;
  error?: string;
};

export type SetUserPinResult = {
  ok?: boolean;
  data?: any;
  error?: string;
};

export type VerifyUserPinResult = {
  ok?: boolean;
  data?: any;
  error?: string;
};

export type GetUserResult = {
  ok?: boolean;
  data?: any;
  error?: string;
};

export interface AuthContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (phoneNumber: string) => Promise<LoginResult>;
  handleVerifyOtp: (phone: string, code: string, otpType: string) => Promise<VerifyOtpResult>;
  handleResendOtp: (phone: string, otpType: string) => Promise<ResendOtpResult>;
  handleSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: string,
    userAgreementConsent: boolean,
  ) => Promise<SignUpResult>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  validateToken: () => Promise<string | null>;
  generateNewAccessToken: () => Promise<string | null>;
  accessToken: string | null;
  refreshToken: string | null;
  localUserData: any;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  setLocalUserData: React.Dispatch<React.SetStateAction<any>>;
  logout: () => Promise<void>;
  handleSetUserPin: (userId: string, pin: string) => Promise<SetUserPinResult>;
  handleVerifyUserPin: (userId: string, pin: string) => Promise<VerifyUserPinResult>;
  handleGetUser: () => Promise<GetUserResult>;
}
