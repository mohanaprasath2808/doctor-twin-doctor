import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import FilterChip from "../../../components/Common/FilterChip";
import IconComponent from "../../../neomorphism/IconComponent";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import MedicationListCard, { type MedicationListCardItem } from "./components/MedicationListCard";

const HORIZONTAL = 16;
const TABS_GAP = 10;
const FILTER_HEIGHT = 40;
const FILTER_RADIUS = 20;

type MedicationTab = "active" | "stopped";

/** Replace with API response when integrated. */
const ACTIVE_MEDICATIONS: MedicationListCardItem[] = [
  {
    id: "med-1",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    lastRefillDate: "21 Jun 2026",
  },
  {
    id: "med-2",
    name: "Lexapro 30 mg",
    instructions: "Take 1 tablet daily",
    lastRefillDate: "21 Jun 2026",
  },
  {
    id: "med-3",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    lastRefillDate: "21 Jun 2026",
    pharmacyOnFile: true,
  },
];

/** Replace with API response when integrated. */
const STOPPED_MEDICATIONS: MedicationListCardItem[] = [
  {
    id: "stopped-1",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    lastRefillDate: "21 Jun 2026",
  },
  {
    id: "stopped-2",
    name: "Lexapro 30 mg",
    instructions: "Take 1 tablet daily",
    lastRefillDate: "21 Jun 2026",
  },
  {
    id: "stopped-3",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    lastRefillDate: "21 Jun 2026",
    pharmacyOnFile: true,
  },
];

const Medications = () => {
  const navigation = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();
  const { width: windowWidth } = useWindowDimensions();
  const [tab, setTab] = useState<MedicationTab>("active");

  const tabChipWidth = useMemo(
    () => Math.max(120, Math.floor((windowWidth - HORIZONTAL * 2 - TABS_GAP) / 2)),
    [windowWidth],
  );

  const listData = tab === "active" ? ACTIVE_MEDICATIONS : STOPPED_MEDICATIONS;

  const onMedicationPress = useCallback(
    (medicationId: string) => {
      navigation.navigate(navigationStrings.MEDICATION_DETAIL, { medicationId });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<MedicationListCardItem> = ({ item }) => (
    <MedicationListCard item={item} onPress={onMedicationPress} />
  );

  const listHeader = (
    <>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Medications</Text>
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

      <Text style={styles.greeting}>Hi Sarah,</Text>
      <Text style={styles.subGreeting}>how can I assist you with medications?</Text>

      <View style={styles.filtersRow}>
        <FilterChip
          title="Active Medications"
          selected={tab === "active"}
          onPress={() => setTab("active")}
          width={tabChipWidth}
          height={FILTER_HEIGHT}
          borderRadius={FILTER_RADIUS}
          style={styles.filterChip}
        />
        <FilterChip
          title="Stopped Medications"
          selected={tab === "stopped"}
          onPress={() => setTab("stopped")}
          width={tabChipWidth}
          height={FILTER_HEIGHT}
          borderRadius={FILTER_RADIUS}
          style={styles.filterChip}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        style={styles.list}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={tab}
        ListHeaderComponent={listHeader}
        contentContainerStyle={[styles.listContent, { paddingBottom: tabBarHeight + 16 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {tab === "active" ? "No active medications found." : "No stopped medications found."}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Medications;

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
  },
  headerTitle: {
    ...TEXT.screenTitle,
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 24,
    flexGrow: 1,
  },
  listSeparator: {
    height: 14,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 8,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    resizeMode: "cover",
  },
  greeting: {
    marginTop: 6,
    textAlign: "center",
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  subGreeting: {
    marginTop: 4,
    textAlign: "center",
    ...TEXT.caption,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_70,
    paddingHorizontal: 8,
  },
  filtersRow: {
    marginTop: 18,
    marginBottom: 14,
    flexDirection: "row",
    gap: TABS_GAP,
    alignItems: "center",
  },
  filterChip: {
    flex: 1,
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY_70,
  },
});
