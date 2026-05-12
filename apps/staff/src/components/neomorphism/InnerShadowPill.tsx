import React, { useCallback, useState, type ReactNode } from "react";
import {
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import { COLORS } from "../../constants/theme";
import InnerShadowView from "./InnerShadowView";

export type InnerShadowPillTone = "default" | "warn" | "danger" | "neutral";

type InnerShadowPillProps = {
  label: string;
  /** Optional leading icon (e.g. warning); same inner-shadow pill treatment as label-only. */
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  /**
   * `default` — flat inner-surface fill (Scheduling tags).
   * `warn` | `danger` | `neutral` — soft pastel fill + inset shadow (eligibility mocks).
   */
  tone?: InnerShadowPillTone;
  /** Soft colored outer halo (e.g. eligibility list); keep off for Scheduling chips. */
  subtleOuterGlow?: boolean;
};

type ToneSurface = {
  gradientColors: readonly string[];
  gradientPositions?: readonly number[];
  textColor: string;
};

const TONE_SURFACES: Record<Exclude<InnerShadowPillTone, "default">, ToneSurface> = {
  warn: {
    gradientColors: ["#FFFDF7", "#FFF3D6"],
    textColor: "#D4A017",
  },
  danger: {
    gradientColors: ["#FFFBFB", "#FFE4E6"],
    textColor: "#DC2626",
  },
  neutral: {
    gradientColors: ["#F8FAFC", "#EEF2F6"],
    textColor: "#334155",
  },
};

const TONE_SUBTLE_OUTER_GLOW: Record<Exclude<InnerShadowPillTone, "default">, ViewStyle> = {
  warn: Platform.select({
    ios: {
      shadowColor: "#FBBF24",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.28,
      shadowRadius: 6,
    },
    android: { elevation: 2 },
    default: {},
  }) as ViewStyle,
  danger: Platform.select({
    ios: {
      shadowColor: "#FB7185",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 6,
    },
    android: { elevation: 2 },
    default: {},
  }) as ViewStyle,
  neutral: Platform.select({
    ios: {
      shadowColor: "#94A3B8",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 4,
    },
    android: { elevation: 1 },
    default: {},
  }) as ViewStyle,
};

/**
 * Renders label text (optional icon + text) over a Skia inner-shadow pill; width follows content (measured on layout).
 */
const InnerShadowPill: React.FC<InnerShadowPillProps> = ({
  label,
  icon,
  textStyle,
  tone = "default",
  subtleOuterGlow = false,
}) => {
  const [size, setSize] = useState({ w: 0, h: 28 });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ w: width, h: height });
  }, []);

  const surface = tone !== "default" ? TONE_SURFACES[tone] : null;
  const haloStyle =
    subtleOuterGlow && tone !== "default" ? TONE_SUBTLE_OUTER_GLOW[tone] : null;

  const pill = (
    <View style={styles.wrap}>
      {size.w > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <InnerShadowView
            width={size.w}
            height={size.h}
            borderRadius={size.h / 2}
            color={COLORS.INNER_SURFACE}
            gradientColors={surface?.gradientColors}
            gradientPositions={surface?.gradientPositions}
            {...(tone === "neutral"
              ? {
                  darkShadowBlur: 4,
                  darkShadowColor: "#94A3B855",
                }
              : tone !== "default"
                ? {
                    darkShadowBlur: 3,
                    darkShadowColor: "rgba(15, 23, 42, 0.08)",
                    lightShadowBlur: 2,
                    lightShadowColor: "rgba(255, 255, 255, 0.85)",
                  }
                : {})}
          />
        </View>
      )}
      <View
        onLayout={onLayout}
        style={[styles.content, icon != null ? styles.contentWithIcon : null, { zIndex: 1 }]}
      >
        {icon != null ? <View style={styles.iconSlot}>{icon}</View> : null}
        <Text
          style={[
            styles.text,
            surface != null ? { color: surface.textColor, fontWeight: "500" } : null,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </View>
  );

  if (haloStyle == null) {
    return pill;
  }

  return (
    <View style={[styles.pillHaloWrap, haloStyle]}>
      {pill}
    </View>
  );
};

const styles = StyleSheet.create({
  pillHaloWrap: {
    alignSelf: "flex-start",
    flexShrink: 0,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  wrap: {
    position: "relative",
    alignSelf: "flex-start",
    flexShrink: 0,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  contentWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingLeft: 10,
    paddingRight: 12,
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
