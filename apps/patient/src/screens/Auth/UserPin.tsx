import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import LeftArrow from "../../assets/icons/leftArrow.svg";
import { AuthContext } from "../../context/AuthContext";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";
import { UserPinRouteParams } from "../../types/authRoute";
import { useToast } from "react-native-toast-notifications";
import { getOnboardingCompleted } from "../../utils/authStorage";

const UserPinScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { mode = "verify" } = (route.params ?? {}) as UserPinRouteParams;
  const [pin, setPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [forgotPinLoading, setForgotPinLoading] = useState(false);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("UserPin requires AuthContextProvider");
  }
  const {
    setIsLogin,
    localUserData,
    handleSetUserPin,
    handleVerifyUserPin,
    validateToken,
    handleResendOtp,
  } = authContext;

  const title = mode === "create" ? "Set your User PIN" : "Enter your User PIN";
  const subtitle =
    mode === "create"
      ? "Enter the 4-digit code to set your PIN"
      : "Enter your 4-digit PIN to continue";

  const requestSetUserPin = async () => {
    toast.hideAll();
    if (pin.trim().length !== 4) {
      toast.show("Please enter a valid 4-digit PIN.", { type: "warning" });
      return;
    }
    const userId = localUserData?.user_id;
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
          routes: [{ name: navigationStrings.CHOOSE_LOGIN_METHOD }],
        });
      }
    } catch (error: any) {
      toast.show("Something went wrong. Try again.", { type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  const requestVerifyUserPin = async () => {
    toast.hideAll();
    if (pin.trim().length !== 4) {
      toast.show("Please enter a valid 4-digit PIN.", { type: "warning" });
      return;
    }
    const userId = localUserData?.user_id;
    if (!userId) {
      toast.show("User not found. Please login again.", { type: "warning" });
      return;
    }
    setSubmitting(true);
    try {
      const response: any = await handleVerifyUserPin(userId, pin);
      console.log(response, "response in requestVerifyUserPin");
      if (response.ok) {
        toast.show("User pin verified successfully.", { type: "success" });
        const onboardingCompleted = await getOnboardingCompleted();
        if (String(onboardingCompleted) === "true") {
          setIsLogin(true);
          return;
        }
        navigation.navigate(navigationStrings.VERIFY_IDENTITY);
        return;
      }
      toast.show(response?.error || "Invalid PIN", { type: "danger" });
    } catch (error: any) {
      toast.show("Something went wrong. Try again.", { type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  //handle forgot pin
  const handleForgotPin = async () => {
    toast.hideAll();
    setForgotPinLoading(true);
    const accessToken = await validateToken();
    if (!accessToken) {
      toast.show("Please login again", { type: "danger" });
      setForgotPinLoading(false);
      return;
    }
    try {
      const response: any = await handleResendOtp(localUserData?.phone, "pinOtp");
      if (response?.ok) {
        toast.show(`Otp code : ${response?.data?.otp}`, { type: "success" });
        navigation.navigate(navigationStrings.OTP_VERIFICATION, {
          otpType: "pinOtp",
          phone: localUserData?.phone,
          forgotPin: true,
        });
      } else {
        toast.show(response?.error || "Something went wrong. Try again.", { type: "danger" });
      }
    } catch (error: any) {
      toast.show("Something went wrong. Try again.", { type: "danger" });
    } finally {
      setForgotPinLoading(false);
    }
  };
  const ctaTitle = forgotPinLoading
    ? "Loading..."
    : submitting
      ? mode === "create"
        ? "Setting PIN…"
        : "Verifying PIN…"
      : mode === "create"
        ? "Set PIN"
        : "Verify PIN";
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

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subtitle}</Text>

          <View style={styles.pinContainer}>
            <OtpTextInput otp={pin} setOtp={setPin} />
          </View>

          <ReusableButton
            title={ctaTitle}
            onPress={mode === "create" ? requestSetUserPin : requestVerifyUserPin}
            disabled={submitting || forgotPinLoading}
            containerStyle={styles.ctaBtn}
          />

          {mode === "verify" && (
            <View style={styles.footerRow}>
              <Text style={styles.footerMuted}>Do you remember PIN? </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleForgotPin()}>
                <Text style={styles.footerLink}>Forgot PIN</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserPinScreen;

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
  pinContainer: {
    marginTop: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBtn: {
    marginTop: 36,
    width: "100%",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 28,
    paddingHorizontal: 8,
  },
  footerMuted: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_60,
    fontWeight: "400",
  },
  footerLink: {
    fontSize: 14,
    color: COLORS.ACCENT_LIGHT,
    fontWeight: "600",
  },
});
