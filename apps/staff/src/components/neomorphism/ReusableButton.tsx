import React, { useMemo, useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";

import { COLORS } from "../../constants/theme";

/**
 * Figma border (two linear layers → 4 stops). Filled ring reads reliably on device;
 * a transparent stroke often disappears on Android.
 */
const DEFAULT_BORDER_GRADIENT_COLORS = [
  "#D6E3F3",
  "#FFFFFF",
  "#FFFFFF",
  "rgba(255,255,255,0.55)",
] as const;

const DEFAULT_BORDER_GRADIENT_POSITIONS = [0, 0.36, 0.58, 1] as const;

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
  /** Ring thickness (outer gradient minus inner face). Default 3 for clear visibility. */
  borderWidth?: number;
  borderGradientColors?: readonly string[];
  borderGradientPositions?: readonly number[];
  textColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const SHADOW_PADDING = 48;

const ReusableButton: React.FC<ReusableButtonProps> = ({
  title,
  onPress,
  disabled = false,
  height = 48,
  borderRadius = 60,
  width = "100%",
  gradientColors = ["#CFEFDC", "#429761"],
  gradientPositions = [0.125, 1],
  backgroundColor,
  borderWidth = 1.5,
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
  const bx = SHADOW_PADDING;
  const by = SHADOW_PADDING;
  const bw = Math.max(0, borderWidth);
  const fx = bx + bw;
  const fy = by + bw;
  const fw = Math.max(0, numericWidth - 2 * bw);
  const fh = Math.max(0, height - 2 * bw);
  const fillRadius = Math.max(0, effectiveRadius - bw);

  const borderColors = [...borderGradientColors];
  const borderPos =
    borderGradientPositions && borderGradientPositions.length === borderColors.length
      ? [...borderGradientPositions]
      : undefined;

  const cx = bx + numericWidth / 2;

  return (
    <View style={[styles.wrapper, { width, height }, containerStyle]} onLayout={handleLayout}>
      {numericWidth > 0 && (
        <Canvas
          pointerEvents="none"
          style={[
            styles.canvas,
            {
              width: numericWidth + SHADOW_PADDING * 2,
              height: height + SHADOW_PADDING * 2,
              left: -SHADOW_PADDING,
              top: -SHADOW_PADDING,
            },
          ]}
        >
          {bw > 0 && (
            <RoundedRect
              x={bx}
              y={by}
              width={numericWidth}
              height={height}
              r={effectiveRadius}
              color={borderColors[0] ?? "#D6E3F3"}
            >
              <LinearGradient
                start={vec(cx, by)}
                end={vec(cx, by + height)}
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
            <Shadow dx={1} dy={1} blur={2} color="rgba(114,142,171,0.1)" />
            <Shadow dx={-3} dy={-3} blur={10} color="rgba(255,255,255,0.9)" />
            <Shadow dx={2} dy={2} blur={10} color="rgba(101,179,130,0.6)" />
            <Shadow dx={2} dy={2} blur={7} color="#B5F4CC" inner />
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
            opacity: disabled ? 0.65 : 1,
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
  wrapper: { overflow: "visible" },
  canvas: { position: "absolute" },
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
