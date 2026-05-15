import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";

import type { AuthCaseRow, SummarySpot } from "./eligibilityPriorAuthTypes";

/** Screen chrome */
export const SCREEN_BG = "#F7FBFF";
export const HEADER_BG = SCREEN_BG;
/** Case list card content face (off‑white vs pure white shell in mocks). */
export const CASE_CARD_INNER = "#F8F9FB";
/** Case card header avatar — Figma circle, 1px ring; card padding aligns inset. */
export const CASE_AVATAR_SIZE = 50;
export const CASE_AVATAR_BORDER = "#1570EF";

export const TEXT_PRIMARY = "#101828";
export const TEXT_SECONDARY = "#667085";

export const ACCENT_CLOCK = "#FDB022";
export const ACCENT_GREEN = "#12B76A";
export const ACCENT_ALERT = "#F04438";
/** Submit: `linear-gradient(180deg, #CFEFDC -12.5%, #429761 100%)` — Skia uses normalized stops. */
export const SUBMIT_GRADIENT = ["#CFEFDC", "#429761"] as const;
export const SUBMIT_FILL_FALLBACK = "#429761";
/** Outlined Escalate — coral / rose border + label */
export const ESCALATE_CORAL = "#FB7185";
/** Coverage / missing columns — raised face (matches screen tint). */
export const INFO_WELL_FACE = "#F7FBFF";
export const INFO_WELL_RADIUS = 14;
export const SUMMARY_H_PAD = 16;
/** Tighter row than Home grid so orbs read larger in the carousel. */
export const SUMMARY_TILE_GAP = 8;
export const SUMMARY_COLUMNS = 3;

export const HEADER_H = 52;
/** Figma: circular chrome; glyph size for back / plus. */
export const HEADER_ICON_CIRCLE = 40;
export const HEADER_ICON_GLYPH = 25;

export const SUMMARY_SPOTS: SummarySpot[] = [
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
    wellTint: "#F0FDF4",
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

/** List data: one card layout; styles are shared—only copy + pill tones differ per row. */
export const MOCK_CASES: AuthCaseRow[] = [
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
    patientName: "Sarah Johnson",
    age: 45,
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
    patientName: "Sarah Johnson",
    age: 45,
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
