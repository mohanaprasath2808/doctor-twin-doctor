import React, { useMemo, useRef, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { COLORS } from "../../../../../constants/theme";
import IconComponent from "../../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import AppButton from "../../../../../components/Common/AppButton";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import InputField from "../../../../../neomorphism/InputField";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../../assets/icon/searchIcon.svg";
import CalendarIcon from "../../../../../assets/icon/calendarIcon.svg";
import TimerIcon from "../../../../../assets/icon/timerIcon.svg";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";
import DateRangeBottomSheetModal, {
  DateRangeKey,
} from "../../../../../components/BottomSheets/DateRangeBottomSheetModal";
import BulbIcon from "../../../../../assets/icon/bulbIcon.svg";
import DeltaBadge from "../../../../../components/Common/DeltaBadge";
import navigationStrings from "../../../../../constants/navigationStrings";

type FilterKey = "all" | "waiting" | "inProgress" | "completed";
const FILTER_WIDTHS: Record<FilterKey, number> = {
  all: 80,
  waiting: 96,
  inProgress: 118,
  completed: 112,
};

const DATE_RANGE_OPTIONS: { key: DateRangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "lastWeek", label: "Last week" },
  { key: "lastMonth", label: "Last month" },
  { key: "lastYear", label: "Last year" },
  { key: "custom", label: "Custom" },
];

const PHYSICALS_DATA = [
  {
    id: "1",
    name: "Sarah Williams",
    age: "45F",
    time: "10:30 AM",
    detail: "Annual Physical",
    status: "Waiting",
    variant: "expanded" as const,
  },
  {
    id: "2",
    name: "Sarah Williams",
    age: "45F",
    time: "10:30 AM",
    detail: "",
    status: "In progress",
    variant: "compact" as const,
  },
  {
    id: "3",
    name: "Sarah Williams",
    age: "45F",
    time: "10:30 AM",
    detail: "",
    status: "Completed",
    variant: "compact" as const,
  },
];

const Physicals = () => {
  const navigation = useNavigation<any>();
  const dateRangeSheetRef = useRef<BSModal>(null);
  const [selectedRange, setSelectedRange] = useState<DateRangeKey>("today");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("all");

  const todayLabel = useMemo(
    () => DATE_RANGE_OPTIONS.find((option) => option.key === selectedRange)?.label ?? "Today",
    [selectedRange],
  );

  const getStatusBadge = (status: string) => {
    if (status === "Waiting") {
      return (
        <DeltaBadge
          value="Waiting"
          bgColor={COLORS.ALERT_LIGHT}
          darkShadowColor="#F2CACA"
          lightShadowColor="#FFFFFF99"
          textColor={COLORS.ALERT}
          textStyle={styles.statusBadgeText}
          height={26}
        />
      );
    }
    if (status === "In progress") {
      return (
        <DeltaBadge
          value="In progress"
          bgColor="#FFF6DE"
          darkShadowColor="#EDE0BE"
          lightShadowColor="#FFFFFF99"
          textColor="#E6A700"
          textStyle={styles.statusBadgeText}
          height={26}
        />
      );
    }
    return (
      <DeltaBadge
        value="Completed"
        bgColor="#DDF7EA"
        darkShadowColor="#A9E9D5"
        lightShadowColor="#FFFFFF99"
        textColor="#17B26A"
        textStyle={styles.statusBadgeText}
        height={26}
      />
    );
  };

  const renderCard = ({ item }: { item: (typeof PHYSICALS_DATA)[number] }) => {
    const isExpanded = item.variant === "expanded";

    const handleStartVisit = () => {
      navigation.navigate(navigationStrings.PRE_VISIT_SUMMARY);
    };

    return (
      <NeumorphicCard outerStyle={styles.itemOuter} innerStyle={styles.itemInner} borderRadius={12}>
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <Image source={DoctorTempImage} style={styles.avatar} />
            <View style={styles.topTextWrap}>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.ageText}>{item.age}</Text>
              </View>
              <View style={styles.timeRow}>
                <TimerIcon width={14} height={14} />
                <Text style={styles.timeText}>
                  {item.time}
                  {item.detail ? `  • ${item.detail}` : ""}
                </Text>
              </View>
            </View>
          </View>
          {getStatusBadge(item.status)}
        </View>

        {isExpanded ? (
          <>
            <InputField
              value="Metformin refill prepared"
              editable={false}
              minHeight={30}
              borderRadius={12}
              leftIcon={<BulbIcon width={16} height={16} />}
              containerStyle={styles.noteField}
              style={styles.noteText}
            />
            <View style={styles.divider} />
            <View style={styles.buttonRow}>
              <AppButton
                text="View Chart"
                style={styles.leftButton}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                textStyle={styles.buttonText}
              />
              <ReusableButton
                title="Start Visit"
                width="48%"
                height={40}
                borderRadius={20}
                textStyle={styles.reusableBtnText}
                onPress={() => handleStartVisit()}
              />
            </View>
          </>
        ) : null}
      </NeumorphicCard>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PHYSICALS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <IconComponent
                icon={<BackIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerTitle}>Physicals</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.searchRow}>
              <InputField
                placeholder="Search"
                leftIcon={<SearchIcon width={16} height={16} />}
                borderRadius={20}
                containerStyle={styles.searchInputField}
              />

              <NeumorphicCard
                outerStyle={styles.todayOuter}
                innerStyle={styles.todayInner}
                borderRadius={20}
                onPress={() => dateRangeSheetRef.current?.present()}
              >
                <CalendarIcon width={18} height={18} />
                <Text style={styles.todayText}>{todayLabel}</Text>
              </NeumorphicCard>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterRow}
            >
              {[
                { key: "all", label: "All" },
                { key: "waiting", label: "Waiting" },
                { key: "inProgress", label: "In progress" },
                { key: "completed", label: "Completed" },
              ].map((filter) => (
                <Pressable
                  key={filter.key}
                  style={[styles.filterPress, { width: FILTER_WIDTHS[filter.key as FilterKey] }]}
                  onPress={() => setSelectedFilter(filter.key as FilterKey)}
                >
                  {selectedFilter === filter.key ? (
                    <DeltaBadge
                      value={filter.label}
                      width={FILTER_WIDTHS[filter.key as FilterKey]}
                      height={40}
                      bgColor="#CBF0FF"
                      darkShadowColor="#C8CBCC"
                      lightShadowColor="#FFFFFF99"
                      textColor={COLORS.PRIMARY_DARK}
                      textStyle={styles.selectedFilterText}
                    />
                  ) : (
                    <NeumorphicCard
                      outerStyle={styles.filterOuter}
                      innerStyle={styles.filterInner}
                      borderRadius={20}
                    >
                      <Text style={styles.filterText}>{filter.label}</Text>
                    </NeumorphicCard>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
      />

      <DateRangeBottomSheetModal
        ref={dateRangeSheetRef}
        selectedValue={selectedRange}
        fromDate={fromDate}
        toDate={toDate}
        onSelectDone={(range, from, to) => {
          setSelectedRange(range);
          setFromDate(from);
          setToDate(to);
        }}
      />
    </SafeAreaView>
  );
};

export default Physicals;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  searchRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInputField: { width: "68%", marginTop: 0 },
  todayOuter: { width: "28%", height: 40 },
  todayInner: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  todayText: { fontSize: 14, color: COLORS.TEXT_80, fontWeight: "400" },
  filterScroll: { marginTop: 12, marginBottom: 12, marginHorizontal: -16 },
  filterRow: {
    paddingHorizontal: 0,
    paddingTop: 2,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
    paddingLeft: 16,
  },
  filterPress: { marginRight: 12 },
  filterOuter: { width: "100%" },
  filterInner: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  filterText: { fontSize: 14, color: COLORS.TEXT_80, fontWeight: "400" },
  selectedFilterText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY_DARK,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  itemOuter: { width: "100%" },
  itemInner: { paddingHorizontal: 12, paddingVertical: 12 },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  topTextWrap: { marginLeft: 10, flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  nameText: { fontSize: 14, color: COLORS.TEXT_DARK, fontWeight: "500" },
  ageText: { fontSize: 14, color: COLORS.TEXT_70, fontWeight: "400" },
  timeRow: { marginTop: 2, flexDirection: "row", alignItems: "center", gap: 4 },
  timeText: { fontSize: 12, color: COLORS.TEXT_80, fontWeight: "400" },
  statusBadgeText: { fontSize: 13, fontWeight: "500" },
  noteField: { marginTop: 12 },
  noteText: {
    fontSize: 11,
    lineHeight: 12,
    paddingTop: 0,
    paddingBottom: 0,
    color: COLORS.TEXT_DARK,
    fontWeight: "400",
  },
  divider: {
    marginTop: 14,
    marginBottom: 12,
    height: 1,
    backgroundColor: COLORS.TEXT_10,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  leftButton: { width: "48%", height: 40, borderRadius: 20 },
  buttonText: { fontSize: 14, fontWeight: "500", color: COLORS.PRIMARY_DARK },
  reusableBtnText: { fontSize: 14, fontWeight: "500", color: COLORS.WHITE },
});
