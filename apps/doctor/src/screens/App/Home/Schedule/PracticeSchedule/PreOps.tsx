import React, { useMemo, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { COLORS } from "../../../../../constants/theme";
import IconComponent from "../../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
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
import DeltaBadge from "../../../../../components/Common/DeltaBadge";
import BulbIcon from "../../../../../assets/icon/bulbIcon.svg";

const PRE_OPS_DATA = [
  {
    id: "1",
    name: "Sarah Williams",
    age: "45F",
    time: "10:30 AM",
    procedure: "Knee Replacement",
    surgery: "12 June 2025",
    note: "Metformin refill prepared",
  },
];

const DATE_RANGE_OPTIONS: { key: DateRangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "lastWeek", label: "Last week" },
  { key: "lastMonth", label: "Last month" },
  { key: "lastYear", label: "Last year" },
  { key: "custom", label: "Custom" },
];

const formatShortDate = (date: Date) =>
  date.toLocaleDateString("en-US", { day: "numeric", month: "short" });

const PreOps = () => {
  const navigation = useNavigation<any>();
  const dateRangeSheetRef = useRef<BSModal>(null);
  const [selectedRange, setSelectedRange] = useState<DateRangeKey>("today");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const rangeLabel = useMemo(() => {
    if (selectedRange === "custom" && fromDate && toDate) {
      return `${formatShortDate(fromDate)} - ${formatShortDate(toDate)}`;
    }
    return (
      DATE_RANGE_OPTIONS.find((option) => option.key === selectedRange)?.label ??
      "Today"
    );
  }, [selectedRange, fromDate, toDate]);

  const renderItem = ({ item }: { item: (typeof PRE_OPS_DATA)[number] }) => (
    <NeumorphicCard
      outerStyle={styles.itemOuter}
      innerStyle={styles.itemInner}
      borderRadius={12}
    >
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
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        </View>
        <DeltaBadge
          value="Cardiac History"
          bgColor={COLORS.ALERT_LIGHT}
          darkShadowColor="#F2CACA"
          lightShadowColor="#FFFFFF99"
          textColor={COLORS.ALERT}
          textStyle={styles.badgeText}
          height={30}
        />
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Procedure</Text>
          <Text style={styles.metaValue}>{item.procedure}</Text>
        </View>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Surgery</Text>
          <Text style={styles.metaValue}>{item.surgery}</Text>
        </View>
      </View>

      <InputField
        value={item.note}
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
          text="Review Labs"
          style={styles.leftButton}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.buttonText}
        />
        <ReusableButton
          title="Start Evaluation"
          width="48%"
          height={40}
          borderRadius={20}
          textStyle={styles.reusableBtnText}
        />
      </View>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Pre-Ops</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchRow}>
        <InputField
          placeholder="Search"
          leftIcon={<SearchIcon width={18} height={18} />}
          borderRadius={64}
          containerStyle={styles.searchInputField}
        />

        <NeumorphicCard
          outerStyle={styles.todayOuter}
          innerStyle={styles.todayInner}
          borderRadius={64}
          onPress={() => dateRangeSheetRef.current?.present()}
        >
          <CalendarIcon width={18} height={18} />
          <Text style={styles.todayText} numberOfLines={1}>
            {rangeLabel}
          </Text>
        </NeumorphicCard>
      </View>

      <FlatList
        data={PRE_OPS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
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

export default PreOps;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  searchRow: {
    marginTop: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
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
    paddingHorizontal: 6,
  },
  todayText: { fontSize: 12, color: COLORS.TEXT_80, fontWeight: "400", flexShrink: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 },
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
  badgeText: { fontSize: 13, fontWeight: "500", color: COLORS.ALERT },
  metaRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaCol: { width: "48%" },
  metaLabel: { fontSize: 12, color: COLORS.TEXT_70, fontWeight: "400" },
  metaValue: {
    marginTop: 3,
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
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
  buttonText: { fontSize: 14, fontWeight: "500", color: COLORS.PRIMARY },
  reusableBtnText: { fontSize: 14, fontWeight: "500", color: COLORS.WHITE },
});
