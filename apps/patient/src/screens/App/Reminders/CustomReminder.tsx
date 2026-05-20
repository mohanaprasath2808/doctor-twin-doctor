import React, { useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicCheckbox from "../../../components/Common/NeumorphicCheckbox";
import IconComponent from "../../../neomorphism/IconComponent";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import TimePickerField from "../../../neomorphism/TimePickerField";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import ClockIcon from "../../../assets/icons/greyClockIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import ReminderVoiceSection, { VOICE_OPTIONS } from "./components/ReminderVoiceSection";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const FREQUENCY_OPTIONS = ["Daily", "Weekly", "Custom"] as const;

const CustomReminder = () => {
  const navigation = useNavigation<any>();
  const { width: windowWidth } = useWindowDimensions();

  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedVoiceId, setSelectedVoiceId] = useState(VOICE_OPTIONS[0]?.id ?? "");
  const [selectedVoiceLabel, setSelectedVoiceLabel] = useState(VOICE_OPTIONS[0]?.label ?? "");

  const [reminderName, setReminderName] = useState("Drink water");
  const [frequency, setFrequency] = useState<(typeof FREQUENCY_OPTIONS)[number]>("Daily");
  const [reminderTime, setReminderTime] = useState<Date | null>(() => {
    const date = new Date();
    date.setHours(9, 0, 0, 0);
    return date;
  });
  const [repeatEvery2Hours, setRepeatEvery2Hours] = useState(true);

  const frequencyChipWidth = useMemo(() => {
    const count = FREQUENCY_OPTIONS.length;
    return Math.max(72, Math.floor((windowWidth - HORIZONTAL * 2 - 24 - 10 * (count - 1)) / count));
  }, [windowWidth]);

  const onVoicePicked = (id: string) => {
    setSelectedVoiceId(id);
    const picked = VOICE_OPTIONS.find((item) => item.id === id);
    setSelectedVoiceLabel(picked?.label ?? "");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Custom Reminder</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.heroText}>What would you like to be reminded about?</Text>

        <ReminderVoiceSection
          variant="medication"
          voiceEnabled={voiceEnabled}
          onVoiceEnabledChange={setVoiceEnabled}
          selectedVoiceId={selectedVoiceId}
          selectedVoiceLabel={selectedVoiceLabel}
          onVoicePicked={onVoicePicked}
        />

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.fieldCardInner} borderRadius={10}>
          <Text style={styles.sectionLabel}>Reminder Name</Text>
          <InputField
            value={reminderName}
            onChangeText={setReminderName}
            placeholder="Enter reminder name"
            borderRadius={64}
            height={38}
            containerStyle={styles.nameField}
            isFocused={false}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.frequencyInner} borderRadius={10}>
          <Text style={styles.sectionLabel}>Frequency</Text>
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
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.fieldCardInner} borderRadius={10}>
          <Text style={styles.sectionLabel}>Reminder Time</Text>
          <TimePickerField
            value={reminderTime}
            onChange={setReminderTime}
            placeholder="09:00 AM"
            leftIcon={<ClockIcon width={18} height={18} />}
            containerStyle={styles.timeField}
            isFocused={false}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.repeatInner} borderRadius={10}>
          <Text style={styles.sectionLabel}>Repeat</Text>
          <NeumorphicCheckbox
            label="Every 2 hours"
            selected={repeatEvery2Hours}
            onPress={() => setRepeatEvery2Hours((v) => !v)}
          />
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
    </SafeAreaView>
  );
};

export default CustomReminder;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
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
  nameField: {
    width: "100%",
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
  timeField: {
    width: "100%",
  },
  repeatInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
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

