import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
  type BottomSheetFooterProps,
  type BottomSheetModal as BSModalType,
} from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomSheetModal from "../BottomSheetModal";
import AppButton from "../../Common/AppButton";
import ReusableButton from "../../../neomorphism/ReusableButton";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import SelectedIcon from "../../../assets/icons/selectedIcon.svg";

const SNAP_POINTS = ["42%"] as const;
const LIST_MIN_VISIBLE = 100;

/** Matches `optionRow.paddingHorizontal` — full-width divider inset like `SelectSpecialitySheet`. */
const LIST_ROW_PADDING_H = 8;

const DEFAULT_LOCATION_OPTIONS = [
  "Los Angeles, CA",
  "Torrance Imaging Center",
  "Irvine, CA",
] as const;

export type LocationBottomSheetModalProps = {
  options?: string[];
  selectedValue?: string;
  onSelectDone?: (value: string) => void;
  title?: string;
  onDismiss?: () => void;
};

const LocationBottomSheetModal = forwardRef<BSModalType, LocationBottomSheetModalProps>(
  (
    {
      options: optionsProp,
      selectedValue = "",
      onSelectDone,
      title = "Select Location",
      onDismiss,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    const options = useMemo(() => {
      if (optionsProp && optionsProp.length > 0) return optionsProp;
      return [...DEFAULT_LOCATION_OPTIONS];
    }, [optionsProp]);

    const [draftValue, setDraftValue] = useState(selectedValue);

    useEffect(() => {
      const t = selectedValue.trim();
      setDraftValue(options.includes(t) ? t : "");
    }, [selectedValue, options]);

    const modalRef = ref as React.RefObject<BSModalType | null>;

    const dismissSheet = useCallback(() => modalRef.current?.dismiss(), []);

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
                  onPress={() => dismissSheet()}
                />
              </View>
              <View style={styles.footerHalf}>
                <ReusableButton
                  title="Done"
                  containerStyle={styles.doneBtn}
                  height={52}
                  borderRadius={26}
                  disabled={!options.includes(draftValue)}
                  onPress={() => {
                    onSelectDone?.(draftValue);
                    dismissSheet();
                  }}
                />
              </View>
            </View>
          </View>
        </BottomSheetFooter>
      ),
      [dismissSheet, draftValue, insets.bottom, onSelectDone, options],
    );

    type Row = { key: string; label: string };
    const listData = useMemo<Row[]>(
      () => options.map((label, index) => ({ key: `${index}:${label}`, label })),
      [options],
    );

    const renderItem = useCallback(
      ({ item }: { item: Row }) => {
        const isActive = item.label === draftValue;
        return (
          <Pressable
            onPress={() => setDraftValue(item.label)}
            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
          >
            {isActive ? (
              <SelectedIcon width={30} height={30} />
            ) : (
              <InnerShadowIcon
                size={30}
                radius={15}
                surfaceColor={COLORS.INNER_SURFACE}
                icon={<View style={styles.emptyDot} />}
              />
            )}
            <Text style={styles.optionText}>{item.label}</Text>
          </Pressable>
        );
      },
      [draftValue],
    );

    const keyExtractor = useCallback((item: Row) => item.key, []);

    const ItemSeparator = useCallback(() => <View style={styles.rowSeparator} />, []);

    const renderEmpty = useCallback(
      () => (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No locations</Text>
          <Text style={styles.emptyHint}>Pass `options` or edit defaults in this sheet.</Text>
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
        enableContentPanningGesture
        enableHandlePanningGesture
        enablePanDownToClose
        enableDismissOnClose
        onDismiss={onDismiss}
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
          <View style={styles.header}>
            <Text style={styles.sheetTitle}>{title}</Text>
          </View>

          <BottomSheetFlatList
            data={listData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={ItemSeparator}
            enableFooterMarginAdjustment
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

LocationBottomSheetModal.displayName = "LocationBottomSheetModal";

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
  sheetTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_PRIMARY,
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
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Medium",
  },
  emptyHint: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Regular",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    gap: 14,
  },
  optionRowPressed: {
    opacity: 0.92,
  },
  /** Full width below the row (including under selected/unselected icon), inset to match `optionRow`. */
  rowSeparator: {
    height: 1,
    marginHorizontal: LIST_ROW_PADDING_H,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  emptyDot: {
    width: 1,
    height: 1,
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
    borderRadius: 24,
  },
  cancelText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  doneBtn: {
    height: 48,
    borderRadius: 24,
  },
});

export default LocationBottomSheetModal;
