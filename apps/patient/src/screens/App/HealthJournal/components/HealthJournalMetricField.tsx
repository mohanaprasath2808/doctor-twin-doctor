import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../../../constants/theme";
import { HealthJournalFieldConfig } from "../types/healthJournalEntryConfig";

type HealthJournalMetricFieldProps = {
  field: HealthJournalFieldConfig;
  value: string;
  onChange: (text: string) => void;
  halfWidth?: boolean;
};

const HealthJournalMetricField: React.FC<HealthJournalMetricFieldProps> = ({
  field,
  value,
  onChange,
  halfWidth = false,
}) => (
  <View style={[styles.fieldBlock, halfWidth && styles.fieldHalf]}>
    <Text style={styles.fieldLabel}>{field.label}</Text>
    <NeumorphicInnerShadowCard
      borderRadius={12}
      containerStyle={styles.insetOuter}
      contentStyle={styles.insetInner}
      darkShadowColor={COLORS.DARK_SHADOW}
      lightShadowColor={COLORS.LIGHT_SHADOW}
    >
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={field.placeholder}
        placeholderTextColor={COLORS.TEXT_PRIMARY_50}
        keyboardType={field.keyboardType ?? "default"}
        style={styles.fieldInput}
        textAlign="center"
      />
    </NeumorphicInnerShadowCard>
  </View>
);

const styles = StyleSheet.create({
  fieldBlock: {
    width: "100%",
  },
  fieldHalf: {
    flex: 1,
    minWidth: 0,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  insetOuter: {
    width: "100%",
  },
  insetInner: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldInput: {
    width: "100%",
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    padding: 0,
  },
});

export default HealthJournalMetricField;
