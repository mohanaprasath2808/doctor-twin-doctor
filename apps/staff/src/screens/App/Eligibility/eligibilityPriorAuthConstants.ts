import SummaryDenialIcon from "../../../assets/icon/eligibility/summaryDenial.png";
import SummaryInsuranceIcon from "../../../assets/icon/eligibility/summaryInsurance.png";
import SummaryPendingIcon from "../../../assets/icon/eligibility/summaryPending.png";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";

import type { AuthCaseRow, SummarySpot } from "./eligibilityPriorAuthTypes";

/** Screen chrome */
export const SCREEN_BG = "#F7FBFF";
export const HEADER_BG = SCREEN_BG;
/** Case list card content face (off‑white vs pure white shell in mocks). */
export const CASE_CARD_INNER = "#F8F9FB";
/** Surface card corner radius — patient row + case cards (Figma ~16px). */
export const ELIGIBILITY_CARD_RADIUS = 16;
/** Case card header avatar — Figma circle, 1px ring; card padding aligns inset. */
export const CASE_AVATAR_SIZE = 50;
export const TEXT_PRIMARY = "#101828";
export const TEXT_SECONDARY = "#667085";
export const TEXT_TERTIARY = "#2C2C2C";

export const ACCENT_CLOCK = "#FDB022";
export const ACCENT_GREEN = "#12B76A";
export const ACCENT_ALERT = "#F04438";
/** Submit: `linear-gradient(180deg, #CFEFDC -12.5%, #429761 100%)` — Skia uses normalized stops. */
export const SUBMIT_GRADIENT = ["#CFEFDC", "#429761"] as const;
export const SUBMIT_FILL_FALLBACK = "#429761";
/** Escalate CTA — coral border/label on pink fill (Figma). */
export const ESCALATE_CORAL = "#FB7185";
export const ESCALATE_FILL = "#FDECEC";
/** Coverage / missing columns — raised face (matches screen tint). */
export const INFO_WELL_FACE = "#F7FBFF";
export const INFO_WELL_RADIUS = 14;
export const SUMMARY_H_PAD = 16;
/** Tighter row than Home grid so orbs read larger in the carousel. */
export const SUMMARY_TILE_GAP = 8;
export const SUMMARY_COLUMNS = 3;

export const HEADER_H = 52;
/** Figma: header row top ≈ 49px from screen top (safe area already applied). */
export const HEADER_TOP_FROM_SCREEN = 49;
/** Figma: circular chrome; glyph size for back / plus. */
export const HEADER_ICON_CIRCLE = 40;
export const HEADER_ICON_GLYPH = 25;
/** Centered header title — shared across all eligibility screens. */
export const HEADER_TITLE_FONT_SIZE = 17;
export const HEADER_TITLE_LINE_HEIGHT = 22;
export const HEADER_TITLE_LETTER_SPACING = 0.18;

/** ProfileAvatar on status / miss-request rows — shared by Authorization Detail & Request Documents. */
export const STATUS_AVATAR_SIZE = 70;
export const STATUS_AVATAR_PHOTO = Math.round(STATUS_AVATAR_SIZE * (38 / 56));
export const STATUS_AVATAR_INSET = 10;

export const SUMMARY_SPOTS: SummarySpot[] = [
  {
    key: "pending",
    iconSource: SummaryPendingIcon,
    wellTint: "#FFFDF8",
    pillLabel: "Lab Test",
    title: "Pending Authorization",
    patientLine: "Sarah Johnson",
    insurerLine: "Numana",
  },
  {
    key: "issue",
    iconSource: SummaryInsuranceIcon,
    wellTint: "#F7FBFF",
    pillLabel: "Unknown",
    title: "Insurance Issue",
    patientLine: "Henry Patel",
    insurerLine: "Aern Insvince",
  },
  {
    key: "denial",
    iconSource: SummaryDenialIcon,
    wellTint: "#FDECEC",
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
