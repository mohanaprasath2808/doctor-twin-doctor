export type MedicationListItem = {
  id: string;
  name: string;
  instructions: string;
  schedule: string;
};

export type PharmacyInfo = {
  id: string;
  name: string;
  address: string;
  phone: string;
  /** Display line for detail info row */
  contactLine: string;
};

export type MedicationDetail = MedicationListItem & {
  lastFilled: string;
  lastRefillDate: string;
  remainingRefills: number;
  prescriber: string;
  pharmacy: PharmacyInfo;
};

export type RefillReason = "routine" | "ran_out" | "traveling" | "other";

export type MedicationDetailParams = {
  medicationId: string;
};

export type PriorAuthorizationParams = {
  medicationId: string;
};

export type RequestRefillParams = {
  medicationId: string;
};

export type RefillStatusParams = {
  medicationId: string;
};

export type NextStepItem = {
  id: string;
  title: string;
  subtitle?: string;
};
