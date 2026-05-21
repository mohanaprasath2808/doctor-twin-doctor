import React, { useCallback } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import EligibilityScreenHeader from "./components/EligibilityScreenHeader";
import {
  CASE_CARD_INNER,
  ELIGIBILITY_CARD_RADIUS,
  ESCALATE_CORAL,
  ESCALATE_FILL,
  SUBMIT_FILL_FALLBACK,
  SUBMIT_GRADIENT,
  TEXT_TERTIARY,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Brian Carter";
const PATIENT_AGE = 45;
const CARD_ACTION_H = 40;
const FOOTER_ACTION_H = 44;
const CHAT_BUBBLE_BG = "#CBF0FF";
const CHAT_AVATAR_SIZE = 35;
/** Patient row thumbnail — Denial Resolution only (no blue ring). */
const PATIENT_ROW_AVATAR_SIZE = 30;
const APPEAL_PILL_TEXT = "#DC2626";

function CardTitleRow({ title }: { title: string }) {
  return (
    <View style={styles.cardTitleRow}>
      <Text style={styles.cardScreenTitle} numberOfLines={1}>
        {title}
      </Text>
      <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.TEXT_40} />
    </View>
  );
}

function AppealProbabilityBadge() {
  return (
    <View style={styles.appealPill}>
      <Text style={styles.appealBadgeText} numberOfLines={1}>
        Appeal Probability: High
      </Text>
    </View>
  );
}

function PatientRow({
  name,
  age,
  showAppealBadge,
}: {
  name: string;
  age: number;
  showAppealBadge?: boolean;
}) {
  return (
    <View style={styles.patientBlock}>
      <View style={styles.patientRow}>
        <Image source={DoctorTempImage} style={styles.patientRowAvatar} />
        <View style={styles.patientRowText}>
          <Text style={styles.patientName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.patientDot}> • </Text>
          <Text style={styles.patientAge} numberOfLines={1}>
            Age {age}
          </Text>
        </View>
      </View>
      {showAppealBadge ? (
        <View style={styles.appealBadgeRow}>
          <AppealProbabilityBadge />
        </View>
      ) : null}
    </View>
  );
}

function ThreeCardActions({
  primaryTitle,
  onPrimary,
  secondaryTitle,
  tertiaryTitle,
  tertiaryCoral,
}: {
  primaryTitle: string;
  onPrimary?: () => void;
  secondaryTitle: string;
  tertiaryTitle: string;
  tertiaryCoral?: boolean;
}) {
  return (
    <View style={styles.cardActionsRow}>
      <View style={styles.cardActionBtnWrap}>
        <ReusableButton
          title={primaryTitle}
          height={CARD_ACTION_H}
          borderRadius={CARD_ACTION_H / 2}
          width="100%"
          gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
          gradientPositions={[0.125, 1]}
          softFillShade
          ctaGlow
          backgroundColor={SUBMIT_FILL_FALLBACK}
          textStyle={[styles.cardBtnText, styles.cardPrimaryBtnText]}
          onPress={() => onPrimary?.()}
        />
      </View>
      <View style={styles.cardActionBtnWrap}>
        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={CARD_ACTION_H}
          borderRadius={CARD_ACTION_H / 2}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.WHITE}
          text={secondaryTitle}
          textStyle={[styles.cardBtnText, styles.cardOutlineBtnText]}
          shadowStyle={shared.outlineBtnNoShadow}
          onPress={() => {}}
        />
      </View>
      <View style={styles.cardActionBtnWrap}>
        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={CARD_ACTION_H}
          borderRadius={CARD_ACTION_H / 2}
          borderWidth={1}
          borderColor={tertiaryCoral ? ESCALATE_CORAL : COLORS.PRIMARY}
          bgColor={COLORS.WHITE}
          text={tertiaryTitle}
          textStyle={[
            styles.cardBtnText,
            tertiaryCoral ? styles.cardCoralBtnText : styles.cardOutlineBtnText,
          ]}
          shadowStyle={shared.outlineBtnNoShadow}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

export default function DenialResolution() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openTaskInbox = useCallback(() => {
    navigation.navigate(navigationStrings.TASK_INBOX);
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
          <EligibilityScreenHeader title="Denial Resolution" onBack={onBack} />

          <View style={shared.screenBody}>
            <View style={styles.section}>
              <NeumorphicCard
                borderRadius={ELIGIBILITY_CARD_RADIUS}
                backgroundColor={CASE_CARD_INNER}
                suppressInsetShadows
                outerStyle={[shared.caseCardOuterLift, shared.caseCardMargin]}
                innerStyle={[shared.caseCardInner, shared.caseCardInnerOverflow]}
                activeOpacity={1}
              >
                <Pressable onPress={() => {}}>
                  <CardTitleRow title="Denial Resolution" />
                  <PatientRow name={PATIENT_NAME} age={PATIENT_AGE} showAppealBadge />
                  <View style={styles.metaTagsRow}>
                    <Text style={styles.metaTag} numberOfLines={1}>
                      Rx remaining
                    </Text>
                    <Text style={styles.metaTag} numberOfLines={1}>
                      Medical device
                    </Text>
                  </View>
                </Pressable>

                <View style={shared.dividerDenial} />

                <Text style={styles.bodyText}>
                  Denial Reason: Medical device does not meet plan criteria. Plan requires additional
                  treatment steps before approval.
                </Text>

                <ThreeCardActions
                  primaryTitle="Submit Approval"
                  secondaryTitle="Correct info"
                  tertiaryTitle="Send to Billing"
                />
              </NeumorphicCard>
            </View>

            <View style={styles.section}>
              <NeumorphicCard
                borderRadius={ELIGIBILITY_CARD_RADIUS}
                backgroundColor={CASE_CARD_INNER}
                suppressInsetShadows
                outerStyle={[shared.caseCardOuterLift, shared.caseCardMargin]}
                innerStyle={[shared.caseCardInner, shared.caseCardInnerOverflow]}
                activeOpacity={1}
              >
                <Pressable onPress={() => {}}>
                  <CardTitleRow title="Authorization Approved" />
                  <PatientRow name={PATIENT_NAME} age={PATIENT_AGE} />
                  <View style={styles.appealRow}>
                    <Text style={shared.infoWellLabelInline} numberOfLines={1}>
                      Coverage:
                    </Text>
                    <InnerShadowPill label="Approved" tone="success" subtleOuterGlow />
                  </View>
                </Pressable>

                <View style={shared.dividerDenial} />

                <Text style={shared.infoWellDetailBold}>Auth Number: #787387922</Text>
                <Text style={[shared.expLine, styles.authExp]}>Exp: 23 April 2024</Text>

                <View style={styles.chatRow}>
                  <Image source={DoctorTempImage} style={styles.chatAvatar} />
                  <View style={styles.chatBubble}>
                    <Text style={styles.chatText}>
                      Notify henry and schedule injection visit
                    </Text>
                  </View>
                </View>

                <ThreeCardActions
                  primaryTitle="Notify Patient"
                  secondaryTitle="Send to scheduling"
                  tertiaryTitle="Close case"
                  tertiaryCoral
                />
              </NeumorphicCard>
            </View>
          </View>
        </ScrollView>

        <View style={[shared.footerBar, { paddingBottom: bottomPad }]}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={FOOTER_ACTION_H}
            borderRadius={22}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.WHITE}
            text="View Task Inbox"
            textStyle={shared.outlineGreenTextAuth}
            shadowStyle={shared.outlineBtnNoShadow}
            onPress={openTaskInbox}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 12 },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  cardScreenTitle: {
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
  patientBlock: {
    marginBottom: 14,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  patientRowAvatar: {
    width: PATIENT_ROW_AVATAR_SIZE,
    height: PATIENT_ROW_AVATAR_SIZE,
    borderRadius: PATIENT_ROW_AVATAR_SIZE / 2,
    resizeMode: "cover",
  },
  appealBadgeRow: {
    alignSelf: "flex-start",
    marginTop: 12,
  },
  appealPill: {
    alignSelf: "flex-start",
    backgroundColor: ESCALATE_FILL,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  appealBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    color: APPEAL_PILL_TEXT,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  patientRowText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    minWidth: 0,
    marginLeft: 3,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#2C2C2C",
    flexShrink: 1,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  patientDot: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#6B6B6B",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  patientAge: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#6B6B6B",
    flexShrink: 0,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  appealRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 5,
  },
  metaTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  metaTag: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: "#565656",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  cardActionsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    alignItems: "stretch",
  },
  cardActionBtnWrap: {
    flex: 1,
    minWidth: 0,
  },
  cardBtnText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: "center",
    paddingHorizontal: 4,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  cardPrimaryBtnText: {
    color: COLORS.WHITE,
  },
  cardOutlineBtnText: {
    color: COLORS.PRIMARY,
  },
  cardCoralBtnText: {
    color: ESCALATE_CORAL,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#565656",
    marginBottom: 16,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  authExp: {
    marginTop: 4,
    marginBottom: 14,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  chatAvatar: {
    width: CHAT_AVATAR_SIZE,
    height: CHAT_AVATAR_SIZE,
    borderRadius: CHAT_AVATAR_SIZE / 2,
    resizeMode: "cover",
    flexShrink: 0,
  },
  chatBubble: {
    flexShrink: 1,
    maxWidth: "85%",
    backgroundColor: CHAT_BUBBLE_BG,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
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
});
