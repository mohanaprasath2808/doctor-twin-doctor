import React, { useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import MailIcon from "../../assets/icon/mailIcon.svg";
import PasswordIcon from "../../assets/icon/passwordIcon.svg";
import HideIcon from "../../assets/icon/hideIcon.svg";
import UnhideIcon from "../../assets/icon/unHide.svg";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../constants/theme";
import ProfileAvatar from "../../components/neomorphism/ProfileAvatar";
import InputField from "../../components/neomorphism/InputField";
import ReusableButton from "../../components/neomorphism/ReusableButton";
import KeyboardAvoidingWrapper from "../../components/neomorphism/KeyboardAvoidingWrapper";
import { greetingLabel } from "../../constants/constant";
import navigationStrings from "../../constants/navigationStrings";
import type { AuthStackParamList } from "../../router/Auth/types";

const DISPLAY_NAME = "Lorena";

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const greet = useMemo(() => greetingLabel(), []);

  if (!authContext) {
    throw new Error("Login must be used within AuthContextProvider");
  }

  const { setIsLogin } = authContext;

  //Forgot Password Handler
  const handleForgotPassword = () => {
    navigation.navigate(navigationStrings.FORGOT_PASSWORD);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.wrapper}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.image}
        />
        <Text style={styles.greeting}>
          {greet} {DISPLAY_NAME}
        </Text>

        <View style={styles.dataContainer}>
          <View>
            <Text style={styles.heading}>Login</Text>

            <Text style={styles.label}>Email</Text>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={<MailIcon width={18} height={18} />}
              containerStyle={styles.fieldTightTop}
            />

            <Text style={[styles.label, { marginTop: 24 }]}>Password</Text>
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={secure}
              leftIcon={<PasswordIcon width={18} height={18} />}
              rightIcon={
                secure ? <UnhideIcon width={18} height={18} /> : <HideIcon width={18} height={18} />
              }
              onRightIconPress={() => setSecure((s) => !s)}
              containerStyle={styles.fieldTightTop}
            />

            <TouchableOpacity
              style={styles.forgotWrap}
              activeOpacity={0.7}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <ReusableButton
              title="Login"
              onPress={() => setIsLogin(true)}
              containerStyle={styles.loginBtn}
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
            />
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 8 : 16,
  },
  wrapper: {
    width: 170,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  image: {
    width: 103,
    height: 103,
    resizeMode: "contain",
    borderRadius: 110,
  },
  greeting: {
    marginTop: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  dataContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    marginTop: 4,
    fontWeight: "400",
  },
  labelSpaced: {
    marginTop: 18,
  },
  fieldTightTop: {
    marginTop: 6,
  },
  forgotWrap: {
    alignItems: "flex-end",
    marginTop: 12,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
  loginBtn: {
    marginTop: 28,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    flexWrap: "wrap",
  },
  signupMuted: {
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: "400",
  },
  signupLink: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
});
