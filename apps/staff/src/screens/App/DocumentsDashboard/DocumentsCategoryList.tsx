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
import type { DocumentsDashboardListItemData, DocumentFlowFilter } from "./types/documentDashboardTypes";
import {
  DOCUMENTS_CATEGORY_SCREEN_TITLE,
  type DocumentsCategoryKey,
} from "./types/documentsCategoryTypes";
import DocumentsDashboardListItem from "./components/DocumentsDashboardListItem";

const BG = COLORS.INNER_SURFACE;

type DocumentListFilter = "all" | DocumentFlowFilter;

const FILTER_CHIPS: { id: DocumentListFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
  { id: "uploaded", label: "Uploaded" },
];

function itemMatchesFilter(item: DocumentsDashboardListItemData, filter: DocumentListFilter): boolean {
  if (filter === "all") return true;
  return item.documentFlow === filter;
}

const basePatient = {
  patientName: "Brian Carter",
  patientMeta: "Female • Age 45",
} as const;

const MOCK_BY_CATEGORY: Record<DocumentsCategoryKey, DocumentsDashboardListItemData[]> = {
  "forms-needed": [
    {
      id: "fn-1",
      documentTitle: "Survey Consent",
      dueLabel: "Due on 21 Apr 2026",
      statusLabel: "Pending",
      documentFlow: "pending",
      ...basePatient,
    },
    {
      id: "fn-2",
      documentTitle: "Survey Consent",
      dueLabel: "Due on 21 Apr 2026",
      statusLabel: "Pending",
      documentFlow: "pending",
      ...basePatient,
    },
    {
      id: "fn-3",
      documentTitle: "HIPAA acknowledgment",
      dueLabel: "Due on 28 Apr 2026",
      statusLabel: "Completed",
      documentFlow: "completed",
      ...basePatient,
    },
    {
      id: "fn-4",
      documentTitle: "Financial agreement",
      dueLabel: "Uploaded 18 Apr 2026",
      statusLabel: "Uploaded",
      documentFlow: "uploaded",
      ...basePatient,
    },
  ],
  consents: [
    {
      id: "co-1",
      documentTitle: "Survey Consent",
      dueLabel: "Due on 21 Apr 2026",
      statusLabel: "Pending",
      documentFlow: "pending",
      ...basePatient,
    },
    {
      id: "co-2",
      documentTitle: "Procedure consent",
      dueLabel: "Due on 22 Apr 2026",
      statusLabel: "Pending",
      documentFlow: "pending",
      ...basePatient,
    },
    {
      id: "co-3",
      documentTitle: "Telehealth consent",
      dueLabel: "Signed 15 Apr 2026",
      statusLabel: "Completed",
      documentFlow: "completed",
      ...basePatient,
    },
    {
      id: "co-4",
      documentTitle: "Research opt-in",
      dueLabel: "Uploaded 10 Apr 2026",
      statusLabel: "Uploaded",
      documentFlow: "uploaded",
      ...basePatient,
    },
  ],
  "missing-records": [
    {
      id: "mr-1",
      documentTitle: "Survey Consent",
      dueLabel: "Due on 21 Apr 2026",
      statusLabel: "Pending",
      documentFlow: "pending",
      ...basePatient,
    },
    {
      id: "mr-2",
      documentTitle: "Lab results — CBC",
      dueLabel: "Due on 20 Apr 2026",
      statusLabel: "Pending",
      documentFlow: "pending",
      ...basePatient,
    },
    {
      id: "mr-3",
      documentTitle: "Imaging report",
      dueLabel: "Received 12 Apr 2026",
      statusLabel: "Completed",
      documentFlow: "completed",
      ...basePatient,
    },
    {
      id: "mr-4",
      documentTitle: "Prior chart notes",
      dueLabel: "Uploaded 8 Apr 2026",
      statusLabel: "Uploaded",
      documentFlow: "uploaded",
      ...basePatient,
    },
  ],
};

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_CATEGORY_LIST>;

const DocumentsCategoryList = ({ route, navigation }: Props) => {
  const { categoryKey } = route.params;
  const [filter, setFilter] = useState<DocumentListFilter>("all");

  const sourceItems = MOCK_BY_CATEGORY[categoryKey] ?? MOCK_BY_CATEGORY["forms-needed"];
  const filteredItems = useMemo(
    () => sourceItems.filter((item) => itemMatchesFilter(item, filter)),
    [sourceItems, filter],
  );

  const screenTitle = DOCUMENTS_CATEGORY_SCREEN_TITLE[categoryKey] ?? "Documents";

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
          <DocumentsDashboardListItem
            item={item}
            outerStyle={index === 0 ? styles.firstCard : undefined}
            onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_DETAIL, { item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No items match this filter.</Text>}
      />
    </SafeAreaView>
  );
};

export default DocumentsCategoryList;

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
    paddingVertical: 10,
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
