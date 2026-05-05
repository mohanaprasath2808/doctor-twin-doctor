export type LoginResult = {
  ok: boolean;
  data?: any;
  message?: string;
};

export type SignUpResult = {
  ok: boolean;
  data?: any;
  message?: string;
};

export interface AuthContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (phoneNumber: string) => Promise<LoginResult>;
  handleSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: string,
    userAgreementConsent: boolean,
  ) => Promise<SignUpResult>;
}
