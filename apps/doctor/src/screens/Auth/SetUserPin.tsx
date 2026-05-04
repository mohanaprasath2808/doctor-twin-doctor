import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";
import BackIcon from "../../assets/icon/backArrow.svg";
import ReusableButton from "../../neomorphism/ReusableButton";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import type { SetUserPinRouteParams } from "../../types/authRoute";
import { handleResendOtp as requestResendOtp } from "../../service/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { useToast } from "react-native-toast-notifications";

const SetUserPin = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const toast = useToast();
  const userData = useAuthStore((s) => s.userData);
  const { mode = "create" } = (route.params ?? {}) as SetUserPinRouteParams;
  const [pin, setPin] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onContinue = async () => {
    if (userData && userData.face_id_set !== true) {
      setSubmitting(true);
      try {
        const result = await requestResendOtp(userData.email, "login");
        if (!result.ok) {
          toast.show("Could not send code. Try again.", { type: "danger" });
          return;
        }
        toast.show("Verification code sent.", { type: "success" });
        navigation.navigate(navigationStrings.OTP_VERIFICATION, {
          email: userData.email,
          source: "face-id-setup",
        });
      } finally {
        setSubmitting(false);
      }
      return;
    }
    navigation.navigate(navigationStrings.HIPAA_PRIVACY_GATE);
  };

  const title = mode === "verify" ? "Enter your User PIN" : "Set your User PIN";
  const subtitle =
    mode === "verify"
      ? "Enter your 4-digit PIN to continue"
      : "Enter a 4-digit code to set your PIN";

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
        title="Continue"
        onPress={onContinue}
        disabled={submitting}
        containerStyle={styles.continueBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />
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
});
