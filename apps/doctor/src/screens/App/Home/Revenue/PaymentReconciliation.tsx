import React, { useMemo, useState } from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import FilterChip from "../../../../components/Common/FilterChip";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import PaymentReconciliationListItem, {
  type PaymentReconciliationItem,
} from "./components/PaymentReconciliationListItem";

type ReconciliationFilter = "all" | "matched" | "unmatched";

const RECONCILIATION_ITEMS: PaymentReconciliationItem[] = [
  {
    id: "1",
    name: "Sarah Williams",
    claimId: "CLM-10431",
    statusLabel: "Underpaid",
    badgeVariant: "error",
    payment: "$420",
    expected: "$500",
    difference: "-$80",
    differenceColor: COLORS.ALERT,
    avatarSource: DoctorTempImage,
    showActions: true,
    filterStatus: "unmatched",
  },
  {
    id: "2",
    name: "Sarah Williams",
    claimId: "CLM-10431",
    statusLabel: "Matched",
    badgeVariant: "success",
    payment: "$300",
    expected: "$300",
    difference: "$0",
    differenceColor: COLORS.TEXT_DARK,
    avatarSource: DoctorTempImage,
    showActions: false,
    filterStatus: "matched",
  },
];

function SummaryMetric({ value, label }: { value: string; label: string }) {
  return (
    <NeumorphicInnerShadowCard
      borderRadius={12}
      containerStyle={styles.summaryMetricOuter}
      contentStyle={styles.summaryMetricInner}
    >
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </NeumorphicInnerShadowCard>
  );
}

const PaymentReconciliation = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [filter, setFilter] = useState<ReconciliationFilter>("all");

  const filteredItems = useMemo(() => {
    if (filter === "all") return RECONCILIATION_ITEMS;
    return RECONCILIATION_ITEMS.filter((item) => item.filterStatus === filter);
  }, [filter]);

  const renderItem: ListRenderItem<PaymentReconciliationItem> = ({ item }) => (
    <PaymentReconciliationListItem
      item={item}
      onAdjust={() =>
        navigation.navigate(navigationStrings.ADJUST_PAYMENT, {
          claimId: item.id,
          amount: "$180",
        })
      }
      onMatch={() => { }}
    />
  );

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
          <Text style={styles.headerTitle}>Payment Reconciliation</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.summaryCardWrap}>
          <NeumorphicCard outerStyle={styles.summaryCardOuter} innerStyle={styles.summaryCardInner} borderRadius={14}>
            <View style={styles.summaryRow}>
              <SummaryMetric value="82" label="Total Claims" />
              <SummaryMetric value="82" label="Matched" />
            </View>
            <View style={styles.summaryRow}>
              <SummaryMetric value="12" label="Unmatched" />
              <SummaryMetric value="$2,800" label="Total Difference" />
            </View>
          </NeumorphicCard>

          <View style={styles.filtersRow}>
            <FilterChip title="All" selected={filter === "all"} onPress={() => setFilter("all")} />
            <FilterChip
              title="Matched"
              selected={filter === "matched"}
              onPress={() => setFilter("matched")}
            />
            <FilterChip
              title="Unmatched"
              selected={filter === "unmatched"}
              onPress={() => setFilter("unmatched")}
            />
          </View>
        </View>
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.listGap} />}
          style={styles.list}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentReconciliation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  summaryCardWrap: {
    paddingHorizontal: 16,
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
  summaryCardOuter: {
    width: "100%",
    marginBottom: 14,
  },
  summaryCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryMetricOuter: {
    flex: 1,
    minWidth: 0,
  },
  summaryMetricInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
  filtersRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  list: {
    width: "100%",
  },
  listGap: {
    height: 12,
  },
});
