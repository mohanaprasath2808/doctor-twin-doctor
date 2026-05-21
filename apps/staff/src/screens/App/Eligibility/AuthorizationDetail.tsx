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
  TEXT_PRIMARY,
  SUBMIT_FILL_FALLBACK,
  SUBMIT_GRADIENT,
  TEXT_TERTIARY,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Sarah Williams";
const ACTION_H = 44;

function InfoWell({ children }: { children: React.ReactNode }) {
  return (
    <View style={[shared.infoWellShell, styles.infoWellForegroundAuth]}>
      <View style={shared.infoWellForeground}>{children}</View>
    </View>
  );
}

export default function AuthorizationDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const openAuthorizationTracking = useCallback(() => {
    navigation.navigate(navigationStrings.AUTHORIZATION_TRACKING);
  }, [navigation]);

  const openMissingDocuments = useCallback(() => {
    navigation.navigate(navigationStrings.MISSING_DOCUMENTS);
  }, [navigation]);

  const openDenialAnalysis = useCallback(() => {
    navigation.navigate(navigationStrings.DENIAL_ANALYSIS);
  }, [navigation]);

  const onBack = useCallback(() => {
    navigation.goBack();
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
          <EligibilityScreenHeader title="Authorization Detail" onBack={onBack} />

          <View style={shared.screenBody}>
          <View style={styles.section}>
            <NeumorphicCard
              borderRadius={ELIGIBILITY_CARD_RADIUS}
              backgroundColor={CASE_CARD_INNER}
              suppressInsetShadows
              outerStyle={[shared.caseCardOuterLift, shared.caseCardMargin]}
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
                    <Text style={[shared.caseStatusTitle]} numberOfLines={1}>
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
              outerStyle={shared.caseCardOuterLift}
              innerStyle={[shared.statusCardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={shared.statusHeaderRow}>
                <ProfileAvatar
                  overlaySource={OverlayImage}
                  imageSource={DoctorTempImage}
                  containerStyle={shared.statusAvatarContainer}
                  wrapperStyle={shared.statusAvatarWrap}
                  overlayStyle={shared.statusAvatarOverlay}
                  imageStyle={shared.statusAvatarPhoto}
                />
                <Text style={styles.statusHeadline} numberOfLines={3}>
                  Authorization Pending Due to missing clinical notes
                </Text>
              </View>

              <View style={shared.divider} />

              <View style={styles.twoCol}>
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
          </View>
        </ScrollView>

        <View style={[shared.footerBar, { paddingBottom: bottomPad }]}>
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
                  onPress={openAuthorizationTracking}
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
                  textStyle={styles.outlineGreenTextAuth}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={openMissingDocuments}
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
              textStyle={styles.outlineGreenTextAuth}
              shadowStyle={shared.outlineBtnNoShadow}
              onPress={openDenialAnalysis}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  statusHeadline: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  footerActions: {
    gap: 15,
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
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  outlineGreenTextAuth: {
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
  infoWellForegroundAuth: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  twoCol: {
    flexDirection: "row",
    gap: 2,
    alignItems: "stretch",
  },
});
