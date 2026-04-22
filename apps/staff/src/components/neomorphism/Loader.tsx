import React, { useEffect, useState } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "../../constants/theme";
import NeumorphicInnerShadowCard from "./NeumorphicInnerShadowCard";

export type LoaderProps = {
  visible: boolean;
};

const DISH_OUTER = 54;
const DISH_INNER_H = 52;
const DISH_RADIUS = DISH_OUTER / 2;
const RING = 28;
const RING_BORDER = 2.5;

const BG_MS = 280;
const BG_OUT_MS = 240;
/** Max opacity for dark scrim (lower than light overlays so it doesn’t read as a solid wall). */
const BG_PEAK = 0.72;

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  const spin = useSharedValue(0);
  /** Stays true until backdrop fade-out finishes so reopen + exit animation both work. */
  const [mounted, setMounted] = useState(() => visible);
  const bgOpacity = useSharedValue(0);

  const shouldRender = visible || mounted;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      bgOpacity.value = withTiming(BG_PEAK, {
        duration: BG_MS,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      bgOpacity.value = withTiming(
        0,
        {
          duration: BG_OUT_MS,
          easing: Easing.in(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(setMounted)(false);
          }
        },
      );
    }
  }, [visible, bgOpacity]);

  useEffect(() => {
    if (!visible) {
      cancelAnimation(spin);
      spin.value = 0;
      return;
    }
    spin.value = withRepeat(withTiming(360, { duration: 1100, easing: Easing.linear }), -1, false);
  }, [visible, spin]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  const scrimAnimStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  const dishAnimStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
    transform: [
      {
        scale: interpolate(bgOpacity.value, [0, BG_PEAK], [0.94, 1]),
      },
    ],
  }));

  if (!shouldRender) {
    return null;
  }

  return (
    <Modal animationType="none" transparent visible statusBarTranslucent>
      <View style={styles.modalRoot} pointerEvents="box-none">
        <Animated.View style={[styles.scrim, scrimAnimStyle]}>
          <Animated.View style={dishAnimStyle}>
            <NeumorphicInnerShadowCard
              fullWidth={false}
              height={DISH_INNER_H}
              borderRadius={DISH_RADIUS}
              backgroundColor={COLORS.INNER_SURFACE}
              darkShadowBlur={10}
              darkShadowColor="#D4D4D8"
              lightShadowBlur={8}
              lightShadowColor="rgba(255, 255, 255, 0.75)"
              containerStyle={styles.dish}
              contentStyle={styles.dishContent}
            >
              <Animated.View style={[styles.spinWrap, spinStyle]}>
                <View style={styles.ring} />
              </Animated.View>
            </NeumorphicInnerShadowCard>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    width: "100%",
  },
  scrim: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(247, 251, 255)",
  },
  dish: {
    width: DISH_OUTER,
    height: DISH_OUTER,
    alignSelf: "center",
  },
  dishContent: {
    minHeight: DISH_INNER_H,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  spinWrap: {
    width: RING + 6,
    height: RING + 6,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    borderWidth: RING_BORDER,
    borderColor: "rgba(148, 163, 184, 0.35)",
    borderTopColor: COLORS.PRIMARY,
    borderRightColor: "#7DC9A0",
    ...Platform.select({
      ios: {
        shadowColor: COLORS.PRIMARY,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      },
      android: {},
      default: {},
    }),
  },
});
