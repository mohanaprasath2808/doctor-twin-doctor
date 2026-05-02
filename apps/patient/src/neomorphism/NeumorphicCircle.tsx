import React, { ReactNode } from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { COLORS } from "../constants/theme";

export type NeumorphicCircleProps = {
  children: ReactNode;
  size?: number;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  shadowBaseColor?: string;
};

const NeumorphicCircle: React.FC<NeumorphicCircleProps> = ({
  children,
  size = 22,
  backgroundColor = COLORS.SECONDARY,
  borderWidth = 1,
  borderColor = "rgba(255,255,255,0.45)",
  style,
  shadowBaseColor = COLORS.SURFACE,
}) => {
  const radius = size / 2;

  return (
    <View
      style={[
        styles.root,
        {
          width: size,
          height: size,
          borderRadius: radius,
        },
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowDark,
          { borderRadius: radius, backgroundColor: shadowBaseColor },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowLight,
          { borderRadius: radius, backgroundColor: shadowBaseColor },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowSoft,
          { borderRadius: radius, backgroundColor: shadowBaseColor },
        ]}
      />
      <View
        style={[
          styles.face,
          {
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor,
            borderWidth,
            borderColor,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    backgroundColor: "transparent",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.45,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
    }),
  },
  face: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default NeumorphicCircle;
