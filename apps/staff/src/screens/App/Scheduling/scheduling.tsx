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
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { getInitials } from "../../../constants/constant";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import OrbitCluster, { OrbitClusterNode } from "../Labs/components/OrbitCluster";

/* ─────────────────────────────────────────────
   Figma source dimensions (px)
   Screen width : 414
   Orbit top    : y = 90  (after header)
   Orbit height : 410     (y=90 → y=500)
   ───────────────────────────────────────────── */
const HEADER_H = 52;

const BG = COLORS.INNER_SURFACE;

type QuickIconKey = "cancellation" | "noShows" | "urgent" | "pending";

/** Same figma positions as former `PATIENTS` entries [0,2,1,3] — orbit layout unchanged. */
type QuickActionSlot = {
  id: string;
  label: string;
  badge?: string;
  iconKey: QuickIconKey;
} & OrbitClusterNode;

const QUICK_ACTIONS: QuickActionSlot[] = [
  {
    id: "1",
    label: "Cancellation",
    badge: "2",
    iconKey: "cancellation",
    figmaLeft: 16,
    figmaTop: 50,
    figmaWrapW: 107,
  },
  {
    id: "2",
    label: "No Shows",
    badge: "1",
    iconKey: "noShows",
    figmaLeft: 304,
    figmaTop: 50,
    figmaWrapW: 85,
  },
  {
    id: "3",
    label: "Urgent Openings",
    badge: "1",
    iconKey: "urgent",
    figmaLeft: 45,
    figmaTop: 240,
    figmaWrapW: 107,
  },
  {
    id: "4",
    label: "Pending Approvals",
    badge: "1",
    iconKey: "pending",
    figmaLeft: 260,
    figmaTop: 240,
    figmaWrapW: 90,
  },
];

const SCHEDULE_PATIENT_NAME = "Brian Carter";

function quickActionIcon(key: QuickIconKey, size: number) {
  switch (key) {
    case "cancellation":
      return <MaterialCommunityIcons name="calendar-remove" size={size} color="#E05B6E" />;
    case "noShows":
      return <MaterialCommunityIcons name="hand-heart" size={size} color="#1A7A4A" />;
    case "urgent":
      return <MaterialCommunityIcons name="calendar-alert" size={size} color="#E05B6E" />;
    case "pending":
      return <MaterialCommunityIcons name="clock-outline" size={size} color="#D49A1E" />;
    default:
      return <MaterialCommunityIcons name="calendar" size={size} color={COLORS.PRIMARY} />;
  }
}

function SchedulingQuickActionNode({
  slot,
  sx,
  btnSize,
  onPress,
}: {
  slot: QuickActionSlot;
  sx: number;
  btnSize: number;
  onPress: () => void;
}) {
  const iconSize = Math.round(28 * sx);
  const innerD = Math.round(btnSize * 0.82);

  return (
    <NeumorphicQuickActionTile
      onPress={onPress}
      icon={quickActionIcon(slot.iconKey, iconSize)}
      label={slot.label}
      badge={slot.badge}
      outerDiameter={btnSize}
      innerShadowDiameter={innerD}
      innerShadowBorderRadius={Math.round(innerD / 2)}
      containerStyle={styles.quickTileContainer}
      badgeTextStyle={{
        fontSize: Math.round(9 * sx),
        fontWeight: "700",
        lineHeight: Math.round(11 * sx),
      }}
    />
  );
}

function PatientDetailCard({
  onClose,
  onFillSlot,
  onNotifyPatient,
  onAssign,
  onReschedule,
}: {
  onClose: () => void;
  onFillSlot: () => void;
  onNotifyPatient: () => void;
  onAssign: () => void;
  onReschedule: () => void;
}) {
  return (
    <View style={cardSt.wrap}>
      <NeumorphicCard
        borderRadius={20}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={cardSt.cardOuter}
        innerStyle={cardSt.cardInner}
      >
        <View style={cardSt.row}>
          <InnerShadowIcon
            size={40}
            icon={<Text style={cardSt.initials}>{getInitials(SCHEDULE_PATIENT_NAME)}</Text>}
          />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={cardSt.patName} numberOfLines={1}>
              {SCHEDULE_PATIENT_NAME}
            </Text>
            <Text style={cardSt.timeSub}>11:30 PM</Text>
          </View>
          <IconComponent
            icon={<MaterialCommunityIcons name="close" size={18} color={COLORS.TEXT_DARK} />}
            width={40}
            height={40}
            radius={20}
            onPress={onClose}
          />
        </View>

        <View style={cardSt.tagRow}>
          <InnerShadowPill label="Wellness Checkup" />
        </View>

        <View style={cardSt.divider} />

        <View style={cardSt.tagRow}>
          <InnerShadowPill
            label="Few slot"
            icon={<WarningTriangleIcon width={14} height={14} />}
            textStyle={cardSt.fewSlotLabel}
          />
        </View>

        <View style={cardSt.divider} />

        <View style={cardSt.suggestedRow}>
          <Text style={cardSt.suggestedLeft}>Suggested Move:</Text>
          <Text style={cardSt.suggestedRight} numberOfLines={1}>
            Sue cooper 4:13 PM
          </Text>
        </View>

        <View style={cardSt.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle={
              "I suggest notifying Brian about his test results and scheduling a visit to access possible liver damage"
            }
            bgColor="#CBF0FF"
            subTitleStyle={cardSt.insightBody}
          />
        </View>

        <View style={cardSt.actionGrid}>
          <View style={cardSt.gridHalf}>
            <ReusableButton
              title="Reschedule"
              height={40}
              borderRadius={20}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={onReschedule}
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
              text="Fill slot"
              textStyle={cardSt.outlineBtnText}
              onPress={onFillSlot}
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
              text="Notify patient"
              textStyle={cardSt.outlineBtnText}
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
              text="Assign"
              textStyle={cardSt.outlineBtnText}
              onPress={onAssign}
            />
          </View>
        </View>
      </NeumorphicCard>
    </View>
  );
}

const cardSt = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 14, paddingBottom: 4 },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  patName: { fontSize: 16, fontWeight: "600", color: COLORS.TEXT_DARK },
  timeSub: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  tagRow: { marginBottom: 8 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_10, marginVertical: 8 },
  fewSlotLabel: { fontWeight: "600", color: "#C53030" },
  suggestedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 10,
  },
  suggestedLeft: { fontSize: 13, fontWeight: "600", color: COLORS.TEXT_DARK },
  suggestedRight: { flex: 1, fontSize: 12, fontWeight: "500", color: COLORS.TEXT_70, textAlign: "right" },
  messageRow: {
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
  gridHalf: {
    width: "48%",
    minWidth: 0,
  },
  outlineBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 13,
    fontWeight: "600",
  },
});

export function Scheduling() {
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
          <Text style={scrSt.headerTitle}>Scheduling</Text>
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
          nodes={QUICK_ACTIONS}
          centerLabel="Dr.Twin"
          centerImageSource={DoctorTempImage}
          centerOverlaySource={OverlayImage}
          centerLabelStyle={styles.drTwinLabel}
          renderNode={({ node, sx, btnSize }) => (
            <SchedulingQuickActionNode
              slot={node}
              sx={sx}
              btnSize={btnSize}
              onPress={() => {
                if (node.iconKey === "cancellation") {
                  navigation.navigate(navigationStrings.SCHEDULING_CANCELLATION);
                  return;
                }
                if (node.iconKey === "noShows") {
                  navigation.navigate(navigationStrings.SCHEDULING_NO_SHOW);
                  return;
                }
                if (node.iconKey === "urgent") {
                  navigation.navigate(navigationStrings.SCHEDULING_URGENT_OPENING);
                  return;
                }
                if (node.iconKey === "pending") {
                  navigation.navigate(navigationStrings.SCHEDULING_PENDING_APPROVALS);
                  return;
                }
                setShowDetail(true);
              }}
            />
          )}
        />

        {showDetail ? (
          <PatientDetailCard
            onClose={() => setShowDetail(false)}
            onFillSlot={() => navigation.navigate(navigationStrings.SCHEDULING_FILL_SLOT)}
            onNotifyPatient={() => navigation.navigate(navigationStrings.SCHEDULING_NOTIFY_PATIENT)}
            onAssign={() => navigation.navigate(navigationStrings.SCHEDULING_ASSIGN_TASK)}
            onReschedule={() => navigation.navigate(navigationStrings.SCHEDULING_RESCHEDULE)}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

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
