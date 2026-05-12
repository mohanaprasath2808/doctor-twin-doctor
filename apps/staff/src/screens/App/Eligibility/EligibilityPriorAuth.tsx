import React, { useCallback, useMemo, useState, type ComponentProps } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import InnerShadowView from "../../../components/neomorphism/InnerShadowView";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

/** Screen chrome */
const SCREEN_BG = "#F5F6F8";
const HEADER_BG = COLORS.WHITE;
/** Case list card content face (off‑white vs pure white shell in mocks). */
const CASE_CARD_INNER = "#F8F9FB";

const TEXT_PRIMARY = "#101828";
const TEXT_SECONDARY = "#667085";

const ACCENT_CLOCK = "#FDB022";
const ACCENT_GREEN = "#12B76A";
const ACCENT_ALERT = "#F04438";
/** Submit: vertical light mint (top) → seafoam green (bottom); no horizontal / neon glow. */
const SUBMIT_GRADIENT = ["#D1FAE5", "#15803D"] as const;
const SUBMIT_FILL_FALLBACK = "#15803D";
/** Outlined Escalate — coral / rose border + label */
const ESCALATE_CORAL = "#FB7185";
/** Inset “well” behind coverage / missing columns */
const INFO_WELL_RADIUS = 14;
const INFO_WELL_SKIA_FILL = "#F1F3F7";
const SUMMARY_H_PAD = 16;
const SUMMARY_TILE_GAP = 12;

const HEADER_H = 52;

type MciName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type SummarySpot = {
  key: string;
  icon: MciName;
  /** Recessed well tint inside white ring */
  wellTint: string;
  iconColor: string;
  pillLabel: string;
  title: string;
  patientLine: string;
  insurerLine: string;
};

const SUMMARY_SPOTS: SummarySpot[] = [
  {
    key: "pending",
    /** Clock + motion — glyph set uses `clock-outline` (rotate variants vary by `@expo/vector-icons` typings). */
    icon: "clock-outline",
    wellTint: "#FFFBEB",
    iconColor: ACCENT_CLOCK,
    pillLabel: "Lab Test",
    title: "Pending Authorization",
    patientLine: "Sarah Johnson",
    insurerLine: "Numana",
  },
  {
    key: "issue",
    icon: "shield-outline",
    wellTint: "#F3F4F6",
    iconColor: ACCENT_GREEN,
    pillLabel: "Unknown",
    title: "Insurance Issue",
    patientLine: "Henry Patel",
    insurerLine: "Aern Insvince",
  },
  {
    key: "denial",
    icon: "alert-outline",
    wellTint: "#FEF3F2",
    iconColor: ACCENT_ALERT,
    pillLabel: "Medicare",
    title: "Denials",
    patientLine: "Susan Reed",
    insurerLine: "Cigna",
  },
];

type PillTone = "warn" | "danger" | "neutral";

type AuthCaseRow = {
  id: string;
  statusTitle: string;
  patientName: string;
  age: number;
  avatar: ImageSourcePropType;
  coverageLabel: string;
  coverageDetail: string;
  coveragePill: string;
  coveragePillTone: PillTone;
  missingLabel: string;
  missingPill: string;
  missingDetail: string;
  missingPillTone: PillTone;
};

const MOCK_CASES: AuthCaseRow[] = [
  {
    id: "1",
    statusTitle: "Pending Authorization",
    patientName: "Brian Carter",
    age: 45,
    avatar: DoctorTempImage,
    coverageLabel: "Coverage:",
    coveragePill: "Partial",
    coveragePillTone: "warn",
    coverageDetail: "Clinical notes",
    missingLabel: "Missing Info:",
    missingPill: "Request",
    missingDetail: "Request documents",
    missingPillTone: "warn",
  },
  {
    id: "2",
    statusTitle: "Authorization Denied",
    patientName: "Maria Gonzalez",
    age: 52,
    avatar: DoctorTempImage,
    coverageLabel: "Coverage:",
    coveragePill: "Denied",
    coveragePillTone: "danger",
    coverageDetail: "Rx does not meet plan criteria",
    missingLabel: "Missing Info:",
    missingPill: "Missing",
    missingDetail: "Start appeal",
    missingPillTone: "warn",
  },
  {
    id: "3",
    statusTitle: "Insurance Issue",
    patientName: "James Chen",
    age: 38,
    avatar: DoctorTempImage,
    coverageLabel: "Coverage:",
    coveragePill: "Unknown",
    coveragePillTone: "neutral",
    coverageDetail: "Insurance Plan ID",
    missingLabel: "Missing Info:",
    missingPill: "Plan ID",
    missingDetail: "Escalate to Insurance",
    missingPillTone: "warn",
  },
];

function InfoWell({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  return (
    <View
      style={styles.infoWellHost}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        if (width !== size.w || height !== size.h) {
          setSize({ w: width, h: height });
        }
      }}
    >
      {size.w > 0 && size.h > 0 ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, styles.infoWellSkiaClip]}
        >
          <InnerShadowView
            width={size.w}
            height={size.h}
            borderRadius={INFO_WELL_RADIUS}
            color={INFO_WELL_SKIA_FILL}
            darkShadowColor="rgba(15, 23, 42, 0.11)"
            lightShadowColor="rgba(255, 255, 255, 0.88)"
            darkShadowBlur={3}
            lightShadowBlur={2}
          />
        </View>
      ) : null}
      <View style={styles.infoWellForeground}>{children}</View>
    </View>
  );
}

/**
 * Icons: clock (pending), shield + alert (insurance issue / unknown), warning (denials).
 */
function summaryTileIcon(spot: SummarySpot, iconSize: number, wellSize: number) {
  const wellStyle = [styles.summaryIconWellSlot, { width: wellSize, height: wellSize }];
  if (spot.key === "issue") {
    return (
      <View style={wellStyle}>
        <MaterialCommunityIcons name="shield-alert-outline" size={iconSize} color={ACCENT_GREEN} />
      </View>
    );
  }
  if (spot.key === "denial") {
    return (
      <View style={wellStyle}>
        <MaterialCommunityIcons name="alert-outline" size={iconSize} color={ACCENT_ALERT} />
      </View>
    );
  }
  return (
    <View style={wellStyle}>
      <MaterialCommunityIcons name={spot.icon} size={iconSize} color={spot.iconColor} />
    </View>
  );
}

/**
 * Matches reference: one vertical axis — `NeumorphicQuickActionTile` circle only (`hideFooter`),
 * pill centered on orb bottom, then title + two gray lines (all `alignItems: "center"`).
 */
function SummaryEligibilityTile({
  spot,
  outerDiameter,
  innerShadowDiameter,
  iconSize,
  slotWidth,
  onPress,
}: {
  spot: SummarySpot;
  outerDiameter: number;
  innerShadowDiameter: number;
  iconSize: number;
  slotWidth: number;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.summaryColumn, { width: slotWidth }]} onPress={onPress}>
      <View style={[styles.summaryOrbCluster, { width: outerDiameter }]}>
        <View style={styles.summaryTileShadowHost}>
          <NeumorphicQuickActionTile
            hideFooter
            label=""
            onPress={onPress}
            icon={summaryTileIcon(spot, iconSize, innerShadowDiameter)}
            innerShadowColor={spot.wellTint}
            outerDiameter={outerDiameter}
            innerShadowDiameter={innerShadowDiameter}
            innerShadowBorderRadius={Math.round(innerShadowDiameter / 2)}
            containerStyle={[styles.summaryQuickTileCircleOnly, { width: outerDiameter }]}
          />
        </View>
        <View pointerEvents="none" style={styles.summaryPillOverlap}>
          <View style={styles.summaryTagChip}>
            <Text style={styles.summaryTagChipText} numberOfLines={1}>
              {spot.pillLabel}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.summaryHeadline} numberOfLines={1} ellipsizeMode="tail">
        {spot.title}
      </Text>
      <Text style={styles.summaryMeta} numberOfLines={1} ellipsizeMode="tail">
        {spot.patientLine} · {spot.insurerLine}
      </Text>
    </Pressable>
  );
}

function AuthCaseCard({ row }: { row: AuthCaseRow }) {
  return (
    <NeumorphicCard
      borderRadius={24}
      backgroundColor={CASE_CARD_INNER}
      outerStyle={styles.caseCardOuterLift}
      innerStyle={styles.caseCardInner}
      activeOpacity={1}
    >
      <Pressable style={styles.caseHeader} onPress={() => {}}>
        <Image source={row.avatar} style={styles.caseAvatar} />
        <View style={styles.caseHeaderCenter}>
          <Text style={styles.caseStatusTitle} numberOfLines={2}>
            {row.statusTitle}
          </Text>
          <Text style={styles.casePatientLine} numberOfLines={1}>
            {row.patientName} • Age {row.age}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.TEXT_40} />
      </Pressable>

      <View style={styles.divider} />

      <View style={styles.twoCol}>
        <InfoWell>
          <View style={styles.infoWellLabelRow}>
            <Text style={styles.infoWellLabelInline} numberOfLines={1}>
              {row.coverageLabel}
            </Text>
            <InnerShadowPill label={row.coveragePill} tone={row.coveragePillTone} subtleOuterGlow />
          </View>
          <Text style={styles.infoWellDetailBold} numberOfLines={2}>
            {row.coverageDetail}
          </Text>
        </InfoWell>
        <InfoWell>
          <View style={styles.infoWellLabelRow}>
            <Text style={styles.infoWellLabelInline} numberOfLines={1}>
              {row.missingLabel}
            </Text>
            <InnerShadowPill label={row.missingPill} tone={row.missingPillTone} subtleOuterGlow />
          </View>
          <Text style={styles.infoWellDetailBold} numberOfLines={2}>
            {row.missingDetail}
          </Text>
        </InfoWell>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.actionBtnWrap}>
          <ReusableButton
            title="Submit"
            height={44}
            borderRadius={22}
            width="100%"
            gradientColors={[SUBMIT_GRADIENT[0], SUBMIT_GRADIENT[1]]}
            gradientPositions={[0.06, 1]}
            softFillShade
            ctaGlow
            backgroundColor={SUBMIT_FILL_FALLBACK}
            textStyle={styles.submitBtnText}
            onPress={() => {}}
          />
        </View>
        <View style={styles.actionBtnWrap}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={44}
            borderRadius={22}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.WHITE}
            text="Request"
            textStyle={styles.outlineGreenText}
            shadowStyle={styles.outlineBtnNoShadow}
            onPress={() => {}}
          />
        </View>
        <View style={styles.actionBtnWrap}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={44}
            borderRadius={22}
            borderWidth={1}
            borderColor={ESCALATE_CORAL}
            bgColor={COLORS.WHITE}
            text="Escalate"
            textStyle={styles.outlineCoralText}
            shadowStyle={styles.outlineBtnNoShadow}
            onPress={() => {}}
          />
        </View>
      </View>
    </NeumorphicCard>
  );
}

export default function EligibilityPriorAuth() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const bottomPad = Math.max(insets.bottom, 16) + 12;

  const { outerDiameter, innerShadowDiameter, slotWidth, iconSize } = useMemo(() => {
    const inner = windowWidth - SUMMARY_H_PAD * 2;
    const approxSlot = (inner - SUMMARY_TILE_GAP * 2) / 3;
    const w = Math.max(94, Math.min(118, approxSlot));
    const outer = Math.min(102, w);
    const innerD = Math.max(62, outer - 18);
    const iSize = Math.round(Math.min(38, outer * 0.39));
    return { outerDiameter: outer, innerShadowDiameter: innerD, slotWidth: w, iconSize: iSize };
  }, [windowWidth]);

  const noop = useCallback(() => {}, []);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: SCREEN_BG }]} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerBar}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={44}
            height={44}
            radius={22}
            onPress={onBack}
          />
          <Text style={styles.headerTitle}>Eligibility / Prior Auth</Text>
          <IconComponent
            icon={<MaterialCommunityIcons name="plus" size={24} color={ACCENT_GREEN} />}
            width={44}
            height={44}
            radius={22}
            onPress={() => {}}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryCarousel}
          nestedScrollEnabled
          decelerationRate="fast"
        >
          {SUMMARY_SPOTS.map((spot) => (
            <View key={spot.key} style={[styles.summaryCarouselItem, { width: slotWidth }]}>
              <SummaryEligibilityTile
                spot={spot}
                outerDiameter={outerDiameter}
                innerShadowDiameter={innerShadowDiameter}
                iconSize={iconSize}
                slotWidth={slotWidth}
                onPress={noop}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.caseList}>
          {MOCK_CASES.map((row, index) => (
            <View key={row.id} style={index > 0 ? styles.caseGap : undefined}>
              <AuthCaseCard row={row} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: { flex: 1 },
  content: {
    paddingBottom: 8,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 8 : 6,
    paddingBottom: 12,
    minHeight: HEADER_H,
    backgroundColor: HEADER_BG,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: "600",
    color: TEXT_PRIMARY,
    textAlign: "center",
  },
  summaryCarousel: {
    paddingHorizontal: SUMMARY_H_PAD,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: "flex-start",
    gap: SUMMARY_TILE_GAP,
  },
  summaryCarouselItem: {
    marginRight: SUMMARY_TILE_GAP,
    alignItems: "center",
  },
  /** Full column centered on reference vertical axis */
  summaryColumn: {
    alignItems: "center",
  },
  /** Orb + overlapping pill only — width matches circle so pill centers on ring */
  summaryOrbCluster: {
    position: "relative",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 4,
    overflow: "visible",
  },
  /** Extra lift around quick-action circle (shadow stronger than default tile-only). */
  summaryTileShadowHost: {
    alignItems: "center",
    borderRadius: 120,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
      },
      android: { elevation: 10 },
    }),
  },
  /** `hideFooter` + zero horizontal padding — same chrome as Home, no extra side inset */
  summaryQuickTileCircleOnly: {
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  summaryPillOverlap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  summaryIconWellSlot: {
    justifyContent: "center",
    alignItems: "center",
  },
  summaryHeadline: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    textAlign: "center",
    lineHeight: 15,
    paddingHorizontal: 4,
    width: "100%",
  },
  summaryMeta: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: "400",
    color: TEXT_SECONDARY,
    textAlign: "center",
    width: "100%",
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  summaryTagChip: {
    alignSelf: "center",
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: "#E4E7EC",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 6,
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 6,
      },
      android: { elevation: 5 },
    }),
  },
  summaryTagChipText: {
    fontSize: 10,
    fontWeight: "600",
    color: TEXT_PRIMARY,
    textAlign: "center",
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  caseCardOuterLift: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 9 },
    }),
  },
  caseList: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  caseGap: {
    marginTop: 18,
  },
  caseCardInner: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 18,
  },
  caseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  caseAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: "cover",
  },
  caseHeaderCenter: {
    flex: 1,
    minWidth: 0,
    paddingRight: 4,
  },
  caseStatusTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  casePatientLine: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "400",
    color: TEXT_SECONDARY,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },
  twoCol: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  infoWellHost: {
    flex: 1,
    minWidth: 0,
    position: "relative",
    overflow: "visible",
  },
  infoWellSkiaClip: {
    borderRadius: INFO_WELL_RADIUS,
    overflow: "hidden",
  },
  infoWellForeground: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    zIndex: 1,
  },
  /** Label + status pill on one line (matches design). */
  infoWellLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 8,
    marginBottom: 8,
  },
  infoWellLabelInline: {
    fontSize: 12,
    fontWeight: "400",
    color: "#64748B",
    flexShrink: 0,
  },
  infoWellDetailBold: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    alignItems: "stretch",
  },
  actionBtnWrap: {
    flex: 1,
    minWidth: 0,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  outlineGreenText: {
    color: COLORS.PRIMARY,
    fontSize: 13,
    fontWeight: "600",
  },
  outlineCoralText: {
    color: ESCALATE_CORAL,
    fontSize: 13,
    fontWeight: "600",
  },
  outlineBtnNoShadow: Platform.select({
    ios: {
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
    },
    android: { elevation: 0 },
    default: {},
  }),
});
