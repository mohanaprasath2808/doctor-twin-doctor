import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { COLORS } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import MailIcon from "../../assets/icon/mailIcon.svg";
import PasswordIcon from "../../assets/icon/passwordIcon.svg";
import HideIcon from "../../assets/icon/hideIcon.svg";
import UnhideIcon from "../../assets/icon/unHide.svg";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import KeyboardAvoidingWrapper from "../../neomorphism/KeyboardAvoidingWrapper";
import navigationStrings from "../../constants/navigationStrings";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import { handleLogin as loginRequest } from "../../service/authService";
import { useAppStore } from "../../store/useAppStore";
import { EMAIL_REGEX } from "../../constants/contant";

const Login = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    navigation.navigate(navigationStrings.FORGOT_PASSWORD, {
      email: email,
    });
  };

  const onLoginPress = async (): Promise<void> => {
    toast.hideAll();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.show("Please enter email.", { type: "warning" });
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      toast.show("Please enter a valid email.", { type: "warning" });
      return;
    }
    if (!password) {
      toast.show("Please enter password.", { type: "warning" });
      return;
    }
    setLoading(true);
    try {
      const response: any = await loginRequest(trimmedEmail, password);
      console.log(response, "response in Login Screen");
      if (response?.ok) {
        navigation.navigate(navigationStrings.OTP_VERIFICATION, {
          source: "login",
          email: trimmedEmail,
          loginOtpNext: "normalLogin",
        });
        toast.show(`Otp code : ${response?.data?.otp}`, { type: "success" });
      } else {
        toast.show(response?.error, { type: "danger" });
      }
    } catch (e) {
      const message = (e as any)?.error || (e as any)?.message || "Something went wrong.";
      console.log(message, "message in Login Screen");
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.wrapper}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.image}
        />
        <Text style={styles.name}>Dr. Soliman</Text>
        <View style={styles.dataContainer}>
          <View>
            <Text style={styles.heading}>Login</Text>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <InputField
              placeholder="Enter email"
              leftIcon={<MailIcon width={18} height={18} />}
              containerStyle={{ paddingHorizontal: 20 }}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Password */}
            <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
            <InputField
              placeholder="Enter password"
              secureTextEntry={secure}
              leftIcon={<PasswordIcon width={18} height={18} />}
              rightIcon={
                secure ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
              }
              onRightIconPress={() => setSecure(!secure)}
              containerStyle={{ paddingHorizontal: 20 }}
              value={password}
              onChangeText={setPassword}
            />

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <View style={{ paddingHorizontal: 20 }}>
              <ReusableButton
                title={loading ? "Logging in…" : "Login"}
                onPress={onLoginPress}
                disabled={loading}
                containerStyle={styles.loginBtn}
                backgroundColor="#2E3A8C"
                textColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 10 : 20,
  },
  wrapper: {
    width: 240,
    height: 240,
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
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 115,
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  dataContainer: {
    flex: 1,
    marginTop: 40,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: 500,
  },
  loginBtn: {
    marginTop: 30,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
  },
  signupText: {
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
  },
  signup: {
    color: COLORS.PRIMARY,
    fontWeight: "500",
    fontSize: 14,
  },
});
