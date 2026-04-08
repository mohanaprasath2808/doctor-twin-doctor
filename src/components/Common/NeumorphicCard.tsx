import React from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants/theme";

type NeumorphicCardProps = {
  children: React.ReactNode;
  /** Outer wrapper style (width, margin, etc.) */
  outerStyle?: StyleProp<ViewStyle>;
  /** Inner surface style (padding, flexDirection, etc.) */
  innerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  backgroundColor?: string;
  onPress?: () => void;
  activeOpacity?: number;
};

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  outerStyle,
  innerStyle,
  borderRadius = 14,
  backgroundColor = COLORS.SURFACE,
  onPress,
  activeOpacity = 0.85,
}) => {
  const Surface: React.ElementType = onPress ? TouchableOpacity : View;
  const surfaceProps = onPress
    ? { activeOpacity, onPress }
    : undefined;

  return (
    <View style={[styles.outer, { borderRadius }, outerStyle]}>
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowDark, { borderRadius, backgroundColor }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowLight, { borderRadius, backgroundColor }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, { borderRadius, backgroundColor }]}
      />
      <Surface
        {...(surfaceProps as any)}
        style={[styles.inner, { borderRadius, backgroundColor }, innerStyle]}
      >
        {children}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: "relative",
    overflow: "visible",
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  shadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
    }),
  },
  inner: {
    zIndex: 1,
  },
});

export default NeumorphicCard;

