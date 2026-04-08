import React, { useMemo, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import AppButton from "../../../../components/Common/AppButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const dueDateText = useMemo(
    () => (dueDate ? formatDate(dueDate) : "Enter due date"),
    [dueDate],
  );
  const timeText = useMemo(
    () => (time ? formatTime(time) : "Enter time"),
    [time],
  );

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (event.type === "set" && selectedDate) setDueDate(selectedDate);
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === "android") setShowTimePicker(false);
    if (event.type === "set" && selectedTime) setTime(selectedTime);
  };

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
        <InputField
          placeholder="Select priority"
          value={priority}
          onChangeText={setPriority}
          rightIcon={<RightArrowIcon width={10} height={10} />}
          containerStyle={styles.inputNoTopSpace}
        />

        <View style={styles.rowLabels}>
          <Text style={[styles.label, styles.rowLabel]}>Due Date</Text>
          <Text style={[styles.label, styles.rowLabel]}>Time</Text>
        </View>
        <View style={styles.rowFields}>
          <View style={styles.halfField}>
            <InputField
              placeholder={dueDateText}
              editable={false}
              leftIcon={<CalendarIcon width={18} height={18} />}
              rightIcon={<RightArrowIcon width={10} height={10} />}
              onPressIn={() => setShowDatePicker(true)}
              containerStyle={styles.inputNoTopSpace}
              style={styles.compactFieldText}
            />
          </View>
          <View style={styles.halfField}>
            <InputField
              placeholder={timeText}
              editable={false}
              leftIcon={<ScheduleIcon width={18} height={18} />}
              onPressIn={() => setShowTimePicker(true)}
              containerStyle={styles.inputNoTopSpace}
              style={styles.compactFieldText}
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
          />
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={dueDate ?? new Date()}
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={onDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={time ?? new Date()}
          display={Platform.OS === "ios" ? "spinner" : "clock"}
          onChange={onTimeChange}
        />
      )}
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
  cancelBtn: { height: 52, borderRadius: 26 },
  cancelText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
  addBtn: { height: 52, borderRadius: 26 },
});

export default CreateTask;
