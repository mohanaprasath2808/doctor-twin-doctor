import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import MailIcon from "../../assets/icons/mailIcon.svg";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

const ForgotPassword = () => {
  const navigation = useNavigation<any>();

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
        <Text style={styles.heading}>Forgot your password?</Text>
        <Text style={styles.subHeading}>
          Please enter the email address associated with your account, and we&apos;ll email you a
          link to reset your password.
        </Text>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Email / Phone number</Text>
        <InputField
          placeholder="Enter email or phone number"
          leftIcon={<MailIcon width={18} height={18} />}
          containerStyle={styles.inputContainer}
        />
      </View>

      <ReusableButton
        title="Reset Password"
        textColor="#FFFFFF"
        backgroundColor={COLORS.PRIMARY}
        containerStyle={styles.resetButton}
        onPress={() => navigation.navigate(navigationStrings.RESET_PASSWORD)}
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
  fieldBlock: {
    marginTop: 24,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    marginBottom: 4,
  },
  inputContainer: {
    marginTop: 0,
  },
  resetButton: {
    marginTop: 30,
  },
});

export default ForgotPassword;