import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal as BSModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../../constants/theme";
import SelectedIcon from "../../assets/icon/selectedIcon.svg";
import AppButton from "../Common/AppButton";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import BottomSheetModal from "./BottomSheetModal";
import DatePickerField from "../../neomorphism/DatePickerField";
import CalendarIcon from "../../assets/icon/calendarIcon.svg";
import DownArrowIcon from "../../assets/icon/downArrow.svg";

const DATE_RANGE_OPTIONS = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "lastWeek", label: "Last week" },
  { key: "lastMonth", label: "Last month" },
  { key: "lastYear", label: "Last year" },
  { key: "custom", label: "Custom" },
] as const;

export type DateRangeKey = (typeof DATE_RANGE_OPTIONS)[number]["key"];

type DateRangeBottomSheetModalProps = {
  selectedValue: DateRangeKey;
  fromDate: Date | null;
  toDate: Date | null;
  onSelectDone: (
    value: DateRangeKey,
    fromDate: Date | null,
    toDate: Date | null,
  ) => void;
  onDismiss?: () => void;
};

const DateRangeBottomSheetModal = forwardRef<
  BSModal,
  DateRangeBottomSheetModalProps
>(({ selectedValue, fromDate, toDate, onSelectDone, onDismiss }, ref) => {
  const [draftValue, setDraftValue] = useState<DateRangeKey>(selectedValue);
  const [draftFromDate, setDraftFromDate] = useState<Date | null>(fromDate);
  const [draftToDate, setDraftToDate] = useState<Date | null>(toDate);
  const snapPoints = useMemo(() => ["55%"], []);

  useEffect(() => {
    setDraftValue(selectedValue);
    setDraftFromDate(fromDate);
    setDraftToDate(toDate);
  }, [selectedValue, fromDate, toDate]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleComponent={null}
      onDismiss={onDismiss}
      backgroundStyle={styles.sheet}
    >
      <BottomSheetView style={styles.content}>
        <Text style={styles.title}>Select Date range</Text>

        <FlatList
          data={DATE_RANGE_OPTIONS}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            const isActive = item.key === draftValue;
            return (
              <Pressable
                style={[
                  styles.optionRow,
                  index !== DATE_RANGE_OPTIONS.length - 1 &&
                    styles.optionSeparator,
                ]}
                onPress={() => setDraftValue(item.key)}
              >
                {isActive ? (
                  <SelectedIcon width={30} height={30} />
                ) : (
                  <InnerShadowIcon
                    size={30}
                    icon={<View style={styles.emptyDot} />}
                  />
                )}
                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            );
          }}
        />

        {draftValue === "custom" ? (
          <View style={styles.customDateSection}>
            <View style={styles.dateFieldCol}>
              <Text style={styles.dateLabel}>From</Text>
              <DatePickerField
                value={draftFromDate}
                onChange={setDraftFromDate}
                placeholder="Select date"
                leftIcon={<CalendarIcon width={16} height={16} />}
                rightIcon={<DownArrowIcon width={10} height={10} />}
                containerStyle={styles.dateField}
              />
            </View>
            <View style={styles.dateFieldCol}>
              <Text style={styles.dateLabel}>To</Text>
              <DatePickerField
                value={draftToDate}
                onChange={setDraftToDate}
                placeholder="Select date"
                leftIcon={<CalendarIcon width={16} height={16} />}
                rightIcon={<DownArrowIcon width={10} height={10} />}
                containerStyle={styles.dateField}
              />
            </View>
          </View>
        ) : null}

        <View style={styles.footerRow}>
          <View style={styles.footerHalf}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.cancelText}
              style={styles.cancelBtn}
              onPress={() =>
                (ref as React.RefObject<BSModal>)?.current?.dismiss()
              }
            />
          </View>
          <View style={styles.footerHalf}>
            <ReusableButton
              title="Done"
              containerStyle={styles.doneBtn}
              onPress={() => {
                onSelectDone(draftValue, draftFromDate, draftToDate);
                (ref as React.RefObject<BSModal>)?.current?.dismiss();
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  optionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_10,
  },
  optionText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyDot: { width: 1, height: 1 },
  customDateSection: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateFieldCol: { width: "48%" },
  dateLabel: { fontSize: 14, color: COLORS.TEXT_60, fontWeight: "400" },
  dateField: { marginTop: 6 },
  footerRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  footerHalf: { flex: 1 },
  cancelBtn: { height: 48, borderRadius: 24 },
  cancelText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
  doneBtn: { height: 48, borderRadius: 24 },
});

DateRangeBottomSheetModal.displayName = "DateRangeBottomSheetModal";

export default DateRangeBottomSheetModal;
