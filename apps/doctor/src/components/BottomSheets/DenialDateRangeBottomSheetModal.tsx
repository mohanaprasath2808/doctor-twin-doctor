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

export const DENIAL_DATE_RANGE_OPTIONS = [
  "Last 30 Days",
  "Last 60 Days",
  "Last 90 Days",
  "Last 12 Months",
] as const;

type DenialDateRangeBottomSheetModalProps = {
  selectedValue: string;
  onSelectDone: (value: string) => void;
  onDismiss?: () => void;
};

const DenialDateRangeBottomSheetModal = forwardRef<
  BSModal,
  DenialDateRangeBottomSheetModalProps
>(({ selectedValue, onSelectDone, onDismiss }, ref) => {
  const [draftValue, setDraftValue] = useState(selectedValue);
  const snapPoints = useMemo(() => ["40%"], []);

  useEffect(() => {
    setDraftValue(selectedValue);
  }, [selectedValue]);

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
        <Text style={styles.title}>Select Date Range</Text>

        <FlatList
          data={DENIAL_DATE_RANGE_OPTIONS}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            const isActive = item === draftValue;
            return (
              <Pressable
                style={[
                  styles.optionRow,
                  index !== DENIAL_DATE_RANGE_OPTIONS.length - 1 && styles.optionSeparator,
                ]}
                onPress={() => setDraftValue(item)}
              >
                {isActive ? (
                  <SelectedIcon width={30} height={30} />
                ) : (
                  <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />
                )}
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            );
          }}
        />

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
                onSelectDone(draftValue);
                (ref as React.RefObject<BSModal>)?.current?.dismiss();
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

DenialDateRangeBottomSheetModal.displayName = "DenialDateRangeBottomSheetModal";

export default DenialDateRangeBottomSheetModal;

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
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
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
    fontFamily: "SF-Pro-Text-Medium",
  },
  emptyDot: { width: 1, height: 1 },
  footerRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  footerHalf: { flex: 1 },
  cancelBtn: { height: 52, borderRadius: 26 },
  cancelText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Medium",
  },
  doneBtn: { height: 52, borderRadius: 26 },
});
