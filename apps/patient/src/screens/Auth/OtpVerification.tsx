import React, { useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

const RESEND_COOLDOWN_SECONDS = 30;

const formatCountdown = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const OtpVerification = () => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [secondsUntilResend, setSecondsUntilResend] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsUntilResend <= 0) return;
    const id = setInterval(() => {
      setSecondsUntilResend((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsUntilResend > 0]);

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

  const renderOtpDigit = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.otpItem}>
      <View style={styles.otpInnerShadow}>
        <InnerShadowView width={54} height={54} borderRadius={27} color="#F7FBFF" />
      </View>
      <TextInput
        ref={(ref) => {
          inputRefs.current[index] = ref;
        }}
        value={item}
        onChangeText={(text) => handleOtpChange(index, text)}
        onKeyPress={({ nativeEvent }) => handleBackspace(index, nativeEvent.key)}
        keyboardType="number-pad"
        maxLength={1}
        textAlign="center"
        style={styles.otpInput}
        selectionColor={COLORS.PRIMARY}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LeftArrowIcon width={26} height={26} />
      </TouchableOpacity>

      <View style={styles.textBlock}>
        <Text style={styles.heading}>Verification Code</Text>
        <Text style={styles.subHeading}>Enter the 4-digit code sent to your Email address</Text>
      </View>

      <View style={styles.inputBlock}>
        <View style={styles.otpRow}>
          <FlatList
            data={otp}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderOtpDigit}
            horizontal
            scrollEnabled={false}
            style={styles.otpList}
            contentContainerStyle={styles.otpListContent}
          />
        </View>

        <View style={styles.resendRow}>
          {secondsUntilResend === 0 ? (
            <>
              <Text style={styles.resendText}>Didn&apos;t get the code?</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setSecondsUntilResend(RESEND_COOLDOWN_SECONDS)}
              >
                <Text style={styles.timerText}>Resend OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.resendText}>You can resend OTP in</Text>
              <Text style={styles.timerText}>{formatCountdown(secondsUntilResend)}</Text>
            </>
          )}
        </View>
      </View>

      <ReusableButton
        title="Verify"
        textColor="#FFFFFF"
        backgroundColor={COLORS.PRIMARY}
        containerStyle={styles.verifyButton}
        onPress={() => navigation.navigate(navigationStrings.VERIFY_IDENTITY)}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
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
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    letterSpacing: 0.64,
    color: COLORS.TEXT_PRIMARY,
  },
  subHeading: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  inputBlock: {
    marginTop: 38,
    alignItems: "center",
    gap: 24,
  },
  otpRow: {
    width: "100%",
    alignItems: "center",
  },
  otpList: {
    flexGrow: 0,
    height: 54,
  },
  otpListContent: {
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
  timerText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  verifyButton: {
    marginTop: 30,
  },
});

export default OtpVerification;