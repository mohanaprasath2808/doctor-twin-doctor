export type HealthJournalTrendType = "blood_pressure" | "blood_sugar" | "weight";

export type TrendLegendItem = {
  key: string;
  label: string;
  color: string;
};

export type HealthJournalTrendsConfig = {
  title: string;
  statusMessage: string;
  summaryLabel: string;
  summaryValue: string;
  legend: TrendLegendItem[];
  chartLines: {
    normal: number[];
    elevated: number[];
    high: number[];
  };
};

const MONTH_COUNT = 12;

/** Placeholder monthly series until API wiring. */
const bpLines = {
  normal: [32, 34, 33, 35, 36, 34, 38, 37, 39, 38, 40, 39],
  elevated: [24, 26, 25, 27, 28, 26, 30, 29, 31, 30, 32, 31],
  high: [14, 16, 15, 17, 18, 16, 20, 19, 21, 20, 22, 21],
};

const glucoseLines = {
  normal: [34, 35, 33, 36, 35, 34, 37, 36, 38, 37, 39, 38],
  elevated: [26, 27, 25, 28, 27, 26, 29, 28, 30, 29, 31, 30],
  high: [16, 17, 15, 18, 17, 16, 19, 18, 20, 19, 21, 20],
};

const weightLines = {
  normal: [30, 31, 30, 32, 31, 30, 33, 32, 34, 33, 35, 34],
  elevated: [22, 23, 22, 24, 23, 22, 25, 24, 26, 25, 27, 26],
  high: [12, 13, 12, 14, 13, 12, 15, 14, 16, 15, 17, 16],
};

export const HEALTH_JOURNAL_TREND_MONTH_LABELS = [
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

export const HEALTH_JOURNAL_TRENDS_CONFIGS: Record<HealthJournalTrendType, HealthJournalTrendsConfig> = {
  blood_pressure: {
    title: "Blood Pressure Trends",
    statusMessage: "Your BP is slightly elevated this week.",
    summaryLabel: "Last 7 Days Avg:",
    summaryValue: "135 / 88",
    legend: [
      { key: "normal", label: "Normal", color: "#10B981" },
      { key: "elevated", label: "Elevated", color: "#EEB621" },
      { key: "high", label: "High", color: "#FF6B6B" },
    ],
    chartLines: bpLines,
  },
  blood_sugar: {
    title: "Blood Sugar Trends",
    statusMessage: "Your glucose is mostly controlled this week.",
    summaryLabel: "Last 7 Days Avg:",
    summaryValue: "110 mg/dL",
    legend: [
      { key: "normal", label: "Normal", color: "#10B981" },
      { key: "elevated", label: "Elevated", color: "#EEB621" },
      { key: "high", label: "High", color: "#FF6B6B" },
    ],
    chartLines: glucoseLines,
  },
  weight: {
    title: "Weight Trends",
    statusMessage: "Your weight trend is improving this week.",
    summaryLabel: "Last 7 Days Avg:",
    summaryValue: "72.5 kg",
    legend: [
      { key: "normal", label: "Normal", color: "#10B981" },
      { key: "elevated", label: "Elevated", color: "#EEB621" },
      { key: "high", label: "High", color: "#FF6B6B" },
    ],
    chartLines: weightLines,
  },
};

export const HEALTH_JOURNAL_TREND_POINT_COUNT = MONTH_COUNT;
