import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import MinusIcon from "../../../../assets/icon/minus.svg";
import PlusIcon from "../../../../assets/icon/plus.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import DiagnosisCodeSection from "./components/DiagnosisCodeSection";
import EditableCodeSection, { type CodeEntry } from "./components/EditableCodeSection";

const INITIAL_CPT: CodeEntry[] = [
  { id: "cpt-1", code: "99213", description: "Office Visit – Established Patient" },
  { id: "cpt-2", code: "99213", description: "Office Visit – Established Patient" },
];

const EncounterChargeEditor = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const [cptEntries, setCptEntries] = useState(INITIAL_CPT);
  const [modifierCode, setModifierCode] = useState("25");
  const [primaryDx, setPrimaryDx] = useState("E11.9");
  const [secondaryDx, setSecondaryDx] = useState("E11.9");
  const [units, setUnits] = useState(1);

  const removeCpt = (id: string) => {
    setCptEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 24 }]}
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
          <Text style={styles.headerTitle}>Encounter Charge Editor</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={14}>
          <Image source={DoctorTempImage} style={styles.avatar} />
          <View style={styles.patientText}>
            <Text style={styles.patientName}>Sarah Williams</Text>
            <Text style={styles.patientSub}>23/12/2024</Text>
            <Text style={styles.patientSub}>BlueCross</Text>
          </View>
        </NeumorphicCard>

        <EditableCodeSection
          sectionLabel="CPT Code"
          fieldLabel="CPT Code"
          entries={cptEntries}
          onCodeChange={(id, value) =>
            setCptEntries((prev) =>
              prev.map((e) => (e.id === id ? { ...e, code: value } : e)),
            )
          }
          onRemove={removeCpt}
        />

        <NeumorphicCard outerStyle={styles.unitsOuter} innerStyle={styles.unitsInner} borderRadius={14}>
          <Text style={styles.unitsTitle}>Units</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.stepperOuter}
            contentStyle={styles.stepperInner}
          >
            <IconComponent
              icon={<MinusIcon width={14} height={14} />}
              width={36}
              height={36}
              radius={18}
              onPress={() => setUnits((u) => Math.max(1, u - 1))}
            />
            <Text style={styles.unitsValue}>{units}</Text>
            <IconComponent
              icon={<PlusIcon width={14} height={14} />}
              width={36}
              height={36}
              radius={18}
              onPress={() => setUnits((u) => u + 1)}
            />
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <DiagnosisCodeSection
          primaryCode={primaryDx}
          primaryDescription="Type 2 Diabetes Mellitus"
          secondaryCode={secondaryDx}
          secondaryDescription="Type 2 Diabetes Mellitus"
          onPrimaryCodeChange={setPrimaryDx}
          onSecondaryCodeChange={setSecondaryDx}
        />

        <EditableCodeSection
          sectionLabel="Modifiers"
          fieldLabel="Modifiers"
          entries={[
            {
              id: "mod-1",
              code: modifierCode,
              description: "Significant, separately identifiable E/M service",
            },
          ]}
          onCodeChange={(_, value) => setModifierCode(value)}
          showRemove={false}
        />

        <View style={styles.buttonRow}>
          <View style={styles.cancelWrap}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.cancelText}
              style={styles.footerBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.saveWrap}>
            <ReusableButton
              title="Save Changes"
              containerStyle={styles.footerBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EncounterChargeEditor;

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
  patientOuter: {
    width: "100%",
    marginBottom: 16,
  },
  patientInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  patientText: {
    flex: 1,
    gap: 2,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  unitsOuter: {
    width: "100%",
    marginBottom: 16,
  },
  unitsInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 12,
  },
  unitsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  stepperOuter: {
    width: "100%",
  },
  stepperInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  unitsValue: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelWrap: {
    flex: 1,
  },
  saveWrap: {
    flex: 1,
  },
  footerBtn: {
    height: 52,
    borderRadius: 26,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
});
