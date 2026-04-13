import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type StatusDotProps = {
  color: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const StatusDot: React.FC<StatusDotProps> = ({ color, size = 8, style }) => {
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
        style={[
          styles.shadowLayer,
          styles.shadowDark,
          { borderRadius: outerRadius },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowLight,
          { borderRadius: outerRadius },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowSoft,
          { borderRadius: outerRadius },
        ]}
      />

      <LinearGradient
        colors={["#D6E3F3", "#FFFFFF"]}
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
        />
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
    backgroundColor: "#F7FBFF",
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
  inner: {},
});
