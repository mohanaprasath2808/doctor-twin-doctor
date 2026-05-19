import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import CommunicationIcon from "../../../assets/icon/handsFreeIcon.svg";
import ProfileGreenIcon from "../../../assets/icon/doctorStaffIcon.svg";
import VoiceIcon from "../../../assets/icon/voiceIcon.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const DISPLAY_NAME = "Dr.Twin";
const HEADER_H = 52;
const ACTION_OUTER = 88;
const ACTION_INNER = 72;

type ActionItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const ACTIONS: ActionItem[] = [
  {
    id: "staff-doctor",
    label: "Staff - Doctor",
    icon: <ProfileGreenIcon width={32} height={32} />,
  },
  {
    id: "call-patient",
    label: "Call Patient",
    icon: <CommunicationIcon width={32} height={32} />,
  },
  {
    id: "voice-hands-free",
    label: "Voice Hands-Free",
    icon: <VoiceIcon width={32} height={32} />,
  },
];

const Communication = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + 24;
  const noop = useCallback(() => {}, []);

  const openStaffDoctorChannel = useCallback(() => {
    navigation.navigate(navigationStrings.STAFF_DOCTOR_CHANNEL);
  }, [navigation]);

  const openCallPatient = useCallback(() => {
    navigation.navigate(navigationStrings.CALL_PATIENT);
  }, [navigation]);

  const openVoiceHandsFree = useCallback(() => {
    navigation.navigate(navigationStrings.VOICE_HANDS_FREE);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, { minHeight: HEADER_H }]}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Communication</Text>
          <View style={styles.headerBellWrap}>
            <IconComponent
              icon={
                <MaterialCommunityIcons name="bell-outline" size={20} color={COLORS.TEXT_DARK} />
              }
              width={40}
              height={40}
              radius={20}
              onPress={noop}
            />
            <View style={styles.bellDot} />
          </View>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrap}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />
        <Text style={styles.displayName}>{DISPLAY_NAME}</Text>

        <View style={styles.actionsRow}>
          {ACTIONS.map((action) => (
            <NeumorphicQuickActionTile
              key={action.id}
              onPress={
                action.id === "staff-doctor"
                  ? openStaffDoctorChannel
                  : action.id === "call-patient"
                    ? openCallPatient
                    : action.id === "voice-hands-free"
                      ? openVoiceHandsFree
                      : noop
              }
              icon={action.icon}
              label={action.label}
              outerDiameter={ACTION_OUTER}
              innerShadowDiameter={ACTION_INNER}
              labelNumberOfLines={2}
              containerStyle={styles.actionTile}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Communication;

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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 4,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerBellWrap: {
    position: "relative",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E05B6E",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  avatarWrap: {
    width: 230,
    height: 230,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  avatarImage: {
    width: 142,
    height: 142,
    resizeMode: "contain",
    borderRadius: 110,
  },
  displayName: {
    marginTop: 4,
    marginBottom: 32,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_80,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Medium",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    columnGap: 8,
  },
  actionTile: {
    flex: 1,
    alignItems: "center",
  },
});
