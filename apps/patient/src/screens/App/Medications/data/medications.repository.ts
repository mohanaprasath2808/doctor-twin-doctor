import type { ProgressTrackerStep } from "../../../../neomorphism/NeumorphismProgressTracker";
import type {
  MedicationDetail,
  MedicationFilter,
  MedicationListRow,
  NextStepItem,
  PharmacyInfo,
  RefillReason,
  StoppedMedItem,
} from "../types/medications.types";

/** Default pharmacy — swap with API response when integrated. */
export const DEFAULT_PHARMACY: PharmacyInfo = {
  id: "pharmacy-1",
  name: "CVS Pharmacy",
  address: "Torrance Crossroads",
  phone: "440-784527",
  contactLine: "Torrance Crossroads tel.us.us: 440-784527",
};

const UPCOMING_MEDICATIONS: MedicationListRow[] = [
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
    id: DEFAULT_PHARMACY.id,
    title: "Pharmacy on File",
    address: `${DEFAULT_PHARMACY.name} - ${DEFAULT_PHARMACY.address}`,
  },
];

const PAST_MEDICATIONS: MedicationListRow[] = [
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

const STOPPED_MEDS: StoppedMedItem[] = [
  { id: "stopped-1", name: "Lisinopril 20 mg" },
  { id: "stopped-2", name: "Lexapro 30 mg" },
];

const MEDICATION_DETAILS: Record<string, MedicationDetail> = {
  "med-1": {
    id: "med-1",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
    lastFilled: "24 Mar 2026",
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: {
      ...DEFAULT_PHARMACY,
      contactLine: "Torrance Crossroads tel.us.us: 440-784527",
    },
  },
  "med-2": {
    id: "med-2",
    name: "Lexapro 30 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
    lastFilled: "10 Mar 2026",
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
  "past-1": {
    id: "past-1",
    name: "Amoxicillin 500 mg",
    instructions: "Completed course",
    schedule: "Ended Mar 2025",
    lastFilled: "01 Mar 2025",
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
  "past-2": {
    id: "past-2",
    name: "Ibuprofen 200 mg",
    instructions: "As needed",
    schedule: "Ended Feb 2025",
    lastFilled: "15 Feb 2025",
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
};

export const REFILL_REASON_OPTIONS: { value: RefillReason; label: string }[] = [
  { value: "routine", label: "Routine refill" },
  { value: "ran_out", label: "Ran out" },
  { value: "traveling", label: "Traveling" },
  { value: "other", label: "Other" },
];

const PHARMACY_PICKER_ITEMS = [
  { id: DEFAULT_PHARMACY.id, label: `${DEFAULT_PHARMACY.name} - ${DEFAULT_PHARMACY.address}` },
  { id: "pharmacy-2", label: "CVS Pharmacy - Redondo Beach" },
  { id: "pharmacy-3", label: "Walgreens - Manhattan Beach" },
];

/** List rows for Medications hub — replace body with API fetch. */
export async function fetchMedicationListRows(
  filter: MedicationFilter,
): Promise<MedicationListRow[]> {
  return filter === "upcoming" ? UPCOMING_MEDICATIONS : PAST_MEDICATIONS;
}

/** Stopped medications — replace with API fetch. */
export async function fetchStoppedMedications(): Promise<StoppedMedItem[]> {
  return STOPPED_MEDS;
}

/** Detail by id — replace with API fetch. */
export async function fetchMedicationDetail(
  medicationId: string,
): Promise<MedicationDetail | null> {
  return MEDICATION_DETAILS[medicationId] ?? null;
}

/** Refill medication picker options — replace with API fetch. */
export function getRefillMedicationOptions() {
  return UPCOMING_MEDICATIONS.filter((row) => row.type === "medication").map((row) => ({
    id: row.id,
    label: row.name,
  }));
}

export function getPharmacyPickerItems() {
  return PHARMACY_PICKER_ITEMS;
}

export const MOCK_REFILL_PROGRESS_STEPS: ProgressTrackerStep[] = [
  { id: "submitted", label: "Submitted", completed: true, dateLabel: "24 March 2026" },
  { id: "under_review", label: "Under Review", completed: true, dateLabel: "24 March 2026" },
  { id: "needs_labs", label: "Needs Labs", completed: false },
  { id: "needs_visit", label: "Needs visit", completed: false },
  { id: "approved", label: "Approved", completed: false },
  { id: "sent_pharmacy", label: "Sent to pharmacy", completed: false },
];

export const MOCK_REFILL_ACTION = {
  title: "Action Needed",
  subtitle: "Labs required for approval",
};

export const NEXT_STEP_ITEMS: NextStepItem[] = [
  { id: "schedule_labs", title: "Schedule Labs", subtitle: "Blood panel labs" },
  { id: "schedule_visit", title: "Schedule Visit", subtitle: "Follow-up appointment" },
  { id: "message_staff", title: "Message Staff" },
];

/** Refill tracker steps — replace with API when integrated. */
export async function fetchRefillProgressSteps(): Promise<ProgressTrackerStep[]> {
  return MOCK_REFILL_PROGRESS_STEPS;
}
