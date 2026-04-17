import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal as BSModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import PlusIcon from "../../../../assets/icon/plusIcon.svg";

import IconComponent from "../../../../neomorphism/IconComponent";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import InputField from "../../../../neomorphism/InputField";
import DatePickerField from "../../../../neomorphism/DatePickerField";
import AppButton from "../../../../components/Common/AppButton";
import { COLORS } from "../../../../constants/theme";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import BottomSheetModal from "../../../../components/BottomSheets/BottomSheetModal";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";
import ProfileIcon from "../../../../assets/icon/profile.svg";
import navigationStrings from "../../../../constants/navigationStrings";

type AttachmentItem = {
  name: string;
  uri: string;
  size?: number;
  mimeType?: string;
};

const formatDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const ASSIGNEE_OPTIONS = ["Maria (MA)", "Office Manager", "Scheduler", "Nurse"];

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
          style={styles.sheetOptions}
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

const CreateTask = () => {
  const navigation = useNavigation<any>();
  const [patientName, setPatientName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [assignee, setAssignee] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);

  const priorityBottomSheetRef = useRef<BSModal>(null);
  const assigneeBottomSheetRef = useRef<BSModal>(null);

  const dueDateText = useMemo(
    () => (dueDate ? formatDate(dueDate) : "Select date"),
    [dueDate],
  );

  const pickAttachments = async () => {
    let DocumentPicker: typeof import("expo-document-picker");
    try {
      DocumentPicker = await import("expo-document-picker");
    } catch {
      Alert.alert(
        "Attachments unavailable",
        "Document Picker native module isn't available in this build. Please rebuild the app to enable attachments.",
      );
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({ multiple: true, copyToCacheDirectory: false });

    if (result.canceled) return;

    const next = result.assets.map((a) => ({
      name: a.name ?? "Attachment",
      uri: a.uri,
      size: a.size,
      mimeType: a.mimeType,
    }));

    setAttachments((prev) => {
      const existing = new Set(prev.map((p) => p.uri));
      return [...prev, ...next.filter((n) => !existing.has(n.uri))];
    });
  };

  const removeAttachment = (uri: string) => {
    setAttachments((prev) => prev.filter((a) => a.uri !== uri));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Create Task</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingWrapper
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        contentContainerStyle={styles.wrapperContent}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Patient name</Text>
          <InputField
            placeholder="Enter patient name"
            value={patientName}
            leftIcon={<ProfileIcon width={18} height={18} />}
            onChangeText={setPatientName}
            containerStyle={styles.inputNoTopSpace}
            minHeight={46}
            borderRadius={64}
          />

          <Text style={styles.label}>Task type</Text>
          <InputField
            placeholder="Enter task type"
            value={taskType}
            onChangeText={setTaskType}
            containerStyle={styles.inputNoTopSpace}
            minHeight={46}
            borderRadius={64}
          />

          <Text style={styles.label}>Priority</Text>
          <Pressable onPress={() => priorityBottomSheetRef.current?.present()}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select priority"
                value={priority}
                editable={false}
                rightIcon={<DownArrowIcon width={12} height={12} />}
                containerStyle={styles.inputNoTopSpace}
                minHeight={46}
                borderRadius={64}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Due Date</Text>
          <DatePickerField
            placeholder={dueDateText}
            leftIcon={<CalendarIcon width={18} height={18} />}
            rightIcon={<DownArrowIcon width={12} height={12} />}
            value={dueDate}
            onChange={setDueDate}
            containerStyle={styles.inputNoTopSpace}
          />

          <Text style={styles.label}>Assign to</Text>
          <Pressable onPress={() => assigneeBottomSheetRef.current?.present()}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select"
                value={assignee}
                editable={false}
                leftIcon={<ProfileIcon width={18} height={18} />}
                rightIcon={<DownArrowIcon width={12} height={12} />}
                containerStyle={styles.inputNoTopSpace}
                minHeight={46}
                borderRadius={64}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Attachments</Text>
          <AppButton
            text="Attach"
            leftIcon={<PlusIcon width={18} height={18} />}
            iconSize={18}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.attachText}
            style={styles.attachButton}
            onPress={pickAttachments}
          />

          {attachments.length > 0 && (
            <NeumorphicCard outerStyle={styles.attachOuter} innerStyle={styles.attachInner} borderRadius={64}>
              <FlatList
                data={attachments}
                keyExtractor={(item) => item.uri}
                scrollEnabled={false}
                contentContainerStyle={styles.attachList}
                ItemSeparatorComponent={() => <View style={styles.attachSeparator} />}
                renderItem={({ item }) => (
                  <View style={styles.attachRow}>
                    <View style={styles.attachLeft}>
                      <InnerShadowIcon size={34} icon={<Text style={styles.fileIconText}>📄</Text>} radius={10} />
                      <Text style={styles.attachName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                    <IconComponent
                      icon={<Text style={styles.removeText}>×</Text>}
                      width={28}
                      height={28}
                      radius={14}
                      onPress={() => removeAttachment(item.uri)}
                    />
                  </View>
                )}
              />
            </NeumorphicCard>

          )}

          <Text style={styles.label}>Clinical Notes</Text>
          <InputField
            placeholder="Enter Clinical Notes"
            value={clinicalNotes}
            onChangeText={setClinicalNotes}
            multiline
            numberOfLines={5}
            borderRadius={64}
            minHeight={46}
            containerStyle={styles.inputNoTopSpace}
          />
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.cancelWrap}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.SURFACE}
              textStyle={styles.cancelText}
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.addWrap}>
            <ReusableButton
              title="Continue to Delegation"
              onPress={() => navigation.navigate(navigationStrings.DELEGATION_ROUTE)}
              containerStyle={styles.addBtn}
              textStyle={styles.addBtnText}
            />
          </View>
        </View>
      </KeyboardAvoidingWrapper>

      <SelectBottomSheetModal
        ref={priorityBottomSheetRef}
        title="Select Priority"
        options={["Low", "Medium", "High"]}
        selectedValue={priority}
        onSelectDone={setPriority}
      />
      <SelectBottomSheetModal
        ref={assigneeBottomSheetRef}
        title="Assign To"
        options={ASSIGNEE_OPTIONS}
        selectedValue={assignee}
        onSelectDone={setAssignee}
      />
    </SafeAreaView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  wrapperContent: { paddingBottom: 16 },
  form: { paddingHorizontal: 16, paddingTop: 8, gap: 8 },
  inputNoTopSpace: { marginTop: 0 },
  label: {
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "400",
    marginTop: 20,
  },
  attachOuter: { marginTop: 0 },
  attachInner: { borderRadius: 64, paddingVertical: 6, paddingHorizontal: 6 },
  attachButton: { width: "100%", height: 46, borderRadius: 23 },
  attachText: { color: COLORS.PRIMARY_DARK, fontSize: 14, fontWeight: "600" },
  attachList: { marginTop: 10 },
  attachSeparator: { height: 10 },
  attachRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#F9FAFC",
  },
  attachLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, minWidth: 0 },
  fileIconText: { fontSize: 14 },
  attachName: { flex: 1, color: COLORS.TEXT_DARK, fontSize: 13, fontWeight: "500" },
  removeText: { color: COLORS.TEXT_60, fontSize: 18, fontWeight: "500", marginTop: -2 },
  buttonRow: {
    marginTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: "row",
    gap: 12,
  },
  cancelWrap: { flex: 1 },
  addWrap: { flex: 1 },
  cancelBtn: { height: 48, borderRadius: 24 },
  cancelText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
  addBtn: { height: 48, borderRadius: 24 },
  addBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },

  // bottom sheet
  sheet: {
    backgroundColor: COLORS.SURFACE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetContent: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sheetTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  sheetOptions: {},
  sheetOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  sheetOptionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_10,
  },
  sheetOptionText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyDot: { width: 1, height: 1 },
  sheetFooterRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  sheetFooterHalf: { flex: 1 },
  sheetCancelBtn: { height: 52, borderRadius: 26 },
  sheetCancelText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
  sheetDoneBtn: { height: 52, borderRadius: 26 },
});

