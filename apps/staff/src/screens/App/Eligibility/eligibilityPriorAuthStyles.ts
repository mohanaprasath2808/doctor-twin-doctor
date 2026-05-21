import { Platform, StyleSheet } from "react-native";

import { COLORS } from "../../../constants/theme";

import {
  CASE_AVATAR_SIZE,
  ESCALATE_CORAL,
  HEADER_BG,
  HEADER_H,
  HEADER_ICON_CIRCLE,
  HEADER_TITLE_FONT_SIZE,
  HEADER_TITLE_LETTER_SPACING,
  HEADER_TITLE_LINE_HEIGHT,
  INFO_WELL_FACE,
  INFO_WELL_RADIUS,
  SCREEN_BG,
  STATUS_AVATAR_INSET,
  STATUS_AVATAR_PHOTO,
  STATUS_AVATAR_SIZE,
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
    backgroundColor: SCREEN_BG,
  },
  layout: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scrollFlex: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
    backgroundColor: SCREEN_BG,
  },
  footerBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: SCREEN_BG,
  },
  chatBottom: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 14,
    backgroundColor: SCREEN_BG,
  },
  headerBar: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    minHeight: HEADER_H,
    backgroundColor: HEADER_BG,
  },
  headerTitleOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: HEADER_ICON_CIRCLE + SUMMARY_H_PAD + 10,
  },
  headerTitle: {
    fontSize: HEADER_TITLE_FONT_SIZE,
    lineHeight: HEADER_TITLE_LINE_HEIGHT,
    fontWeight: "600",
    letterSpacing: HEADER_TITLE_LETTER_SPACING,
    color: TEXT_PRIMARY,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  headerSpacer: {
    width: HEADER_ICON_CIRCLE,
    height: HEADER_ICON_CIRCLE,
  },
  screenBody: {
    paddingHorizontal: SUMMARY_H_PAD,
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
  /** Single soft drop shadow — patient / case cards (Figma: 0 4px 10px @ ~5% black). */
  caseCardOuterLift: {
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
    caseCardMargin: {
      ...Platform.select({
        ios: {
          marginBottom: 8,
        },
        android: {
          marginBottom: 8,
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
    borderRadius: CASE_AVATAR_SIZE / 2,
    resizeMode: "cover",
  },
  caseHeaderCenter: {
    flex: 1,
    minWidth: 0,
    paddingRight: 4,
  },
  caseStatusTitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#2C2C2C",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
  },
  casePatientLine: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: 0,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  expLine: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    letterSpacing: 0,
    color: TEXT_SECONDARY,
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif", includeFontPadding: false },
    }),
  },
  statusCardInner: {
    paddingTop: STATUS_AVATAR_INSET,
    paddingLeft: STATUS_AVATAR_INSET,
    paddingRight: 16,
    paddingBottom: 20,
  },
  statusHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    minHeight: STATUS_AVATAR_SIZE,
  },
  statusAvatarContainer: {
    width: STATUS_AVATAR_SIZE,
    height: STATUS_AVATAR_SIZE,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statusAvatarWrap: {
    width: STATUS_AVATAR_SIZE,
    height: STATUS_AVATAR_SIZE,
  },
  statusAvatarOverlay: {
    borderRadius: STATUS_AVATAR_SIZE / 2,
  },
  statusAvatarPhoto: {
    width: STATUS_AVATAR_PHOTO,
    height: STATUS_AVATAR_PHOTO,
    borderRadius: STATUS_AVATAR_PHOTO / 2,
    resizeMode: "cover",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EAEAEA",
    marginVertical: 12,
    marginTop: 10,
  },

  /** Full content width — aligns with text in `caseCardInner` (no extra horizontal inset). */
  dividerDenial: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EAEAEA",
    marginTop: 10,
    marginBottom: 12,
    alignSelf: "stretch",
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
  infoWellCoverageDetailBold: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
    color: "#6B6B6B",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
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
  outlineGreenTextAuth: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "SF Pro Text" },
      android: { fontFamily: "sans-serif-medium", includeFontPadding: false },
    }),
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
