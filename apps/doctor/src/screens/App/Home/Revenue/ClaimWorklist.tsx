import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../../components/Common/AppButton";
import FilterChip from "../../../../components/Common/FilterChip";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ClaimWorklistListItem, {
  type ClaimWorklistItem,
} from "./components/ClaimWorklistListItem";

type WorklistFilter = "all" | "open" | "denied";

const CLAIM_WORKLIST: ClaimWorklistItem[] = [
  {
    id: "john-miller",
    name: "John Miller",
    condition: "Major Depression",
    statusDetail: "Denied 5 days ago",
    statusLabel: "Denied",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
    actionLabel: "Ready to Send",
    avatarSource: DoctorTempImage,
    filterCategory: "denied",
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    condition: "Hypertension",
    statusDetail: "Missing info 3 days ago",
    statusLabel: "Missing Data",
    statusBadgeVariant: "warning",
    useInnerShadowStatusBadge: false,
    avatarSource: DoctorTempImage,
    filterCategory: "open",
  },
  {
    id: "mike-thompson",
    name: "Mike Thompson",
    condition: "Type 2 Diabetes",
    statusDetail: "Coder review pending",
    statusLabel: "Coded Incorrectly",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
    avatarSource: DoctorTempImage,
    filterCategory: "open",
  },
  {
    id: "emma-davis",
    name: "Emma Davis",
    condition: "Generalized Anxiety",
    statusDetail: "Overdue 2 days",
    statusLabel: "Overdue",
    statusBadgeVariant: "warning",
    useInnerShadowStatusBadge: false,
    actionLabel: "Ready to Send",
    initials: "ED",
    filterCategory: "open",
  },
  {
    id: "lisa-chen",
    name: "Lisa Chen",
    condition: "Migraine",
    statusDetail: "Corrected yesterday",
    statusLabel: "Corrected",
    statusBadgeVariant: "success",
    useInnerShadowStatusBadge: false,
    actionLabel: "Ready to Send",
    avatarSource: DoctorTempImage,
    filterCategory: "open",
  },
  {
    id: "david-park",
    name: "David Park",
    condition: "Back Pain",
    statusDetail: "Denied 4 days ago",
    statusLabel: "Denied",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
    avatarSource: DoctorTempImage,
    filterCategory: "denied",
  },
  {
    id: "anna-lopez",
    name: "Anna Lopez",
    condition: "Asthma",
    statusDetail: "Docs requested 1 day ago",
    statusLabel: "Missing Data",
    statusBadgeVariant: "warning",
    useInnerShadowStatusBadge: false,
    avatarSource: DoctorTempImage,
    filterCategory: "open",
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    condition: "COPD",
    statusDetail: "Denied 6 days ago",
    statusLabel: "Denied",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
    initials: "JW",
    filterCategory: "denied",
  },
  {
    id: "maria-garcia",
    name: "Maria Garcia",
    condition: "Insomnia",
    statusDetail: "Overdue 1 day",
    statusLabel: "Overdue",
    statusBadgeVariant: "warning",
    useInnerShadowStatusBadge: false,
    actionLabel: "Ready to Send",
    avatarSource: DoctorTempImage,
    filterCategory: "open",
  },
  {
    id: "robert-kim",
    name: "Robert Kim",
    condition: "GERD",
    statusDetail: "Coding issue flagged",
    statusLabel: "Coded Incorrectly",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
    avatarSource: DoctorTempImage,
    filterCategory: "open",
  },
];

const FILTER_COUNTS = {
  all: CLAIM_WORKLIST.length,
  open: CLAIM_WORKLIST.filter((item) => item.filterCategory === "open").length,
  denied: CLAIM_WORKLIST.filter((item) => item.filterCategory === "denied").length,
};

const ClaimWorklist = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<WorklistFilter>("all");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CLAIM_WORKLIST.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "open" && item.filterCategory === "open") ||
        (filter === "denied" && item.filterCategory === "denied");
      if (!matchesFilter) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query) ||
        item.statusLabel.toLowerCase().includes(query) ||
        item.statusDetail.toLowerCase().includes(query)
      );
    });
  }, [search, filter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Claim Worklist</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchWrap}>
        <InputField
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          leftIcon={<SearchIcon width={18} height={18} />}
          borderRadius={64}
          containerStyle={styles.searchInput}
        />
      </View>

      <View style={styles.filtersRow}>
        <FilterChip
          title={`All (${FILTER_COUNTS.all})`}
          selected={filter === "all"}
          onPress={() => setFilter("all")}
        />
        <FilterChip
          title={`Open (${FILTER_COUNTS.open})`}
          selected={filter === "open"}
          onPress={() => setFilter("open")}
        />
        <FilterChip
          title={`Denied (${FILTER_COUNTS.denied})`}
          selected={filter === "denied"}
          onPress={() => setFilter("denied")}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ClaimWorklistListItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPad + 88 }]}
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <AppButton
          text="Escalate"
          borderWidth={1}
          borderColor={COLORS.ALERT}
          bgColor={COLORS.SURFACE}
          textStyle={styles.escalateText}
          style={styles.escalateBtn}
          onPress={() => navigation.navigate(navigationStrings.ESCALATE_ISSUE)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ClaimWorklist;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  searchWrap: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    width: "100%",
    marginTop: 0,
  },
  filtersRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  separator: {
    height: 12,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  escalateBtn: {
    height: 52,
    borderRadius: 26,
    width: "100%",
  },
  escalateText: {
    color: COLORS.ALERT,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
