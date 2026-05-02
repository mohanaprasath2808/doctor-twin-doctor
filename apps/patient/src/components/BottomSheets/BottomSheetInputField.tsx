import React, { useState } from "react";
import {
  View,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import { COLORS } from "../../constants/theme";

type ShellProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  height?: number;
  minHeight?: number;
};

type Props = ShellProps & TextInputProps;

const HEIGHT = 46;
const RADIUS = 64;
const INNER_SHADOW_DY = 4;
const INNER_SHADOW_BLUR = 5;

/**
 * Same neumorphic chrome as {@link ../../neomorphism/InputField} but uses
 * `BottomSheetTextInput` so the keyboard interacts correctly inside `@gorhom/bottom-sheet`.
 */
const BottomSheetInputField = React.forwardRef(function BottomSheetInputField(
  props: Props,
  forwardedRef: React.ForwardedRef<TextInput>,
) {
  const {
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    borderRadius,
    height: heightProp,
    minHeight,
    style,
    ...rest
  } = props;

  const radius = borderRadius ?? RADIUS;
  const fieldHeight = heightProp ?? minHeight ?? HEIGHT;
  const [focused, setFocused] = useState(false);
  const [surfaceWidth, setSurfaceWidth] = useState(0);

  const valueText = String(rest.value ?? rest.defaultValue ?? "");
  const hasText = valueText.trim().length > 0;
  const showFocusedState = focused || hasText;

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        collapsable={false}
        style={[
          styles.outerPill,
          { borderRadius: radius },
          !showFocusedState && styles.outerPillIdle,
        ]}
      >
        <LinearGradient
          colors={
            showFocusedState
              ? ["#D6E3F399", "#FFFFFFCC", "#FFFFFF80", "#FFFFFF00"]
              : ["#E8EDF266", "#FFFFFFEE", COLORS.INNER_SURFACE, COLORS.INNER_SURFACE]
          }
          locations={showFocusedState ? [0, 0.4, 0.7, 1] : [0, 0.35, 0.72, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientBorder, { borderRadius: radius }]}
        >
          <View style={[styles.innerWrapper, { borderRadius: radius }]}>
            {showFocusedState ? (
              <>
                <View
                  pointerEvents="none"
                  style={[
                    styles.shadowLayer,
                    styles.shadowDark,
                    { borderRadius: radius },
                    styles.shadowDarkFocused,
                  ]}
                />
                <View
                  pointerEvents="none"
                  style={[
                    styles.shadowLayer,
                    styles.shadowLight,
                    { borderRadius: radius },
                    styles.shadowLightFocused,
                  ]}
                />
                <View
                  pointerEvents="none"
                  style={[styles.shadowLayer, styles.shadowSoft, { borderRadius: radius }]}
                />
              </>
            ) : null}

            <View
              style={[
                styles.surface,
                {
                  borderRadius: radius,
                  backgroundColor: showFocusedState ? COLORS.BACKGROUND : COLORS.INNER_SURFACE,
                },
              ]}
              onLayout={(e) => setSurfaceWidth(e.nativeEvent.layout.width)}
            >
              {showFocusedState && surfaceWidth > 0 && (
                <View
                  pointerEvents="none"
                  style={[
                    styles.shadowWrapper,
                    { height: fieldHeight, borderRadius: radius },
                  ]}
                >
                  <InnerShadowView
                    width={surfaceWidth}
                    height={fieldHeight}
                    borderRadius={radius}
                    color="#FFFFFF"
                    darkShadowDy={INNER_SHADOW_DY}
                    darkShadowBlur={INNER_SHADOW_BLUR}
                    lightShadowDy={-INNER_SHADOW_DY}
                    lightShadowBlur={INNER_SHADOW_BLUR}
                  />
                </View>
              )}

              <View
                style={[
                  styles.inputWrapper,
                  {
                    borderRadius: radius,
                    minHeight: fieldHeight,
                    height: fieldHeight,
                  },
                ]}
              >
                {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

                <BottomSheetTextInput
                  {...rest}
                  ref={forwardedRef as any}
                  style={[styles.input, hasText ? styles.inputTyped : styles.inputPlaceholder, style]}
                  placeholderTextColor={rest.placeholderTextColor ?? COLORS.TEXT_40}
                  allowFontScaling={false}
                  onFocus={(e) => {
                    setFocused(true);
                    rest.onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    setFocused(false);
                    rest.onBlur?.(e);
                  }}
                />

                {rightIcon ? (
                  <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
                    {rightIcon}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

BottomSheetInputField.displayName = "BottomSheetInputField";

export default BottomSheetInputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 0,
  },
  outerPill: {
    width: "100%",
    overflow: "visible",
  },
  outerPillIdle: {
    backgroundColor: COLORS.INNER_SURFACE,
    ...Platform.select({
      ios: {
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gradientBorder: {
    borderRadius: RADIUS,
    width: "100%",
    padding: 0.6,
    overflow: "hidden",
  },
  innerWrapper: {
    overflow: "visible",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FAFAFA",
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  shadowDarkFocused: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  shadowLightFocused: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.45,
        shadowRadius: 6,
      },
    }),
  },
  surface: {
    borderRadius: RADIUS,
    overflow: "hidden",
  },
  shadowWrapper: {
    position: "absolute",
    width: "100%",
    height: HEIGHT,
    borderRadius: RADIUS,
  },
  inputWrapper: {
    height: HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 1,
    borderRadius: RADIUS,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  inputPlaceholder: {
    fontWeight: "400",
  },
  inputTyped: {
    fontWeight: "500",
  },
  leftIcon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
