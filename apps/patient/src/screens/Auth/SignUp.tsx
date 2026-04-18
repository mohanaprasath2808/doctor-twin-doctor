import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import MailIcon from "../../assets/icons/mailIcon.svg";
import PasswordIcon from "../../assets/icons/passwordIcon.svg";
import HideIcon from "../../assets/icons/hideIcon.svg";
import UnhideIcon from "../../assets/icons/unHide.svg";
import FirstNameIcon from "../../assets/icons/firstName.svg";
import BirthIcon from "../../assets/icons/birth.svg";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

const SignUp = () => {
  const navigation = useNavigation<any>();
  const [secure, setSecure] = useState(true);

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

          <View style={styles.titleBlock}>
            <Text style={styles.heading}>Sign up</Text>
            <Text style={styles.subHeading}>Create an account to continue!</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>First Name</Text>
              <InputField
                placeholder="First Name"
                leftIcon={<FirstNameIcon width={18} height={18} />}
                containerStyle={styles.fieldNoTop}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>Last Name</Text>
              <InputField
                placeholder="Last Name"
                leftIcon={<FirstNameIcon width={18} height={18} />}
                containerStyle={styles.fieldNoTop}
              />
            </View>
          </View>

          <Text style={[styles.label, styles.fieldTop]}>Email</Text>
          <InputField
            placeholder="Enter email"
            leftIcon={<MailIcon width={18} height={18} />}
            containerStyle={styles.fieldNoTop}
          />

          <Text style={[styles.label, styles.fieldTop]}>Phone Number</Text>
          <InputField
            placeholder="Enter phone number"
            leftIcon={<Text style={styles.flag}>🇬🇧</Text>}
            containerStyle={styles.fieldNoTop}
          />

          <Text style={[styles.label, styles.fieldTop]}>Birth of Date</Text>
          <InputField
            placeholder="Select DOB"
            leftIcon={<BirthIcon width={18} height={18} />}
            containerStyle={styles.fieldNoTop}
          />

          <Text style={[styles.label, styles.fieldTop]}>Set Password</Text>
          <InputField
            placeholder="Enter password"
            secureTextEntry={secure}
            leftIcon={<PasswordIcon width={18} height={18} />}
            rightIcon={
              secure ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
            }
            onRightIconPress={() => setSecure(!secure)}
            containerStyle={styles.fieldNoTop}
          />

          <View style={styles.registerWrap}>
            <ReusableButton
              onPress={() => navigation.navigate(navigationStrings.OTP_VERIFICATION)}
              title="Register"
              textColor="#FFFFFF"
              backgroundColor={COLORS.PRIMARY}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomFixed}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.LOGIN)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 22,
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
  titleBlock: {
    marginTop: 20,
  },
  heading: {
    fontSize: 48 / 1.5,
    lineHeight: 40,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    letterSpacing: 0.64,
  },
  subHeading: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
  },
  halfField: {
    flex: 1,
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
    marginTop: 18,
  },
  flag: {
    fontSize: 18,
    lineHeight: 18,
  },
  registerWrap: {
    marginTop: 30,
  },
  bottomFixed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingBottom: 16,
    paddingTop: 8,
  },
  bottomText: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_PRIMARY_60,
    fontWeight: "400",
  },
  loginText: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
});

export default SignUp;
