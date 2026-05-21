import React, { useMemo, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicCheckbox from "../../../components/Common/NeumorphicCheckbox";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const TIMING_OPTIONS = [
  { id: "1day", label: "1 day before" },
  { id: "2hours", label: "2 hours before" },
  { id: "30mins", label: "30 minutes before" },
];

const NOTIFICATION_OPTIONS = [
  { id: "voice", label: "Voice Reminder" },
  { id: "push", label: "Push Notification" },
  { id: "sms", label: "SMS" },
];

const AppointmentReminder = () => {
  const navigation = useNavigation<any>();
  const [selectedTiming, setSelectedTiming] = useState<string>("1day");
  const [selectedNotification, setSelectedNotification] = useState<string>("voice");

  const providerRow = useMemo(
    () => ({ name: "Dr. Lisa Shaw", meta: "20 April 2025 11:30 AM" }),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>


      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Set Appointment Reminder</Text>
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

        <Text style={styles.heroText}>I&apos;ll make sure you don&apos;t miss your visit.</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.profileInner} borderRadius={10}>
          <Image source={DoctorTempImage} style={styles.smallAvatar} />
          <View style={styles.profileTextWrap}>
            <Text style={styles.profileName}>{providerRow.name}</Text>
            <Text style={styles.profileMeta}>{providerRow.meta}</Text>
          </View>
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Reminder Timing</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.listInner} borderRadius={10}>
          {TIMING_OPTIONS.map((item, index) => (
            <View key={item.id}>
              <NeumorphicCheckbox
                label={item.label}
                selected={selectedTiming === item.id}
                onPress={() => setSelectedTiming(item.id)}
              />
              {index < TIMING_OPTIONS.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <Text style={[styles.sectionLabel, styles.cardGap]}>Notification Type</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.listInner} borderRadius={10}>
          {NOTIFICATION_OPTIONS.map((item, index) => (
            <View key={item.id}>
              <NeumorphicCheckbox
                label={item.label}
                selected={selectedNotification === item.id}
                onPress={() => setSelectedNotification(item.id)}
              />
              {index < NOTIFICATION_OPTIONS.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
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

export default AppointmentReminder;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
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
  profileInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  profileName: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  profileMeta: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  sectionLabel: {
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  listInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
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

