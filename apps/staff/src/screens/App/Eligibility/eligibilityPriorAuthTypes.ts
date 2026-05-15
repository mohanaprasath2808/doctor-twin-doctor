import type { ComponentProps } from "react";
import type { ImageSourcePropType } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type MciName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type SummarySpot = {
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
