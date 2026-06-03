import React, { useCallback, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import BMI from "../../../../assets/icon/bmiIcon.svg";
import HeartWithInHandsIcon from "../../../../assets/icon/heartWithInHands.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import WeightScaleIcon from "../../../../assets/icon/weightScale.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InnerShadowView from "../../../../neomorphism/InnerShadowView";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const PATIENT_NAME = "Sarah Williams";
const BADGE_H = 28;
const BADGE_R = BADGE_H / 2;

function ConditionBadge({ label }: { label: string }) {
  const [box, setBox] = useState({ w: 0, h: BADGE_H });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox((prev) =>
      prev.w === width && prev.h === height ? prev : { w: width, h: height },
    );
  }, []);

  return (
    <View style={styles.badgeShell} onLayout={onLayout}>
      {box.w > 0 && box.h > 0 ? (
        <View style={styles.badgeShadow} pointerEvents="none">
          <InnerShadowView
            width={box.w}
            height={box.h}
            borderRadius={BADGE_R}
            color={COLORS.SURFACE}
          />
        </View>
      ) : null}
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function ClinicalRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label?: string;
  value: string;
}) {
  return (
    <View style={styles.clinicalRow}>
      <InnerShadowIcon icon={icon} size={40} />
      <View style={styles.clinicalTextCol}>
        {label ? <Text style={styles.clinicalLabel}>{label}</Text> : null}
        <Text style={styles.clinicalValue}>{value}</Text>
      </View>
    </View>
  );
}

const PriorAuthorization = () => {
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
          <Text style={styles.headerTitle}>Prior Authorization</Text>
          <View style={styles.headerSpacer} />
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

          <ConditionBadge label="Obesity" />

          <View style={styles.divider} />

          <View style={styles.metricsRow}>
            <View style={styles.metricCell}>
              <InnerShadowIcon icon={<BMI width={18} height={18} />} size={40} />
              <Text style={styles.metricValue}>42 BMI</Text>
            </View>
            <View style={styles.metricCell}>
              <InnerShadowIcon
                icon={<WeightScaleIcon width={18} height={18} />}
                size={40}
              />
              <Text style={styles.metricValue}>265 lbs Current Weight</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <ClinicalRow
            icon={<HeartWithInHandsIcon width={18} height={18} />}
            value="Failed lifestyle change x 6 months"
          />

          <View style={styles.divider} />

          <ClinicalRow
            icon={<CapsuleIcon width={18} height={18} />}
            value="Zepbound (tirzepatide)"
          />

          <View style={styles.divider} />

          <Text style={styles.assistantHeading}>Twin Intelligence Assistant</Text>
          <View style={styles.assistantRow}>
            <DoctorAvatar
              source={DoctorTempImage}
              imageSize={38}
              containerSize={44}
            />
            <View style={styles.assistantTextCol}>
              <Text style={styles.assistantNoteTitle}>
                <Text style={styles.assistantBold}>Zepbound</Text> (tirzepatide){" "}
                <Text style={styles.assistantBold}>PA note:</Text>
              </Text>
              <Text style={styles.assistantNoteBody}>
                Sarah Williams, 47, BMI 42. Pt is history of Obesity and Obstructive
                sleep apnea. Failed 6 month medically supervised diet and exercise
                trial
              </Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <AppButton
              activeOpacity={0.8}
              style={styles.actionBtnBase}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              text="Revise"
              textStyle={styles.outlineBtnText}
              onPress={() =>
                navigation.navigate(navigationStrings.EDIT_PRIOR_AUTHORIZATION)
              }
            />
            <ReusableButton
              title="Sign & Submit"
              height={48}
              borderRadius={24}
              containerStyle={styles.signBtnWrap}
              textStyle={styles.signBtnText}
              onPress={() =>
                navigation.navigate(navigationStrings.PRIOR_AUTHORIZATION_SUBMITTED)
              }
            />
          </View>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriorAuthorization;

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
  cardOuter: { width: "100%", marginTop: 16 },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
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
  badgeShell: {
    alignSelf: "flex-start",
    minWidth: 72,
    paddingHorizontal: 14,
    height: BADGE_H,
    borderRadius: BADGE_R,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeShadow: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metricCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
  },
  metricValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  clinicalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  clinicalTextCol: { flex: 1, minWidth: 0 },
  clinicalLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  clinicalValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  assistantHeading: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.TEXT_60,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  assistantRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  assistantTextCol: { flex: 1, minWidth: 0 },
  assistantNoteTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  assistantBold: {
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  assistantNoteBody: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 19,
    fontFamily: "SF-Pro-Display-Regular",
  },
  actionsRow: {
    marginTop: 4,
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
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
  signBtnWrap: { flex: 1, minWidth: 0 },
  signBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
