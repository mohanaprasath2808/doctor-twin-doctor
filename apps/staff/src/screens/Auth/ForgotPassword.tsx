import React, { useContext, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackArrowIcon from "../../assets/icon/backArrow.svg";
import MailIcon from "../../assets/icon/mailIcon.svg";
import IconComponent from "../../components/neomorphism/IconComponent";
import InputField from "../../components/neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../components/neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../components/neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import type { AuthStackParamList } from "../../router/Auth/types";
import { validateEmail } from "../utills/validations";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../../context/AuthContext";

const ForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("ForgotPassword must be used within AuthContextProvider");
  }
  const { resendOtp, isLoading } = authContext;
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleForgotPassword = async () => {
    try {
      const { isValid, email } = handleValidate();
      if (!isValid) {
        return;
      }
      const response = await resendOtp(email ?? "", "forgot_password");
      if (response) {
        navigation.navigate(navigationStrings.RESET_PASSWORD, { email: email ?? "" });
      }
    } catch (error) {
      toast.show("Failed to send reset password email", {
        type: "danger",
      });
      console.error(error);
    }
  };

  const handleValidate = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.show("Email is required", {
        type: "danger",
      });
      return { isValid: false, email: null };
    }
    if (!validateEmail(trimmedEmail)) {
      toast.show("Please enter a valid email address", {
        type: "danger",
      });
      return { isValid: false, email: null };
    }
    return { isValid: true, email: trimmedEmail, password: null };
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topBlock}>
          <IconComponent
            icon={<BackArrowIcon width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.title}>Forgot your password?</Text>

          <Text style={styles.instruction}>
            {`Please enter the email address associated with your account, and we'll email you a link to reset your password.`}
          </Text>

          <Text style={styles.label}>Email</Text>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<MailIcon width={18} height={18} />}
            containerStyle={styles.fieldTightTop}
          />

          <ReusableButton
            title={isLoading ? "Sending..." : "Reset Password"}
            onPress={handleForgotPassword}
            disabled={isLoading}
            containerStyle={styles.resetBtn}
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerMuted}>Remember password? </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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

export default ForgotPassword;

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
  topBlock: {
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
  instruction: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  fieldTightTop: {
    marginTop: 6,
  },
  resetBtn: {
    marginTop: 30,
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
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
});
