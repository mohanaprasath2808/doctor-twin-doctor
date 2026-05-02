import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal as BSModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { COLORS } from "../../constants/theme";
import AppButton from "../Common/AppButton";
import NeumorphicRadioMark from "../Common/NeumorphicRadioMark";
import ReusableButton from "../neomorphism/ReusableButton";
import BottomSheetModal from "./BottomSheetModal";

type LocationBottomSheetModalProps = {
  title?: string;
  options: string[];
  selectedValue: string;
  onSelectDone: (value: string) => void;
  onDismiss?: () => void;
};

const LocationBottomSheetModal = forwardRef<BSModal, LocationBottomSheetModalProps>(
  ({ title = "Select Provider", options, selectedValue, onSelectDone, onDismiss }, ref) => {
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
          <Text style={styles.title}>{title}</Text>

          <FlatList
            data={options}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Pressable
                style={[styles.optionRow, index !== options.length - 1 && styles.optionSeparator]}
                onPress={() => setDraftValue(item)}
              >
                <NeumorphicRadioMark selected={item === draftValue} />
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
          />

          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                text="Cancel"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
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
                  onSelectDone(draftValue);
                  (ref as React.RefObject<BSModal>)?.current?.dismiss();
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

LocationBottomSheetModal.displayName = "LocationBottomSheetModal";

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.INNER_SURFACE,
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
    paddingVertical: 12,
    gap: 12,
  },
  optionSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.TEXT_20,
  },
  optionText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 14,
  },
  footerHalf: {
    flex: 1,
  },
  cancelBtn: {
    borderRadius: 26,
  },
  cancelText: {
    color: COLORS.GREEN,
    fontSize: 16,
    fontWeight: "500",
  },
  doneBtn: {
    borderRadius: 26,
  },
});

export default LocationBottomSheetModal;
