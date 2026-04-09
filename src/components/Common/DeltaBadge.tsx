import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

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
}

const WIDTH = 56;
const HEIGHT = 20;
const RADIUS = 114;
const BORDER = 1;

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
}) => {
  const autoWidth = Math.max(
    WIDTH,
    Math.ceil(String(value).length * 7 + (icon ? 18 : 0) + 18),
  );
  const badgeWidth = width ?? autoWidth;
  const innerWidth = badgeWidth - BORDER * 2;
  const innerHeight = height - BORDER * 2;
  const radius = height / 2;
  const innerRadius = Math.max(0, radius - BORDER);

  return (
    <View
      style={[
        styles.border,
        { width: badgeWidth, height, borderRadius: radius },
      ]}
    >
      <LinearGradient
        colors={["rgba(214, 227, 243, 0.46)", "rgba(255, 255, 255, 0.46)"]}
        locations={[0.082, 0.8268]}
        start={{ x: 1, y: 0.465 }}
        end={{ x: 0, y: 0.535 }}
        style={StyleSheet.absoluteFillObject}
      />
      <LinearGradient
        colors={["#FFFFFF", "rgba(255, 255, 255, 0)"]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          styles.surface,
          { backgroundColor: bgColor, borderRadius: innerRadius },
        ]}
      >
        <View
          pointerEvents="none"
          style={styles.innerShadow}
          collapsable={false}
        >
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
        <View style={styles.content}>
          {icon ? icon : null}
          <Text style={[styles.text, { color: textColor }, textStyle]}>
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
    gap: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DeltaBadge;
