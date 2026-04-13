import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InputField from "../../../../neomorphism/InputField";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import DatePickerField from "../../../../neomorphism/DatePickerField";
import TimePickerField from "../../../../components/Common/TimePickerField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";
import ZoomCallIcon from "../../../../assets/icon/zoomCallIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";
import ProfileIcon from "../../../../assets/icon/profile.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import TimerIcon from "../../../../assets/icon/timerIcon.svg";

type VisitType = "telemed" | "inPerson" | "nurseVisit";
type ReasonChip = "labFollowUp" | "medication" | "diabetes";

const REASON_CHIPS: { key: ReasonChip; label: string; width: number }[] = [
  { key: "labFollowUp", label: "Lab follow-up", width: 126 },
  { key: "medication", label: "Medication adjustment", width: 196 },
  { key: "diabetes", label: "Diabetes care", width: 130 },
];

const ScheduleVisit = () => {
  const navigation = useNavigation<any>();
  const [selectedType, setSelectedType] = useState<VisitType | null>(null);
  const [reasonText, setReasonText] = useState("");
  const [selectedReason, setSelectedReason] = useState<ReasonChip | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Schedule Visit</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.visitCardOuter} innerStyle={styles.visitCardInner} borderRadius={12}>
          <Text style={styles.visitPrompt}>Do you want to schedule Sarah Williams for a follow-up?</Text>
          <Pressable style={[styles.optionRow, styles.optionSeparator]} onPress={() => setSelectedType("telemed")}>
            {selectedType === "telemed" ? <SelectedIcon width={30} height={30} /> : <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />}
            <InnerShadowIcon size={40} icon={<ZoomCallIcon width={18} height={18} />} />
            <Text style={styles.optionText}>Telemed</Text>
          </Pressable>
          <Pressable style={[styles.optionRow, styles.optionSeparator]} onPress={() => setSelectedType("inPerson")}>
            {selectedType === "inPerson" ? <SelectedIcon width={30} height={30} /> : <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />}
            <InnerShadowIcon size={40} icon={<PatientIcon width={18} height={18} />} />
            <Text style={styles.optionText}>In-Person</Text>
          </Pressable>
          <Pressable style={styles.optionRow} onPress={() => setSelectedType("nurseVisit")}>
            {selectedType === "nurseVisit" ? <SelectedIcon width={30} height={30} /> : <InnerShadowIcon size={30} icon={<View style={styles.emptyDot} />} />}
            <InnerShadowIcon size={40} icon={<ProfileIcon width={18} height={18} />} />
            <Text style={styles.optionText}>Nurse visit</Text>
          </Pressable>
        </NeumorphicCard>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>Reason for visit</Text>
          <InputField
            value={reasonText}
            onChangeText={setReasonText}
            placeholder="Write about Reason for visit"
            multiline
            minHeight={120}
            borderRadius={12}
            containerStyle={styles.reasonInput}
          />
        </View>

        <View style={styles.chipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {REASON_CHIPS.map((chip) => (
              <Pressable
                key={chip.key}
                onPress={() => setSelectedReason(chip.key)}
                style={[styles.chipPress, { width: chip.width }]}
              >
                {selectedReason === chip.key ? (
                  <DeltaBadge
                    icon={null}
                    value={chip.label}
                    width={chip.width}
                    height={40}
                    bgColor="#CBF0FF"
                    darkShadowColor="#C8CBCC"
                    lightShadowColor="#FFFFFF99"
                    textColor={COLORS.PRIMARY}
                    textStyle={styles.selectedChipText}
                  />
                ) : (
                  <NeumorphicCard outerStyle={[styles.chipOuter, { width: chip.width }]} innerStyle={styles.chipInner} borderRadius={20}>
                    <Text style={styles.chipText}>{chip.label}</Text>
                  </NeumorphicCard>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dateTimeLabels}>
          <View style={styles.dateCol}>
            <Text style={styles.fieldLabel}>Date</Text>
          </View>
          <View style={styles.timeCol}>
            <Text style={styles.fieldLabel}>Available Time Slots</Text>
          </View>
        </View>
        <View style={styles.dateTimeRow}>
          <View style={styles.dateCol}>
            <DatePickerField
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select Date"
              leftIcon={<CalendarIcon width={18} height={18} />}
              containerStyle={styles.dateField}
            />
          </View>
          <View style={styles.timeCol}>
            <TimePickerField
              value={selectedTime}
              onChange={setSelectedTime}
              placeholder="Select time"
              leftIcon={<TimerIcon width={18} height={18} />}
              containerStyle={styles.timeField}
            />
          </View>
        </View>

        <View style={styles.submitContainer}>
          <ReusableButton
            title="Schedule Visit"
            width="100%"
            height={48}
            borderRadius={24}
            containerStyle={styles.submitWrap}
            textStyle={styles.submitText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleVisit;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { paddingBottom: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18, paddingHorizontal: 16 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  visitCardOuter: { marginTop: 2, marginHorizontal: 16 },
  visitCardInner: { padding: 12 },
  visitPrompt: { fontSize: 14, color: COLORS.TEXT_DARK, fontWeight: "500", marginBottom: 10 },
  optionRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12 },
  optionSeparator: { borderBottomWidth: 1, borderBottomColor: COLORS.TEXT_10 },
  optionText: { fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500" },
  emptyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "transparent" },
  fieldLabel: { fontSize: 14, color: COLORS.TEXT_60, fontWeight: "500" },
  reasonContainer: { marginHorizontal: 16 },
  reasonLabel: { marginTop: 14, marginBottom: 8, fontSize: 14, color: COLORS.TEXT_60, fontWeight: "500" },
  reasonInput: { marginTop: 0 },
  chipsRow: { paddingTop: 10, paddingBottom: 4, paddingRight: 8 },
  chipPress: { marginRight: 12, marginBottom: 10, paddingLeft: 16, flexShrink: 0 },
  chipOuter: { height: 40 },
  chipInner: { height: 40, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
  chipText: { fontSize: 14, color: COLORS.TEXT_DARK, fontWeight: "500" },
  selectedChipText: { fontSize: 14, fontWeight: "500" },
  dateTimeLabels: { marginTop: 8, flexDirection: "row", paddingHorizontal: 18 },
  dateTimeRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 16 },
  dateCol: { width: "48%" },
  timeCol: { width: "48%" },
  dateField: { marginTop: 6 },
  timeField: { marginTop: 6 },
  submitWrap: { marginTop: 20 },
  submitText: { color: COLORS.WHITE, fontSize: 16, fontWeight: "600" },
  chipsContainer: { marginTop: 12 },
  submitContainer: { marginHorizontal: 16 },
});
