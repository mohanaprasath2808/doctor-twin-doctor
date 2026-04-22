import React, { useCallback, useState, type ReactNode } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";

import { COLORS } from "../../constants/theme";
import InnerShadowView from "./InnerShadowView";

type InnerShadowPillProps = {
  label: string;
  /** Optional leading icon (e.g. warning); same inner-shadow pill treatment as label-only. */
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
};

/**
 * Renders label text (optional icon + text) over a Skia inner-shadow pill; width follows content (measured on layout).
 */
const InnerShadowPill: React.FC<InnerShadowPillProps> = ({ label, icon, textStyle }) => {
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
      <View
        onLayout={onLayout}
        style={[styles.content, icon != null ? styles.contentWithIcon : null, { zIndex: 1 }]}
      >
        {icon != null ? <View style={styles.iconSlot}>{icon}</View> : null}
        <Text style={[styles.text, textStyle]} numberOfLines={1}>
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
  contentWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingLeft: 8,
    paddingRight: 10,
  },
  iconSlot: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_80,
  },
});

export default InnerShadowPill;
