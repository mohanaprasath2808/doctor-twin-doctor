import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { getInitials } from "../../../constants/constant";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import EligibilityScreenHeader from "./components/EligibilityScreenHeader";
import {
  CASE_CARD_INNER,
  ELIGIBILITY_CARD_RADIUS,
  TEXT_TERTIARY,
  SUBMIT_FILL_FALLBACK,
  SUBMIT_GRADIENT,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Sarah Williams";
const ACTION_H = 44;
const ROW_BTN_H = 36;
const CHAT_BUBBLE_BG = "#CBF0FF";
const CHAT_AVATAR_SIZE = 52;
const CHAT_AVATAR_PHOTO = Math.round(CHAT_AVATAR_SIZE * (38 / 56));

export default function RequestDocuments() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openAppealSubmission = useCallback(() => {
    navigation.navigate(navigationStrings.APPEAL_SUBMISSION);
  }, [navigation]);

  return (
    <SafeAreaView style={shared.safe} edges={["top", "left", "right"]}>
      <View style={shared.layout}>
        <ScrollView
          style={shared.scrollFlex}
          contentContainerStyle={[shared.content, shared.scrollContent]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <EligibilityScreenHeader title="Request Documents" onBack={onBack} />

          <View style={shared.screenBody}>
          <View style={styles.section}>
            <NeumorphicCard
              borderRadius={ELIGIBILITY_CARD_RADIUS}
              backgroundColor={CASE_CARD_INNER}
              suppressInsetShadows
              outerStyle={shared.caseCardOuterLift}
              innerStyle={[styles.cardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={styles.patientRow}>
                <View style={styles.patientLeft}>
                  <InnerShadowIcon
                    size={48}
                    icon={<Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>}
                  />
                  <View style={styles.patientTextBlock}>
                    <Text style={shared.caseStatusTitle} numberOfLines={1}>
                      {PATIENT_NAME}
                    </Text>
                    <Text style={shared.casePatientLine}>Female • Age 45</Text>
                    <Text style={shared.expLine}>Exp: 23 April 2024</Text>
                  </View>
                </View>
                <View style={styles.coverageBlock}>
                  <View style={styles.coverageLabelRow}>
                    <Text style={shared.infoWellCoverageDetailBold} numberOfLines={1}>
                      Coverage:
                    </Text>
                    <InnerShadowPill label="Partial" tone="warn" subtleOuterGlow />
                  </View>
                </View>
              </View>
            </NeumorphicCard>
          </View>

          <View style={styles.section}>
            <NeumorphicCard
              borderRadius={ELIGIBILITY_CARD_RADIUS}
              backgroundColor={CASE_CARD_INNER}
              suppressInsetShadows
              outerStyle={[shared.caseCardOuterLift, shared.caseCardMargin]}
              innerStyle={[shared.statusCardInner, styles.requestCardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={[shared.statusHeaderRow, styles.missRequestHeader]}>
                <ProfileAvatar
                  overlaySource={OverlayImage}
                  imageSource={DoctorTempImage}
                  containerStyle={shared.statusAvatarContainer}
                  wrapperStyle={shared.statusAvatarWrap}
                  overlayStyle={shared.statusAvatarOverlay}
                  imageStyle={shared.statusAvatarPhoto}
                />
                <Text style={styles.missRequestTitle} numberOfLines={1}>
                  Miss Request
                </Text>
              </View>

              <View style={styles.nestedDocList}>
                <View style={styles.docRow}>
                  <Text style={styles.infoWellDetailBoldRequest} numberOfLines={1}>
                    Clinical notes
                  </Text>
                  <AppButton
                    activeOpacity={0.85}
                    height={ROW_BTN_H}
                    borderRadius={ROW_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Pull EMR"
                    textStyle={styles.rowBtnText}
                    shadowStyle={shared.outlineBtnNoShadow}
                    style={styles.docRowBtnHug}
                    onPress={() => {}}
                  />
                </View>
                <View style={styles.docDivider} />
                <View style={styles.docRow}>
                  <Text style={styles.infoWellDetailBoldRequest} numberOfLines={1}>
                    Labs / Imaging
                  </Text>
                  <AppButton
                    activeOpacity={0.85}
                    height={ROW_BTN_H}
                    borderRadius={ROW_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Upload"
                    textStyle={styles.rowBtnText}
                    shadowStyle={shared.outlineBtnNoShadow}
                    style={styles.docRowBtnHug}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </NeumorphicCard>
          </View>

          <View style={styles.sectionButton}>
            <View style={styles.threeBtnRow}>
              <View style={shared.actionBtnWrap}>
                <ReusableButton
                  title="Approved"
                  height={ACTION_H}
                  borderRadius={22}
                  width="100%"
                  gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
                  gradientPositions={[0.125, 1]}
                  softFillShade
                  ctaGlow
                  backgroundColor={SUBMIT_FILL_FALLBACK}
                  textStyle={styles.midCtaText}
                  onPress={openAppealSubmission}
                />
              </View>
              <View style={shared.actionBtnWrap}>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={ACTION_H}
                  borderRadius={22}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Upload"
                  textStyle={styles.outlineGreenTextRequest}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
              <View style={shared.actionBtnWrap}>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={ACTION_H}
                  borderRadius={22}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Add Note"
                  textStyle={styles.outlineGreenTextRequest}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
          </View>
        </ScrollView>

        <View style={shared.chatBottom}>
          <View style={styles.chatRow}>
            <ProfileAvatar
              overlaySource={OverlayImage}
              imageSource={DoctorTempImage}
              containerStyle={styles.chatAvatarContainer}
              wrapperStyle={styles.chatAvatarWrap}
              overlayStyle={styles.chatAvatarOverlay}
              imageStyle={styles.chatAvatarPhoto}
            />
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>
                I recommend appealing the demonstrate medical need
              </Text>
            </View>
          </View>
        </View>

        <View style={[shared.footerBar, { paddingBottom: bottomPad }]}>
          <View style={styles.footerActions}>
            <View style={styles.twoBtnRow}>
              <View style={styles.halfBtn}>
                <ReusableButton
                  title="Send request to staff"
                  height={ACTION_H}
                  borderRadius={22}
                  width="100%"
                  gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
                  gradientPositions={[0.125, 1]}
                  softFillShade
                  ctaGlow
                  backgroundColor={SUBMIT_FILL_FALLBACK}
                  textStyle={styles.sendStaffText}
                  onPress={() => {}}
                />
              </View>
              <View style={styles.halfBtn}>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={ACTION_H}
                  borderRadius={22}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Modify"
                  textStyle={styles.outlineGreenTextRequest}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
            </View>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={ACTION_H}
              borderRadius={22}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.WHITE}
              text="Add Note"
              textStyle={styles.outlineGreenTextRequest}
              shadowStyle={shared.outlineBtnNoShadow}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 18 },
  sectionButton: { marginTop: 10 },
  cardInner: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  patientLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  patientTextBlock: { flex: 1, minWidth: 0 },
  patientNameBold: { fontWeight: "700" },
  coverageBlock: {
    flexShrink: 0,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  coverageLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 5,
  },
  requestCardInner: {
    paddingBottom: 16,
  },
  missRequestHeader: {
    marginBottom: 15,
  },
  missRequestTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  nestedDocList: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E2E8F0",
    overflow: "hidden"
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  docDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EAEAEA",
    marginHorizontal: 14,
  },
  docRowBtnHug: {
    alignSelf: "flex-start",
    width: "auto",
    paddingHorizontal: 14,
  },
  rowBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  threeBtnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  midCtaText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  chatAvatarContainer: {
    width: CHAT_AVATAR_SIZE,
    height: CHAT_AVATAR_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  chatAvatarWrap: {
    width: CHAT_AVATAR_SIZE,
    height: CHAT_AVATAR_SIZE,
  },
  chatAvatarOverlay: {
    borderRadius: CHAT_AVATAR_SIZE / 2,
  },
  chatAvatarPhoto: {
    width: CHAT_AVATAR_PHOTO,
    height: CHAT_AVATAR_PHOTO,
    borderRadius: CHAT_AVATAR_PHOTO / 2,
    resizeMode: "cover",
  },
  chatBubble: {
    flexShrink: 1,
    maxWidth: "82%",
    backgroundColor: CHAT_BUBBLE_BG,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopLeftRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chatText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0,
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  footerActions: { gap: 10 },
  twoBtnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  halfBtn: { flex: 1, minWidth: 0 },
  sendStaffText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    paddingHorizontal: 4,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  infoWellDetailBoldRequest: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#1E293B",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },

  outlineGreenTextRequest: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
});
