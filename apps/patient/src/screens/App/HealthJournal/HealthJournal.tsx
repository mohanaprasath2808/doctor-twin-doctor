import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicQuickActionTile from "../../../components/Common/NeumorphicQuickActionTile";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import BloodPressureIcon from "../../../assets/icons/bpIcon.svg";
import BloodSugarIcon from "../../../assets/icons/bloogSugarIcon.svg";
import WeightIcon from "../../../assets/icons/weightScaleIcon.svg";
import PlusTealIcon from "../../../assets/icons/plusTealIcon.svg";
import CalendarIcon from "../../../assets/icons/calendarIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const HealthJournal = () => {
  const navigation = useNavigation<any>();

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
          <Text style={styles.headerTitle}>Health Journal</Text>
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

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.heading}>
          I can help you track your health and notice important changes.
        </Text>

        <View style={styles.quickActionsRow}>
          <NeumorphicQuickActionTile
            onPress={() =>
              navigation.navigate(navigationStrings.HEALTH_JOURNAL_ENTRY, {
                entryType: "blood_pressure",
              })
            }
            icon={<BloodPressureIcon width={34} height={34} />}
            label="Blood Pressure"
            containerStyle={styles.quickActionTile}
            outerDiameter={94}
            innerShadowDiameter={76}
          />
          <NeumorphicQuickActionTile
            onPress={() =>
              navigation.navigate(navigationStrings.HEALTH_JOURNAL_ENTRY, {
                entryType: "blood_sugar",
              })
            }
            icon={<BloodSugarIcon width={34} height={34} />}
            label="Blood Sugar"
            containerStyle={styles.quickActionTile}
            outerDiameter={94}
            innerShadowDiameter={76}
          />
          <NeumorphicQuickActionTile
            onPress={() =>
              navigation.navigate(navigationStrings.HEALTH_JOURNAL_ENTRY, {
                entryType: "weight",
              })
            }
            icon={<WeightIcon width={34} height={34} />}
            label="Weight"
            containerStyle={styles.quickActionTile}
            outerDiameter={94}
            innerShadowDiameter={76}
          />
        </View>

        <AppButton
          text="More"
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          width="100%"
          height={48}
          borderRadius={24}
          leftIcon={<PlusTealIcon width={16} height={16} />}
          textStyle={styles.moreButtonText}
          style={styles.moreButton}
          onPress={() => { }}
        />

        <View style={styles.summarySection}>

          <NeumorphicCard
            outerStyle={styles.weeklySummaryOuter}
            innerStyle={styles.weeklySummaryInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.HEALTH_JOURNAL_WEEKLY_SUMMARY)}
          >
            <InnerShadowIcon
              icon={<CalendarIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.weeklySummaryText}>Weekly Summary</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
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
  avatarWrap: {
    alignItems: "center",
    marginTop: 12,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    resizeMode: "cover",
  },
  heading: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  quickActionsRow: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionTile: {
    width: "33.33%",
  },
  moreButton: {
    marginTop: 20,
  },
  moreButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  weeklySummaryOuter: {
    width: "100%",
  },
  weeklySummaryInner: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  weeklySummaryText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  summarySection: {
    width: "100%",
    marginTop: 40,
  },
});

export default HealthJournal;
