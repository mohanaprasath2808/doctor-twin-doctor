import React, { useContext, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import OtpTimer from "../../components/Auth/OtpTimer";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/theme";
import ReusableButton from "../../neomorphism/ReusableButton";
import IconComponent from "../../neomorphism/IconComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import BackIcon from "../../assets/icon/backArrow.svg";
import navigationStrings from "../../constants/navigationStrings";

type OtpSource = "login" | "sso-sign-in" | "user-pin";

type OtpRouteParams = {
  source?: OtpSource;
};

const OtpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState("");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within AuthContextProvider");
  }
  const { setIsLogin } = authContext;
  //Verify OTP Handler
  const handleVerify = () => {
    const source = (route.params as OtpRouteParams | undefined)?.source;

    switch (source) {
      case "login":
        navigation.navigate(navigationStrings.SECURE_LOGIN as never);
        return;
      case "sso-sign-in":
      case "user-pin":
        navigation.navigate(navigationStrings.HIPAA_PRIVACY_GATE as never);
        return;
      default:
        setIsLogin(true);
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

      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subTitle}>
        Enter the 4-digit code sent to your Email address
      </Text>

      <View style={styles.otpContainer}>
        <OtpTextInput otp={otp} setOtp={setOtp} />
      </View>

      <OtpTimer initialSeconds={30} onResend={() => { }} />

      <ReusableButton
        title="Verify"
        onPress={handleVerify}
        containerStyle={styles.verifyBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />
    </SafeAreaView>
  );
};

export default OtpVerification;

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
  otpContainer: {
    marginTop: 34,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyBtn: {
    marginTop: 28,
  },
});
