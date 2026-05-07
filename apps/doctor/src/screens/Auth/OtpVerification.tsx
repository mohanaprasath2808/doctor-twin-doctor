import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import OtpTimer from "../../components/Auth/OtpTimer";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/theme";
import ReusableButton from "../../neomorphism/ReusableButton";
import IconComponent from "../../neomorphism/IconComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";
import { useAppStore } from "../../store/useAppStore";
import BackIcon from "../../assets/icon/backArrow.svg";
import navigationStrings from "../../constants/navigationStrings";
import type { OtpRouteParams } from "../../types/authRoute";
import { handleResendOtp as requestResendOtp, handleVerifyOtp } from "../../service/authService";
import { useToast } from "react-native-toast-notifications";
import { setSecureItem } from "../../utils/secureStorage";
import { AUTH_STORAGE_KEYS, hasCompletedOnboarding } from "../../utils/authStorage";

const OtpVerification = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { email, source, loginOtpNext = "normalLogin" } = route.params as OtpRouteParams;

  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const [otp, setOtp] = useState("");
  const setIsLogin = useAuthStore((s) => s.setIsLogin);
  const setUserData = useAuthStore((s) => s.setUserData);

  const otpType =
    source === "faceId" || source === "pinOtp" || source === "backupcode" ? source : "login";

  const onVerifyPress = async (): Promise<void> => {
    toast.hideAll();

    if (!email?.trim()) {
      toast.show("Missing email. Go back and sign in again.", { type: "danger" });
      return;
    }

    if (!otp.trim()) {
      toast.show("Please enter the verification code.", { type: "warning" });
      return;
    }

    setLoading(true);
    try {
      const response = await handleVerifyOtp(email, otp, otpType);
      console.log(response, "response in OtpVerification Screen");
      if (!response.ok) {
        toast.show("Verification failed.", { type: "danger" });
        return;
      }
      const raw: any = response.data;
      const session = raw?.data?.data ?? raw?.data ?? raw;
      if (source === "login") {
        if (!session?.access_token || !session?.refresh_token || !session?.user) {
          toast.show("Session could not be saved. Try again.", { type: "danger" });
          return;
        }
        await setSecureItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, String(session.access_token));
        await setSecureItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, String(session.refresh_token));
        await setSecureItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(session.user));
        setUserData(session.user);
      }

      if (source === "login") {
        if (loginOtpNext === "normalLogin") {
          navigation.navigate(navigationStrings.SECURE_LOGIN);
          return;
        }
        if (loginOtpNext === "userPin") {
          navigation.navigate(navigationStrings.SET_USER_PIN, { mode: "create" });
          return;
        }
        if (loginOtpNext === "faceId") {
          // setIsLogin(true);
          navigation.navigate(navigationStrings.ONBOARDING_STACK, {
            screen: navigationStrings.START_SHIFT_COVERAGE,
          });
          return;
        }
        navigation.navigate(navigationStrings.SECURE_LOGIN);
        return;
      }

      if (source === "faceId") {
        navigation.navigate(navigationStrings.SECURE_LOGIN);
        return;
      }

      if (source === "pinOtp") {
        navigation.navigate(navigationStrings.SET_USER_PIN, { mode: "create" });
        return;
      }

      if (source === "backupcode") {
        const codes = session?.backupCodes ?? session?.backup_codes ?? session?.codes ?? session;
        navigation.navigate(navigationStrings.BACKUP_CODES_SESSION_TIMEOUT, {
          backupCodes: Array.isArray(codes) ? codes : [],
          response: raw,
        });
        return;
      }

      switch (source) {
        case "sso-sign-in":
          if (await hasCompletedOnboarding()) {
            navigation.navigate(navigationStrings.SECURE_LOGIN);
          } else {
            // setIsLogin(true);
            navigation.navigate(navigationStrings.ONBOARDING_STACK, {
              screen: navigationStrings.START_SHIFT_COVERAGE,
            });
          }
          return;
        default:
          // setIsLogin(true);
          navigation.navigate(navigationStrings.ONBOARDING_STACK, {
            screen: navigationStrings.START_SHIFT_COVERAGE,
          });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const onResendPress = async (): Promise<void> => {
    toast.hideAll();
    setOtp("");

    if (!email?.trim()) {
      toast.show("Missing email. Go back and sign in again.", { type: "danger" });
      return;
    }

    setLoading(true);
    try {
      console.log(otpType, "otpType in OtpVerification Screen");
      const result: any = await requestResendOtp(email, otpType);
      console.log(result, "result in OtpVerification Screen");
      if (result?.ok) {
        toast.show(`Otp code: ${result.data.data.otp}`, { type: "success" });
      } else {
        toast.show("Could not resend code. Try again.", { type: "danger" });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const subTitle =
    source === "faceId"
      ? "Enter the verification code sent for Face ID setup"
      : "Enter the 4-digit code sent to your email address";

  return (
    <SafeAreaView style={styles.container}>
      <IconComponent
        icon={<BackIcon width={22} height={22} />}
        width={40}
        height={40}
        radius={20}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />

      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>

      <View style={styles.otpContainer}>
        <OtpTextInput otp={otp} setOtp={setOtp} />
      </View>

      <OtpTimer initialSeconds={30} onResend={() => void onResendPress()} />

      <ReusableButton
        title={loading ? "Verifying…" : "Verify"}
        onPress={onVerifyPress}
        disabled={loading}
        containerStyle={styles.verifyBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? 6 : 16,
  },
  title: {
    marginTop: 24,
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  otpContainer: {
    marginTop: 34,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyBtn: {
    marginTop: 28,
  },
});
