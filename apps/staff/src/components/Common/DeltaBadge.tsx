import React, { useState } from "react";
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
}) => {
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const renderedWidth = width ?? measuredWidth;
  const innerWidth = Math.max(0, renderedWidth - BORDER * 2);
  const innerHeight = height - BORDER * 2;
  const badgeRadius = radius ?? height / 2;
  const innerRadius = Math.max(0, badgeRadius - BORDER);

  return (
    <View
      onLayout={(event) => setMeasuredWidth(event.nativeEvent.layout.width)}
      style={[styles.border, { height, borderRadius: badgeRadius }, width != null ? { width } : null]}
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
          width != null ? styles.surfaceFullWidth : null,
          {
            backgroundColor: bgColor,
            borderRadius: innerRadius,
            paddingHorizontal: HORIZONTAL_PADDING,
          },
        ]}
      >
        {innerWidth > 0 ? (
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
                <Shadow dx={4} dy={2} blur={8} color={darkShadowColor} inner />
                <Shadow dx={-4} dy={-2} blur={5} color={lightShadowColor} inner />
              </RoundedRect>
            </Canvas>
          </View>
        ) : null}
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
