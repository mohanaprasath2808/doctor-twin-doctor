import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackArrowIcon from "../../assets/icon/backArrow.svg";
import HideIcon from "../../assets/icon/hideIcon.svg";
import PasswordIcon from "../../assets/icon/passwordIcon.svg";
import UnhideIcon from "../../assets/icon/unHide.svg";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import OtpTimer from "../../components/Auth/OtpTimer";
import IconComponent from "../../components/neomorphism/IconComponent";
import InputField from "../../components/neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../components/neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../components/neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import type { AuthStackParamList } from "../../router/Auth/types";

const ResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);

  const goToLogin = () => {
    navigation.pop(2);
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

          <View style={styles.otpWrap}>
            <OtpTextInput otp={otp} setOtp={setOtp} />
          </View>

          <OtpTimer initialSeconds={30} onResend={() => {}} />

          <Text style={styles.label}>Password</Text>
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={secure}
            leftIcon={<PasswordIcon width={18} height={18} />}
            rightIcon={
              secure ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
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

          <ReusableButton
            title="Reset Password"
            onPress={() => {}}
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
    paddingBottom: 16,
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    marginBottom: 8,
  },
  otpWrap: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: "400",
    marginTop: 30,
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
    paddingBottom: 12,
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
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
});
