import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import ClaimStatusBadge from "./components/ClaimStatusBadge";

const SUGGESTED_FIX = [
  {
    id: "cpt",
    code: "99214",
    label: "CPT",
    badgeLabel: "99213",
    badgeVariant: "info" as const,
  },
  {
    id: "dx",
    code: "E11.9",
    label: "Diagnosis",
    badgeLabel: "Missing",
    badgeVariant: "error" as const,
  },
];

const ClaimCorrection = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
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
          <Text style={styles.headerTitle}>Claim Correction</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.patientInner} borderRadius={14}>
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.avatar} />
            <View style={styles.patientText}>
              <Text style={styles.patientName} numberOfLines={1}>
                Sarah Williams
              </Text>
              <Text style={styles.patientDate}>23/12/2024</Text>
            </View>
            <ClaimStatusBadge label="Dx mismatch" variant="error" />
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Suggested Fix</Text>
          {SUGGESTED_FIX.map((row, index) => (
            <View key={row.id}>
              <View style={styles.fixRow}>
                <InnerShadowIcon
                  size={44}
                  radius={22}
                  icon={<LabReportIcon width={18} height={18} />}
                />
                <View style={styles.fixTextCol}>
                  <Text style={styles.fixCode}>{row.code}</Text>
                  <Text style={styles.fixLabel}>{row.label}</Text>
                </View>
                <ClaimStatusBadge label={row.badgeLabel} variant={row.badgeVariant} />
              </View>
              {index < SUGGESTED_FIX.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <View style={styles.actionsGrid}>
          <View style={styles.actionsRow}>
            <ReusableButton
              title="Apply Fix"
              height={48}
              borderRadius={24}
              containerStyle={styles.actionCell}
              onPress={() => {}}
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
              onPress={() =>
                navigation.navigate(navigationStrings.RESUBMIT_CLAIM, { claimId: "underpayment-1" })
              }
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
              onPress={() => {}}
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
              onPress={() =>
                navigation.navigate(navigationStrings.RETURN_TO_CODER, {
                  claimId: "underpayment-1",
                  patientName: "Sarah Williams",
                  claimNumber: "CLM-10431",
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimCorrection;

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
  actionsGrid: {
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
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
});
