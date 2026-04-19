import React from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

type InnerShadowContainerProps = {
  children?: React.ReactNode;
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  color?: string;
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

const InnerShadowContainer: React.FC<InnerShadowContainerProps> = ({
  children,
  width = "100%",
  height,
  borderRadius = 25,
  color = "#FFFFFF",
  darkShadowDx = 2,
  darkShadowDy = 2,
  darkShadowBlur = 3,
  darkShadowColor = "#C8CBCC99",
  lightShadowDx = -2,
  lightShadowDy = -2,
  lightShadowBlur = 3,
  lightShadowColor = "#FFFFFFCC",
  containerStyle,
  contentStyle,
}) => {
  const [measuredWidth, setMeasuredWidth] = React.useState(0);
  const [measuredHeight, setMeasuredHeight] = React.useState(0);
  const numericWidth = typeof width === "number" ? width : measuredWidth;
  const numericHeight = typeof height === "number" ? height : measuredHeight;
  const handleLayout = (event: LayoutChangeEvent) => {
    if (typeof width !== "number") {
      setMeasuredWidth(event.nativeEvent.layout.width);
    }
    if (typeof height !== "number") {
      setMeasuredHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <View
      style={[styles.container, { width, height, borderRadius }, containerStyle]}
      onLayout={handleLayout}
    >
      {numericWidth > 0 && numericHeight > 0 && (
        <Canvas style={StyleSheet.absoluteFillObject}>
          <RoundedRect x={0} y={0} width={numericWidth} height={numericHeight} r={borderRadius} color={color}>
            <Shadow dx={darkShadowDx} dy={darkShadowDy} blur={darkShadowBlur} color={darkShadowColor} inner />
            <Shadow dx={lightShadowDx} dy={lightShadowDy} blur={lightShadowBlur} color={lightShadowColor} inner />
          </RoundedRect>
        </Canvas>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default InnerShadowContainer;
