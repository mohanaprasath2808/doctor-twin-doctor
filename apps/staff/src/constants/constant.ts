
export function greetingLabel(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

/** True when badge / data count parses to an integer > 0 (red icon + alert inner tile). */
export function hasPositiveBadgeCount(dataCount?: string): boolean {
  if (dataCount == null || dataCount.trim() === "") return false;
  const n = parseInt(dataCount, 10);
  return !Number.isNaN(n) && n > 0;
}

//ROLE BASED (RBAC) CONSTANTS
export const ROLE_BASED_CONSTANTS = {
  ROLE_OFFICE_MANAGER: "Office Manager",
  ROLE_NURSE: "Nurse",
  ROLE_BILLING: "Billing",
  ROLE_FRONT_DESK: "Front Desk",
};

//TEMPORARY CONSTANTS
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
//--------------------------------

/** Display like list rows: "21 Mar 1980" */
export function formatDateOfBirth(date: Date): string {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

/** Parse a date-of-birth label such as "21 Mar 1980" into a `Date`, or `null` if invalid. */
export function parseDateOfBirth(s: string): Date | null {
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const monthStr = parts[1];
  const year = parseInt(parts[2], 10);
  const month = MONTHS_SHORT.indexOf(monthStr as (typeof MONTHS_SHORT)[number]);
  if (month < 0 || Number.isNaN(day) || Number.isNaN(year)) return null;
  return new Date(year, month, day);
}
export function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
