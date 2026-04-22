import React from "react";
import { StyleSheet, View } from "react-native";

import SelectedRadioStaffIcon from "../../assets/icon/selectedRadioStaff.svg";
import InnerShadowIcon from "../neomorphism/InnerShadowIcon";

export type NeumorphicRadioMarkProps = {
  selected: boolean;
};

const NeumorphicRadioMark = ({ selected }: NeumorphicRadioMarkProps) =>
  selected ? (
    <SelectedRadioStaffIcon width={30} height={30} />
  ) : (
    <InnerShadowIcon
      icon={<View style={styles.emptyDot} />}
      size={30}
      radius={46}
    />
  );

const styles = StyleSheet.create({
  emptyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "transparent",
  },
});

export default NeumorphicRadioMark;
