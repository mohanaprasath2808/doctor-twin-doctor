import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import NeumorphicCard from "./NeumorphicCard";
import NeumorphicRadioMark from "../../neomorphism/NeumorphicRadioMark";
import { COLORS } from "../../constants/theme";
import { TEXT } from "../../constants/typography";

export type NeumorphicRadioOption<T extends string> = {
  value: T;
  label: string;
};

export type NeumorphicRadioGroupProps<T extends string> = {
  options: NeumorphicRadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  sectionTitle?: string;
  optional?: boolean;
  cardOuterStyle?: StyleProp<ViewStyle>;
  cardInnerStyle?: StyleProp<ViewStyle>;
};

function NeumorphicRadioGroup<T extends string>({
  options,
  value,
  onChange,
  sectionTitle,
  optional = false,
  cardOuterStyle,
  cardInnerStyle,
}: NeumorphicRadioGroupProps<T>) {
  return (
    <View>
      {sectionTitle ? (
        <Text style={styles.sectionTitle}>
          {sectionTitle}
          {optional ? <Text style={styles.optional}> (optional)</Text> : null}
        </Text>
      ) : null}

      <NeumorphicCard
        outerStyle={[styles.cardOuter, cardOuterStyle]}
        innerStyle={[styles.cardInner, cardInnerStyle]}
        borderRadius={10}
      >
        {options.map((option, index) => (
          <View key={option.value}>
            <Pressable
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
            >
              <NeumorphicRadioMark selected={value === option.value} />
              <Text style={styles.optionLabel}>{option.label}</Text>
            </Pressable>
            {index < options.length - 1 ? <View style={styles.divider} /> : null}
          </View>
        ))}
      </NeumorphicCard>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 10,
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  optional: {
    ...TEXT.caption,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY_70,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  optionRowPressed: {
    opacity: 0.88,
  },
  optionLabel: {
    flex: 1,
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
});

export default NeumorphicRadioGroup;
