import React, { forwardRef } from "react";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";

import LocationBottomSheetModal from "./LocationBottomSheetModal";

export const BILLING_ISSUE_TYPE_OPTIONS = [
  "Claim coding",
  "Eligibility / benefits",
  "Prior authorization",
  "Payment posting",
  "Appeal / reconsideration",
] as const;

type BillingIssueTypeBottomSheetModalProps = {
  selectedIssueType: string | null;
  onSelectDone: (value: string) => void;
  onDismiss?: () => void;
};

/** Issue-type picker for billing ticket flow; mock options until API wiring. */
const BillingIssueTypeBottomSheetModal = forwardRef<BSModal, BillingIssueTypeBottomSheetModalProps>(
  ({ selectedIssueType, onSelectDone, onDismiss }, ref) => (
    <LocationBottomSheetModal
      ref={ref}
      title="Select issue type"
      options={[...BILLING_ISSUE_TYPE_OPTIONS]}
      selectedValue={selectedIssueType ?? BILLING_ISSUE_TYPE_OPTIONS[0]}
      onSelectDone={onSelectDone}
      onDismiss={onDismiss}
    />
  ),
);

BillingIssueTypeBottomSheetModal.displayName = "BillingIssueTypeBottomSheetModal";

export default BillingIssueTypeBottomSheetModal;
