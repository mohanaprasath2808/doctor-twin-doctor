import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
  BottomSheetModal as BSModal,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppButton from "../Common/AppButton";
import BottomSheetModal from "./BottomSheetModal";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import SelectIcon from "../../assets/icons/selectedRoundCheckBox.svg";

export type SelectSimpleSheetItem = {
  id: string;
  label: string;
};

export type SelectSimpleSheetProps = {
  title?: string;
  items: SelectSimpleSheetItem[];
  selectedId?: string | null;
  onConfirm?: (id: string) => void;
  onDismiss?: () => void;
};

const SNAP_POINTS = ["45%"] as const;
const LIST_MIN_VISIBLE = 100;

const SelectSimpleSheet = forwardRef<BSModal, SelectSimpleSheetProps>(
  ({ title = "Select", items, selectedId = null, onConfirm, onDismiss }, ref) => {
    const insets = useSafeAreaInsets();
    const [draftId, setDraftId] = useState<string | null>(selectedId);

    useEffect(() => {
      setDraftId(selectedId);
    }, [selectedId]);

    const handleDismiss = useCallback(() => {
      onDismiss?.();
    }, [onDismiss]);

    const modalRef = ref as React.RefObject<BSModal | null>;

    const renderFooter = useCallback(
      (footerProps: BottomSheetFooterProps) => (
        <BottomSheetFooter
          {...footerProps}
          bottomInset={Math.max(insets.bottom, 12)}
          style={styles.footerSheet}
        >
          <View style={styles.footerInner}>
            <View style={styles.footerRow}>
              <View style={styles.footerHalf}>
                <AppButton
                  text="Cancel"
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={styles.cancelText}
                  style={styles.cancelBtn}
                  onPress={() => modalRef.current?.dismiss()}
                />
              </View>
              <View style={styles.footerHalf}>
                <ReusableButton
                  title="Done"
                  containerStyle={styles.doneBtn}
                  disabled={!draftId}
                  onPress={() => {
                    if (draftId) {
                      onConfirm?.(draftId);
                      modalRef.current?.dismiss();
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </BottomSheetFooter>
      ),
      [draftId, insets.bottom, onConfirm],
    );

    const keyExtractor = useCallback((item: SelectSimpleSheetItem) => item.id, []);

    const ItemSeparator = useCallback(() => <View style={styles.optionSeparator} />, []);

    const renderItem = useCallback(
      ({ item }: { item: SelectSimpleSheetItem }) => {
        const isActive = item.id === draftId;
        return (
          <Pressable
            onPress={() => setDraftId(item.id)}
            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
          >
            {isActive ? (
              <SelectIcon width={26} height={26} />
            ) : (
              <InnerShadowIcon size={26} radius={13} icon={<View style={styles.emptyDot} />} />
            )}
            <Text style={styles.optionText}>{item.label}</Text>
          </Pressable>
        );
      },
      [draftId],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={[...SNAP_POINTS]}
        enableDynamicSizing={false}
        enableContentPanningGesture
        enableHandlePanningGesture
        enablePanDownToClose
        enableDismissOnClose
        onDismiss={handleDismiss}
        handleComponent={BottomSheetHandle}
        handleStyle={styles.handleBar}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.sheetBg}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enableBlurKeyboardOnGesture={false}
        android_keyboardInputMode="adjustPan"
        bottomInset={Math.max(insets.bottom, 0)}
        activeOffsetY={[-28, 28]}
        footerComponent={renderFooter}
      >
        <View style={styles.sheetInner}>
          <Text style={styles.sheetTitle}>{title}</Text>
          <BottomSheetFlatList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            enableFooterMarginAdjustment
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            nestedScrollEnabled
            style={styles.listScroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BottomSheetModal>
    );
  },
);

SelectSimpleSheet.displayName = "SelectSimpleSheet";

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleBar: {
    paddingTop: 10,
    paddingBottom: 4,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  sheetInner: {
    flex: 1,
    minHeight: 0,
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 8,
    flexDirection: "column",
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  listScroll: {
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
    minHeight: LIST_MIN_VISIBLE,
  },
  listContent: {
    paddingBottom: 2,
    flexGrow: 1,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    gap: 10,
  },
  optionRowPressed: {
    opacity: 0.92,
  },
  optionSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginHorizontal: 8,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  emptyDot: {
    width: 2,
    height: 2,
  },
  footerSheet: {
    backgroundColor: COLORS.SURFACE,
  },
  footerInner: {
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
  },
  cancelBtn: {
    height: 46,
    borderRadius: 60,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  doneBtn: {
    alignSelf: "stretch",
    height: 46,
    borderRadius: 60,
  },
});

export default SelectSimpleSheet;
