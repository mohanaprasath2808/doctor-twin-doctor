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
  shadowStyle?: StyleProp<ViewStyle>;
  useGradientBorder?: boolean;
} & Omit<TouchableOpacityProps, "style" | "onPress" | "disabled" | "activeOpacity">;

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
  ...touchableProps
}) => {
  const resolvedBorderWidth = useGradientBorder ? Math.max(1, borderWidth || 1) : borderWidth;
  const resolvedBorderColor = useGradientBorder ? "transparent" : borderColor;
  const renderedIcon =
    leftIcon && React.isValidElement(leftIcon)
      ? React.cloneElement(leftIcon as React.ReactElement<{ width?: number; height?: number }>, {
          width: iconSize,
          height: iconSize,
        })
      : leftIcon;

  return (
    <TouchableOpacity
      {...touchableProps}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        styles.shadow,
        shadowStyle,
        {
          width,
          height,
          borderRadius,
          borderWidth: resolvedBorderWidth,
          borderColor: resolvedBorderColor,
          backgroundColor: useGradientBorder ? "transparent" : bgColor,
          opacity: disabled ? 0.65 : 1,
        },
        style,
      ]}
    >
      {useGradientBorder ? (
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
              { borderRadius: Math.max(0, borderRadius - resolvedBorderWidth) },
              {
                top: resolvedBorderWidth,
                left: resolvedBorderWidth,
                right: resolvedBorderWidth,
                bottom: resolvedBorderWidth,
                backgroundColor: bgColor,
              },
            ]}
          />
        </>
      ) : null}
      <View style={styles.contentRow}>
        {renderedIcon ? <View style={styles.iconWrap}>{renderedIcon}</View> : null}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  shadow: Platform.select({
    ios: {
      shadowColor: "#A0B4C8",
      shadowOffset: { width: 3, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
    },
    android: {
      elevation: 3,
    },
    default: {},
  }) as ViewStyle,
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
