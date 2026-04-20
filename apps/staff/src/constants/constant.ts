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
