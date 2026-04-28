import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import MailIcon from '../../assets/icon/mailIcon.svg';
import PasswordIcon from '../../assets/icon/passwordIcon.svg';
import HideIcon from '../../assets/icon/hideIcon.svg';
import UnhideIcon from '../../assets/icon/unHide.svg';
import InputField from '../../neomorphism/InputField';
import ReusableButton from '../../neomorphism/ReusableButton';
import KeyboardAvoidingWrapper from '../../neomorphism/KeyboardAvoidingWrapper';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';
import navigationStrings from '../../constants/navigationStrings';
import IconComponent from '../../neomorphism/IconComponent';
import BackIcon from '../../assets/icon/backArrow.svg';

const SsoSignIn = () => {
  const navigation = useNavigation<any>();
  const [secure, setSecure] = useState(true);

  const handleSignIn = () => {
    navigation.navigate(navigationStrings.OTP_VERIFICATION, {
      source: 'sso-sign-in',
    });
  };

  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <View style={styles.header}>
          {canGoBack ? (
            <IconComponent
              icon={<BackIcon width={22} height={22} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <View style={styles.headerSpacer} />
          )}
          <Text style={styles.headerTitle}>SSO / Single Sign On</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.wrapper}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.image}
        />

        <Text style={styles.subTitle}>Sign in with your hospital credentials</Text>

        <View style={styles.formContainer}>
          {/* <Text style={styles.label}>Email</Text>
          <InputField
            placeholder="Enter email"
            leftIcon={<MailIcon width={18} height={18} />}
            containerStyle={{ marginTop: 1 }}
          /> */}

          <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
          <InputField
            placeholder="Enter your password"
            secureTextEntry={secure}
            leftIcon={<PasswordIcon width={18} height={18} />}
            rightIcon={
              secure ? (
                <HideIcon width={18} height={18} />
              ) : (
                <UnhideIcon width={18} height={18} />
              )
            }
            onRightIconPress={() => setSecure(!secure)}
            containerStyle={{ marginTop: 1 }}
          />

          <ReusableButton
            title="Sign In"
            onPress={handleSignIn}
            containerStyle={styles.signInBtn}
            backgroundColor="#2E3A8C"
            textColor="#FFFFFF"
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default SsoSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  keyboardWrapper: {
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
  imageContainer: {
    marginTop: 20,
  },
  wrapper: {
    width: 190,
    height: 190,
  },
  overlayImage: {
    borderRadius: 94,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 55,
  },
  subTitle: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 20,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  label: {
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: '400',
  },
  passwordLabel: {
    marginTop: 20,
  },
  signInBtn: {
    marginTop: 30,
  },
});
