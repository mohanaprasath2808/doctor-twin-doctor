import React from "react";
import { StyleSheet, View } from "react-native";

import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import SelectedCheckBox from "../../assets/icons/selectedCheckBox.svg";

export type NeumorphicCheckboxMarkProps = {
  selected: boolean;
};

/** 20×20 neumorphic checkbox — matches staff/doctor `NeumorphicCheckboxMark` pattern. */
const NeumorphicCheckboxMark = ({ selected }: NeumorphicCheckboxMarkProps) =>
  selected ? (
    <SelectedCheckBox width={20} height={20} />
  ) : (
    <InnerShadowIcon icon={<View style={styles.emptyDot} />} size={20} radius={6} />
  );

const styles = StyleSheet.create({
  emptyDot: {
    width: 2,
    height: 2,
  },
});

export default NeumorphicCheckboxMark;
