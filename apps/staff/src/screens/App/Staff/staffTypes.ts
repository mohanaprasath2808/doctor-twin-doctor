export type StaffRole = "nurse" | "biller" | "front_desk" | "office_manager";

export type StaffFilter = "all" | StaffRole;

/** API role key → display label for staff list / badges */
export const LOOK_UP_ROLE: Record<StaffRole, string> = {
  nurse: "MA/Nurse",
  biller: "Billing",
  front_desk: "Front Desk",
  office_manager: "Office Manager",
};

export function getRoleDisplayName(role: string | null | undefined): string {
  if (!role) {
    return "";
  }
  const key = normalizeStaffRole(role);
  if (key) {
    return LOOK_UP_ROLE[key];
  }
  return role;
}

/** Maps API / legacy role keys to `StaffRole`. */
export function normalizeStaffRole(role: string | null | undefined): StaffRole | null {
  if (!role) {
    return null;
  }
  if (Object.prototype.hasOwnProperty.call(LOOK_UP_ROLE, role)) {
    return role as StaffRole;
  }
  const legacy: Record<string, StaffRole> = {
    ma: "nurse",
    billing: "biller",
    front: "front_desk",
    office: "office_manager",
  };
  return legacy[role] ?? null;
}

/** Staff row / edit form shape from API (snake_case). */
export type StaffFormInitial = {
  user_id?: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  date_of_birth?: string;
  role?: string;
  is_active?: boolean;
};

export type StaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  email: string;
  roleLabel: string;
  role: StaffRole;
};
