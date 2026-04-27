import {
  Image,
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
import { COLORS } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import MailIcon from "../../assets/icons/mailIcon.svg";
import PasswordIcon from "../../assets/icons/passwordIcon.svg";
import HideIcon from "../../assets/icons/hideIcon.svg";
import UnhideIcon from "../../assets/icons/unHide.svg";
import FaceIdIcon from "../../assets/icons/faceId.svg";
import PinIcon from "../../assets/icons/pin.svg";
import InputField from "../../neomorphism/InputField";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import navigationStrings from "../../constants/navigationStrings";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigation = useNavigation<any>();
  const [secure, setSecure] = useState(true);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Login must be used within AuthContextProvider");
  }
  const { setIsLogin } = authContext;

  //Forgot Password Handler
  // const handleForgotPassword = () => {
  //   navigation.navigate(navigationStrings.FORGOT_PASSWORD);
  // };

  //Login Button Handler
  const handleLogin = () => {
    // navigation.navigate(navigationStrings.OTP_VERIFICATION);
    setIsLogin(true);
  };
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
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.imageContainer}
            wrapperStyle={styles.wrapper}
            overlayStyle={styles.overlayImage}
            imageStyle={styles.image}
          />
          <Text style={styles.name}>Welcome Back, Sarah</Text>
          <Text style={styles.subtitle}>Please sign in to your account.</Text>
          <View style={styles.dataContainer}>
            <View>
              {/* Email */}
              <Text style={styles.label}>Email / Phone number</Text>
              <InputField
                placeholder="Email / Phone number"
                leftIcon={<MailIcon width={18} height={18} />}
              />

              {/* Password */}
              <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
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

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotContainer}
                onPress={() => navigation.navigate(navigationStrings.HELP_SIGNING_IN)}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <View style={styles.loginBtnContainer}>
                <ReusableButton
                  title="Login"
                  onPress={handleLogin}
                  containerStyle={styles.loginBtn}
                  backgroundColor={COLORS.PRIMARY}
                  textColor="#FFFFFF"
                />
              </View>

              <Text style={styles.orText}>or</Text>

              <View style={styles.optionList}>
                <TouchableOpacity style={styles.authOption} activeOpacity={0.85}>
                  <View style={styles.optionLeft}>
                    <View style={styles.iconShell}>
                      <View style={styles.iconInnerShadow}>
                        <InnerShadowView width={40} height={40} borderRadius={20} color="#F7FBFF" />
                      </View>
                      <FaceIdIcon width={18} height={18} />
                    </View>
                    <Text style={styles.optionText}>Face ID</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate(navigationStrings.SET_USER_PIN)}
                  style={styles.authOption}
                  activeOpacity={0.85}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.iconShell}>
                      <View style={styles.iconInnerShadow}>
                        <InnerShadowView width={40} height={40} borderRadius={20} color="#F7FBFF" />
                      </View>
                      <PinIcon width={18} height={18} />
                    </View>
                    <Text style={styles.optionText}>PIN</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sign Up (fixed at bottom) */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SIGNUP)}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
    paddingBottom: 16,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 10 : 20,
  },
  wrapper: {
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
  image: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 115,
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_80,
    textAlign: "center",
    marginTop: 8,
  },
  dataContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_PRIMARY_70,
    marginTop: 10,
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: 500,
  },
  loginBtnContainer: {
    marginBottom: 18,
  },
  loginBtn: {
    marginTop: 30,
  },
  orText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "center",
  },
  optionList: {
    marginTop: 20,
    gap: 12,
  },
  authOption: {
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconShell: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconInnerShadow: {
    position: "absolute",
  },
  optionText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  chevron: {
    fontSize: 28,
    lineHeight: 28,
    color: COLORS.TEXT_PRIMARY_50,
    marginRight: 4,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 10,
  },
  signupText: {
    textAlign: "center",
    color: COLORS.TEXT_PRIMARY_60,
    fontSize: 14,
    fontWeight: "400",
  },
  signup: {
    color: COLORS.PRIMARY,
    fontWeight: "500",
    fontSize: 14,
  },
  helpText: {
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    marginBottom: 12,
    marginTop: 28,
  },
});
