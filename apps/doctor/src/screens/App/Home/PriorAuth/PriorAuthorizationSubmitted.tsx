import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const PATIENT_NAME = "Sarah Williams";

const PriorAuthorizationSubmitted = () => {
  const navigation = useNavigation<any>();
  const [notifyPatient, setNotifyPatient] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [trackStatus, setTrackStatus] = useState(true);
  const [trackEnabled, setTrackEnabled] = useState(false);

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
          <Text style={styles.headerTitle}>Prior Authorization Submitted</Text>
        </View>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={14}
        >
          <View style={styles.patientTopRow}>
            <View style={styles.patientLeft}>
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
            <Text style={styles.timestamp}>06:44 PM</Text>
          </View>
          <Text style={styles.statusLine}>
            Prior authorization submitted to ims
          </Text>
          <Text style={styles.referenceLine}>Home: GGH78292</Text>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.optionsCardInner}
          borderRadius={14}
        >
          <View style={styles.optionRow}>
            <Pressable
              style={styles.optionLeft}
              onPress={() => setNotifyPatient((prev) => !prev)}
            >
              <NeumorphicCheckboxMark selected={notifyPatient} />
              <Text style={styles.optionLabel}>Notify Sarah Williams?</Text>
            </Pressable>
            <NeumorphicSwitch
              value={notifyEnabled}
              onValueChange={setNotifyEnabled}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.optionRow}>
            <Pressable
              style={styles.optionLeft}
              onPress={() => setTrackStatus((prev) => !prev)}
            >
              <NeumorphicCheckboxMark selected={trackStatus} />
              <Text style={styles.optionLabel}>Track PA Status automatically</Text>
            </Pressable>
            <NeumorphicSwitch
              value={trackEnabled}
              onValueChange={setTrackEnabled}
            />
          </View>
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Message Patient"
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.MESSAGE_PATIENT)}
          />
          <ReusableButton
            title="Done"
            height={48}
            borderRadius={24}
            containerStyle={styles.doneBtnWrap}
            textStyle={styles.doneBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.PA_STATUS_MONITOR)
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriorAuthorizationSubmitted;

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
  cardOuter: { width: "100%", marginTop: 16 },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
  },
  patientTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  patientLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 8,
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
  timestamp: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  statusLine: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Display-Regular",
  },
  referenceLine: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  optionsCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  optionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  actionsRow: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  actionBtnBase: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    minWidth: 0,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
  doneBtnWrap: { flex: 1, minWidth: 0 },
  doneBtnText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
