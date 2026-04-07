import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import InnerShadowView from "../../neomorphism/InnerShadowView";

interface DeltaBadgeProps {
  icon: React.ReactNode;
  value: string;
  bgColor: string;
  darkShadowColor: string;
  textColor: string;
}

const WIDTH = 56;
const HEIGHT = 20;
const RADIUS = 114;
const BORDER = 1;
const INNER_WIDTH = WIDTH - BORDER * 2;
const INNER_HEIGHT = HEIGHT - BORDER * 2;
const INNER_RADIUS = RADIUS - BORDER;

const DeltaBadge: React.FC<DeltaBadgeProps> = ({
  icon,
  value,
  bgColor,
  darkShadowColor,
  textColor,
}) => {
  return (
    <LinearGradient
      colors={["#D6E3F3", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.border}
    >
      <View style={[styles.surface, { backgroundColor: bgColor }]}>
        <View
          pointerEvents="none"
          style={styles.innerShadow}
          collapsable={false}
        >
          <InnerShadowView
            width={INNER_WIDTH}
            height={INNER_HEIGHT}
            borderRadius={INNER_RADIUS}
            color={bgColor}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor={darkShadowColor}
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor="#FFFFFF99"
          />
        </View>
        <View style={styles.content}>
          {icon}
          <Text style={[styles.text, { color: textColor }]}>{value}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  border: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: RADIUS,
    padding: BORDER,
    overflow: "hidden",
  },
  surface: {
    flex: 1,
    borderRadius: INNER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  innerShadow: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DeltaBadge;
