import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import FirstNameIcon from "../../assets/icons/firstName.svg";
import MailIcon from "../../assets/icons/mailIcon.svg";
import BirthIcon from "../../assets/icons/birth.svg";
import FlagIcon from "../../assets/icons/flagIcon.svg";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCheckboxMark from "../../components/Auth/NeumorphicCheckboxMark";

/** Replace with your live policy URLs when ready. */
const TERMS_URL = "https://example.com/terms-of-service";
const PRIVACY_URL = "https://example.com/privacy-policy";
const HIPAA_URL = "https://example.com/hipaa";

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = () => {
    navigation.navigate(navigationStrings.OTP_VERIFICATION, { flow: "signup" as const });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.imageContainer}
            wrapperStyle={styles.avatarWrapper}
            overlayStyle={styles.overlayImage}
            imageStyle={styles.avatarImage}
          />
          <Text style={styles.title}>Sign up to your account.</Text>
          <Text style={styles.subtitle}>Create an account to continue!</Text>

          <View style={styles.form}>
            <View style={styles.nameRow}>
              <View style={styles.nameCol}>
                <Text style={[styles.label, styles.labelRow]}>First Name</Text>
                <InputField
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  leftIcon={<FirstNameIcon width={18} height={18} />}
                  containerStyle={styles.inputField}
                />
              </View>
              <View style={styles.nameCol}>
                <Text style={[styles.label, styles.labelRow]}>Last Name</Text>
                <InputField
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  leftIcon={<FirstNameIcon width={18} height={18} />}
                  containerStyle={styles.inputField}
                />
              </View>
            </View>

            <Text style={styles.label}>Email</Text>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={<MailIcon width={18} height={18} />}
              containerStyle={styles.inputField}
            />

            <Text style={styles.label}>Phone Number</Text>
            <InputField
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              autoCorrect={false}
              leftIcon={<FlagIcon width={18} height={18} />}
              containerStyle={styles.inputField}
            />

            <Text style={styles.label}>Birth of Date</Text>
            <InputField
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="DD/MM/YYYY"
              keyboardType="numbers-and-punctuation"
              autoCorrect={false}
              leftIcon={<BirthIcon width={18} height={18} />}
              containerStyle={styles.inputField}
            />

            <View style={styles.termsRow}>
              <TouchableOpacity
                accessibilityRole="checkbox"
                accessibilityState={{ checked: termsAccepted }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => setTermsAccepted(!termsAccepted)}
                style={styles.checkboxHit}
              >
                <NeumorphicCheckboxMark selected={termsAccepted} />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                By proceeding, I agree to the{" "}
                <Text style={styles.link} onPress={() => Linking.openURL(TERMS_URL)}>
                  Terms of Service
                </Text>
                , acknowledge the{" "}
                <Text style={styles.link} onPress={() => Linking.openURL(PRIVACY_URL)}>
                  Privacy Policy
                </Text>
                , consent to receive important notifications, and provide my{" "}
                <Text style={styles.link} onPress={() => Linking.openURL(HIPAA_URL)}>
                  HIPAA consent
                </Text>{" "}
                for the use and handling of my health information as applicable.
              </Text>
            </View>

            <ReusableButton
              title="Register"
              onPress={handleRegister}
              containerStyle={styles.registerBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 24,
    paddingBottom: 24,
  },
  imageContainer: {
    alignItems: "center",
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 115,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2D2D2D",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#8E8E93",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  form: {
    marginTop: 28,
    width: "100%",
    paddingHorizontal: 16,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 0,
  },
  nameCol: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 4,
    marginTop: 12,
  },
  labelRow: {
    marginTop: 0,
  },
  inputField: {
    marginTop: 0,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    gap: 10,
    paddingRight: 4,
  },
  checkboxHit: {
    paddingTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 14,
    color: COLORS.TEXT_40,
    fontWeight: "400",
  },
  link: {
    color: COLORS.SECONDARY,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  registerBtn: {
    marginTop: 28,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 10,
  },
  footerMuted: {
    textAlign: "center",
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "400",
  },
  footerLink: {
    color: COLORS.SECONDARY,
    fontWeight: "600",
    fontSize: 14,
  },
});
