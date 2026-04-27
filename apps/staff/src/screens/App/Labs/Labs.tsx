import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import WarningTriangleIcon from "../../../assets/icon/warningTriangleYellow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import DeltaBadge from "../../../components/Common/DeltaBadge";
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
import OrbitCluster, { OrbitClusterNode } from "./components/OrbitCluster";

const HEADER_H = 52;
const BG = COLORS.INNER_SURFACE;
const LAB_PATIENT_NAME = "Brian Carter";

type NodeKey = "critical" | "lowPotassium" | "hba1c" | "pending" | "elevated";

type LabsNode = OrbitClusterNode & {
  label: string;
  subLabel: string;
  badge?: string;
  iconColor: string;
  key: NodeKey;
};

const LABS_NODES: LabsNode[] = [
  {
    id: "1",
    label: "Brian Carter",
    subLabel: "Elevated ALT / AST",
    iconColor: "#1A7A4A",
    key: "elevated",
    figmaLeft: 20,
    figmaTop: 50,
    figmaWrapW: 110,
  },
  {
    id: "2",
    label: "Susan Reed",
    subLabel: "Low Potassium",
    badge: "1",
    iconColor: "#E05B6E",
    key: "lowPotassium",
    figmaLeft: 296,
    figmaTop: 50,
    figmaWrapW: 100,
  },
  {
    id: "3",
    label: "Henry Patel",
    subLabel: "High HbA1c",
    badge: "1",
    iconColor: "#E05B6E",
    key: "hba1c",
    figmaLeft: 50,
    figmaTop: 235,
    figmaWrapW: 95,
  },
  {
    id: "4",
    label: "Maria Gonzalez",
    subLabel: "Labs Pending",
    iconColor: "#D49A1E",
    key: "pending",
    figmaLeft: 266,
    figmaTop: 235,
    figmaWrapW: 114,
  },
  {
    id: "5",
    label: "Brian Carter",
    subLabel: "Elevated ALT / AST",
    iconColor: "#1A7A4A",
    key: "critical",
    figmaLeft: 167,
    figmaTop: 292,
    figmaWrapW: 86,
  },
];

function LabsDetailCard({
  onClose,
  onNotifyPatient,
  onAssignNurse,
  onScheduleVisit,
  onEscalate,
}: {
  onClose: () => void;
  onNotifyPatient: () => void;
  onAssignNurse: () => void;
  onScheduleVisit: () => void;
  onEscalate: () => void;
}) {
  return (
    <View style={cardSt.wrap}>
      <NeumorphicCard
        borderRadius={10}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={cardSt.cardOuter}
        innerStyle={cardSt.cardInner}
      >
        <View style={cardSt.row}>
          <InnerShadowIcon
            size={40}
            icon={<Text style={cardSt.initials}>{getInitials(LAB_PATIENT_NAME)}</Text>}
          />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={cardSt.patName} numberOfLines={1}>
              {LAB_PATIENT_NAME}
            </Text>
            <Text style={cardSt.timeSub}>Female • Age 45</Text>
          </View>
          <DeltaBadge
            value="Critical"
            height={28}
            radius={14}
            bgColor="#FDECEC"
            darkShadowColor="#F2CACA"
            lightShadowColor="#F2CACA"
            textColor="#FF6B6B"
            textStyle={cardSt.badgeText}
          />
          <IconComponent
            icon={<MaterialCommunityIcons name="close" size={18} color={COLORS.TEXT_DARK} />}
            width={40}
            height={40}
            radius={20}
            onPress={onClose}
          />
        </View>

        <Text style={cardSt.labTitle}>Elevated ALT / AST</Text>
        <View style={cardSt.valueRow}>
          <View style={cardSt.valueTextWrap}>
            <Text style={cardSt.valueText}>
              142 U/L <Text style={cardSt.valueRange}>(7 - 55)</Text>
            </Text>
            <Text style={cardSt.metricLabel}>ALT</Text>
          </View>
          <View style={cardSt.valueTextWrap}>
            <Text style={cardSt.valueText}>
              96 U/L <Text style={cardSt.valueRange}>(8 - 48)</Text>
            </Text>
            <Text style={cardSt.metricLabel}>AST</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <NeumorphicInnerShadowCard
          borderRadius={10}
          containerStyle={cardSt.riskTextOuter}
          contentStyle={cardSt.riskTextInner}
          darkShadowDx={4}
          darkShadowDy={4}
          darkShadowBlur={14}
          darkShadowColor={COLORS.DARK_SHADOW}
          lightShadowDx={-4}
          lightShadowDy={-4}
          lightShadowBlur={9}
          lightShadowColor={COLORS.LIGHT_SHADOW}
        >
          <View style={cardSt.riskTitleRow}>
            <InnerShadowIcon
              size={36}
              radius={114}
              icon={<WarningTriangleIcon width={14} height={14} />}
            />
            <View style={cardSt.riskTextContent}>
              <Text style={cardSt.riskTitle}>Risk Interpretation</Text>
              <Text style={cardSt.riskText}>
                Results indicate likely liver inflammation. Brian should stop Tylenol immediately to prevent further
                damage.
              </Text>
            </View>
          </View>

        </NeumorphicInnerShadowCard>

        <View style={cardSt.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle="I suggest notifying Brian about his test results and scheduling a visit to assess possible liver damage"
            bgColor="#CBF0FF"
            subTitleStyle={cardSt.insightBody}
          />
        </View>

        <View style={cardSt.actionGrid}>
          <View style={cardSt.gridHalf}>
            <ReusableButton
              title="Notify Patient"
              height={40}
              borderRadius={20}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={onNotifyPatient}
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
          <View style={cardSt.gridHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={40}
              borderRadius={20}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Schedule Visit"
              textStyle={cardSt.outlineBtnText}
              onPress={onScheduleVisit}
            />
          </View>
          <View style={cardSt.gridHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={40}
              borderRadius={20}
              borderWidth={1}
              borderColor="#E05B6E"
              bgColor={COLORS.INNER_SURFACE}
              text="Escalate"
              textStyle={[cardSt.outlineBtnText, { color: "#E05B6E" }]}
              onPress={onEscalate}
            />
          </View>
        </View>
      </NeumorphicCard>
    </View>
  );
}

const Labs = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [showDetail, setShowDetail] = useState(true);
  const { width: sw, height: sh } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availH = sh - insets.top - insets.bottom - HEADER_H;
  const orbitH = Math.round(availH * 0.54);
  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }} edges={["top", "left", "right", "bottom"]}>
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
          <Text style={scrSt.headerTitle}>Labs</Text>
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
          nodes={LABS_NODES}
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
                  icon={<MaterialCommunityIcons name="flask-outline" size={iconSize} color={node.iconColor} />}
                  label={node.label}
                  badge={node.badge}
                  outerDiameter={btnSize}
                  innerShadowDiameter={innerD}
                  innerShadowBorderRadius={Math.round(innerD / 2)}
                  containerStyle={styles.quickTileContainer}
                  badgeTextStyle={{ fontSize: Math.round(9 * sx), fontWeight: "700" }}
                />
                <Text style={styles.nodeSubLabel} numberOfLines={1}>{node.subLabel}</Text>
              </>
            );
          }}
        />

        {showDetail ? (
          <LabsDetailCard
            onClose={() => setShowDetail(false)}
            onNotifyPatient={() => navigation.navigate(navigationStrings.LABS_NOTIFY_PATIENT)}
            onAssignNurse={() => navigation.navigate(navigationStrings.LABS_ASSIGN_NURSE)}
            onScheduleVisit={() => navigation.navigate(navigationStrings.LABS_SCHEDULE_VISIT)}
            onEscalate={() => navigation.navigate(navigationStrings.LABS_ESCALATE_MESSAGE)}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Labs;

const styles = StyleSheet.create({
  drTwinLabel: {
    marginTop: 5,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  quickTileContainer: {
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  nodeSubLabel: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.TEXT_60,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 16,
  },
});

const scrSt = StyleSheet.create({
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
    backgroundColor: "#E05B6E",
  },
});

const cardSt = StyleSheet.create({
  wrap: { marginTop: 30, paddingHorizontal: 14, paddingBottom: 4 },
  cardOuter: { width: "100%" },
  cardInner: { paddingHorizontal: 14, paddingVertical: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  initials: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  patName: { fontSize: 16, fontWeight: "600", color: COLORS.TEXT_DARK },
  timeSub: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  labTitle: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK, marginTop: 16 },
  valueRow: { flexDirection: "row", gap: 40, marginTop: 10 },
  valueTextWrap: {},
  valueText: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_DARK },
  valueRange: { fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  metricRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  metricLabel: { fontSize: 14, color: COLORS.TEXT_60, width: "50%" },
  riskOuter: { marginBottom: 12 },
  riskInner: { paddingHorizontal: 12, paddingVertical: 10 },
  riskTitleRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  riskTextContent: { width: "99%" },
  riskTitle: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  riskTextOuter: { width: "100%" },
  riskTextInner: { minHeight: 54, paddingHorizontal: 12, paddingVertical: 10, justifyContent: "center" },
  riskText: { width: "90%", marginTop: 4, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_80, lineHeight: 16 },
  messageRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 14,
  },
  insightBody: {
    color: COLORS.TEXT_80,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  gridHalf: { width: "48%", minWidth: 0 },
  outlineBtnText: { color: COLORS.PRIMARY, fontSize: 13, fontWeight: "600" },
});
