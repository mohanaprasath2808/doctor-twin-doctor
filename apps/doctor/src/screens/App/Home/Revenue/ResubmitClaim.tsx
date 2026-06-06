import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import type { ResubmitClaimParams } from "./claimsTypes";

type VerifiedCodeBlockProps = {
  fieldLabel: string;
  code: string;
  description: string;
  onCodeChange: (value: string) => void;
};

const VerifiedCodeBlock = ({ fieldLabel, code, description, onCodeChange }: VerifiedCodeBlockProps) => (
  <View style={blockStyles.block}>
    <Text style={blockStyles.fieldLabel}>{fieldLabel}</Text>
    <InputField
      value={code}
      onChangeText={onCodeChange}
      containerStyle={blockStyles.input}
      minHeight={46}
      borderRadius={114}
      rightIcon={<SelectedIcon width={24} height={24} />}
    />
    <NeumorphicInnerShadowCard
      borderRadius={10}
      containerStyle={blockStyles.insetOuter}
      contentStyle={blockStyles.insetInner}
    >
      <Text style={blockStyles.insetText}>{description}</Text>
    </NeumorphicInnerShadowCard>
  </View>
);

const SUPPORTING_DOCS = [
  { id: "lab", label: "Lab document", checked: false },
  { id: "rbs", label: "RBS Document", checked: true },
];

const ResubmitClaim = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ ResubmitClaim: ResubmitClaimParams }, "ResubmitClaim">>();
  void route.params.claimId;
  const insets = useSafeAreaInsets();

  const [cptCode, setCptCode] = useState("99213");
  const [dxCode, setDxCode] = useState("E11.9");
  const [docs, setDocs] = useState(SUPPORTING_DOCS);

  const toggleDoc = (id: string) => {
    setDocs((prev) =>
      prev.map((row) => (row.id === id ? { ...row, checked: !row.checked } : row)),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Resubmit Claim</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.sectionTitle}>CPT Code</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
          <VerifiedCodeBlock
            fieldLabel="CPT Code"
            code={cptCode}
            description="Office Visit – Established Patient"
            onCodeChange={setCptCode}
          />
        </NeumorphicCard>

        <Text style={styles.sectionTitle}>Diagnosis Code (ICD-10)</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
          <VerifiedCodeBlock
            fieldLabel="Primary Diagnosis"
            code={dxCode}
            description="Type 2 Diabetes Mellitus"
            onCodeChange={setDxCode}
          />
        </NeumorphicCard>

        <Text style={styles.sectionTitle}>Supporting Documentation</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
          {docs.map((row, index) => (
            <View key={row.id}>
              <Pressable style={styles.docRow} onPress={() => toggleDoc(row.id)}>
                <NeumorphicCheckboxMark selected={row.checked} />
                <InnerShadowIcon
                  size={40}
                  radius={20}
                  icon={<LabReportIcon width={18} height={18} />}
                />
                <Text style={styles.docLabel}>{row.label}</Text>
              </Pressable>
              {index < docs.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <ReusableButton
          title="Submit to Payer"
          height={52}
          borderRadius={26}
          containerStyle={styles.submitBtn}
          onPress={() =>
            navigation.navigate(navigationStrings.ACTION_SUCCESS, {
              title: "Claim Submitted",
              subtitle: "Tracking ID: #12345",
              layout: "dualActions",
              secondaryButtonTitle: "Track Status",
              primaryButtonTitle: "Back to Dashboard",
              trackRouteName: navigationStrings.CLAIM_TIMELINE,
              resetRoutes: [
                { name: navigationStrings.HOME },
                { name: navigationStrings.REVENUE_DASHBOARD },
              ],
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResubmitClaim;

const blockStyles = StyleSheet.create({
  block: {
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
    marginBottom: 6,
  },
  input: {
    marginTop: 0,
    marginBottom: 8,
  },
  insetOuter: {
    width: "100%",
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
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 10,
  },
  cardOuter: {
    width: "100%",
    marginBottom: 16,
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  docLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  submitBtn: {
    width: "100%",
    marginTop: 8,
  },
});
