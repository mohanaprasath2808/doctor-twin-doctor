/** Orbit / category list keys — must match `BILLING_NODES` in `BillingDashboard.tsx`. */
export type BillingCategoryKey = "coding-question" | "patient-billing" | "claim-issue";

export const BILLING_CATEGORY_SCREEN_TITLE: Record<BillingCategoryKey, string> = {
  "coding-question": "Coding Question",
  "patient-billing": "Patient Billing",
  "claim-issue": "Claim Issue",
};
