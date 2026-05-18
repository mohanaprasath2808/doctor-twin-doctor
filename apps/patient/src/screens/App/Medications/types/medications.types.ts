export type MedicationFilter = "upcoming" | "past";

export type MedicationListItem = {
  id: string;
  name: string;
  instructions: string;
  schedule: string;
};

export type PharmacyListItem = {
  id: string;
  title: string;
  address: string;
};

export type MedicationListRow =
  | ({ type: "medication" } & MedicationListItem)
  | ({ type: "pharmacy" } & PharmacyListItem);

export type StoppedMedItem = {
  id: string;
  name: string;
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
  prescriber: string;
  pharmacy: PharmacyInfo;
};

export type RefillReason = "routine" | "ran_out" | "traveling" | "other";

export type MedicationDetailParams = {
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
