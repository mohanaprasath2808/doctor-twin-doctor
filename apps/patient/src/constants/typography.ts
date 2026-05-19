/**
 * SF Pro font families registered in `App.tsx` via `useFonts`.
 * Match doctor TodayVisits / staff dashboards: explicit `fontFamily` + `fontWeight`, not system default.
 */
export const FONT = {
  textBold: "SF-Pro-Text-Bold",
  displaySemibold: "SF-Pro-Display-Semibold",
  displayMedium: "SF-Pro-Display-Medium",
  displayRegular: "SF-Pro-Display-Regular",
} as const;

/** Reusable text styles for patient app screens (Medications, Health Journal, etc.). */
export const TEXT = {
  screenTitle: {
    fontSize: 18,
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
  bodySemibold: {
    fontSize: 14,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
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
  hero: {
    fontSize: 20,
    fontWeight: "600" as const,
    fontFamily: FONT.textBold,
  },
  label: {
    fontSize: 15,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    fontFamily: FONT.displaySemibold,
  },
  input: {
    fontSize: 18,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  chartAxis: {
    fontSize: 10,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
  chartLegend: {
    fontSize: 7,
    fontWeight: "500" as const,
    fontFamily: FONT.displayMedium,
  },
} as const;
