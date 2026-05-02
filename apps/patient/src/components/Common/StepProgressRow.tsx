import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";
import NeumorphicInnerShadowCard from "../../neomorphism/NeumorphicInnerShadowCard";

type StepProgressRowProps = {
  totalSteps: number;
  currentStep: number;
  onStepPress?: (step: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  segmentGap?: number;
  segmentHeight?: number;
  segmentBorderRadius?: number;
  activeGradientColors?: [string, string];
  inactiveBackgroundColor?: string;
  activeShadowColor?: string;
  activeShadowOpacity?: number;
  activeShadowRadius?: number;
  activeShadowOffset?: { width: number; height: number };
  inactiveDarkShadowColor?: string;
  inactiveLightShadowColor?: string;
  inactiveDarkShadowDx?: number;
  inactiveDarkShadowDy?: number;
  inactiveDarkShadowBlur?: number;
  inactiveLightShadowDx?: number;
  inactiveLightShadowDy?: number;
  inactiveLightShadowBlur?: number;
};

const StepProgressRow = ({
  totalSteps,
  currentStep,
  onStepPress,
  containerStyle,
  segmentGap = 10,
  segmentHeight = 16,
  segmentBorderRadius = 8,
  activeGradientColors = ["#14B8D4", "#0E7490"],
  inactiveBackgroundColor = "#F7FBFF",
  activeShadowColor = "#C1D5EE",
  activeShadowOpacity = 0.3,
  activeShadowRadius = 4,
  activeShadowOffset = { width: 2, height: 2 },
  inactiveDarkShadowColor = COLORS.DARK_SHADOW,
  inactiveLightShadowColor = COLORS.LIGHT_SHADOW,
  inactiveDarkShadowDx = 4,
  inactiveDarkShadowDy = 4,
  inactiveDarkShadowBlur = 14,
  inactiveLightShadowDx = -4,
  inactiveLightShadowDy = -4,
  inactiveLightShadowBlur = 9,
}: StepProgressRowProps) => {
  const safeTotalSteps = Math.max(1, totalSteps);

  return (
    <View style={[styles.row, { gap: segmentGap }, containerStyle]}>
      {Array.from({ length: safeTotalSteps }, (_, index) => {
        const step = index + 1;
        const isFilled = step <= currentStep;
        const onPress = onStepPress ? () => onStepPress(step) : undefined;

        return (
          <Pressable key={step} onPress={onPress} style={styles.segmentWrap}>
            {isFilled ? (
              <LinearGradient
                colors={activeGradientColors}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.activeSegment,
                  {
                    height: segmentHeight,
                    borderRadius: segmentBorderRadius,
                    shadowColor: activeShadowColor,
                    shadowOpacity: activeShadowOpacity,
                    shadowRadius: activeShadowRadius,
                    shadowOffset: activeShadowOffset,
                  },
                ]}
              />
            ) : (
              <NeumorphicInnerShadowCard
                height={segmentHeight}
                borderRadius={segmentBorderRadius}
                backgroundColor={inactiveBackgroundColor}
                darkShadowDx={inactiveDarkShadowDx}
                darkShadowDy={inactiveDarkShadowDy}
                darkShadowBlur={inactiveDarkShadowBlur}
                darkShadowColor={inactiveDarkShadowColor}
                lightShadowDx={inactiveLightShadowDx}
                lightShadowDy={inactiveLightShadowDy}
                lightShadowBlur={inactiveLightShadowBlur}
                lightShadowColor={inactiveLightShadowColor}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default StepProgressRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  segmentWrap: {
    flex: 1,
  },
  activeSegment: {
    width: "100%",
  },
});
