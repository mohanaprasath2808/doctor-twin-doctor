import React, { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import EcgPadIcon from "../../../../assets/icon/ecgPadIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InputField from "../../../../neomorphism/InputField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";
import ClaimStatusBadge from "./components/ClaimStatusBadge";
import type { ClaimBadgeVariant, ClaimListItem, ClaimSignatureParams } from "./claimsTypes";

type ClaimSignatureContent = {
  patientName: string;
  date: string;
  statusLabel: string;
  badgeVariant: ClaimBadgeVariant;
  avatarSource?: ClaimListItem["avatarSource"];
  initials?: string;
  cptCode: string;
  diagnosisCode: string;
};

const UNSIGNED_LOOKUP: ClaimListItem[] = [
  {
    id: "sarah-williams-1",
    name: "Sarah Williams",
    date: "23/12/2024",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "cotmg-dply",
    name: "Cotmg Dply",
    date: "23/12/2024",
    statusLabel: "Missing Diagnosis",
    badgeVariant: "error",
    initials: "CD",
  },
  {
    id: "sarah-williams-2",
    name: "Sarah Williams",
    date: "23/12/2024",
    statusLabel: "Dx mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams-3",
    name: "Sarah Williams",
    date: "23/12/2024",
    statusLabel: "Docs missing",
    badgeVariant: "warning",
    avatarSource: DoctorTempImage,
  },
];

const DEFAULT_SIGNATURE: ClaimSignatureContent = {
  patientName: "Sarah Williams",
  date: "23/12/2024",
  statusLabel: "CPT mismatch",
  badgeVariant: "error",
  avatarSource: DoctorTempImage,
  cptCode: "99214",
  diagnosisCode: "E11.9",
};

function getClaimSignatureContent(claimId: string): ClaimSignatureContent {
  const item = UNSIGNED_LOOKUP.find((c) => c.id === claimId);
  if (!item) return DEFAULT_SIGNATURE;

  return {
    patientName: item.name,
    date: item.date,
    statusLabel: item.statusLabel,
    badgeVariant: item.badgeVariant,
    avatarSource: item.avatarSource,
    initials: item.initials,
    cptCode: "99214",
    diagnosisCode: "E11.9",
  };
}

const ClaimSignature = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ ClaimSignature: ClaimSignatureParams }, "ClaimSignature">>();
  const claimId = route.params.claimId;
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [signature, setSignature] = useState("");

  const content = useMemo(() => getClaimSignatureContent(claimId), [claimId]);

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
          <Text style={styles.headerTitle}>Claim Signature</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.patientInner} borderRadius={14}>
          <View style={styles.patientTopRow}>
            {content.avatarSource ? (
              <Image source={content.avatarSource} style={styles.avatar} />
            ) : (
              <InnerShadowIcon
                size={44}
                radius={22}
                icon={
                  <Text style={styles.initials} numberOfLines={1}>
                    {content.initials ?? ""}
                  </Text>
                }
              />
            )}
            <View style={styles.patientText}>
              <Text style={styles.patientName} numberOfLines={1}>
                {content.patientName}
              </Text>
              <Text style={styles.patientDate}>{content.date}</Text>
            </View>
            <ClaimStatusBadge label={content.statusLabel} variant={content.badgeVariant} />
          </View>

          <View style={styles.divider} />

          <View style={styles.codesRow}>
            <View style={styles.codeCol}>
              <InnerShadowIcon
                size={44}
                radius={22}
                icon={<EcgPadIcon width={18} height={18} />}
              />
              <View style={styles.codeTextCol}>
                <Text style={styles.codeValue}>{content.cptCode}</Text>
                <Text style={styles.codeLabel}>CPT</Text>
              </View>
            </View>
            <View style={styles.codeCol}>
              <InnerShadowIcon
                size={44}
                radius={22}
                icon={<EcgPadIcon width={18} height={18} />}
              />
              <View style={styles.codeTextCol}>
                <Text style={styles.codeValue}>{content.diagnosisCode}</Text>
                <Text style={styles.codeLabel}>Diagnosis</Text>
              </View>
            </View>
          </View>
        </NeumorphicCard>

        <Text style={styles.fieldLabel}>Claim Signature</Text>
        <InputField
          value={signature}
          onChangeText={setSignature}
          placeholder=""
          multiline
          minHeight={140}
          borderRadius={12}
          containerStyle={styles.signatureInput}
        />

        <View style={styles.actions}>
          <View style={styles.actionsRow}>
            <AppButton
              text="Batch Sign"
              fullWidth={false}
              width="100%"
              height={48}
              borderRadius={24}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.outlineBtnText}
              style={styles.actionCell}
              onPress={() => navigation.navigate(navigationStrings.BATCH_SIGN_CLAIMS)}
            />
            <AppButton
              text="Edit"
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
            title="Return to coder"
            height={48}
            borderRadius={24}
            containerStyle={styles.returnBtn}
            onPress={() =>
              navigation.navigate(navigationStrings.RETURN_TO_CODER, {
                claimId,
                patientName: content.patientName,
                claimNumber: "#12345",
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimSignature;

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
    marginBottom: 16,
  },
  patientInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientTopRow: {
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
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 12,
  },
  codesRow: {
    flexDirection: "row",
    gap: 12,
  },
  codeCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  codeTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  codeValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  codeLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 10,
  },
  signatureInput: {
    width: "100%",
    marginBottom: 20,
  },
  actions: {
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
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
  returnBtn: {
    width: "100%",
  },
});
