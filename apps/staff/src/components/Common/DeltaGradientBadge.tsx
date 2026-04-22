import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

import { COLORS } from "../../constants/theme";

interface DeltaBadgeProps {
  icon?: React.ReactNode;
  value: string;
  bgColor?: string;
  darkShadowColor?: string;
  lightShadowColor?: string;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  width?: number;
  height?: number;
  radius?: number;
}

const WIDTH = 56;
const HEIGHT = 20;
/** Gradient stroke thickness (padding ring). */
const BORDER = 0.5;

/** Border gradient 1: light blue → white (white toward top-right). */
const BORDER_GRADIENT_1 = ["#D6E3F3", "#FFFFFF"] as const;
const BORDER_GRADIENT_1_START = { x: 0, y: 1 };
const BORDER_GRADIENT_1_END = { x: 1, y: 0 };

/** Border gradient 2: white → transparent (soft vertical highlight). */
const BORDER_GRADIENT_2 = ["#FFFFFF", "rgba(255, 255, 255, 0)"] as const;
const BORDER_GRADIENT_2_START = { x: 0.5, y: 0 };
const BORDER_GRADIENT_2_END = { x: 0.5, y: 1 };

/**
 * Neumorphic pill: thin gradient ring + inner shadows (Figma defaults).
 * Defaults: fill `#CFEFDC`, inner shadow mint `#B8E3CC` / white 60%.
 */
const DeltaGradientBadge: React.FC<DeltaBadgeProps> = ({
  icon,
  value,
  bgColor = COLORS.BADGE_SELECTED_BG,
  darkShadowColor = COLORS.BADGE_INNER_SHADOW_MINT,
  lightShadowColor = "rgba(255, 255, 255, 0.6)",
  textColor = COLORS.PRIMARY,
  textStyle,
  width,
  height = HEIGHT,
  radius,
}) => {
  const autoWidth = Math.max(WIDTH, Math.ceil(String(value).length * 7 + (icon ? 18 : 0) + 18));
  const badgeWidth = width ?? autoWidth;
  const innerWidth = badgeWidth - BORDER * 2;
  const innerHeight = height - BORDER * 2;
  const badgeRadius = radius ?? height / 2;
  const innerRadius = Math.max(0, badgeRadius - BORDER);

  return (
    <View style={[styles.border, { width: badgeWidth, height, borderRadius: badgeRadius }]}>
      <LinearGradient
        colors={[...BORDER_GRADIENT_1]}
        start={BORDER_GRADIENT_1_START}
        end={BORDER_GRADIENT_1_END}
        style={StyleSheet.absoluteFillObject}
      />
      <LinearGradient
        colors={[...BORDER_GRADIENT_2]}
        locations={[0, 1]}
        start={BORDER_GRADIENT_2_START}
        end={BORDER_GRADIENT_2_END}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.surface, { backgroundColor: bgColor, borderRadius: innerRadius }]}>
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
              <Shadow dx={4} dy={4} blur={14} color={darkShadowColor} inner />
              <Shadow dx={-4} dy={-4} blur={9} color={lightShadowColor} inner />
            </RoundedRect>
          </Canvas>
        </View>
        <View style={styles.content}>
          {icon ? icon : null}
          <Text style={[styles.text, { color: textColor }, textStyle]}>{value}</Text>
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
    gap: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DeltaGradientBadge;
