import React, { useState } from "react";
import { Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";

/* ─────────────────────────────────────────────
   Figma source dimensions (px)
   Screen width : 414
   Orbit top    : y = 90  (after header)
   Orbit height : 410     (y=90 → y=500)
   ───────────────────────────────────────────── */
const FW = 414;
const FOH = 410;
const HEADER_H = 52;

const BG = COLORS.SURFACE;

type QuickIconKey = "cancellation" | "noShows" | "urgent" | "pending";

/** Same figma positions as former `PATIENTS` entries [0,2,1,3] — orbit layout unchanged. */
type QuickActionSlot = {
  id: string;
  label: string;
  badge?: string;
  iconKey: QuickIconKey;
  figmaLeft: number;
  figmaTop: number;
  figmaWrapW: number;
};

const QUICK_ACTIONS: QuickActionSlot[] = [
  {
    id: "1",
    label: "Cancellation",
    badge: "2",
    iconKey: "cancellation",
    figmaLeft: 12,
    figmaTop: 50,
    figmaWrapW: 107,
  },
  {
    id: "2",
    label: "No Shows",
    badge: "1",
    iconKey: "noShows",
    figmaLeft: 309,
    figmaTop: 50,
    figmaWrapW: 85,
  },
  {
    id: "3",
    label: "Urgent Openings",
    badge: "1",
    iconKey: "urgent",
    figmaLeft: 18,
    figmaTop: 214,
    figmaWrapW: 107,
  },
  {
    id: "4",
    label: "Pending Approvals",
    badge: "1",
    iconKey: "pending",
    figmaLeft: 295,
    figmaTop: 214,
    figmaWrapW: 90,
  },
];

const RING_DIAMS = [298, 276, 254, 232, 210, 187, 165];

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

function OrbitSection({
  orbitH,
  sw,
  onNodePress,
}: {
  orbitH: number;
  sw: number;
  onNodePress: () => void;
}) {
  const sx = sw / FW;
  const sy = orbitH / FOH;

  const ringCx = sw / 2;
  const ringCy = Math.round(139 * sy);

  const docSize = Math.round(170 * sx);
  const docLeft = Math.round(122 * sx);
  const docTop = Math.round(54 * sy);
  const btnSize = Math.round(80 * sx);

  return (
    <View style={{ height: orbitH, position: "relative", overflow: "hidden" }}>
      {RING_DIAMS.map((d, i) => {
        const sd = Math.round(d * sx);
        return (
          <View
            key={i}
            pointerEvents="none"
            style={{
              position: "absolute",
              width: sd,
              height: sd,
              borderRadius: sd / 2,
              borderWidth: 1,
              borderColor: "#C8DCF0",
              opacity: 0.25 + i * 0.08,
              left: ringCx - sd / 2,
              top: ringCy - sd / 2,
            }}
          />
        );
      })}

      <DrTwinCard docSize={docSize} docLeft={docLeft} docTop={docTop} sx={sx} />

      {QUICK_ACTIONS.map((slot) => (
        <SchedulingQuickActionNode
          key={slot.id}
          slot={slot}
          sx={sx}
          sy={sy}
          btnSize={btnSize}
          onPress={onNodePress}
        />
      ))}
    </View>
  );
}

function DrTwinCard({
  docSize,
  docLeft,
  docTop,
  sx,
}: {
  docSize: number;
  docLeft: number;
  docTop: number;
  sx: number;
}) {
  const imgSize = Math.round(docSize * 0.62);
  const overlayRadius = Math.round(docSize / 2);

  return (
    <View
      style={{
        position: "absolute",
        left: docLeft,
        top: docTop,
        width: docSize,
        alignItems: "center",
      }}
    >
      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={{ alignItems: "center" }}
        wrapperStyle={{ width: docSize, height: docSize }}
        overlayStyle={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
          position: "absolute",
          borderRadius: overlayRadius,
        }}
        imageStyle={{
          width: imgSize,
          height: imgSize,
          borderRadius: imgSize / 2,
          resizeMode: "cover",
        }}
      />
      <Text style={[styles.drTwinLabel, { fontSize: Math.max(11, Math.round(12 * sx)) }]}>Dr.Twin</Text>
    </View>
  );
}

function SchedulingQuickActionNode({
  slot,
  sx,
  sy,
  btnSize,
  onPress,
}: {
  slot: QuickActionSlot;
  sx: number;
  sy: number;
  btnSize: number;
  onPress: () => void;
}) {
  const wrapW = Math.round(slot.figmaWrapW * sx);
  const left = Math.round(slot.figmaLeft * sx);
  const top = Math.round(slot.figmaTop * sy);
  const iconSize = Math.round(28 * sx);
  const innerD = Math.round(btnSize * 0.82);

  return (
    <View style={{ position: "absolute", left, top, width: wrapW, alignItems: "center" }}>
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
    </View>
  );
}

function PatientDetailCard({ onClose }: { onClose: () => void }) {
  return (
    <View style={cardSt.wrap}>
      <NeumorphicCard
        borderRadius={20}
        backgroundColor={COLORS.INNER_SURFACE}
        outerStyle={cardSt.cardOuter}
        innerStyle={cardSt.cardInner}
      >
        <View style={cardSt.row}>
          <View style={cardSt.avatarCircle}>
            <Text style={cardSt.avatarText}>BC</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={cardSt.patName} numberOfLines={1}>
              Brian Carter
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

        <View style={cardSt.fewSlotRow}>
          <WarningTriangleIcon width={14} height={14} />
          <Text style={cardSt.fewSlotText}>Few slot</Text>
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
              onPress={() => {}}
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
              onPress={() => {}}
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
              onPress={() => {}}
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
              onPress={() => {}}
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
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D5E8D4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 14, fontWeight: "600", color: "#3E7B4F" },
  patName: { fontSize: 16, fontWeight: "600", color: COLORS.TEXT_DARK },
  timeSub: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  tagRow: { marginBottom: 8 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_10, marginVertical: 8 },
  fewSlotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(224, 91, 110, 0.45)",
    backgroundColor: COLORS.INNER_SURFACE,
  },
  fewSlotText: { fontSize: 12, fontWeight: "600", color: "#C53030" },
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
  const navigation = useNavigation();
  const [showDetail, setShowDetail] = useState(true);

  const { width: sw, height: sh } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const availH = sh - insets.top - insets.bottom - HEADER_H;
  const orbitH = Math.round(availH * 0.44);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }} edges={["top", "left", "right", "bottom"]}>
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
            onPress={() => {}}
          />
          <View style={scrSt.bellDot} />
        </View>
      </View>

      <OrbitSection orbitH={orbitH} sw={sw} onNodePress={() => setShowDetail(true)} />

      {showDetail ? <PatientDetailCard onClose={() => setShowDetail(false)} /> : null}
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
