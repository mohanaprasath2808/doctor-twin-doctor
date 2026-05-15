/** Which hub tile opened the list (Forms Needed / Consents / Missing Records). */
export type DocumentsCategoryKey = "forms-needed" | "consents" | "missing-records";

export const DOCUMENTS_CATEGORY_SCREEN_TITLE: Record<DocumentsCategoryKey, string> = {
  "forms-needed": "Forms Needed",
  consents: "Consent",
  "missing-records": "Missing Records",
};

export type DocumentsCategoryListParams = {
  categoryKey: DocumentsCategoryKey;
};
