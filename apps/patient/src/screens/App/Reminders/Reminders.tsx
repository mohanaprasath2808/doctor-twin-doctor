import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicQuickActionTile from "../../../components/Common/NeumorphicQuickActionTile";
import IconComponent from "../../../neomorphism/IconComponent";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import AppointmentsRemindersIcon from "../../../assets/icons/appointmentsReminders.svg";
import LotusIcon from "../../../assets/icons/lotus.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import ReminderVoiceSection, { VOICE_OPTIONS } from "./components/ReminderVoiceSection";

const HORIZONTAL = 16;
const QUICK_ACTION_GAP = 10;

const Reminders = () => {
  const navigation = useNavigation<any>();
  const { width: windowWidth } = useWindowDimensions();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedVoiceId, setSelectedVoiceId] = useState(VOICE_OPTIONS[0]?.id ?? "");
  const [selectedVoiceLabel, setSelectedVoiceLabel] = useState(VOICE_OPTIONS[0]?.label ?? "");

  const tileWidth = useMemo(
    () => (windowWidth - HORIZONTAL * 2 - QUICK_ACTION_GAP * 2) / 3,
    [windowWidth],
  );
  const outerDiameter = Math.min(72, tileWidth);
  const innerShadowDiameter = Math.max(52, outerDiameter - 14);

  const onVoicePicked = (id: string) => {
    setSelectedVoiceId(id);
    const picked = VOICE_OPTIONS.find((item) => item.id === id);
    setSelectedVoiceLabel(picked?.label ?? "");
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
        <Text style={styles.headerTitle}>Reminders</Text>
        <View style={styles.notifWrap}>
          <IconComponent
            icon={<NotificationIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
          />
          <View style={styles.notifDot} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.heroText}>
          I can gently remind you to take your medications on time.
        </Text>

        <View style={styles.quickActionsRow}>
          <NeumorphicQuickActionTile
            containerStyle={[styles.quickTile, { width: tileWidth }]}
            icon={<MedicationsIcon width={28} height={28} />}
            label="Medication Reminders"
            labelNumberOfLines={2}
            outerDiameter={outerDiameter}
            innerShadowDiameter={innerShadowDiameter}
            onPress={() => navigation.navigate(navigationStrings.MEDICATION_REMINDER)}
          />
          <NeumorphicQuickActionTile
            containerStyle={[styles.quickTile, { width: tileWidth }]}
            icon={<AppointmentsRemindersIcon width={28} height={28} />}
            label="Appointment Reminders"
            labelNumberOfLines={2}
            outerDiameter={outerDiameter}
            innerShadowDiameter={innerShadowDiameter}
            onPress={() => navigation.navigate(navigationStrings.APPOINTMENT_REMINDER)}
          />
          <NeumorphicQuickActionTile
            containerStyle={[styles.quickTile, { width: tileWidth }]}
            icon={<LotusIcon width={28} height={28} />}
            label="Custom Health Reminders"
            labelNumberOfLines={2}
            outerDiameter={outerDiameter}
            innerShadowDiameter={innerShadowDiameter}
            onPress={() => navigation.navigate(navigationStrings.CUSTOM_REMINDER)}
          />
        </View>

        <ReminderVoiceSection
          variant="hub"
          voiceEnabled={voiceEnabled}
          onVoiceEnabledChange={setVoiceEnabled}
          selectedVoiceId={selectedVoiceId}
          selectedVoiceLabel={selectedVoiceLabel}
          onVoicePicked={onVoicePicked}
          outerStyle={styles.voiceSectionGap}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reminders;

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
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 32,
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
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: QUICK_ACTION_GAP,
    marginBottom: 20,
  },
  quickTile: {
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  voiceSectionGap: {
    marginTop: 4,
  },
});
