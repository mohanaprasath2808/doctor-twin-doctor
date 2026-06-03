import React from "react";
import { StyleSheet, Text } from "react-native";

import { COLORS } from "../../../../../constants/theme";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import type { ClaimBadgeVariant } from "../claimsTypes";

const BADGE_STYLES: Record<
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
};

type ClaimStatusBadgeProps = {
  label: string;
  variant: ClaimBadgeVariant;
};

const ClaimStatusBadge = ({ label, variant }: ClaimStatusBadgeProps) => {
  const palette = BADGE_STYLES[variant];
  return (
    <NeumorphicInnerShadowCard
      borderRadius={14}
      containerStyle={styles.outer}
      contentStyle={styles.inner}
      darkShadowColor={palette.dark}
      lightShadowColor={palette.light}
    >
      <Text style={[styles.text, { color: palette.text }]} numberOfLines={2}>
        {label}
      </Text>
    </NeumorphicInnerShadowCard>
  );
};

export default ClaimStatusBadge;

const styles = StyleSheet.create({
  outer: {
    flexShrink: 1,
    maxWidth: "46%",
  },
  inner: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "center",
  },
});
