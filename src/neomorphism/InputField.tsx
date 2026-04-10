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
import LinearGradient from "react-native-linear-gradient";
import InnerShadowView from "./InnerShadowView";
import { COLORS } from "../constants/theme";

interface Props {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  minHeight?: number;
}

const HEIGHT = 46;
const RADIUS = 64;

const InputField: React.FC<Props & TextInputProps> = ({
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  borderRadius,
  minHeight,
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [width, setWidth] = useState(0);
  const radius = borderRadius ?? RADIUS;
  const fieldMinHeight = minHeight ?? HEIGHT;
  const valueText = String(props.value ?? props.defaultValue ?? "");
  const hasText = valueText.trim().length > 0;
  const showFocusedState = focused || hasText;

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <LinearGradient
        colors={["#D6E3F399", "#FFFFFFCC", "#FFFFFF80", "#FFFFFF00"]}
        locations={[0, 0.4, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBorder, { borderRadius: radius }]}
      >
        <View style={styles.innerWrapper}>
          <View
            pointerEvents="none"
            style={[
              styles.shadowLayer,
              styles.shadowDark,
              { borderRadius: radius },
              showFocusedState && styles.shadowDarkFocused,
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.shadowLayer,
              styles.shadowLight,
              { borderRadius: radius },
              showFocusedState && styles.shadowLightFocused,
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.shadowLayer,
              styles.shadowSoft,
              { borderRadius: radius },
            ]}
          />

          <View style={[styles.surface, { borderRadius: radius }]}>
            {showFocusedState && width > 0 && (
              <View
                style={[
                  styles.shadowWrapper,
                  { height: fieldMinHeight, borderRadius: radius },
                ]}
              >
                <InnerShadowView
                  width={width}
                  height={fieldMinHeight}
                  borderRadius={radius}
                  color="#F7FBFF"
                />
              </View>
            )}

            <View
              style={[
                styles.inputWrapper,
                {
                  borderRadius: radius,
                  minHeight: fieldMinHeight,
                  height: props.multiline ? undefined : fieldMinHeight,
                  alignItems: props.multiline ? "flex-start" : "center",
                  paddingTop: props.multiline ? 12 : 0,
                },
              ]}
            >
              {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

              <TextInput
                {...props}
                style={[
                  styles.input,
                  props.multiline && {
                    minHeight: Math.max(40, fieldMinHeight - 24),
                    textAlignVertical: "top",
                  },
                  style,
                ]}
                placeholderTextColor="#ABABAB"
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
                <TouchableOpacity
                  onPress={onRightIconPress}
                  style={styles.rightIcon}
                >
                  {rightIcon}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 15,
  },
  gradientBorder: {
    borderRadius: RADIUS,
    padding: 0.6,
    overflow: "visible",
  },
  innerWrapper: {
    borderRadius: RADIUS,
    overflow: "visible",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS,
    backgroundColor: COLORS.SURFACE,
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
    backgroundColor: "#F7FBFF",
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
    paddingHorizontal: 15,
    zIndex: 1,
    borderRadius: RADIUS,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    includeFontPadding: false,
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
