import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import IconComponent from '../../neomorphism/IconComponent';
import BackIcon from '../../assets/icon/backArrow.svg';
import ReusableButton from '../../neomorphism/ReusableButton';
import OtpTextInput from '../../components/Auth/OtpTextInput';

const SetUserPin = () => {
  const navigation = useNavigation<any>();
  const [pin, setPin] = useState('');

  const onContinue = () => {
    navigation.navigate(navigationStrings.OTP_VERIFICATION, {
      source: 'user-pin',
    });
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

      <Text style={styles.title}>Set your User PIN</Text>
      <Text style={styles.subTitle}>Enter the 4-digit code to set your PIN</Text>

      <View style={styles.pinRow}>
        <OtpTextInput otp={pin} setOtp={setPin} />
      </View>

      <ReusableButton
        title="Continue"
        onPress={onContinue}
        containerStyle={styles.continueBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />
    </SafeAreaView>
  );
};

export default SetUserPin;

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
  subTitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontWeight: '400',
  },
  pinRow: {
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtn: {
    marginTop: 40,
  },
});
