import React from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import AppButton from "../../components/Common/AppButton";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicQuickActionTile from "../../components/Common/NeumorphicQuickActionTile";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
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
  const navigation = useNavigation<any>();
  const renderQuickAction = ({ item }: { item: (typeof QUICK_ACTIONS)[number] }) => (
    <NeumorphicQuickActionTile
      containerStyle={styles.tile}
      onPress={() => {
        if (item.id === "schedule") {
          navigation.navigate(navigationStrings.APPOINTMENTS);
        }
        if (item.id === "message") {
          navigation.navigate(navigationStrings.NOTIFICATIONS);
        }
        if (item.id === "lab") {
          navigation.navigate(navigationStrings.LABS);
        }
      }}
      icon={item.icon}
      label={item.label}
      badge={item.badge}
      labelNumberOfLines={1}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
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

        <NeumorphicCard
          outerStyle={styles.messageCardOuter}
          innerStyle={styles.messageCardInner}
          borderRadius={10}
        >
          <InnerShadowIcon
            icon={<MessageIcon width={20} height={20} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <Text style={styles.alertText}>You have a new message from{"\n"}your care team</Text>
          <AppButton
            text="View"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            width={60}
            height={28}
            borderRadius={14}
            textStyle={styles.viewButtonText}
            onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
          />
        </NeumorphicCard>

        <View style={styles.grid}>
          <FlatList
            data={QUICK_ACTIONS}
            keyExtractor={(item) => item.id}
            renderItem={renderQuickAction}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridColumn}
          />
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
  content: {
    paddingBottom: 50,
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
  messageCardOuter: {
    marginTop: 20,
    marginHorizontal: 16,
    alignSelf: "stretch",
  },
  messageCardInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "400",
  },
  viewButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
  },
  grid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  tile: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16,
  },
  gridColumn: {
    paddingHorizontal: 16,
    gap: 10,
  },
});

export default Home;
