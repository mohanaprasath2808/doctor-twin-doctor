import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  BottomSheetModal as BSModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../../constants/theme";
import SelectedIcon from "../../assets/icon/selectedIcon.svg";
import AppButton from "../Common/AppButton";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../Common/NeumorphicCard";
import BottomSheetModal from "./BottomSheetModal";

export type DenyReasonOption = {
  id: string;
  label: string;
};

type RefillDenyReasonBottomSheetModalProps = {
  selectedValue: string;
  otherReason: string;
  onSelectDone: (value: string, otherReason: string) => void;
  onDismiss?: () => void;
};

const REASON_OPTIONS: DenyReasonOption[] = [
  { id: "controlled-substance", label: "Controlled substance - appointment required" },
  { id: "refill-too-early", label: "Refill too early" },
  { id: "patient-must-be-seen", label: "Patient must be seen" },
  { id: "labs-required", label: "Labs required before refill" },
  { id: "not-prescribed", label: "Not prescribed by this practice" },
  { id: "medication-discontinued", label: "Medication discontinued" },
  { id: "insurance-pa", label: "Insurance / PA required" },
  { id: "others", label: "Others" },
];

const RefillDenyReasonBottomSheetModal = forwardRef<
  BSModal,
  RefillDenyReasonBottomSheetModalProps
>(({ selectedValue, otherReason, onSelectDone, onDismiss }, ref) => {
  const [draftValue, setDraftValue] = useState(selectedValue);
  const [draftOtherReason, setDraftOtherReason] = useState(otherReason);
  const snapPoints = useMemo(() => ["73%"], []);

  useEffect(() => {
    setDraftValue(selectedValue);
    setDraftOtherReason(otherReason);
  }, [selectedValue, otherReason]);

  const renderReasonItem = ({
    item,
    index,
  }: {
    item: DenyReasonOption;
    index: number;
  }) => {
    const isActive = item.id === draftValue;
    const isLast = index === REASON_OPTIONS.length - 1;

    return (
      <View>
        <Pressable style={styles.optionRow} onPress={() => setDraftValue(item.id)}>
          {isActive ? (
            <SelectedIcon width={26} height={26} />
          ) : (
            <InnerShadowIcon size={26} icon={<View style={styles.emptyDot} />} />
          )}
          <Text style={styles.optionText}>{item.label}</Text>
        </Pressable>
        {!isLast && <View style={styles.optionSeparator} />}
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleComponent={null}
      onDismiss={onDismiss}
      backgroundStyle={styles.sheet}
      keyboardBehavior="extend"
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetView style={styles.content}>
        <Text style={styles.title}>Select Reason</Text>

        <FlatList
          data={REASON_OPTIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={renderReasonItem}
        />

        {draftValue === "others" && (
          <NeumorphicCard
            outerStyle={styles.otherReasonOuter}
            innerStyle={styles.otherReasonInner}
            borderRadius={64}
          >
            <BottomSheetTextInput
              value={draftOtherReason}
              onChangeText={setDraftOtherReason}
              placeholder="Enter reason"
              placeholderTextColor={COLORS.TEXT_40}
              style={styles.otherReasonInput}
            />
          </NeumorphicCard>
        )}

        <View style={styles.footerRow}>
          <View style={styles.footerHalf}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.cancelText}
              style={styles.cancelBtn}
              onPress={() => (ref as React.RefObject<BSModal>)?.current?.dismiss()}
            />
          </View>
          <View style={styles.footerHalf}>
            <ReusableButton
              title="Done"
              containerStyle={styles.doneBtn}
              onPress={() => {
                onSelectDone(draftValue, draftOtherReason);
                (ref as React.RefObject<BSModal>)?.current?.dismiss();
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

RefillDenyReasonBottomSheetModal.displayName = "RefillDenyReasonBottomSheetModal";

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  title: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    gap: 12,
  },
  optionSeparator: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
  },
  optionText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyDot: { width: 1, height: 1 },
  otherReasonOuter: {
    marginTop: 12,
  },
  otherReasonInner: {
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  otherReasonInput: {
    color: COLORS.TEXT_DARK,
    fontSize: 13,
    fontWeight: "400",
    paddingVertical: 0,
  },
  footerRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  footerHalf: { flex: 1 },
  cancelBtn: { height: 48, borderRadius: 26 },
  cancelText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
  doneBtn: { height: 48, borderRadius: 26 },
});

export default RefillDenyReasonBottomSheetModal;
