import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { ColorValue } from "react-native";

import AppButton from "../../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../../constants/theme";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import ClaimStatusBadge from "./ClaimStatusBadge";
import type { ClaimBadgeVariant } from "../claimsTypes";
import type { ImageSourcePropType } from "react-native";

export type PaymentReconciliationItem = {
  id: string;
  name: string;
  claimId: string;
  statusLabel: string;
  badgeVariant: ClaimBadgeVariant;
  payment: string;
  expected: string;
  difference: string;
  differenceColor: ColorValue;
  avatarSource?: ImageSourcePropType;
  showActions?: boolean;
  filterStatus: "matched" | "unmatched";
};

type PaymentReconciliationListItemProps = {
  item: PaymentReconciliationItem;
  onAdjust?: () => void;
  onMatch?: () => void;
};

const PaymentReconciliationListItem = ({
  item,
  onAdjust,
  onMatch,
}: PaymentReconciliationListItemProps) => (
  <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
    <View style={styles.headerRow}>
      {item.avatarSource ? (
        <Image source={item.avatarSource} style={styles.avatar} />
      ) : null}
      <View style={styles.headerText}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.claimId} numberOfLines={1}>
          {item.claimId}
        </Text>
      </View>
      <ClaimStatusBadge label={item.statusLabel} variant={item.badgeVariant} />
    </View>

    <View style={styles.metricsRow}>
      <View style={styles.metricCol}>
        <Text style={styles.metricValue}>{item.payment}</Text>
        <Text style={styles.metricLabel}>Payment</Text>
      </View>
      <View style={styles.metricCol}>
        <Text style={styles.metricValue}>{item.expected}</Text>
        <Text style={styles.metricLabel}>Expected</Text>
      </View>
      <View style={styles.metricCol}>
        <Text style={[styles.metricValue, { color: item.differenceColor }]}>{item.difference}</Text>
        <Text style={styles.metricLabel}>Difference</Text>
      </View>
    </View>

    {item.showActions ? (
      <View style={styles.actionsRow}>
        <AppButton
          text="Adjust"
          fullWidth={false}
          width="100%"
          height={48}
          borderRadius={24}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.outlineBtnText}
          style={styles.actionCell}
          onPress={onAdjust}
        />
        <ReusableButton
          title="Match"
          height={48}
          borderRadius={24}
          containerStyle={styles.actionCell}
          onPress={onMatch}
        />
      </View>
    ) : null}
  </NeumorphicCard>
);

export default PaymentReconciliationListItem;

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  claimId: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  metricCol: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    gap: 4,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
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
