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
import type { OtpVerificationFlow } from "../../constants/authNavigation";
import { AuthContext } from "../../context/AuthContext";
import IconComponent from "../../neomorphism/IconComponent";

function resolveFlow(routeParams: unknown): OtpVerificationFlow {
  const raw = routeParams as { flow?: OtpVerificationFlow } | undefined;
  return raw?.flow ?? "signup";
}

const OtpVerification = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [otp, setOtp] = useState("");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("OtpVerification must be used within AuthContextProvider");
  }
  const { setIsLogin } = authContext;

  const flow = resolveFlow(route.params);

  useEffect(() => {
    setOtp("");
  }, [flow]);

  const handleVerify = () => {
    switch (flow) {
      case "userPin":
        navigation.navigate(navigationStrings.USER_PIN);
        return;
      case "signup":
      case "otpLogin":
        navigation.navigate(navigationStrings.CHOOSE_LOGIN_METHOD);
        return;
      case "otpFromChooser":
      case "faceId":
        setIsLogin(true);
        return;
      default:
        navigation.navigate(navigationStrings.CHOOSE_LOGIN_METHOD);
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

          <OtpTimer initialSeconds={30} onResend={() => {}} />

          <ReusableButton title="Verify" onPress={handleVerify} containerStyle={styles.verifyBtn} />
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
