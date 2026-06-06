import type { ImageSourcePropType } from "react-native";

export type ClaimBadgeVariant = "error" | "warning" | "info" | "neutral" | "success";

export type ClaimCorrectionParams = {
  claimId?: string;
};

export type AdjustPaymentParams = {
  claimId?: string;
  amount?: string;
};

export type ReturnToCoderParams = {
  claimId: string;
  patientName?: string;
  claimNumber?: string;
};

export type ClaimListItem = {
  id: string;
  name: string;
  date: string;
  statusLabel: string;
  badgeVariant: ClaimBadgeVariant;
  /** Shown below name (e.g. "BCBS · $145"). When set with date, both lines render. */
  secondaryLine?: string;
  /** When set, shows photo avatar instead of initials. */
  avatarSource?: ImageSourcePropType;
  initials?: string;
};

export type DeniedDetailsParams = {
  claimId: string;
};

export type AIAppealBuilderParams = {
  claimId: string;
};

export type WriteOffParams = {
  claimId: string;
  patientName?: string;
};

export type CodingCorrectionParams = {
  claimId: string;
};

export type ResubmitClaimParams = {
  claimId: string;
};

export type ClaimDetailParams = {
  claimId: string;
};

export type ClaimSignatureParams = {
  claimId: string;
};

export type SuggestedFixRow = {
  id: string;
  code: string;
  label: string;
  badgeLabel: string;
  badgeVariant: ClaimBadgeVariant;
};

export type ClaimDetailContent = {
  patientName: string;
  date: string;
  statusLabel: string;
  badgeVariant: ClaimBadgeVariant;
  avatarSource?: ImageSourcePropType;
  initials?: string;
  suggestedFix: SuggestedFixRow[];
  checklist: { id: string; label: string; checked: boolean }[];
};
