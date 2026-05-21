import React, { useState } from "react";
import {
  type DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

const DEFAULT_BORDER_GRADIENT_COLORS: [string, string] = [
  "rgba(214, 227, 243, 0.46)",
  "rgba(255, 255, 255, 0.46)",
];

const DEFAULT_HIGHLIGHT_GRADIENT_COLORS: [string, string] = [
  "#FFFFFF",
  "rgba(255, 255, 255, 0)",
];

interface DeltaBadgeProps {
  icon?: React.ReactNode;
  value: string;
  bgColor: string;
  darkShadowColor: string;
  lightShadowColor?: string;
  textColor: string;
  textStyle?: StyleProp<TextStyle>;
  /** e.g. `120` or `"50%"`. Omit to size from content (no `width` style applied). */
  width?: DimensionValue;
  height?: number;
  radius?: number;
  /** Outer border gradient (under the vertical highlight). */
  borderGradientColors?: [string, string];
  /** Vertical fade overlay; defaults to white → transparent. */
  highlightGradientColors?: [string, string];
  darkShadowDx?: number;
  darkShadowDy?: number;
  darkShadowBlur?: number;
  lightShadowDx?: number;
  lightShadowDy?: number;
  lightShadowBlur?: number;
}

const HEIGHT = 20;
const BORDER = 1;
const HORIZONTAL_PADDING = 8;

const DeltaBadge: React.FC<DeltaBadgeProps> = ({
  icon,
  value,
  bgColor,
  darkShadowColor,
  lightShadowColor = "#FFFFFF99",
  textColor,
  textStyle,
  width,
  height = HEIGHT,
  radius,
  borderGradientColors = DEFAULT_BORDER_GRADIENT_COLORS,
  highlightGradientColors = DEFAULT_HIGHLIGHT_GRADIENT_COLORS,
  darkShadowDx = 4,
  darkShadowDy = 2,
  darkShadowBlur = 8,
  lightShadowDx = -4,
  lightShadowDy = -2,
  lightShadowBlur = 5,
}) => {
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const layoutWidth = typeof width === "number" ? width : measuredWidth;
  const innerWidth = Math.max(0, layoutWidth - BORDER * 2);
  const innerHeight = height - BORDER * 2;
  const badgeRadius = radius ?? height / 2;
  const innerRadius = Math.max(0, badgeRadius - BORDER);
  const hasExplicitWidth = width != null;

  return (
    <View
      onLayout={(event) => setMeasuredWidth(event.nativeEvent.layout.width)}
      style={[
        styles.border,
        { height, borderRadius: badgeRadius },
        hasExplicitWidth ? { width } : styles.shrinkToContent,
      ]}
    >
      <LinearGradient
        colors={borderGradientColors}
        locations={[0.082, 0.8268]}
        start={{ x: 1, y: 0.465 }}
        end={{ x: 0, y: 0.535 }}
        style={StyleSheet.absoluteFillObject}
      />
      <LinearGradient
        colors={highlightGradientColors}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          styles.surface,
          hasExplicitWidth ? styles.surfaceFullWidth : null,
          {
            backgroundColor: bgColor,
            borderRadius: innerRadius,
            paddingHorizontal: HORIZONTAL_PADDING,
          },
        ]}
      >
        <View pointerEvents="none" style={styles.innerShadow} collapsable={false}>
          <Canvas style={{ width: innerWidth, height: innerHeight }}>
            <RoundedRect
              x={0}
              y={0}
              width={innerWidth}
              height={innerHeight}
              r={innerRadius}
              color={bgColor}
            >
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
        </View>
        <View style={styles.content}>
          {icon ? icon : null}
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, { color: textColor }, textStyle]}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    padding: BORDER,
    overflow: "hidden",
  },
  shrinkToContent: {
    alignSelf: "flex-start",
  },
  surface: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  surfaceFullWidth: {
    width: "100%",
  },
  innerShadow: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingHorizontal: 8,
    minWidth: 0,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    flexShrink: 1,
  },
});

export default DeltaBadge;
