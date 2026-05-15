import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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
import navigationStrings from "../../../constants/navigationStrings";
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

function InfoWell({ children }: { children: React.ReactNode }) {
  return (
    <View style={shared.infoWellShell}>
      <View style={shared.infoWellForeground}>{children}</View>
    </View>
  );
}

export default function AuthorizationDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;
  const headerTopPad = Math.max(0, 49 - insets.top);

  const openRequestDocuments = useCallback(() => {
    navigation.navigate(navigationStrings.REQUEST_DOCUMENTS);
  }, [navigation]);

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
            <Text style={shared.headerTitle}>Authorization Detail</Text>
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
              innerStyle={[styles.statusCardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={styles.statusHeaderRow}>
                <ProfileAvatar
                  overlaySource={OverlayImage}
                  imageSource={DoctorTempImage}
                  containerStyle={styles.statusAvatarContainer}
                  wrapperStyle={styles.statusAvatarWrap}
                  overlayStyle={styles.statusAvatarOverlay}
                  imageStyle={styles.statusAvatarPhoto}
                />
                <Text style={styles.statusHeadline} numberOfLines={3}>
                  Authorization Pending Due to missing clinical notes
                </Text>
              </View>

              <View style={shared.divider} />

              <View style={shared.twoCol}>
                <InfoWell>
                  <View style={shared.infoWellLabelRow}>
                    <Text style={shared.infoWellLabelInline} numberOfLines={1}>
                      Coverage:
                    </Text>
                    <InnerShadowPill label="Partial" tone="warn" subtleOuterGlow />
                  </View>
                  <Text style={shared.infoWellDetailBold} numberOfLines={2}>
                    Clinical notes
                  </Text>
                </InfoWell>
                <InfoWell>
                  <View style={shared.infoWellLabelRow}>
                    <Text style={shared.infoWellLabelInline} numberOfLines={1}>
                      Missing Info:
                    </Text>
                    <InnerShadowPill label="Request" tone="warn" subtleOuterGlow />
                  </View>
                  <Text style={shared.infoWellDetailBold} numberOfLines={2}>
                    Request documents
                  </Text>
                </InfoWell>
              </View>
            </NeumorphicCard>
          </View>
        </ScrollView>

        <View style={[styles.footerBar, { paddingBottom: bottomPad }]}>
          <View style={styles.footerActions}>
            <View style={styles.twoBtnRow}>
              <View style={styles.halfBtn}>
                <ReusableButton
                  title="Submit Authorization"
                  height={ACTION_H}
                  borderRadius={22}
                  width="100%"
                  gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
                  gradientPositions={[0.125, 1]}
                  softFillShade
                  ctaGlow
                  backgroundColor={SUBMIT_FILL_FALLBACK}
                  textStyle={styles.submitAuthText}
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
                  text="Request"
                  textStyle={shared.outlineGreenText}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={openRequestDocuments}
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
  layout: {
    flex: 1,
  },
  scrollFlex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  scrollPad: {
    paddingHorizontal: 16,
  },
  headerSpacer: {
    width: HEADER_ICON_CIRCLE,
    height: HEADER_ICON_CIRCLE,
  },
  section: {
    marginTop: 12,
  },
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
  /** Same treatment as `Scheduling/NotifyPatient` — recessed well + primary initials. */
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  patientTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  patientNameBold: {
    fontWeight: "700",
  },
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
  statusCardInner: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  statusHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  /** Scaled-down `Home.tsx` `ProfileAvatar` — overlay ring + doctor photo. */
  statusAvatarContainer: {
    alignItems: "flex-start",
    paddingTop: 0,
  },
  statusAvatarWrap: {
    width: 56,
    height: 56,
  },
  statusAvatarOverlay: {
    borderRadius: 28,
  },
  statusAvatarPhoto: {
    width: 38,
    height: 38,
    borderRadius: 19,
    resizeMode: "cover",
  },
  statusHeadline: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
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
  footerActions: {
    gap: 10,
  },
  twoBtnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  halfBtn: {
    flex: 1,
    minWidth: 0,
  },
  submitAuthText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
