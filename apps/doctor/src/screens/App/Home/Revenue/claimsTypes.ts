import type { ImageSourcePropType } from "react-native";

export type ClaimBadgeVariant = "error" | "warning" | "info";

export type ClaimListItem = {
  id: string;
  name: string;
  date: string;
  statusLabel: string;
  badgeVariant: ClaimBadgeVariant;
  /** When set, shows photo avatar instead of initials. */
  avatarSource?: ImageSourcePropType;
  initials?: string;
};

export type ClaimDetailParams = {
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
