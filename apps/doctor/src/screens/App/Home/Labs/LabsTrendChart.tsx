import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { COLORS } from "../../../../constants/theme";
import { getCurrentDayShort } from "../../../../constants/contant";

type LabsTrendChartProps = {
  title?: string;
  value?: string;
  points?: number[];
};

const DEFAULT_POINTS = [52, 56, 54, 60, 58, 62, 66, 61, 67, 64, 69, 74, 70, 78];

const LabsTrendChart: React.FC<LabsTrendChartProps> = ({
  title = "HbA1c",
  value = "9.2%",
  points = DEFAULT_POINTS,
}) => {
  const chartData = points.map((v) => ({ value: v }));
  const currentDay = getCurrentDayShort();
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.readingText}>
        {title} {value}
      </Text>
      {/* <View style={styles.dividerDashed} /> */}
      <View style={styles.chartWrap}>
        <LineChart
          data={chartData}
          areaChart
          color={COLORS.ALERT}
          thickness={2}
          startFillColor="#FBA9A9"
          endFillColor="#FBA9A9"
          startOpacity={0.18}
          endOpacity={0.03}
          hideDataPoints
          hideYAxisText
          yAxisThickness={0}
          xAxisThickness={0}
          rulesType="dashed"
          rulesColor="#D5D5D5"
          rulesThickness={1}
          dashWidth={8}
          noOfSections={3}
          disableScroll
          adjustToWidth
          spacing={24}
          initialSpacing={0}
          endSpacing={0}
          isAnimated={false}
        />
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.footerLabel}>{currentDay}</Text>
        <Text style={styles.footerLabel}>6.9</Text>
        <Text style={styles.footerLabel}>6.6</Text>
        <Text style={styles.footerLabel}>6 months ago</Text>
        <Text style={styles.footerLabel}>2.4</Text>
      </View>
    </View>
  );
};

export default LabsTrendChart;

const styles = StyleSheet.create({
  chartContainer: { marginTop: 10 },
  readingText: {
    marginTop: 10,
    fontSize: 18,
    color: COLORS.ALERT,
    fontWeight: "500",
    paddingBottom: 10,
  },
  dividerDashed: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D7DC",
  },
  chartWrap: { marginTop: 8, height: 170 },
  footerRow: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLabel: { fontSize: 11, color: COLORS.TEXT_50, fontWeight: "500" },
});
