import React, { useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import NeumorphicSwitch from "../../../components/Common/NeumorphicSwitch";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type SettingItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
};

type SettingSection = {
  id: string;
  title: string;
  items: SettingItem[];
};

const H_PADDING = 16;
const TAB_BAR_CLEARANCE = 110;

const INITIAL_SECTIONS: SettingSection[] = [
  {
    id: "notifications",
    title: "Notifications",
    items: [
      {
        id: "alerts",
        label: "Alerts",
        icon: <MaterialCommunityIcons name="alert-outline" size={20} color={COLORS.PRIMARY} />,
        enabled: true,
      },
      {
        id: "escalations",
        label: "Escalations",
        icon: <MaterialCommunityIcons name="bell-outline" size={20} color={COLORS.PRIMARY} />,
        enabled: false,
      },
      {
        id: "task-reminders",
        label: "Task Reminders",
        icon: <MaterialCommunityIcons name="bell-badge-outline" size={20} color={COLORS.PRIMARY} />,
        enabled: true,
      },
    ],
  },
  {
    id: "voice",
    title: "Voice",
    items: [
      {
        id: "voice-mode",
        label: "Voice Mode",
        icon: <MaterialCommunityIcons name="volume-high" size={20} color={COLORS.PRIMARY} />,
        enabled: true,
      },
      {
        id: "hands-free",
        label: "Hands-Free Commands",
        icon: <MaterialCommunityIcons name="waveform" size={20} color={COLORS.PRIMARY} />,
        enabled: false,
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions",
    items: [
      {
        id: "camera",
        label: "Camera",
        icon: <MaterialCommunityIcons name="camera-outline" size={20} color={COLORS.PRIMARY} />,
        enabled: true,
      },
      {
        id: "microphone",
        label: "Microphone",
        icon: <MaterialCommunityIcons name="microphone-outline" size={20} color={COLORS.PRIMARY} />,
        enabled: false,
      },
      {
        id: "notifications-permission",
        label: "Notifications",
        icon: <MaterialCommunityIcons name="bell-outline" size={20} color={COLORS.PRIMARY} />,
        enabled: true,
      },
    ],
  },
];

const GeneralSettings = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [sections, setSections] = useState(INITIAL_SECTIONS);

  const bottomPad = Math.max(insets.bottom, 12) + TAB_BAR_CLEARANCE;

  const sectionBlocks = useMemo(
    () =>
      sections.map((section) => (
        <View key={section.id} style={styles.sectionBlock}>
          <NeumorphicCard borderRadius={12} innerStyle={styles.sectionCardInner}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, index) => (
              <View key={item.id}>
                {index > 0 ? <View style={styles.rowDivider} /> : null}
                <View style={styles.settingRow}>
                  <InnerShadowIcon size={40} icon={item.icon} />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <NeumorphicSwitch
                    value={item.enabled}
                    onValueChange={(value) =>
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id !== section.id
                            ? s
                            : {
                              ...s,
                              items: s.items.map((it) =>
                                it.id === item.id ? { ...it, enabled: value } : it,
                              ),
                            },
                        ),
                      )
                    }
                  />
                </View>
              </View>
            ))}
          </NeumorphicCard>
        </View>
      )),
    [sections],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>General Settings</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatarContainer}
            wrapperStyle={styles.heroAvatarWrap}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />
          <Text style={styles.heroSubtitle}>Customize your experience.</Text>

          {sectionBlocks}

          <View style={styles.saveButtonWrap}>
            <ReusableButton
              title="Save Settings"
              height={52}
              borderRadius={26}
              gradientColors={["#B5F4CC", "#429761"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GeneralSettings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: H_PADDING,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  heroAvatarContainer: {
    marginTop: 20,
  },
  heroAvatarWrap: {
    width: 188,
    height: 188,
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  heroImage: {
    width: 116,
    height: 116,
    borderRadius: 100,
    resizeMode: "cover",
  },
  heroSubtitle: {
    marginTop: 6,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
  sectionBlock: {
    marginTop: 12,
  },
  sectionCardInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 4,
  },
  settingRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  settingLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 6,
  },
  saveButtonWrap: {
    marginTop: 24,
  },
});
