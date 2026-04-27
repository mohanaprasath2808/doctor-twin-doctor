import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

interface Props {
  width?: number;
  height?: number;
  borderRadius?: number;
  color?: string;
  darkShadowDx?: number;
  darkShadowDy?: number;
  darkShadowBlur?: number;
  darkShadowColor?: string;
  lightShadowDx?: number;
  lightShadowDy?: number;
  lightShadowBlur?: number;
  lightShadowColor?: string;
}

/** Skia inner shadows: same defaults as doctor app — (2,2) dark ≈ bottom-right, (-2,-2) light ≈ top-left. */

const clampR = (width: number, height: number, borderRadius: number) =>
  Math.max(0, Math.min(borderRadius, width / 2, height / 2));

/**
 * Skia + Reanimated on Android can throw `play() requires a Picture parameter` when
 * the recorder picture is invalid. Use a lightweight RN fallback on Android.
 */
const InnerShadowView: React.FC<Props> = ({
  width = 300,
  height = 47,
  borderRadius = 25,
  color = "#F7FBFF",
  darkShadowDx = 2,
  darkShadowDy = 2,
  darkShadowBlur = 3,
  darkShadowColor = "#C8CBCC99",
  lightShadowDx = -2,
  lightShadowDy = -2,
  lightShadowBlur = 3,
  lightShadowColor = "#FFFFFFCC",
}) => {
  if (!width || !height) {
    return <View style={{ width, height }} pointerEvents="none" />;
  }

  const r = clampR(width, height, borderRadius);

  if (Platform.OS === "android") {
    return (
      <View
        pointerEvents="none"
        style={{
          width,
          height,
          borderRadius: r,
          backgroundColor: color,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(255,255,255,0.45)", "transparent", "rgba(0,0,0,0.04)"]}
          locations={[0, 0.45, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: r,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "rgba(200, 203, 204, 0.35)",
            },
          ]}
        />
      </View>
    );
  }

  return (
    <Canvas style={{ width, height }} pointerEvents="none">
      <RoundedRect x={0} y={0} width={width} height={height} r={r} color={color}>
        <Shadow
          dx={darkShadowDx}
          dy={darkShadowDy}
          blur={darkShadowBlur}
          color={darkShadowColor}
          inner
        />
        <Shadow
          dx={lightShadowDx}
          dy={lightShadowDy}
          blur={lightShadowBlur}
          color={lightShadowColor}
          inner
        />
      </RoundedRect>
    </Canvas>
  );
};

export default InnerShadowView;
