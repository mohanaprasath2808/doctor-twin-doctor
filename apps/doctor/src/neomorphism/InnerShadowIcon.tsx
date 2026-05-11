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
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../constants/theme";
import InnerShadowView from "./InnerShadowView";

interface InnerShadowIconProps {
  icon: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
  radius?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  /**
   * Inner shadow colors. `darkShadowColor` / `lightShadowColor` are kept as
   * aliases to match the naming used by other neumorphic components.
   */
  innerShadowColor?: string;
  innerLightShadowColor?: string;
  darkShadowColor?: string;
  lightShadowColor?: string;
  /** Outside drop-shadow colors. */
  shadowColor?: string;
  outerShadowColor?: string;
  outerDarkShadowColor?: string;
  outerLightShadowColor?: string;
  outerSoftShadowColor?: string;
}

const DEFAULT_SURFACE_COLOR = COLORS.SURFACE;
const DEFAULT_INNER_DARK_SHADOW_COLOR = "#C8CBCC99";
const DEFAULT_INNER_LIGHT_SHADOW_COLOR = "#FFFFFFCC";
const DEFAULT_OUTER_DARK_SHADOW_COLOR = "#C8CBCC";
const DEFAULT_OUTER_LIGHT_SHADOW_COLOR = "#FFFFFF";
const DEFAULT_OUTER_SOFT_SHADOW_COLOR = "#728EAB";

const InnerShadowIcon: React.FC<InnerShadowIconProps> = ({
  icon,
  onPress,
  size = 54,
  radius,
  disabled = false,
  style,
  backgroundColor = DEFAULT_SURFACE_COLOR,
  innerShadowColor,
  innerLightShadowColor,
  darkShadowColor,
  lightShadowColor,
  shadowColor,
  outerShadowColor,
  outerDarkShadowColor,
  outerLightShadowColor,
  outerSoftShadowColor,
}) => {
  const borderRadius = radius ?? size / 2;
  const innerRadius = Math.max(0, borderRadius - 1);
  const resolvedInnerDarkShadowColor =
    darkShadowColor ?? innerShadowColor ?? DEFAULT_INNER_DARK_SHADOW_COLOR;
  const resolvedInnerLightShadowColor =
    lightShadowColor ?? innerLightShadowColor ?? DEFAULT_INNER_LIGHT_SHADOW_COLOR;
  const resolvedOuterDarkShadowColor =
    outerDarkShadowColor ?? outerShadowColor ?? shadowColor ?? DEFAULT_OUTER_DARK_SHADOW_COLOR;
  const resolvedOuterLightShadowColor =
    outerLightShadowColor ?? DEFAULT_OUTER_LIGHT_SHADOW_COLOR;
  const resolvedOuterSoftShadowColor =
    outerSoftShadowColor ?? DEFAULT_OUTER_SOFT_SHADOW_COLOR;

  return (
    <View
      style={[styles.cell, { width: size, height: size, borderRadius }, style]}
      collapsable={false}
    >
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowDark,
          styles.shadowDarkFocused,
          {
            borderRadius,
            backgroundColor,
            shadowColor: resolvedOuterDarkShadowColor,
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowLight,
          styles.shadowLightFocused,
          {
            borderRadius,
            backgroundColor,
            shadowColor: resolvedOuterLightShadowColor,
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowSoft,
          {
            borderRadius,
            backgroundColor,
            shadowColor: resolvedOuterSoftShadowColor,
          },
        ]}
      />

      <View style={[styles.border, { borderRadius }]}>
        <LinearGradient
          colors={["rgba(214, 227, 243, 0.46)", "rgba(255, 255, 255, 0.46)"]}
          locations={[0.082, 0.8268]}
          start={{ x: 1, y: 0.465 }}
          end={{ x: 0, y: 0.535 }}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={["#FFFFFF", "rgba(255, 255, 255, 0)"]}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={[styles.surface, { borderRadius: innerRadius }]}>
          <View
            pointerEvents="none"
            style={[
              styles.innerShadowWrapper,
              { width: size, height: size, borderRadius },
            ]}
          >
            <InnerShadowView
              width={size}
              height={size}
              borderRadius={borderRadius}
              color={backgroundColor}
              darkShadowColor={resolvedInnerDarkShadowColor}
              lightShadowColor={resolvedInnerLightShadowColor}
            />
          </View>
          {onPress ? (
            <Pressable
              disabled={disabled}
              onPress={onPress}
              style={({ pressed }) => [
                styles.hitTarget,
                pressed ? styles.hitPressed : null,
              ]}
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
    padding: 0.8,
    overflow: "hidden",
  },
  surface: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  innerShadowWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
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

export default InnerShadowIcon;
