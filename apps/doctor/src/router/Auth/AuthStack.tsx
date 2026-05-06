import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthBootstrap from "../../screens/Auth/AuthBootstrap";
import BackupCodesSessionTimeout from "../../screens/Auth/BackupCodesSessionTimeout";
import DeviceTrustVerification from "../../screens/Auth/DeviceTrustVerification";
import EmergencyAccess from "../../screens/Auth/EmergencyAccess";
import ForgotPassword from "../../screens/Auth/ForgotPassword";
import Login from "../../screens/Auth/Login";
import OtpVerification from "../../screens/Auth/OtpVerification";
import ResetPassword from "../../screens/Auth/ResetPassword";
import SecureLogin from "../../screens/Auth/SecureLogin";
import SetUserPin from "../../screens/Auth/SetUserPin";
import SignUp from "../../screens/Auth/SignUp";
import SsoSignIn from "../../screens/Auth/SsoSignIn";
import navigationStrings from "../../constants/navigationStrings";
import { useAuthStore } from "../../store/useAuthStore";
import { getAccessToken, getRefreshToken, getStoredSessionUser } from "../../utils/authStorage";
import { COLORS } from "../../constants/theme";
import OnboardingStack from "./OnboardingStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const hydrateFromStorage = useAuthStore((s) => s.hydrateFromStorage);
  const [initialRouteName, setInitialRouteName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const resolveInitialRoute = async () => {
      await hydrateFromStorage();
      const [accessToken, refreshToken, user] = await Promise.all([
        getAccessToken(),
        getRefreshToken(),
        getStoredSessionUser(),
      ]);

      const hasSessionBundle = !!accessToken?.trim() && !!refreshToken?.trim() && !!user;
      if (!cancelled) {
        setInitialRouteName(
          hasSessionBundle ? navigationStrings.SECURE_LOGIN : navigationStrings.LOGIN,
        );
      }
    };

    void resolveInitialRoute();
    return () => {
      cancelled = true;
    };
  }, [hydrateFromStorage]);

  if (!initialRouteName) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.SURFACE,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.PRIMARY_DARK} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.SIGNUP} component={SignUp} />
      <Stack.Screen name={navigationStrings.OTP_VERIFICATION} component={OtpVerification} />
      <Stack.Screen name={navigationStrings.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={navigationStrings.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={navigationStrings.AUTH_BOOTSTRAP} component={AuthBootstrap} />
      <Stack.Screen name={navigationStrings.SSO_SIGN_IN} component={SsoSignIn} />
      <Stack.Screen name={navigationStrings.ONBOARDING_STACK} component={OnboardingStack} />
      <Stack.Screen name={navigationStrings.SECURE_LOGIN} component={SecureLogin} />
      <Stack.Screen name={navigationStrings.SET_USER_PIN} component={SetUserPin} />
      <Stack.Screen
        name={navigationStrings.DEVICE_TRUST_VERIFICATION}
        component={DeviceTrustVerification}
      />
      <Stack.Screen
        name={navigationStrings.BACKUP_CODES_SESSION_TIMEOUT}
        component={BackupCodesSessionTimeout}
      />
      <Stack.Screen name={navigationStrings.EMERGENCY_ACCESS} component={EmergencyAccess} />
    </Stack.Navigator>
  );
};

export default AuthStack;
