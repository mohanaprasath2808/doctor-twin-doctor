import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import ClockWithCalendarIcon from "../../../assets/icon/schedulingIcon.svg";
import YellowConicalIcon from "../../../assets/icon/yellowConicalIcon.svg";
import RedPillIcon from "../../../assets/icon/redPillIcon.svg";
import GreenPillIcon from "../../../assets/icon/greenPillIcon.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { getInitials } from "../../../constants/constant";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import OrbitCluster, { OrbitClusterNode } from "../Labs/components/OrbitCluster";


const HEADER_H = 52;
const BG = COLORS.INNER_SURFACE;
const REFILL_PATIENT_NAME = "Sarah Williams";

type RefillNode = OrbitClusterNode & {
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  iconColor: string;
  badge?: string;
};

const REFILL_NODES: RefillNode[] = [
  {
    id: "john-miller",
    label: "John Miller",
    subLabel: "Hydrochlorothiazide\n1 month ago",
    icon: <GreenPillIcon width={24} height={24} />,
    iconColor: COLORS.PRIMARY,
    figmaLeft: 22,
    figmaTop: 50,
    figmaWrapW: 110,
  },
  {
    id: "susan-reed",
    label: "Susan Reed",
    subLabel: "Lisinopril 20 mg\n1 week, Low",
    icon: <RedPillIcon width={24} height={24} />,
    iconColor: COLORS.ALERT,
    badge: "1",
    figmaLeft: 296,
    figmaTop: 50,
    figmaWrapW: 104,
  },
  {
    id: "david-myers",
    label: "David Myers",
    subLabel: "Levothyroxine\n2 month ago",
    icon: <RedPillIcon width={24} height={24} />,
    iconColor: COLORS.ALERT,
    badge: "1",
    figmaLeft: 34,
    figmaTop: 235,
    figmaWrapW: 110,
  },
  {
    id: "scheduling",
    label: "Scheduling",
    subLabel: "New Lab pending\n1 week ago",
    icon: <ClockWithCalendarIcon width={24} height={24} />,
    iconColor: COLORS.PRIMARY,
    figmaLeft: 276,
    figmaTop: 235,
    figmaWrapW: 110,
  },
  {
    id: "lisa-thompson",
    label: "Lisa Thompson",
    subLabel: "New Labs pending\n1 week ago",
    icon: <YellowConicalIcon width={24} height={24} />,
    iconColor: "#D49A1E",
    figmaLeft: 152,
    figmaTop: 292,
    figmaWrapW: 116,
  },
];

function RefillsDetailCard({
  onClose,
  onApprove,
  onSendToMd,
  onMessagePatient,
  onAssignNurse,
  onRequestLabs,
}: {
  onClose: () => void;
  onApprove: () => void;
  onSendToMd: () => void;
  onMessagePatient: () => void;
  onAssignNurse: () => void;
  onRequestLabs: () => void;
}) {
  return (
    <View style={cardSt.wrap}>
      <NeumorphicCard
        borderRadius={10}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={cardSt.cardOuter}
        innerStyle={cardSt.cardInner}
      >
        <View style={cardSt.headerRow}>
          <InnerShadowIcon
            size={44}
            radius={22}
            icon={<Text style={cardSt.initials}>{getInitials(REFILL_PATIENT_NAME)}</Text>}
          />
          <View style={cardSt.headerText}>
            <View style={cardSt.nameRow}>
              <Text style={cardSt.patientName} numberOfLines={1}>
                {REFILL_PATIENT_NAME}
              </Text>
              <DeltaBadge
                value="Critical"
                height={26}
                radius={13}
                bgColor="#FDECEC"
                darkShadowColor="#F2CACA"
                lightShadowColor="#F2CACA"
                textColor={COLORS.ALERT}
                textStyle={cardSt.badgeText}
              />
            </View>
            <Text style={cardSt.meta}>Female - Age 45</Text>
          </View>
          <IconComponent
            icon={<MaterialCommunityIcons name="close" size={18} color={COLORS.TEXT_DARK} />}
            width={40}
            height={40}
            radius={20}
            onPress={onClose}
          />
        </View>

        <Text style={cardSt.medicationText}>
          <Text style={cardSt.medicationStrong}>Lipitor </Text>
          20 mg <Text style={cardSt.medicationMuted}>#90 tablet</Text>
        </Text>
        <Text style={cardSt.visitText}>Last Visit: 3 months ago</Text>

        <View style={cardSt.divider} />

        <NeumorphicInnerShadowCard
          borderRadius={10}
          containerStyle={cardSt.riskOuter}
          contentStyle={cardSt.riskInner}
          darkShadowColor={COLORS.DARK_SHADOW}
          lightShadowColor={COLORS.LIGHT_SHADOW}
        >
          <Text style={cardSt.riskText}>
            <Text style={cardSt.riskLabel}>Risk Note: </Text>
            Low Potassium levels could cause heart issues or muscles weakness. Labs were 4 months old with your last
            refills request
          </Text>
        </NeumorphicInnerShadowCard>

        <View style={cardSt.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle="This could lead to heart palpitations or weakness. It would be safer to review her last labs before refilling"
            bgColor="#CBF0FF"
            subTitleStyle={cardSt.insightBody}
          />
        </View>

        <View style={cardSt.divider} />

        <View style={cardSt.actionGrid}>
          <View style={cardSt.gridThird}>
            <ReusableButton
              title="Approve"
              height={40}
              borderRadius={20}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={onApprove}
              textStyle={cardSt.fillButtonText}
            />
          </View>
          <View style={cardSt.gridThird}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={40}
              borderRadius={20}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Send to MD"
              textStyle={cardSt.outlineBtnText}
              onPress={onSendToMd}
            />
          </View>
          <View style={cardSt.gridThird}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={40}
              borderRadius={20}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Request Labs"
              textStyle={cardSt.outlineBtnText}
              onPress={onRequestLabs}
            />
          </View>
          <View style={cardSt.gridHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={40}
              borderRadius={20}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Message Patient"
              textStyle={cardSt.outlineBtnText}
              onPress={onMessagePatient}
            />
          </View>
          <View style={cardSt.gridHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={40}
              borderRadius={20}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Assign Nurse"
              textStyle={cardSt.outlineBtnText}
              onPress={onAssignNurse}
            />
          </View>
        </View>
      </NeumorphicCard>
    </View>
  );
}

const Refills = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [showDetail, setShowDetail] = useState(true);
  const { width: sw, height: sh } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availH = sh - insets.top - insets.bottom - HEADER_H;
  const orbitH = Math.round(availH * 0.56);
  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={scrSt.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        style={scrSt.scroll}
        contentContainerStyle={[scrSt.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[scrSt.header, { minHeight: HEADER_H }]}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={scrSt.headerTitle}>Refills</Text>
          <View style={scrSt.headerBellWrap}>
            <IconComponent
              icon={<MaterialCommunityIcons name="bell-outline" size={20} color={COLORS.TEXT_DARK} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => { }}
            />
            <View style={scrSt.bellDot} />
          </View>
        </View>

        <OrbitCluster
          orbitH={orbitH}
          sw={sw}
          nodes={REFILL_NODES}
          centerLabel="Dr.Twin"
          centerImageSource={DoctorTempImage}
          centerOverlaySource={OverlayImage}
          centerLabelStyle={styles.drTwinLabel}
          renderNode={({ node, sx, btnSize }) => {
            const iconSize = Math.round(26 * sx);
            const innerD = Math.round(btnSize * 0.82);

            return (
              <>
                <NeumorphicQuickActionTile
                  onPress={() => setShowDetail(true)}
                  icon={node.icon}
                  label={node.label}
                  badge={node.badge}
                  outerDiameter={btnSize}
                  innerShadowDiameter={innerD}
                  innerShadowBorderRadius={Math.round(innerD / 2)}
                  containerStyle={styles.quickTileContainer}
                  badgeTextStyle={{
                    fontSize: Math.round(9 * sx),
                    fontWeight: "700",
                    fontFamily: "SF-Pro-Display-Semibold",
                  }}
                />
                <Text style={styles.nodeSubLabel} numberOfLines={2}>
                  {node.subLabel}
                </Text>
              </>
            );
          }}
        />

        {showDetail ? (
          <RefillsDetailCard
            onClose={() => setShowDetail(false)}
            onApprove={() => navigation.navigate(navigationStrings.REFILLS_CONFIRM)}
            onSendToMd={() => navigation.navigate(navigationStrings.REFILLS_DOCTOR_REVIEW)}
            onMessagePatient={() => navigation.navigate(navigationStrings.REFILLS_MESSAGE_PATIENT)}
            onAssignNurse={() => navigation.navigate(navigationStrings.REFILLS_ASSIGN_NURSE)}
            onRequestLabs={() => navigation.navigate(navigationStrings.REFILLS_REQUEST_LABS)}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Refills;

const styles = StyleSheet.create({
  drTwinLabel: {
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  quickTileContainer: {
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  nodeSubLabel: {
    marginTop: 2,
    lineHeight: 15,
    fontSize: 11,
    fontFamily: "SF-Pro-Display-Regular",
    color: COLORS.TEXT_60,
    textAlign: "center",
  },
});

const scrSt = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 4,
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
  headerBellWrap: {
    position: "relative",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.ALERT,
  },
});

const cardSt = StyleSheet.create({
  wrap: { marginTop: 18, paddingHorizontal: 14, paddingBottom: 4 },
  cardOuter: { width: "100%" },
  cardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  initials: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  headerText: { flex: 1, minWidth: 0 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  patientName: { fontSize: 15, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK, flexShrink: 1 },
  meta: { marginTop: 3, fontSize: 12, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_60 },
  badgeText: { fontSize: 11, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  medicationText: { marginTop: 10, fontSize: 15, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_80 },
  medicationStrong: { fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  medicationMuted: { color: COLORS.TEXT_60 },
  visitText: { marginTop: 6, fontSize: 13, fontWeight: "500", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_70 },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 16,
  },
  riskOuter: { width: "100%" },
  riskInner: { minHeight: 76, paddingHorizontal: 12, paddingVertical: 12, justifyContent: "center" },
  riskText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", lineHeight: 19 },
  riskLabel: { color: COLORS.TEXT_DARK, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  messageRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  insightBody: {
    color: COLORS.TEXT_80,
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 18,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  gridThird: { width: "31%", minWidth: 0 },
  gridHalf: { width: "48%", minWidth: 0 },
  outlineBtnText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Medium" },
  fillButtonText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
