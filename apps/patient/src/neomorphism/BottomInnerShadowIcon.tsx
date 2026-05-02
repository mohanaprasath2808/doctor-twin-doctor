import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/theme";
import InnerShadowView from "./InnerShadowView";

type InnerShadowViewPartialProps = Partial<{
  width: number;
  height: number;
  borderRadius: number;
  color: string;
  darkShadowDx: number;
  darkShadowDy: number;
  darkShadowBlur: number;
  darkShadowColor: string;
  lightShadowDx: number;
  lightShadowDy: number;
  lightShadowBlur: number;
  lightShadowColor: string;
}>;

export type BorderRingGradient = {
  colors: [string, string];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

/** Bottom tab active chip: Figma gradient ring + Skia inner shadows. */
export interface BottomInnerShadowIconProps {
  icon: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
  radius?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  surfaceColor?: string;
  borderWidth?: number;
  borderRingGradient: BorderRingGradient;
  borderRingHighlight?: BorderRingGradient;
  innerShadowProps?: InnerShadowViewPartialProps;
}

const BottomInnerShadowIcon: React.FC<BottomInnerShadowIconProps> = ({
  icon,
  onPress,
  size = 54,
  radius,
  disabled = false,
  style,
  surfaceColor = COLORS.SURFACE,
  borderWidth: borderWidthProp = 1,
  borderRingGradient,
  borderRingHighlight,
  innerShadowProps,
}) => {
  const maxR = size / 2;
  const borderRadius = Math.max(0, Math.min(radius ?? maxR, maxR));
  const borderPad = borderWidthProp;
  const innerW = Math.max(0, size - 2 * borderPad);
  const innerH = Math.max(0, size - 2 * borderPad);
  const innerR = Math.max(0, Math.min(borderRadius - borderPad, innerW / 2, innerH / 2));

  return (
    <View
      style={[styles.cell, { width: size, height: size, borderRadius }, style]}
      collapsable={false}
    >
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowDark, styles.shadowDarkFocused, { borderRadius }]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowLight,
          styles.shadowLightFocused,
          { borderRadius },
        ]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, { borderRadius }]}
      />

      <View style={[styles.border, { borderRadius, padding: borderPad }]}>
        <LinearGradient
          colors={borderRingGradient.colors}
          start={borderRingGradient.start}
          end={borderRingGradient.end}
          style={StyleSheet.absoluteFillObject}
        />
        {borderRingHighlight != null ? (
          <LinearGradient
            colors={borderRingHighlight.colors}
            start={borderRingHighlight.start}
            end={borderRingHighlight.end}
            style={StyleSheet.absoluteFillObject}
          />
        ) : null}
        <View style={[styles.surface, { borderRadius: innerR }]}>
          <View
            pointerEvents="none"
            style={[styles.innerShadowCenter, { borderRadius: innerR }]}
          >
            <InnerShadowView
              width={innerShadowProps?.width ?? innerW}
              height={innerShadowProps?.height ?? innerH}
              borderRadius={innerShadowProps?.borderRadius ?? innerR}
              color={innerShadowProps?.color ?? surfaceColor}
              darkShadowDx={innerShadowProps?.darkShadowDx ?? 4}
              darkShadowDy={innerShadowProps?.darkShadowDy ?? -4}
              darkShadowBlur={innerShadowProps?.darkShadowBlur ?? 14}
              darkShadowColor={innerShadowProps?.darkShadowColor ?? "#34718D"}
              lightShadowDx={innerShadowProps?.lightShadowDx ?? -4}
              lightShadowDy={innerShadowProps?.lightShadowDy ?? 4}
              lightShadowBlur={innerShadowProps?.lightShadowBlur ?? 9}
              lightShadowColor={innerShadowProps?.lightShadowColor ?? "rgba(255, 255, 255, 0.6)"}
            />
          </View>
          {onPress ? (
            <Pressable
              disabled={disabled}
              onPress={onPress}
              style={({ pressed }) => [styles.hitTarget, pressed ? styles.hitPressed : null]}
            >
              <View style={styles.iconContainer} pointerEvents="box-none">
                {icon}
              </View>
            </Pressable>
          ) : (
            <View style={styles.hitTarget} pointerEvents="box-none">
              <View style={styles.iconContainer} pointerEvents="box-none">
                {icon}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.SURFACE,
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  shadowDarkFocused: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  shadowLightFocused: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.45,
        shadowRadius: 6,
      },
    }),
  },
  border: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  surface: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  innerShadowCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  hitTarget: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  hitPressed: {
    opacity: 0.85,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomInnerShadowIcon;
