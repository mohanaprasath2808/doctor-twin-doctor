import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
  type BottomSheetFooterProps,
  type BottomSheetModal as BSModalType,
} from "@gorhom/bottom-sheet";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomSheetModal from "../BottomSheetModal";
import BottomSheetInputField from "../BottomSheetInputField";
import AppButton from "../../Common/AppButton";
import ReusableButton from "../../../neomorphism/ReusableButton";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import SearchIcon from "../../../assets/icons/search.svg";
import SelectedIcon from "../../../assets/icons/selectedIcon.svg";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import StarIcon from "../../../assets/icons/starYellowIcon.svg";

/** Matches `listRowOuter.paddingHorizontal` so the divider aligns with row content edges. */
const LIST_ROW_PADDING_H = 8;

/** Tall enough for fixed title + search + nested list (same gesture pattern as `SelectPharmacySheet`). */
const SNAP_POINTS = ["78%"] as const;
const LIST_MIN_VISIBLE = 100;

export type SpecialtySheetItem = {
  id: string;
  name: string;
  rating: string;
  distance: string;
  networkLabel: string;
  avatarSource?: ImageSourcePropType;
};

/** In-sheet roster when the screen does not pass `items`. */
export const DEFAULT_SPECIALIST_ITEMS: SpecialtySheetItem[] = [
  {
    id: "1",
    name: "Dr. Lisa Shaw",
    rating: "4.0",
    distance: "1.5 miles away",
    networkLabel: "In-network",
  },
  {
    id: "2",
    name: "Dr. James Chen",
    rating: "4.8",
    distance: "3.5 miles away",
    networkLabel: "In-network",
  },
  {
    id: "3",
    name: "Dr. Rosa Patel",
    rating: "4.2",
    distance: "2.1 miles away",
    networkLabel: "Out-of-network",
  },
  {
    id: "4",
    name: "Dr. Michael Torres",
    rating: "4.6",
    distance: "2.4 miles away",
    networkLabel: "In-network",
  },
  {
    id: "5",
    name: "Dr. Sarah Okonkwo",
    rating: "4.9",
    distance: "0.8 miles away",
    networkLabel: "In-network",
  },
  {
    id: "6",
    name: "Dr. David Kim",
    rating: "4.3",
    distance: "4.2 miles away",
    networkLabel: "In-network",
  },
  {
    id: "7",
    name: "Dr. Emma Lindberg",
    rating: "4.1",
    distance: "5.0 miles away",
    networkLabel: "Out-of-network",
  },
  {
    id: "8",
    name: "Dr. Omar Hassan",
    rating: "4.7",
    distance: "1.9 miles away",
    networkLabel: "In-network",
  },
  {
    id: "9",
    name: "Dr. Priya Nair",
    rating: "4.5",
    distance: "3.0 miles away",
    networkLabel: "In-network",
  },
  {
    id: "10",
    name: "Dr. Logan Brooks",
    rating: "4.0",
    distance: "6.2 miles away",
    networkLabel: "Out-of-network",
  },
];

export type SpecialtyBottomSheetModalProps = {
  items?: SpecialtySheetItem[];
  selectedValue?: string;
  onSelectDone?: (payload: { id: string; name: string }) => void;
  title?: string;
  searchPlaceholder?: string;
  onDismiss?: () => void;
};

const DEFAULT_AVATAR = DoctorTempImage;

const SpecialtyBottomSheetModal = forwardRef<BSModalType, SpecialtyBottomSheetModalProps>(
  (
    {
      items,
      selectedValue = "",
      onSelectDone,
      title = "Select Specialty",
      searchPlaceholder = "Search Specialty",
      onDismiss,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [draftId, setDraftId] = useState<string>("");

    const sourceItems = useMemo(() => items ?? DEFAULT_SPECIALIST_ITEMS, [items]);

    const syncDraftFromProps = useCallback(() => {
      const match = sourceItems.find((i) => i.name === selectedValue.trim());
      setDraftId(match?.id ?? sourceItems[0]?.id ?? "");
    }, [sourceItems, selectedValue]);

    useEffect(() => {
      syncDraftFromProps();
    }, [syncDraftFromProps]);

    const filtered = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return sourceItems;
      return sourceItems.filter(
        (item) =>
          item.name.toLowerCase().includes(q) || item.networkLabel.toLowerCase().includes(q),
      );
    }, [sourceItems, searchQuery]);

    const modalRef = ref as React.RefObject<BSModalType | null>;

    const dismissSheet = useCallback(() => modalRef.current?.dismiss(), []);

    const handleDismiss = useCallback(() => {
      setSearchQuery("");
      onDismiss?.();
    }, [onDismiss]);

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
                  textStyle={styles.footerCancelText}
                  style={styles.cancelBtn}
                  onPress={() => dismissSheet()}
                />
              </View>
              <View style={styles.footerHalf}>
                <ReusableButton
                  title="Done"
                  containerStyle={styles.doneBtn}
                  height={48}
                  borderRadius={64}
                  onPress={() => undefined}
                  textStyle={styles.footerDoneText}
                />
              </View>
            </View>
          </View>
        </BottomSheetFooter>
      ),
      [dismissSheet, draftId, insets.bottom, onSelectDone, sourceItems],
    );

    const renderSpecialistRow = useCallback(
      ({ item }: { item: SpecialtySheetItem }) => {
        const isActive = draftId === item.id;
        const avatar = item.avatarSource ?? DEFAULT_AVATAR;
        return (
          <Pressable
            style={({ pressed }) => [styles.listRowOuter, pressed && styles.listRowOuterPressed]}
            onPress={() => setDraftId(item.id)}
          >
            <View style={styles.radioCol}>
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
            </View>

            <Image source={avatar} style={styles.avatar} />

            <View style={styles.detailsCol}>
              <View style={styles.nameDistanceRow}>
                <Text style={styles.doctorName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.distanceText} numberOfLines={2}>
                  {item.distance}
                </Text>
              </View>
              <View style={styles.metaRow}>
                <StarIcon width={14} height={14} />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <View style={styles.dotView} />
                <Text style={styles.networkText}>{item.networkLabel}</Text>
              </View>
            </View>
          </Pressable>
        );
      },
      [draftId],
    );

    const keyExtractor = useCallback((item: SpecialtySheetItem) => item.id, []);

    const ItemSeparator = useCallback(() => <View style={styles.rowSeparator} />, []);

    const renderEmpty = useCallback(
      () => (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>
            {sourceItems.length === 0 ? "No specialties" : "No matches"}
          </Text>
          <Text style={styles.emptyHint}>
            {sourceItems.length === 0 ? "No data configured in sheet." : "Try a different search."}
          </Text>
        </View>
      ),
      [sourceItems.length],
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
          <View style={styles.header}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <BottomSheetInputField
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={searchPlaceholder}
              leftIcon={<SearchIcon width={18} height={18} />}
              containerStyle={styles.searchField}
            />
          </View>

          <BottomSheetFlatList
            data={filtered}
            keyExtractor={keyExtractor}
            renderItem={renderSpecialistRow}
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

SpecialtyBottomSheetModal.displayName = "SpecialtyBottomSheetModal";

export { SpecialtyBottomSheetModal as SelectSpecialitySheet };

const AVATAR = 36;

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
  listRowOuter: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 10,
  },
  listRowOuterPressed: {
    opacity: 0.92,
  },
  /** Full width below the row (including under radio), inset to match `listRowOuter`. Not rendered after last item. */
  rowSeparator: {
    height: 1,
    marginHorizontal: LIST_ROW_PADDING_H,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  radioCol: {
    justifyContent: "flex-start",
    flexShrink: 0,
    width: 34,
    alignItems: "center",
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    flexShrink: 0,
  },
  detailsCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: "flex-start",
  },
  /** Distance aligns with doctor name, not the star/network row below. */
  nameDistanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  doctorName: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
    gap: 4,
  },
  starGlyph: {
    fontSize: 12,
    lineHeight: 14,
    color: "#FBBF24",
    marginTop: -1,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  networkText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  distanceText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "right",
    flexShrink: 0,
    maxWidth: 104,
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
  footerCancelText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  footerDoneText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  doneBtn: {
    height: 48,
    borderRadius: 24,
  },
  dotView: {
    width: 4,
    height: 4,
    backgroundColor: COLORS.TEXT_PRIMARY_50,
    borderRadius: 2,
  },
});

export default SpecialtyBottomSheetModal;
