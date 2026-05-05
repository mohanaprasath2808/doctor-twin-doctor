import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import MailIcon from "../../assets/icon/mailIcon.svg";
import BackIcon from "../../assets/icon/backArrow.svg";
import navigationStrings from "../../constants/navigationStrings";
import { ForgotPasswordRouteParams } from "../../types/authRoute";
import { useToast } from "react-native-toast-notifications";
import { EMAIL_REGEX } from "../../constants/contant";
import { handleResendOtp } from "../../service/authService";
import { useAppStore } from "../../store/useAppStore";

const ForgotPassword = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { email } = route.params as ForgotPasswordRouteParams;
  console.log(email, "email in Forgot Password Screen");
  //local state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(email);
  //context
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  //Reset Password Handler
  const handleResetPassword = async () => {
    if (!forgotPasswordEmail.trim()) {
      toast.show("Please enter email.", { type: "warning" });
      return;
    }
    if (!EMAIL_REGEX.test(forgotPasswordEmail)) {
      toast.show("Please enter a valid email.", { type: "warning" });
      return;
    }
    try {
      setLoading(true);
      const response: any = await handleResendOtp(forgotPasswordEmail, "forgot_password");
      console.log(response, "response in Forgot Password Screen");
      if (response?.ok) {
        navigation.navigate(navigationStrings.RESET_PASSWORD, {
          email: forgotPasswordEmail,
        });
        const toastOtp = response?.data?.data?.otp;
        toast.show(`Otp code : ${toastOtp}`, { type: "success" });
      } else {
        toast.show((response as any)?.detail, { type: "danger" });
      }
    } catch (e) {
      const message = (e as any)?.detail || (e as any)?.message || "Something went wrong.";
      console.log(message, "message in Forgot Password Screen");
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

      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.subtitle}>
        Please enter the email address associated with your account, and we’ll email you a link to
        reset your password.
      </Text>

      <Text style={styles.label}>Email</Text>
      <InputField
        placeholder="Enter email"
        leftIcon={<MailIcon width={18} height={18} />}
        value={forgotPasswordEmail}
        onChangeText={setForgotPasswordEmail}
      />

      <ReusableButton
        title={loading ? "Resetting password…" : "Reset Password"}
        onPress={handleResetPassword}
        containerStyle={styles.resetBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
        disabled={loading}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Remember password? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
    lineHeight: 18,
  },
  label: {
    marginTop: 24,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  resetBtn: {
    marginTop: 26,
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
