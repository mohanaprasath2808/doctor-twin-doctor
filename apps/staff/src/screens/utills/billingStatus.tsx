import React from "react";
import type { StyleProp, TextStyle } from "react-native";

import DeltaBadge from "../../components/Common/DeltaBadge";
import { COLORS } from "../../constants/theme";

export type BillingStatus =
  | "Resolved"
  | "Closed"
  | "Escalated"
  | "New"
  | "Waiting for insurance"
  | "Waiting for patient"
  | "Pending";

export type BillingItem = {
  id: string;
  patientName: string;
  patientMeta: string;
  payerName: string;
  memberId: string;
  status: BillingStatus;
  issue: string;
};

export type BillingStatusStyle = { bg: string; text: string; dark: string; light?: string };

const STATUS_STYLE: Record<BillingStatus, BillingStatusStyle> = {
  Pending: { bg: "#FFF8DB", text: "#D49A1E", dark: "#F2D790" },
  New: { bg: "#EAF2FF", text: "#2563EB", dark: "#BFD6FF" },
  Escalated: { bg: "#FFE9E9", text: COLORS.ALERT, dark: "#F0C7C7" },
  Resolved: { bg: "#DDF8ED", text: COLORS.GREEN, dark: "#A9E4C7" },
  Closed: { bg: "#EEF2F7", text: COLORS.TEXT_60, dark: "#D0D7E2" },
  "Waiting for insurance": { bg: "#FFF8DB", text: "#D49A1E", dark: "#F2D790" },
  "Waiting for patient": { bg: "#FFF8DB", text: "#D49A1E", dark: "#F2D790" },
};

export function getBillingStatusStyle(status: BillingStatus): BillingStatusStyle {
  return STATUS_STYLE[status] ?? STATUS_STYLE.Pending;
}

export function BillingStatusBadge({
  status,
  textStyle,
  height = 26,
  radius = 13,
}: {
  status: BillingStatus;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  radius?: number;
}) {
  const s = getBillingStatusStyle(status);
  return (
    <DeltaBadge
      value={status}
      height={height}
      radius={radius}
      bgColor={s.bg}
      darkShadowColor={s.dark}
      lightShadowColor="#FFFFFF99"
      textColor={s.text}
      textStyle={textStyle}
    />
  );
}

