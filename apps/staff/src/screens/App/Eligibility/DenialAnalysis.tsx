import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import AppButton from "../../../components/Common/AppButton";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { getInitials } from "../../../constants/constant";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import EligibilityScreenHeader from "./components/EligibilityScreenHeader";
import {
  CASE_CARD_INNER,
  ELIGIBILITY_CARD_RADIUS,
  SUBMIT_FILL_FALLBACK,
  SUBMIT_GRADIENT,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Susan Reed, 62";
const INSURER = "Cigna Insurance";
const CARD_BTN_H = 40;
const FOOTER_ACTION_H = 44;
const DENIAL_BANNER_H = 40;
const DENIAL_BANNER_RADIUS = DENIAL_BANNER_H / 2;

const NOTICE_ITEMS = ["Inform higher acuity status", "Medical necessity Reduce."];

export default function DenialAnalysis() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openTaskInbox = useCallback(() => {
    navigation.navigate(navigationStrings.TASK_INBOX);
  }, [navigation]);

  const openAppealSubmission = useCallback(() => {
    navigation.navigate(navigationStrings.APPEAL_SUBMISSION);
  }, [navigation]);

  return (
    <SafeAreaView style={shared.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={shared.scroll}
        contentContainerStyle={[shared.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <EligibilityScreenHeader title="Denial Analysis" onBack={onBack} />

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
                <InnerShadowIcon
                  size={48}
                  icon={<Text style={styles.initials}>{getInitials("Susan Reed")}</Text>}
                />
                <View style={styles.patientTextBlock}>
                  <Text style={shared.caseStatusTitle} numberOfLines={1}>
                    {PATIENT_NAME}
                  </Text>
                  <Text style={styles.insurerLine} numberOfLines={1}>
                    {INSURER}
                  </Text>
                </View>
              </View>
              <NeumorphicInnerShadowCard
                borderRadius={DENIAL_BANNER_RADIUS}
                height={DENIAL_BANNER_H}
                backgroundColor={CASE_CARD_INNER}
                darkShadowDx={2}
                darkShadowDy={2}
                darkShadowBlur={5}
                darkShadowColor="rgba(15, 23, 42, 0.08)"
                lightShadowDx={-2}
                lightShadowDy={-2}
                lightShadowBlur={4}
                lightShadowColor="rgba(255, 255, 255, 0.9)"
                contentStyle={styles.denialBannerContent}
              >
                <Text style={styles.denialBannerText}>
                  Denied by Cigna at 10:01 PM today
                </Text>
              </NeumorphicInnerShadowCard>
            </NeumorphicCard>
          </View>

          <View style={styles.section}>
            <NeumorphicCard
              borderRadius={ELIGIBILITY_CARD_RADIUS}
              backgroundColor={CASE_CARD_INNER}
              suppressInsetShadows
              outerStyle={shared.caseCardOuterLift}
              innerStyle={[styles.cardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={styles.predictionBadgeRow}>
                <InnerShadowPill label="Approved Prediction" tone="success" subtleOuterGlow />
              </View>
              <View style={styles.twoBtnRow}>
                <View style={styles.halfBtn}>
                  <ReusableButton
                    title="Ready"
                    height={CARD_BTN_H}
                    borderRadius={CARD_BTN_H / 2}
                    width="100%"
                    gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
                    gradientPositions={[0.125, 1]}
                    softFillShade
                    ctaGlow
                    backgroundColor={SUBMIT_FILL_FALLBACK}
                    textStyle={styles.readyBtnText}
                    onPress={openAppealSubmission}
                  />
                </View>
                <View style={styles.halfBtn}>
                  <AppButton
                    activeOpacity={0.85}
                    width="100%"
                    height={CARD_BTN_H}
                    borderRadius={CARD_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Request Port"
                    textStyle={shared.outlineGreenTextAuth}
                    shadowStyle={shared.outlineBtnNoShadow}
                    onPress={() => {}}
                  />
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
              innerStyle={[styles.cardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <Text style={styles.noticeTitle}>Notice</Text>
              {NOTICE_ITEMS.map((item) => (
                <View key={item} style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
              <View style={[styles.twoBtnRow, styles.noticeActions]}>
                <View style={styles.halfBtn}>
                  <AppButton
                    activeOpacity={0.85}
                    width="100%"
                    height={CARD_BTN_H}
                    borderRadius={CARD_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Upload"
                    textStyle={shared.outlineGreenTextAuth}
                    shadowStyle={shared.outlineBtnNoShadow}
                    onPress={() => {}}
                  />
                </View>
                <View style={styles.halfBtn}>
                  <AppButton
                    activeOpacity={0.85}
                    width="100%"
                    height={CARD_BTN_H}
                    borderRadius={CARD_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Add notes"
                    textStyle={shared.outlineGreenTextAuth}
                    shadowStyle={shared.outlineBtnNoShadow}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </NeumorphicCard>
          </View>

          <View style={styles.inboxSection}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={FOOTER_ACTION_H}
              borderRadius={22}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.WHITE}
              text="View Inbox"
              textStyle={shared.outlineGreenTextAuth}
              shadowStyle={shared.outlineBtnNoShadow}
              onPress={openTaskInbox}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 12 },
  cardInner: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  patientTextBlock: { flex: 1, minWidth: 0 },
  insurerLine: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  denialBannerContent: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  denialBannerText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: TEXT_SECONDARY,
    textAlign: "left",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  predictionBadgeRow: {
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  twoBtnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  halfBtn: { flex: 1, minWidth: 0 },
  readyBtnText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: TEXT_TERTIARY,
    marginBottom: 10,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 18,
    color: TEXT_SECONDARY,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  noticeActions: {
    marginTop: 14,
  },
  inboxSection: {
    marginTop: 14,
    alignSelf: "stretch",
  },
});
