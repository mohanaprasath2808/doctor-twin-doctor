import React, { useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import InnerShadowView from "./InnerShadowView";
import { COLORS } from "../constants/theme";

type NeumorphicInnerShadowCardProps = {
  children?: React.ReactNode;
  width?: DimensionValue;
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

const NeumorphicInnerShadowCard: React.FC<NeumorphicInnerShadowCardProps> = ({
  children,
  width,
  height = DEFAULT_HEIGHT,
  innerShadowHeight,
  borderRadius = DEFAULT_RADIUS,
  backgroundColor = COLORS.SURFACE,
  showInnerShadow = true,
  darkShadowDx = 4,
  darkShadowDy = 4,
  darkShadowBlur = 14,
  darkShadowColor = "#C8CBCC",
  lightShadowDx = -2,
  lightShadowDy = -2,
  lightShadowBlur = 9,
  lightShadowColor = "#FFFFFF99",
  containerStyle,
  contentStyle,
}) => {
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setMeasuredWidth(event.nativeEvent.layout.width);
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  const resolvedHeight = Math.max(height, contentHeight);
  const resolvedInnerHeight = innerShadowHeight ?? resolvedHeight;
  const innerRadius = Math.max(0, borderRadius - 1);

  return (
    <View
      style={[
        width == null ? styles.shrinkWrap : null,
        width != null ? { width } : null,
        containerStyle,
      ]}
      onLayout={onLayout}
    >
      <View style={[styles.border, { borderRadius }]}>
        <LinearGradient
          colors={["rgba(214, 227, 243, 0.5)", "rgba(255, 255, 255, 0.5)"]}
          locations={[0.1662, 0.5674]}
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
            {
              borderRadius: innerRadius,
              minHeight: resolvedHeight,
              backgroundColor,
            },
          ]}
        >
          {showInnerShadow && measuredWidth > 0 && resolvedInnerHeight > 0 ? (
            <View
              pointerEvents="none"
              style={[
                styles.innerShadowWrap,
                {
                  height: resolvedInnerHeight,
                  borderRadius: innerRadius,
                },
              ]}
            >
              <InnerShadowView
                width={measuredWidth}
                height={resolvedInnerHeight}
                borderRadius={Math.min(
                  innerRadius,
                  measuredWidth / 2,
                  resolvedInnerHeight / 2,
                )}
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
          ) : null}
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
  shrinkWrap: {
    alignSelf: "flex-start",
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
