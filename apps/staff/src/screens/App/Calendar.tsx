import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NeumorphicCalendar } from "../../components/neomorphism/NeumorphicCalendar";
import NeumorphicCard from "../../components/neomorphism/NeumorphicCard";
import { COLORS } from "../../constants/theme";
import { TEXT } from "../../constants/typography";

type AppointmentItem = {
  id: string;
  time: string;
  patient: string;
  reason: string;
};

const MOCK_APPOINTMENTS: AppointmentItem[] = [
  { id: "1", time: "9:00 AM", patient: "Brian Carter", reason: "Follow-up visit" },
  { id: "2", time: "11:30 AM", patient: "Sarah Mitchell", reason: "Lab review" },
  { id: "3", time: "2:15 PM", patient: "James Wilson", reason: "Medication check" },
];

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const appointments = useMemo(() => MOCK_APPOINTMENTS, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Home</Text>

        <NeumorphicCalendar initialDate={selectedDate} onDateChange={setSelectedDate} />

        <Text style={styles.sectionTitle}>Appointments</Text>

        {appointments.map((item) => (
          <NeumorphicCard
            key={item.id}
            borderRadius={14}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.appointmentOuter}
            innerStyle={styles.appointmentInner}
          >
            <View style={styles.appointmentRow}>
              <View style={styles.timePill}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <View style={styles.appointmentBody}>
                <Text style={styles.patientName}>{item.patient}</Text>
                <Text style={styles.reasonText}>{item.reason}</Text>
              </View>
            </View>
          </NeumorphicCard>
        ))}

        {appointments.length === 0 ? (
          <Text style={styles.emptyText}>No appointments for this date.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    ...TEXT.screenTitleLarge,
    color: COLORS.TEXT_DARK,
    marginTop: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    ...TEXT.sectionTitleMedium,
    color: COLORS.TEXT_DARK,
    marginTop: 20,
    marginBottom: 10,
  },
  appointmentOuter: {
    width: "100%",
    marginBottom: 12,
  },
  appointmentInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  appointmentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timePill: {
    minWidth: 72,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.BADGE_SELECTED_BG,
    marginRight: 12,
  },
  timeText: {
    ...TEXT.timePill,
    color: COLORS.PRIMARY,
    textAlign: "center",
  },
  appointmentBody: {
    flex: 1,
  },
  patientName: {
    ...TEXT.subsectionTitle,
    color: COLORS.TEXT_DARK,
    marginBottom: 4,
  },
  reasonText: {
    ...TEXT.bodySmall,
    color: COLORS.TEXT_60,
  },
  emptyText: {
    ...TEXT.bodyRegular,
    color: COLORS.TEXT_60,
    textAlign: "center",
    marginTop: 24,
  },
});
