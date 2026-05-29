
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

const padDay = (day: number) => String(day).padStart(2, "0");

const formatDateParts = (day: number, monthIndex: number, year: number): string => {
  const month = MONTHS_SHORT[monthIndex];
  if (!month) {
    return "";
  }
  return `${padDay(day)} ${month} ${year}`;
};

/** Display like `"01 Jan 1998"`. Accepts `Date`, ISO `"1998-01-10"`, or `"21 Mar 1980"`. */
export function formatDateOfBirth(value: string | Date | null | undefined): string {
  if (value == null) {
    return "";
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return "";
    }
    return formatDateParts(value.getDate(), value.getMonth(), value.getFullYear());
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return "";
  }

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const monthIndex = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (
      !Number.isNaN(year) &&
      monthIndex >= 0 &&
      monthIndex <= 11 &&
      day >= 1 &&
      day <= 31
    ) {
      return formatDateParts(day, monthIndex, year);
    }
  }

  const parsed = parseDateOfBirth(trimmed);
  if (parsed) {
    return formatDateParts(parsed.getDate(), parsed.getMonth(), parsed.getFullYear());
  }

  return trimmed;
}

/** Parse API ISO `"1998-01-10"`, display `"01 Jan 1998"`, or `Date` into local `Date`. */
export function parseDateOfBirthValue(value: string | Date | null | undefined): Date | null {
  if (value == null) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return null;
  }

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const monthIndex = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (
      !Number.isNaN(year) &&
      monthIndex >= 0 &&
      monthIndex <= 11 &&
      day >= 1 &&
      day <= 31
    ) {
      return new Date(year, monthIndex, day);
    }
  }

  return parseDateOfBirth(trimmed);
}

/** API payload format for date of birth */
export function formatDateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
