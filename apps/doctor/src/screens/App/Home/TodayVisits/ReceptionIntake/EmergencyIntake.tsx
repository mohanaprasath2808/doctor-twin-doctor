import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import DeltaBadge from "../../../../../components/Common/DeltaBadge";
import NeumorphicSwitch from "../../../../../components/Common/NeumorphicSwitch";
import AppButton from "../../../../../components/Common/AppButton";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import TimerIcon from "../../../../../assets/icon/timerIcon.svg";
import WarningIcon from "../../../../../assets/icon/redWarningIcon.svg";
import EcgPadIcon from "../../../../../assets/icon/ecgPadIcon.svg";
import PlusIcon from "../../../../../assets/icon/plusIcon.svg";
import TimerClockIcon from "../../../../../assets/icon/timerClock.svg";
import ClockIcon from "../../../../../assets/icon/clock.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";

type Complaint = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

type Vital = {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
};

type RedFlag = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const CHIEF_COMPLAINTS: Complaint[] = [
  { id: "chest-pain", title: "Chest Pain", icon: <EcgPadIcon width={16} height={16} /> },
  { id: "shortness", title: "Shortness of\nBreath", icon: <TimerClockIcon width={16} height={16} /> },
  { id: "bleeding", title: "Bleeding", icon: <WarningIcon width={16} height={16} /> },
  { id: "syncope", title: "Syncope", icon: <ClockIcon width={16} height={16} /> },
  { id: "trauma", title: "Trauma", icon: <WarningIcon width={16} height={16} /> },
  { id: "other", title: "Other", icon: <PlusIcon width={16} height={16} /> },
];

const QUICK_VITALS: Vital[] = [
  { id: "bp", label: "BP", value: "120 /80 mg", icon: <EcgPadIcon width={14} height={14} /> },
  { id: "hr", label: "HR", value: "90 bpm", icon: <TimerClockIcon width={14} height={14} /> },
  { id: "temp", label: "Temp", value: "98.6°F", icon: <TimerIcon width={14} height={14} /> },
  { id: "o2", label: "O2 Sat", value: "92%", icon: <ClockIcon width={14} height={14} /> },
];

const RED_FLAGS: RedFlag[] = [
  { id: "chest-pain", title: "Chest Pain", icon: <EcgPadIcon width={16} height={16} /> },
  { id: "shortness", title: "Shortness of Breath", icon: <TimerClockIcon width={16} height={16} /> },
  { id: "bleeding", title: "Active Bleeding", icon: <WarningIcon width={16} height={16} /> },
  { id: "mental-status", title: "Altered Mental Status", icon: <WarningIcon width={16} height={16} /> },
  { id: "fever", title: "High Fever", icon: <TimerIcon width={16} height={16} /> },
  { id: "trauma", title: "Trauma", icon: <WarningIcon width={16} height={16} /> },
];

const INITIAL_RED_FLAGS: Record<string, boolean> = {
  "chest-pain": true,
  shortness: true,
  bleeding: false,
  "mental-status": false,
  fever: false,
  trauma: true,
};

const EmergencyIntake = () => {
  const navigation = useNavigation<any>();
  const [selectedComplaint, setSelectedComplaint] = useState("other");
  const [redFlags, setRedFlags] = useState(INITIAL_RED_FLAGS);

  const updateRedFlag = (id: string, value: boolean) => {
    setRedFlags((current) => ({ ...current, [id]: value }));
  };

  const renderTimerBadge = () => (
    <NeumorphicInnerShadowCard
      borderRadius={14}
      backgroundColor="#FFE9E9"
      darkShadowColor="#F0C7C7"
      lightShadowColor="#FFFFFFCC"
      containerStyle={styles.timerBadgeOuter}
      contentStyle={styles.timerBadgeInner}
    >
      <Text style={styles.timerText}>08:02 1A</Text>
    </NeumorphicInnerShadowCard>
  );

  const renderComplaint = (item: Complaint) => {
    const isSelected = item.id === selectedComplaint;
    const content = (
      <>
        {isSelected ? (
          <IconComponent
            icon={item.icon}
            width={32}
            height={32}
            radius={16}
            onPress={() => setSelectedComplaint(item.id)}
          />
        ) : (
          <InnerShadowIcon icon={item.icon} size={32} />
        )}
        <Text style={styles.complaintText}>{item.title}</Text>
      </>
    );

    return (
      <View key={item.id} style={styles.complaintCell}>
        {isSelected ? (
          <NeumorphicInnerShadowCard
            borderRadius={10}
            backgroundColor="#CBF0FF"
            darkShadowColor="#8DD2ED"
            lightShadowColor="#FFFFFFCC"
            containerStyle={styles.selectedComplaintOuter}
            contentStyle={styles.complaintInner}
          >
            {content}
          </NeumorphicInnerShadowCard>
        ) : (
          <NeumorphicCard
            outerStyle={styles.complaintOuter}
            innerStyle={styles.complaintInner}
            borderRadius={10}
            onPress={() => setSelectedComplaint(item.id)}
          >
            {content}
          </NeumorphicCard>
        )}
      </View>
    );
  };

  const renderVital = (item: Vital) => (
    <View key={item.id} style={styles.vitalCell}>
      <Text style={styles.vitalLabel}>{item.label}</Text>
      <NeumorphicCard outerStyle={styles.vitalOuter} innerStyle={styles.vitalInner} borderRadius={12}>
        {item.icon}
        <Text style={styles.vitalValue}>{item.value}</Text>
      </NeumorphicCard>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Emergency Intake</Text>
          {renderTimerBadge()}
        </View>

        <View style={styles.avatarWrap}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.avatarContainer}
            wrapperStyle={styles.avatarWrapper}
            overlayStyle={styles.avatarOverlay}
            imageStyle={styles.avatarImage}
          />
          <IconComponent
            icon={<WarningIcon width={18} height={18} />}
            width={44}
            height={44}
            radius={22}
            style={styles.hazardIcon}
            onPress={() => {}}
            disabled
          />
        </View>

        <Text style={styles.warningTitle}>This may be critical.</Text>
        <Text style={styles.warningSubtitle}>Send to provider now?</Text>

        <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.patientImage} />
            <View style={styles.patientTextWrap}>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
              <Text style={styles.patientMeta}>MRN: 1234567890</Text>
            </View>
            <DeltaBadge
              value="Critical"
              bgColor="#FFE9E9"
              darkShadowColor="#F0C7C7"
              textColor="#F06A72"
              width={66}
              height={24}
              textStyle={styles.criticalText}
            />
          </View>
        </NeumorphicCard>

        <Text style={styles.sectionHeading}>Chief Complaint</Text>
        <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.complaintsSectionInner} borderRadius={12}>
          <View style={styles.complaintsGrid}>{CHIEF_COMPLAINTS.map(renderComplaint)}</View>
          <Text style={styles.otherLabel}>Other Complaint</Text>
          <NeumorphicInnerShadowCard
            borderRadius={23}
            containerStyle={styles.otherInputOuter}
            contentStyle={styles.otherInputInner}
          >
            <Text style={styles.otherPlaceholder}>Enter other complaint...</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <Text style={styles.sectionHeading}>Quick Vitals <Text style={styles.optionalText}>(Optional)</Text></Text>
        <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.vitalsSectionInner} borderRadius={12}>
          <View style={styles.vitalsGrid}>{QUICK_VITALS.map(renderVital)}</View>
        </NeumorphicCard>

        <Text style={styles.sectionHeading}>Red Flags</Text>
        <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.flagsInner} borderRadius={12}>
          {RED_FLAGS.map((flag, index) => (
            <View key={flag.id}>
              <View style={styles.flagRow}>
                <View style={styles.flagLeft}>
                  <InnerShadowIcon icon={flag.icon} size={34} />
                  <Text style={styles.flagTitle}>{flag.title}</Text>
                </View>
                <NeumorphicSwitch
                  value={redFlags[flag.id]}
                  onValueChange={(value) => updateRedFlag(flag.id, value)}
                />
              </View>
              {index < RED_FLAGS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </NeumorphicCard>

        <View style={styles.outlineActions}>
          <AppButton
            text="Start Visit"
            width="48%"
            height={44}
            borderRadius={22}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineButtonText}
            shadowStyle={styles.buttonShadow}
          />
          <AppButton
            text="Notify Clinical Staff"
            width="48%"
            height={44}
            borderRadius={22}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineButtonText}
            shadowStyle={styles.buttonShadow}
          />
        </View>

        <ReusableButton
          title="Send to Provider NOW"
          height={50}
          borderRadius={25}
          containerStyle={styles.sendButton}
          textStyle={styles.sendButtonText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyIntake;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  timerBadgeOuter: {
    width: 76,
  },
  timerBadgeInner: {
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#F06A72",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  avatarWrap: {
    alignItems: "center",
  },
  avatarContainer: {
    paddingTop: 10,
  },
  avatarWrapper: {
    width: 150,
    height: 150,
  },
  avatarOverlay: {
    borderRadius: 80,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 50,
  },
  hazardIcon: {
    position: "absolute",
    right: 112,
    bottom: 8,
  },
  warningTitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  warningSubtitle: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 14,
  },
  patientOuter: {
    width: "100%",
    marginBottom: 18,
  },
  patientInner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  patientImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  patientTextWrap: {
    flex: 1,
    gap: 3,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    fontSize: 11,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  criticalText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 10,
  },
  optionalText: {
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  sectionOuter: {
    width: "100%",
    marginBottom: 18,
  },
  complaintsSectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  complaintsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  complaintCell: {
    width: "30.9%",
  },
  complaintOuter: {
    width: "100%",
  },
  selectedComplaintOuter: {
    width: "100%",
  },
  complaintInner: {
    height: 78,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  complaintText: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Regular",
  },
  otherLabel: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  otherInputOuter: {
    width: "100%",
  },
  otherInputInner: {
    height: 46,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  otherPlaceholder: {
    fontSize: 12,
    color: COLORS.TEXT_40,
    fontFamily: "SF-Pro-Display-Regular",
  },
  vitalsSectionInner: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 10,
  },
  vitalCell: {
    width: "48%",
  },
  vitalLabel: {
    marginBottom: 6,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  vitalOuter: {
    width: "100%",
  },
  vitalInner: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 10,
  },
  vitalValue: {
    fontSize: 12,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
  flagsInner: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  flagRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  flagLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flagTitle: {
    flex: 1,
    fontSize: 13,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  outlineActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  buttonShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButton: {
    marginTop: 12,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
