import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicRadioMark from "../../../../components/Common/NeumorphicRadioMark";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import LapReportIcon from "../../../../assets/icon/labReportIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";
type Step = 1 | 2;
type StepOneTest = "bmp" | "egfr" | "a1c" | "lipid-panel";
type AssignTo = "nurse" | "medical-assistant";
type StepTwoAction = "send-instructions" | "add-portal";

const OrderLabs = () => {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedTests, setSelectedTests] = useState<Record<StepOneTest, boolean>>({
    bmp: false,
    egfr: true,
    a1c: false,
    "lipid-panel": false,
  });
  const [selectedAssignTo, setSelectedAssignTo] = useState<AssignTo>("nurse");
  const [selectedActions, setSelectedActions] = useState<Record<StepTwoAction, boolean>>({
    "send-instructions": false,
    "add-portal": true,
  });

  const toggleStepOneTest = (key: StepOneTest) => {
    setSelectedTests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStepTwoAction = (key: StepTwoAction) => {
    setSelectedActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>Order Labs</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.progressRow}>
            <ReusableButton title="" containerStyle={styles.progressFilled} textStyle={styles.progressEmptyText} onPress={() => setCurrentStep(1)} height={16} />
            {currentStep === 2 ? (
              <ReusableButton title="" containerStyle={styles.progressFilled} textStyle={styles.progressEmptyText} onPress={() => setCurrentStep(2)} height={16} />
            ) : (
              <Pressable style={styles.progressUnfilled} onPress={() => setCurrentStep(2)}>
                <NeumorphicInnerShadowCard borderRadius={8} darkShadowDx={4}
                  darkShadowDy={4}
                  darkShadowBlur={14}
                  darkShadowColor={COLORS.DARK_SHADOW}
                  lightShadowDx={-4}
                  lightShadowDy={-4}
                  lightShadowBlur={9}
                  lightShadowColor={COLORS.LIGHT_SHADOW} height={16} />
              </Pressable>
            )}
          </View>

          <Text style={styles.stepLabel}>{currentStep === 1 ? "Step 1" : "Step 2"}</Text>

          {currentStep === 1 ? (
            <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
              <Text style={styles.sectionTitle}>Select Required Tests</Text>
              <Pressable style={styles.optionRow} onPress={() => toggleStepOneTest("bmp")}>
                <View style={styles.optionLeft}>
                  <NeumorphicCheckboxMark selected={selectedTests.bmp} />
                  <Text style={styles.optionText}>BMP</Text>
                </View>
              </Pressable>
              <View style={styles.divider} />
              <Pressable style={styles.optionRow} onPress={() => toggleStepOneTest("egfr")}>
                <View style={styles.optionLeft}>
                  <NeumorphicCheckboxMark selected={selectedTests.egfr} />
                  <Text style={styles.optionText}>eGFR</Text>
                </View>
              </Pressable>
              <View style={styles.divider} />
              <Pressable style={styles.optionRow} onPress={() => toggleStepOneTest("a1c")}>
                <View style={styles.optionLeft}>
                  <NeumorphicCheckboxMark selected={selectedTests.a1c} />
                  <Text style={styles.optionText}>A1C</Text>
                </View>
              </Pressable>
              <View style={styles.divider} />
              <Pressable style={styles.optionRow} onPress={() => toggleStepOneTest("lipid-panel")}>
                <View style={styles.optionLeft}>
                  <NeumorphicCheckboxMark selected={selectedTests["lipid-panel"]} />
                  <Text style={styles.optionText}>Lipid Panel</Text>
                </View>
              </Pressable>
            </NeumorphicCard>
          ) : (
            <>
              <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
                <Text style={styles.sectionTitle}>Assign to</Text>
                <Pressable style={styles.optionRow} onPress={() => setSelectedAssignTo("nurse")}>
                  <View style={styles.optionLeft}>
                    <NeumorphicRadioMark selected={selectedAssignTo === "nurse"} />
                    <InnerShadowIcon icon={<LapReportIcon width={18} height={18} />} size={40} />
                    <Text style={styles.assignText}>Nurse</Text>
                  </View>
                </Pressable>
                <View style={styles.divider} />
                <Pressable style={styles.optionRow} onPress={() => setSelectedAssignTo("medical-assistant")}>
                  <View style={styles.optionLeft}>
                    <NeumorphicRadioMark selected={selectedAssignTo === "medical-assistant"} />
                    <InnerShadowIcon icon={<PatientIcon width={18} height={18} />} size={40} />
                    <Text style={styles.assignText}>Medical Assistant</Text>
                  </View>
                </Pressable>
              </NeumorphicCard>

              <NeumorphicCard outerStyle={styles.cardOuterStepTwo} innerStyle={styles.cardInner} borderRadius={10}>
                <Text style={styles.sectionTitle}>Select Required Tests</Text>
                <Pressable style={styles.optionRow} onPress={() => toggleStepTwoAction("send-instructions")}>
                  <View style={styles.optionLeft}>
                    <NeumorphicCheckboxMark selected={selectedActions["send-instructions"]} />
                    <Text style={styles.optionText}>Send Instructions</Text>
                  </View>
                </Pressable>
                <View style={styles.divider} />
                <Pressable style={styles.optionRow} onPress={() => toggleStepTwoAction("add-portal")}>
                  <View style={styles.optionLeft}>
                    <NeumorphicCheckboxMark selected={selectedActions["add-portal"]} />
                    <Text style={styles.optionText}>Add to portal</Text>
                  </View>
                </Pressable>
              </NeumorphicCard>
            </>
          )}
        </ScrollView>

        <View style={styles.bottomAction}>
          <ReusableButton
            title={currentStep === 1 ? "Next" : "Send Order"}
            containerStyle={styles.submitBtn}
            onPress={() => {
              if (currentStep === 1) {
                setCurrentStep(2);
                return;
              }
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  progressRow: { marginTop: 30, flexDirection: "row", justifyContent: "space-between" },
  progressFilled: { width: "48%", height: 16, borderRadius: 8 },
  progressEmptyText: { color: "transparent", fontSize: 0 },
  progressUnfilled: { width: "48%" },
  stepLabel: { marginTop: 30, color: COLORS.TEXT_70, fontSize: 14, fontWeight: "500" },
  cardOuter: { marginTop: 16 },
  cardOuterStepTwo: { marginTop: 16 },
  cardInner: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10 },
  sectionTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500", marginBottom: 8 },
  optionRow: { minHeight: 46, justifyContent: "center" },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  optionText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  assignText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 8 },
  bottomAction: { paddingHorizontal: 16, paddingBottom: 10 },
  submitBtn: { height: 48, borderRadius: 24 },
});

export default OrderLabs;