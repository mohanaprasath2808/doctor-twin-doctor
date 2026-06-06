import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import EcgPadIcon from "../../../../assets/icon/ecgPadIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import ClaimStatusBadge from "./components/ClaimStatusBadge";
import type { ClaimDetailContent, ClaimDetailParams, ClaimListItem } from "./claimsTypes";

const CLAIMS_LIST_LOOKUP: ClaimListItem[] = [
  {
    id: "humana-1",
    name: "Humana",
    date: "23/12/2024",
    statusLabel: "Missing field",
    badgeVariant: "error",
    initials: "HU",
  },
  {
    id: "sarah-meditare",
    name: "Sarah Meditare",
    date: "23/12/2024",
    statusLabel: "Dx/CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "cigna-1",
    name: "Cigna",
    date: "23/12/2024",
    statusLabel: "Diagnosis mismatch",
    badgeVariant: "error",
    initials: "CD",
  },
  {
    id: "humana-2",
    name: "Humana",
    date: "23/12/2024",
    statusLabel: "Docs missing",
    badgeVariant: "warning",
    initials: "HU",
  },
];

const DEFAULT_CLAIM_DETAIL: ClaimDetailContent = {
  patientName: "Sarah Williams",
  date: "23/12/2024",
  statusLabel: "Dx mismatch",
  badgeVariant: "error",
  avatarSource: DoctorTempImage,
  suggestedFix: [
    {
      id: "cpt",
      code: "99214",
      label: "CPT",
      badgeLabel: "99213",
      badgeVariant: "info",
    },
    {
      id: "dx",
      code: "E11.9",
      label: "Diagnosis",
      badgeLabel: "Missing",
      badgeVariant: "error",
    },
  ],
  checklist: [
    { id: "visit-note", label: "Visit Note", checked: false },
    { id: "lab-result", label: "Lab Result", checked: true },
    { id: "imaging-report", label: "Imaging Report", checked: false },
  ],
};

function getClaimDetailContent(claimId: string): ClaimDetailContent {
  const item = CLAIMS_LIST_LOOKUP.find((c) => c.id === claimId);
  if (!item) return DEFAULT_CLAIM_DETAIL;

  return {
    ...DEFAULT_CLAIM_DETAIL,
    patientName: item.id === "sarah-meditare" ? "Sarah Williams" : item.name,
    date: item.date,
    statusLabel:
      item.statusLabel === "Dx/CPT mismatch" ? "Dx mismatch" : item.statusLabel,
    badgeVariant: item.badgeVariant,
    avatarSource: item.avatarSource,
    initials: item.initials,
  };
}

const ClaimDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ ClaimDetail: ClaimDetailParams }, "ClaimDetail">>();
  const claimId = route.params.claimId;
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const detail = useMemo(() => getClaimDetailContent(claimId), [claimId]);
  const [checklist, setChecklist] = useState(detail.checklist);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((row) => (row.id === id ? { ...row, checked: !row.checked } : row)),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 132 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Claim Detail</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.patientInner} borderRadius={14}>
          <View style={styles.patientRow}>
            {detail.avatarSource ? (
              <Image source={detail.avatarSource} style={styles.avatar} />
            ) : (
              <InnerShadowIcon
                size={44}
                radius={22}
                icon={
                  <Text style={styles.initials} numberOfLines={1}>
                    {detail.initials ?? ""}
                  </Text>
                }
              />
            )}
            <View style={styles.patientText}>
              <Text style={styles.patientName} numberOfLines={1}>
                {detail.patientName}
              </Text>
              <Text style={styles.patientDate}>{detail.date}</Text>
            </View>
            <ClaimStatusBadge label={detail.statusLabel} variant={detail.badgeVariant} />
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Suggested Fix</Text>
          {detail.suggestedFix.map((row, index) => (
            <View key={row.id}>
              <View style={styles.fixRow}>
                <InnerShadowIcon
                  size={44}
                  radius={22}
                  icon={<EcgPadIcon width={18} height={18} />}
                />
                <View style={styles.fixTextCol}>
                  <Text style={styles.fixCode}>{row.code}</Text>
                  <Text style={styles.fixLabel}>{row.label}</Text>
                </View>
                <ClaimStatusBadge label={row.badgeLabel} variant={row.badgeVariant} />
              </View>
              {index < detail.suggestedFix.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Documentation Checklist</Text>
          {checklist.map((row, index) => (
            <View key={row.id}>
              <Pressable style={styles.checkRow} onPress={() => toggleCheck(row.id)}>
                <NeumorphicCheckboxMark selected={row.checked} />
                <Text style={styles.checkLabel}>{row.label}</Text>
              </Pressable>
              {index < checklist.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <View style={styles.actionsGrid}>
          <View style={styles.actionsRow}>
            <ReusableButton
              title="Apply Fix"
              height={48}
              borderRadius={24}
              containerStyle={styles.actionCell}
              textStyle={{ fontFamily: "SF-Pro-Display-Semibold" }}
              onPress={() => { }}
            />
            <AppButton
              text="Resubmit Claim"
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
          <View style={styles.actionsRow}>
            <AppButton
              text="Open Chart"
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
              text="Send to Coder"
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ClaimDetail;

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
  cardOuter: {
    width: "100%",
    marginBottom: 14,
  },
  patientInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  initials: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientText: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientDate: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 0,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 12,
  },
  fixRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  fixTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  fixCode: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  fixLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  checkLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  actionsGrid: {
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
    lineHeight: 18,
  },
});
