import React from "react";
import { Platform, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";

type StatusDotProps = {
  color: string;
  size?: number;
  text?: string | number;
  textStyle?: StyleProp<TextStyle>;
  outerGradientColors?: [string, string];
  style?: StyleProp<ViewStyle>;
};

/** Thumb/dot ring matching staff — gradient border (`LinearGradient`) + soft shadows. */
const StatusDot: React.FC<StatusDotProps> = ({
  color,
  size = 8,
  text,
  textStyle,
  outerGradientColors = ["#D6E3F3", "#FFFFFF"],
  style,
}) => {
  const outerSize = size + 2;
  const innerRadius = Math.max(0, size / 2);
  const outerRadius = Math.max(0, outerSize / 2);

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
          {text != null ? <Text style={[styles.innerText, textStyle]}>{text}</Text> : null}
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
  },
  innerText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
