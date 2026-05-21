/**
 * SF Pro font families registered in `App.tsx` via `useFonts`.
 * Structure aligned with `apps/patient/src/constants/typography.ts`.
 * Apply `color` in screen styles (or via `COLORS`), not in this file.
 */
export const FONT = {
  textBold: "SF-Pro-Text-Bold",
  displaySemibold: "SF-Pro-Display-Semibold",
  displayMedium: "SF-Pro-Display-Medium",
  displayRegular: "SF-Pro-Display-Regular",
} as const;

/** Reusable text styles for staff app screens. */
export const TEXT = {
  screenTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    fontFamily: FONT.textBold,
  },
  screenTitleLarge: {
    fontSize: 22,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  authTitle: {
    fontSize: 32,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  hero: {
    fontSize: 20,
    fontWeight: "600" as const,
    fontFamily: FONT.textBold,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600" as const,
    fontFamily: FONT.textBold,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  sectionTitleMedium: {
    fontSize: 16,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  body: {
    fontSize: 14,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: "400" as const,
    fontFamily: FONT.displayRegular,
  },
  bodySemibold: {
    fontSize: 14,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: "400" as const,
    fontFamily: FONT.displayRegular,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    fontFamily: FONT.displayRegular,
  },
  captionSemibold: {
    fontSize: 12,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  timePill: {
    fontSize: 13,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  label: {
    fontSize: 15,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  link: {
    fontSize: 14,
    fontWeight: "500" as const,
    fontFamily: FONT.displaySemibold,
  },
  badgeCount: {
    fontSize: 10,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  input: {
    fontSize: 18,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
} as const;
