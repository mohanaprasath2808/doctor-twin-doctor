import React from "react";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";

interface Props {
  width?: number;
  height?: number;
  borderRadius?: number;
  color?: string;
  /** When set (≥2 stops), fills the rect with a horizontal linear gradient under the inner shadows. */
  gradientColors?: readonly string[];
  gradientPositions?: readonly number[];
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
  gradientColors,
  gradientPositions,
  darkShadowDx = 2,
  darkShadowDy = 2,
  darkShadowBlur = 3,
  darkShadowColor = "#C8CBCC99",
  lightShadowDx = -2,
  lightShadowDy = -2,
  lightShadowBlur = 3,
  lightShadowColor = "#FFFFFFCC",
}) => {
  const gc = gradientColors;
  const useGradient = gc != null && gc.length >= 2;
  const fillFallback = useGradient ? gc[0]! : color;
  const posFromProp =
    useGradient &&
    gradientPositions != null &&
    gradientPositions.length === gc!.length
      ? [...gradientPositions]
      : undefined;
  const posDefaultTwo = useGradient && gc!.length === 2 ? ([0, 1] as const) : undefined;
  const pos = posFromProp ?? (posDefaultTwo ? [...posDefaultTwo] : undefined);

  return (
    <Canvas style={{ width, height }}>
      <RoundedRect x={0} y={0} width={width} height={height} r={borderRadius} color={fillFallback}>
        {useGradient ? (
          <LinearGradient
            start={vec(0, height * 0.5)}
            end={vec(width, height * 0.5)}
            colors={gc as string[]}
            {...(pos ? { positions: pos } : {})}
          />
        ) : null}
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
