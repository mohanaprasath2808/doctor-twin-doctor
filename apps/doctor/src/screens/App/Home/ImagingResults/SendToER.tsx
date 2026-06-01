import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import { COLORS } from "../../../../constants/theme";
import { getInitials, openPhoneDialer } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";

const PATIENT_NAME = "Sarah Williams";
const PATIENT_PHONE = "+15551234567";

const SendToER = () => {
  const navigation = useNavigation<any>();
  const [notifyEmergencyContact, setNotifyEmergencyContact] = useState(true);
  const [symptomsAcknowledged, setSymptomsAcknowledged] = useState(true);

  const canConfirm = symptomsAcknowledged;

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
          <Text style={styles.headerTitle}>Send to ER</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={14}
        >
          <View style={styles.patientTopRow}>
            <InnerShadowIcon
              size={44}
              icon={
                <Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>
              }
            />
            <View style={styles.patientTextCol}>
              <Text style={styles.patientName}>{PATIENT_NAME}</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>
          <Text style={styles.recommendationText}>
            Recommend immediate ER evaluation for possible cancer risk due to left
            kidney mass on imaging.
          </Text>
        </NeumorphicCard>

        <View style={styles.communicationRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.communicationBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Call Sarah Williams"
            textStyle={styles.primaryOutlineBtnText}
            onPress={() => openPhoneDialer(PATIENT_PHONE)}
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.communicationBtn}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={COLORS.SURFACE}
            text="Send ER Instructions"
            textStyle={styles.alertOutlineBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.ER_INSTRUCTIONS_SENT)
            }
          />
        </View>

        <NeumorphicCard
          outerStyle={styles.optionsCardOuter}
          innerStyle={styles.optionsCardInner}
          borderRadius={14}
        >
          <View style={styles.switchRow}>
            <Text style={styles.optionLabel}>
              Notify Patient&apos;s emergency contact?
            </Text>
            <NeumorphicSwitch
              value={notifyEmergencyContact}
              onValueChange={setNotifyEmergencyContact}
            />
          </View>
          <View style={styles.optionsDivider} />
          <Pressable
            style={styles.checkboxRow}
            onPress={() => setSymptomsAcknowledged((prev) => !prev)}
          >
            <NeumorphicCheckboxMark selected={symptomsAcknowledged} />
            <Text style={styles.checkboxLabel}>
              I have instructed the patient to call 911 if symptoms worsen
            </Text>
          </Pressable>
        </NeumorphicCard>

        <View style={styles.footerActionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.footerBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Cancel"
            textStyle={styles.primaryOutlineBtnText}
            onPress={() => navigation.goBack()}
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.footerBtnBase}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={COLORS.SURFACE}
            text="Confirm and Send"
            textStyle={styles.alertOutlineBtnText}
            disabled={!canConfirm}
            onPress={() =>
              navigation.navigate(navigationStrings.ER_INSTRUCTIONS_SENT)
            }
          />
        </View>

        <Text style={styles.referenceLog}>
          Reference log GGH78292 22 Apr 2023 03:11 PM
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendToER;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  patientCardOuter: { width: "100%", marginTop: 16 },
  patientCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  patientTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientTextCol: { flex: 1, minWidth: 0 },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  recommendationText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  communicationRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  communicationBtn: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    minWidth: 0,
  },
  primaryOutlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
  alertOutlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.ALERT,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
  optionsCardOuter: { width: "100%", marginTop: 16 },
  optionsCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  optionsDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  footerActionsRow: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  footerBtnBase: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    minWidth: 0,
  },
  referenceLog: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
});
