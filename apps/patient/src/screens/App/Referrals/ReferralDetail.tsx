import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../neomorphism/ReusableButton";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import LabLocationPin from "../../../assets/icons/labLocationPin.svg";
import ScheduleIcon from "../../../assets/icons/schedule.svg";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import NeumorphismProgressTracker from "../../../neomorphism/NeumorphismProgressTracker";

const HORIZONTAL = 16;
const FOOTER_BTN_HEIGHT = 48;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

/** Static placeholder copy until API wiring; no route params. */
const MOCK = {
  doctorName: "Dr. Lisa Shaw",
  referralType: "ENT Referral",
  labName: "Quest Diagnostics",
  labCity: "Los Angeles, CA",
  dateTimeLine: "24 Mar 2026, 02:00 PM",
};

const ReferralDetail = () => {
  const navigation = useNavigation<any>();

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
        <Text style={styles.headerTitle}>Referral Detail</Text>
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={10}
        >
          <View style={styles.detailRow}>
            <Image source={DoctorTempImage} style={styles.doctorPhoto} resizeMode="cover" />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>{MOCK.doctorName}</Text>
              <Text style={styles.detailMuted}>{MOCK.referralType}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<LabLocationPin width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>{MOCK.labName}</Text>
              <Text style={styles.detailMuted}>{MOCK.labCity}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<ScheduleIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>{MOCK.dateTimeLine}</Text>
              <Text style={styles.detailMuted}>Date & Time</Text>
            </View>
          </View>
        </NeumorphicCard>
        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.cardInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Progress Tracker</Text>
          <NeumorphismProgressTracker />
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <View style={styles.footerHalf}>
            <AppButton
              text="Reschedule"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              height={FOOTER_BTN_HEIGHT}
              borderRadius={24}
              width="100%"
              textStyle={styles.outlineBtnText}
              onPress={() => undefined}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              text="Message Care Team"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              height={FOOTER_BTN_HEIGHT}
              borderRadius={24}
              width="100%"
              textStyle={styles.outlineBtnText}
              onPress={() => undefined}
            />
          </View>
        </View>
        <ReusableButton
          title="Directions"
          gradientColors={REUSABLE_GRADIENT}
          height={FOOTER_BTN_HEIGHT}
          onPress={() => undefined}
          containerStyle={styles.directionsBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReferralDetail;

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
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  notifWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ALERT,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 18,
    paddingBottom: 16,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doctorPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  detailTextWrap: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  detailMain: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  detailMuted: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 14,
    marginHorizontal: 0,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 16 : 10,
    gap: 12,
    backgroundColor: COLORS.SURFACE,
  },
  footerRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
  },
  outlineBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  directionsBtn: {
    alignSelf: "stretch",
  },
  cardGap: {
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
    marginBottom: 2,
  },
});
