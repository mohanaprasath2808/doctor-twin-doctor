import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/ecgPadIcon.svg";
import DocWithClockIcon from "../../../../assets/icon/docWithClock.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import ClaimListItemCard from "./components/ClaimListItemCard";
import type { AIAppealBuilderParams, ClaimListItem } from "./claimsTypes";

const APPEAL_LOOKUP: ClaimListItem[] = [
  {
    id: "john-miller",
    name: "John Miller",
    secondaryLine: "BCBS · $145",
    date: "23/12/2024",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    secondaryLine: "Aetna · $220",
    date: "23/12/2024",
    statusLabel: "Medical necessity",
    badgeVariant: "warning",
    avatarSource: DoctorTempImage,
  },
  {
    id: "mike-thompson",
    name: "Mike Thompson",
    secondaryLine: "Cigna · $98",
    date: "22/12/2024",
    statusLabel: "Duplicate claim",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "emma-davis",
    name: "Emma Davis",
    secondaryLine: "Humana · $310",
    date: "21/12/2024",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    initials: "ED",
  },
];

const CLINICAL_JUSTIFICATION =
  "The patient presented with symptoms requiring evaluation and management. Based on clinical findings, the procedure was medically necessary and consistent with the documented diagnosis.";

const GUIDELINE_CITATION =
  "As per ADA guidelines, evaluation and treatment are required for patients with uncontrolled diabetes and related comorbid conditions.";

const DOC_REFERENCES = [
  { id: "visit", title: "Visit Note", sub: "12 Mar 2025" },
  { id: "lab", title: "Lab Results", sub: "HbA1c elevated" },
  { id: "notes", title: "Physician Notes attached", sub: "" },
];

const ATTACHED_DOCS = [
  { id: "visit-pdf", name: "Visit_Note.pdf" },
  { id: "lab-pdf", name: "Lab_Report.pdf" },
];

function getAppealClaim(claimId: string): ClaimListItem {
  return APPEAL_LOOKUP.find((c) => c.id === claimId) ?? APPEAL_LOOKUP[0];
}

const AIAppealBuilder = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ AIAppealBuilder: AIAppealBuilderParams }, "AIAppealBuilder">>();
  const claimId = route.params.claimId;
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const claim = useMemo(() => getAppealClaim(claimId), [claimId]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>AI Appeal Builder</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.userInfoWrap}>
          <ClaimListItemCard item={claim} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Clinical Justification</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.insetOuter}
            contentStyle={styles.insetInner}
          >
            <Text style={styles.insetText}>{CLINICAL_JUSTIFICATION}</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Documentation References</Text>
          {DOC_REFERENCES.map((row, index) => (
            <View key={row.id}>
              <View style={styles.refRow}>
                <InnerShadowIcon
                  size={44}
                  radius={22}
                  icon={<LabReportIcon width={18} height={18} />}
                />
                <View style={styles.refTextCol}>
                  <Text style={styles.refTitle}>{row.title}</Text>
                  {row.sub ? <Text style={styles.refSub}>{row.sub}</Text> : null}
                </View>
              </View>
              {index < DOC_REFERENCES.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Guideline Citation</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.insetOuter}
            contentStyle={styles.insetInner}
          >
            <Text style={styles.insetText}>{GUIDELINE_CITATION}</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Attached Documentation</Text>
          {ATTACHED_DOCS.map((row, index) => (
            <View key={row.id}>
              <View style={styles.attachRow}>
                <InnerShadowIcon
                  size={44}
                  radius={22}
                  icon={<DocWithClockIcon width={18} height={18} />}
                />
                <Text style={styles.attachName} numberOfLines={1}>
                  {row.name}
                </Text>
                <AppButton
                  text="View"
                  fullWidth={false}
                  width={72}
                  height={36}
                  borderRadius={18}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={styles.viewBtnText}
                  style={styles.viewBtn}
                  onPress={() => { }}
                />
              </View>
              {index < ATTACHED_DOCS.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <View style={styles.actions}>
          <View style={styles.actionsRow}>
            <AppButton
              text="Edit Appeal"
              fullWidth={false}
              width="100%"
              height={48}
              borderRadius={24}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.outlineBtnText}
              style={styles.actionCell}
              onPress={() => { }}
            />
            <AppButton
              text="Attach Documents"
              fullWidth={false}
              width="100%"
              height={48}
              borderRadius={24}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.outlineBtnText}
              style={styles.actionCell}
              onPress={() => { }}
            />
          </View>
          <ReusableButton
            title="Submit Appeal"
            height={48}
            borderRadius={24}
            containerStyle={styles.submitBtn}
            onPress={() => { }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AIAppealBuilder;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  userInfoWrap: {
    marginBottom: 14,
  },
  cardOuter: {
    width: "100%",
    marginBottom: 14,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 12,
  },
  insetOuter: {
    width: "100%",
  },
  insetInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  insetText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 20,
  },
  refRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  refTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  refTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  refSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  attachRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  attachName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  viewBtn: {
    minWidth: 72,
  },
  viewBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionCell: {
    flex: 1,
    minWidth: 0,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "center",
  },
  submitBtn: {
    width: "100%",
  },
});
