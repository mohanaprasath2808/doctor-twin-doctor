import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import IconComponent from '../../neomorphism/IconComponent';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import ReusableButton from '../../neomorphism/ReusableButton';
import BackIcon from '../../assets/icon/backArrow.svg';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';
import MicOutlineIcon from '../../assets/icon/micOutlineIcon.svg';

const EnableVoiceHandsFree = () => {
  const navigation = useNavigation<any>();

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
        <Text style={styles.headerTitle}>Enable Voice Hands-Free</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.profileContainer}
        wrapperStyle={styles.profileWrapper}
        overlayStyle={styles.profileOverlay}
        imageStyle={styles.profileImage}
      />

      <Text style={styles.title}>Dr.Soliman, Ready to try voice commands</Text>
      <Text style={styles.subtitle}>
        Allow Dr.Twin to access microphone for hands-free commands
      </Text>

      <View style={styles.micBadgeWrap}>
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.micContainer}
          wrapperStyle={styles.micWrapper}
          overlayStyle={styles.micOverlay}
          imageStyle={styles.hiddenImage}
        />
        <LinearGradient
          colors={['#303DA3', '#111747']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.micCenter}
        >
          <MicOutlineIcon width={24} height={32} />
        </LinearGradient>
      </View>

      <ReusableButton
        title="Enable Voice Mode"
        onPress={() => navigation.navigate(navigationStrings.OTP_VERIFICATION)}
        containerStyle={styles.voiceBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      <Pressable style={styles.footerNote}>
        <Text style={styles.footerText}>You can change this later in settings</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default EnableVoiceHandsFree;

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
  profileContainer: {
    marginTop: 20,
  },
  profileWrapper: {
    width: 190,
    height: 190,
  },
  profileOverlay: {
    borderRadius: 95,
  },
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 58,
  },
  title: {
    marginTop: 26,
    textAlign: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 20,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 18,
    textAlign: 'center',
    color: COLORS.TEXT_60,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  micBadgeWrap: {
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micContainer: {
    marginTop: 0,
  },
  micWrapper: {
    width: 190,
    height: 190,
  },
  micOverlay: {
    borderRadius: 95,
  },
  hiddenImage: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  micCenter: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceBtn: {
    marginTop: 18,
  },
  footerNote: {
    marginTop: 22,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.TEXT_60,
    fontSize: 16,
    fontWeight: '400',
  },
});
