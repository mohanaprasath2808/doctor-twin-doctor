import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InnerShadowView from "./InnerShadowView";
import { COLORS } from "../constants/theme";

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
/** Raw `contentSize.height` above this → multi-line padded layout (`textAlignVertical: top`). */
const MULTILINE_EXPAND_RAW_H = 38;

/** Stronger vertical inner shadow (Skia dy/blur), without changing input row height. */
const INNER_SHADOW_DY = 4;
const INNER_SHADOW_BLUR = 5;

/**
 * Matches `apps/staff` / `apps/doctor` neomorphism `InputField`:
 * empty + blurred → raised outer shadows only;
 * focused or has text → softer outer shadows + `InnerShadowView` inner recess.
 */
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
  const [multilineContentH, setMultilineContentH] = useState<number | undefined>(undefined);
  const [multilineRawH, setMultilineRawH] = useState(0);
  const valueText = String(props.value ?? props.defaultValue ?? "");
  const hasText = valueText.trim().length > 0;
  const isFocusControlled = typeof isFocused === "boolean";
  const showFocusedState = isFocusControlled ? isFocused : focused || hasText;

  useEffect(() => {
    if (!props.multiline || hasText) return;
    setMultilineContentH(undefined);
    setMultilineRawH(0);
  }, [props.multiline, hasText]);

  const resolvedShadowHeight = Math.max(fieldHeight, inputHeight);
  const minMultilineInnerH = props.multiline ? Math.max(40, fieldHeight - 24) : 0;
  const expandedMultiline =
    Boolean(props.multiline) && multilineRawH > MULTILINE_EXPAND_RAW_H;

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
                  style={[
                    styles.shadowWrapper,
                    { height: resolvedShadowHeight, borderRadius: radius },
                  ]}
                >
                  <InnerShadowView
                    width={surfaceWidth}
                    height={resolvedShadowHeight}
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
                    height: props.multiline ? undefined : fieldHeight,
                    alignItems: props.multiline ? "flex-start" : "center",
                    paddingTop: props.multiline ? 12 : 0,
                    paddingBottom: props.multiline ? 12 : 0,
                  },
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
                  onContentSizeChange={(e) => {
                    props.onContentSizeChange?.(e);
                    if (!props.multiline) return;
                    const h = e.nativeEvent.contentSize.height;
                    if (h <= 0) return;
                    const raw = Math.ceil(h);
                    setMultilineRawH(raw);
                    if (raw > MULTILINE_EXPAND_RAW_H) {
                      setMultilineContentH(Math.max(minMultilineInnerH, raw));
                    } else {
                      setMultilineContentH(undefined);
                    }
                  }}
                  style={[
                    styles.input,
                    !props.multiline ? styles.inputSingleLineStretch : undefined,
                    hasText ? styles.inputTyped : styles.inputPlaceholder,
                    props.multiline && {
                      textAlignVertical: "top",
                      minHeight: minMultilineInnerH,
                      ...(expandedMultiline && multilineContentH != null
                        ? { height: multilineContentH }
                        : {}),
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
          </View>
        </LinearGradient>
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
  /** Idle drop shadow lives here so one native outline follows the pill (`elevation` / iOS shadow). */
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
    minHeight: HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 1,
    borderRadius: RADIUS,
  },
  input: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
  /** Single-line row: stretch to the wrapper’s fixed height (~46px). */
  inputSingleLineStretch: {
    height: "100%",
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
