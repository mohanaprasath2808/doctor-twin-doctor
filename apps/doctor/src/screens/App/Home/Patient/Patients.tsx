import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import navigationStrings from "../../../../constants/navigationStrings";

type SectionFilter = "all" | "today" | "followUp";
const FILTER_WIDTHS: Record<SectionFilter, number> = {
  all: 64,
  today: 126,
  followUp: 156,
};

type PatientItem = {
  id: string;
  name: string;
  ageGender: string;
  note: string;
  time: string;
  hasUnread: boolean;
};

const SEEING_TODAY: PatientItem[] = [
  {
    id: "st-1",
    name: "Sarah Williams",
    ageGender: "45F",
    note: "Diabetes, HTN",
    time: "02:30 PM",
    hasUnread: true,
  },
  {
    id: "st-2",
    name: "Michael Clement",
    ageGender: "45M",
    note: "New Patient",
    time: "02:30 PM",
    hasUnread: true,
  },
  {
    id: "st-3",
    name: "Sarah Williams",
    ageGender: "45F",
    note: "Annual Physical",
    time: "02:30 PM",
    hasUnread: true,
  },
];

const FOLLOW_UP: PatientItem[] = [
  {
    id: "fu-1",
    name: "Sarah Williams",
    ageGender: "45F",
    note: "Diabetes, HTN",
    time: "02:30 PM",
    hasUnread: true,
  },
  {
    id: "fu-2",
    name: "Sarah Williams",
    ageGender: "45F",
    note: "Diabetes, HTN",
    time: "02:30 PM",
    hasUnread: false,
  },
];

const RECENT_PATIENTS: PatientItem[] = [
  {
    id: "rp-1",
    name: "Emily Johnson",
    ageGender: "32F",
    note: "Follow-up visit",
    time: "Yesterday",
    hasUnread: false,
  },
  {
    id: "rp-2",
    name: "David Chen",
    ageGender: "58M",
    note: "Lab review",
    time: "Mar 22",
    hasUnread: true,
  },
  {
    id: "rp-3",
    name: "Maria Lopez",
    ageGender: "41F",
    note: "Medication refill",
    time: "Mar 20",
    hasUnread: false,
  },
];

const Patients = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<SectionFilter>("all");

  const openPatientSnapshot = () => {
    navigation.navigate(navigationStrings.PATIENT_SNAPSHOT);
  };

  const showToday = selectedFilter === "all" || selectedFilter === "today";
  const showFollowUp = selectedFilter === "all" || selectedFilter === "followUp";
  const showRecent = selectedFilter === "all";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Today’s Patients</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchContainer}>
          <InputField
            value={search}
            onChangeText={setSearch}
            placeholder="Search Patients"
            leftIcon={<SearchIcon width={18} height={18} />}
            containerStyle={styles.searchInput}
            borderRadius={30}
            minHeight={46}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersRow}
        >
          <FilterChip
            title="All"
            chipWidth={FILTER_WIDTHS.all}
            selected={selectedFilter === "all"}
            onPress={() => setSelectedFilter("all")}
          />
          <FilterChip
            title="Seeing Today"
            chipWidth={FILTER_WIDTHS.today}
            selected={selectedFilter === "today"}
            onPress={() => setSelectedFilter("today")}
          />
          <FilterChip
            title="Needs Follow-up"
            chipWidth={FILTER_WIDTHS.followUp}
            selected={selectedFilter === "followUp"}
            onPress={() => setSelectedFilter("followUp")}
          />
        </ScrollView>

        {showToday && (
          <PatientSection
            title="Seeing today"
            data={SEEING_TODAY}
            onPressPatient={openPatientSnapshot}
          />
        )}
        {showFollowUp && (
          <PatientSection
            title="Needs Follow-Up"
            data={FOLLOW_UP}
            onPressPatient={openPatientSnapshot}
          />
        )}
        {showRecent && (
          <PatientSection
            title="Recent Patient"
            data={RECENT_PATIENTS}
            onPressPatient={openPatientSnapshot}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const FilterChip = ({
  title,
  chipWidth,
  selected,
  onPress,
}: {
  title: string;
  chipWidth: number;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={[styles.filterPress, { width: chipWidth }]}>
    {selected ? (
      <DeltaBadge
        icon={null}
        value={title}
        width={chipWidth}
        height={40}
        bgColor="#CBF0FF"
        darkShadowColor="#C8CBCC"
        lightShadowColor="#FFFFFF99"
        textColor={COLORS.PRIMARY}
        textStyle={styles.selectedFilterText}
      />
    ) : (
      <NeumorphicCard
        outerStyle={[styles.filterOuter, { width: chipWidth }]}
        innerStyle={styles.filterInner}
        borderRadius={20}
      >
        <Text style={styles.filterText} numberOfLines={1}>
          {title}
        </Text>
      </NeumorphicCard>
    )}
  </Pressable>
);

const PatientSection = ({
  title,
  data,
  onPressPatient,
}: {
  title: string;
  data: PatientItem[];
  onPressPatient: () => void;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View all</Text>
    </View>
    <View style={styles.cards}>
      {data.map((item) => (
        <NeumorphicCard
          key={item.id}
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={12}
          onPress={onPressPatient}
        >
          <View style={styles.patientRow}>
            <InnerShadowIcon
              icon={<Text style={styles.initials}>{getInitials(item.name)}</Text>}
              size={40}
            />
            <View style={styles.patientInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.patientName}>{item.name}</Text>
                <Text style={styles.patientMeta}>{item.ageGender}</Text>
              </View>
              <View style={styles.patientSubRow}>
                <Text style={styles.patientSub}>{item.note}</Text>
                <View style={styles.subDot} />
                <Text style={styles.patientSub}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.trailing}>
              {item.hasUnread && <View style={styles.unreadDot} />}
              <RightArrowIcon width={12} height={12} />
            </View>
          </View>
        </NeumorphicCard>
      ))}
    </View>
  </View>
);

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default Patients;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  searchContainer: {
    marginTop: 10,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  searchInput: { marginTop: 18 },
  filtersScroll: {
    // marginTop: 20,
    paddingVertical: 15,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 8,
  },
  filterPress: { flexShrink: 0 },
  filterOuter: {},
  filterInner: {
    paddingHorizontal: 18,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterText: { color: COLORS.TEXT_70, fontSize: 14, fontWeight: "500" },
  selectedFilterText: { fontSize: 14, fontWeight: "500" },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "600" },
  viewAll: { color: COLORS.PRIMARY, fontSize: 12, fontWeight: "500" },
  cards: { gap: 16 },
  patientCardOuter: { width: "100%" },
  patientCardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  initials: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  patientInfo: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  patientMeta: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400" },
  patientSub: {
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "400",
  },
  patientSubRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
  },
  trailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginRight: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.ALERT,
  },
});
