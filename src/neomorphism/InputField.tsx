import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import InnerShadowView from "./InnerShadowView";
import NeumorphicView from "./NeumorphicView";
import { COLORS } from "../constants/theme";

interface Props {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  placeholder?: string;
}
const HEIGHT = 47;
const RADIUS = 64;
const InputField: React.FC<Props> = ({
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {/* 🔥 Gradient BORDER */}
      <LinearGradient
        colors={["#D6E3F399", "#FFFFFFCC", "#FFFFFF80", "#FFFFFF00"]}
        locations={[0, 0.4, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBorder, { borderRadius: RADIUS }]}
      >
        {/* 🔥 INNER CONTENT */}
        <View style={styles.innerWrapper}>
          {!focused && width > 0 && (
            <View style={styles.outerShadowWrapper}>
              <NeumorphicView
                width={width}
                height={HEIGHT}
                borderRadius={RADIUS}
                color="#F7FBFF"
              />
            </View>
          )}

          <View style={styles.surface}>
            {focused && width > 0 && (
              <View style={styles.shadowWrapper}>
                <InnerShadowView
                  width={width}
                  height={HEIGHT}
                  borderRadius={RADIUS}
                  color="#F7FBFF"
                />
              </View>
            )}

            {/* Input */}
            <View style={styles.inputWrapper}>
              {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

              <TextInput
                {...props}
                style={[styles.input]}
                placeholderTextColor="#ABABAB"
                multiline={false}
                numberOfLines={1}
                allowFontScaling={false}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
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

  outerShadowWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: HEIGHT + 24,
  },

  surface: {
    borderRadius: RADIUS,
    overflow: "hidden",
    backgroundColor: "#F7FBFF",
  },

  shadowWrapper: {
    position: "absolute",
    width: "100%",
    height: 47,
    borderRadius: RADIUS,
  },

  inputWrapper: {
    height: 47,
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
