import React from 'react';
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia';

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
  color = '#F7FBFF',
}: Props) => {
  return (
    <Canvas style={{ width, height: height + BOTTOM_SHADOW_HEIGHT }}>
      <RoundedRect
        x={0}
        y={2}
        width={width}
        height={height}
        r={borderRadius}
        color="#C8CBCC"
      >
        <LinearGradient
          start={vec(0, 2)}
          end={vec(0, height + 2)}
          colors={['#C8CBCC00', '#C8CBCC00', '#C8CBCC2B', '#C8CBCC85']}
          positions={[0, 0.56, 0.8, 1]}
        />
      </RoundedRect>

      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        r={borderRadius}
        color={color}
      />
    </Canvas>
  );
};

export default NeumorphicView;
