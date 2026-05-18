import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import MedicationListCard from "./components/MedicationListCard";
import PharmacyListCard from "./components/PharmacyListCard";
import {
  fetchMedicationListRows,
  fetchStoppedMedications,
} from "./data/medications.repository";
import type { MedicationFilter, MedicationListRow, StoppedMedItem } from "./types/medications.types";

const HORIZONTAL = 16;
const TABS_GAP = 10;
const FILTER_HEIGHT = 40;
const FILTER_RADIUS = 20;

const Medications = () => {
  const navigation = useNavigation<any>();
  const { width: windowWidth } = useWindowDimensions();
  const [filter, setFilter] = useState<MedicationFilter>("upcoming");
  const [stoppedExpanded, setStoppedExpanded] = useState(true);
  const [listRows, setListRows] = useState<MedicationListRow[]>([]);
  const [stoppedMeds, setStoppedMeds] = useState<StoppedMedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const tabChipWidth = useMemo(
    () => Math.max(120, Math.floor((windowWidth - HORIZONTAL * 2 - TABS_GAP) / 2)),
    [windowWidth],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    const [rows, stopped] = await Promise.all([
      fetchMedicationListRows(filter),
      fetchStoppedMedications(),
    ]);
    setListRows(rows);
    setStoppedMeds(stopped);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onMedicationPress = useCallback(
    (medicationId: string) => {
      navigation.navigate(navigationStrings.MEDICATION_DETAIL, { medicationId });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<MedicationListRow> = ({ item }) => {
    if (item.type === "pharmacy") {
      return <PharmacyListCard item={item} />;
    }
    return <MedicationListCard item={item} onPress={onMedicationPress} />;
  };

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
          title="Upcoming"
          selected={filter === "upcoming"}
          onPress={() => setFilter("upcoming")}
          width={tabChipWidth}
          height={FILTER_HEIGHT}
          borderRadius={FILTER_RADIUS}
          style={styles.filterChip}
        />
        <FilterChip
          title="Past"
          selected={filter === "past"}
          onPress={() => setFilter("past")}
          width={tabChipWidth}
          height={FILTER_HEIGHT}
          borderRadius={FILTER_RADIUS}
          style={styles.filterChip}
        />
      </View>
    </>
  );

  const stoppedMedsSection =
    filter === "upcoming" && stoppedMeds.length > 0 ? (
      <NeumorphicCard
        outerStyle={styles.stoppedOuter}
        innerStyle={styles.stoppedInner}
        borderRadius={10}
      >
        <Pressable
          style={styles.stoppedHeader}
          onPress={() => setStoppedExpanded((prev) => !prev)}
        >
          <Text style={styles.stoppedTitle}>Stopped Meds</Text>
          <View style={[styles.chevronWrap, stoppedExpanded && styles.chevronWrapExpanded]}>
            <DropDownIcon width={12} height={12} />
          </View>
        </Pressable>

        {stoppedExpanded
          ? stoppedMeds.map((med, index) => (
              <View key={med.id}>
                {index > 0 ? <View style={styles.stoppedDivider} /> : null}
                <View style={styles.stoppedRow}>
                  <InnerShadowIcon
                    icon={<MedicationsIcon width={18} height={18} />}
                    size={40}
                    radius={20}
                    surfaceColor={COLORS.INNER_SURFACE}
                  />
                  <Text style={styles.stoppedMedName}>{med.name}</Text>
                </View>
              </View>
            ))
          : null}
      </NeumorphicCard>
    ) : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={listRows}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListFooterComponent={stoppedMedsSection}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No medications found.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default Medications;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  subGreeting: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
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
  stoppedOuter: {
    marginTop: 18,
    width: "100%",
  },
  stoppedInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  stoppedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  stoppedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  chevronWrap: {
    transform: [{ rotate: "0deg" }],
  },
  chevronWrapExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  stoppedDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 4,
  },
  stoppedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  stoppedMedName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_70,
    fontWeight: "500",
  },
});
