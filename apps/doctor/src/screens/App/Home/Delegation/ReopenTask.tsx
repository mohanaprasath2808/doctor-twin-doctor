import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import BottomSheetModal from "../../../../components/BottomSheets/BottomSheetModal";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import ProfileIcon from "../../../../assets/icon/profile.svg";
import navigationStrings from "../../../../constants/navigationStrings";

const REASSIGN_OPTIONS = ["Office Manager", "Maria (MA)", "Billing", "Scheduler", "Other Provider"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const SelectBottomSheetModal = forwardRef<
  BSModal,
  {
    title: string;
    options: string[];
    selectedValue: string;
    onSelectDone: (value: string) => void;
  }
>(({ title, options, selectedValue, onSelectDone }, ref) => {
  const [draftValue, setDraftValue] = useState(selectedValue);
  const snapPoints = useMemo(() => ["43%"], []);

  useEffect(() => {
    setDraftValue(selectedValue);
  }, [selectedValue]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleComponent={null}
      backgroundStyle={styles.sheet}
    >
      <BottomSheetView style={styles.sheetContent}>
        <Text style={styles.sheetTitle}>{title}</Text>

        <FlatList
          data={options}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            const isActive = item === draftValue;
            return (
              <Pressable
                style={[
                  styles.sheetOptionRow,
                  index !== options.length - 1 && styles.sheetOptionSeparator,
                ]}
                onPress={() => setDraftValue(item)}
              >
                {isActive ? (
                  <SelectedIcon width={30} height={30} />
                ) : (
                  <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />
                )}
                <Text style={styles.sheetOptionText}>{item}</Text>
              </Pressable>
            );
          }}
        />

        <View style={styles.sheetFooterRow}>
          <View style={styles.sheetFooterHalf}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.sheetCancelText}
              style={styles.sheetCancelBtn}
              onPress={() => (ref as React.RefObject<BSModal>)?.current?.dismiss()}
            />
          </View>
          <View style={styles.sheetFooterHalf}>
            <ReusableButton
              title="Done"
              containerStyle={styles.sheetDoneBtn}
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

SelectBottomSheetModal.displayName = "SelectBottomSheetModal";

const ReopenTask = () => {
  const navigation = useNavigation<any>();
  const [reason, setReason] = useState("");
  const [reassignTo, setReassignTo] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");

  const reassignBottomSheetRef = useRef<BSModal>(null);
  const priorityBottomSheetRef = useRef<BSModal>(null);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Reopen</Text>
          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingWrapper
          keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
          contentContainerStyle={styles.wrapperContent}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.label}>Why reopening?</Text>
            <InputField
              value={reason}
              onChangeText={setReason}
              placeholder="Write about reopening reason"
              multiline
              numberOfLines={6}
              borderRadius={14}
              minHeight={120}
              containerStyle={styles.reasonInput}
            />

            <Text style={styles.label}>Reassign to who?</Text>
            <Pressable onPress={() => reassignBottomSheetRef.current?.present()}>
              <View pointerEvents="none">
                <InputField
                  value={reassignTo}
                  placeholder="Select"
                  editable={false}
                  leftIcon={<ProfileIcon width={18} height={18} />}
                  rightIcon={<DownArrowIcon width={12} height={12} />}
                  borderRadius={64}
                  minHeight={46}
                  containerStyle={styles.inputNoTopSpace}
                />
              </View>
            </Pressable>

            <Text style={styles.label}>Updated priority</Text>
            <Pressable onPress={() => priorityBottomSheetRef.current?.present()}>
              <View pointerEvents="none">
                <InputField
                  value={updatedPriority}
                  placeholder="Select priority"
                  editable={false}
                  rightIcon={<DownArrowIcon width={12} height={12} />}
                  borderRadius={64}
                  minHeight={46}
                  containerStyle={styles.inputNoTopSpace}
                />
              </View>
            </Pressable>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerButtons}>
              <AppButton
                text="Cancel"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                textStyle={styles.cancelText}
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}
              />
              <ReusableButton
                title="Reopen Task"
                containerStyle={styles.reopenBtn}
                textStyle={styles.reopenText}
                onPress={() => navigation.navigate(navigationStrings.DOCTOR_REVIEW)}
              />
            </View>
          </View>
        </KeyboardAvoidingWrapper>

        <SelectBottomSheetModal
          ref={reassignBottomSheetRef}
          title="Reassign To"
          options={REASSIGN_OPTIONS}
          selectedValue={reassignTo}
          onSelectDone={setReassignTo}
        />
        <SelectBottomSheetModal
          ref={priorityBottomSheetRef}
          title="Select Priority"
          options={PRIORITY_OPTIONS}
          selectedValue={updatedPriority}
          onSelectDone={setUpdatedPriority}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReopenTask;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },

  wrapperContent: { flexGrow: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },

  label: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400", marginTop: 20 },
  inputNoTopSpace: { marginTop: 8 },

  reasonInput: { marginTop: 8 },

  footer: { paddingHorizontal: 16, paddingBottom: 20, marginTop: "auto" },
  footerButtons: { flexDirection: "row", gap: 12 },
  cancelBtn: { flex: 1, height: 48, borderRadius: 24 },
  cancelText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  reopenBtn: { flex: 1, height: 48, borderRadius: 24 },
  reopenText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },

  // bottom sheet
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetContent: { paddingTop: 14, paddingHorizontal: 16, paddingBottom: 16 },
  sheetTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500", marginBottom: 6 },
  sheetOptionRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 14 },
  sheetOptionSeparator: { borderBottomWidth: 1, borderBottomColor: COLORS.TEXT_10 },
  sheetOptionText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  emptyDot: { width: 1, height: 1 },
  sheetFooterRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  sheetFooterHalf: { flex: 1 },
  sheetCancelBtn: { height: 52, borderRadius: 26 },
  sheetCancelText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
  sheetDoneBtn: { height: 52, borderRadius: 26 },
});

