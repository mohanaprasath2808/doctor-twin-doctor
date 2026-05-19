import React, { useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicVolumeSlider from "../../../components/Common/NeumorphicVolumeSlider";
import SelectSearchSheet from "../../../components/BottomSheets/SelectSearchSheet";
import type { SelectSearchSheetItem } from "../../../components/BottomSheets/SelectSearchSheet";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import StatusDot from "../../../components/Common/StatusDot";
import TimePickerField from "../../../neomorphism/TimePickerField";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import BellIcon from "../../../assets/icons/bell.svg";
import ClockIcon from "../../../assets/icons/clockIcon.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import ReminderVoiceSection, { VOICE_OPTIONS } from "./components/ReminderVoiceSection";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const MEDICATION_OPTIONS: SelectSearchSheetItem[] = [
  { id: "med-1", label: "Lisinopril 20 mg" },
  { id: "med-2", label: "Lexapro 30 mg" },
];

const VOLUME_TONE_OPTIONS: SelectSearchSheetItem[] = [
  { id: "gentle", label: "Gentle" },
  { id: "normal", label: "Normal" },
  { id: "loud", label: "Loud" },
];

const FREQUENCY_OPTIONS = ["Daily", "Weekly", "Custom"] as const;
const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SNOOZE_OPTIONS = ["5 mins", "10 mins", "20 mins"];

const VOICE_PREVIEW =
  "Hello Sarah, this is Dr. Shahinaz. It's time to take your medication";

const MedicationReminder = () => {
  const navigation = useNavigation<any>();
  const { width: windowWidth } = useWindowDimensions();
  const medicationSheetRef = useRef<BottomSheetModal>(null);
  const volumeToneSheetRef = useRef<BottomSheetModal>(null);

  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedVoiceId, setSelectedVoiceId] = useState(VOICE_OPTIONS[0]?.id ?? "");
  const [selectedVoiceLabel, setSelectedVoiceLabel] = useState(VOICE_OPTIONS[0]?.label ?? "");
  const [medicationId, setMedicationId] = useState(MEDICATION_OPTIONS[0]?.id ?? "");
  const [medicationLabel, setMedicationLabel] = useState(MEDICATION_OPTIONS[0]?.label ?? "");
  const [frequency, setFrequency] = useState<(typeof FREQUENCY_OPTIONS)[number]>("Custom");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Monday", "Saturday"]);
  const [reminderTime, setReminderTime] = useState<Date | null>(() => {
    const date = new Date();
    date.setHours(9, 0, 0, 0);
    return date;
  });
  const [volumeToneId, setVolumeToneId] = useState(VOLUME_TONE_OPTIONS[0]?.id ?? "");
  const [volumeToneLabel, setVolumeToneLabel] = useState(VOLUME_TONE_OPTIONS[0]?.label ?? "");
  const [volumeLevel, setVolumeLevel] = useState(65);
  const [snooze, setSnooze] = useState("10 mins");

  const frequencyChipWidth = useMemo(() => {
    const count = FREQUENCY_OPTIONS.length;
    return Math.max(72, Math.floor((windowWidth - HORIZONTAL * 2 - 24 - 10 * (count - 1)) / count));
  }, [windowWidth]);

  const dayChipWidth = useMemo(() => {
    const gap = 8;
    const cardPadding = 24;
    return Math.max(88, Math.floor((windowWidth - HORIZONTAL * 2 - cardPadding - gap * 2) / 3));
  }, [windowWidth]);

  const snoozeChipWidth = useMemo(() => {
    const gap = 10;
    const cardPadding = 24;
    return Math.floor((windowWidth - HORIZONTAL * 2 - cardPadding - gap * 2) / 3);
  }, [windowWidth]);

  const onVoicePicked = (id: string) => {
    setSelectedVoiceId(id);
    const picked = VOICE_OPTIONS.find((item) => item.id === id);
    setSelectedVoiceLabel(picked?.label ?? "");
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Medication Reminder</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.heroText}>Let&apos;s set a reminder for your medication.</Text>

        <ReminderVoiceSection
          variant="medication"
          voiceEnabled={voiceEnabled}
          onVoiceEnabledChange={setVoiceEnabled}
          selectedVoiceId={selectedVoiceId}
          selectedVoiceLabel={selectedVoiceLabel}
          onVoicePicked={onVoicePicked}
        />

        {voiceEnabled ? (
          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.previewInner}
            borderRadius={10}
          >
            <InnerShadowIcon
              icon={<BellIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.previewText}>{VOICE_PREVIEW}</Text>
            <Pressable onPress={() => undefined} style={styles.playBtnWrap}>
              <StatusDot color={COLORS.PRIMARY} size={32} text="▶" textStyle={styles.playIcon} />
            </Pressable>
          </NeumorphicCard>
        ) : null}

        <Text style={[styles.sectionLabel, styles.cardGap]}>Medication</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.fieldCardInner} borderRadius={10}>
          <Text style={styles.fieldLabel}>Medication</Text>
          <Pressable
            onPress={() => medicationSheetRef.current?.present()}
            style={({ pressed }) => [styles.dropdownPress, pressed && styles.dropdownPressPressed]}
          >
            <View pointerEvents="none" style={styles.medicationRow}>
              <InnerShadowIcon
                icon={<MedicationsIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <InputField
                value={medicationLabel}
                editable={false}
                placeholder="Select Medication"
                rightIcon={<DropDownIcon width={10} height={10} />}
                containerStyle={styles.medicationField}
                borderRadius={64}
                height={38}
              />
            </View>
          </Pressable>
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Frequency</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.frequencyInner} borderRadius={10}>
          <View style={styles.frequencyRow}>
            {FREQUENCY_OPTIONS.map((option) => (
              <FilterChip
                key={option}
                title={option}
                selected={frequency === option}
                onPress={() => setFrequency(option)}
                width={frequencyChipWidth}
                height={40}
                borderRadius={20}
              />
            ))}
          </View>
          {frequency === "Custom" ? (
            <View style={styles.daysGrid}>
              {WEEK_DAYS.map((day) => (
                <FilterChip
                  key={day}
                  title={day}
                  selected={selectedDays.includes(day)}
                  onPress={() => toggleDay(day)}
                  width={dayChipWidth}
                  height={36}
                  borderRadius={18}
                  style={styles.dayChip}
                />
              ))}
            </View>
          ) : null}
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Reminder Time</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.fieldCardInner} borderRadius={10}>
          <Text style={styles.fieldLabel}>Reminder Time</Text>
          <NeumorphicInnerShadowCard
            borderRadius={64}
            containerStyle={styles.timeInsetOuter}
            contentStyle={styles.timeInsetInner}
          >
            <TimePickerField
              value={reminderTime}
              onChange={setReminderTime}
              placeholder="09:00 AM"
              leftIcon={<ClockIcon width={18} height={18} />}
              rightIcon={<DropDownIcon width={10} height={10} />}
              containerStyle={styles.timeField}
            />
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Volume tone</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.fieldCardInner} borderRadius={10}>
          <Text style={styles.fieldLabel}>Volume tone</Text>
          <Pressable
            onPress={() => volumeToneSheetRef.current?.present()}
            style={({ pressed }) => [styles.dropdownPress, pressed && styles.dropdownPressPressed]}
          >
            <View pointerEvents="none" style={styles.medicationRow}>
              <InnerShadowIcon
                icon={<BellIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <InputField
                value={volumeToneLabel}
                editable={false}
                placeholder="Select tone"
                rightIcon={<DropDownIcon width={10} height={10} />}
                containerStyle={styles.medicationField}
                borderRadius={64}
                height={38}
              />
            </View>
          </Pressable>
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Volume Level</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.volumeInner} borderRadius={10}>
          <NeumorphicVolumeSlider value={volumeLevel} onChange={setVolumeLevel} />
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Snooze Time</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.snoozeInner} borderRadius={10}>
          <View style={styles.snoozeRow}>
            {SNOOZE_OPTIONS.map((option) => (
              <FilterChip
                key={option}
                title={option}
                selected={snooze === option}
                onPress={() => setSnooze(option)}
                width={snoozeChipWidth}
                height={40}
                borderRadius={20}
              />
            ))}
          </View>
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Save Reminder"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={styles.footerBtn}
          onPress={() => navigation.goBack()}
        />
      </View>

      <SelectSearchSheet
        ref={medicationSheetRef}
        title="Select Medication"
        items={MEDICATION_OPTIONS}
        selectedId={medicationId}
        searchPlaceholder="Search medication"
        onConfirm={(id) => {
          setMedicationId(id);
          const picked = MEDICATION_OPTIONS.find((item) => item.id === id);
          setMedicationLabel(picked?.label ?? "");
        }}
      />

      <SelectSearchSheet
        ref={volumeToneSheetRef}
        title="Volume tone"
        items={VOLUME_TONE_OPTIONS}
        selectedId={volumeToneId}
        searchPlaceholder="Search tone"
        onConfirm={(id) => {
          setVolumeToneId(id);
          const picked = VOLUME_TONE_OPTIONS.find((item) => item.id === id);
          setVolumeToneLabel(picked?.label ?? "");
        }}
      />
    </SafeAreaView>
  );
};

export default MedicationReminder;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  avatarWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    borderRadius: 100,
  },
  heroText: {
    textAlign: "center",
    ...TEXT.sectionTitleMedium,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cardOuter: {
    width: "100%",
  },
  cardGap: {
    marginTop: 14,
  },
  previewInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  previewText: {
    flex: 1,
    ...TEXT.body,
    fontStyle: "italic",
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
  },
  playBtnWrap: {
    padding: 2,
  },
  playIcon: {
    fontSize: 12,
    marginLeft: 2,
  },
  sectionLabel: {
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  fieldCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  fieldLabel: {
    marginBottom: 8,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  dropdownPress: {
    width: "100%",
  },
  dropdownPressPressed: {
    opacity: 0.92,
  },
  medicationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  medicationField: {
    flex: 1,
  },
  frequencyInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  frequencyRow: {
    flexDirection: "row",
    gap: 10,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dayChip: {
    marginBottom: 0,
  },
  timeInsetOuter: {
    width: "100%",
  },
  timeInsetInner: {
    borderRadius: 64,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  timeField: {
    width: "100%",
  },
  volumeInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  snoozeInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  snoozeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 12 : 8,
    backgroundColor: COLORS.SURFACE,
  },
  footerBtn: {
    alignSelf: "stretch",
  },
});
