import React, { useState } from "react";
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";
import InnerShadowView from "./InnerShadowView";

type NeumorphicInnerShadowCardProps = {
  children?: React.ReactNode;
  /** When false, width follows content (e.g. role pill in a row). Default full-width block. */
  fullWidth?: boolean;
  height?: number;
  innerShadowHeight?: number;
  borderRadius?: number;
  backgroundColor?: string;
  showInnerShadow?: boolean;
  darkShadowDx?: number;
  darkShadowDy?: number;
  darkShadowBlur?: number;
  darkShadowColor?: string;
  lightShadowDx?: number;
  lightShadowDy?: number;
  lightShadowBlur?: number;
  lightShadowColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const DEFAULT_HEIGHT = 0;
const DEFAULT_RADIUS = 10;

/** 1px gradient ring (Figma): layer 1 blue→white, layer 2 white→transparent. */
const BORDER_GRADIENT_1 = ["#D6E3F3", "#FFFFFF"] as const;
const BORDER_GRADIENT_1_START = { x: 0, y: 1 };
const BORDER_GRADIENT_1_END = { x: 1, y: 0 };
const BORDER_GRADIENT_2 = ["#FFFFFF", "rgba(255, 255, 255, 0)"] as const;
const BORDER_GRADIENT_2_START = { x: 0.5, y: 0 };
const BORDER_GRADIENT_2_END = { x: 0.5, y: 1 };

const NeumorphicInnerShadowCard: React.FC<NeumorphicInnerShadowCardProps> = ({
  children,
  fullWidth = true,
  height = DEFAULT_HEIGHT,
  innerShadowHeight,
  borderRadius = DEFAULT_RADIUS,
  backgroundColor = COLORS.INNER_SURFACE,
  showInnerShadow = true,
  darkShadowDx = 4,
  darkShadowDy = 4,
  darkShadowBlur = 14,
  darkShadowColor = "#C8CBCC",
  lightShadowDx = -4,
  lightShadowDy = -4,
  lightShadowBlur = 9,
  lightShadowColor = "rgba(255, 255, 255, 0.6)",
  containerStyle,
  contentStyle,
}) => {
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 });
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayoutSize({ width, height });
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  const resolvedHeight = Math.max(height, contentHeight);
  const resolvedInnerHeight = innerShadowHeight ?? resolvedHeight;
  const innerRadius = Math.max(0, borderRadius - 1);
  /** 1px ring: inner surface is outer layout minus 2px per axis; Skia must match or corners look square. */
  const insetW = layoutSize.width > 0 ? Math.max(0, layoutSize.width - 2) : 0;
  const insetH = layoutSize.height > 0 ? Math.max(0, layoutSize.height - 2) : 0;
  const skiaCornerR = Math.min(innerRadius, insetW / 2, insetH / 2);

  return (
    <View
      style={[
        fullWidth ? styles.containerFullWidth : styles.containerShrink,
        { borderRadius, overflow: "hidden" },
        containerStyle,
      ]}
      onLayout={onLayout}
    >
      <View style={[styles.border, { borderRadius }]}>
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

        <View
          style={[
            styles.surface,
            {
              borderRadius: innerRadius,
              minHeight: resolvedHeight,
              backgroundColor,
            },
          ]}
        >
          {showInnerShadow && insetW > 0 && insetH > 0 && (
            <View
              pointerEvents="none"
              style={[
                styles.innerShadowWrap,
                {
                  height: insetH,
                  borderRadius: skiaCornerR,
                },
              ]}
            >
              <InnerShadowView
                width={insetW}
                height={insetH}
                borderRadius={skiaCornerR}
                color={backgroundColor}
                darkShadowDx={darkShadowDx}
                darkShadowDy={darkShadowDy}
                darkShadowBlur={darkShadowBlur}
                darkShadowColor={darkShadowColor}
                lightShadowDx={lightShadowDx}
                lightShadowDy={lightShadowDy}
                lightShadowBlur={lightShadowBlur}
                lightShadowColor={lightShadowColor}
              />
            </View>
          )}
          <View
            onLayout={onContentLayout}
            style={[styles.content, { minHeight: height }, contentStyle]}
          >
            {children}
          </View>
        </View>
      </View>
    </View>
  );
};

export default NeumorphicInnerShadowCard;

const styles = StyleSheet.create({
  containerFullWidth: {
    width: "100%",
  },
  containerShrink: {
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  border: {
    padding: 1,
    overflow: "hidden",
  },
  surface: {
    overflow: "hidden",
  },
  innerShadowWrap: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
  },
  content: {
    zIndex: 1,
    justifyContent: "flex-start",
  },
});
