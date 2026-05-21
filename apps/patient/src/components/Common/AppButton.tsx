import React from "react";
import {
  DimensionValue,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";

type AppButtonProps = {
  borderWidth?: number;
  borderColor?: string;
  bgColor?: string;
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  text: string;
  leftIcon?: React.ReactNode;
  iconSize?: number;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  activeOpacity?: number;
  /** Flat mode: merged onto TouchableOpacity. Elevated: merged onto outer shadow wrapper. */
  shadowStyle?: StyleProp<ViewStyle>;
  useGradientBorder?: boolean;
  /**
   * Triple neumorphic drop shadow (Patient Figma): #C8CBCC (+4,+4 blur 20), #FFFFFF (-6,-6 blur 20),
   * #728EAB (+2,+2 blur 4 @ 10%). Same layering as `NeumorphicQuickActionTile`.
   * Doctor `AppButton` uses one lighter shadow only — unchanged.
   * Use `elevated={false}` inside nested neumorphic cards where halo should not show.
   */
  elevated?: boolean;
} & Omit<
  TouchableOpacityProps,
  "style" | "onPress" | "disabled" | "activeOpacity"
>;

/** Substrate for each RN shadow plane. */
const BUTTON_SHADOW_SURFACE = COLORS.SURFACE;

const neumorphicLayerBase: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: BUTTON_SHADOW_SURFACE,
};

const neumorphicShadowDark = Platform.select({
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
  default: {},
}) as ViewStyle;

const neumorphicShadowLight = Platform.select({
  ios: {
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  android: {
    boxShadow: "-6px -6px 20px 0px #FFFFFF",
  },
  default: {},
}) as ViewStyle;

const neumorphicShadowSoft = Platform.select({
  ios: {
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    boxShadow: "2px 2px 4px 0px rgba(114, 142, 171, 0.1)",
  },
  default: {},
}) as ViewStyle;

function NeumorphicShadowStack({ borderRadius }: { borderRadius: number }) {
  return (
    <>
      <View
        pointerEvents="none"
        style={[neumorphicLayerBase, neumorphicShadowDark, { borderRadius }]}
      />
      <View
        pointerEvents="none"
        style={[neumorphicLayerBase, neumorphicShadowLight, { borderRadius }]}
      />
      <View
        pointerEvents="none"
        style={[neumorphicLayerBase, neumorphicShadowSoft, { borderRadius }]}
      />
    </>
  );
}

const AppButton: React.FC<AppButtonProps> = ({
  borderWidth = 0,
  borderColor = "transparent",
  bgColor = "transparent",
  width = "100%",
  height = 48,
  borderRadius = 26,
  text,
  leftIcon,
  iconSize = 16,
  textStyle,
  onPress,
  style,
  disabled = false,
  activeOpacity = 0.8,
  shadowStyle,
  useGradientBorder = false,
  elevated = true,
  ...touchableProps
}) => {
  const resolvedBorderWidth = useGradientBorder
    ? Math.max(1, borderWidth || 1)
    : borderWidth;
  const resolvedBorderColor = useGradientBorder ? "transparent" : borderColor;

  const renderedIcon =
    leftIcon && React.isValidElement(leftIcon)
      ? React.cloneElement(leftIcon as React.ReactElement<{ width?: number; height?: number }>, {
          width: iconSize,
          height: iconSize,
        })
      : leftIcon;

  const gradientInset = Math.max(0, borderRadius - resolvedBorderWidth);

  const gradients = useGradientBorder ? (
    <>
      <LinearGradient
        colors={["rgba(214, 227, 243, 0.46)", "rgba(255, 255, 255, 0.46)"]}
        locations={[0.082, 0.8268]}
        start={{ x: 1, y: 0.465 }}
        end={{ x: 0, y: 0.535 }}
        style={[StyleSheet.absoluteFillObject, { borderRadius }]}
      />
      <LinearGradient
        colors={["#FFFFFF", "rgba(255, 255, 255, 0)"]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFillObject, { borderRadius }]}
      />
      <LinearGradient
        colors={["#303DA3", "#111747"]}
        locations={[0.1494, 0.8506]}
        start={{ x: 0, y: 0.488 }}
        end={{ x: 1, y: 0.512 }}
        style={[StyleSheet.absoluteFillObject, { borderRadius }]}
      />
      <View
        pointerEvents="none"
        style={[
          { borderRadius: gradientInset },
          {
            position: "absolute",
            top: resolvedBorderWidth,
            left: resolvedBorderWidth,
            right: resolvedBorderWidth,
            bottom: resolvedBorderWidth,
            backgroundColor: bgColor,
          },
        ]}
      />
    </>
  ) : null;

  const content = (
    <>
      {gradients}
      <View style={styles.contentRow}>
        {renderedIcon ? <View style={styles.iconWrap}>{renderedIcon}</View> : null}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </>
  );

  const faceStyle: StyleProp<ViewStyle> = [
    styles.base,
    {
      borderRadius,
      borderWidth: resolvedBorderWidth,
      borderColor: resolvedBorderColor,
      backgroundColor: useGradientBorder ? "transparent" : bgColor,
      opacity: disabled ? 0.65 : 1,
      width,
      height,
    },
    style,
  ];

  /** Prop defaults + `style` — used for elevated shell so fixed-size chips are not forced to 100%. */
  const layoutFlat = StyleSheet.flatten([{ width, height }, style]) as ViewStyle;
  const layoutWidth = layoutFlat.width ?? width;
  const layoutHeight = layoutFlat.height ?? height;

  if (!elevated) {
    return (
      <TouchableOpacity
        {...touchableProps}
        activeOpacity={activeOpacity}
        disabled={disabled}
        onPress={onPress}
        style={[faceStyle, shadowStyle]}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.shadowHost,
        { width: layoutWidth, height: layoutHeight, borderRadius },
        shadowStyle,
      ]}
    >
      {Platform.OS === "ios" ? <NeumorphicShadowStack borderRadius={borderRadius} /> : null}
      <TouchableOpacity
        {...touchableProps}
        activeOpacity={activeOpacity}
        disabled={disabled}
        onPress={onPress}
        style={[
          faceStyle,
          StyleSheet.absoluteFillObject,
          Platform.OS === "android" && styles.elevatedFaceAndroid,
        ]}
      >
        {content}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowHost: {
    position: "relative",
    overflow: "visible",
    backgroundColor: "transparent",
  },
  /** Android: opaque face + elevation (matches doctor `AppButton` `elevation: 3`). */
  elevatedFaceAndroid: {
    elevation: 3,
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppButton;
