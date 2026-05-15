import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import TimePickerField from "../../../neomorphism/TimePickerField";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import ClockIcon from "../../../assets/icons/clockIcon.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import HealthJournalMetricField from "./components/HealthJournalMetricField";
import {
  HEALTH_JOURNAL_ENTRY_CONFIGS,
  HealthJournalEntryType,
  HealthJournalFieldConfig,
} from "./types/healthJournalEntryConfig";

export type HealthJournalEntryParams = {
  entryType: HealthJournalEntryType;
};

const isFieldRow = (
  field: HealthJournalFieldConfig | HealthJournalFieldConfig[],
): field is HealthJournalFieldConfig[] => Array.isArray(field);

const FOOTER_BTN_HEIGHT = 48;

const HealthJournalEntry = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const entryType: HealthJournalEntryType = route?.params?.entryType ?? "blood_pressure";
  const config = HEALTH_JOURNAL_ENTRY_CONFIGS[entryType];

  const [values, setValues] = useState<Record<string, string>>(config.initialValues);
  const [readingTime, setReadingTime] = useState<Date | null>(null);

  const updateValue = (key: string, text: string) => {
    setValues((prev) => ({ ...prev, [key]: text }));
  };

  const handleSave = () => {
    navigation.replace(navigationStrings.HEALTH_JOURNAL_READING_SAVED, { entryType });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
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
            <Text style={styles.headerTitle}>{config.title}</Text>
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

          <Text style={styles.instruction}>{config.instruction}</Text>

          {config.sections.map((section) => (
            <View key={section.id} style={styles.section}>
              {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
              {section.fields.map((fieldOrRow, index) => {
                if (isFieldRow(fieldOrRow)) {
                  return (
                    <View key={`${section.id}-row-${index}`} style={styles.fieldRow}>
                      {fieldOrRow.map((field) => (
                        <HealthJournalMetricField
                          key={field.key}
                          field={field}
                          value={values[field.key] ?? ""}
                          onChange={(text) => updateValue(field.key, text)}
                          halfWidth
                        />
                      ))}
                    </View>
                  );
                }
                return (
                  <HealthJournalMetricField
                    key={fieldOrRow.key}
                    field={fieldOrRow}
                    value={values[fieldOrRow.key] ?? ""}
                    onChange={(text) => updateValue(fieldOrRow.key, text)}
                  />
                );
              })}
            </View>
          ))}

          {config.showTimeSection ? (
            <NeumorphicCard
              outerStyle={styles.timeCardOuter}
              innerStyle={styles.timeCardInner}
              borderRadius={10}
            >
              <Text style={styles.timeSectionLabel}>Time</Text>
              <TimePickerField
                value={readingTime}
                onChange={setReadingTime}
                placeholder="Now (Auto)"
                leftIcon={<ClockIcon width={18} height={18} />}
                rightIcon={<DropDownIcon width={10} height={10} />}
                containerStyle={styles.timeField}
              />
            </NeumorphicCard>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton
            title="Save Reading"
            height={FOOTER_BTN_HEIGHT}
            borderRadius={24}
            width="100%"
            gradientColors={["#22D3EE", "#0F766E"]}
            onPress={handleSave}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 12,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    resizeMode: "cover",
  },
  instruction: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 20,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  fieldRow: {
    flexDirection: "row",
    gap: 12,
  },
  timeCardOuter: {
    marginTop: 16,
    width: "100%",
  },
  timeCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  timeSectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  timeField: {
    marginTop: 0,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 8 : 12,
    backgroundColor: COLORS.SURFACE,
  },
});

export default HealthJournalEntry;
