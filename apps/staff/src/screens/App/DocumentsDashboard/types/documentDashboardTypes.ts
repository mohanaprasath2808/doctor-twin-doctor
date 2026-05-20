/** Drives All / Pending / Completed / Uploaded filter chips (separate from badge copy). */
export type DocumentFlowFilter = "pending" | "completed" | "uploaded";

export type DocumentsDashboardListItemData = {
  id: string;
  documentTitle: string;
  dueLabel: string;
  statusLabel: string;
  documentFlow: DocumentFlowFilter;
  patientName: string;
  patientMeta: string;
  payerName?: string;
  memberId?: string;
};

export type DocumentsDetailParams = {
  item: DocumentsDashboardListItemData;
};
