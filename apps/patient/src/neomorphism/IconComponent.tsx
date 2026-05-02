import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/theme";

interface IconComponentProps {
  icon: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  width?: number;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const IconComponent: React.FC<IconComponentProps> = ({
  icon,
  onPress,
  width = 40,
  height = 40,
  radius = 20,
  style,
  disabled = false,
}) => {
  const innerRadius = Math.max(0, radius - 1);

  return (
    <View style={[{ width, height, borderRadius: radius }, styles.root, style]}>
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowDark, { borderRadius: radius }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowLight, { borderRadius: radius }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, { borderRadius: radius }]}
      />
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        style={[styles.pressable, { borderRadius: radius }]}
      >
        <LinearGradient
          colors={["#D6E3F3", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.border, { borderRadius: radius }]}
        >
          <View
            style={[
              styles.surface,
              {
                borderRadius: innerRadius,
                opacity: disabled ? 0.6 : 1,
              },
            ]}
          >
            {icon}
          </View>
        </LinearGradient>
      </TouchableOpacity>
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
    backgroundColor: COLORS.SURFACE,
  },
  // Slightly smaller vertical offset than horizontal so the glow does not read as “extra height” under the button (especially on iOS).
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "4px 4px 20px 0px #C8CBCC",
        elevation: 0,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "-6px -6px 20px 0px #FFFFFF",
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        boxShadow: "2px 2px 4px 0px rgba(114, 142, 171, 0.1)",
      },
    }),
  },
  pressable: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  border: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 1,
  },
  surface: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconComponent;
