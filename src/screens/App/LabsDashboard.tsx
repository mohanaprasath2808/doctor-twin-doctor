import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import DeltaBadge from "../../components/Common/DeltaBadge";
import BackIcon from "../../assets/icon/backArrow.svg";
import navigationStrings from "../../constants/navigationStrings";

type FilterType = "abnormal" | "critical" | "overdue" | "all";

type LabPatient = {
  id: string;
  initials: string;
  name: string;
  meta: string;
  issue: string;
  time: string;
  type: Exclude<FilterType, "all">;
};

const FILTERS: Array<{ key: FilterType; title: string }> = [
  { key: "abnormal", title: "Abnormal (3)" },
  { key: "critical", title: "Critical (1)" },
  { key: "overdue", title: "Overdue (4)" },
  { key: "all", title: "All" },
];

const PATIENTS: LabPatient[] = [
  {
    id: "1",
    initials: "DJ",
    name: "David Johnson",
    meta: "Male • Age 41",
    issue: "High Cholestral",
    time: "29 mins ago",
    type: "abnormal",
  },
  {
    id: "2",
    initials: "DJ",
    name: "David Johnson",
    meta: "Male • Age 41",
    issue: "High Cholestral",
    time: "29 mins ago",
    type: "critical",
  },
  {
    id: "3",
    initials: "DJ",
    name: "David Johnson",
    meta: "Male • Age 41",
    issue: "High Cholestral",
    time: "29 mins ago",
    type: "overdue",
  },
  {
    id: "4",
    initials: "DJ",
    name: "David Johnson",
    meta: "Male • Age 41",
    issue: "High Cholestral",
    time: "29 mins ago",
    type: "abnormal",
  },
];

const LabsDashboard = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("abnormal");

  const filteredData =
    selectedFilter === "all"
      ? PATIENTS
      : PATIENTS.filter((item) => item.type === selectedFilter);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={16} height={16} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Labs Dashboard</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        horizontal
        style={styles.filterList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={styles.filterPress}
            activeOpacity={0.8}
            onPress={() => setSelectedFilter(filter.key)}
          >
            {selectedFilter === filter.key ? (
              <DeltaBadge
                icon={null}
                value={filter.title}
                height={40}
                bgColor="#CBF0FF"
                darkShadowColor="#C8CBCC"
                lightShadowColor="#FFFFFF99"
                textColor={COLORS.PRIMARY}
                textStyle={styles.selectedFilterText}
              />
            ) : (
              <NeumorphicCard
                outerStyle={styles.filterOuter}
                innerStyle={styles.filterInner}
                borderRadius={20}
              >
                <Text style={styles.filterText}>{filter.title}</Text>
              </NeumorphicCard>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredData}
        style={styles.patientList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate(navigationStrings.LAB_ALERT_DECISION)}
          >
            <NeumorphicCard
              outerStyle={styles.patientCardOuter}
              innerStyle={styles.patientCardInner}
              borderRadius={12}
            >
              <View style={styles.topRow}>
                <View style={styles.leftRow}>
                  <InnerShadowIcon
                    icon={<Text style={styles.initials}>{item.initials}</Text>}
                    size={40}
                  />
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.meta}>{item.meta}</Text>
                  </View>
                </View>
                <ReusableButton
                  title="Review"
                  width={94}
                  height={36}
                  borderRadius={18}
                  textStyle={styles.reviewText}
                  onPress={() =>
                    navigation.navigate(navigationStrings.LAB_ALERT_DECISION)
                  }
                />
              </View>

              <View style={styles.separator} />

              <View style={styles.bottomRow}>
                <Text style={styles.issueText}>{item.issue}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </NeumorphicCard>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default LabsDashboard;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 30 / 1.5,
    fontWeight: "600",
  },
  headerSpacer: { width: 40, height: 40 },
  filterList: { flexGrow: 0 },
  filterRow: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingRight: 24,
  },
  filterPress: { marginRight: 8 },
  selectedFilterText: { fontSize: 14, fontWeight: "500" },
  filterOuter: {},
  filterInner: {
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: { color: COLORS.TEXT_70, fontSize: 14, fontWeight: "500" },
  patientList: { flex: 1, backgroundColor: "transparent" },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 12,
  },
  patientCardOuter: { width: "100%" },
  patientCardInner: { borderRadius: 12, padding: 12 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  initials: { color: COLORS.PRIMARY, fontSize: 20 / 1.5, fontWeight: "500" },
  name: { color: COLORS.TEXT_DARK, fontSize: 24 / 1.5, fontWeight: "500" },
  meta: {
    marginTop: 2,
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
  },
  reviewText: { color: COLORS.WHITE, fontSize: 14, fontWeight: "500" },
  separator: { marginTop: 12, height: 1, backgroundColor: COLORS.TEXT_10 },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  issueText: { color: COLORS.TEXT_DARK, fontSize: 24 / 1.5, fontWeight: "500" },
  timeText: { color: COLORS.TEXT_50, fontSize: 13, fontWeight: "400" },
});
