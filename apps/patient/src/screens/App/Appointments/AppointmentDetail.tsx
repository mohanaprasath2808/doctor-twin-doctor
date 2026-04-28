import React from "react";
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import DoctorIcon from "../../../assets/icons/doctor.svg";
import ScheduleIcon from "../../../assets/icons/schedule.svg";
import PinIcon from "../../../assets/icons/labLocationPin.svg";

const FOOTER_BTN_HEIGHT = 48;

/** Demo coordinates near example address (open Maps / fallback search). */
const MAP_QUERY = encodeURIComponent("Quest Diagnostics, 2118 Thornridge Cir, Syracuse, CT 35624");
const OPEN_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const doctorName = "Dr. Shahinaz Soliman";
const dateTimeLine = "24 Mar 2026 05:00 PM";
const locationTitle = "Quest Diagnostics";
const locationAddress = "2118 Thornridge Cir. Syracuse, Connecticut 35624";

const AppointmentDetail = () => {
  const navigation = useNavigation<any>();

  const openInMaps = () => {
    Linking.openURL(OPEN_MAP_URL).catch(() => {});
  };

  const addToCalendar = () => {
    // Wire to device calendar / API when available
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
        <Text style={styles.headerTitle}>Appointment Detail</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInnerInfo}
          borderRadius={14}
        >
          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<DoctorIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>{doctorName}</Text>
              <Text style={styles.detailLabel}>Doctor</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<ScheduleIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>{dateTimeLine}</Text>
              <Text style={styles.detailLabel}>Date & Time</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<PinIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>{locationTitle}</Text>
              <Text style={styles.detailLabel}>{locationAddress}</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInnerMap}
          borderRadius={14}
        >
          <Text style={styles.mapSectionTitle}>Map</Text>
          <Pressable
            onPress={openInMaps}
            style={({ pressed }) => [styles.mapPreview, pressed && styles.mapPreviewPressed]}
            accessibilityRole="button"
            accessibilityLabel="Open location in maps"
          >
            <View style={styles.mapPinWrap} pointerEvents="none">
              <PinIcon width={28} height={28} />
            </View>
            <Text style={styles.mapTapHint} pointerEvents="none">
              Tap to open in Maps
            </Text>
          </Pressable>
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <View style={styles.footerHalf}>
            <AppButton
              text="Add to Calendar"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              height={FOOTER_BTN_HEIGHT}
              borderRadius={60}
              width="100%"
              textStyle={styles.addCalText}
              onPress={addToCalendar}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              text="Cancel Appointment"
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.CRITICAL_BG}
              height={FOOTER_BTN_HEIGHT}
              borderRadius={60}
              width="100%"
              textStyle={styles.cancelApptText}
              onPress={() => {}}
            />
          </View>
        </View>
        <ReusableButton
          title="Reschedule"
          gradientColors={["#22D3EE", "#0F766E"]}
          height={FOOTER_BTN_HEIGHT}
          onPress={() => navigation.navigate(navigationStrings.SCHEDULE_STEP_1)}
          containerStyle={styles.rescheduleBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 18,
  },
  cardOuter: {
    width: "100%",
  },
  cardInnerInfo: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardInnerMap: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  detailTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  detailMain: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "600",
  },
  detailLabel: {
    marginTop: 4,
    color: COLORS.TEXT_PRIMARY_70,
    fontSize: 12,
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 14,
    marginHorizontal: 4,
  },
  mapSectionTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  mapPreview: {
    height: 140,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E8EDF3",
    flexDirection: "column",
    alignItems: "stretch",
  },
  mapPreviewPressed: {
    opacity: 0.9,
  },
  mapPinWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapTapHint: {
    paddingBottom: 10,
    paddingTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 8 : 16,
    gap: 20,
  },
  footerRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
  },
  addCalText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  cancelApptText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.ALERT,
  },
  rescheduleBtn: {
    alignSelf: "stretch",
  },
});

export default AppointmentDetail;
