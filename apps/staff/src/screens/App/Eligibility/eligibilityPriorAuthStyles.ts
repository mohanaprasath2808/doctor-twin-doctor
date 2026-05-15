import { Platform, StyleSheet } from "react-native";

import { COLORS } from "../../../constants/theme";

import {
  CASE_AVATAR_BORDER,
  CASE_AVATAR_SIZE,
  ESCALATE_CORAL,
  HEADER_BG,
  HEADER_H,
  INFO_WELL_FACE,
  INFO_WELL_RADIUS,
  SCREEN_BG,
  SUMMARY_H_PAD,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from "./eligibilityPriorAuthConstants";

export const eligibilityPriorAuthStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scroll: { flex: 1, backgroundColor: SCREEN_BG },
  content: {
    paddingBottom: 8,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    minHeight: HEADER_H,
    backgroundColor: HEADER_BG,
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
    paddingTop: 12,
    paddingBottom: 10,
    alignItems: "flex-start",
  },
  summaryCarouselItem: {
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
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
    color: TEXT_PRIMARY,
    textAlign: "center",
    paddingHorizontal: 4,
    width: "100%",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  summaryMeta: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: 0,
    color: "#2C2C2C",
    textAlign: "center",
    width: "100%",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  summaryMetaSecond: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: 0,
    color: "#2C2C2C",
    textAlign: "center",
    width: "100%",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
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
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    color: TEXT_PRIMARY,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  /** Single drop shadow, biased downward (inset neumorphic layers disabled on this card). */
  caseCardOuterLift: {
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  caseList: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  caseGap: {
    marginTop: 18,
  },
  caseCardInner: {
    paddingTop: 15,
    paddingBottom: 24,
    paddingHorizontal: 15,
  },
  /** Let inner-well drop shadows paint outside the default `overflow: hidden` face. */
  caseCardInnerOverflow: {
    overflow: "visible",
  },
  caseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  caseAvatar: {
    width: CASE_AVATAR_SIZE,
    height: CASE_AVATAR_SIZE,
    borderRadius: 114,
    borderWidth: 1,
    borderColor: CASE_AVATAR_BORDER,
    resizeMode: "cover",
    opacity: 1,
  },
  caseHeaderCenter: {
    flex: 1,
    minWidth: 0,
    paddingRight: 4,
  },
  caseStatusTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    color: TEXT_PRIMARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  casePatientLine: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "400",
    color: TEXT_SECONDARY,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EAEAEA",
    marginVertical: 12,
    marginTop: 12,
  },
  twoCol: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  infoWellShell: {
    flex: 1,
    minWidth: 0,
    borderRadius: INFO_WELL_RADIUS,
    backgroundColor: INFO_WELL_FACE,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  infoWellForeground: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 12,
  },
  /** Label + status pill on one line (matches design). */
  infoWellLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 8,
    marginBottom: 5,
  },
  infoWellLabelInline: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    color: "#6B6B6B",
    flexShrink: 0,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  infoWellDetailBold: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#1E293B",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
    alignItems: "stretch",
  },
  actionBtnWrap: {
    flex: 1,
    minWidth: 0,
  },
  submitBtnText: {
    fontSize: 13,
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
