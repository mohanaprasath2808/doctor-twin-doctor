import React from "react";
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../constants/theme";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import IconComponent from "../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NotificationIcon from "../../../assets/icon/notificationIcon.svg";
import BlackTickIcon from "../../../assets/icon/blackTickIcon.svg";
import ListIcon from "../../../assets/icon/listIcon.svg";
import ScheduleIcon from "../../../assets/icon/scheduleIcon.svg";
import PatientIcon from "../../../assets/icon/patientIcon.svg";
import MessageIcon from "../../../assets/icon/messageIcon.svg";
import RevenueIcon from "../../../assets/icon/revenueIcon.svg";
import ScribeIcon from "../../../assets/icon/scribeIcon.svg";
import WarningIcon from "../../../assets/icon/warningIcon.svg";
import navigationStrings from "../../../constants/navigationStrings";

type BriefItem = {
  id: number;
  label: string;
  icon: () => React.ReactNode;
};

const MORNING_BRIEF_ITEMS: BriefItem[] = [
  { id: 1, label: "Approve", icon: () => <BlackTickIcon width={18} height={18} /> },
  { id: 2, label: "Review", icon: () => <ListIcon width={18} height={18} /> },
  { id: 3, label: "Schedule", icon: () => <ScheduleIcon width={18} height={18} /> },
  { id: 4, label: "Patient", icon: () => <PatientIcon width={18} height={18} /> },
  { id: 5, label: "Messages", icon: () => <MessageIcon width={18} height={18} /> },
  { id: 6, label: "Revenue", icon: () => <RevenueIcon width={18} height={18} /> },
  { id: 7, label: "Scribe", icon: () => <ScribeIcon width={18} height={18} /> },
  { id: 8, label: "Urgent", icon: () => <WarningIcon width={18} height={18} /> },
];

const CARD_CORNER_RADIUS = 12;

const MorningBrief = () => {
  const navigation = useNavigation<any>();

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Dr.Twin Listening...</Text>
        <View style={styles.bellWrap}>
          <IconComponent
            icon={<NotificationIcon width={20} height={20} />}
            width={44}
            height={44}
            radius={22}
            onPress={() => {}}
          />
        </View>
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.imageContainer}
        wrapperStyle={styles.wrapper}
        overlayStyle={styles.overlayImage}
        imageStyle={styles.image}
      />

      <Text style={styles.subtitle}>What can I assist you with?</Text>
    </View>
  );

  const navigateToHomeScreen = (screen: string) => {
    navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
      screen: navigationStrings.HOME,
      params: { screen },
    });
  };

  const handlePressItem = (item: BriefItem) => {
    switch (item.label) {
      case "Review":
        navigation.navigate(navigationStrings.DOCTOR_REVIEW);
        break;
      case "Schedule":
        navigation.navigate(navigationStrings.SCHEDULE);
        break;
      case "Patient":
        navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
          screen: navigationStrings.PATIENTS,
        });
        break;
      case "Messages":
        navigation.navigate(navigationStrings.VISIT_MESSAGES);
        break;
      case "Revenue":
        navigateToHomeScreen(navigationStrings.REVENUE_DASHBOARD);
        break;
      case "Scribe":
        navigateToHomeScreen(navigationStrings.START_VISIT);
        break;
      case "Urgent":
        navigation.navigate(navigationStrings.URGENT_QUEUE);
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }: { item: BriefItem }) => (
    <TouchableOpacity style={styles.gridCell} activeOpacity={0.8} onPress={() => handlePressItem(item)}>
      <View style={styles.cardOuter}>
        <NeumorphicCard
          borderRadius={CARD_CORNER_RADIUS}
          outerStyle={styles.cardNeumorphOuter}
          innerStyle={[styles.card, { borderRadius: CARD_CORNER_RADIUS }]}
        >
          <View style={styles.cardIconContainer}>
            <InnerShadowIcon icon={item.icon()} size={40} />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel} numberOfLines={2}>
              {item.label}
            </Text>
          </View>
        </NeumorphicCard>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.SURFACE} />
      <FlatList
        data={MORNING_BRIEF_ITEMS}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default MorningBrief;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  listHeader: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerSpacer: {
    width: 44,
    height: 44,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 36 / 2,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
  },
  bellWrap: {
    width: 44,
    height: 44,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 8,
    marginBottom: 12,
  },
  wrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 115,
  },
  subtitle: {
    marginBottom: 18,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
  },
  gridRow: {
    gap: 16,
    marginBottom: 16,
  },
  gridCell: {
    flex: 1,
    maxWidth: "50%",
    overflow: "visible",
  },
  cardOuter: {
    width: "100%",
    position: "relative",
    overflow: "visible",
  },
  cardNeumorphOuter: {
    width: "100%",
  },
  card: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextWrap: {
    flex: 1,
    gap: 4,
  },
  cardLabel: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    lineHeight: 20,
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "500",
  },
});
