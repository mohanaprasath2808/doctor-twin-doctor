import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
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
  width?: number;
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

const WIDTH = 56;
const HEIGHT = 20;
const BORDER = 1;
const HORIZONTAL_PADDING = 8;
const ICON_WIDTH_ESTIMATE = 16;
const INTER_ITEM_GAP = 3;
const CHAR_WIDTH_ESTIMATE = 10;
const INNER_CONTENT_EXTRA = 2;

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
  const label = String(value ?? "");
  const textWidth = Math.ceil(label.length * CHAR_WIDTH_ESTIMATE);
  const iconWidth = icon ? ICON_WIDTH_ESTIMATE : 0;
  const contentWidth = textWidth + iconWidth + (icon ? INTER_ITEM_GAP : 0);
  const autoWidth = Math.max(
    WIDTH,
    Math.ceil(contentWidth + HORIZONTAL_PADDING * 2 + INNER_CONTENT_EXTRA + BORDER * 2),
  );
  const badgeWidth = width ?? autoWidth;
  const innerWidth = badgeWidth - BORDER * 2;
  const innerHeight = height - BORDER * 2;
  const badgeRadius = radius ?? height / 2;
  const innerRadius = Math.max(0, badgeRadius - BORDER);

  return (
    <View
      style={[styles.border, { width: badgeWidth, height, borderRadius: badgeRadius }]}
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
  surface: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  innerShadow: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    width: "100%",
    minWidth: 0,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    flexShrink: 1,
  },
});

export default DeltaBadge;
