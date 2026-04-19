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
import { LinearGradient } from "expo-linear-gradient";
import { Canvas, LinearGradient as SkiaLinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";
import { COLORS } from "../constants/theme";

interface ReusableButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  borderRadius?: number;
  width?: DimensionValue;
  backgroundColor?: string;
  textColor?: string;
  gradientColors?: [string, string];
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const SHADOW_PADDING = 10;

const ReusableButton: React.FC<ReusableButtonProps> = ({
  title,
  onPress,
  disabled = false,
  height = 48,
  borderRadius = 30,
  width = "100%",
  backgroundColor = COLORS.PRIMARY,
  textColor = COLORS.WHITE,
  gradientColors = ["#14B8D4", "#0E7490"],
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

  const rectR = Math.max(0, Math.min(borderRadius, numericWidth / 2, height / 2));

  const skiaBackground =
    Platform.OS !== "android" && numericWidth > 0 && height > 0 ? (
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
        <RoundedRect
          x={SHADOW_PADDING}
          y={SHADOW_PADDING}
          width={numericWidth}
          height={height}
          r={rectR}
          color={backgroundColor}
        >
          <SkiaLinearGradient
            start={vec(SHADOW_PADDING + numericWidth / 2, SHADOW_PADDING)}
            end={vec(SHADOW_PADDING + numericWidth / 2, SHADOW_PADDING + height)}
            colors={gradientColors}
          />
          <Shadow dx={2} dy={2} blur={8} color="#6F8CB047" />
          <Shadow dx={1} dy={1} blur={3} color="#728EAB14" />
          <Shadow dx={3} dy={3} blur={10} color="#C1D5EEB3" inner />
          <Shadow dx={-1} dy={-1} blur={6} color="#FFFFFF40" inner />
        </RoundedRect>
      </Canvas>
    ) : null;

  const androidBackground =
    Platform.OS === "android" && numericWidth > 0 && height > 0 ? (
      <LinearGradient
        pointerEvents="none"
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: rectR }]}
      />
    ) : null;

  return (
    <View style={[{ width, height }, containerStyle]} onLayout={handleLayout}>
      {skiaBackground}
      {androidBackground}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.surface,
          {
            borderRadius: rectR,
            opacity: disabled ? 0.65 : 1,
          },
        ]}
      >
        <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: { position: "absolute" },
  surface: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
});

export default ReusableButton;
