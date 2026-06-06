import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { COLORS } from "../../../../../constants/theme";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";

const BAR_HEIGHT = 14;
const BAR_RADIUS = BAR_HEIGHT / 2;

type DenialReasonProgressItemProps = {
  label: string;
  valueLabel: string;
  progress: number;
};

const DenialReasonProgressItem = ({
  label,
  valueLabel,
  progress,
}: DenialReasonProgressItemProps) => {
  const fillPercent = Math.min(Math.max(progress, 0), 1) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>

      <NeumorphicInnerShadowCard
        borderRadius={BAR_RADIUS}
        containerStyle={styles.barOuter}
        contentStyle={styles.barInner}
        darkShadowColor="#C8D4E4"
        lightShadowColor="#FFFFFF"
      >
        <View style={styles.track}>
          <LinearGradient
            colors={["#5B8FD8", "#303DA3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.fill, { width: `${fillPercent}%` }]}
          />
        </View>
      </NeumorphicInnerShadowCard>

      <Text style={styles.value}>{valueLabel}</Text>
    </View>
  );
};

export default DenialReasonProgressItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  label: {
    width: 118,
    flexShrink: 0,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  barOuter: {
    flex: 1,
    minWidth: 0,
  },
  barInner: {
    padding: 3,
    backgroundColor: "#EEF2F8",
  },
  track: {
    width: "100%",
    height: BAR_HEIGHT,
    borderRadius: BAR_RADIUS,
    overflow: "hidden",
    backgroundColor: "#E3EAF3",
  },
  fill: {
    height: "100%",
    borderRadius: BAR_RADIUS,
    minWidth: BAR_RADIUS * 2,
  },
  value: {
    width: 34,
    flexShrink: 0,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "right",
  },
});
