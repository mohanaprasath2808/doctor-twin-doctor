import React from "react";
import { Image, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import FormEditIcon from "../../../../assets/icon/formEditIcon.svg";
import ShieldIcon from "../../../../assets/icon/sheildIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrowIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import InnerShadowIcon from "../../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/neomorphism/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import { BillingStatusBadge, type BillingStatus } from "../../../utills/billingStatus";
import type { DocumentsDashboardListItemData } from "../types/documentDashboardTypes";

function billingStatusForDocumentLabel(statusLabel: string): BillingStatus {
  const key = statusLabel.trim().toLowerCase();
  if (key === "pending") return "Pending";
  if (key === "completed") return "Resolved";
  if (key === "uploaded") return "Closed";
  if (key === "missing") return "Escalated";
  return "Pending";
}

export default function DocumentsDashboardListItem({
  item,
  onPress,
  outerStyle,
}: {
  item: DocumentsDashboardListItemData;
  onPress?: () => void;
  outerStyle?: StyleProp<ViewStyle>;
}) {
  const showInsurance = Boolean(item.payerName && item.memberId);

  return (
    <NeumorphicCard
      borderRadius={14}
      backgroundColor={COLORS.INNER_SURFACE}
      outerStyle={[styles.itemOuter, outerStyle]}
      innerStyle={styles.itemInner}
      onPress={onPress}
    >
      <View style={styles.docRow}>
        <View style={styles.docLeft}>
          <InnerShadowIcon icon={<FormEditIcon width={18} height={18} />} size={44} radius={22} />
          <View style={styles.docText}>
            <Text style={styles.docTitle} numberOfLines={2}>
              {item.documentTitle}
            </Text>
            <Text style={styles.dueLabel}>{item.dueLabel}</Text>
          </View>
        </View>
        <BillingStatusBadge
          status={billingStatusForDocumentLabel(item.statusLabel)}
          label={item.statusLabel}
          textStyle={styles.statusText}
        />
      </View>

      <View style={styles.divider} />

      {showInsurance ? (
        <>
          <View style={styles.insuranceRow}>
            <InnerShadowIcon icon={<ShieldIcon width={18} height={18} />} size={44} radius={22} />
            <View style={styles.insuranceText}>
              <Text style={styles.payerName} numberOfLines={1}>
                {item.payerName}
              </Text>
              <Text style={styles.memberId} numberOfLines={1}>
                Member ID: {item.memberId}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
        </>
      ) : null}

      <View style={styles.patientRow}>
        <Image source={DoctorTempImage} style={styles.avatar} />
        <View style={styles.patientText}>
          <Text style={styles.patientName} numberOfLines={1}>
            {item.patientName}
          </Text>
          <Text style={styles.patientMeta}>{item.patientMeta}</Text>
        </View>
        <RightArrowIcon width={12} height={12} />
      </View>
    </NeumorphicCard>
  );
}

const styles = StyleSheet.create({
  itemOuter: {
    width: "100%",
    marginTop: 14,
  },
  itemInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  docRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  docLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  docText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  dueLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_10,
  },
  insuranceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  insuranceText: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  payerName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  memberId: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  patientText: {
    flex: 1,
    gap: 3,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
});
