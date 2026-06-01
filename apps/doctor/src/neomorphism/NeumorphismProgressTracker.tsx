import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import InnerShadowIcon from "./InnerShadowIcon";
import { COLORS } from "../constants/theme";
import SelectedIcon from "../assets/icon/selectedIcon.svg";

export type ProgressTrackerStep = {
  id: string;
  label: string;
  completed: boolean;
  dateLabel?: string;
  detailLabel?: string;
};

const NODE = 30;
const TEAL = COLORS.PRIMARY;
const INDICATOR_COLUMN_WIDTH = NODE;
const LABELS_CONTAINER_PADDING_H = 8;

export const MOCK_PA_PROGRESS_STEPS: ProgressTrackerStep[] = [
  {
    id: "submitted",
    label: "Submitted",
    completed: true,
    dateLabel: "Sarah Willems 06:40 PM",
  },
  {
    id: "pending",
    label: "Pending",
    completed: false,
    dateLabel: "Pending payes (chest pain)",
  },
  {
    id: "more-info",
    label: "More info Requested",
    completed: false,
    dateLabel: "Status calling approved (request 7 days)",
  },
  { id: "approved", label: "Approved", completed: false },
  { id: "appeal", label: "Appeal", completed: false },
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
  separatorUnFinishedColor: COLORS.TEXT_10,
  stepIndicatorFinishedColor: "transparent",
  stepIndicatorUnFinishedColor: "transparent",
  stepIndicatorCurrentColor: "transparent",
  stepIndicatorLabelFinishedColor: COLORS.WHITE,
  stepIndicatorLabelUnFinishedColor: "transparent",
  stepIndicatorLabelCurrentColor: "transparent",
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  labelAlign: "flex-start" as const,
  labelColor: COLORS.TEXT_DARK,
  labelSize: 14,
  currentStepLabelColor: COLORS.TEXT_DARK,
};

type NeumorphismProgressTrackerProps = {
  steps?: ProgressTrackerStep[];
};

const NeumorphismProgressTracker: React.FC<NeumorphismProgressTrackerProps> = ({
  steps = MOCK_PA_PROGRESS_STEPS,
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
          backgroundColor={COLORS.SURFACE}
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
    const dateText = row?.dateLabel ?? row?.detailLabel;
    const showDate = Boolean(row?.completed && dateText?.trim());

    return (
      <View
        style={[
          styles.labelRowOuter,
          maxLabelWidth != null ? { width: maxLabelWidth } : null,
        ]}
      >
        <View style={styles.labelRow}>
          <Text style={styles.labelText} numberOfLines={2} ellipsizeMode="tail">
            {label}
          </Text>
          {showDate ? (
            <Text style={styles.dateText} numberOfLines={1}>
              {dateText}
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
    borderColor: COLORS.TEXT_10,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  labelText: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: COLORS.TEXT_60,
    textAlign: "right",
    fontFamily: "SF-Pro-Display-Regular",
  },
});
