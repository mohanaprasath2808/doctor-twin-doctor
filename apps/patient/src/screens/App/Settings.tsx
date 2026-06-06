import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicQuickActionTile from "../../components/Common/NeumorphicQuickActionTile";
import IconComponent from "../../neomorphism/IconComponent";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import BellIcon from "../../assets/icons/bell.svg";

import ProfileIcon from "../../assets/icons/profile.svg";
import MessageIcon from "../../assets/icons/message.svg";
import PrivacyIcon from "../../assets/icons/shieldWithLock.svg";
import ContactSupportIcon from "../../assets/icons/contactSupport.svg";
import WarningRedIcon from "../../assets/icons/emergencyIcon.svg";
import MessageWithQuestion from "../../assets/icons/messageWithQuestion.svg";

const ICON_SIZE = 32;

const SETTINGS_ACTIONS: {
  id: string;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "profile",
    label: "My Profile",
    icon: <ProfileIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: "communication",
    label: "Communication",
    icon: <MessageIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: <PrivacyIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: "help",
    label: "Help / Training",
    icon: <MessageWithQuestion width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: "support",
    label: "Support Ticket",
    icon: <ContactSupportIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: "emergency",
    label: "Emergency / Safety",
    icon: <WarningRedIcon width={ICON_SIZE} height={ICON_SIZE} />,
  },
];

const Settings = () => {
  const navigation = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerSide} />
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={[styles.headerSide, styles.headerSideRight]}>
          <View style={styles.notifWrap}>
            <IconComponent
              width={40}
              height={40}
              radius={20}
              icon={<BellIcon width={22} height={22} />}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.greeting}>Hi Sarah,</Text>
        <Text style={styles.subGreeting}>
          here you can manage your profile, privacy, and get support.
        </Text>

        <View style={styles.grid}>
          {SETTINGS_ACTIONS.map((item) => (
            <NeumorphicQuickActionTile
              key={item.id}
              containerStyle={styles.tile}
              onPress={() => {
                if (item.id === "profile") {
                  navigation.navigate(navigationStrings.MY_PROFILE);
                }
                if (item.id === "communication") {
                  navigation.navigate(navigationStrings.COMMUNICATION);
                }
                if (item.id === "privacy") {
                  navigation.navigate(navigationStrings.PRIVACY_SECURITY);
                }
                if (item.id === "help") {
                  navigation.navigate(navigationStrings.HELP_TRAINING);
                }
                if (item.id === "support") {
                  navigation.navigate(navigationStrings.SUPPORT_TICKET);
                }
                if (item.id === "emergency") {
                  navigation.navigate(navigationStrings.EMERGENCY_SAFETY);
                }
              }}
              icon={item.icon}
              label={item.label}
              outerDiameter={80}
              innerShadowDiameter={66}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 4 : 12,
    paddingBottom: 8,
  },
  headerSide: {
    width: 44,
    minHeight: 44,
  },
  headerSideRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  notifWrap: {
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ALERT,
  },
  content: {
    paddingHorizontal: 12,
  },
  avatarContainer: {
    alignItems: "center",
    paddingTop: 4,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 115,
  },
  greeting: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  subGreeting: {
    marginTop: 8,
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  grid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tile: {
    width: "33.33%",
    alignItems: "center",
  },
});

export default Settings;
