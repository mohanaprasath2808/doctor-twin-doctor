import React, { ReactNode } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import InnerShadowView from "./InnerShadowView";
import { COLORS } from "../../constants/theme";

export type NeumorphicQuickActionTileProps = {
  onPress: () => void;
  icon: ReactNode;
  /** Primary line (name) when `subtitle` is set; otherwise single line. */
  label: string;
  /** Second line (e.g. “Overdue Labs”) — smaller, muted. */
  subtitle?: string;
  /**
   * Count / badge text. Rendered only when the value parses as an integer **> 0**
   * (e.g. `"3"`, `"99+"` → shown; `"0"`, empty, non-numeric → hidden).
   */
  badge?: string;
  /** Custom overlay at top-right of the circle (e.g. premium crown) */
  topRightAccessory?: ReactNode;
  activeOpacity?: number;
  /** Inner recessed Skia surface color */
  innerShadowColor?: string;
  /** Outer raised circle diameter */
  outerDiameter?: number;
  /** Inner shadow circle diameter */
  innerShadowDiameter?: number;
  innerShadowBorderRadius?: number;
  /** Outer container width (e.g. `"25%"` for grid columns) */
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /** `borderWidth` sets the gradient ring thickness on the badge and on the inner `InnerShadowView` when alert. */
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
};

/** Same border math as `StatusDot`: inner diameter + 2×borderWidth = outer; `padding` on `LinearGradient` = ring thickness. */
const BADGE_BORDER_WIDTH = 1;
const BADGE_INNER_DIAMETER = 20;
const BADGE_INNER_RADIUS = BADGE_INNER_DIAMETER / 2;

/** Badge UI only when `badge` parses to an integer count greater than zero. */
function resolveBadgeLabel(badge: string | undefined): string | undefined {
  if (badge == null || badge.trim() === "") return undefined;
  const n = parseInt(badge, 10);
  if (Number.isNaN(n) || n <= 0) return undefined;
  return badge;
}

function parseBadgeCount(badge: string | undefined): number | undefined {
  if (badge == null || badge.trim() === "") return undefined;
  const n = parseInt(badge, 10);
  return Number.isNaN(n) ? undefined : n;
}

/** Ring stroke for badge gradient + inner `InnerShadowView` gradient (padding); default matches badge. */
function resolveRingBorderWidth(badgeStyle: StyleProp<ViewStyle> | undefined): number {
  const flat = StyleSheet.flatten(badgeStyle) as ViewStyle | undefined;
  if (flat != null && typeof flat.borderWidth === "number" && flat.borderWidth >= 0) {
    return flat.borderWidth;
  }
  return BADGE_BORDER_WIDTH;
}

function omitBorderWidth(style: StyleProp<ViewStyle> | undefined): ViewStyle | undefined {
  const flat = StyleSheet.flatten(style) as ViewStyle | undefined;
  if (flat == null) return undefined;
  const { borderWidth: _b, ...rest } = flat;
  return rest;
}

/** Inner recessed face when `dataCount` / `badge` parses to a count > 0 (Figma). */
const ALERT_INNER_FACE = "#FDECEC";
const ALERT_INNER_SHADOW_DARK = "#F2CACA";
const ALERT_INNER_SHADOW_LIGHT = "#FFFFFF99";

/** Raised rim + inner well: gradient exists only in the stroke (`padding` ring); center is solid. */
const TILE_BORDER_WIDTH = 1;
const TILE_FACE_GRADIENT = ["#D6E3F3", "#FFFFFF"] as const;

/** `#D6E3F3` at `start`, `#FFFFFF` at `end` — white sits top-right (diagonal from bottom-left). */
const TILE_OUTER_GRADIENT_START = { x: 0, y: 1 };
const TILE_OUTER_GRADIENT_END = { x: 1, y: 0 };
/** Inner ring + badge: same diagonal. */
const INNER_RING_GRADIENT_START = { x: 0, y: 1 };
const INNER_RING_GRADIENT_END = { x: 1, y: 0 };

const NeumorphicQuickActionTile: React.FC<NeumorphicQuickActionTileProps> = ({
  onPress,
  icon,
  label,
  subtitle,
  badge,
  topRightAccessory,
  activeOpacity = 0.85,
  innerShadowColor = COLORS.INNER_SURFACE,
  outerDiameter = 88,
  innerShadowDiameter = 72,
  innerShadowBorderRadius,
  containerStyle,
  labelStyle,
  badgeStyle,
  badgeTextStyle,
}) => {
  const outerRadius = outerDiameter / 2;
  const innerRadius = innerShadowBorderRadius ?? Math.max(0, innerShadowDiameter / 2);
  const innerFaceRadius = Math.max(0, outerRadius - TILE_BORDER_WIDTH);
  const badgeLabel = resolveBadgeLabel(badge);
  const badgeCount = parseBadgeCount(badge);
  const isHighAlert = badgeCount != null && badgeCount > 0;

  const ringBorderWidth = resolveRingBorderWidth(badgeStyle);
  const badgeOuterSize = BADGE_INNER_DIAMETER + 2 * ringBorderWidth;
  const badgeOuterRadius = badgeOuterSize / 2;

  const innerShadowRingOuterSize = innerShadowDiameter + 2 * ringBorderWidth;
  const innerShadowRingOuterRadius = innerShadowRingOuterSize / 2;

  const alertInnerShadowExtra = isHighAlert
    ? {
        darkShadowDx: 4,
        darkShadowDy: 4,
        darkShadowBlur: 14,
        darkShadowColor: ALERT_INNER_SHADOW_DARK,
        lightShadowDx: -4,
        lightShadowDy: -4,
        lightShadowBlur: 9,
        lightShadowColor: ALERT_INNER_SHADOW_LIGHT,
      }
    : {};

  return (
    <TouchableOpacity
      style={[styles.root, containerStyle]}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <View
        style={[
          styles.tileHost,
          {
            width: outerDiameter,
            height: outerDiameter,
            borderRadius: outerRadius,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[styles.shadowLayer, styles.shadowDark, { borderRadius: outerRadius }]}
        />
        <View
          pointerEvents="none"
          style={[styles.shadowLayer, styles.shadowLight, { borderRadius: outerRadius }]}
        />
        <View
          pointerEvents="none"
          style={[styles.shadowLayer, styles.shadowSoft, { borderRadius: outerRadius }]}
        />

        <View style={[styles.faceStack, { borderRadius: outerRadius }]}>
          <LinearGradient
            colors={[...TILE_FACE_GRADIENT]}
            start={TILE_OUTER_GRADIENT_START}
            end={TILE_OUTER_GRADIENT_END}
            style={[
              styles.tileOuterBorderRing,
              { borderRadius: outerRadius, padding: TILE_BORDER_WIDTH },
            ]}
          >
            <View
              style={[
                styles.surface,
                {
                  borderRadius: innerFaceRadius,
                },
              ]}
            >
              <View style={styles.innerShadowSlot} pointerEvents="none">
                {isHighAlert ? (
                  <LinearGradient
                    colors={[...TILE_FACE_GRADIENT]}
                    start={INNER_RING_GRADIENT_START}
                    end={INNER_RING_GRADIENT_END}
                    style={[
                      styles.innerShadowBorderRing,
                      {
                        width: innerShadowRingOuterSize,
                        height: innerShadowRingOuterSize,
                        borderRadius: innerShadowRingOuterRadius,
                        padding: ringBorderWidth,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.innerShadowClip,
                        {
                          width: innerShadowDiameter,
                          height: innerShadowDiameter,
                          borderRadius: innerRadius,
                        },
                      ]}
                    >
                      <InnerShadowView
                        width={innerShadowDiameter}
                        height={innerShadowDiameter}
                        borderRadius={innerRadius}
                        color={ALERT_INNER_FACE}
                        {...alertInnerShadowExtra}
                      />
                    </View>
                  </LinearGradient>
                ) : (
                  <InnerShadowView
                    width={innerShadowDiameter}
                    height={innerShadowDiameter}
                    borderRadius={innerRadius}
                    color={innerShadowColor}
                  />
                )}
              </View>
              <View style={styles.iconLayer} pointerEvents="none">
                {icon}
              </View>
            </View>
          </LinearGradient>
        </View>

        {topRightAccessory ? <View style={styles.accessorySlot}>{topRightAccessory}</View> : null}
        {badgeLabel != null ? (
          <View
            style={[
              styles.badgeOuter,
              {
                width: badgeOuterSize,
                height: badgeOuterSize,
                borderRadius: badgeOuterRadius,
              },
              omitBorderWidth(badgeStyle),
            ]}
          >
            <View
              pointerEvents="none"
              style={[
                styles.badgeShadowLayer,
                styles.badgeShadowDark,
                { borderRadius: badgeOuterRadius },
              ]}
            />
            <View
              pointerEvents="none"
              style={[
                styles.badgeShadowLayer,
                styles.badgeShadowLight,
                { borderRadius: badgeOuterRadius },
              ]}
            />
            <View
              pointerEvents="none"
              style={[
                styles.badgeShadowLayer,
                styles.badgeShadowSoft,
                { borderRadius: badgeOuterRadius },
              ]}
            />
            <LinearGradient
              colors={[...TILE_FACE_GRADIENT]}
              start={INNER_RING_GRADIENT_START}
              end={INNER_RING_GRADIENT_END}
              style={[
                styles.badgeGradientBorder,
                {
                  borderRadius: badgeOuterRadius,
                  padding: ringBorderWidth,
                },
              ]}
            >
              <View
                style={[
                  styles.badgeInner,
                  {
                    width: BADGE_INNER_DIAMETER,
                    height: BADGE_INNER_DIAMETER,
                    borderRadius: BADGE_INNER_RADIUS,
                    backgroundColor: COLORS.ALERT,
                  },
                ]}
              >
                <Text style={[styles.badgeText, badgeTextStyle]}>{badgeLabel}</Text>
              </View>
            </LinearGradient>
          </View>
        ) : null}
      </View>
      {subtitle ? (
        <View style={styles.labelBlock}>
          <Text style={[styles.tileTitle, labelStyle]} numberOfLines={1}>
            {label}
          </Text>
          <Text style={styles.tileSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
      ) : (
        <Text style={[styles.tileLabel, labelStyle]} numberOfLines={2}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginBottom: 16,
    overflow: "visible",
    paddingHorizontal: 4,
    paddingTop: 2,
  },
  /** Matches `IconComponent` outer shell: shadows + raised face. */
  tileHost: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    backgroundColor: "transparent",
    marginBottom: 10,
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
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "4px 4px 20px 0px #C8CBCC",
        elevation: 0,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "-6px -6px 20px 0px #FFFFFF",
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        boxShadow: "2px 2px 4px 0px rgba(114, 142, 171, 0.1)",
      },
    }),
  },
  faceStack: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  /** Gradient paints only the ring; `padding` = stroke thickness. */
  tileOuterBorderRing: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  /** Inner well: same idea — only the 1px ring is gradient; `InnerShadowView` is the solid fill. */
  innerShadowBorderRing: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerShadowClip: {
    overflow: "hidden",
  },
  surface: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  innerShadowSlot: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLayer: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accessorySlot: {
    position: "absolute",
    right: -2,
    top: -2,
    zIndex: 4,
  },
  /** Matches `StatusDot` outer shell (shadows + gradient ring + inner face). */
  badgeOuter: {
    position: "absolute",
    right: 2,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    backgroundColor: "transparent",
    zIndex: 3,
  },
  badgeShadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  badgeShadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  badgeShadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
    }),
  },
  badgeShadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  badgeGradientBorder: {
    justifyContent: "center",
    alignItems: "center",
  },
  badgeInner: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontWeight: "400",
  },
  tileLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  labelBlock: {
    alignItems: "center",
    maxWidth: 110,
  },
  tileTitle: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  tileSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 13,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    textAlign: "center",
  },
});

export default NeumorphicQuickActionTile;
