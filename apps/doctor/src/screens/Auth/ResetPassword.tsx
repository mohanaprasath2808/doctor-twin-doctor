import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import PasswordIcon from "../../assets/icon/passwordIcon.svg";
import HideIcon from "../../assets/icon/hideIcon.svg";
import UnhideIcon from "../../assets/icon/unHide.svg";
import BackIcon from "../../assets/icon/backArrow.svg";
import navigationStrings from "../../constants/navigationStrings";
import OtpTimer from "../../components/Auth/OtpTimer";
import { handleVerifyOtp, handleResendOtp, handleResetPassword } from "../../service/authService";
import { ResetPasswordRouteParams } from "../../types/authRoute";
import { useAppStore } from "../../store/useAppStore";
const ResetPassword = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const route = useRoute();
  const { email } = route.params as ResetPasswordRouteParams;
  //local state
  const [otp, setOtp] = useState("");
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //context
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);

  //Login Handler
  const handleLogin = () => {
    navigation.pop(2);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (isOtpVerified) {
      setIsOtpVerified(false);
    }
  };

  //Verify OTP Handler
  const handleVerifyOtpChange = async () => {
    toast.hideAll();
    if (otp.trim().length !== 4) {
      toast.show("Please enter a valid 4-digit OTP.", { type: "warning" });
      return;
    }
    try {
      setLoading(true);
      const response: any = await handleVerifyOtp(email, otp, "forgot_password");
      console.log(response, "response in Reset Password Screen");
      if (response?.ok) {
        setIsOtpVerified(true);
        setToken(response?.data?.data?.token);
        toast.show("OTP verified successfully.", { type: "success" });
      } else {
        toast.show((response as any)?.detail, { type: "danger" });
      }
    } catch (e) {
      const message = (e as any)?.detail || (e as any)?.message || "Something went wrong.";
      console.log(message, "message in Reset Password Screen");
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };
  //Resend OTP Handler
  const handleResendOtpChange = async () => {
    toast.hideAll();
    try {
      setLoading(true);
      const response: any = await handleResendOtp(email, "forgot_password");
      if (response?.ok) {
        const toastOtp = response?.data?.data?.otp;
        toast.show(`Otp code : ${toastOtp}`, { type: "success" });
      } else {
        toast.show((response as any)?.detail, { type: "danger" });
      }
    } catch (e) {
      const message = (e as any)?.detail || (e as any)?.message || "Something went wrong.";
      console.log(message, "message in Reset Password Screen");
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };
  //Reset Password Handler
  const handleResetPasswordChange = async () => {
    toast.hideAll();
    if (!isOtpVerified) {
      toast.show("Please verify OTP before resetting password.", { type: "warning" });
      return;
    }
    if (password !== confirmPassword) {
      toast.show("Password and confirm password do not match.", { type: "warning" });
      return;
    }
    if (!confirmPassword.trim()) {
      toast.show("Please enter a new password.", { type: "warning" });
      return;
    }
    try {
      setLoading(true);
      const response: any = await handleResetPassword(token, email, confirmPassword);
      console.log(response, "response in Reset Password Screen");
      if (response?.ok) {
        toast.show("Password reset successfully.", { type: "success" });
        navigation.pop(2);
      } else {
        toast.show((response as any)?.detail, { type: "danger" });
      }
    } catch (e) {
      const message = (e as any)?.detail || (e as any)?.message || "Something went wrong.";
      console.log(message, "message in Reset Password Screen");
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

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

      <Text style={styles.title}>Reset your Password</Text>
      <Text style={styles.subtitle}>
        Enter the OTP sent to your email and create a new password
      </Text>

      <View style={styles.otpContainer} pointerEvents={isOtpVerified ? "none" : "auto"}>
        <OtpTextInput otp={otp} setOtp={handleOtpChange} />
      </View>

      <View pointerEvents={isOtpVerified ? "none" : "auto"}>
        <OtpTimer initialSeconds={30} onResend={handleResendOtpChange} />
      </View>

      <ReusableButton
        title={loading ? "Verifying OTP…" : isOtpVerified ? "OTP Verified" : "Verify OTP"}
        onPress={handleVerifyOtpChange}
        containerStyle={styles.verifyBtn}
        height={38}
        width={150}
        borderRadius={20}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
        textStyle={styles.verifyBtnText}
        disabled={loading || isOtpVerified}
      />
      <Text style={styles.label}>Password</Text>
      <InputField
        placeholder="Enter password"
        secureTextEntry={secure}
        value={password}
        onChangeText={setPassword}
        leftIcon={<PasswordIcon width={18} height={18} />}
        rightIcon={
          secure ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
        }
        onRightIconPress={() => setSecure(!secure)}
      />

      <Text style={styles.label}>Confirm new password</Text>
      <InputField
        placeholder="Enter password"
        secureTextEntry={confirmSecure}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        leftIcon={<PasswordIcon width={18} height={18} />}
        rightIcon={
          confirmSecure ? (
            <UnhideIcon width={18} height={18} />
          ) : (
            <HideIcon width={18} height={18} />
          )
        }
        onRightIconPress={() => setConfirmSecure(!confirmSecure)}
      />

      <ReusableButton
        title="Reset Password"
        onPress={handleResetPasswordChange}
        disabled={!isOtpVerified}
        containerStyle={styles.resetBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Remember password? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    lineHeight: 20,
  },
  otpContainer: {
    marginTop: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 24,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  verifyBtn: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
  verifyBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },
  resetBtn: {
    marginTop: 30,
  },
  footerContainer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  loginText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
});
