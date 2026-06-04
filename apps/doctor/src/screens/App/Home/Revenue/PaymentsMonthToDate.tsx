import React, { useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const PAYMENT_TREND_VALUES = [22, 28, 25, 32, 30, 38, 35, 42, 40, 45, 38, 33];

const COLLECTED_VALUES = [32, 28, 35, 30, 38, 42, 36, 40, 45, 38, 35, 33];
const EXPECTED_VALUES = [30, 26, 33, 28, 35, 38, 34, 37, 42, 36, 33, 31];

const Y_AXIS_LABELS = ["10k", "20k", "30k", "40k", "50k"];
const CHART_MAX = 50;
const CHART_SECTIONS = 4;

const LINE_COLOR = "#3B6BB0";
const LINE_FILL = "#C8DBF5";
const COLLECTED_BAR = COLORS.PRIMARY;
const EXPECTED_BAR = "#F5E6C8";

const CHART_Y_AXIS_WIDTH = 36;
const LINE_SPACING = 28;
const BAR_WIDTH = 12;
const BAR_PAIR_GAP = 4;
const BAR_GROUP_GAP = 16;

const axisTextStyle = {
  fontSize: 10,
  color: COLORS.TEXT_50,
  fontFamily: "SF-Pro-Text-Medium",
};

function buildGroupedBarData() {
  return MONTHS.flatMap((month, index) => [
    {
      value: COLLECTED_VALUES[index],
      label: month,
      frontColor: COLLECTED_BAR,
      spacing: BAR_PAIR_GAP,
      barWidth: BAR_WIDTH,
    },
    {
      value: EXPECTED_VALUES[index],
      frontColor: EXPECTED_BAR,
      spacing: index === MONTHS.length - 1 ? BAR_GROUP_GAP : BAR_GROUP_GAP,
      barWidth: BAR_WIDTH,
    },
  ]);
}

const PaymentsMonthToDate = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const lineChartData = useMemo(
    () =>
      PAYMENT_TREND_VALUES.map((value, index) => ({
        value,
        label: MONTHS[index],
      })),
    [],
  );

  const groupedBarData = useMemo(() => buildGroupedBarData(), []);

  const lineChartWidth = MONTHS.length * LINE_SPACING + CHART_Y_AXIS_WIDTH;

  const barChartWidth = MONTHS.length * (BAR_WIDTH * 2 + BAR_PAIR_GAP + BAR_GROUP_GAP) + CHART_Y_AXIS_WIDTH;

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
          <Text style={styles.headerTitle}>Payments Month to Date</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.summaryTotalOuter}
            contentStyle={styles.summaryTotalInner}
          >
            <Text style={styles.summaryTotalValue}>$33,722</Text>
            <Text style={styles.summaryTotalLabel}>Total Collected</Text>
          </NeumorphicInnerShadowCard>
          <View style={styles.summaryRow}>
            <NeumorphicInnerShadowCard
              borderRadius={12}
              containerStyle={styles.summaryMetricOuter}
              contentStyle={styles.summaryMetricInner}
            >
              <Text style={styles.summaryMetricValue}>$122</Text>
              <Text style={styles.summaryMetricLabel}>Expected</Text>
            </NeumorphicInnerShadowCard>
            <NeumorphicInnerShadowCard
              borderRadius={12}
              containerStyle={styles.summaryMetricOuter}
              contentStyle={styles.summaryMetricInner}
            >
              <Text style={styles.summaryMetricValue}>$217</Text>
              <Text style={styles.summaryMetricLabel}>Underpayment</Text>
            </NeumorphicInnerShadowCard>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Monthly Payment Trend</Text>
          <View style={styles.chartWrap}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <LineChart
                data={lineChartData}
                width={lineChartWidth}
                height={170}
                curved
                areaChart
                color={LINE_COLOR}
                thickness={2}
                startFillColor={LINE_FILL}
                endFillColor={LINE_FILL}
                startOpacity={0.35}
                endOpacity={0.05}
                maxValue={CHART_MAX}
                noOfSections={CHART_SECTIONS}
                yAxisLabelTexts={Y_AXIS_LABELS}
                spacing={LINE_SPACING}
                initialSpacing={8}
                adjustToWidth={false}
                hideDataPoints
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

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Collected vs. Expected</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLLECTED_BAR }]} />
              <Text style={styles.legendText}>Collected</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: EXPECTED_BAR }]} />
              <Text style={styles.legendText}>Expected</Text>
            </View>
          </View>
          <View style={styles.chartWrap}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <BarChart
                data={groupedBarData}
                width={barChartWidth}
                height={170}
                maxValue={CHART_MAX}
                noOfSections={CHART_SECTIONS}
                yAxisLabelTexts={Y_AXIS_LABELS}
                barBorderRadius={3}
                spacing={0}
                initialSpacing={8}
                // endSpacing={12}
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

        <View style={styles.actionsRow}>
          <AppButton
            text="Send to Insurance"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => { }}
          />
          <AppButton
            text="Flag Underpayment"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.CLAIM_CORRECTION)}
          />
        </View>

        <ReusableButton
          title="Reconcile"
          height={48}
          borderRadius={24}
          containerStyle={styles.reconcileBtn}
          onPress={() => navigation.navigate(navigationStrings.PAYMENT_RECONCILIATION)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentsMonthToDate;

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
  cardOuter: {
    width: "100%",
    marginBottom: 14,
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
    fontFamily: "SF-Pro-Display-Semibold",
  },
  summaryTotalOuter: {
    width: "100%",
  },
  summaryTotalInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  summaryTotalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  summaryTotalLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
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
  summaryMetricValue: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  summaryMetricLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
  },
  chartWrap: {
    marginTop: 2,
    overflow: "hidden",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
  },
  actionsRow: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
  reconcileBtn: {
    marginTop: 12,
    width: "100%",
  },
});
