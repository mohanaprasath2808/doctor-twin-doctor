import React from 'react';
import { StyleSheet, View } from 'react-native';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import SelectedCheckBox from '../../assets/icon/selectedCheckBoxIcon.svg';

export type NeumorphicCheckboxMarkProps = {
  selected: boolean;
};

/** 20×20 selected / empty neumorphic checkbox mark (shared UI). */
const NeumorphicCheckboxMark = ({ selected }: NeumorphicCheckboxMarkProps) =>
  selected ? (
    <SelectedCheckBox width={20} height={20} />
  ) : (
    <InnerShadowIcon
      icon={<View style={styles.emptyDot} />}
      size={20}
      radius={6}
    />
  );

const styles = StyleSheet.create({
  emptyDot: {
    width: 2,
    height: 2,
  },
});

export default NeumorphicCheckboxMark;
