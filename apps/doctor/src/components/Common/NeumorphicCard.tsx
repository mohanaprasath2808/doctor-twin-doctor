import React from "react";
import { Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../constants/theme";

type CornerRadii = {
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
};

type NeumorphicCardProps = {
  children: React.ReactNode;
  /** Outer wrapper style (width, margin, etc.) */
  outerStyle?: StyleProp<ViewStyle>;
  /** Inner surface style (padding, flexDirection, etc.) */
  innerStyle?: StyleProp<ViewStyle>;
  /** Default radius applied to all corners unless overridden individually. */
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  backgroundColor?: string;
  onPress?: () => void;
  activeOpacity?: number;
  /**
   * When false, border + inner surfaces use overflow visible so nested cards’
   * outer shadows are not clipped (default true).
   */
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
  NeumorphicCardProps,
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

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  outerStyle,
  innerStyle,
  borderRadius = DEFAULT_BORDER_RADIUS,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  backgroundColor = COLORS.SURFACE,
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

  return (
    <View style={[styles.outer, outerRadii, outerStyle]}>
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowDark, outerRadii, { backgroundColor }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowLight, outerRadii, { backgroundColor }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, outerRadii, { backgroundColor }]}
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
          style={[styles.inner, clipStyle, innerRadii, { backgroundColor }, innerStyle]}
        >
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
  inner: {},
});

export default NeumorphicCard;
