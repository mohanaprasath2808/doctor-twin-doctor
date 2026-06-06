import React, { useMemo, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import DenialDateRangeBottomSheetModal from "../../../../components/BottomSheets/DenialDateRangeBottomSheetModal";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import StatusDot from "../../../../components/Common/StatusDot";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import DenialReasonProgressItem from "./components/DenialReasonProgressItem";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const DENIAL_TREND_VALUES = [12, 18, 15, 22, 20, 28, 22, 30, 26, 32, 28, 24];

const TOP_DENIAL_REASONS = [
  { id: "medical", label: "Medical Necessity", valueLabel: "50k", progress: 1 },
  { id: "auth", label: "Authorization Missin", valueLabel: "40k", progress: 0.8 },
  { id: "cpt", label: "CPT Mismatch", valueLabel: "30k", progress: 0.6 },
  { id: "duplicate", label: "Duplicate Claim", valueLabel: "20k", progress: 0.4 },
  { id: "docs", label: "Documentation Missing", valueLabel: "10k", progress: 0.2 },
];

const PAYER_BREAKDOWN = [
  { id: "humana", label: "Humana", color: "#F5C842", value: 35 },
  { id: "aetna", label: "Aetna", color: "#8B5CF6", value: 25 },
  { id: "bluecross", label: "BlueCross", color: "#4A90E2", value: 18 },
  { id: "medicare", label: "Medicare", color: "#2DD4BF", value: 12 },
  { id: "others", label: "Others", color: "#F472B6", value: 10 },
];

const CHART_MAX = 40;
const CHART_SECTIONS = 4;
const Y_AXIS_LABELS = ["0", "10", "20", "30", "40"];
const LINE_SPACING = 28;
const CHART_Y_AXIS_WIDTH = 36;

const axisTextStyle = {
  fontSize: 10,
  color: COLORS.TEXT_50,
  fontFamily: "SF-Pro-Text-Medium",
};

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

function JulyTooltip() {
  return (
    <View style={styles.julyTooltip}>
      <Text style={styles.julyTooltipText}>22</Text>
    </View>
  );
}

const DenialReasonsStatistics = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const dateRangeSheetRef = useRef<BottomSheetModal>(null);
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const lineChartData = useMemo(
    () =>
      MONTHS.map((month, index) => ({
        value: DENIAL_TREND_VALUES[index],
        label: month,
        ...(month === "Jul"
          ? {
              customDataPoint: () => <JulyTooltip />,
            }
          : {}),
      })),
    [],
  );

  const pieChartData = useMemo(
    () =>
      PAYER_BREAKDOWN.map((item) => ({
        value: item.value,
        color: item.color,
      })),
    [],
  );

  const lineChartWidth = MONTHS.length * LINE_SPACING + CHART_Y_AXIS_WIDTH;

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
          <Text style={styles.headerTitle}>Denial Reasons Statistics</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.summaryRow}>
          <SummaryMetric value="125" label="Total Denied Claims" />
          <SummaryMetric value="13%" label="Denial Rate" />
        </View>

        <Text style={styles.fieldLabel}>Date Range</Text>
        <Pressable onPress={() => dateRangeSheetRef.current?.present()}>
          <View pointerEvents="none">
            <InputField
              placeholder="Select date range"
              value={dateRange}
              editable={false}
              rightIcon={<DownArrowIcon width={12} height={12} />}
              containerStyle={styles.inputNoTopSpace}
              minHeight={46}
              borderRadius={12}
            />
          </View>
        </Pressable>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Top Denial Reasons</Text>
          <View style={styles.reasonList}>
            {TOP_DENIAL_REASONS.map((item) => (
              <DenialReasonProgressItem
                key={item.id}
                label={item.label}
                valueLabel={item.valueLabel}
                progress={item.progress}
              />
            ))}
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Payer Breakdown</Text>
          <View style={styles.pieWrap}>
            <PieChart
              data={pieChartData}
              donut
              radius={92}
              innerRadius={58}
              innerCircleColor={COLORS.SURFACE}
              showText={false}
              focusOnPress={false}
              isAnimated={false}
            />
          </View>
          <View style={styles.legendGrid}>
            {PAYER_BREAKDOWN.map((item) => (
              <View key={item.id} style={styles.legendItem}>
                <StatusDot
                  color={item.color}
                  size={8}
                  outerGradientColors={[COLORS.LIGHT_SHADOW, COLORS.DARK_SHADOW]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Monthly Denial Trends</Text>
          <View style={styles.chartWrap}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={lineChartData}
                width={lineChartWidth}
                height={180}
                curved
                areaChart
                color="#3B6BB0"
                thickness={2}
                startFillColor="#C8DBF5"
                endFillColor="#C8DBF5"
                startOpacity={0.35}
                endOpacity={0.05}
                maxValue={CHART_MAX}
                noOfSections={CHART_SECTIONS}
                yAxisLabelTexts={Y_AXIS_LABELS}
                spacing={LINE_SPACING}
                initialSpacing={8}
                adjustToWidth={false}
                hideDataPoints={false}
                dataPointsRadius={0}
                rulesType="dashed"
                rulesColor={COLORS.TEXT_20}
                rulesThickness={1}
                dashWidth={6}
                dashGap={4}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={axisTextStyle}
                xAxisLabelTextStyle={axisTextStyle}
                isAnimated={false}
              />
            </ScrollView>
          </View>
        </NeumorphicCard>
      </ScrollView>

      <DenialDateRangeBottomSheetModal
        ref={dateRangeSheetRef}
        selectedValue={dateRange}
        onSelectDone={(value) => setDateRange(value)}
      />
    </SafeAreaView>
  );
};

export default DenialReasonsStatistics;

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
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
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
    textAlign: "center",
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: -6,
  },
  inputNoTopSpace: {
    marginTop: 0,
    width: "100%",
  },
  cardOuter: {
    width: "100%",
  },
  sectionInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  reasonList: {
    gap: 14,
  },
  pieWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    rowGap: 10,
    justifyContent: "center",
    paddingTop: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: "42%",
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  chartWrap: {
    marginTop: 4,
    overflow: "hidden",
  },
  julyTooltip: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  julyTooltipText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.SURFACE,
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
