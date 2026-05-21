import React, { useCallback } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import MedicalNecessityChatIcon from "../../../assets/icon/missingDocuments/medicalNecessityChat.png";
import AppButton from "../../../components/Common/AppButton";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
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
} from "./eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as shared } from "./eligibilityPriorAuthStyles";

const PATIENT_NAME = "Sarah Williams";
const ACTION_H = 44;
const ROW_BTN_H = 36;
const NECESSITY_ICON_SIZE = 40;
const NECESSITY_GLYPH_SIZE = 22;

type DocActionRow = {
  id: string;
  label: string;
  action: "pull" | "upload";
};

const DOC_ACTION_ROWS: DocActionRow[] = [
  { id: "clinical", label: "Clinical notes", action: "pull" },
  { id: "labs", label: "Labs / Imaging", action: "upload" },
];

function NecessityChatGlyph() {
  return (
    <View style={styles.necessityGlyphSlot}>
      <Image
        source={MedicalNecessityChatIcon}
        style={styles.necessityGlyph}
        resizeMode="contain"
      />
    </View>
  );
}

function DocActionListRow({ row }: { row: DocActionRow }) {
  const actionLabel = row.action === "pull" ? "Pull EMR" : "Upload";
  return (
    <View style={styles.docRow}>
      <Text style={styles.docLabel} numberOfLines={1}>
        {row.label}
      </Text>
      <AppButton
        activeOpacity={0.85}
        height={ROW_BTN_H}
        borderRadius={ROW_BTN_H / 2}
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.WHITE}
        text={actionLabel}
        textStyle={styles.rowBtnText}
        shadowStyle={shared.outlineBtnNoShadow}
        style={styles.docRowBtnHug}
        onPress={() => {}}
      />
    </View>
  );
}

export default function MissingDocuments() {
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
      <ScrollView
        style={shared.scroll}
        contentContainerStyle={[shared.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <EligibilityScreenHeader title="Missing Documents" onBack={onBack} />

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
              outerStyle={shared.caseCardOuterLift}
              innerStyle={[styles.docsCardInner, shared.caseCardInnerOverflow]}
              activeOpacity={1}
            >
              <View style={styles.nestedDocList}>
                {DOC_ACTION_ROWS.map((row, index) => (
                  <View key={row.id}>
                    <DocActionListRow row={row} />
                    {index < DOC_ACTION_ROWS.length - 1 ? (
                      <View style={styles.docDivider} />
                    ) : null}
                  </View>
                ))}
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
              <View style={styles.necessityRow}>
                <InnerShadowIcon size={NECESSITY_ICON_SIZE} icon={<NecessityChatGlyph />} />
                <Text style={styles.necessityLabel} numberOfLines={1}>
                  Medical Necessity
                </Text>
                <InnerShadowPill label="Ready" tone="success" subtleOuterGlow />
              </View>
            </NeumorphicCard>
          </View>

          <View style={styles.actionGrid}>
            <View style={styles.gridRow}>
              <View style={styles.gridCell}>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={ACTION_H}
                  borderRadius={22}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Upload"
                  textStyle={shared.outlineGreenTextAuth}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
              <View style={styles.gridCell}>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={ACTION_H}
                  borderRadius={22}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Request MD"
                  textStyle={shared.outlineGreenTextAuth}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridCell}>
                <ReusableButton
                  title="Request from Patient"
                  height={ACTION_H}
                  borderRadius={22}
                  width="100%"
                  gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
                  gradientPositions={[0.125, 1]}
                  softFillShade
                  ctaGlow
                  backgroundColor={SUBMIT_FILL_FALLBACK}
                  textStyle={styles.primaryGridText}
                  onPress={openAppealSubmission}
                />
              </View>
              <View style={styles.gridCell}>
                <AppButton
                  activeOpacity={0.85}
                  width="100%"
                  height={ACTION_H}
                  borderRadius={22}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.WHITE}
                  text="Submit to Aetna"
                  textStyle={shared.outlineGreenTextAuth}
                  shadowStyle={shared.outlineBtnNoShadow}
                  onPress={() => {}}
                />
              </View>
            </View>
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
  docsCardInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
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
  docLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#1E293B",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
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
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  necessityGlyphSlot: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  necessityGlyph: {
    width: NECESSITY_GLYPH_SIZE,
    height: NECESSITY_GLYPH_SIZE,
  },
  necessityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  necessityLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#1E293B",
    minWidth: 0,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  actionGrid: {
    marginTop: 14,
    gap: 10,
  },
  gridRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
  primaryGridText: {
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
});
