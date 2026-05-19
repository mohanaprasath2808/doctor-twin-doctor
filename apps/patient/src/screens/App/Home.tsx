import React from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
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
import PadMedIcon from "../../assets/icons/padMedIcon.svg";
import WalletIcon from "../../assets/icons/walletIcon.svg";

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
  { id: "healthjournal", label: "Health Journal", icon: <PadMedIcon width={34} height={34} /> },
  { id: "checkin", label: "Check-In", icon: <WalletIcon width={34} height={34} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon width={34} height={34} /> },
];

const Home = () => {
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  const numColumns = 4;
  const horizontalPadding = 16;
  const columnGap = 10;
  const rowGap = 10;
  const tileWidth =
    (screenWidth - horizontalPadding * 2 - columnGap * (numColumns - 1)) / numColumns;
  const outerDiameter = Math.min(88, tileWidth);
  const innerShadowDiameter = Math.max(56, outerDiameter - 16);

  const renderQuickAction = ({
    item,
    index,
  }: {
    item: (typeof QUICK_ACTIONS)[number];
    index: number;
  }) => (
    <NeumorphicQuickActionTile
      containerStyle={[
        styles.tile,
        {
          width: tileWidth,
          marginRight: (index + 1) % numColumns === 0 ? 0 : columnGap,
          marginBottom: rowGap,
        },
      ]}
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
        if (item.id === "imaging") {
          navigation.navigate(navigationStrings.IMAGING);
        }
        if (item.id === "billing") {
          navigation.navigate(navigationStrings.BILLING);
        }
        if (item.id === "records") {
          navigation.navigate(navigationStrings.MY_RECORDS);
        }
        if (item.id === "wellness") {
          navigation.navigate(navigationStrings.WELLNESS_MEDSPA);
        }
        if (item.id === "referral") {
          navigation.navigate(navigationStrings.REFERRALS);
        }
        if (item.id === "insurance") {
          navigation.navigate(navigationStrings.INSURANCE_ELIGIBILITY);
        }
        if (item.id === "settings") {
          navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
            screen: navigationStrings.SETTINGS,
          });
        }
        if (item.id === "healthjournal") {
          navigation.navigate(navigationStrings.HEALTH_JOURNAL);
        }
        if (item.id === "medications") {
          navigation.navigate(navigationStrings.MEDICATIONS);
        }
        if (item.id === "reminders") {
          navigation.navigate(navigationStrings.REMINDERS);
        }
      }}
      icon={item.icon}
      label={item.label}
      badge={item.badge}
      labelNumberOfLines={1}
      outerDiameter={outerDiameter}
      innerShadowDiameter={innerShadowDiameter}
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
            numColumns={numColumns}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContent}
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
    flex: 1,
  },
  gridContent: {
    paddingHorizontal: 16,
  },
  tile: {
    alignItems: "center",
  },
  gridColumn: {
    justifyContent: "flex-start",
  },
});

export default Home;
