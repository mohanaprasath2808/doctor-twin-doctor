import React, { useMemo, useRef, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import DatePickerField from "../../../../neomorphism/DatePickerField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import AppButton from "../../../../components/Common/AppButton";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import LocationBottomSheetModal from "../../../../components/BottomSheets/LocationBottomSheetModal";
import TimePickerField from "../../../../components/Common/TimePickerField";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import TimerIcon from "../../../../assets/icon/timerIcon.svg";
const formatDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const reminderOptions = [
  "At time of event",
  "5 minutes before",
  "10 minutes before",
  "30 minutes before",
  "1 hour before",
];
const locationOptions = ["Conference Room", "Zoom", "Dr.Soliman Office"];

const AddEvent = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [selectedReminder, setSelectedReminder] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const locationBottomSheetRef = useRef<BottomSheetModal>(null);

  const dateText = useMemo(
    () => (date ? formatDate(date) : "Select date"),
    [date],
  );
  const reminderText = useMemo(
    () => (selectedReminder ? selectedReminder : "Select reminder"),
    [selectedReminder],
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
        <Text style={styles.headerTitle}>Add Event</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingWrapper
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        contentContainerStyle={styles.wrapperContent}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Event Title</Text>
          <InputField
            placeholder="Enter event title"
            value={title}
            onChangeText={setTitle}
            containerStyle={styles.inputNoTopSpace}
          />

          <Text style={styles.label}>Location</Text>
          <Pressable onPress={() => locationBottomSheetRef.current?.present()}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select location"
                value={location}
                editable={false}
                rightIcon={<RightArrowIcon width={10} height={10} />}
                containerStyle={styles.inputNoTopSpace}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Date</Text>
          <DatePickerField
            placeholder={dateText}
            leftIcon={<CalendarIcon width={18} height={18} />}
            value={date}
            onChange={setDate}
          />

          <View style={styles.rowLabels}>
            <Text style={[styles.label, styles.rowLabel]}>Start Time</Text>
            <Text style={[styles.label, styles.rowLabel]}>End Time</Text>
          </View>
          <View style={styles.rowFields}>
            <View style={styles.halfField}>
              <TimePickerField
                value={startTime}
                onChange={setStartTime}
                placeholder="Start time"
                leftIcon={<TimerIcon width={18} height={18} />}
                containerStyle={styles.inputNoTopSpace}
                textStyle={styles.compactFieldText}
              />
            </View>
            <View style={styles.halfField}>
              <TimePickerField
                value={endTime}
                onChange={setEndTime}
                placeholder="End time"
                leftIcon={<TimerIcon width={18} height={18} />}
                containerStyle={styles.inputNoTopSpace}
                textStyle={styles.compactFieldText}
              />
            </View>
          </View>

          <Text style={styles.label}>Description</Text>
          <InputField
            placeholder="Add description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            borderRadius={10}
            minHeight={120}
            containerStyle={styles.inputNoTopSpace}
          />

          <Text style={styles.label}>Reminder</Text>
          <InputField
            placeholder={reminderText}
            editable={false}
            rightIcon={<DownArrowIcon width={10} height={10} />}
            containerStyle={styles.inputNoTopSpace}
            onPressIn={() => setShowReminderModal(true)}
            style={styles.compactFieldText}
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
              title="Save Event"
              onPress={() => {}}
              containerStyle={styles.addBtn}
              backgroundColor="#2E3A8C"
              textColor="#FFFFFF"
            />
          </View>
        </View>
      </KeyboardAvoidingWrapper>

      <Modal
        visible={showReminderModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReminderModal(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowReminderModal(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Select Reminder</Text>
            {reminderOptions.map((option) => {
              const isActive = selectedReminder === option;
              return (
                <Pressable
                  key={option}
                  style={[styles.modalItem, isActive && styles.modalItemActive]}
                  onPress={() => {
                    setSelectedReminder(option);
                    setShowReminderModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      isActive && styles.modalItemTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
      <LocationBottomSheetModal
        ref={locationBottomSheetRef}
        options={locationOptions}
        selectedValue={location}
        onSelectDone={(value) => {
          setLocation(value);
        }}
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
  halfField: { flex: 1 },
  compactFieldText: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
  },
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  modalTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  modalItem: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalItemActive: {
    backgroundColor: "rgba(53, 73, 188, 0.12)",
  },
  modalItemText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
  },
  modalItemTextActive: {
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
});

export default AddEvent;
