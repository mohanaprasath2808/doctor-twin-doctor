import React from "react";
import { Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/theme";

type NeumorphicCardProps = {
  children: React.ReactNode;
  outerStyle?: StyleProp<ViewStyle>;
  borderContainerStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  backgroundColor?: string;
  onPress?: () => void;
  activeOpacity?: number;
};

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  outerStyle,
  borderContainerStyle,
  innerStyle,
  borderRadius = 10,
  backgroundColor = COLORS.INNER_SURFACE,
  onPress,
  activeOpacity = 0.85,
}) => {
  const innerRadius = Math.max(0, borderRadius - 1);

  const inner = (
    <View style={[styles.inner, { borderRadius: innerRadius, backgroundColor }, innerStyle]}>
      {children}
    </View>
  );

  return (
    <View style={[styles.outer, { borderRadius }, outerStyle]}>
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowDark,
          { borderRadius, backgroundColor: COLORS.SURFACE },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowLight,
          { borderRadius, backgroundColor: COLORS.SURFACE },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.shadowLayer,
          styles.shadowSoft,
          { borderRadius, backgroundColor: COLORS.SURFACE },
        ]}
      />
      <View style={[styles.border, { borderRadius }, borderContainerStyle]}>
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            styles.gradientClip,
            { borderRadius: innerRadius },
          ]}
        >
          <LinearGradient
            colors={["rgba(214, 227, 243, 0.46)", "rgba(255, 255, 255, 0.46)"]}
            locations={[0.082, 0.8268]}
            start={{ x: 1, y: 0.465 }}
            end={{ x: 0, y: 0.535 }}
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={["#FFFFFF", "rgba(255, 255, 255, 0)"]}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        {onPress ? (
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            style={[styles.inner, { borderRadius: innerRadius, backgroundColor }, innerStyle]}
          >
            {children}
          </TouchableOpacity>
        ) : (
          inner
        )}
      </View>
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
  border: {
    zIndex: 1,
    padding: 1,
    overflow: "hidden",
  },
  /** Keeps border gradients rounded when parent border uses overflow: 'visible'. */
  gradientClip: {
    overflow: "hidden",
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
    overflow: "hidden",
  },
});

export default NeumorphicCard;
