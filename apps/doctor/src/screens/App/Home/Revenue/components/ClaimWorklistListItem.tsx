import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import { getInitials } from "../../../../../constants/contant";
import { COLORS } from "../../../../../constants/theme";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import type { ClaimBadgeVariant } from "../claimsTypes";

export type ClaimWorklistItem = {
  id: string;
  name: string;
  condition: string;
  statusDetail: string;
  statusLabel: string;
  statusBadgeVariant: ClaimBadgeVariant;
  useInnerShadowStatusBadge: boolean;
  actionLabel?: string;
  avatarSource?: ImageSourcePropType;
  initials?: string;
  filterCategory: "open" | "denied";
};

const BADGE_PALETTE: Record<
  ClaimBadgeVariant,
  { bg: string; dark: string; light: string; text: string }
> = {
  error: {
    bg: "#FDECEC",
    dark: "#F2CACA",
    light: "#FFFFFF99",
    text: COLORS.ALERT,
  },
  warning: {
    bg: "#FFF8DB",
    dark: "#F2D790",
    light: "#FFFFFF99",
    text: COLORS.ESCALATION_DARK,
  },
  info: {
    bg: "#EAF2FF",
    dark: "#BFD6FF",
    light: "#FFFFFF99",
    text: "#2563EB",
  },
  neutral: {
    bg: "#F3F0FA",
    dark: "#DDD6F0",
    light: "#FFFFFF99",
    text: "#5B5675",
  },
  success: {
    bg: "#E8F8EF",
    dark: "#B8E6CF",
    light: "#FFFFFF99",
    text: COLORS.GREEN,
  },
};

type ClaimWorklistListItemProps = {
  item: ClaimWorklistItem;
  onPress?: () => void;
};

function StatusBadge({
  label,
  variant,
  innerShadow,
}: {
  label: string;
  variant: ClaimBadgeVariant;
  innerShadow: boolean;
}) {
  const palette = BADGE_PALETTE[variant];

  if (innerShadow) {
    return (
      <NeumorphicInnerShadowCard
        borderRadius={14}
        containerStyle={styles.statusBadgeOuter}
        contentStyle={styles.statusBadgeInner}
        darkShadowColor={palette.dark}
        lightShadowColor={palette.light}
      >
        <Text style={[styles.statusBadgeText, { color: palette.text }]} numberOfLines={1}>
          {label}
        </Text>
      </NeumorphicInnerShadowCard>
    );
  }

  return (
    <NeumorphicCard
      outerStyle={styles.statusBadgeOuter}
      innerStyle={[styles.statusBadgeInner, { backgroundColor: palette.bg }]}
      borderRadius={14}
    >
      <Text style={[styles.statusBadgeText, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
    </NeumorphicCard>
  );
}

function ReadyToSendBadge({ label }: { label: string }) {
  const palette = BADGE_PALETTE.success;
  return (
    <NeumorphicCard
      outerStyle={styles.actionBadgeOuter}
      innerStyle={[styles.actionBadgeInner, { backgroundColor: palette.bg }]}
      borderRadius={14}
    >
      <Text style={[styles.actionBadgeText, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
    </NeumorphicCard>
  );
}

const ClaimWorklistListItem = ({ item, onPress }: ClaimWorklistListItemProps) => {
  const displayInitials = item.initials ?? getInitials(item.name);

  return (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={12}
      onPress={onPress}
    >
      <View style={styles.row}>
        {item.avatarSource ? (
          <Image source={item.avatarSource} style={styles.avatar} resizeMode="cover" />
        ) : (
          <InnerShadowIcon
            size={44}
            radius={22}
            icon={
              <Text style={styles.initials} numberOfLines={1}>
                {displayInitials}
              </Text>
            }
          />
        )}

      <View style={styles.textCol}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.condition} numberOfLines={1}>
          {item.condition}
        </Text>
        <Text style={styles.statusDetail} numberOfLines={1}>
          {item.statusDetail}
        </Text>
      </View>

      <View style={styles.badgesCol}>
        <StatusBadge
          label={item.statusLabel}
          variant={item.statusBadgeVariant}
          innerShadow={item.useInnerShadowStatusBadge}
        />
        {item.actionLabel ? <ReadyToSendBadge label={item.actionLabel} /> : null}
      </View>
      </View>
    </NeumorphicCard>
  );
};

export default ClaimWorklistListItem;

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
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
    paddingTop: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  condition: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  statusDetail: {
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  badgesCol: {
    alignItems: "flex-end",
    gap: 8,
    flexShrink: 0,
    maxWidth: "38%",
  },
  statusBadgeOuter: {
    flexShrink: 1,
    maxWidth: "100%",
  },
  statusBadgeInner: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "center",
  },
  actionBadgeOuter: {
    flexShrink: 1,
    maxWidth: "100%",
  },
  actionBadgeInner: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "center",
  },
});
