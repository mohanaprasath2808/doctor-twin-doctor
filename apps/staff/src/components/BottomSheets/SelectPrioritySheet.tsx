import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal as BSModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { COLORS } from "../../constants/theme";
import AppButton from "../Common/AppButton";
import NeumorphicRadioMark from "../Common/NeumorphicRadioMark";
import ReusableButton from "../neomorphism/ReusableButton";
import BottomSheetModal from "./BottomSheetModal";

const PRIORITY_OPTIONS = ["Low", "Medium", "High"] as const;
const FOOTER_ACTION_HEIGHT = 52;

type SelectPrioritySheetProps = {
  selectedValue: string | null;
  onSelectDone: (value: string) => void;
  onDismiss?: () => void;
};

const SelectPrioritySheet = forwardRef<BSModal, SelectPrioritySheetProps>(
  ({ selectedValue, onSelectDone, onDismiss }, ref) => {
    const [draftValue, setDraftValue] = useState<string | null>(selectedValue);
    const snapPoints = useMemo(() => ["36%"], []);

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
          <Text style={styles.title}>Select priority</Text>

          <FlatList
            data={[...PRIORITY_OPTIONS]}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Pressable
                style={[
                  styles.optionRow,
                  index !== PRIORITY_OPTIONS.length - 1 && styles.optionSeparator,
                ]}
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
                height={FOOTER_ACTION_HEIGHT}
                borderRadius={FOOTER_ACTION_HEIGHT / 2}
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
                height={FOOTER_ACTION_HEIGHT}
                borderRadius={FOOTER_ACTION_HEIGHT / 2}
                containerStyle={styles.doneBtn}
                gradientColors={["#A7F3D0", "#166534"]}
                backgroundColor={COLORS.PRIMARY}
                onPress={() => {
                  if (draftValue) onSelectDone(draftValue);
                  (ref as React.RefObject<BSModal>)?.current?.dismiss();
                }}
                textStyle={styles.doneBtnText}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

SelectPrioritySheet.displayName = "SelectPrioritySheet";

export default SelectPrioritySheet;

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
    fontFamily: "SF-Pro-Text-Medium",
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
    fontFamily: "SF-Pro-Text-Medium",
  },
  footerRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    overflow: "visible",
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
    overflow: "visible",
  },
  cancelBtn: {
    width: "100%",
  },
  cancelText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  doneBtn: {
    width: "100%",
  },
  doneBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
