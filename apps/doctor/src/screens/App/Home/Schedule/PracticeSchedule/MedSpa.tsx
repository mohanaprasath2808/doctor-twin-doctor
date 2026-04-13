import React, { useMemo, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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

const APPOINTMENTS = [
  {
    id: "1",
    name: "Emily Clark",
    age: "45F",
    time: "10:30 AM",
    service: "Botox",
    provider: "Dr. Shahinaz",
  },
  {
    id: "2",
    name: "Emily Clark",
    age: "45F",
    time: "10:30 AM",
    service: "Botox",
    provider: "Dr. Shahinaz",
  },
  {
    id: "3",
    name: "Emily Clark",
    age: "45F",
    time: "10:30 AM",
    service: "Botox",
    provider: "Dr. Shahinaz",
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

const MedSpa = () => {
  const navigation = useNavigation<any>();
  const dateRangeSheetRef = useRef<BSModal>(null);
  const [selectedRange, setSelectedRange] = useState<DateRangeKey>("today");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const todayLabel = useMemo(
    () =>
      DATE_RANGE_OPTIONS.find((option) => option.key === selectedRange)
        ?.label ?? "Today",
    [selectedRange],
  );

  const renderItem = ({ item }: { item: (typeof APPOINTMENTS)[number] }) => (
    <NeumorphicCard
      outerStyle={styles.itemOuter}
      innerStyle={styles.itemInner}
      borderRadius={12}
    >
      <View style={styles.topRow}>
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

      <View style={styles.metaRow}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Service</Text>
          <Text style={styles.metaValue}>{item.service}</Text>
        </View>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Provider</Text>
          <Text style={styles.metaValue}>{item.provider}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.buttonRow}>
        <AppButton
          text="View Forms"
          style={styles.viewFormsButton}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.buttonText1}
        />
        <ReusableButton
          title="Check-In"
          width="48%"
          height={40}
          borderRadius={20}
          textStyle={styles.buttonText}
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
        <Text style={styles.headerTitle}>Med Spa</Text>
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
          <Text style={styles.todayText}>{todayLabel}</Text>
        </NeumorphicCard>
      </View>

      <FlatList
        data={APPOINTMENTS}
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

export default MedSpa;

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
    marginBottom: 2,
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
  listContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 },
  itemOuter: { width: "100%" },
  itemInner: { paddingHorizontal: 12, paddingVertical: 12 },
  topRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  topTextWrap: { marginLeft: 10, flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  nameText: { fontSize: 14, color: COLORS.TEXT_DARK, fontWeight: "500" },
  ageText: { fontSize: 14, color: COLORS.TEXT_70, fontWeight: "400" },
  timeRow: { marginTop: 2, flexDirection: "row", alignItems: "center", gap: 4 },
  timeText: { fontSize: 14, color: COLORS.TEXT_80, fontWeight: "400" },
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
  divider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: COLORS.TEXT_10,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  viewFormsButton: { width: "48%", height: 40, borderRadius: 20 },
  buttonText: { fontSize: 14, fontWeight: "500", color: COLORS.WHITE },
  buttonText1: { fontSize: 14, fontWeight: "500", color: COLORS.PRIMARY },
});
