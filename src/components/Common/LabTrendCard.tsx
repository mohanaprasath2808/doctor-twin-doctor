import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { COLORS } from "../../constants/theme";
import NeumorphicCard from "./NeumorphicCard";

type LabTrendCardProps = {
  label: string;
  value: string;
  points: number[];
  lineColor: string;
  fillColor: string;
  outerStyle?: StyleProp<ViewStyle>;
};

const LabTrendCard: React.FC<LabTrendCardProps> = ({
  label,
  value,
  points,
  lineColor,
  fillColor,
  outerStyle,
}) => {
  const chartData = points.map((point) => ({ value: point }));

  return (
    <NeumorphicCard
      outerStyle={outerStyle}
      innerStyle={styles.inner}
      borderRadius={8}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={styles.chartWrap}>
        <LineChart
          data={chartData}
          areaChart
          startFillColor={fillColor}
          endFillColor={fillColor}
          startOpacity={0.4}
          endOpacity={0.05}
          color={lineColor}
          thickness={1.8}
          hideDataPoints
          hideYAxisText
          hideAxesAndRules
          disableScroll
          adjustToWidth
          isAnimated={false}
          spacing={10}
          initialSpacing={0}
          endSpacing={0}
        />
      </View>
    </NeumorphicCard>
  );
};

const styles = StyleSheet.create({
  inner: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 7,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: COLORS.TEXT_DARK,
    fontSize: 12,
    fontWeight: "500",
  },
  value: {
    color: COLORS.TEXT_DARK,
    fontSize: 12,
    fontWeight: "500",
  },
  chartWrap: {
    marginTop: 6,
    height: 32,
  },
});

export default LabTrendCard;
