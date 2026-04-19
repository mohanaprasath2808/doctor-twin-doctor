import React from "react";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

interface Props {
  width?: number;
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
}

const InnerShadowView: React.FC<Props> = ({
  width = 300,
  height = 47,
  borderRadius = 25,
  color = "#F7FBFF",
  darkShadowDx = 2,
  darkShadowDy = 2,
  darkShadowBlur = 3,
  darkShadowColor = "#C8CBCC99",
  lightShadowDx = -2,
  lightShadowDy = -2,
  lightShadowBlur = 3,
  lightShadowColor = "#FFFFFFCC",
}) => {
  // Match RN border curve: r cannot exceed half the smaller side or inner shadows break at corners.
  const r = Math.min(borderRadius, width / 2, height / 2);

  return (
    <Canvas style={{ width, height }}>
      <RoundedRect x={0} y={0} width={width} height={height} r={r} color={color}>
        <Shadow
          dx={darkShadowDx}
          dy={darkShadowDy}
          blur={darkShadowBlur}
          color={darkShadowColor}
          inner
        />
        <Shadow
          dx={lightShadowDx}
          dy={lightShadowDy}
          blur={lightShadowBlur}
          color={lightShadowColor}
          inner
        />
      </RoundedRect>
    </Canvas>
  );
};

export default InnerShadowView;
