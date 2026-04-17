import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import IconComponent from '../../neomorphism/IconComponent';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import NeumorphicCard from '../../components/Common/NeumorphicCard';
import AppButton from '../../components/Common/AppButton';
import BackIcon from '../../assets/icon/backArrow.svg';
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';

const BACKUP_CODES = ['6732', '8722', '8222', '7837', '7283', '7832', '9833', '6721'];

const BackupCodesSessionTimeout = () => {
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
        <Text style={styles.headerTitle}>Backup Codes / Session Timeout</Text>
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

      <Text style={styles.title}>Verify to restore access</Text>

      <View style={styles.codesGrid}>
        {BACKUP_CODES.map((code) => (
          <Pressable key={code} style={styles.codePress}>
            <NeumorphicCard
              outerStyle={styles.codeOuter}
              innerStyle={styles.codeInner}
              borderRadius={12}
            >
              <Text style={styles.codeText}>{code}</Text>
            </NeumorphicCard>
          </Pressable>
        ))}
      </View>

      <Text style={styles.helperText}>Enter your 4-digit secure session PIN below</Text>

      <AppButton
        text="Use Backup code"
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        textStyle={styles.actionText}
        style={styles.actionBtn}
      />

      <AppButton
        text="Need Help?"
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        textStyle={styles.actionText}
        style={styles.helpBtn}
      />

      <Text style={styles.footerText}>
        Unverified session timed out Login again to continue
      </Text>
    </SafeAreaView>
  );
};

export default BackupCodesSessionTimeout;

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
  title: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  codesGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  codePress: {
    width: '48.2%',
  },
  codeOuter: {
    width: '100%',
  },
  codeInner: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 18,
    fontWeight: '500',
  },
  helperText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: '400',
  },
  actionBtn: {
    marginTop: 16,
    height: 50,
    borderRadius: 25,
  },
  helpBtn: {
    marginTop: 12,
    height: 50,
    borderRadius: 25,
  },
  actionText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  footerText: {
    marginTop: 14,
    textAlign: 'center',
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: '400',
  },
});
