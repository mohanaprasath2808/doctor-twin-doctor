import React, { useMemo, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import TimerIcon from "../../../../assets/icon/timerIcon.svg";
import IconComponent from "../../../../neomorphism/IconComponent";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import InputField from "../../../../neomorphism/InputField";
import DatePickerField from "../../../../neomorphism/DatePickerField";
import TimePickerField from "../../../../components/Common/TimePickerField";
import AppButton from "../../../../components/Common/AppButton";
import { COLORS } from "../../../../constants/theme";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import PriorityBottomSheetModal from "../../../../components/BottomSheets/PriorityBottomSheetModal";

const formatDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const CreateTask = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [taskType, setTaskType] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const priorityBottomSheetRef = useRef<BottomSheetModal>(null);
  const dueDateText = useMemo(
    () => (dueDate ? formatDate(dueDate) : "Select due date"),
    [dueDate],
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
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
          <Text style={styles.label}>Task Title</Text>
          <InputField
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            containerStyle={styles.inputNoTopSpace}
          />

          <Text style={styles.label}>Task type</Text>
          <InputField
            placeholder="Enter task type"
            value={taskType}
            onChangeText={setTaskType}
            containerStyle={styles.inputNoTopSpace}
          />

          <Text style={styles.label}>Priority</Text>
          <Pressable onPress={() => priorityBottomSheetRef.current?.present()}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select priority"
                value={priority}
                editable={false}
                rightIcon={<RightArrowIcon width={10} height={10} />}
                containerStyle={styles.inputNoTopSpace}
              />
            </View>
          </Pressable>

          <View style={styles.rowLabels}>
            <Text style={[styles.label, styles.rowLabel]}>Due Date</Text>
            <Text style={[styles.label, styles.rowLabel]}>Time</Text>
          </View>
          <View style={styles.rowFields}>
            <View style={styles.halfField}>
              <DatePickerField
                placeholder={dueDateText}
                leftIcon={<CalendarIcon width={18} height={18} />}
                value={dueDate}
                onChange={setDueDate}
              />
            </View>
            <View style={styles.halfField}>
              <TimePickerField
                value={time}
                onChange={setTime}
                placeholder="Enter time"
                leftIcon={<TimerIcon width={18} height={18} />}
                containerStyle={styles.inputNoTopSpace}
                textStyle={styles.compactFieldText}
              />
            </View>
          </View>

          <Text style={styles.label}>Notes</Text>
          <InputField
            placeholder="Add notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={5}
            borderRadius={10}
            minHeight={120}
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
              title="Add Task"
              onPress={() => {}}
              containerStyle={styles.addBtn}
              backgroundColor="#2E3A8C"
              textColor="#FFFFFF"
              textStyle={styles.addBtnText}
            />
          </View>
        </View>
      </KeyboardAvoidingWrapper>

      <PriorityBottomSheetModal
        ref={priorityBottomSheetRef}
        selectedValue={priority}
        onSelectDone={(value) => setPriority(value)}
      />
    </SafeAreaView>
  );
};

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
  wrapperContent: { paddingBottom: 20 },
  form: { paddingHorizontal: 16, paddingTop: 8, gap: 8 },
  inputNoTopSpace: { marginTop: 0 },
  label: {
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "400",
    marginTop: 8,
  },
  rowLabels: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  rowLabel: { flex: 1 },
  rowFields: { flexDirection: "row", gap: 12 },
  compactFieldText: { fontSize: 13 },
  halfField: { flex: 1 },
  buttonRow: {
    marginTop: "auto",
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
  addBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
});

export default CreateTask;
