import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import IconComponent from '../../neomorphism/IconComponent';
import OtpTextInput from '../../components/Auth/OtpTextInput';
import InputField from '../../neomorphism/InputField';
import ReusableButton from '../../neomorphism/ReusableButton';
import PasswordIcon from '../../assets/icon/passwordIcon.svg';
import HideIcon from '../../assets/icon/hideIcon.svg';
import UnhideIcon from '../../assets/icon/unHide.svg';
import BackIcon from '../../assets/icon/backArrow.svg';
import navigationStrings from '../../constants/navigationStrings';
import OtpTimer from '../../components/Auth/OtpTimer';

const ResetPassword = () => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState('');
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);

  //Login Handler
  const handleLogin = () => {
    navigation.pop(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <IconComponent
        icon={<BackIcon width={22} height={22} />}
        width={40}
        height={40}
        radius={20}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />

      <Text style={styles.title}>Reset your Password</Text>
      <Text style={styles.subtitle}>
        Enter the OTP sent to your email and create a new password
      </Text>

      <View style={styles.otpContainer}>
        <OtpTextInput otp={otp} setOtp={setOtp} />
      </View>

      <OtpTimer initialSeconds={30} onResend={() => {}} />

      <Text style={styles.label}>Password</Text>
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

      <Text style={styles.label}>Confirm new password</Text>
      <InputField
        placeholder="Enter password"
        secureTextEntry={confirmSecure}
        leftIcon={<PasswordIcon width={18} height={18} />}
        rightIcon={
          confirmSecure ? (
            <UnhideIcon width={18} height={18} />
          ) : (
            <HideIcon width={18} height={18} />
          )
        }
        onRightIconPress={() => setConfirmSecure(!confirmSecure)}
      />

      <ReusableButton
        title="Reset Password"
        onPress={() => {}}
        containerStyle={styles.resetBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Remember password? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: Platform.OS === 'ios' ? 6 : 16,
  },
  title: {
    marginTop: 24,
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: '400',
    lineHeight: 20,
  },
  otpContainer: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 24,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: '400',
  },
  resetBtn: {
    marginTop: 30,
  },
  footerContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: '400',
  },
  loginText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});
