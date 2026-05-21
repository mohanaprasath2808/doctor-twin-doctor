import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";
import NeumorphicInnerShadowCard from "../../neomorphism/NeumorphicInnerShadowCard";

type StepProgressRowProps = {
  totalSteps: number;
  currentStep: number;
  /** Segmented steps (default) or one bar with partial fill. */
  variant?: "segmented" | "continuous";
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
  variant = "segmented",
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
  const safeCurrentStep = Math.min(Math.max(1, currentStep), safeTotalSteps);
  const continuousFillStep = Math.min(Math.max(0, currentStep), safeTotalSteps);
  const fillRatio = continuousFillStep / safeTotalSteps;

  if (variant === "continuous") {
    return (
      <View
        style={[
          styles.continuousTrack,
          {
            height: segmentHeight,
            borderRadius: segmentBorderRadius,
          },
          containerStyle,
        ]}
      >
        <NeumorphicInnerShadowCard
          height={segmentHeight}
          borderRadius={segmentBorderRadius}
          containerStyle={styles.continuousTrackFill}
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
        <View style={styles.continuousFillWrap} pointerEvents="none">
          <LinearGradient
            colors={activeGradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              styles.continuousFill,
              {
                width: `${fillRatio * 100}%`,
                height: segmentHeight,
                borderRadius: segmentBorderRadius,
                shadowColor: activeShadowColor,
                shadowOpacity: activeShadowOpacity,
                shadowRadius: activeShadowRadius,
                shadowOffset: activeShadowOffset,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.row, { gap: segmentGap }, containerStyle]}>
      {Array.from({ length: safeTotalSteps }, (_, index) => {
        const step = index + 1;
        const isFilled = step <= safeCurrentStep;
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
  continuousTrack: {
    width: "100%",
    overflow: "hidden",
  },
  continuousTrackFill: {
    width: "100%",
  },
  continuousFillWrap: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  continuousFill: {
    minWidth: 0,
  },
});
