import type { StaffMember } from "../../screens/App/Staff/staffTypes";
import navigationStrings from "../../constants/navigationStrings";

export type PatientTaskAvatarKey = "ganesh" | "default";

export type PatientTaskDetailParams = {
  patientName: string;
  age: number;
  taskStatus: string;
  taskDetailLine: string;
  dueBadgeText: string;
  avatar: PatientTaskAvatarKey;
  insightMessage1?: string;
  insightMessage2?: string;
};

export type AssignTaskParams = {
  patientName?: string;
};

export type StaffFormParams = {
  isEdit?: boolean;
  initial?: StaffMember;
};

export type AppStackParamList = {
  [navigationStrings.SHIFT_START]: undefined;
  [navigationStrings.BOTTOM_NAVIGATION]:
    | undefined
    | {
        screen?: string;
        params?: Record<string, unknown>;
      };
  [navigationStrings.STAFF]: undefined;
  [navigationStrings.STAFF_FORM]: StaffFormParams | undefined;
  [navigationStrings.TASK_INBOX]: undefined;
  [navigationStrings.PATIENT_TASK_DETAIL]: PatientTaskDetailParams;
  [navigationStrings.ASSIGN_TASK]: AssignTaskParams | undefined;
  [navigationStrings.ESCALATE_TASK]: undefined;
  [navigationStrings.TASK_COMPLETED]: undefined;
  [navigationStrings.SCHEDULING]: undefined;
  [navigationStrings.SCHEDULING_CANCELLATION]: undefined;
  [navigationStrings.SCHEDULING_NO_SHOW]: undefined;
  [navigationStrings.SCHEDULING_URGENT_OPENING]: undefined;
  [navigationStrings.SCHEDULING_PENDING_APPROVALS]: undefined;
  [navigationStrings.SCHEDULING_NOTIFY_PATIENT]: undefined;
  [navigationStrings.SCHEDULING_FILL_SLOT]: undefined;
  [navigationStrings.SCHEDULING_ASSIGN_TASK]: undefined;
  [navigationStrings.SCHEDULING_RESCHEDULE]: undefined;
};
