import React, { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import SelectSearchSheet from "../../../../components/BottomSheets/SelectSearchSheet";
import type { SelectSearchSheetItem } from "../../../../components/BottomSheets/SelectSearchSheet";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InputField from "../../../../neomorphism/InputField";
import { COLORS } from "../../../../constants/theme";
import { TEXT } from "../../../../constants/typography";
import BellIcon from "../../../../assets/icons/bell.svg";
import DropDownIcon from "../../../../assets/icons/dropDown.svg";
import GreyLoudSpeakerIcon from "../../../../assets/icons/greyLoudSpeakerIcon.svg";

export const VOICE_OPTIONS: SelectSearchSheetItem[] = [
  { id: "dr-shahinaz", label: "Dr. Shahinaz Twin" },
];

type ReminderVoiceSectionProps = {
  voiceEnabled: boolean;
  onVoiceEnabledChange: (value: boolean) => void;
  selectedVoiceId: string;
  selectedVoiceLabel: string;
  onVoicePicked: (id: string) => void;
  /** Hub: compact toggle row. Medication: titled enable card with subtitle. */
  variant?: "hub" | "medication";
  outerStyle?: object;
};

const ReminderVoiceSection = ({
  voiceEnabled,
  onVoiceEnabledChange,
  selectedVoiceId,
  selectedVoiceLabel,
  onVoicePicked,
  variant = "hub",
  outerStyle,
}: ReminderVoiceSectionProps) => {
  const voiceSheetRef = useRef<BottomSheetModal>(null);

  const onVoiceConfirmed = (id: string) => {
    const picked = VOICE_OPTIONS.find((item) => item.id === id);
    if (picked) onVoicePicked(id);
  };

  return (
    <>
      <NeumorphicCard
        outerStyle={[styles.cardOuter, outerStyle]}
        innerStyle={styles.toggleInner}
        borderRadius={10}
      >
        <InnerShadowIcon
          icon={<BellIcon width={18} height={18} />}
          size={40}
          radius={20}
          surfaceColor={COLORS.INNER_SURFACE}
        />
        <View style={styles.toggleTextWrap}>
          <Text style={styles.toggleTitle}>
            {variant === "medication" ? "Enable Voice Reminders" : "Voice Reminders"}
          </Text>
          {variant === "medication" ? (
            <Text style={styles.toggleSubtitle}>Receive audio medication alerts</Text>
          ) : null}
        </View>
        <NeumorphicSwitch value={voiceEnabled} onValueChange={onVoiceEnabledChange} />
      </NeumorphicCard>

      {voiceEnabled ? (
        <View style={styles.voiceBlock}>

          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.voiceCardInner} borderRadius={10}>
            <Text style={styles.sectionLabel}>Voice</Text>
            <Pressable
              onPress={() => voiceSheetRef.current?.present()}
              style={({ pressed }) => [styles.voicePress, pressed && styles.voicePressPressed]}
            >
              <View pointerEvents="none" style={styles.voiceFieldRow}>
                <InputField
                  value={selectedVoiceLabel}
                  editable={false}
                  placeholder="Select voice"
                  leftIcon={<GreyLoudSpeakerIcon width={18} height={18} />}
                  rightIcon={<DropDownIcon width={10} height={10} />}
                  containerStyle={styles.voiceField}
                  borderRadius={64}
                  height={38}
                  isFocused={false}
                />
              </View>
            </Pressable>
          </NeumorphicCard>
        </View>
      ) : null}

      <SelectSearchSheet
        ref={voiceSheetRef}
        title="Select Voice"
        items={VOICE_OPTIONS}
        selectedId={selectedVoiceId}
        searchPlaceholder="Search voice"
        onConfirm={onVoiceConfirmed}
      />
    </>
  );
};

export default ReminderVoiceSection;

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  toggleInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toggleTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  toggleTitle: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  toggleSubtitle: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  voiceBlock: {
    marginTop: 14,
    width: "100%",
  },
  sectionLabel: {
    marginBottom: 10,
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  voiceCardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  voicePress: {
    width: "100%",
  },
  voicePressPressed: {
    opacity: 0.92,
  },
  voiceFieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  voiceField: {
    marginTop: 0,
    flex: 1,
  },
});
