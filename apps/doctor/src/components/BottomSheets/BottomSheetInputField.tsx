import React, { useState } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import { COLORS } from "../../constants/theme";

type Props = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  minHeight?: number;
} & TextInputProps;

const HEIGHT = 46;
const RADIUS = 64;

const BottomSheetInputField = React.forwardRef<TextInput, Props>(function BottomSheetInputField(
  {
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    borderRadius,
    minHeight,
    style,
    ...rest
  },
  forwardedRef,
) {
  const radius = borderRadius ?? RADIUS;
  const fieldMinHeight = minHeight ?? HEIGHT;
  const [focused, setFocused] = useState(false);
  const [width, setWidth] = useState(0);
  const valueText = String(rest.value ?? rest.defaultValue ?? "");
  const hasText = valueText.trim().length > 0;
  const showFocusedState = focused || hasText;
  const cornerRadius = Math.min(radius, fieldMinHeight / 2);
  const iosContinuousCurve =
    Platform.OS === "ios" ? ({ borderCurve: "continuous" } as const) : null;

  return (
    <View style={[styles.container, containerStyle]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
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
            <View style={[styles.surface, { borderRadius: cornerRadius }, iosContinuousCurve]}>
              {showFocusedState && width > 0 ? (
                <View
                  pointerEvents="none"
                  style={[styles.shadowWrapper, { height: fieldMinHeight, borderRadius: cornerRadius }]}
                >
                  <InnerShadowView
                    width={width}
                    height={fieldMinHeight}
                    borderRadius={cornerRadius}
                    color="#F7FBFF"
                  />
                </View>
              ) : null}

              <View
                style={[
                  styles.inputWrapper,
                  { borderRadius: cornerRadius, minHeight: fieldMinHeight, height: fieldMinHeight },
                  iosContinuousCurve,
                ]}
              >
                {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

                <BottomSheetTextInput
                  {...rest}
                  ref={forwardedRef as never}
                  style={[styles.input, style]}
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
          </LinearGradient>
        </View>
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
  gradientBorder: {
    padding: 0.6,
    overflow: Platform.OS === "ios" ? "hidden" : "visible",
  },
  shadowDarkWrap: {
    backgroundColor: "#F7FBFF",
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  shadowLightWrap: {
    backgroundColor: "#F7FBFF",
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
      ios: { shadowOpacity: 0.35, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  shadowLightWrapFocused: {
    ...Platform.select({
      ios: { shadowOpacity: 0.45, shadowRadius: 6 },
    }),
  },
  surface: {
    overflow: "hidden",
    backgroundColor: "#F7FBFF",
  },
  shadowWrapper: {
    position: "absolute",
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
