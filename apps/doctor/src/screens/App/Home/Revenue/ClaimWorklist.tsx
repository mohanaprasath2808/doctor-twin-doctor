import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import AppButton from "../../../../components/Common/AppButton";
import FilterChip from "../../../../components/Common/FilterChip";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ClaimWorklistListItem, {
  type ClaimWorklistItem,
} from "./components/ClaimWorklistListItem";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

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
    filterCategory: "denied",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    condition: "Hypertension",
    statusDetail: "Missing info 3 days ago",
    statusLabel: "Missing Data",
    statusBadgeVariant: "warning",
    useInnerShadowStatusBadge: false,
    filterCategory: "open",
    avatarSource: DoctorTempImage,
  },
  {
    id: "mike-thompson",
    name: "Mike Thompson",
    condition: "Type 2 Diabetes",
    statusDetail: "Coder review pending",
    statusLabel: "Coded Incorrectly",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
    filterCategory: "open",
    avatarSource: DoctorTempImage,
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
    avatarSource: DoctorTempImage,
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
    filterCategory: "open",
    avatarSource: DoctorTempImage,
  },
  {
    id: "david-park",
    name: "David Park",
    condition: "Back Pain",
    statusDetail: "Denied 4 days ago",
    statusLabel: "Denied",
    statusBadgeVariant: "error",
    useInnerShadowStatusBadge: true,
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
    filterCategory: "open",
    avatarSource: DoctorTempImage,
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
    filterCategory: "open",
    avatarSource: DoctorTempImage,
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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

        <View style={styles.list}>
          {filteredItems.map((item, index) => (
            <View key={item.id}>
              <ClaimWorklistListItem
                item={item}
                onPress={() => navigation.navigate(navigationStrings.ESCALATE_ISSUE)}
              />
              {index < filteredItems.length - 1 ? <View style={styles.separator} /> : null}
            </View>
          ))}
        </View>

        <AppButton
          text="Escalate"
          borderWidth={1}
          borderColor={COLORS.ALERT}
          bgColor={COLORS.SURFACE}
          textStyle={styles.escalateText}
          style={styles.escalateBtn}
          onPress={() => navigation.navigate(navigationStrings.ESCALATE_ISSUE)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimWorklist;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginBottom: 12,
  },
  searchInput: {
    width: "100%",
    marginTop: 0,
  },
  filtersRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  list: {
    paddingTop: 4,
    marginBottom: 20,
  },
  separator: {
    height: 12,
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
