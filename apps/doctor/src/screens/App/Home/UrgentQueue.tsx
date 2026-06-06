import React from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import CapsuleIcon from "../../../assets/icon/capsuleIcon.svg";
import EditIcon from "../../../assets/icon/editIcon.svg";
import LabReportIcon from "../../../assets/icon/labReportIcon.svg";
import MessageIcon from "../../../assets/icon/messageIcon.svg";
import NotificationIcon from "../../../assets/icon/notificationIcon.svg";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import { useAppStore } from "../../../store/useAppStore";
import UrgentQueueListItem, { type UrgentQueueItem } from "./components/UrgentQueueListItem";

const URGENT_QUEUE_ITEMS: UrgentQueueItem[] = [
  {
    id: "urgent-refill",
    label: "Urgent Refill",
    badgeLabel: "Refill Escalation",
    icon: <CapsuleIcon width={20} height={20} />,
  },
  {
    id: "abnormal-lab",
    label: "Abnormal Lab",
    badgeLabel: "Abnormal Lab",
    icon: <LabReportIcon width={20} height={20} />,
  },
  {
    id: "prior-auth",
    label: "Prior Authorization",
    badgeLabel: "Prior Authorization",
    icon: <EditIcon width={20} height={20} />,
  },
  {
    id: "message-escalation",
    label: "Message Escalation",
    badgeLabel: "Imaging Result Escalation",
    icon: <MessageIcon width={20} height={20} />,
  },
];

const UrgentQueue = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const notificationsData = useAppStore((s) => s.notificationsData);
  const bottomPad = 16 + insets.bottom;

  const navigateToHomeScreen = (screen: string) => {
    navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
      screen: navigationStrings.HOME,
      params: { screen },
    });
  };

  const handlePressItem = (item: UrgentQueueItem) => {
    switch (item.id) {
      case "urgent-refill":
        navigation.navigate(navigationStrings.REFILL_ESCALATION);
        break;
      case "abnormal-lab":
        navigation.navigate(navigationStrings.LABS_DASHBOARD);
        break;
      case "prior-auth":
        navigation.navigate(navigationStrings.PRIOR_AUTHORIZATION);
        break;
      case "message-escalation":
        navigateToHomeScreen(navigationStrings.IMAGING_RESULTS);
        break;
      default:
        break;
    }
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingLight}>Good Morning</Text>
            <Text style={styles.greetingBold}>Dr. Soliman</Text>
          </View>
        </View>
        <View style={styles.bellWrap}>
          <IconComponent
            icon={<NotificationIcon width={20} height={20} />}
            width={44}
            height={44}
            radius={22}
            onPress={() => {}}
          />
          {notificationsData.length > 1 && <View style={styles.bellDot} />}
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
      <Text style={styles.sectionTitle}>Urgent Queue</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.SURFACE} />
      <FlatList
        data={URGENT_QUEUE_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UrgentQueueListItem item={item} onPress={() => handlePressItem(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default UrgentQueue;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  listHeader: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  greetingLight: {
    fontSize: 16,
    color: COLORS.TEXT_80,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
  },
  greetingBold: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    paddingTop: 3,
  },
  bellWrap: {
    width: 44,
    height: 44,
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.ALERT,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 4,
    marginBottom: 10,
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
    marginBottom: 16,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  sectionTitle: {
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  separator: {
    height: 4,
  },
});
