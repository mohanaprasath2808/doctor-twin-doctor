import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import BillingIcon from "../../../../assets/icon/billingIcon.svg";
import ClaimIssueIcon from "../../../../assets/icon/redWarningIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrowIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InnerShadowIcon from "../../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../../components/neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../../../constants/theme";
import { BillingStatusBadge, type BillingItem } from "../../../utills/billingStatus";

export default function BillingDashboardItemCard({
  item,
  onPress,
}: {
  item: BillingItem;
  onPress?: () => void;
}) {
  return (
    <NeumorphicCard
      borderRadius={14}
      backgroundColor={COLORS.INNER_SURFACE}
      outerStyle={styles.itemOuter}
      innerStyle={styles.itemInner}
      onPress={onPress}
    >
      <View style={styles.patientRow}>
        <DoctorAvatar source={DoctorTempImage} imageSize={40} containerSize={46} />
        <View style={styles.patientText}>
          <Text style={styles.patientName} numberOfLines={1}>
            {item.patientName}
          </Text>
          <Text style={styles.patientMeta}>{item.patientMeta}</Text>
        </View>
        <RightArrowIcon width={12} height={12} />
      </View>

      <View style={styles.divider} />

      <View style={styles.payerRow}>
        <View style={styles.payerLeft}>
          <InnerShadowIcon icon={<BillingIcon width={18} height={18} />} size={44} radius={22} />
          <View style={styles.payerText}>
            <Text style={styles.payerName} numberOfLines={1}>
              {item.payerName}
            </Text>
            <Text style={styles.memberId} numberOfLines={1}>
              Member ID: {item.memberId}
            </Text>
          </View>
        </View>
        <BillingStatusBadge status={item.status} textStyle={styles.statusText} height={26} radius={13} />
      </View>

      <View style={styles.divider} />

      <NeumorphicInnerShadowCard
        borderRadius={12}
        backgroundColor={COLORS.SURFACE}
        containerStyle={styles.issueOuter}
        contentStyle={styles.issueInner}
        fullWidth
      >
        <View style={styles.issueRow}>
          <InnerShadowIcon icon={<ClaimIssueIcon width={16} height={16} />} size={40} radius={20} />
          <View style={styles.issueTextWrap}>
            <Text style={styles.issueLabel}>Issue:</Text>
            <Text style={styles.issueText}>{item.issue}</Text>
          </View>
        </View>
      </NeumorphicInnerShadowCard>
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
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_10,
  },
  payerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  payerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  payerText: {
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
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  issueOuter: {
    width: "100%",
  },
  issueInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  issueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  issueTextWrap: {
    flex: 1,
    gap: 3,
  },
  issueLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  issueText: {
    fontSize: 13,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
});

