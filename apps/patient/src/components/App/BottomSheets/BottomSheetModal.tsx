import React, { ReactNode, forwardRef, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as BSModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";

interface CustomBottomSheetModalProps extends Omit<BottomSheetModalProps, "children"> {
  children: ReactNode;
}

const BottomSheetModal = forwardRef<BSModal, CustomBottomSheetModalProps>(
  ({ children, ...props }, ref) => {
    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} />
      ),
      [],
    );

    return (
      <BSModal
        ref={ref}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        {...props}
      >
        {children}
      </BSModal>
    );
  },
);

BottomSheetModal.displayName = "BottomSheetModal";

export default BottomSheetModal;
