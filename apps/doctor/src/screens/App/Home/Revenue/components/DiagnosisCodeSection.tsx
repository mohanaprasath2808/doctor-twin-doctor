import React from "react";
import { StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../../constants/theme";
import InputField from "../../../../../neomorphism/InputField";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";

type DiagnosisBlockProps = {
  label: string;
  code: string;
  description: string;
  onCodeChange: (value: string) => void;
};

function DiagnosisBlock({ label, code, description, onCodeChange }: DiagnosisBlockProps) {
  return (
    <View style={styles.diagnosisBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <InputField
        value={code}
        onChangeText={onCodeChange}
        containerStyle={styles.input}
        minHeight={46}
        borderRadius={114}
      />
      <NeumorphicInnerShadowCard
        borderRadius={10}
        containerStyle={styles.insetOuter}
        contentStyle={styles.insetInner}
      >
        <Text style={styles.insetText}>{description}</Text>
      </NeumorphicInnerShadowCard>
    </View>
  );
}

export type DiagnosisCodeSectionProps = {
  primaryCode: string;
  primaryDescription: string;
  secondaryCode: string;
  secondaryDescription: string;
  onPrimaryCodeChange: (value: string) => void;
  onSecondaryCodeChange: (value: string) => void;
};

const DiagnosisCodeSection = ({
  primaryCode,
  primaryDescription,
  secondaryCode,
  secondaryDescription,
  onPrimaryCodeChange,
  onSecondaryCodeChange,
}: DiagnosisCodeSectionProps) => (
  <View style={styles.wrap}>
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
      <Text style={styles.sectionTitle}>Diagnosis Code (ICD-10)</Text>
      <DiagnosisBlock
        label="Primary Diagnosis"
        code={primaryCode}
        description={primaryDescription}
        onCodeChange={onPrimaryCodeChange}
      />
      <View style={styles.divider} />
      <DiagnosisBlock
        label="Secondary Diagnosis"
        code={secondaryCode}
        description={secondaryDescription}
        onCodeChange={onSecondaryCodeChange}
      />
    </NeumorphicCard>
  </View>
);

export default DiagnosisCodeSection;

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 4,
  },
  diagnosisBlock: {
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
    marginTop: 5,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0,
  },
  insetOuter: {
    width: "100%",
    marginTop: 15,
    marginBottom: 12,
  },
  insetInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  insetText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 12,
  },
});
