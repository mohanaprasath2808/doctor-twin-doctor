import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import ClaimListItemCard from "./components/ClaimListItemCard";
import ClaimStatusBadge from "./components/ClaimStatusBadge";
import type { ClaimListItem, DeniedDetailsParams } from "./claimsTypes";

const DENIED_LOOKUP: ClaimListItem[] = [
  {
    id: "john-miller",
    name: "John Miller",
    secondaryLine: "$145",
    date: "23/12/2024",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    secondaryLine: "$220",
    date: "23/12/2024",
    statusLabel: "Medical necessity",
    badgeVariant: "warning",
    avatarSource: DoctorTempImage,
  },
  {
    id: "mike-thompson",
    name: "Mike Thompson",
    secondaryLine: "$98",
    date: "22/12/2024",
    statusLabel: "Duplicate claim",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "emma-davis",
    name: "Emma Davis",
    secondaryLine: "$310",
    date: "21/12/2024",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    initials: "ED",
  },
];

const DEFAULT_DENIED = DENIED_LOOKUP[0];

const PAYER_MESSAGE = "Procedure code not valid for diagnosis";

const ORIGINAL_CODING = [
  { id: "cpt", title: "ECG", label: "CPT", code: "93000" },
  { id: "dx", title: "Diabetes", label: "Diagnosis", code: "E11.9" },
];

const SUPPORTING_DOCS = [
  { id: "lab", label: "Lab document", checked: false },
  { id: "rbs", label: "RBS Document", checked: true },
];

function getDeniedClaim(claimId: string): ClaimListItem {
  return DENIED_LOOKUP.find((c) => c.id === claimId) ?? DEFAULT_DENIED;
}

const DeniedDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ DeniedDetails: DeniedDetailsParams }, "DeniedDetails">>();
  const claimId = route.params.claimId;
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const claim = useMemo(() => getDeniedClaim(claimId), [claimId]);
  const [docs, setDocs] = useState(SUPPORTING_DOCS);

  const toggleDoc = (id: string) => {
    setDocs((prev) =>
      prev.map((row) => (row.id === id ? { ...row, checked: !row.checked } : row)),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 140 }]}
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
          <Text style={styles.headerTitle}>Denied Details</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.userInfoWrap}>
          <ClaimListItemCard item={claim} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Original Coding</Text>
          {ORIGINAL_CODING.map((row, index) => (
            <View key={row.id}>
              <View style={styles.codingRow}>
                <InnerShadowIcon
                  size={44}
                  radius={22}
                  icon={<LabReportIcon width={18} height={18} />}
                />
                <View style={styles.codingTextCol}>
                  <Text style={styles.codingTitle}>{row.title}</Text>
                  <Text style={styles.codingLabel}>{row.label}</Text>
                </View>
                <ClaimStatusBadge label={row.code} variant="info" />
              </View>
              {index < ORIGINAL_CODING.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Payer Message</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.insetOuter}
            contentStyle={styles.insetInner}
          >
            <Text style={styles.insetText}>{PAYER_MESSAGE}</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Supporting Documentation</Text>
          {docs.map((row, index) => (
            <View key={row.id}>
              <Pressable style={styles.docRow} onPress={() => toggleDoc(row.id)}>
                <NeumorphicCheckboxMark selected={row.checked} />
                <InnerShadowIcon
                  size={40}
                  radius={20}
                  icon={<LabReportIcon width={18} height={18} />}
                />
                <Text style={styles.docLabel}>{row.label}</Text>
              </Pressable>
              {index < docs.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.actionsRow}>
          <ReusableButton
            title="Appeal"
            height={48}
            borderRadius={24}
            containerStyle={styles.actionCell}
            onPress={() =>
              navigation.navigate(navigationStrings.AI_APPEAL_BUILDER, { claimId })
            }
          />
          <AppButton
            text="Resubmit"
            fullWidth={false}
            width="100%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            style={styles.actionCell}
            onPress={() =>
              navigation.navigate(navigationStrings.RESUBMIT_CLAIM, { claimId })
            }
          />
        </View>
        <View style={styles.actionsRow}>
          <AppButton
            text="Write Off"
            fullWidth={false}
            width="100%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            style={styles.actionCell}
            onPress={() =>
              navigation.navigate(navigationStrings.WRITE_OFF, {
                claimId,
                patientName: claim.name,
              })
            }
          />
          <AppButton
            text="Correct Coding"
            fullWidth={false}
            width="100%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            style={styles.actionCell}
            onPress={() =>
              navigation.navigate(navigationStrings.CODING_CORRECTION, { claimId })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeniedDetails;

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
  codingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  codingTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  codingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  codingLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
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
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  docLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: COLORS.SURFACE,
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
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
});
