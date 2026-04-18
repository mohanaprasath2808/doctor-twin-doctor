import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import IconComponent from '../../neomorphism/IconComponent';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import NeumorphicCard from '../../components/Common/NeumorphicCard';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import BackIcon from '../../assets/icon/backArrow.svg';
import RightArrowIcon from '../../assets/icon/rightArrow.svg';
import FaceScanIcon from '../../assets/icon/faceScanIcon.svg';
import PasswordIcon from '../../assets/icon/lockIcon.svg';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';

const SECURE_OPTIONS = [
  {
    id: 'face-id',
    label: 'Face ID',
    icon: <FaceScanIcon width={18} height={18} />,
  },
  {
    id: 'user-pin',
    label: 'User PIN',
    icon: <PasswordIcon width={18} height={18} />,
  },
  {
    id: 'sso-login',
    label: 'SSO Login',
    icon: <PasswordIcon width={18} height={18} />,
  },
];

const SecureLogin = () => {
  const navigation = useNavigation<any>();

  /** Demo: all options continue the same linear onboarding tour (see AuthStack). */
  const onOptionPress = () => {
    navigation.navigate(navigationStrings.SET_USER_PIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={22} height={22} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Secure Login</Text>
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

      <Text style={styles.welcomeText}>Welcome Back Dr.Twin</Text>

      <View style={styles.optionsWrap}>
        {SECURE_OPTIONS.map((option) => (
          <Pressable
            key={option.id}
            style={styles.optionPress}
            onPress={onOptionPress}
          >
            <NeumorphicCard
              outerStyle={styles.optionOuter}
              innerStyle={styles.optionInner}
              borderRadius={12}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionLeft}>
                  <InnerShadowIcon size={40} icon={option.icon} />
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
                <RightArrowIcon width={10} height={10} />
              </View>
            </NeumorphicCard>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SecureLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 4 : 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  imageContainer: {
    marginTop: 24,
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
  welcomeText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '600',
  },
  optionsWrap: {
    marginTop: 30,
    gap: 20,
  },
  optionPress: {
    width: '100%',
  },
  optionOuter: {
    width: '100%',
  },
  optionInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionLabel: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
  },
});
