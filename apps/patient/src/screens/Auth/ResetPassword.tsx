import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import PasswordIcon from "../../assets/icons/passwordIcon.svg";
import HideIcon from "../../assets/icons/hideIcon.svg";
import UnhideIcon from "../../assets/icons/unHide.svg";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

const ResetPassword = () => {
  const navigation = useNavigation<any>();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <LeftArrowIcon width={26} height={26} />
          </TouchableOpacity>

          <View style={styles.textBlock}>
            <Text style={styles.heading}>Reset your Password</Text>
            <Text style={styles.subHeading}>
              Enter the OTP sent to your email and create a new password
            </Text>
          </View>

          <View style={styles.inputBlock}>
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <View key={index} style={styles.otpItem}>
                  <View style={styles.otpInnerShadow}>
                    <InnerShadowView width={54} height={54} borderRadius={27} color="#F7FBFF" />
                  </View>
                  <TextInput
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(index, text)}
                    onKeyPress={({ nativeEvent }) => handleBackspace(index, nativeEvent.key)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    style={styles.otpInput}
                    selectionColor={COLORS.PRIMARY}
                  />
                </View>
              ))}
            </View>

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn&apos;t get the code?</Text>
              <TouchableOpacity activeOpacity={0.85}>
                <Text style={styles.resendOtpText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.label, styles.fieldTop]}>Password</Text>
          <InputField
            placeholder="Enter password"
            secureTextEntry={securePassword}
            leftIcon={<PasswordIcon width={18} height={18} />}
            rightIcon={
              securePassword ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
            }
            onRightIconPress={() => setSecurePassword(!securePassword)}
            containerStyle={styles.fieldNoTop}
          />

          <Text style={[styles.label, styles.fieldTop]}>Confirm new password</Text>
          <InputField
            placeholder="Enter password"
            secureTextEntry={secureConfirm}
            leftIcon={<PasswordIcon width={18} height={18} />}
            rightIcon={
              secureConfirm ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
            }
            onRightIconPress={() => setSecureConfirm(!secureConfirm)}
            containerStyle={styles.fieldNoTop}
          />

          <View style={styles.resetWrap}>
            <ReusableButton
              title="Reset Password"
              textColor="#FFFFFF"
              backgroundColor={COLORS.PRIMARY}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? 8 : 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  textBlock: {
    marginTop: 20,
    width: "100%",
    gap: 10,
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    letterSpacing: 0.64,
    color: COLORS.TEXT_PRIMARY,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  inputBlock: {
    marginTop: 26,
    alignItems: "center",
    gap: 24,
  },
  otpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  otpItem: {
    width: 54,
    height: 54,
    borderRadius: 27,
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  otpInnerShadow: {
    position: "absolute",
    width: 54,
    height: 54,
  },
  otpInput: {
    width: 54,
    height: 54,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
  },
  resendRow: {
    width: 327,
    height: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  resendText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  resendOtpText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    marginBottom: 4,
  },
  fieldNoTop: {
    marginTop: 0,
  },
  fieldTop: {
    marginTop: 24,
  },
  resetWrap: {
    marginTop: 30,
  },
});

export default ResetPassword;