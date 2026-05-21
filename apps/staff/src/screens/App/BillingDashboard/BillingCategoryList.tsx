import React, { useMemo, useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import FilterChip from "../../../components/Common/FilterChip";
import IconComponent from "../../../components/neomorphism/IconComponent";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import type { BillingItem, BillingStatus } from "../../utills/billingStatus";
import { BILLING_CATEGORY_SCREEN_TITLE, type BillingCategoryKey } from "./billingCategoryTypes";
import BillingDashboardItemCard from "./components/BillingDashboardItemCard";

const BG = COLORS.INNER_SURFACE;

const FILTER_CHIPS: { id: BillingListFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pendingReview", label: "Pending Review" },
  { id: "resolved", label: "Resolved" },
  { id: "waiting", label: "Waiting" },
];

type BillingListFilter = "all" | "pendingReview" | "resolved" | "waiting";

const PENDING_REVIEW_STATUSES: BillingStatus[] = ["Pending", "New", "Escalated"];
const RESOLVED_STATUSES: BillingStatus[] = ["Resolved", "Closed"];
const WAITING_STATUSES: BillingStatus[] = ["Waiting for insurance", "Waiting for patient"];

function itemMatchesFilter(item: BillingItem, filter: BillingListFilter): boolean {
  if (filter === "all") return true;
  if (filter === "pendingReview") return PENDING_REVIEW_STATUSES.includes(item.status);
  if (filter === "resolved") return RESOLVED_STATUSES.includes(item.status);
  if (filter === "waiting") return WAITING_STATUSES.includes(item.status);
  return true;
}

const MOCK_BY_CATEGORY: Record<BillingCategoryKey, BillingItem[]> = {
  "claim-issue": [
    {
      id: "ci-1",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Pending",
      issue: "Prior auth issue",
    },
    {
      id: "ci-2",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Pending",
      issue: "Invalid insurance",
    },
    {
      id: "ci-3",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Resolved",
      issue: "Claim coding corrected",
    },
    {
      id: "ci-4",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Waiting for insurance",
      issue: "Appeal in progress",
    },
  ],
  "patient-billing": [
    {
      id: "pb-1",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Pending",
      issue: "Refund request",
    },
    {
      id: "pb-2",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Pending",
      issue: "Copay",
      assigneeName: "Brian Carter",
    },
    {
      id: "pb-3",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Resolved",
      issue: "Balance verified",
    },
    {
      id: "pb-4",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Waiting for patient",
      issue: "Patient statement sent",
    },
  ],
  "coding-question": [
    {
      id: "cq-1",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Pending",
      issue: "Missing documentation for E/M level",
    },
    {
      id: "cq-2",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "New",
      issue: "Modifier 59 usage",
    },
    {
      id: "cq-3",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Resolved",
      issue: "ICD-10 clarified with payer",
    },
    {
      id: "cq-4",
      patientName: "Brian Carter",
      patientMeta: "Female • Age 45",
      payerName: "Blue Cross Blue",
      memberId: "BHHGJSJ9833",
      status: "Waiting for insurance",
      issue: "Coding follow-up with insurer",
    },
  ],
};

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.BILLING_CATEGORY_LIST>;

const BillingCategoryList = ({ route, navigation }: Props) => {
  const { categoryKey } = route.params;
  const [filter, setFilter] = useState<BillingListFilter>("all");

  const sourceItems = MOCK_BY_CATEGORY[categoryKey] ?? MOCK_BY_CATEGORY["claim-issue"];
  const filteredItems = useMemo(
    () => sourceItems.filter((item) => itemMatchesFilter(item, filter)),
    [sourceItems, filter],
  );

  const screenTitle = BILLING_CATEGORY_SCREEN_TITLE[categoryKey] ?? "Billing";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{screenTitle}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        horizontal
        style={styles.chipsRowContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
        keyboardShouldPersistTaps="handled"
      >
        {FILTER_CHIPS.map((chip) => (
          <FilterChip
            key={chip.id}
            title={chip.label}
            selected={filter === chip.id}
            onPress={() => setFilter(chip.id)}
            height={36}
            borderRadius={18}
            style={styles.chipSpacing}
          />
        ))}
      </ScrollView>

      <FlatList
        style={styles.list}
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <BillingDashboardItemCard
            item={item}
            outerStyle={index === 0 ? styles.firstCard : undefined}
            onPress={() => navigation.navigate(navigationStrings.BILLING_DETAIL, { item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items match this filter.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default BillingCategoryList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  list: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 12,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  chipsRowContainer: {
    flexGrow: 0,
    paddingBottom: 10,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  chipSpacing: {
    marginRight: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 4,
    flexGrow: 1,
  },
  firstCard: {
    marginTop: 0,
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontFamily: "SF-Pro-Display-Regular",
  },
});
