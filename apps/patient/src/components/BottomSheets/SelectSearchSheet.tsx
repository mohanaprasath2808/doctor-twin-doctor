import React, { forwardRef, useCallback, useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
  BottomSheetModal as BSModal,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppButton from "../Common/AppButton";
import BottomSheetInputField from "./BottomSheetInputField";
import BottomSheetModal from "./BottomSheetModal";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";
import SearchIcon from "../../assets/icons/search.svg";
import SelectIcon from "../../assets/icons/selectedRoundCheckBox.svg";

export type SelectSearchSheetItem = {
  id: string;
  label: string;
  /** Optional avatar (e.g. provider row). */
  image?: ImageSourcePropType;
};

export type SelectSearchSheetProps = {
  title?: string;
  items: SelectSearchSheetItem[];
  selectedId?: string | null;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  onConfirm?: (id: string) => void;
  onDismiss?: () => void;
};

const SNAP_POINTS = ["45%"] as const;
const LIST_MIN_VISIBLE = 100;

const SelectSearchSheet = forwardRef<BSModal, SelectSearchSheetProps>(
  (
    {
      title = "Select",
      items,
      selectedId = null,
      searchPlaceholder = "Search",
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
      ({ item }: { item: SelectSearchSheetItem }) => {
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
            {item.image != null ? (
              <Image source={item.image} style={styles.rowAvatar} />
            ) : null}
            <Text style={styles.optionText}>{item.label}</Text>
          </Pressable>
        );
      },
      [draftId],
    );

    const keyExtractor = useCallback((item: SelectSearchSheetItem) => item.id, []);

    const ItemSeparator = useCallback(() => <View style={styles.optionSeparator} />, []);

    const renderEmpty = useCallback(
      () => (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No matches</Text>
          <Text style={styles.emptyHint}>Try another search.</Text>
        </View>
      ),
      [],
    );

    const filteredItems =
      searchQuery.trim().length === 0
        ? items
        : items.filter((i) => i.label.toLowerCase().includes(searchQuery.trim().toLowerCase()));

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
          <View style={styles.header}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <BottomSheetInputField
              value={searchQuery}
              onChangeText={handleSearchChangeText}
              placeholder={searchPlaceholder}
              leftIcon={<SearchIcon width={18} height={18} />}
              containerStyle={styles.searchField}
            />
          </View>
          <BottomSheetFlatList
            data={filteredItems}
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

SelectSearchSheet.displayName = "SelectSearchSheet";

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
    gap: 10,
  },
  optionRowPressed: {
    opacity: 0.92,
  },
  rowAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: "cover",
    backgroundColor: COLORS.TEXT_PRIMARY_10,
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

export default SelectSearchSheet;
