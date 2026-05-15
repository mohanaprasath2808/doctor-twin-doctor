import React, { useCallback } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { getInitials } from "../../../constants/constant";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import {
  CASE_CARD_INNER,
  HEADER_ICON_CIRCLE,
  HEADER_ICON_GLYPH,
  SCREEN_BG,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  SUBMIT_FILL_FALLBACK,
  SUBMIT_GRADIENT,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Sarah Williams";
const ACTION_H = 44;
const ROW_BTN_H = 36;
const CHAT_BUBBLE_BG = "#E0F2FE";

export default function RequestDocuments() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;
  const headerTopPad = Math.max(0, 49 - insets.top);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={shared.safe} edges={["top", "left", "right"]}>
      <View style={styles.layout}>
        <ScrollView
          style={styles.scrollFlex}
          contentContainerStyle={[shared.content, styles.scrollPad, styles.scrollContent]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[shared.headerBar, { paddingTop: headerTopPad }]}>
            <IconComponent
              icon={<BackArrowIcon width={HEADER_ICON_GLYPH} height={HEADER_ICON_GLYPH} />}
              width={HEADER_ICON_CIRCLE}
              height={HEADER_ICON_CIRCLE}
              radius={HEADER_ICON_CIRCLE / 2}
              onPress={onBack}
            />
            <Text style={shared.headerTitle}>Request Documents</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.section}>
            <NeumorphicCard
              borderRadius={24}
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
                    <Text style={[shared.caseStatusTitle, styles.patientNameBold]} numberOfLines={1}>
                      {PATIENT_NAME}
                    </Text>
                    <Text style={shared.casePatientLine}>Female • Age 45</Text>
                    <Text style={styles.expLine}>Exp: 23 April 2024</Text>
                  </View>
                </View>
                <View style={styles.coverageBlock}>
                  <View style={styles.coverageLabelRow}>
                    <Text style={shared.infoWellLabelInline} numberOfLines={1}>
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
              borderRadius={24}
              backgroundColor={CASE_CARD_INNER}
              suppressInsetShadows
              outerStyle={shared.caseCardOuterLift}
              innerStyle={[styles.requestCardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={styles.missRequestRow}>
                <ProfileAvatar
                  overlaySource={OverlayImage}
                  imageSource={DoctorTempImage}
                  containerStyle={styles.smallAvatarContainer}
                  wrapperStyle={styles.smallAvatarWrap}
                  overlayStyle={styles.smallAvatarOverlay}
                  imageStyle={styles.smallAvatarPhoto}
                />
                <Text style={styles.missRequestTitle} numberOfLines={1}>
                  Miss Request
                </Text>
              </View>

              <View style={styles.nestedDocList}>
                <View style={styles.docRow}>
                  <Text style={shared.infoWellDetailBold} numberOfLines={1}>
                    Clinical notes
                  </Text>
                  <AppButton
                    activeOpacity={0.85}
                    width={112}
                    height={ROW_BTN_H}
                    borderRadius={ROW_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Pull EMR"
                    textStyle={styles.rowBtnText}
                    shadowStyle={shared.outlineBtnNoShadow}
                    onPress={() => {}}
                  />
                </View>
                <View style={styles.docDivider} />
                <View style={styles.docRow}>
                  <Text style={shared.infoWellDetailBold} numberOfLines={1}>
                    Labs / Imaging
                  </Text>
                  <AppButton
                    activeOpacity={0.85}
                    width={112}
                    height={ROW_BTN_H}
                    borderRadius={ROW_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Upload"
                    textStyle={styles.rowBtnText}
                    shadowStyle={shared.outlineBtnNoShadow}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </NeumorphicCard>
          </View>

          <View style={styles.section}>
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
                  text="Upload"
                  textStyle={shared.outlineGreenText}
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
                  textStyle={shared.outlineGreenText}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.chatRow}>
              <Image source={DoctorTempImage} style={styles.chatAvatar} />
              <View style={styles.chatBubble}>
                <Text style={styles.chatText}>
                  I recommend appealing the demonstrate medical need
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footerBar, { paddingBottom: bottomPad }]}>
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
                  textStyle={shared.outlineGreenText}
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
              textStyle={shared.outlineGreenText}
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
  layout: { flex: 1 },
  scrollFlex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 16 },
  scrollPad: { paddingHorizontal: 16 },
  headerSpacer: {
    width: HEADER_ICON_CIRCLE,
    height: HEADER_ICON_CIRCLE,
  },
  section: { marginTop: 12 },
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
    gap: 8,
  },
  expLine: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "400",
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  requestCardInner: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  missRequestRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  smallAvatarContainer: { alignItems: "flex-start", paddingTop: 0 },
  smallAvatarWrap: { width: 44, height: 44 },
  smallAvatarOverlay: { borderRadius: 22 },
  smallAvatarPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "cover",
  },
  missRequestTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  nestedDocList: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E2E8F0",
    overflow: "hidden",
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
  rowBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 13,
    fontWeight: "600",
  },
  threeBtnRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "stretch",
  },
  midCtaText: {
    fontSize: 14,
    fontWeight: "600",
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  chatAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: "cover",
  },
  chatBubble: {
    flex: 1,
    backgroundColor: CHAT_BUBBLE_BG,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 4,
  },
  chatText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: TEXT_PRIMARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  footerBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: SCREEN_BG,
  },
  footerActions: { gap: 10 },
  twoBtnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  halfBtn: { flex: 1, minWidth: 0 },
  sendStaffText: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
});
