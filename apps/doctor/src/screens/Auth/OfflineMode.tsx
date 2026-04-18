import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import IconComponent from '../../neomorphism/IconComponent';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import NeumorphicCard from '../../components/Common/NeumorphicCard';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import ReusableButton from '../../neomorphism/ReusableButton';
import BackIcon from '../../assets/icon/backArrow.svg';
import WarningIcon from '../../assets/icon/warningIcon.svg';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';

type OfflineModeProps = {
  onClose: () => void;
};

const OfflineMode = ({ onClose }: OfflineModeProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={22} height={22} />}
          width={40}
          height={40}
          radius={20}
          onPress={onClose}
        />
        <Text style={styles.headerTitle}>Offline Mode</Text>
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

      <NeumorphicCard
        outerStyle={styles.noticeOuter}
        innerStyle={styles.noticeInner}
        borderRadius={12}
      >
        <View style={styles.noticeRow}>
          <InnerShadowIcon
            icon={<WarningIcon width={18} height={18} />}
            size={40}
            radius={20}
          />
          <View style={styles.noticeTextWrap}>
            <Text style={styles.noticeTitle}>No Connection</Text>
            <Text style={styles.noticeText}>
              Secure local chart access. available online
            </Text>
          </View>
        </View>
      </NeumorphicCard>

      <Text style={styles.infoText}>
        You are currently offline. Sync your data once connection is restored
      </Text>

      <ReusableButton
        title="Enter Offline Mode"
        onPress={onClose}
        containerStyle={styles.ctaButton}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />
    </SafeAreaView>
  );
};

export default OfflineMode;

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
  noticeOuter: {
    marginTop: 30,
  },
  noticeInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  noticeTextWrap: {
    flex: 1,
  },
  noticeTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  noticeText: {
    marginTop: 4,
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: '400',
  },
  infoText: {
    marginTop: 28,
    textAlign: 'center',
    color: COLORS.TEXT_70,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    paddingHorizontal: 30,
  },
  ctaButton: {
    marginTop: 36,
  },
});
