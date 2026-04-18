import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { COLORS } from "../../constants/theme";
import DeltaBadge from "./DeltaBadge";
import NeumorphicCard from "./NeumorphicCard";

type FilterChipProps = {
  title: string;
  selected: boolean;
  onPress: () => void;
  width?: number;
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
      <DeltaBadge
        icon={null}
        value={title}
        width={width}
        height={height}
        bgColor={COLORS.ACCENT}
        darkShadowColor={COLORS.DARK_SHADOW}
        lightShadowColor={COLORS.LIGHT_SHADOW}
        textColor={COLORS.PRIMARY}
        textStyle={[styles.selectedFilterText, selectedTextStyle]}
      />
    ) : (
      <NeumorphicCard
        outerStyle={[styles.filterOuter, width ? { width } : null]}
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
    color: COLORS.TEXT_70,
    fontSize: 13,
    fontWeight: "500",
  },
  selectedFilterText: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default FilterChip;
