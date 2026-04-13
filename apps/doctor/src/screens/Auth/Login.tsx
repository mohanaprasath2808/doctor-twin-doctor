import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';
import MailIcon from '../../assets/icon/mailIcon.svg';
import PasswordIcon from '../../assets/icon/passwordIcon.svg';
import HideIcon from '../../assets/icon/hideIcon.svg';
import UnhideIcon from '../../assets/icon/unHide.svg';
import InputField from '../../neomorphism/InputField';
import ReusableButton from '../../neomorphism/ReusableButton';
import KeyboardAvoidingWrapper from '../../neomorphism/KeyboardAvoidingWrapper';
import navigationStrings from '../../constants/navigationStrings';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';

const Login = () => {
  const navigation = useNavigation<any>();
  const [secure, setSecure] = useState(true);

  //Forgot Password Handler
  const handleForgotPassword = () => {
    navigation.navigate(navigationStrings.FORGOT_PASSWORD);
  };

  //Login Button Handler
  const handleLogin = () => {
    navigation.navigate(navigationStrings.OTP_VERIFICATION);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
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
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <ReusableButton
              title="Login"
              onPress={handleLogin}
              containerStyle={styles.loginBtn}
              backgroundColor="#2E3A8C"
              textColor="#FFFFFF"
            />
          </View>

          {/* Sign Up */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationStrings.SIGNUP)}
            >
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  keyboardWrapper: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  wrapper: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    borderRadius: 115,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 115,
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.TEXT_DARK,
    textAlign: 'center',
  },
  dataContainer: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    marginTop: 10,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
  },
  signupText: {
    textAlign: 'center',
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: '400',
  },
  signup: {
    color: COLORS.PRIMARY,
    fontWeight: '500',
    fontSize: 14,
  },
});
