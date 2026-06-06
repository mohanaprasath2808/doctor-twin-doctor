import React, { useMemo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import TickIcon from "../../../../assets/icon/tickIcon.svg";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const CHART_POINT_COUNT = 3;
const CHART_INITIAL_SPACING = 0;
const CHART_END_SPACING = 0;
const CHART_PARENT_WIDTH = Dimensions.get("window").width - 60;
const ALERT_GOLD = COLORS.ESCALATION_DARK;
const ALERT_GOLD_FILL = "#FFF4D6";
const ALERT_BLUE = "#3B6BB0";
const ALERT_BLUE_FILL = "#C8DBF5";

type ProviderRow = {
  id: string;
  name: string;
  amount?: string;
  trailing: string;
};

const PROVIDER_ROWS: ProviderRow[] = [
  { id: "1", name: "Auma Recirion", amount: "$21,000", trailing: "$83 ad" },
  { id: "2", name: "Large Paid Encounters", trailing: "$83 ad" },
  { id: "3", name: "CPT Codes", trailing: "$83 ad" },
  { id: "4", name: "CPT Codes", amount: "$21,000", trailing: "$83 ad" },
];

const GOLD_SERIES = [28, 48, 32];
const BLUE_SERIES = [12, 22, 42];

function ProviderTableRow({ row }: { row: ProviderRow }) {
  return (
    <View style={styles.tableRow}>
      <View style={styles.colName}>
        <Text style={styles.tableName} numberOfLines={1}>
          {row.name}
        </Text>
      </View>
      <View style={styles.colAmount}>
        {row.amount ? (
          <Text style={styles.tableAmount} numberOfLines={1}>
            {row.amount}
          </Text>
        ) : null}
      </View>
      <View style={styles.colTrailing}>
        <Text style={styles.tableTrailing} numberOfLines={1}>
          {row.trailing}
        </Text>
      </View>
    </View>
  );
}

const ChargesMonthToDate = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [chartWidth, setChartWidth] = useState(CHART_PARENT_WIDTH);

  const goldChartData = useMemo(
    () => [
      { value: GOLD_SERIES[0], label: "Clog" },
      { value: GOLD_SERIES[1], label: "" },
      { value: GOLD_SERIES[2], label: "Coupe" },
    ],
    [],
  );

  const blueChartData = useMemo(
    () => BLUE_SERIES.map((value) => ({ value })),
    [],
  );

  const lineSpacing = useMemo(() => {
    if (chartWidth <= 0 || CHART_POINT_COUNT < 2) return 1;
    return (
      (chartWidth - CHART_INITIAL_SPACING - CHART_END_SPACING) / (CHART_POINT_COUNT - 1)
    );
  }, [chartWidth]);

  const plotWidth =
    CHART_INITIAL_SPACING + lineSpacing * (CHART_POINT_COUNT - 1) + CHART_END_SPACING;

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
          <Text style={styles.headerTitle}>Charges Month to Date</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.providerInner} borderRadius={14}>
          <View style={styles.providerHeader}>
            <Text style={styles.sectionTitle}>Charges by Provider</Text>
            <Text style={styles.providerMeta}>SBT Encounters</Text>
          </View>
          <View style={styles.table}>
            {PROVIDER_ROWS.map((row, index) => (
              <View key={row.id}>
                <ProviderTableRow row={row} />
                {index < PROVIDER_ROWS.length - 1 ? <View style={styles.tableDivider} /> : null}
              </View>
            ))}
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.alertInner} borderRadius={14}>
          <View style={styles.alertHeader}>
            <Text style={styles.sectionTitle}>Missing Charge Alert</Text>
            <NeumorphicInnerShadowCard
              borderRadius={16}
              containerStyle={styles.reviewBadgeOuter}
              contentStyle={styles.reviewBadgeInner}
              darkShadowColor="#B8E6CF"
              lightShadowColor="#FFFFFF99"
            >
              <View style={styles.reviewBadgeRow}>
                <TickIcon width={12} height={12} color={COLORS.GREEN} />
                <Text style={styles.reviewBadgeText}>Review Encounter</Text>
              </View>
            </NeumorphicInnerShadowCard>
          </View>

          <View style={styles.alertStatsRow}>
            <Text style={styles.alertStat}>333,387 Days</Text>
            <Text style={styles.alertStat}>333,387 Days</Text>
          </View>

          <View
            style={styles.chartWrap}
            onLayout={(event) => {
              const measuredWidth = event.nativeEvent.layout.width;
              if (measuredWidth > 0 && Math.round(measuredWidth) !== Math.round(chartWidth)) {
                setChartWidth(measuredWidth);
              }
            }}
          >
            {chartWidth > 0 ? (
              <LineChart
                data={goldChartData}
                data2={blueChartData}
                width={plotWidth}
                parentWidth={chartWidth}
                height={140}
                areaChart
                areaChart2
                curved
                color={ALERT_GOLD}
                color2={ALERT_BLUE}
                thickness={2}
                thickness2={2}
                startFillColor={ALERT_GOLD_FILL}
                endFillColor={ALERT_GOLD_FILL}
                startFillColor2={ALERT_BLUE_FILL}
                endFillColor2={ALERT_BLUE_FILL}
                startOpacity={0.45}
                endOpacity={0.08}
                startOpacity2={0.4}
                endOpacity2={0.06}
                maxValue={55}
                noOfSections={2}
                spacing={lineSpacing}
                initialSpacing={CHART_INITIAL_SPACING}
                endSpacing={CHART_END_SPACING}
                yAxisLabelWidth={0}
                hideDataPoints
                disableScroll
                rulesLength={plotWidth}
                xAxisLength={plotWidth}
                rulesType="dashed"
                rulesColor={COLORS.TEXT_20}
                rulesThickness={1}
                dashWidth={6}
                dashGap={4}
                yAxisThickness={0}
                xAxisThickness={0}
                hideYAxisText
                xAxisLabelsHeight={22}
                xAxisLabelTextStyle={styles.chartLabel}
                isAnimated={false}
              />
            ) : null}
          </View>
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            text="Send To"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.SEND_OPTIONS)}
          />
          <AppButton
            text="Generate Packet"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.PACKET_PREVIEW)}
          />
        </View>

        <ReusableButton
          title="Fix Root Charge"
          height={48}
          borderRadius={24}
          containerStyle={styles.fixBtn}
          onPress={() => navigation.navigate(navigationStrings.ENCOUNTER_CHARGE_EDITOR)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChargesMonthToDate;

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
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  providerInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  providerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  providerMeta: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 8,
  },
  colName: {
    flex: 1.2,
    minWidth: 0,
  },
  colAmount: {
    flex: 0.9,
    minWidth: 0,
    alignItems: "flex-end",
  },
  colTrailing: {
    flex: 0.7,
    minWidth: 0,
    alignItems: "flex-end",
  },
  tableName: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  tableAmount: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  tableTrailing: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  tableDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  alertInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  reviewBadgeOuter: {
    flexShrink: 1,
    maxWidth: "52%",
  },
  reviewBadgeInner: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  reviewBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reviewBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.GREEN,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  alertStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  alertStat: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  chartWrap: {
    marginTop: 4,
    width: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  chartLabel: {
    fontSize: 11,
    color: COLORS.TEXT_50,
    fontFamily: "SF-Pro-Text-Medium",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
  fixBtn: {
    marginTop: 12,
    width: "100%",
  },
});
