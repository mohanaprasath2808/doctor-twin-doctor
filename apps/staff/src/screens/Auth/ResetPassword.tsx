import React, { useContext, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackArrowIcon from "../../assets/icon/backArrow.svg";
import HideIcon from "../../assets/icon/hideIcon.svg";
import PasswordIcon from "../../assets/icon/passwordIcon.svg";
import UnhideIcon from "../../assets/icon/unHide.svg";
import OtpTextInput, { type OtpTextInputRef } from "../../components/Auth/OtpTextInput";
import OtpTimer from "../../components/Auth/OtpTimer";
import IconComponent from "../../components/neomorphism/IconComponent";
import InputField from "../../components/neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../components/neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../components/neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import type { AuthStackParamList } from "../../router/Auth/types";
import { useToast } from "react-native-toast-notifications";
import navigationStrings from "../../constants/navigationStrings";
import { getPasswordValidationError } from "../utills/validations";

const OTP_LENGTH = 4;

const ResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, "ResetPassword">>();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("ResetPassword must be used within AuthContextProvider");
  }
  const { resendOtp, verifyOtp, isLoading, resetPassword } = authContext;

  const email = route.params?.email?.trim() ?? "";

  const toast = useToast();
  const otpInputRef = useRef<OtpTextInputRef>(null);
  const [otp, setOtp] = useState("");
  const [otpTime, setOtpTime] = useState<number>(30);
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const goToLogin = () => {
    navigation.pop(2);
  };

  const handleVerifyOtp = async () => {
    toast.hideAll();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.show("Missing email. Go back and try again.", { type: "danger" });
      return false;
    }
    if (otp.length !== OTP_LENGTH) {
      toast.show("Please enter the complete OTP", { type: "danger" });
      return false;
    }
    const response: any = await verifyOtp({
      otp_type: "forgot_password",
      role: "staff",
      code: otp,
      email,
    });
    if (response?.verified) {
      setOtpVerified(true);
      setToken(response.token);
      setExpiresAt(response?.expires_at); // in seconds
    }
  };

  useEffect(() => {
    if (expiresAt) {
      const timer = setTimeout(() => {
        setExpiresAt(0);
        setToken(null);
      }, 1000 * expiresAt);
      return () => clearTimeout(timer);
    }
  }, [expiresAt]);

  const handleResendOtp = async () => {
    if (!email) return;
    handleClose();
    await resendOtp(email, "forgot_password");
  };

  const handleResetPassword = async () => {
    if (!token) {
      toast.show("Session expired. Verify OTP again.", { type: "danger" });
      handleClose();
      return;
    }
    const pwdError = getPasswordValidationError(password);
    if (pwdError) {
      toast.show(pwdError, { type: "danger" });
      return;
    }
    if (password !== confirmPassword) {
      toast.show("Passwords do not match", { type: "danger" });
      return;
    }
    const response = await resetPassword("staff", token, email, password);
    if (response) {
      handleClose();
      navigation.reset({
        index: 0,
        routes: [{ name: navigationStrings.LOGIN }],
      });
    } else {
      handleClose();
      setOtpTime(0);
    }
  };

  const handleClose = () => {
    setPassword("");
    setConfirmPassword("");
    setOtpVerified(false);
    setOtp("");
    otpInputRef.current?.resetFocusState();
    setToken(null);
    setExpiresAt(null);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.main}>
          <IconComponent
            icon={<BackArrowIcon width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.title}>Reset your Password</Text>
          <Text style={styles.subtitle}>
            Enter the OTP sent to your email and create a new password
          </Text>

          <View
            style={[styles.otpWrap, otpVerified && styles.otpDisabled]}
            pointerEvents={otpVerified ? "none" : "auto"}
          >
            <OtpTextInput ref={otpInputRef} otp={otp} setOtp={setOtp} />
          </View>

          {otpVerified ? (
            <Text style={styles.otpVerifiedLabel}>OTP verified successfully</Text>
          ) : (
            <OtpTimer initialSeconds={otpTime} onResend={handleResendOtp} />
          )}

          {otpVerified ? (
            <>
              <Text style={styles.label}>Password</Text>
              <InputField
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry={secure}
                leftIcon={<PasswordIcon width={18} height={18} />}
                rightIcon={
                  secure ? (
                    <UnhideIcon width={18} height={18} />
                  ) : (
                    <HideIcon width={18} height={18} />
                  )
                }
                onRightIconPress={() => setSecure((s) => !s)}
                containerStyle={styles.fieldTightTop}
              />

              <Text style={[styles.label, styles.labelSpaced]}>Confirm new password</Text>
              <InputField
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter password"
                secureTextEntry={confirmSecure}
                leftIcon={<PasswordIcon width={18} height={18} />}
                rightIcon={
                  confirmSecure ? (
                    <UnhideIcon width={18} height={18} />
                  ) : (
                    <HideIcon width={18} height={18} />
                  )
                }
                onRightIconPress={() => setConfirmSecure((s) => !s)}
                containerStyle={styles.fieldTightTop}
              />
            </>
          ) : null}

          <ReusableButton
            title={otpVerified ? "Reset Password" : isLoading ? "Verifying..." : "Verify"}
            onPress={otpVerified ? handleResetPassword : handleVerifyOtp}
            disabled={otpVerified ? isLoading : isLoading || otp.length !== OTP_LENGTH}
            containerStyle={styles.resetBtn}
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerMuted}>Remember password? </Text>
            <TouchableOpacity
              onPress={goToLogin}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  main: {
    paddingTop: 8,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    marginBottom: 8,
    fontFamily: "SF-Pro-Display-Regular",
  },
  otpWrap: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  otpDisabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    marginTop: 30,
  },
  otpVerifiedLabel: {
    fontSize: 12,
    color: COLORS.GREEN,
    textAlign: "center",
    fontFamily: "SF-Pro-Display-Regular",
    fontWeight: "400",
    marginTop: 20,
  },
  labelSpaced: {
    marginTop: 24,
  },
  fieldTightTop: {
    marginTop: 6,
  },
  resetBtn: {
    marginTop: 28,
  },
  footer: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 8,
  },
  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  footerMuted: {
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
