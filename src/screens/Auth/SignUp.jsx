import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import KeyboardAvoidingWrapper from "../../neomorphism/KeyboardAvoidingWrapper";
import MailIcon from "../../assets/icon/mailIcon.svg";
import PasswordIcon from "../../assets/icon/passwordIcon.svg";
import HideIcon from "../../assets/icon/hideIcon.svg";
import UnhideIcon from "../../assets/icon/unHide.svg";
import IconComponent from "../../neomorphism/IconComponent";
import ProfileIcon from "../../assets/icon/profile.svg";
import CalendarIcon from "../../assets/icon/calendarIcon.svg";
import FlagIcon from "../../assets/icon/flagIcon.svg";
import BackIcon from "../../assets/icon/backArrow.svg";
import DatePickerField from "../../neomorphism/DatePickerField";
import navigationStrings from "../../constants/navigationStrings";
const SignUp = () => {
  const navigation = useNavigation();
  const [secure, setSecure] = useState(true);
  const [dob, setDob] = useState(null);

  //Register Button Handler
  const handleRegister = () => {
    navigation.navigate(navigationStrings.OTP_VERIFICATION);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <IconComponent
          icon={<BackIcon width={22} height={22} />}
          style={styles.backButton}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>Create an account to continue!</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>First Name</Text>
            <InputField
              placeholder="First Name"
              leftIcon={<ProfileIcon width={18} height={18} />}
              inputStyle={{ fontSize: 11 }}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Last Name</Text>
            <InputField
              placeholder="Last Name"
              leftIcon={<ProfileIcon width={18} height={18} />}
            />
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <InputField
          placeholder="Enter email"
          leftIcon={<MailIcon width={18} height={18} />}
        />

        <Text style={styles.label}>Phone Number</Text>
        <InputField
          placeholder="Enter phone number"
          leftIcon={<FlagIcon width={18} height={18} />}
        />

        <Text style={styles.label}>Birth of Date</Text>
        <DatePickerField
          placeholder="Select DOB"
          leftIcon={<CalendarIcon width={18} height={18} />}
          value={dob}
          onChange={(date) => setDob(date)}
          maximumDate={new Date()}
          containerStyle={{ marginTop: 15 }}
        />

        <Text style={styles.label}>Set Password</Text>
        <InputField
          placeholder="Enter password"
          secureTextEntry={secure}
          leftIcon={<PasswordIcon width={18} height={18} />}
          rightIcon={
            secure ? (
              <UnhideIcon width={18} height={18} />
            ) : (
              <HideIcon width={18} height={18} />
            )
          }
          onRightIconPress={() => setSecure(!secure)}
        />

        <ReusableButton
          title="Register"
          onPress={handleRegister}
          containerStyle={styles.registerBtn}
          backgroundColor="#2E3A8C"
          textColor="#FFFFFF"
        />

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.loginText} onPress={() => navigation.goBack()}>
            Login
          </Text>
        </Text>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
  },
  keyboardWrapper: {
    flex: 1,
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
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    marginTop: 24,
    fontWeight: "400",
  },
  registerBtn: {
    marginTop: 30,
  },
  footerText: {
    marginTop: 34,
    textAlign: "center",
    color: COLORS.TEXT_60,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: "400",
  },
  loginText: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
});
