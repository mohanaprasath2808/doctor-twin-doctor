import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";
import NeumorphicCard from "./NeumorphicCard";

type FilterChipProps = {
  title: string;
  selected: boolean;
  onPress: () => void;
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const FilterChip = ({
  title,
  selected,
  onPress,
  width,
  height = 36,
  borderRadius = 18,
  style,
  selectedTextStyle,
  textStyle,
}: FilterChipProps) => (
  <Pressable onPress={onPress} style={style}>
    {selected ? (
      <LinearGradient
        colors={["#5ED9EC", "#14B8D4"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0.5 }}
        style={[
          styles.selectedGradient,
          {
            height,
            borderRadius,
            minWidth: typeof width === "number" ? width : 72,
            paddingHorizontal: width ? 0 : 16,
          },
        ]}
      >
        <Text style={[styles.selectedFilterText, selectedTextStyle]}>{title}</Text>
      </LinearGradient>
    ) : (
      <NeumorphicCard
        outerStyle={[styles.filterOuter, typeof width === "number" ? { width } : null]}
        innerStyle={[
          styles.filterInner,
          {
            height,
            borderRadius,
          },
        ]}
        borderRadius={borderRadius}
      >
        <Text style={[styles.filterText, textStyle]}>{title}</Text>
      </NeumorphicCard>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  filterOuter: {
    minWidth: 72,
  },
  filterInner: {
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    color: COLORS.TEXT_PRIMARY_70,
    fontSize: 13,
    fontWeight: "500",
  },
  selectedFilterText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.WHITE,
  },
  selectedGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    ...Platform.select({
      ios: {
        shadowColor: "#3F97B2",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
});

export default FilterChip;
