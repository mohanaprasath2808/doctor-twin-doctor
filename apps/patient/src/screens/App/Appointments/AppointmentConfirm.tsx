import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import DoctorIcon from "../../../assets/icons/doctorBlueIcon.svg";
import ScheduleIcon from "../../../assets/icons/schedule.svg";
import PinIcon from "../../../assets/icons/labLocationPin.svg";
import navigationStrings from "../../../constants/navigationStrings";

const AppointmentConfirm = () => {
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
        <Text style={styles.headerTitle}>Review & Confirm</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.reasonCardInner} borderRadius={10}>
          <Text style={styles.sectionLabel}>Reason</Text>
          <InputField
            value="General Consultation"
            editable={false}
            isFocused
            containerStyle={styles.reasonField}
            borderRadius={12}
            height={42}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.detailsCardInner} borderRadius={10}>
          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<DoctorIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.detailTextWrap}>
              <Text style={styles.detailMain}>Dr. Shahinaz Soliman</Text>
              <Text style={styles.detailSub}>Doctor</Text>
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
              <Text style={styles.detailMain}>24 Mar 2026 05:00 PM</Text>
              <Text style={styles.detailSub}>Date & Time</Text>
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
              <Text style={styles.detailMain}>Quest Diagnostics</Text>
              <Text style={styles.detailSub}>2118 Thornridge Cir. Syracuse, Connecticut 35624</Text>
            </View>
          </View>
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Confirm Appointment"
          gradientColors={["#22D3EE", "#0F766E"]}
          height={48}
          borderRadius={24}
          width="100%"
          onPress={() => navigation.navigate(navigationStrings.APPOINTMENT_SCHEDULED)}
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
  reasonCardInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  detailsCardInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  sectionLabel: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  reasonField: {
    marginTop: 10,
    marginBottom: 0,
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
    fontWeight: "500",
  },
  detailSub: {
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
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 8 : 16,
  },
});

export default AppointmentConfirm;
