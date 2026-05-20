import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";

type StatusDotProps = {
  color: string;
  size?: number;
  /** Centered label (e.g. count). Ignored when `icon` is set. */
  text?: string | number;
  textStyle?: StyleProp<TextStyle>;
  /** Centered custom content (e.g. SVG). Takes precedence over `text`. */
  icon?: React.ReactNode;
  /** Max width/height for `icon` area; defaults to ~55% of inner `size`. */
  iconSize?: number;
  outerGradientColors?: [string, string];
  style?: StyleProp<ViewStyle>;
};

/** Thumb/dot ring matching staff — gradient border (`LinearGradient`) + soft shadows. */
const StatusDot: React.FC<StatusDotProps> = ({
  color,
  size = 8,
  text,
  textStyle,
  icon,
  iconSize,
  outerGradientColors = ["#D6E3F3", "#FFFFFF"],
  style,
}) => {
  const outerSize = size + 2;
  const innerRadius = Math.max(0, size / 2);
  const outerRadius = Math.max(0, outerSize / 2);
  const resolvedIconSize = iconSize ?? Math.max(8, Math.floor(size * 0.55));

  return (
    <View
      style={[
        styles.outer,
        {
          width: outerSize,
          height: outerSize,
          borderRadius: outerRadius,
        },
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowDark, { borderRadius: outerRadius }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowLight, { borderRadius: outerRadius }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, { borderRadius: outerRadius }]}
      />

      <LinearGradient
        colors={outerGradientColors}
        start={{ x: 1, y: 0.465 }}
        end={{ x: 0, y: 0.535 }}
        style={[
          styles.border,
          {
            borderRadius: outerRadius,
            padding: 1,
          },
        ]}
      >
        <View
          style={[
            styles.inner,
            {
              width: size,
              height: size,
              borderRadius: innerRadius,
              backgroundColor: color,
            },
          ]}
        >
          {icon != null ? (
            <View
              style={[
                styles.iconSlot,
                { width: resolvedIconSize, height: resolvedIconSize },
              ]}
              pointerEvents="none"
            >
              {icon}
            </View>
          ) : text != null ? (
            <Text style={[styles.innerText, textStyle]}>{text}</Text>
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
};

export default StatusDot;

const styles = StyleSheet.create({
  outer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    backgroundColor: "transparent",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  border: {
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  iconSlot: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
