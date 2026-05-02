import React from "react";
import { Platform, View } from "react-native";
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import { COLORS } from "../constants/theme";

interface Props {
  width?: number;
  height?: number;
  borderRadius?: number;
  color?: string;
}

const BOTTOM_SHADOW_HEIGHT = 24;

const NeumorphicView = ({
  width = 300,
  height = 47,
  borderRadius = 25,
  color = COLORS.SURFACE,
}: Props) => {
  const canvasH = height + BOTTOM_SHADOW_HEIGHT;
  const r = Math.max(0, Math.min(borderRadius, width / 2, height / 2));

  if (Platform.OS === "android") {
    return (
      <View
        style={{
          width,
          height: canvasH,
          borderRadius: r,
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <Canvas style={{ width, height: canvasH }}>
      <RoundedRect
        x={0}
        y={2}
        width={width}
        height={height}
        r={r}
        color="#C8CBCC"
      >
        <LinearGradient
          start={vec(0, 2)}
          end={vec(0, height + 2)}
          colors={["#C8CBCC00", "#C8CBCC00", "#C8CBCC2B", "#C8CBCC85"]}
          positions={[0, 0.56, 0.8, 1]}
        />
      </RoundedRect>

      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        r={r}
        color={color}
      />
    </Canvas>
  );
};

export default NeumorphicView;
