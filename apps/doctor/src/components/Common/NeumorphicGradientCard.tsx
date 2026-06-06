import React from "react";
import { Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const PRIMARY_GRADIENT = {
  colors: ["#303DA3", "#111747"] as const,
  locations: [0.1494, 0.8506] as const,
  start: { x: 0, y: 0.488 },
  end: { x: 1, y: 0.512 },
};

type CornerRadii = {
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
};

type NeumorphicGradientCardProps = {
  children: React.ReactNode;
  outerStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  colors?: readonly string[];
  locations?: readonly number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  /** Base color for shadow layers; defaults to the last gradient stop. */
  shadowBaseColor?: string;
  onPress?: () => void;
  activeOpacity?: number;
  clipInner?: boolean;
};

const DEFAULT_BORDER_RADIUS = 14;
const INNER_RADIUS_INSET = 1;

function resolveCornerRadii({
  borderRadius = DEFAULT_BORDER_RADIUS,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
}: Pick<
  NeumorphicGradientCardProps,
  | "borderRadius"
  | "borderTopLeftRadius"
  | "borderTopRightRadius"
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius"
>): Required<CornerRadii> {
  return {
    borderTopLeftRadius: borderTopLeftRadius ?? borderRadius,
    borderTopRightRadius: borderTopRightRadius ?? borderRadius,
    borderBottomLeftRadius: borderBottomLeftRadius ?? borderRadius,
    borderBottomRightRadius: borderBottomRightRadius ?? borderRadius,
  };
}

function insetCornerRadii(radii: Required<CornerRadii>, inset: number): Required<CornerRadii> {
  return {
    borderTopLeftRadius: Math.max(0, radii.borderTopLeftRadius - inset),
    borderTopRightRadius: Math.max(0, radii.borderTopRightRadius - inset),
    borderBottomLeftRadius: Math.max(0, radii.borderBottomLeftRadius - inset),
    borderBottomRightRadius: Math.max(0, radii.borderBottomRightRadius - inset),
  };
}

const NeumorphicGradientCard: React.FC<NeumorphicGradientCardProps> = ({
  children,
  outerStyle,
  innerStyle,
  borderRadius = DEFAULT_BORDER_RADIUS,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  colors = PRIMARY_GRADIENT.colors,
  locations = PRIMARY_GRADIENT.locations,
  start = PRIMARY_GRADIENT.start,
  end = PRIMARY_GRADIENT.end,
  shadowBaseColor,
  onPress,
  activeOpacity = 0.85,
  clipInner = true,
}) => {
  const Surface: React.ElementType = onPress ? TouchableOpacity : View;
  const surfaceProps = onPress ? { activeOpacity, onPress } : undefined;
  const outerRadii = resolveCornerRadii({
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  });
  const innerRadii = insetCornerRadii(outerRadii, INNER_RADIUS_INSET);
  const clipStyle = clipInner ? styles.clipHidden : styles.clipVisible;
  const shadowColor = shadowBaseColor ?? colors[colors.length - 1];

  return (
    <View style={[styles.outer, outerRadii, outerStyle]}>
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowDark, outerRadii, { backgroundColor: shadowColor }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowLight, outerRadii, { backgroundColor: shadowColor }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, outerRadii, { backgroundColor: shadowColor }]}
      />
      <View style={[styles.border, clipStyle, outerRadii]}>
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
        <Surface
          {...(surfaceProps as any)}
          style={[styles.inner, clipStyle, innerRadii, innerStyle]}
        >
          <LinearGradient
            colors={[...colors]}
            locations={locations ? [...locations] : undefined}
            start={start}
            end={end}
            style={StyleSheet.absoluteFillObject}
          />
          {children}
        </Surface>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: "relative",
    overflow: "visible",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  border: {
    zIndex: 1,
    padding: 1,
  },
  clipHidden: {
    overflow: "hidden",
  },
  clipVisible: {
    overflow: "visible",
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
    }),
  },
  inner: {
    position: "relative",
  },
});

export default NeumorphicGradientCard;
