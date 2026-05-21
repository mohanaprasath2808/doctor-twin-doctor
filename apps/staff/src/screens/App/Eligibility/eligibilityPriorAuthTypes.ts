import type { ImageSourcePropType } from "react-native";

export type SummarySpot = {
  key: string;
  iconSource: ImageSourcePropType;
  /** Recessed well tint inside white ring */
  wellTint: string;
  pillLabel: string;
  title: string;
  patientLine: string;
  insurerLine: string;
};

export type PillTone = "warn" | "danger" | "neutral";

export type AuthCaseRow = {
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
