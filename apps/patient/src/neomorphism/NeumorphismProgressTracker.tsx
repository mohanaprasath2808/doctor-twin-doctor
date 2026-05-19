import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";

import InnerShadowIcon from "./InnerShadowIcon";
import { COLORS } from "../constants/theme";
import { TEXT } from "../constants/typography";
import SelectedIcon from "../assets/icons/selectedIcon.svg";

export type ProgressTrackerStep = {
  id: string;
  label: string;
  completed: boolean;
  dateLabel?: string;
};

const NODE = 30;
const TEAL = COLORS.PRIMARY;
const INDICATOR_COLUMN_WIDTH = NODE;
const LABELS_CONTAINER_PADDING_H = 8;

export const MOCK_REFERRAL_PROGRESS_STEPS: ProgressTrackerStep[] = [
  { id: "requested", label: "Requested", completed: true, dateLabel: "24 March 2026" },
  { id: "insurance", label: "Insurance Review", completed: true, dateLabel: "25 March 2026" },
  { id: "approved", label: "Approved", completed: true, dateLabel: "26 March 2026" },
  { id: "scheduled", label: "Specialist Scheduled", completed: true, dateLabel: "27 March 2026" },
  { id: "report", label: "Report Received", completed: false },
];

function currentPositionFromSteps(steps: ProgressTrackerStep[]): number {
  const firstOpen = steps.findIndex((s) => !s.completed);
  return firstOpen === -1 ? steps.length - 1 : firstOpen;
}

const TRACK_STYLES = {
  stepIndicatorSize: NODE,
  currentStepIndicatorSize: NODE,
  separatorStrokeWidth: 2,
  separatorStrokeFinishedWidth: 2,
  separatorStrokeUnfinishedWidth: 2,
  stepStrokeWidth: 0,
  currentStepStrokeWidth: 0,
  stepStrokeFinishedColor: "transparent",
  stepStrokeUnFinishedColor: "transparent",
  stepStrokeCurrentColor: "transparent",
  separatorFinishedColor: TEAL,
  separatorUnFinishedColor: COLORS.TEXT_PRIMARY_10,
  stepIndicatorFinishedColor: "transparent",
  stepIndicatorUnFinishedColor: "transparent",
  stepIndicatorCurrentColor: "transparent",
  stepIndicatorLabelFinishedColor: COLORS.WHITE,
  stepIndicatorLabelUnFinishedColor: "transparent",
  stepIndicatorLabelCurrentColor: "transparent",
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  /** Left-align label cells so shrink-wrapped rows are not centered in a wide column. */
  labelAlign: "flex-start" as const,
  labelColor: COLORS.TEXT_PRIMARY,
  labelSize: 14,
  currentStepLabelColor: COLORS.TEXT_PRIMARY,
};

type NeumorphismProgressTrackerProps = {
  steps?: ProgressTrackerStep[];
};

const NeumorphismProgressTracker: React.FC<NeumorphismProgressTrackerProps> = ({
  steps = MOCK_REFERRAL_PROGRESS_STEPS,
}) => {
  const [maxLabelWidth, setMaxLabelWidth] = useState<number | undefined>(undefined);

  const labels = useMemo(() => steps.map((s) => s.label), [steps]);
  const currentPosition = useMemo(() => currentPositionFromSteps(steps), [steps]);
  const stepCount = steps.length;

  const handleRootLayout = useCallback((event: LayoutChangeEvent) => {
    const totalWidth = event.nativeEvent.layout.width;
    const available =
      totalWidth - INDICATOR_COLUMN_WIDTH - LABELS_CONTAINER_PADDING_H;
    setMaxLabelWidth(available > 0 ? available : undefined);
  }, []);

  const renderStepIndicator = ({ position }: { position: number }) => {
    const completed = Boolean(steps[position]?.completed);

    if (completed) {
      return <SelectedIcon width={NODE} height={NODE} />;
    }

    return (
      <View style={styles.pendingWrap}>
        <InnerShadowIcon
          icon={<View style={styles.pendingIconHole} />}
          size={NODE}
          radius={NODE / 2}
          surfaceColor={COLORS.INNER_SURFACE}
        />
      </View>
    );
  };

  const renderLabel = ({
    position,
    label,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    const row = steps[position];
    const showDate = Boolean(row?.completed && row.dateLabel?.trim());

    return (
      <View
        style={[
          styles.labelRowOuter,
          // maxLabelWidth != null ? { maxWidth: maxLabelWidth } : null,
        ]}
      >
        <View style={styles.labelRow}>
          <Text style={styles.labelText} numberOfLines={2} ellipsizeMode="tail">
            {label}
          </Text>
          {showDate ? (
            <Text style={styles.dateText} allowFontScaling={false} numberOfLines={1}>
              {row!.dateLabel}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root} onLayout={handleRootLayout}>
      <StepIndicator
        direction="vertical"
        customStyles={TRACK_STYLES}
        currentPosition={currentPosition}
        stepCount={stepCount}
        labels={labels}
        renderStepIndicator={renderStepIndicator}
        renderLabel={renderLabel}
      />
    </View>
  );
};

export default NeumorphismProgressTracker;

const styles = StyleSheet.create({
  root: {
    marginTop: 14,
    width: "100%",
    alignSelf: "stretch",
    overflow: "visible",
  },
  pendingWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  pendingIconHole: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  /** Shrink-wrap to label + date content; capped by maxWidth so rows do not overflow the card. */
  labelRowOuter: {
    alignSelf: "flex-start",
    paddingVertical: 14,
    width: "100%",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "100%",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.TEXT_PRIMARY_10,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  labelText: {
    ...TEXT.body,
    lineHeight: 20,
    color: COLORS.TEXT_PRIMARY,
  },
  dateText: {
    ...TEXT.caption,
    lineHeight: 16,
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "right",
  },
});
