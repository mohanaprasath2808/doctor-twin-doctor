import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../../constants/theme";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import RightArrow from "../../../../../assets/icon/rightArrow.svg";
import type { ClaimBadgeVariant } from "../claimsTypes";

export type BillingAlertItem = {
  id: string;
  statusLabel: string;
  badgeVariant: ClaimBadgeVariant;
  primaryText: string;
  secondaryText: string;
  avatarSource?: number;
  initials?: string;
};

const BADGE_PALETTE: Record<
  ClaimBadgeVariant,
  { dark: string; light: string; text: string }
> = {
  error: {
    dark: "#F2CACA",
    light: "#FFFFFF99",
    text: COLORS.ALERT,
  },
  warning: {
    dark: "#F2D790",
    light: "#FFFFFF99",
    text: COLORS.ESCALATION_DARK,
  },
  info: {
    dark: "#BFD6FF",
    light: "#FFFFFF99",
    text: "#2563EB",
  },
  neutral: {
    dark: "#DDD6F0",
    light: "#FFFFFF99",
    text: "#5B5675",
  },
  success: {
    dark: "#B8E6CF",
    light: "#FFFFFF99",
    text: COLORS.GREEN,
  },
};

type BillingAlertListItemProps = {
  item: BillingAlertItem;
  onPress?: () => void;
};

const BillingAlertListItem = ({ item, onPress }: BillingAlertListItemProps) => {
  const palette = BADGE_PALETTE[item.badgeVariant];

  return (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={14}
      onPress={onPress}
    >
      <NeumorphicInnerShadowCard
        borderRadius={14}
        containerStyle={styles.badgeOuter}
        contentStyle={styles.badgeInner}
        darkShadowColor={palette.dark}
        lightShadowColor={palette.light}
      >
        <Text style={[styles.badgeText, { color: palette.text }]} numberOfLines={1}>
          {item.statusLabel}
        </Text>
      </NeumorphicInnerShadowCard>

      <View style={styles.contentRow}>
        {item.avatarSource ? (
          <Image source={item.avatarSource} style={styles.avatar} />
        ) : item.initials ? (
          <InnerShadowIcon
            size={44}
            radius={22}
            icon={
              <Text style={styles.initials} numberOfLines={1}>
                {item.initials}
              </Text>
            }
          />
        ) : (
          <View style={styles.avatarSpacer} />
        )}

        <View style={[styles.textCol, !item.avatarSource && !item.initials && styles.textColFull]}>
          <Text style={styles.primaryText} numberOfLines={1}>
            {item.primaryText}
          </Text>
          <Text style={styles.secondaryText} numberOfLines={2}>
            {item.secondaryText}
          </Text>
        </View>

        <RightArrow width={10} height={10} style={styles.chevron} />
      </View>
    </NeumorphicCard>
  );
};

export default BillingAlertListItem;

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  badgeOuter: {
    alignSelf: "flex-start",
  },
  badgeInner: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarSpacer: {
    width: 0,
  },
  initials: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  textCol: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  textColFull: {
    paddingLeft: 0,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  chevron: {
    opacity: 0.5,
    flexShrink: 0,
  },
});
