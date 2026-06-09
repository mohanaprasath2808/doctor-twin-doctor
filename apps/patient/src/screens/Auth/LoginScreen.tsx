import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import FlagIcon from "../../assets/icons/flagIcon.svg";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "react-native-toast-notifications";

const DISPLAY_NAME = "Sarah";

const LoginScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState("");
  //CONTEXT
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("LoginScreen must be used within AuthContextProvider");
  }
  const { handleLogin, loading, setLoading } = authContext;

  //handle login press
  const handleLoginPress = async () => {
    toast.hideAll();
    if (!phone) {
      toast.show("Please enter phone number", { type: "warning" });
      return;
    }
    try {
      setLoading(true);
      const result: any = await handleLogin(phone);
      console.log(result, "result in handleLoginPress");
      if (result?.ok) {
        navigation.navigate(navigationStrings.OTP_VERIFICATION, { otpType: "login", phone: phone });
        toast.show(`Otp code : ${result?.data?.otp}`, { type: "success" });
      } else if (result?.error || result?.message === "Patient not found.Please sign up first.") {
        toast.show("Patient not fond.Please sign up first.", { type: "danger" });
        navigation.navigate(navigationStrings.SIGNUP, {
          phone: phone,
        });
      } else {
        toast.show(result?.error || result?.message || "Login failed. Please try again.", {
          type: "danger",
        });
      }
    } catch (error: any) {
      const message = error?.error || "Something went wrong.";
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Welcome Back, {DISPLAY_NAME}</Text>
          <Text style={styles.subtitle}>Please sign in to your account.</Text>

          <View style={styles.form}>
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

            <ReusableButton
              title={loading ? "Logging in…" : "Login"}
              onPress={handleLoginPress}
              disabled={loading}
              containerStyle={styles.loginBtn}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerMuted}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SIGNUP)}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    paddingBottom: 16,
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
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    textAlign: "center",
    marginTop: 8,
  },
  form: {
    marginTop: 32,
    width: "100%",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    marginBottom: 4,
  },
  inputField: {
    marginTop: 0,
  },
  loginBtn: {
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
    color: "#0E7490",
    fontWeight: "600",
    fontSize: 14,
  },
});
