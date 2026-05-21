import React, { forwardRef } from "react";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";

import LocationBottomSheetModal from "./LocationBottomSheetModal";

export const DOCUMENTS_MISSING_INFO_OPTIONS = [
  "Insurance card",
  "Lab results",
  "Imaging report",
  "Consent / authorization",
  "Demographics update",
] as const;

type DocumentsMissingInfoBottomSheetModalProps = {
  selectedValue: string | null;
  onSelectDone: (value: string) => void;
  onDismiss?: () => void;
};

const DocumentsMissingInfoBottomSheetModal = forwardRef<BSModal, DocumentsMissingInfoBottomSheetModalProps>(
  ({ selectedValue, onSelectDone, onDismiss }, ref) => (
    <LocationBottomSheetModal
      ref={ref}
      title="Select missing info"
      options={[...DOCUMENTS_MISSING_INFO_OPTIONS]}
      selectedValue={selectedValue ?? DOCUMENTS_MISSING_INFO_OPTIONS[0]}
      onSelectDone={onSelectDone}
      onDismiss={onDismiss}
    />
  ),
);

DocumentsMissingInfoBottomSheetModal.displayName = "DocumentsMissingInfoBottomSheetModal";

export default DocumentsMissingInfoBottomSheetModal;
