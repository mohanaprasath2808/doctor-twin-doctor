import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  Platform,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InnerShadowView from "./InnerShadowView";
import { COLORS } from "../../constants/theme";

interface Props {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  /** Fixed row height for single-line fields. Takes precedence over `minHeight`. */
  height?: number;
  minHeight?: number;
  isFocused?: boolean;
}

const HEIGHT = 46;
const RADIUS = 64;

/** Stronger vertical inner shadow (Skia dy/blur), without changing input row height. */
const INNER_SHADOW_DY = 4;
const INNER_SHADOW_BLUR = 5;

const InputField: React.FC<Props & TextInputProps> = ({
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  borderRadius,
  height: heightProp,
  minHeight,
  isFocused,
  style,
  ...props
}) => {
  const radius = borderRadius ?? RADIUS;
  const fieldHeight = heightProp ?? minHeight ?? HEIGHT;
  const [focused, setFocused] = useState(false);
  const [surfaceWidth, setSurfaceWidth] = useState(0);
  const [inputHeight, setInputHeight] = useState(fieldHeight);
  const valueText = String(props.value ?? props.defaultValue ?? "");
  const hasText = valueText.trim().length > 0;
  const isFocusControlled = typeof isFocused === "boolean";
  const showFocusedState = isFocusControlled ? isFocused : focused || hasText;

  const resolvedShadowHeight = Math.max(fieldHeight, inputHeight);
  const iosContinuousCurve = Platform.OS === "ios" ? ({ borderCurve: "continuous" } as const) : null;
  // iOS shadows can render "squared" corners when borderRadius is larger than half the view height.
  // Clamp to a pill radius so the shadow path is consistent on both ends.
  const cornerRadius = Math.min(radius, resolvedShadowHeight / 2);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.shadowDarkWrap,
          { borderRadius: cornerRadius },
          iosContinuousCurve,
          showFocusedState && styles.shadowDarkWrapFocused,
        ]}
      >
        <View
          style={[
            styles.shadowLightWrap,
            { borderRadius: cornerRadius },
            iosContinuousCurve,
            showFocusedState && styles.shadowLightWrapFocused,
          ]}
        >
          <LinearGradient
            colors={["#D6E3F399", "#FFFFFFCC", "#FFFFFF80", "#FFFFFF00"]}
            locations={[0, 0.4, 0.7, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientBorder, { borderRadius: cornerRadius }, iosContinuousCurve]}
          >
            <View
              style={[styles.surface, { borderRadius: cornerRadius }, iosContinuousCurve]}
              onLayout={(e) => setSurfaceWidth(e.nativeEvent.layout.width)}
            >
              {showFocusedState && surfaceWidth > 0 && (
                <View
                  style={[
                    styles.shadowWrapper,
                    { height: resolvedShadowHeight, borderRadius: cornerRadius },
                    iosContinuousCurve,
                  ]}
                >
                  <InnerShadowView
                    width={surfaceWidth}
                    height={resolvedShadowHeight}
                    borderRadius={cornerRadius}
                    color={COLORS.INNER_SURFACE}
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
                    borderRadius: cornerRadius,
                    minHeight: fieldHeight,
                    height: props.multiline ? undefined : fieldHeight,
                    alignItems: props.multiline ? "flex-start" : "center",
                    paddingTop: props.multiline ? 12 : 0,
                  },
                  iosContinuousCurve,
                ]}
                onLayout={(event) => {
                  if (!props.multiline) return;
                  const nextHeight = event.nativeEvent.layout.height;
                  if (nextHeight > 0 && Math.abs(nextHeight - inputHeight) > 1) {
                    setInputHeight(nextHeight);
                  }
                }}
              >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                  {...props}
                  style={[
                    styles.input,
                    hasText ? styles.inputTyped : styles.inputPlaceholder,
                    props.multiline && {
                      minHeight: Math.max(40, fieldHeight - 24),
                      textAlignVertical: "top",
                    },
                    style,
                  ]}
                  placeholderTextColor={COLORS.TEXT_40}
                  multiline={props.multiline}
                  numberOfLines={props.multiline ? props.numberOfLines : 1}
                  allowFontScaling={false}
                  onFocus={(e) => {
                    setFocused(true);
                    props.onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    setFocused(false);
                    props.onBlur?.(e);
                  }}
                />

                {rightIcon && (
                  <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
                    {rightIcon}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  gradientBorder: {
    borderRadius: RADIUS,
    padding: 0.6,
    overflow: Platform.OS === "ios" ? "hidden" : "visible",
  },
  shadowDarkWrap: {
    borderRadius: RADIUS,
    backgroundColor: COLORS.INNER_SURFACE,
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
  shadowLightWrap: {
    borderRadius: RADIUS,
    backgroundColor: COLORS.INNER_SURFACE,
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
    }),
  },
  shadowDarkWrapFocused: {
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
  shadowLightWrapFocused: {
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
    backgroundColor: COLORS.INNER_SURFACE,
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
