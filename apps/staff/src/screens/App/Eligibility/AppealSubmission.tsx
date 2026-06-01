import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import navigationStrings from "../../../constants/navigationStrings";
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

const PATIENT_NAME = "Susan Reed, 62";
const INSURER = "Cigna Insurance";
const CARD_BTN_H = 40;
const FOOTER_ACTION_H = 44;
const DENIAL_BANNER_H = 40;
const DENIAL_BANNER_RADIUS = DENIAL_BANNER_H / 2;
const SUBMISSION_ICON_SIZE = 40;
const CHAT_AVATAR_SIZE = 52;
const CHAT_AVATAR_PHOTO = Math.round(CHAT_AVATAR_SIZE * (38 / 56));
const CHAT_BUBBLE_BG = "#CBF0FF";

export default function AppealSubmission() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openEscalate = useCallback(() => {
    navigation.navigate(navigationStrings.ESCALATE_TASK);
  }, [navigation]);

  return (
    <SafeAreaView style={shared.safe} edges={["top", "left", "right"]}>
      <ScrollView
        style={shared.scroll}
        contentContainerStyle={[shared.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <EligibilityScreenHeader title="Appeal Submission" onBack={onBack} />

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
              <View style={styles.responseBadgeRow}>
                <InnerShadowPill label="Response Denial" tone="success" subtleOuterGlow />
              </View>
              <Text style={styles.careDueLine}>Care Due in 2 Days</Text>
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
              <Text style={styles.sectionTitle}>Today&apos;s Actions</Text>

              <View style={styles.submissionRow}>
                <InnerShadowIcon
                  size={SUBMISSION_ICON_SIZE}
                  icon={
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={22}
                      color={COLORS.PRIMARY}
                    />
                  }
                />
                <View style={styles.submissionTextBlock}>
                  <Text style={styles.submissionTitle}>Submission times</Text>
                  <Text style={styles.submissionSub}>2 min</Text>
                </View>
              </View>

              <View style={styles.twoBtnRow}>
                <View style={styles.halfBtn}>
                  <AppButton
                    activeOpacity={0.85}
                    width="100%"
                    height={CARD_BTN_H}
                    borderRadius={CARD_BTN_H / 2}
                    borderWidth={1}
                    borderColor={COLORS.PRIMARY}
                    bgColor={COLORS.WHITE}
                    text="Edit Appeal"
                    textStyle={shared.outlineGreenTextAuth}
                    shadowStyle={shared.outlineBtnNoShadow}
                    onPress={() => {}}
                  />
                </View>
                <View style={styles.halfBtn}>
                  <InnerShadowPill
                    label="Escalate"
                    tone="danger"
                    subtleOuterGlow
                    fullWidth
                    minHeight={CARD_BTN_H}
                    onPress={openEscalate}
                    textStyle={styles.escalateBtnText}
                  />
                </View>
              </View>

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
                style={styles.addNotesInCard}
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
                  Twin sent the authorization to billing and medical the claim as ready to
                  submit.
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
  responseBadgeRow: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  careDueLine: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: TEXT_TERTIARY,
    marginBottom: 14,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  submissionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  submissionTextBlock: { flex: 1, minWidth: 0 },
  submissionTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  submissionSub: {
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
  twoBtnRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
    marginBottom: 10,
  },
  halfBtn: { flex: 1, minWidth: 0 },
  escalateBtnText: {
    fontSize: 14,
    lineHeight: 18,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  addNotesInCard: {
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
    color: TEXT_TERTIARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
});
