import React from 'react';
import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia';

interface Props {
  size?: number;
}

const NeumorphicCircle: React.FC<Props> = ({ size = 120 }) => {
  const canvasSize = size + 40; // IMPORTANT: extra space for shadow
  const offset = 20; // center the circle

  return (
    <Canvas style={{ width: canvasSize, height: canvasSize }}>
      <RoundedRect
        x={offset}
        y={offset}
        width={size}
        height={size}
        r={size / 2}
        color="#FFFFFF"
      >
        <Shadow dx={4} dy={4} blur={20} color="#C8CBCC" />
        <Shadow dx={-6} dy={-6} blur={20} color="#FFFFFFE5" />
        <Shadow dx={2} dy={2} blur={4} color="#728EAB1A" />
      </RoundedRect>
    </Canvas>
  );
};

export default NeumorphicCircle;
