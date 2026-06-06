import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import OtpTimer from "../../components/Auth/OtpTimer";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import LeftArrow from "../../assets/icons/leftArrow.svg";
import { AuthContext } from "../../context/AuthContext";
import IconComponent from "../../neomorphism/IconComponent";
import type { OtpVerificationRouteParams } from "../../types/authRoute";
import { useToast } from "react-native-toast-notifications";
import { AUTH_LOCAL_STORAGE_KEYS, getOnboardingCompleted } from "../../utils/authStorage";
import { setSecureItem } from "../../utils/secureStorge";

const OtpVerification = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  //route
  const route = useRoute();
  const routeData = route.params as OtpVerificationRouteParams;
  const phone = routeData?.phone;
  const otpType = routeData?.otpType;
  const forgotPin = routeData?.forgotPin;
  const loginWithOtp = routeData?.loginWithOtp;
  //local state
  const [otp, setOtp] = useState("");
  //CONTEXT
  //
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("OtpVerification must be used within AuthContextProvider");
  }
  const {
    setIsLogin,
    handleVerifyOtp,
    handleResendOtp,
    setLoading,
    loading,
    setAccessToken,
    setRefreshToken,
    setLocalUserData,
  } = authContext;

  useEffect(() => {
    setOtp("");
  }, [otpType]);

  const handleVerify = async () => {
    toast.hideAll();
    if (otp.trim().length !== 4) {
      toast.show("Please enter a 4-digit OTP", { type: "warning" });
      return;
    }
    if (!phone?.trim()) {
      toast.show("Missing phone number. Please go back and try again.", { type: "danger" });
      return;
    }

    try {
      setLoading(true);
      const result: any = await handleVerifyOtp(phone, otp, otpType);
      if (result?.ok) {
        if (otpType === "login" || otpType === "signup") {
          const accessToken = result?.data?.access_token;
          const refreshToken = result?.data?.refresh_token;
          const localUserData = result?.data?.user;

          if (!accessToken || !refreshToken || !localUserData) {
            toast.show("Session could not be saved. Try again.", { type: "danger" });
            return;
          }

          // SecureStore values must be strings; save first, then show success.
          await setSecureItem(AUTH_LOCAL_STORAGE_KEYS.ACCESS_TOKEN, String(accessToken));
          await setSecureItem(AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN, String(refreshToken));
          await setSecureItem(AUTH_LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(localUserData));
          setLocalUserData(localUserData);
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
        }

        toast.show("OTP verified successfully", { type: "success" });
        switch (otpType) {
          case "pinOtp":
            if (forgotPin) {
              navigation.navigate(navigationStrings.USER_PIN, {
                mode: "create",
              });
              return;
            }
            navigation.navigate(navigationStrings.USER_PIN, {
              mode: "create",
            });
            return;
          case "signup":
          case "login":
            if (otpType === "login" && loginWithOtp) {
              const onboardingCompleted = await getOnboardingCompleted();
              if (String(onboardingCompleted) === "true") {
                setIsLogin(true);
                return;
              }
              navigation.navigate(navigationStrings.VERIFY_IDENTITY);
              return;
            }
            navigation.navigate(navigationStrings.CHOOSE_LOGIN_METHOD);
            return;
          case "otpFromChooser":
            setIsLogin(true);
            return;
          case "faceId":
            navigation.reset({
              index: 0,
              routes: [{ name: navigationStrings.CHOOSE_LOGIN_METHOD }],
            });
            return;
          default:
            navigation.navigate(navigationStrings.CHOOSE_LOGIN_METHOD);
        }
      } else {
        toast.show(result?.error || "OTP verification failed", { type: "danger" });
      }
    } catch (error: any) {
      const message = error?.error || "Something went wrong";
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  //handle resend OTP
  const handleResendOtpPress = async () => {
    toast.hideAll();

    if (!phone?.trim()) {
      toast.show("Missing phone number. Please go back and try again.", { type: "danger" });
      return;
    }
    try {
      const result: any = await handleResendOtp(phone, "forgot_password");
      if (result?.ok) {
        toast.show(`Otp code : ${result?.data?.otp}`, { type: "success" });
      } else {
        toast.show(result?.error || "OTP resend failed", { type: "danger" });
      }
    } catch (error: any) {
      const message = error?.error || "Something went wrong";
      toast.show(message, { type: "danger" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <IconComponent
            icon={<LeftArrow width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subTitle}>Enter the 4-digit code sent to your Email address</Text>

          <View style={styles.otpContainer}>
            <OtpTextInput otp={otp} setOtp={setOtp} />
          </View>

          <OtpTimer initialSeconds={30} onResend={handleResendOtpPress} />

          <ReusableButton
            title={loading ? "Verifying…" : "Verify"}
            onPress={handleVerify}
            disabled={loading}
            containerStyle={styles.verifyBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: Platform.OS === "ios" ? 4 : 12,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  otpContainer: {
    marginTop: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyBtn: {
    marginTop: 28,
    width: "100%",
  },
});
