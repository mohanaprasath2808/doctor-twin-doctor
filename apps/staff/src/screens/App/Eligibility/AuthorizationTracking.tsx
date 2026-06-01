import React, { useCallback } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import AuthTrackingCheckIcon from "../../../assets/icon/authorizationTracking/authTrackingCheck.png";
import AuthTrackingPortalIcon from "../../../assets/icon/authorizationTracking/authTrackingPortal.png";
import AuthTrackingProgressIcon from "../../../assets/icon/authorizationTracking/authTrackingProgress.png";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import InnerShadowView from "../../../components/neomorphism/InnerShadowView";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import { getInitials } from "../../../constants/constant";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import EligibilityScreenHeader from "./components/EligibilityScreenHeader";
import {
  CASE_CARD_INNER,
  ELIGIBILITY_CARD_RADIUS,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Sarah Johnson";
const INSURER = "Humana";
const FOOTER_ACTION_H = 44;
const CARD_BTN_H = 40;
const CHAT_AVATAR_SIZE = 52;
const CHAT_AVATAR_PHOTO = Math.round(CHAT_AVATAR_SIZE * (38 / 56));
const CHAT_BUBBLE_BG = "#CBF0FF";
/** Mint status chip — elevated card on parent (Figma). */
const SUBMITTED_BANNER_BG = "#D3FFF1";
const COUNTDOWN_INSET_W = 56;
const COUNTDOWN_INSET_H = 48;
const COUNTDOWN_INSET_R = 12;
const COUNTDOWN_TEXT_GREEN = "#4F8A66";
const STEP_ICON_SIZE = 40;
const SUBMITTED_ICON_SIZE = 40;
const TRACKING_GLYPH_SIZE = 20;

type TrackingGlyphSource = typeof AuthTrackingCheckIcon;

function TrackingGlyph({ source }: { source: TrackingGlyphSource }) {
  return (
    <View style={styles.trackingGlyphSlot}>
      <Image source={source} style={styles.trackingGlyph} resizeMode="contain" />
    </View>
  );
}

function PatientInitialsGlyph({ label }: { label: string }) {
  return (
    <View style={styles.trackingGlyphSlot}>
      <Text style={styles.initials}>{label}</Text>
    </View>
  );
}

function StepIcon({ source }: { source: TrackingGlyphSource }) {
  return (
    <View style={styles.stepIconCell}>
      <InnerShadowIcon
        size={STEP_ICON_SIZE}
        icon={<TrackingGlyph source={source} />}
      />
    </View>
  );
}

function SubmittedCheckIcon() {
  return (
    <View
      style={[
        styles.stepIconCell,
        { width: SUBMITTED_ICON_SIZE, height: SUBMITTED_ICON_SIZE },
      ]}
    >
      <InnerShadowIcon
        size={SUBMITTED_ICON_SIZE}
        icon={<TrackingGlyph source={AuthTrackingCheckIcon} />}
      />
    </View>
  );
}

/** Recessed squircle — "1d 4h / left" (Figma neumorphic inset). */
function CountdownInset() {
  return (
    <View style={styles.countdownInset}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <InnerShadowView
          width={COUNTDOWN_INSET_W}
          height={COUNTDOWN_INSET_H}
          borderRadius={COUNTDOWN_INSET_R}
          color={CASE_CARD_INNER}
          darkShadowDx={3}
          darkShadowDy={3}
          darkShadowBlur={8}
          darkShadowColor="rgba(15, 23, 42, 0.1)"
          lightShadowDx={-3}
          lightShadowDy={-3}
          lightShadowBlur={6}
          lightShadowColor="rgba(255, 255, 255, 0.95)"
        />
      </View>
      <View style={styles.countdownInsetContent}>
        <Text style={styles.countdownLinePrimary}>1d 4h</Text>
        <Text style={styles.countdownLineSecondary}>left</Text>
      </View>
    </View>
  );
}

function ProgressRow({
  iconSource,
  title,
  subtitle,
  badge,
  rightText,
}: {
  iconSource: TrackingGlyphSource;
  title: string;
  subtitle?: string;
  badge?: { label: string; tone: "warn" | "neutral" };
  rightText?: string;
}) {
  return (
    <View style={styles.progressRow}>
      <StepIcon source={iconSource} />
      <View style={styles.progressBody}>
        <View style={styles.progressTitleRow}>
          <Text style={[styles.progressTitle, subtitle ? styles.progressTitleBold : null]}>
            {title}
          </Text>
          {badge ? (
            <InnerShadowPill label={badge.label} tone={badge.tone} subtleOuterGlow />
          ) : null}
          {rightText ? (
            <Text style={styles.progressRight} numberOfLines={1}>
              {rightText}
            </Text>
          ) : null}
        </View>
        {subtitle ? (
          <Text style={styles.progressSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default function AuthorizationTracking() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={shared.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={shared.scroll}
        contentContainerStyle={[shared.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
          <EligibilityScreenHeader title="Authorization Tracking" onBack={onBack} />

          <View style={shared.screenBody}>
            {/* Card 1: patient + submitted status */}
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
                    icon={<PatientInitialsGlyph label={getInitials(PATIENT_NAME)} />}
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
                <View style={styles.submittedBanner}>
                  <SubmittedCheckIcon />
                  <View style={styles.submittedTextBlock}>
                    <Text style={styles.submittedTitle}>Authorization Submitted</Text>
                    <Text style={styles.submittedSubtitle}>
                      Sent 2 hours ago • 11:20 PM • Portal
                    </Text>
                  </View>
                </View>
              </NeumorphicCard>
            </View>

            {/* Card 2: in progress + portal */}
            <View style={styles.section}>
              <NeumorphicCard
                borderRadius={ELIGIBILITY_CARD_RADIUS}
                backgroundColor={CASE_CARD_INNER}
                suppressInsetShadows
                outerStyle={shared.caseCardOuterLift}
                innerStyle={[styles.cardInner, shared.caseCardInnerOverflow]}
                activeOpacity={1}
              >
                <ProgressRow
                  iconSource={AuthTrackingProgressIcon}
                  title="In progress"
                  badge={{ label: "Portal Sync", tone: "warn" }}
                />
                <View style={styles.cardDivider} />
                <ProgressRow
                  iconSource={AuthTrackingPortalIcon}
                  title="Portal"
                  rightText="Today"
                />
              </NeumorphicCard>
            </View>

            {/* Card 3: pending + send reminder */}
            <View style={styles.section}>
              <NeumorphicCard
                borderRadius={ELIGIBILITY_CARD_RADIUS}
                backgroundColor={CASE_CARD_INNER}
                suppressInsetShadows
                outerStyle={shared.caseCardOuterLift}
                innerStyle={[styles.cardInner, shared.caseCardInnerOverflow]}
                activeOpacity={1}
              >
                <View style={styles.pendingRow}>
                  <StepIcon source={AuthTrackingProgressIcon} />
                  <View style={styles.pendingBody}>
                    <Text style={styles.pendingTitle}>Pending</Text>
                    <Text style={styles.pendingSubtitle}>Waiting for Payer Response</Text>
                  </View>
                  <CountdownInset />
                </View>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={CARD_BTN_H}
                  borderRadius={CARD_BTN_H / 2}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Send Secure reminder"
                  textStyle={shared.outlineGreenTextAuth}
                  shadowStyle={shared.outlineBtnNoShadow}
                  style={styles.reminderBtn}
                  onPress={() => {}}
                />
              </NeumorphicCard>
            </View>

            <View style={styles.chatSection}>
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
                  <Text style={styles.chatAuthor}>Dr. Twin</Text>
                  <Text style={styles.chatText}>
                    Twin sent the instruction to billing and payer the claim as ready to submit.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.addNoteSection}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={FOOTER_ACTION_H}
                borderRadius={22}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.WHITE}
                text="Add Note"
                textStyle={shared.outlineGreenTextAuth}
                shadowStyle={shared.outlineBtnNoShadow}
                onPress={() => {}}
              />
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepIconCell: {
    width: STEP_ICON_SIZE,
    height: STEP_ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  trackingGlyphSlot: {
    width: TRACKING_GLYPH_SIZE,
    height: TRACKING_GLYPH_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  trackingGlyph: {
    width: TRACKING_GLYPH_SIZE,
    height: TRACKING_GLYPH_SIZE,
  },
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
    textAlign: "center",
    includeFontPadding: false,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", lineHeight: 20 },
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
  submittedBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    backgroundColor: SUBMITTED_BANNER_BG,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    overflow: "visible",
    ...Platform.select({
      ios: {
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submittedTextBlock: { flex: 1, minWidth: 0 },
  submittedTitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  submittedSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EAEAEA",
    marginVertical: 4,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  progressBody: { flex: 1, minWidth: 0 },
  progressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  progressTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: TEXT_TERTIARY,
    minWidth: 0,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  progressTitleBold: {
    fontWeight: "600",
  },
  progressSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  progressRight: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: TEXT_SECONDARY,
    flexShrink: 0,
    marginLeft: "auto",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  pendingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  pendingBody: { flex: 1, minWidth: 0 },
  pendingTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  pendingSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  countdownInset: {
    width: COUNTDOWN_INSET_W,
    height: COUNTDOWN_INSET_H,
    borderRadius: COUNTDOWN_INSET_R,
    flexShrink: 0,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  countdownInsetContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  countdownLinePrimary: {
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 13,
    color: COUNTDOWN_TEXT_GREEN,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  countdownLineSecondary: {
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 13,
    color: COUNTDOWN_TEXT_GREEN,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  reminderBtn: {
    alignSelf: "stretch",
  },
  chatSection: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  addNoteSection: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  chatAvatarContainer: {
    width: CHAT_AVATAR_SIZE,
    height: CHAT_AVATAR_SIZE,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    alignSelf: "flex-start",
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
  chatAuthor: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: 0,
    color: TEXT_TERTIARY,
    marginBottom: 4,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
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
