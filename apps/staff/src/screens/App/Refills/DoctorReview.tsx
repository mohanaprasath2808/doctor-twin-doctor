import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import WarningTriangleIcon from "../../../assets/icon/warningTriangleYellow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { getInitials } from "../../../constants/constant";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const HEADER_H = 52;
const BG = COLORS.INNER_SURFACE;
const PATIENT_NAME = "Sarah Williams";

const DoctorReview = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 18) + 12;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { minHeight: HEADER_H }]}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Doctor Review</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          borderRadius={10}
          backgroundColor="#FFF8E8"
          outerStyle={styles.warningCardOuter}
          innerStyle={styles.warningCardInner}
        >
          <InnerShadowIcon
            size={44}
            radius={22}
            icon={<WarningTriangleIcon width={18} height={18} />}
          />
          <Text style={styles.warningText}>Clinical review recommend before refill</Text>
        </NeumorphicCard>

        <NeumorphicCard
          borderRadius={10}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.reviewCardOuter}
          innerStyle={styles.reviewCardInner}
        >
          <View style={styles.doctorRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={44} containerSize={50} />
            <View style={styles.doctorText}>
              <Text style={styles.doctorName}>Dr.Soliman</Text>
              <Text style={styles.doctorMeta}>Close all</Text>
            </View>
            <DeltaBadge
              value="Critical"
              height={26}
              radius={13}
              bgColor="#FDECEC"
              darkShadowColor="#F2CACA"
              lightShadowColor="#F2CACA"
              textColor={COLORS.ALERT}
              textStyle={styles.badgeText}
            />
          </View>

          <View style={styles.patientRow}>
            <InnerShadowIcon
              size={44}
              radius={22}
              icon={<Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>}
            />
            <View style={styles.patientText}>
              <Text style={styles.patientName}>{PATIENT_NAME}</Text>
              <Text style={styles.patientMeta}>Female  •  Age 45</Text>
            </View>
          </View>

          <Text style={styles.medicationText}>
            <Text style={styles.medicationStrong}>Lipitor </Text>
            20 mg <Text style={styles.medicationMuted}>#90 tablet</Text>
          </Text>
          <Text style={styles.visitText}>Last Visit: 3 months ago</Text>

          <View style={styles.divider} />

          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.riskOuter}
            contentStyle={styles.riskInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.riskText}>
              <Text style={styles.riskLabel}>Risk Note: </Text>
              Low Potassium levels 4 months old
            </Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <View style={styles.messageRow}>
          <InnerShadowIcon
            size={42}
            radius={21}
            icon={<Text style={styles.messageInitials}>{getInitials(PATIENT_NAME)}</Text>}
          />
          <InsightMessageCard
            subTitle="Recommend prior class revier from clinical review"
            bgColor="#CBF0FF"
            subTitleStyle={styles.insightBody}
          />
        </View>

        <View style={styles.actionRow}>
          <View style={styles.actionHalf}>
            <ReusableButton
              title="Send to MD"
              height={50}
              borderRadius={25}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() => { }}
            />
          </View>
          <View style={styles.actionHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={50}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Mark as review"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
        </View>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            title="Refill approved safely"
            subTitle="The Prescription is ready to approved"
            bgColor="#CBF0FF"
            titleStyle={styles.insightTitle}
            subTitleStyle={styles.insightBody}
            titleSubTitleGap={4}
          />
        </View>

        <View style={styles.actionRow}>
          <View style={styles.actionHalf}>
            <ReusableButton
              title="Send RX"
              height={50}
              borderRadius={25}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() => { }}
            />
          </View>
          <View style={styles.actionHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={50}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Modify"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorReview;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
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
  warningCardOuter: {
    width: "100%",
    marginTop: 10,
    marginBottom: 18,
  },
  warningCardInner: {
    minHeight: 54,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  warningText: {
    flex: 1,
    minWidth: 0,
    color: COLORS.TEXT_70,
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Medium",
  },
  reviewCardOuter: { width: "100%" },
  reviewCardInner: { paddingHorizontal: 10, paddingVertical: 12 },
  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  doctorText: { flex: 1, minWidth: 0 },
  doctorName: { fontSize: 16, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  doctorMeta: { marginTop: 4, fontSize: 13, fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_60 },
  badgeText: { fontSize: 11, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  initials: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  patientText: { flex: 1, minWidth: 0 },
  patientName: { fontSize: 15, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  patientMeta: { marginTop: 3, fontSize: 12, fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_60 },
  medicationText: { marginTop: 14, fontSize: 15, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_80 },
  medicationStrong: { fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  medicationMuted: { color: COLORS.TEXT_60 },
  visitText: { marginTop: 5, fontSize: 13, fontWeight: "500", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_70 },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 16,
  },
  riskOuter: { width: "100%" },
  riskInner: {
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
  },
  riskText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", lineHeight: 19 },
  riskLabel: { color: COLORS.TEXT_DARK, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  messageRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  messageInitials: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  insightTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    lineHeight: 20,
  },
  insightBody: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Medium",
    lineHeight: 20,
  },
  actionRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  actionHalf: {
    flex: 1,
    minWidth: 0,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
