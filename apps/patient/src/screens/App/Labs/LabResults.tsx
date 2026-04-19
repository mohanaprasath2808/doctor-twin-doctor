import React, { useMemo, useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import LabResultsIcon from "../../../assets/icons/labResults.svg";

type LabResultFilter = "all" | "normal" | "abnormal" | "critical";

const LAB_RESULT_FILTERS: { key: LabResultFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "normal", label: "Normal" },
  { key: "abnormal", label: "Abnormal" },
  { key: "critical", label: "Critical" },
];

type LabResultStatus = "normal" | "abnormal" | "critical";

type LabResultRow = {
  id: string;
  name: string;
  value: string;
  date: string;
  status: LabResultStatus;
};

const LAB_RESULT_ROWS: LabResultRow[] = [
  {
    id: "1",
    name: "Cholesterol",
    value: "245 mg/dL",
    date: "20 April 2025",
    status: "abnormal",
  },
  {
    id: "2",
    name: "Vitamin D",
    value: "35 ng/mL",
    date: "20 April 2025",
    status: "normal",
  },
  {
    id: "3",
    name: "LDL Cholesterol",
    value: "168 mg/dL",
    date: "18 April 2025",
    status: "critical",
  },
  {
    id: "4",
    name: "Hemoglobin A1C",
    value: "5.4 %",
    date: "15 April 2025",
    status: "normal",
  },
  {
    id: "5",
    name: "Triglycerides",
    value: "210 mg/dL",
    date: "12 April 2025",
    status: "abnormal",
  },
];

const statusBadgeLabel = (status: LabResultStatus): string => {
  if (status === "normal") return "Normal";
  if (status === "critical") return "Critical";
  return "Abnormal";
};

const statusBadgePalette = (status: LabResultStatus) => {
  if (status === "normal") {
    return {
      bgColor: COLORS.SUCCESS_BG,
      textColor: COLORS.SUCCESS,
      darkShadowColor: "rgba(16, 185, 129, 0.35)",
    };
  }
  if (status === "critical") {
    return {
      bgColor: "#FFE4E4",
      textColor: "#C53030",
      darkShadowColor: "rgba(197, 48, 48, 0.35)",
    };
  }
  return {
    bgColor: COLORS.CRITICAL_BG,
    textColor: COLORS.CRITICAL,
    darkShadowColor: "rgba(255, 107, 107, 0.45)",
  };
};

const LabResults = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<LabResultFilter>("all");

  const filteredRows = useMemo(() => {
    if (selectedFilter === "all") {
      return LAB_RESULT_ROWS;
    }
    return LAB_RESULT_ROWS.filter((row) => {
      if (selectedFilter === "normal") return row.status === "normal";
      if (selectedFilter === "abnormal") return row.status === "abnormal";
      return row.status === "critical";
    });
  }, [selectedFilter]);

  const renderRow = ({ item }: { item: LabResultRow }) => {
    const palette = statusBadgePalette(item.status);
    const label = statusBadgeLabel(item.status);
    return (
      <NeumorphicCard
        outerStyle={styles.cardOuter}
        innerStyle={styles.cardInner}
        borderRadius={10}
        onPress={() =>
          navigation.navigate(navigationStrings.LAB_RESULT_DETAIL, {
            id: item.id,
            name: item.name,
            value: item.value,
            date: item.date,
            status: item.status,
          })
        }
        activeOpacity={0.88}
      >
        <View style={styles.cardRow}>
          <InnerShadowIcon icon={<LabResultsIcon width={18} height={18} />} size={40} radius={114} />
          <View style={styles.cardCenter}>
            <Text style={styles.testName}>{item.name}</Text>
            <Text style={styles.testValue}>{item.value}</Text>
            <Text style={styles.testDate}>{item.date}</Text>
          </View>
          <View style={styles.badgeWrap}>
            <DeltaBadge
              value={label}
              bgColor={palette.bgColor}
              darkShadowColor={palette.darkShadowColor}
              textColor={palette.textColor}
              height={24}
            />
          </View>
        </View>
      </NeumorphicCard>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Lab Results</Text>
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
            data={LAB_RESULT_FILTERS}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
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
  },
  filtersRow: {
    paddingRight: 8,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 16,
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
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  testValue: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  testDate: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_50,
  },
  badgeWrap: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default LabResults;
