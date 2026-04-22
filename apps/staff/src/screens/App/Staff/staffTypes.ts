export type StaffRole = "ma" | "billing" | "front" | "office";

export type StaffFilter = "all" | StaffRole;

export type StaffMember = {
  id: string;
  name: string;
  phone: string;
  dob: string;
  email: string;
  roleLabel: string;
  role: StaffRole;
};
