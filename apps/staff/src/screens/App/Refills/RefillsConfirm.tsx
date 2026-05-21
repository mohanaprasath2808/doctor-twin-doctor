import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
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

const SAFETY_CHECKS = [
  "CVS Pharmacy",
  "Last visit recent",
  "Potassium levels acceptable",
  "No Interactions",
];

const RefillsConfirm = () => {
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
          <Text style={styles.headerTitle}>Refills Confirm</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          borderRadius={10}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
        >
          <View style={styles.patientRow}>
            <InnerShadowIcon
              size={44}
              radius={22}
              icon={<Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>}
            />
            <View style={styles.patientText}>
              <Text style={styles.patientName} numberOfLines={1}>
                {PATIENT_NAME}
              </Text>
              <Text style={styles.patientMeta}>Female  •  Age 45</Text>
            </View>
          </View>

          <Text style={styles.medicationText}>
            <Text style={styles.medicationStrong}>Lipitor </Text>
            20 mg <Text style={styles.medicationMuted}>#90 tablet</Text>
          </Text>

          <View style={styles.divider} />

          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.checkCardOuter}
            contentStyle={styles.checkCardInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            {SAFETY_CHECKS.map((item) => (
              <View key={item} style={styles.checkRow}>
                <MaterialCommunityIcons name="check-circle-outline" size={18} color={COLORS.PRIMARY} />
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

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

        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={50}
          borderRadius={25}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.INNER_SURFACE}
          text="Add Note"
          textStyle={styles.outlineButtonText}
          onPress={() => { }}
        />

        <View style={[styles.messageRow, styles.secondMessageRow]}>
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

        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={50}
          borderRadius={25}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.INNER_SURFACE}
          text="Add Note"
          textStyle={styles.outlineButtonText}
          style={styles.addNoteButton}
          onPress={() => { }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RefillsConfirm;

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
  patientCardOuter: { width: "100%", marginTop: 10 },
  patientCardInner: { paddingHorizontal: 10, paddingVertical: 12 },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  initials: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  patientText: { flex: 1, minWidth: 0 },
  patientName: { fontSize: 15, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  patientMeta: { marginTop: 3, fontSize: 12, fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_60 },
  medicationText: { marginTop: 12, fontSize: 15, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_80 },
  medicationStrong: { fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  medicationMuted: { color: COLORS.TEXT_60 },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 16,
  },
  checkCardOuter: { width: "100%" },
  checkCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  messageRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  secondMessageRow: {
    marginTop: 30,
  },
  insightTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    lineHeight: 20,
  },
  insightBody: {
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 20,
  },
  actionRow: {
    marginTop: 18,
    marginBottom: 18,
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
  addNoteButton: {
    marginTop: 18,
  },
});
