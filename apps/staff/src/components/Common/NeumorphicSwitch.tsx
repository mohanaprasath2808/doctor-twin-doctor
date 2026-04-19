import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "../../constants/theme";
import NeumorphicInnerShadowCard from "../neomorphism/NeumorphicInnerShadowCard";
import StatusDot from "./StatusDot";

type NeumorphicSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

const NeumorphicSwitch: React.FC<NeumorphicSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.switchWrap, disabled && styles.disabled]}
    >
      <NeumorphicInnerShadowCard
        height={28}
        borderRadius={999}
        backgroundColor="#FFFFFF"
        containerStyle={styles.track}
        contentStyle={styles.trackContent}
        darkShadowDx={4}
        darkShadowDy={4}
        darkShadowBlur={12}
        darkShadowColor="#C8CBCC"
        lightShadowDx={-4}
        lightShadowDy={-4}
        lightShadowBlur={9}
        lightShadowColor="#FFFFFFCC"
      >
        <View style={[styles.thumbWrap, value ? styles.thumbRight : styles.thumbLeft]}>
          <StatusDot
            color={value ? COLORS.PRIMARY : COLORS.WHITE}
            size={24}
            outerGradientColors={["#D6E3F3", "#FFFFFF"]}
          />
        </View>
      </NeumorphicInnerShadowCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchWrap: {
    width: 52,
    height: 28,
  },
  track: {
    width: "100%",
  },
  trackContent: {
    minHeight: 28,
    paddingHorizontal: 2,
    justifyContent: "center",
  },
  thumbWrap: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbLeft: {
    alignSelf: "flex-start",
  },
  thumbRight: {
    alignSelf: "flex-end",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default NeumorphicSwitch;
