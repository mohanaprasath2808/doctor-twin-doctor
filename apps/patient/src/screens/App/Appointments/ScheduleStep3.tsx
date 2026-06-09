import React, { useCallback, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import FilterChip from "../../../components/Common/FilterChip";
import StepProgressRow from "../../../components/Common/StepProgressRow";
import IconComponent from "../../../neomorphism/IconComponent";
import { NeumorphicCalendar } from "../../../neomorphism/NeumorphicCalendar";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";

const SLOT_OPTIONS = [
  { label: "10:15 AM", width: 106 },
  { label: "1:00 PM", width: 102 },
  { label: "3:00 PM", width: 102 },
];

const ScheduleStep3 = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const toast = useToast();

  const appointmentId: string | undefined = route?.params?.appointmentId;
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedSlot, setSelectedSlot] = useState("10:15 AM");

  const formatYYYYMMDD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const onDone = useCallback(() => {
    const apptId = String(appointmentId ?? "").trim();
    if (!apptId) {
      toast.show("Appointment ID missing. Please restart scheduling.", { type: "danger" });
      navigation.navigate(navigationStrings.SCHEDULE_STEP_1);
      return;
    }

    const dateStr = selectedDate ? formatYYYYMMDD(selectedDate) : "";
    const slotStr = String(selectedSlot ?? "").trim();

    if (!dateStr) {
      toast.show("Please select appointment date.", { type: "danger" });
      return;
    }
    if (!slotStr) {
      toast.show("Please select time slot.", { type: "danger" });
      return;
    }

    navigation.navigate(navigationStrings.APPOINTMENT_CONFIRM, {
      appointmentId: apptId,
      reason: route?.params?.reason,
      provider_name: route?.params?.provider_name,
      category: route?.params?.category,
      appointment_type: route?.params?.appointment_type,
      appointment_date: dateStr,
      time_slot: slotStr,
    });
  }, [appointmentId, navigation, route?.params, selectedDate, selectedSlot, toast]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>Schedule Appointment</Text>
        </View>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StepProgressRow
          totalSteps={3}
          currentStep={3}
          onStepPress={(step) => {
            if (step === 1) {
              navigation.navigate(navigationStrings.SCHEDULE_STEP_1);
            }
            if (step === 2) {
              navigation.navigate(navigationStrings.SCHEDULE_STEP_2);
            }
          }}
          containerStyle={styles.progressRow}
          segmentHeight={12}
          segmentBorderRadius={12}
          activeGradientColors={["#14B8D4", "#0E7490"]}
          activeShadowColor="#C1D5EE"
          activeShadowOpacity={0.3}
          activeShadowRadius={4}
          activeShadowOffset={{ width: 2, height: 2 }}
        />

        <Text style={styles.stepText}>Step 3</Text>
        <Text style={styles.sectionTitle}>Calender</Text>
        <NeumorphicCalendar initialDate={selectedDate} onDateChange={setSelectedDate} />

        <Text style={styles.timeSlotLabel}>Time Slots</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.slotScroll}
          contentContainerStyle={styles.slotRow}
        >
          {SLOT_OPTIONS.map((slot) => {
            const isSelected = selectedSlot === slot.label;
            return (
              <Pressable
                key={slot.label}
                style={styles.slotWrap}
                onPress={() => setSelectedSlot(slot.label)}
              >
                {isSelected ? (
                  <DeltaBadge
                    icon={null}
                    value={slot.label}
                    width={slot.width}
                    height={40}
                    radius={20}
                    bgColor="#14B8D4"
                    darkShadowColor="#3F97B2"
                    lightShadowColor="#FFFFFF99"
                    textColor={COLORS.WHITE}
                    textStyle={styles.selectedBadgeText}
                  />
                ) : (
                  <FilterChip
                    title={slot.label}
                    selected={false}
                    onPress={() => setSelectedSlot(slot.label)}
                    width={slot.width}
                    height={40}
                    borderRadius={20}
                    textStyle={styles.slotText}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Done"
          height={48}
          borderRadius={25}
          width="100%"
          gradientColors={["#22D3EE", "#0F766E"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={onDone}
          containerStyle={styles.doneBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  headerRow: {
    marginTop: Platform.OS === "ios" ? 8 : 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 40,
    height: 40,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  progressRow: {
    marginTop: 20,
  },
  stepText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  timeSlotLabel: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  slotRow: {
    flexDirection: "row",
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  slotScroll: {
    padding: 4,
    width: "100%",
    overflow: "hidden",
  },
  slotWrap: {
    flexShrink: 0,
    marginRight: 10,
  },
  slotText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_60,
  },
  selectedBadgeText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    paddingHorizontal: 16,
  },
  doneBtn: {
    alignSelf: "stretch",
  },
});

