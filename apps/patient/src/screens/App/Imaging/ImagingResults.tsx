import React, { useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import ImagingResultsIcon from "../../../assets/icons/imagingResults.svg";

type ImagingResultFilter = "all" | "xray" | "mri" | "ct";
type ImagingResultStatus = "completed" | "pending";

const IMAGING_RESULT_FILTERS: { key: ImagingResultFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "xray", label: "X-Ray" },
  { key: "mri", label: "MRI" },
  { key: "ct", label: "CT Scan" },
];

type ImagingResultRow = {
  id: string;
  name: string;
  date: string;
  type: Exclude<ImagingResultFilter, "all">;
  status: ImagingResultStatus;
  reportFile: string;
  reportSize: string;
};

const IMAGING_RESULT_ROWS: ImagingResultRow[] = [
  {
    id: "1",
    name: "Chest X-Ray",
    date: "20 April 2025",
    type: "xray",
    status: "completed",
    reportFile: "report_xray.pdf",
    reportSize: "245 KB",
  },
  {
    id: "2",
    name: "MRI Brain",
    date: "20 April 2025",
    type: "mri",
    status: "pending",
    reportFile: "report_mri.pdf",
    reportSize: "312 KB",
  },
  {
    id: "3",
    name: "Chest X-Ray",
    date: "20 April 2025",
    type: "xray",
    status: "completed",
    reportFile: "report_xray.pdf",
    reportSize: "245 KB",
  },
  {
    id: "4",
    name: "MRI Brain",
    date: "20 April 2025",
    type: "mri",
    status: "pending",
    reportFile: "report_mri.pdf",
    reportSize: "312 KB",
  },
];

const statusBadgePalette = (status: ImagingResultStatus) => {
  if (status === "completed") {
    return {
      value: "Completed",
      bgColor: "#D3FFF1",
      textColor: "#10B981",
      darkShadowColor: "rgba(16, 185, 129, 0.35)",
    };
  }
  return {
    value: "Pending",
    bgColor: "#FFF6D9",
    textColor: "#D6AD3D",
    darkShadowColor: "rgba(214, 173, 61, 0.35)",
  };
};

const ImagingResults = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<ImagingResultFilter>("all");

  const filteredRows = useMemo(() => {
    if (selectedFilter === "all") return IMAGING_RESULT_ROWS;
    return IMAGING_RESULT_ROWS.filter((row) => row.type === selectedFilter);
  }, [selectedFilter]);

  const renderRow = ({ item }: { item: ImagingResultRow }) => {
    const palette = statusBadgePalette(item.status);
    return (
      <NeumorphicCard
        outerStyle={styles.cardOuter}
        innerStyle={styles.cardInner}
        borderRadius={10}
        onPress={() =>
          navigation.navigate(navigationStrings.IMAGING_RESULTS_DETAILS, {
            id: item.id,
            name: item.name,
            date: item.date,
            status: item.status,
            reportFile: item.reportFile,
            reportSize: item.reportSize,
          })
        }
      >
        <View style={styles.cardRow}>
          <InnerShadowIcon
            icon={<ImagingResultsIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <View style={styles.cardCenter}>
            <Text style={styles.testName}>{item.name}</Text>
            <Text style={styles.testDate}>{item.date}</Text>
          </View>
          <View style={styles.badgeWrap}>
            <DeltaBadge
              value={palette.value}
              bgColor={palette.bgColor}
              darkShadowColor={palette.darkShadowColor}
              textColor={palette.textColor}
              height={28}
            />
          </View>
        </View>
      </NeumorphicCard>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Imaging Results</Text>
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

        <FlatList
          data={IMAGING_RESULT_FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.filtersRow}
          ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
          style={styles.filtersList}
          renderItem={({ item }) => (
            <FilterChip
              title={item.label}
              selected={item.key === selectedFilter}
              onPress={() => setSelectedFilter(item.key)}
              height={40}
              borderRadius={20}
              style={styles.filterPressable}
              selectedTextStyle={styles.filterSelectedText}
              textStyle={styles.filterText}
            />
          )}

        />

        <FlatList
          data={filteredRows}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.cardsList}
          contentContainerStyle={styles.cardsListContent}
          renderItem={renderRow}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImagingResults;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
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
  filtersList: {
    flexGrow: 0,
    flex: 0,
    paddingTop: 20,
  },
  filtersRow: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  filterSeparator: {
    width: 10,
  },
  filterPressable: {},
  filterText: {
    color: COLORS.TEXT_PRIMARY_60,
    fontSize: 14,
    fontWeight: "500",
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardsList: {
    paddingHorizontal: 16,
  },
  cardsListContent: {
    paddingTop: 10,
    paddingBottom: 16,
  },
  cardSeparator: {
    height: 16,
  },
  cardOuter: {
    alignSelf: "center",
    width: "100%",
  },
  cardInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCenter: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
    justifyContent: "center",
  },
  testName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  testDate: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_50,
  },
  badgeWrap: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
