import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import NeumorphicCheckboxMark from "../Auth/NeumorphicCheckboxMark";
import { COLORS } from "../../constants/theme";
import { TEXT } from "../../constants/typography";

export type NeumorphicCheckboxProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const NeumorphicCheckbox = ({ label, selected, onPress }: NeumorphicCheckboxProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
  >
    <NeumorphicCheckboxMark selected={selected} />
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  rowPressed: {
    opacity: 0.88,
  },
  label: {
    flex: 1,
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default NeumorphicCheckbox;
