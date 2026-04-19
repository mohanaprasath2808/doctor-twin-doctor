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

import InnerShadowView from "../../neomorphism/InnerShadowView";
import { COLORS } from "../../constants/theme";

export type NeumorphicQuickActionTileProps = {
  onPress: () => void;
  icon: ReactNode;
  /** Primary line (name) when `subtitle` is set; otherwise single line. */
  label: string;
  /** Second line (e.g. “Overdue Labs”) — smaller, muted. */
  subtitle?: string;
  /** Numeric or short badge (e.g. unread count) */
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
  badgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
};

const NeumorphicQuickActionTile: React.FC<NeumorphicQuickActionTileProps> = ({
  onPress,
  icon,
  label,
  subtitle,
  badge,
  topRightAccessory,
  activeOpacity = 0.85,
  innerShadowColor = COLORS.SURFACE,
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
  const innerFaceRadius = Math.max(0, outerRadius - 1);

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
            colors={["#D6E3F3", "#FFFFFF"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={[styles.border, { borderRadius: outerRadius }]}
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
                <InnerShadowView
                  width={innerShadowDiameter}
                  height={innerShadowDiameter}
                  borderRadius={innerRadius}
                  color={innerShadowColor}
                />
              </View>
              <View style={styles.iconLayer} pointerEvents="none">
                {icon}
              </View>
            </View>
          </LinearGradient>
        </View>

        {topRightAccessory ? <View style={styles.accessorySlot}>{topRightAccessory}</View> : null}
        {badge ? (
          <View style={[styles.badge, badgeStyle]}>
            <Text style={[styles.badgeText, badgeTextStyle]}>{badge}</Text>
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
  border: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 1,
  },
  surface: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
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
  badge: {
    position: "absolute",
    right: 2,
    top: 1,
    width: 26,
    height: 26,
    paddingHorizontal: 4,
    borderRadius: 13,
    backgroundColor: COLORS.CRITICAL,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
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
    color: COLORS.TEXT_PRIMARY_70,
    textAlign: "center",
  },
});

export default NeumorphicQuickActionTile;