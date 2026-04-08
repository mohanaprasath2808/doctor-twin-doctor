import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type AppButtonProps = {
  borderWidth?: number;
  borderColor?: string;
  bgColor?: string;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  activeOpacity?: number;
  shadowStyle?: StyleProp<ViewStyle>;
} & Omit<TouchableOpacityProps, "style" | "onPress" | "disabled" | "activeOpacity">;

const AppButton: React.FC<AppButtonProps> = ({
  borderWidth = 0,
  borderColor = "transparent",
  bgColor = "transparent",
  text,
  textStyle,
  onPress,
  style,
  disabled = false,
  activeOpacity = 0.8,
  shadowStyle,
  ...touchableProps
}) => {
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
        { borderWidth, borderColor, backgroundColor: bgColor, opacity: disabled ? 0.65 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 26,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
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
});

export default AppButton;

