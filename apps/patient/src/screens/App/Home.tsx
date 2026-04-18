import React from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import { COLORS } from "../../constants/theme";
import BottomNavbar from "../../components/App/BottomNavbar";
import MessageIcon from "../../assets/icons/message.svg";
import ScheduleIcon from "../../assets/icons/schedule.svg";
import TelemedicineIcon from "../../assets/icons/telemedicine.svg";
import MedicationsIcon from "../../assets/icons/medications.svg";
import MyRecordsIcon from "../../assets/icons/myRecords.svg";
import LabResultsIcon from "../../assets/icons/labResults.svg";
import ImagingResultsIcon from "../../assets/icons/imagingResults.svg";
import ReferralIcon from "../../assets/icons/referral.svg";
import BillingIcon from "../../assets/icons/billing.svg";
import InsuranceIcon from "../../assets/icons/insurance.svg";
import WellnessIcon from "../../assets/icons/wellness.svg";
import RemindersIcon from "../../assets/icons/reminders.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

const QUICK_ACTIONS = [
  { id: "message", label: "Message", icon: <MessageIcon width={32} height={32} />, badge: "3" },
  { id: "schedule", label: "Schedule", icon: <ScheduleIcon width={32} height={32} />, badge: "3" },
  { id: "telemedicine", label: "Telemedicine", icon: <TelemedicineIcon width={32} height={32} /> },
  { id: "medications", label: "Medications", icon: <MedicationsIcon width={32} height={32} /> },
  { id: "records", label: "My Records", icon: <MyRecordsIcon width={32} height={32} /> },
  { id: "lab", label: "Lab Results", icon: <LabResultsIcon width={32} height={32} /> },
  { id: "imaging", label: "Imaging Res...", icon: <ImagingResultsIcon width={32} height={32} /> },
  { id: "referral", label: "Referral", icon: <ReferralIcon width={32} height={32} /> },
  { id: "billing", label: "Billing", icon: <BillingIcon width={32} height={32} /> },
  { id: "insurance", label: "Insurance", icon: <InsuranceIcon width={32} height={32} /> },
  { id: "wellness", label: "Wellness", icon: <WellnessIcon width={32} height={32} /> },
  { id: "reminders", label: "Reminders", icon: <RemindersIcon width={32} height={32} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon width={34} height={34} /> },
];

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.heading}>Welcome back, Sarah!</Text>
        <Text style={styles.subHeading}>Here&apos;s how I can assist you</Text>

        <View style={styles.alertCard}>
          <View style={styles.alertLeft}>
            <View style={styles.iconWrap}>
              <View style={styles.iconInnerShadow}>
                <InnerShadowView width={40} height={40} borderRadius={20} color="#F7FBFF" />
              </View>
              <MessageIcon width={20} height={20} />
            </View>
            <Text style={styles.alertText}>You have a new message from{"\n"}your care tewam</Text>
          </View>
          <TouchableOpacity style={styles.viewBtn} activeOpacity={0.85}>
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {QUICK_ACTIONS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.tile} activeOpacity={0.85}>
              <View style={styles.tileOuter}>
                <View style={styles.tileInnerShadow}>
                  <InnerShadowView width={72} height={72} borderRadius={36} color="#F7FBFF" />
                </View>
                {item.icon}
                {!!item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.tileLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 130,
  },
  avatarContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 10 : 20,
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
  heading: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  subHeading: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: "#6B6B6B",
  },
  alertCard: {
    marginTop: 20,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  alertLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconInnerShadow: {
    position: "absolute",
  },
  alertText: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "400",
  },
  viewBtn: {
    width: 60,
    height: 28,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.SURFACE,
  },
  viewBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
  },
  grid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tile: {
    width: "25%",
    alignItems: "center",
    marginBottom: 16,
  },
  tileOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.SURFACE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
  },
  tileInnerShadow: {
    position: "absolute",
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.CRITICAL,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },
  tileLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
});

export default Home;