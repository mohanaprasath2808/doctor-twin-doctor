import React, { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { NeumorphicCalendar } from "../../../neomorphism/NeumorphicCalendar";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import WellnessIcon from "../../../assets/icons/wellness.svg";

const SLOT_OPTIONS = [
  { label: "10:15 AM", width: 106 },
  { label: "1:00 PM", width: 102 },
  { label: "3:00 PM", width: 102 },
];

const BookAppointment = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedSlot, setSelectedSlot] = useState("10:15 AM");

  const treatmentName = useMemo(
    () => route?.params?.treatment?.title ?? "Hydrafacial",
    [route?.params?.treatment?.title],
  );
  const backRouteName = useMemo(
    () => route?.params?.backRouteName ?? navigationStrings.WELLNESS_MEDSPA,
    [route?.params?.backRouteName],
  );
  const secondaryButtonLabel = useMemo(
    () => route?.params?.backButtonLabel ?? "Back to Wellness",
    [route?.params?.backButtonLabel],
  );

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
          <Text style={styles.title}>Book Appointment</Text>
        </View>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <NeumorphicCard outerStyle={styles.treatmentOuter} innerStyle={styles.treatmentInner} borderRadius={10}>
          <InnerShadowIcon icon={<WellnessIcon width={20} height={20} />} size={40} radius={20} />
          <Text style={styles.treatmentName}>{treatmentName}</Text>
        </NeumorphicCard>

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
              <Pressable key={slot.label} style={styles.slotWrap} onPress={() => setSelectedSlot(slot.label)}>
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
          title="Confirm Appointment"
          height={48}
          borderRadius={25}
          width="100%"
          gradientColors={["#22D3EE", "#0F766E"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() =>
            navigation.navigate(navigationStrings.BOOK_APPOINTED, {
              title: "Book Appointed",
              message: "Appointment Booked Successfully",
              subtitle: "I'll remind you and stay with you.",
              primaryButtonLabel: "View Appointment",
              primaryButtonRoute: navigationStrings.APPOINTMENTS,
              secondaryButtonLabel,
              secondaryButtonRoute: backRouteName,
            })
          }
          containerStyle={styles.doneBtn}
        />
      </View>
    </SafeAreaView>
  );
};

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
  treatmentOuter: {
    marginTop: 24,
    width: "100%",
  },
  treatmentInner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  treatmentName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 14,
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

export default BookAppointment;
