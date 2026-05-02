import React, { useMemo, useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";

import { COLORS } from "../constants/theme";

const DEFAULT_BORDER_GRADIENT_COLORS = [
  "#D6E3F3",
  "#FFFFFF",
  "#FFFFFF",
  "rgba(255,255,255,0.55)",
] as const;

const DEFAULT_BORDER_GRADIENT_POSITIONS = [0, 0.36, 0.58, 1] as const;

const DEFAULT_FILL_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const DEFAULT_FILL_POSITIONS: [number, number] = [0, 1];

const outerShadow = Platform.select({
  ios: {
    shadowColor: "#2A6578",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  android: {
    elevation: 9,
    shadowColor: "#2A6578",
  },
  default: {},
});

interface ReusableButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  borderRadius?: number;
  width?: DimensionValue;
  gradientColors?: [string, string];
  gradientPositions?: [number, number];
  backgroundColor?: string;
  borderWidth?: number;
  borderGradientColors?: readonly string[];
  borderGradientPositions?: readonly number[];
  textColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  title,
  onPress,
  disabled = false,
  height = 48,
  borderRadius = 64,
  width = "100%",
  gradientColors = DEFAULT_FILL_GRADIENT,
  gradientPositions = DEFAULT_FILL_POSITIONS,
  backgroundColor,
  borderWidth = 1,
  borderGradientColors = DEFAULT_BORDER_GRADIENT_COLORS,
  borderGradientPositions = DEFAULT_BORDER_GRADIENT_POSITIONS,
  textColor = "#FFFFFF",
  containerStyle,
  textStyle,
}) => {
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const numericWidth = useMemo(
    () => (typeof width === "number" ? width : measuredWidth),
    [width, measuredWidth],
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    if (typeof width === "number") return;
    setMeasuredWidth(event.nativeEvent.layout.width);
  };

  const effectiveRadius = Math.min(borderRadius, height / 2);
  const fillBaseColor = backgroundColor ?? gradientColors[1];
  const bw = Math.max(0, borderWidth);
  const fw = Math.max(0, numericWidth - 2 * bw);
  const fh = Math.max(0, height - 2 * bw);
  const fillRadius = Math.max(0, effectiveRadius - bw);

  const borderColors = [...borderGradientColors];
  const borderPos =
    borderGradientPositions && borderGradientPositions.length === borderColors.length
      ? [...borderGradientPositions]
      : undefined;

  const cx = numericWidth / 2;
  const fx = bw;
  const fy = bw;

  return (
    <View
      style={[
        styles.wrapper,
        outerShadow,
        {
          width,
          height,
          borderRadius: effectiveRadius,
          opacity: disabled ? 0.65 : 1,
        },
        containerStyle,
      ]}
      onLayout={handleLayout}
    >
      {numericWidth > 0 && (
        <Canvas style={[styles.canvasFill, { width: numericWidth, height }]}>
          {bw > 0 && (
            <RoundedRect
              x={0}
              y={0}
              width={numericWidth}
              height={height}
              r={effectiveRadius}
              color={borderColors[0] ?? "#D6E3F3"}
            >
              <LinearGradient
                start={vec(cx, 0)}
                end={vec(cx, height)}
                colors={borderColors}
                {...(borderPos ? { positions: borderPos } : {})}
              />
            </RoundedRect>
          )}
          <RoundedRect x={fx} y={fy} width={fw} height={fh} r={fillRadius} color={fillBaseColor}>
            <LinearGradient
              start={vec(fx, fy)}
              end={vec(fx, fy + fh)}
              colors={gradientColors}
              positions={gradientPositions}
            />
            <Shadow dx={4} dy={4} blur={10} color="#56B4D0" inner />
          </RoundedRect>
        </Canvas>
      )}

      <TouchableOpacity
        activeOpacity={0.85}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.surface,
          {
            borderRadius: fillRadius,
            top: bw,
            left: bw,
            right: bw,
            bottom: bw,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, { color: textColor }, textStyle]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "visible",
    backgroundColor: "transparent",
  },
  canvasFill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  surface: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 12,
    color: COLORS.WHITE,
  },
});

export default ReusableButton;
