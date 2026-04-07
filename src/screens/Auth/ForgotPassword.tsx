import React from 'react';
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
import InputField from '../../neomorphism/InputField';
import ReusableButton from '../../neomorphism/ReusableButton';
import MailIcon from '../../assets/icon/mailIcon.svg';
import BackIcon from '../../assets/icon/backArrow.svg';
import navigationStrings from '../../constants/navigationStrings';
const ForgotPassword = () => {
  const navigation = useNavigation<any>();

  //Reset Password Handler
  const handleResetPassword = () => {
    navigation.navigate(navigationStrings.RESET_PASSWORD);
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

      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.subtitle}>
        Please enter the email address associated with your account, and we’ll
        email you a link to reset your password.
      </Text>

      <Text style={styles.label}>Email</Text>
      <InputField
        placeholder="Enter email"
        leftIcon={<MailIcon width={18} height={18} />}
      />

      <ReusableButton
        title="Reset Password"
        onPress={handleResetPassword}
        containerStyle={styles.resetBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Remember password? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
    lineHeight: 18,
  },
  label: {
    marginTop: 24,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontWeight: '400',
  },
  resetBtn: {
    marginTop: 26,
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
