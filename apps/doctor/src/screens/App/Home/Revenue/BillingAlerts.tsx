import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import BillingAlertListItem, {
  type BillingAlertItem,
} from "./components/BillingAlertListItem";

const BILLING_ALERTS: BillingAlertItem[] = [
  {
    id: "high-ar",
    statusLabel: "High AR Account",
    badgeVariant: "error",
    primaryText: "John Miller",
    secondaryText: "$145",
    avatarSource: DoctorTempImage,
  },
  {
    id: "underpayment",
    statusLabel: "Underpayment Detected",
    badgeVariant: "warning",
    primaryText: "CLM-10425",
    secondaryText: "Shortfall: $80",
  },
  {
    id: "repeated-denial",
    statusLabel: "Repeated Payer Denial",
    badgeVariant: "error",
    primaryText: "Payer: Humana",
    secondaryText: "3 denials this month",
  },
  {
    id: "missing-docs",
    statusLabel: "Missing Documentation",
    badgeVariant: "warning",
    primaryText: "CLM-10431",
    secondaryText: "Visit note not attached",
  },
];

function SummaryMetric({ value, label }: { value: string; label: string }) {
  return (
    <NeumorphicCard outerStyle={styles.summaryCardOuter} innerStyle={styles.summaryCardInner} borderRadius={14}>
      <NeumorphicInnerShadowCard
        borderRadius={12}
        containerStyle={styles.summaryMetricOuter}
        contentStyle={styles.summaryMetricInner}
      >
        <Text style={styles.summaryValue}>{value}</Text>
        <Text style={styles.summaryLabel}>{label}</Text>
      </NeumorphicInnerShadowCard>
    </NeumorphicCard>
  );
}

const BillingAlerts = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Billing Alerts</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.summaryRow}>
          <SummaryMetric value="12" label="Total Alerts" />
          <SummaryMetric value="4" label="High Priority" />
        </View>

        <View style={styles.list}>
          {BILLING_ALERTS.map((item, index) => (
            <View key={item.id}>
              <BillingAlertListItem item={item} />
              {index < BILLING_ALERTS.length - 1 ? <View style={styles.separator} /> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingAlerts;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
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
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  summaryCardOuter: {
    flex: 1,
  },
  summaryCardInner: {
    padding: 10,
  },
  summaryMetricOuter: {
    width: "100%",
  },
  summaryMetricInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 4,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Bold",
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  list: {
    gap: 0,
  },
  separator: {
    height: 12,
  },
});
