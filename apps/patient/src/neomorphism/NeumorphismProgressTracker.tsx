import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";

import InnerShadowIcon from "./InnerShadowIcon";
import { COLORS } from "../constants/theme";

import TickIcon from "../assets/icons/tick.svg";

export type ProgressTrackerStep = {
  id: string;
  label: string;
  completed: boolean;
  dateLabel?: string;
};

const NODE = 28;
const TEAL = COLORS.PRIMARY;

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
  /** `stretch` so each label row uses full labels-column width — avoids clipping dates (`flex-start` shrinks cells to content width). */
  labelAlign: "stretch" as const,
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
  const labels = useMemo(() => steps.map((s) => s.label), [steps]);
  const currentPosition = useMemo(() => currentPositionFromSteps(steps), [steps]);
  const stepCount = steps.length;

  const renderStepIndicator = ({ position }: { position: number; stepStatus: string }) => {
    const completed = Boolean(steps[position]?.completed);

    if (completed) {
      return (
        <View style={styles.tickWrap}>
          <View style={styles.doneNode}>
            <TickIcon width={13} height={11} />
          </View>
        </View>
      );
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
      /** `StepIndicator` wraps each label in a cell with `alignItems: 'center'`, which shrinks width — stretch fills the labels column so dates are not clipped. */
      <View style={styles.labelRowOuter}>
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
    <View style={styles.root}>
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
    minWidth: 0,
    flexShrink: 1,
  },
  tickWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  doneNode: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    backgroundColor: TEAL,
    justifyContent: "center",
    alignItems: "center",
  },
  pendingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  /** Invisible filler — recessed look comes from InnerShadowIcon. */
  pendingIconHole: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  labelRowOuter: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    minWidth: 0,
    justifyContent: "center",
    paddingVertical: 18,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    minWidth: 0,
  },
  labelText: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  dateText: {
    flexShrink: 0,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
    textAlign: "right",
  },
});
