import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";
import BackIcon from "../../assets/icon/backArrow.svg";
import ReusableButton from "../../neomorphism/ReusableButton";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import type { SetUserPinRouteParams } from "../../types/authRoute";
import {
  handleResendOtp as requestResendOtp,
  handleSetUserPin,
  handleVerifyUserPin,
} from "../../service/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { useToast } from "react-native-toast-notifications";
import { hasCompletedOnboarding } from "../../utils/authStorage";
import { useAppStore } from "../../store/useAppStore";

const SetUserPin = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { mode = "create" } = (route.params ?? {}) as SetUserPinRouteParams;
  const toast = useToast();
  //local state
  const [submitting, setSubmitting] = useState(false);
  const [pin, setPin] = useState("");
  const [autoNavigate, setAutoNavigate] = useState(false);
  //store state
  const userData = useAuthStore((s) => s.userData);
  const setIsLogin = useAuthStore((s) => s.setIsLogin);
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);

  const title = mode === "verify" ? "Enter your User PIN" : "Set your User PIN";
  const subtitle =
    mode === "verify"
      ? "Enter your 4-digit PIN to continue"
      : "Enter a 4-digit code to set your PIN";
  //handle set user pin
  const requestSetUserPin = async () => {
    toast.hideAll();
    if (pin.trim().length !== 4) {
      toast.show("Please enter a valid 4-digit PIN.", { type: "warning" });
      return;
    }
    const userId = userData?.user_id;
    if (!userId) {
      toast.show("User not found. Please login again.", { type: "warning" });
      return;
    }
    setSubmitting(true);
    try {
      const response: any = await handleSetUserPin(userId, pin);
      console.log(response, "response in requestSetUserPin");
      if (response.ok) {
        toast.show("User pin set successfully.", { type: "success" });
        navigation.reset({
          index: 0,
          routes: [{ name: navigationStrings.SECURE_LOGIN }],
        });
      } else {
        toast.show(response?.data?.error, { type: "danger" });
      }
    } catch (error) {
      toast.show("Something went wrong. Try again.", { type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  //handle verify user pin
  const requestVerifyUserPin = async () => {
    toast.hideAll();
    if (pin.trim().length !== 4) {
      toast.show("Please enter a valid 4-digit PIN.", { type: "warning" });
      return;
    }
    const userId = userData?.user_id;
    if (!userId) {
      toast.show("User not found. Please login again.", { type: "warning" });
      return;
    }
    setSubmitting(true);
    try {
      setLoading(true);
      const response: any = await handleVerifyUserPin(userId, pin);
      console.log(response, "response in requestVerifyUserPin");
      if (response.ok) {
        if (await hasCompletedOnboarding()) {
          // setIsLogin(true);
          navigation.navigate(navigationStrings.ONBOARDING_STACK, {
            screen: navigationStrings.START_SHIFT_COVERAGE,
          });
        } else {
          // Onboarding not completed → go to HIPAA gate first.
          navigation.navigate(navigationStrings.ONBOARDING_STACK);
        }
      } else {
        const result = response?.data?.meta?.failedAttempts;
        if (result >= 3) {
          setAutoNavigate(true);
          return;
        }
        toast.show(response?.data?.error, { type: "danger" });
      }
    } catch (error) {
      toast.show("Something went wrong. Try again.", { type: "danger" });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  //handle forgot pin
  const handleForgotPin = () => {};

  //automatic navigation to Device Trust Verification Screen
  useEffect(() => {
    if (mode === "verify") {
      if (autoNavigate) {
        navigation.navigate(navigationStrings.DEVICE_TRUST_VERIFICATION);
      }
    }
  }, [mode, navigation, autoNavigate]);
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

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subtitle}</Text>

      <View style={styles.pinRow}>
        <OtpTextInput otp={pin} setOtp={setPin} />
      </View>

      <ReusableButton
        title={
          submitting || loading
            ? mode === "create"
              ? "Setting PIN…"
              : "Verifying PIN…"
            : mode === "create"
              ? "Set PIN"
              : "Verify PIN"
        }
        onPress={mode === "create" ? requestSetUserPin : requestVerifyUserPin}
        disabled={submitting || loading}
        containerStyle={styles.continueBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      {!(mode === "create") && (
        <View style={styles.forgotPinRow}>
          <Text style={styles.forgotPinText}>Do you remember PIN?</Text>
          <TouchableOpacity onPress={handleForgotPin}>
            <Text style={styles.forgotPinButtonText}>Forgot PIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SetUserPin;

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
  pinRow: {
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtn: {
    marginTop: 40,
  },
  forgotPinRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  forgotPinText: {
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    fontFamily: "SF Pro Text Medium",
  },
  forgotPinButtonText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: "600",
    fontFamily: "SF Pro Text Medium",
  },
});
