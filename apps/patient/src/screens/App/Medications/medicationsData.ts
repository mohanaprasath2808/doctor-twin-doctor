export type MedicationFilter = "upcoming" | "past";

export type MedicationRow = {
  type: "medication";
  id: string;
  name: string;
  instructions: string;
  schedule: string;
};

export type PharmacyRow = {
  type: "pharmacy";
  id: string;
  title: string;
  address: string;
};

export type MedicationListRow = MedicationRow | PharmacyRow;

export type StoppedMedRow = {
  id: string;
  name: string;
};

export const UPCOMING_MEDICATIONS: MedicationListRow[] = [
  {
    type: "medication",
    id: "med-1",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
  },
  {
    type: "medication",
    id: "med-2",
    name: "Lexapro 30 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
  },
  {
    type: "pharmacy",
    id: "pharmacy-1",
    title: "Pharmacy on File",
    address: "CVS Pharmacy - Torrance Crossroads",
  },
];

export const PAST_MEDICATIONS: MedicationListRow[] = [
  {
    type: "medication",
    id: "past-1",
    name: "Amoxicillin 500 mg",
    instructions: "Completed course",
    schedule: "Ended Mar 2025",
  },
  {
    type: "medication",
    id: "past-2",
    name: "Ibuprofen 200 mg",
    instructions: "As needed",
    schedule: "Ended Feb 2025",
  },
];

export const STOPPED_MEDS: StoppedMedRow[] = [
  { id: "stopped-1", name: "Lisinopril 20 mg" },
  { id: "stopped-2", name: "Lexapro 30 mg" },
];
