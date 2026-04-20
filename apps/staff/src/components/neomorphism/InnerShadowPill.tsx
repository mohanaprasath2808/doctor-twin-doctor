import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../constants/theme";
import InnerShadowView from "./InnerShadowView";

type InnerShadowPillProps = {
  label: string;
};

/**
 * Renders label text over a Skia inner-shadow pill; width follows content (measured on layout).
 */
const InnerShadowPill: React.FC<InnerShadowPillProps> = ({ label }) => {
  const [size, setSize] = useState({ w: 0, h: 28 });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ w: width, h: height });
  }, []);

  return (
    <View style={styles.wrap}>
      {size.w > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <InnerShadowView
            width={size.w}
            height={size.h}
            borderRadius={size.h / 2}
            color={COLORS.INNER_SURFACE}
          />
        </View>
      )}
      <View onLayout={onLayout} style={[styles.content, { zIndex: 1 }]}>
        <Text style={styles.text} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    alignSelf: "flex-start",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_80,
  },
});

export default InnerShadowPill;
