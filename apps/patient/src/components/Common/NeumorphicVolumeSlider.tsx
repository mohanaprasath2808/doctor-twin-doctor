import React, { useCallback, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import StepProgressRow from "./StepProgressRow";
import StatusDot from "./StatusDot";
import { COLORS } from "../../constants/theme";

export type NeumorphicVolumeSliderProps = {
  /** 0–100 */
  value: number;
  onChange: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  trackHeight?: number;
  thumbSize?: number;
};

const NeumorphicVolumeSlider = ({
  value,
  onChange,
  containerStyle,
  trackHeight = 12,
  thumbSize = 28,
}: NeumorphicVolumeSliderProps) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const clampedValue = Math.min(100, Math.max(0, value));

  const onTrackLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  const valueFromX = useCallback(
    (locationX: number) => {
      if (trackWidth <= 0) return;
      const ratio = Math.min(1, Math.max(0, locationX / trackWidth));
      onChange(Math.round(ratio * 100));
    },
    [onChange, trackWidth],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => valueFromX(event.nativeEvent.locationX),
        onPanResponderMove: (event) => valueFromX(event.nativeEvent.locationX),
      }),
    [valueFromX],
  );

  const thumbOffset = trackWidth > 0 ? (clampedValue / 100) * trackWidth - thumbSize / 2 : 0;

  return (
    <View style={[styles.wrap, containerStyle]} onLayout={onTrackLayout} {...panResponder.panHandlers}>
      <StepProgressRow
        variant="continuous"
        totalSteps={100}
        currentStep={clampedValue}
        segmentHeight={trackHeight}
        segmentBorderRadius={trackHeight}
        activeGradientColors={["#14B8D4", "#0E7490"]}
        inactiveBackgroundColor="#F7FBFF"
        activeShadowColor="#C1D5EE"
        activeShadowOpacity={0.3}
        activeShadowRadius={4}
        activeShadowOffset={{ width: 2, height: 2 }}
        inactiveDarkShadowColor="#C8CBCC"
        inactiveLightShadowColor={COLORS.LIGHT_SHADOW}
        inactiveDarkShadowDx={2}
        inactiveDarkShadowDy={2}
        inactiveDarkShadowBlur={6}
        inactiveLightShadowDx={-2}
        inactiveLightShadowDy={-2}
        inactiveLightShadowBlur={6}
        containerStyle={styles.track}
      />
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            left: Math.min(Math.max(0, thumbOffset), Math.max(0, trackWidth - thumbSize)),
          },
        ]}
      >
        <StatusDot color={COLORS.PRIMARY} size={thumbSize - 4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    justifyContent: "center",
    minHeight: 28,
  },
  track: {
    width: "100%",
  },
  thumb: {
    position: "absolute",
    top: "50%",
    marginTop: -14,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NeumorphicVolumeSlider;
