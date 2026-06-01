import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHandle,
  BottomSheetModal as BSModal,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SearchIcon from "../../assets/icon/searchIcon.svg";
import SelectedIcon from "../../assets/icon/selectedIcon.svg";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../Common/AppButton";
import BottomSheetInputField from "./BottomSheetInputField";
import BottomSheetModal from "./BottomSheetModal";
import InnerShadowIcon from "../neomorphism/InnerShadowIcon";
import ReusableButton from "../neomorphism/ReusableButton";
import { COLORS } from "../../constants/theme";

export type CallPatientOption = {
  id: string;
  name: string;
  age: number;
  room: string;
  avatar: ImageSourcePropType;
};

const DEFAULT_PATIENTS: CallPatientOption[] = [
  { id: "1", name: "Sarah Williams", age: 45, room: "5", avatar: DoctorTempImage },
  { id: "2", name: "Lisa Shaw", age: 45, room: "5", avatar: DoctorTempImage },
];

type SelectAndCallPatientSheetProps = {
  patients?: CallPatientOption[];
  selectedPatientId: string;
  onSelectDone: (patient: CallPatientOption) => void;
  onDismiss?: () => void;
};

const SNAP_POINTS = ["58%"] as const;
const LIST_MIN_VISIBLE = 100;

const SelectAndCallPatientSheet = forwardRef<BSModal, SelectAndCallPatientSheetProps>(
  (
    { patients = DEFAULT_PATIENTS, selectedPatientId, onSelectDone, onDismiss },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const [draftId, setDraftId] = useState(selectedPatientId);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      setDraftId(selectedPatientId);
    }, [selectedPatientId]);

    const handleSearchChangeText = useCallback((text: string) => {
      setSearchQuery(text);
    }, []);

    const handleDismiss = useCallback(() => {
      setSearchQuery("");
      onDismiss?.();
    }, [onDismiss]);

    const modalRef = ref as React.RefObject<BSModal | null>;

    const filteredPatients = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return patients;
      return patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.age).includes(q) ||
          p.room.toLowerCase().includes(q),
      );
    }, [patients, searchQuery]);

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
                  bgColor={COLORS.INNER_SURFACE}
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
                    const selected =
                      patients.find((p) => p.id === draftId) ?? patients[0];
                    if (selected) {
                      onSelectDone(selected);
                      modalRef.current?.dismiss();
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </BottomSheetFooter>
      ),
      [draftId, insets.bottom, onSelectDone, patients],
    );

    const renderItem = useCallback(
      ({ item }: { item: CallPatientOption }) => {
        const isActive = item.id === draftId;
        return (
          <Pressable
            onPress={() => setDraftId(item.id)}
            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
          >
            {isActive ? (
              <SelectedIcon width={26} height={26} />
            ) : (
              <InnerShadowIcon size={26} radius={13} icon={<View style={styles.emptyDot} />} />
            )}
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.optionTextWrap}>
              <Text style={styles.optionName}>{item.name}</Text>
              <Text style={styles.optionMeta}>
                Age {item.age} • Room: {item.room}
              </Text>
            </View>
          </Pressable>
        );
      },
      [draftId],
    );

    const keyExtractor = useCallback((item: CallPatientOption) => item.id, []);

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
            <Text style={styles.sheetTitle}>Select Patient</Text>
            <BottomSheetInputField
              value={searchQuery}
              onChangeText={handleSearchChangeText}
              placeholder="Search patient"
              leftIcon={<SearchIcon width={18} height={18} />}
              containerStyle={styles.searchField}
              borderRadius={30}
              height={46}
            />
          </View>
          <BottomSheetFlatList
            data={filteredPatients}
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

SelectAndCallPatientSheet.displayName = "SelectAndCallPatientSheet";

export default SelectAndCallPatientSheet;

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: COLORS.INNER_SURFACE,
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
    backgroundColor: COLORS.TEXT_20,
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
    color: COLORS.TEXT_DARK,
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
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  emptyHint: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.TEXT_60,
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
    backgroundColor: COLORS.TEXT_10,
  },
  optionTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  optionName: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    fontWeight: "600",
  },
  optionMeta: {
    marginTop: 2,
    color: COLORS.TEXT_60,
    fontSize: 13,
    fontWeight: "400",
  },
  optionSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginHorizontal: 8,
  },
  emptyDot: {
    width: 2,
    height: 2,
  },
  footerSheet: {
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerInner: {
    paddingTop: 12,
    paddingHorizontal: 8,
    paddingBottom: 0,
    backgroundColor: COLORS.INNER_SURFACE,
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
