export type ImagingAssignmentMode = "urgentVisit" | "requestedAssigned";

export type NotificationItem = {
  id: string;
  message: string;
  time: string;
};

export type StaffAssignmentCard = {
  id: string;
  name: string;
  role: string;
  message: string;
  referenceLog: string;
};

export const AMANDA_ASSIGNMENT: StaffAssignmentCard = {
  id: "amanda-nm",
  name: "Amanda NM",
  role: "Nurse",
  message:
    "Evaluate Sarah urgently for left kidney mass. Triage for possible cancer based on imaging results.",
  referenceLog: "Reference log GGH78292 23 Apr 2025 03:11 PM",
};

export const URGENT_VISIT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    message: "ER Instruction sent to Sarah Willaims",
    time: "10:23 PM",
  },
  {
    id: "2",
    message: "ER referral assigned by Dr. Twin to Allens",
    time: "10:23 PM",
  },
];

export const IMAGING_ASSIGNMENT_CONFIG: Record<
  ImagingAssignmentMode,
  {
    title: string;
    cards: StaffAssignmentCard[];
    notifications?: NotificationItem[];
  }
> = {
  urgentVisit: {
    title: "Urgent Visit Scheduling",
    cards: [AMANDA_ASSIGNMENT],
    notifications: URGENT_VISIT_NOTIFICATIONS,
  },
  requestedAssigned: {
    title: "Requested Assigned",
    cards: [AMANDA_ASSIGNMENT, { ...AMANDA_ASSIGNMENT, id: "amanda-nm-2" }],
  },
};
