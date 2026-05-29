import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "../../constants/theme";
import NeumorphicInnerShadowCard from "../neomorphism/NeumorphicInnerShadowCard";
import StatusDot from "./StatusDot";

export const NEUMORPHIC_SWITCH_DEFAULT_COLORS = {
  trackBackgroundColor: "#FFFFFF",
  darkShadowColor: "#C8CBCC",
  lightShadowColor: "#FFFFFFCC",
  thumbOnColor: COLORS.PRIMARY,
  thumbOffColor: COLORS.WHITE,
  thumbOuterGradientColors: ["#D6E3F3", "#FFFFFF"] as [string, string],
};

export type NeumorphicSwitchColors = {
  trackBackgroundColor?: string;
  darkShadowColor?: string;
  lightShadowColor?: string;
  thumbOnColor?: string;
  thumbOffColor?: string;
  thumbOuterGradientColors?: [string, string];
};

type NeumorphicSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
} & NeumorphicSwitchColors;

const NeumorphicSwitch: React.FC<NeumorphicSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  trackBackgroundColor = NEUMORPHIC_SWITCH_DEFAULT_COLORS.trackBackgroundColor,
  darkShadowColor = NEUMORPHIC_SWITCH_DEFAULT_COLORS.darkShadowColor,
  lightShadowColor = NEUMORPHIC_SWITCH_DEFAULT_COLORS.lightShadowColor,
  thumbOnColor = NEUMORPHIC_SWITCH_DEFAULT_COLORS.thumbOnColor,
  thumbOffColor = NEUMORPHIC_SWITCH_DEFAULT_COLORS.thumbOffColor,
  thumbOuterGradientColors = NEUMORPHIC_SWITCH_DEFAULT_COLORS.thumbOuterGradientColors,
}) => {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.switchWrap, disabled && styles.disabled]}
    >
      <NeumorphicInnerShadowCard
        height={28}
        borderRadius={999}
        backgroundColor={trackBackgroundColor}
        containerStyle={styles.track}
        contentStyle={styles.trackContent}
        darkShadowDx={4}
        darkShadowDy={4}
        darkShadowBlur={12}
        darkShadowColor={darkShadowColor}
        lightShadowDx={-4}
        lightShadowDy={-4}
        lightShadowBlur={9}
        lightShadowColor={lightShadowColor}
      >
        <View style={[styles.thumbWrap, value ? styles.thumbRight : styles.thumbLeft]}>
          <StatusDot
            color={value ? thumbOnColor : thumbOffColor}
            size={24}
            outerGradientColors={thumbOuterGradientColors}
          />
        </View>
      </NeumorphicInnerShadowCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchWrap: {
    width: 52,
    height: 28,
  },
  track: {
    width: "100%",
  },
  trackContent: {
    minHeight: 28,
    paddingHorizontal: 2,
    justifyContent: "center",
  },
  thumbWrap: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbLeft: {
    alignSelf: "flex-start",
  },
  thumbRight: {
    alignSelf: "flex-end",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default NeumorphicSwitch;
