import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
  BottomSheetModal as BSModal,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppButton from "../Common/AppButton";
import BottomSheetInputField from "./BottomSheetInputField";
import BottomSheetModal from "./BottomSheetModal";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import SearchIcon from "../../assets/icons/search.svg";
import SelectIcon from "../../assets/icons/selectedRoundCheckBox.svg";

export type SelectListItem = {
  id: string;
  label: string;
};

export type SelectPharmacySheetProps = {
  title?: string;
  items: SelectListItem[];
  /** Current selection when the sheet opens (e.g. controlled from parent). */
  selectedId?: string | null;
  searchPlaceholder?: string;
  /** Fire when the user types in search — wire to your API (list rows come from `items`). */
  onSearchChange?: (query: string) => void;
  onConfirm?: (id: string) => void;
  onDismiss?: () => void;
};

/** Fixed sheet height — keyboard lifts via `interactive` (no snapping to another %). */
const SNAP_POINTS = ["45%"] as const;

/** Minimum list body so the scroll area can always receive drags */
const LIST_MIN_VISIBLE = 100;

const SelectPharmacySheet = forwardRef<BSModal, SelectPharmacySheetProps>(
  (
    {
      title = "Select Pharmacy",
      items,
      selectedId = null,
      searchPlaceholder = "Search location",
      onSearchChange,
      onConfirm,
      onDismiss,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    const [draftId, setDraftId] = useState<string | null>(selectedId);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      setDraftId(selectedId);
    }, [selectedId]);

    const handleSearchChangeText = useCallback(
      (text: string) => {
        setSearchQuery(text);
        onSearchChange?.(text);
      },
      [onSearchChange],
    );

    const handleDismiss = useCallback(() => {
      setSearchQuery("");
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

    const renderItem = useCallback(
      ({ item }: { item: SelectListItem }) => {
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

    const keyExtractor = useCallback((item: SelectListItem) => item.id, []);

    const ItemSeparator = useCallback(() => <View style={styles.optionSeparator} />, []);

    const renderEmpty = useCallback(
      () => (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No locations</Text>
          <Text style={styles.emptyHint}>Try a different search.</Text>
        </View>
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={[...SNAP_POINTS]}
        enableDynamicSizing={false}
        /**
         * Must be true so `BottomSheetFlatList` attaches `Gesture.Native()` with the sheet —
         * that is what enables nested scrolling on Android/iOS with the inner list.
         * `activeOffsetY` biases vertical drags toward the list before the sheet pans.
         */
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
        /** Android + `adjustResize` zeroes keyboard height for `interactive`; `adjustPan` allows the lift. */
        android_keyboardInputMode="adjustPan"
        bottomInset={Math.max(insets.bottom, 0)}
        activeOffsetY={[-28, 28]}
        footerComponent={renderFooter}
      >
        <View style={styles.sheetInner}>
          {/* Header: title + search (list rows remain driven only by `items`). */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <BottomSheetInputField
              value={searchQuery}
              onChangeText={handleSearchChangeText}
              placeholder={searchPlaceholder}
              leftIcon={<SearchIcon width={18} height={18} />}
              containerStyle={styles.searchField}
            />
          </View>

          {/* Bounded height + BottomSheetFlatList scroll (not flex-only inside sheet). */}
          <BottomSheetFlatList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={ItemSeparator}
            enableFooterMarginAdjustment
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            nestedScrollEnabled
            style={styles.listScroll}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator
          />
        </View>
      </BottomSheetModal>
    );
  },
);

SelectPharmacySheet.displayName = "SelectPharmacySheet";

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
  header: {
    flexShrink: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  searchField: {
    marginBottom: 8,
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
  emptyState: {
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 12,
    minHeight: LIST_MIN_VISIBLE,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  emptyHint: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    gap: 12,
  },
  optionRowPressed: {
    opacity: 0.92,
  },
  optionSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginLeft: 46,
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
  radioOn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCheck: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: "700",
  },
  footerSheet: {
    backgroundColor: COLORS.SURFACE,
  },
  footerInner: {
    paddingTop: 12,
    paddingHorizontal: 8,
    paddingBottom: 0,
    backgroundColor: COLORS.SURFACE,
  },
  footerRow: {
    flexDirection: "row",
    gap: 12,
  },
  footerHalf: {
    flex: 1,
  },
  cancelBtn: {
    height: 48,
    borderRadius: 26,
  },
  cancelText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  doneBtn: {
    height: 48,
    borderRadius: 26,
  },
});

export default SelectPharmacySheet;
