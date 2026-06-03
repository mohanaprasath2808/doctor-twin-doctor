import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";

const PATIENT_NAME = "Mrs. Barsoum";
const PATIENT_INITIALS = "BM";

const SUMMARY_TEXT =
  "Dr.Twin or takes at information overrate after more at from summary petition to fraud";

const DIAGNOSES = ["Osteroprosis, Pulmonary nodule surveillance"];

const CURRENT_PLAN = [
  "Fosamax (alendroate) once a week,",
  "1200 - 1500 mg calcium daily available",
  "Repeat PET scan in 3 month",
  "Order pulmonary function tests",
];

const GenerateSummary = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Generate Summary</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.doctorCardOuter}
          innerStyle={styles.doctorCardInner}
          borderRadius={14}
        >
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={44}
            containerSize={52}
          />
          <View style={styles.doctorTextCol}>
            <Text style={styles.doctorName}>Dr.Soliman</Text>
            <Text style={styles.doctorRole}>History Beginning</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.summaryCardOuter}
          innerStyle={styles.summaryCardInner}
          borderRadius={14}
        >
          <View style={styles.patientTopRow}>
            <InnerShadowIcon
              size={44}
              icon={<Text style={styles.initials}>{PATIENT_INITIALS}</Text>}
            />
            <Text style={styles.patientName}>{PATIENT_NAME}</Text>
          </View>

          <Text style={styles.summaryText}>{SUMMARY_TEXT}</Text>

          <Text style={styles.subSectionTitle}>Diagnoses</Text>
          {DIAGNOSES.map((item) => (
            <Text key={item} style={styles.bulletText}>
              • {item}
            </Text>
          ))}

          <View style={styles.divider} />

          <Text style={styles.subSectionTitle}>Current Plan</Text>
          {CURRENT_PLAN.map((item) => (
            <Text key={item} style={styles.bulletText}>
              • {item}
            </Text>
          ))}
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Print"
            textStyle={styles.outlineBtnText}
            onPress={() => { }}
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Email Patient"
            textStyle={styles.outlineBtnText}
            onPress={() => { }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GenerateSummary;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  doctorCardOuter: { width: "100%" },
  doctorCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doctorTextCol: { flex: 1, minWidth: 0 },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  doctorRole: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  summaryCardOuter: { width: "100%", marginTop: 16 },
  summaryCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  patientTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  subSectionTitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  bulletText: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 19,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 4,
  },
  actionsRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    minWidth: 0,
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
});
