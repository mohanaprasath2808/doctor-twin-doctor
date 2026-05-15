import React, { useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import {
  HEALTH_JOURNAL_TREND_MONTH_LABELS,
  HealthJournalTrendsConfig,
} from "../types/healthJournalTrendsConfig";

type HealthJournalTrendsChartProps = {
  chartLines: HealthJournalTrendsConfig["chartLines"];
  legend: HealthJournalTrendsConfig["legend"];
};

const POINT_COUNT = HEALTH_JOURNAL_TREND_MONTH_LABELS.length;
const CHART_PLOT_HEIGHT = 158;
const X_AXIS_LABELS_HEIGHT = 30;
/** Y-axis + inner card clip — keep plot inside NeumorphicCard bounds */
const Y_AXIS_LABEL_WIDTH = 28;
const INITIAL_SPACING = 0;
/** Extra room so rotated "Nov"/"Dec" are not clipped by card overflow */
const END_SPACING = 0;
const RIGHT_LABEL_INSET = 0;

const toChartPoints = (values: number[], withMonthLabels = false) =>
  values.map((value, index) => ({
    value,
    ...(withMonthLabels ? { label: HEALTH_JOURNAL_TREND_MONTH_LABELS[index] } : {}),
  }));

const HealthJournalTrendsChart: React.FC<HealthJournalTrendsChartProps> = ({
  chartLines,
  legend,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== containerWidth) {
      setContainerWidth(nextWidth);
    }
  };

  /** Width gifted-charts uses to compute point spacing (must fit inside card). */
  const parentWidth = useMemo(() => {
    if (containerWidth <= 0) return 0;
    return Math.max(260, containerWidth - RIGHT_LABEL_INSET);
  }, [containerWidth]);

  const dataSet = useMemo(
    () => [
      {
        data: toChartPoints(chartLines.normal, true),
        color: legend.find((l) => l.key === "normal")?.color ?? "#10B981",
        thickness: 2,
        hideDataPoints: true,
        curved: true,
      },
      {
        data: toChartPoints(chartLines.elevated),
        color: legend.find((l) => l.key === "elevated")?.color ?? "#EEB621",
        thickness: 2,
        hideDataPoints: true,
        curved: true,
      },
      {
        data: toChartPoints(chartLines.high),
        color: legend.find((l) => l.key === "high")?.color ?? "#FF6B6B",
        thickness: 2,
        hideDataPoints: true,
        curved: true,
      },
    ],
    [chartLines, legend],
  );

  return (
    <View style={styles.wrap} onLayout={onLayout}>
      {parentWidth > 0 ? (
        <View style={styles.chartArea}>
          <LineChart
            dataSet={dataSet}
            parentWidth={parentWidth}
            adjustToWidth
            // height={CHART_PLOT_HEIGHT}
            maxValue={40}
            noOfSections={5}
            stepValue={12}
            rulesType="dashed"
            rulesColor="#D5D5D5"
            rulesThickness={1}
            dashWidth={6}
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisLabelWidth={Y_AXIS_LABEL_WIDTH}
            xAxisLabelTextStyle={styles.xAxisLabel}
            xAxisLabelsHeight={X_AXIS_LABELS_HEIGHT}
            labelsExtraHeight={4}
            rotateLabel
            yAxisTextStyle={styles.yAxisLabel}
            initialSpacing={INITIAL_SPACING}
            endSpacing={END_SPACING}
            isAnimated={true}
            curved
          />
        </View>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    alignSelf: "stretch",
  },
  placeholder: {
    width: "100%",
    height: CHART_PLOT_HEIGHT + X_AXIS_LABELS_HEIGHT,
  },
  chartArea: {
    width: "100%",
    minHeight: CHART_PLOT_HEIGHT + X_AXIS_LABELS_HEIGHT,
    paddingRight: 4,
    overflow: "hidden",
  },
  xAxisLabel: {
    fontSize: 7,
    color: "#959595",
    fontWeight: "500",
  },
  yAxisLabel: {
    fontSize: 10,
    color: "#959595",
    fontWeight: "500",
  },
});

export default HealthJournalTrendsChart;
