import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

const NEW_ASSIGNEE_OPTIONS = ["Maria (MA)", "Office Manager", "Billing", "Scheduler", "Other Provider"];

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
        <View>
          {options.map((opt, idx) => {
            const isActive = opt === draftValue;
            return (
              <Pressable
                key={opt}
                style={[
                  styles.sheetOptionRow,
                  idx !== options.length - 1 && styles.sheetOptionSeparator,
                ]}
                onPress={() => setDraftValue(opt)}
              >
                {isActive ? (
                  <SelectedIcon width={30} height={30} />
                ) : (
                  <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />
                )}
                <Text style={styles.sheetOptionText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
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

const ReassignTask = () => {
  const navigation = useNavigation<any>();
  const [newAssignee, setNewAssignee] = useState("");
  const [reason, setReason] = useState("");
  const assigneeSheetRef = useRef<BSModal>(null);

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
          <Text style={styles.headerTitle}>Reassign</Text>
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
            <NeumorphicCard outerStyle={styles.currentOuter} innerStyle={styles.currentInner} borderRadius={14}>
              <Text style={styles.currentTitle}>Current assignee</Text>
              <View style={styles.currentRow}>
                <Image source={DoctorTempImage} style={styles.currentAvatar} />
                <View style={styles.currentTextWrap}>
                  <Text style={styles.currentName}>Rebecca K</Text>
                  <Text style={styles.currentRole}>Staff</Text>
                </View>
              </View>
            </NeumorphicCard>

            <Text style={styles.label}>New assignee</Text>
            <Pressable onPress={() => assigneeSheetRef.current?.present()}>
              <View pointerEvents="none">
                <InputField
                  value={newAssignee}
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

            <Text style={styles.label}>Reason</Text>
            <InputField
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason"
              multiline
              numberOfLines={6}
              borderRadius={14}
              minHeight={120}
              containerStyle={styles.reasonInput}
            />
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
                title="Reassign Task"
                containerStyle={styles.reassignBtn}
                textStyle={styles.reassignText}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </KeyboardAvoidingWrapper>

        <SelectBottomSheetModal
          ref={assigneeSheetRef}
          title="Select New Assignee"
          options={NEW_ASSIGNEE_OPTIONS}
          selectedValue={newAssignee}
          onSelectDone={setNewAssignee}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReassignTask;

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
  content: { paddingHorizontal: 16, paddingTop: 30, paddingBottom: 24 },
  currentOuter: { width: "100%" },
  currentInner: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 12 },
  currentTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  currentRow: { marginTop: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  currentAvatar: { width: 40, height: 40, borderRadius: 23, resizeMode: "cover" },
  currentTextWrap: { flex: 1 },
  currentName: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "400" },
  currentRole: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 2 },
  label: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400", marginTop: 20 },
  inputNoTopSpace: { marginTop: 8 },
  reasonInput: { marginTop: 8 },
  footer: { paddingHorizontal: 16, paddingBottom: 20, marginTop: "auto" },
  footerButtons: { flexDirection: "row", gap: 12 },
  cancelBtn: { flex: 1, height: 48, borderRadius: 24 },
  cancelText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  reassignBtn: { flex: 1, height: 48, borderRadius: 24 },
  reassignText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },

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

