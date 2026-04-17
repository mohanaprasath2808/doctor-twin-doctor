import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import navigationStrings from '../../constants/navigationStrings';
import IconComponent from '../../neomorphism/IconComponent';
import ProfileAvatar from '../../components/Auth/ProfileAvatar';
import NeumorphicCard from '../../components/Common/NeumorphicCard';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import ReusableButton from '../../neomorphism/ReusableButton';
import BackIcon from '../../assets/icon/backArrow.svg';
import SelectedCheckBox from "../../assets/icon/selectedCheckBoxIcon.svg";
import OverlayImage from '../../assets/image/imageBgShadow.png';
import DoctorTempImage from '../../assets/image/tempImage/doctorTempImage.png';

const LegalConsent = () => {
  const navigation = useNavigation<any>();
  const [isPrivateEnvironment, setIsPrivateEnvironment] = useState(false);
  const [hasDelegationPermission, setHasDelegationPermission] = useState(false);

  const renderBoxCheck = (selected: boolean) =>
    selected ? (
      <SelectedCheckBox width={20} height={20} />
    ) : (
      <InnerShadowIcon icon={<></>} size={20} radius={6} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Legal & Consent</Text>
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
          outerStyle={styles.agreeOuter}
          innerStyle={styles.agreeInner}
          borderRadius={12}
        >
          <Text style={styles.cardTitle}>By continuing, you agree:</Text>

          <View style={[styles.selectionRow, { marginTop: 21 }]}>
            {renderBoxCheck(true)}
            <Text style={styles.selectionText}>AI usage consent</Text>
          </View>

          <View style={styles.divider} />

          <Pressable
            style={styles.selectionRow}
            onPress={() => setIsPrivateEnvironment(!isPrivateEnvironment)}
          >
            {renderBoxCheck(isPrivateEnvironment)}
            <Text style={styles.selectionText}>
              Yes, I confirm I am in a private environment
            </Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={styles.selectionRow}
            onPress={() => setHasDelegationPermission(!hasDelegationPermission)}
          >
            {renderBoxCheck(hasDelegationPermission)}
            <Text style={styles.selectionText}>Delegation permissions</Text>
          </Pressable>
        </NeumorphicCard>

        <ReusableButton
          title="Confirm"
          onPress={() => navigation.navigate(navigationStrings.SECURE_LOGIN)}
          containerStyle={styles.confirmBtn}
          backgroundColor="#2E3A8C"
          textColor="#FFFFFF"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalConsent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
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
    width: 42,
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
  agreeOuter: {
    marginTop: 30,
  },
  agreeInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: '500',
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  selectionText: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: '500'
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 16,
  },
  emptyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  confirmBtn: {
    marginTop: 'auto',
    marginBottom: 12,
  },
});
