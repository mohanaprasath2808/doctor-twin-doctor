import React from 'react';
import { StyleSheet, View } from 'react-native';
import InnerShadowIcon from '../../neomorphism/InnerShadowIcon';
import SelectedIcon from '../../assets/icon/selectedIcon.svg';

export type NeumorphicRadioMarkProps = {
  selected: boolean;
};

/** 30×30 selected / empty neumorphic radio-style mark (shared list & option rows). */
const NeumorphicRadioMark = ({ selected }: NeumorphicRadioMarkProps) =>
  selected ? (
    <SelectedIcon width={30} height={30} />
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
    backgroundColor: 'transparent',
  },
});

export default NeumorphicRadioMark;
