import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Canvas, LinearGradient, RoundedRect, Shadow, vec } from "@shopify/react-native-skia";

import MicIcon from "../../assets/icon/micIcon.svg";
import { COLORS } from "../../constants/theme";

/** Center FAB size — matches design (80×80). */
export const QUEUE_MIC_SIZE = 80;

export const MIC_FLOW_SPACER_HEIGHT = QUEUE_MIC_SIZE - 50 + 4;

const MIC_RADIUS = QUEUE_MIC_SIZE / 2;

/** Same border ring as `ReusableButton` (single stroke thickness, vertical 4-stop gradient). */
const SHADOW_PADDING = 48;
const DEFAULT_BORDER_GRADIENT_COLORS = ["#D6E3F3", "#FFFFFF", "#FFFFFF", "#FFFFFF00"] as const;
const DEFAULT_BORDER_GRADIENT_POSITIONS = [0, 0.36, 0.58, 1] as const;

const FILL_GRADIENT_COLORS = ["#CFEFDC", "#429761"] as const;
const FILL_GRADIENT_POSITIONS = [0.125, 1] as const;

/** Match `ReusableButton` default border thickness (ring around the border `LinearGradient`). */
const BORDER_WIDTH = 1.5;

export const QueueMicButton: React.FC = () => {
  const width = QUEUE_MIC_SIZE;
  const height = QUEUE_MIC_SIZE;
  const numericWidth = width;
  const effectiveRadius = Math.min(MIC_RADIUS, height / 2);
  const bx = SHADOW_PADDING;
  const by = SHADOW_PADDING;
  const borderWidth = BORDER_WIDTH;
  const fx = bx + borderWidth;
  const fy = by + borderWidth;
  const fw = Math.max(0, numericWidth - 2 * borderWidth);
  const fh = Math.max(0, height - 2 * borderWidth);
  const fillRadius = Math.max(0, effectiveRadius - borderWidth);
  const fillBaseColor = FILL_GRADIENT_COLORS[1];
  const cx = bx + numericWidth / 2;
  const borderColors = [...DEFAULT_BORDER_GRADIENT_COLORS];

  return (
    <View
      style={[
        styles.micHost,
        {
          width: QUEUE_MIC_SIZE,
          height: QUEUE_MIC_SIZE,
          borderRadius: MIC_RADIUS,
        },
      ]}
    >
      <Canvas
        pointerEvents="none"
        style={[
          styles.canvas,
          {
            width: numericWidth + SHADOW_PADDING * 2,
            height: height + SHADOW_PADDING * 2,
            left: -SHADOW_PADDING,
            top: -SHADOW_PADDING,
          },
        ]}
      >
        {borderWidth > 0 && (
          <RoundedRect
            x={bx}
            y={by}
            width={numericWidth}
            height={height}
            r={effectiveRadius}
            color={borderColors[0] ?? "#D6E3F3"}
          >
            <LinearGradient
              start={vec(cx, by)}
              end={vec(cx, by + height)}
              colors={borderColors}
              positions={[...DEFAULT_BORDER_GRADIENT_POSITIONS]}
            />
          </RoundedRect>
        )}
        <RoundedRect x={fx} y={fy} width={fw} height={fh} r={fillRadius} color={fillBaseColor}>
          <LinearGradient
            start={vec(fx, fy)}
            end={vec(fx, fy + fh)}
            colors={[...FILL_GRADIENT_COLORS]}
            positions={[...FILL_GRADIENT_POSITIONS]}
          />
          <Shadow dx={1} dy={1} blur={2} color="rgba(114,142,171,0.1)" />
          <Shadow dx={-3} dy={-3} blur={10} color="rgba(255,255,255,0.9)" />
          <Shadow dx={2} dy={2} blur={10} color="rgba(101,179,130,0.6)" />
          <Shadow dx={2} dy={2} blur={7} color="#B5F4CC" inner />
        </RoundedRect>
      </Canvas>

      <View style={styles.iconSlot} pointerEvents="none">
        <MicIcon width={28} height={28} />
      </View>
    </View>
  );
};

type StaffMicBarButtonProps = {
  onMicPress?: () => void;
  onMicLongPress?: () => void;
};

/** Center column only: spacer + “Queue” label. Use with `StaffMicBarFabOverlay` so the card can stay overflow-clipped. */
export function StaffMicBarQueueColumn({ onMicPress, onMicLongPress }: StaffMicBarButtonProps) {
  return (
    <View style={styles.tabSlot}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Queue, Staff Command Center and voice"
        accessibilityHint="Opens Staff Command Center. Voice controls can be added here."
        onPress={() => onMicPress?.()}
        onLongPress={() => onMicLongPress?.()}
        style={styles.tabPress}
      >
        <View style={styles.micFlowSpacer} />
        <Text style={styles.queueLabel}>Queue</Text>
      </Pressable>
    </View>
  );
}

type StaffMicBarFabOverlayProps = StaffMicBarButtonProps & {
  /** Match `NeumorphicCard` inner `paddingTop` on the tab bar (keeps mic aligned with the in-card row). */
  innerPaddingTop?: number;
};

/**
 * Center mic only, absolutely stacked over the tab row. Mirrors `StaffMicBarButton` layout without clipping
 * the parent neumorphic border.
 */
export function StaffMicBarFabOverlay({
  onMicPress,
  onMicLongPress,
  innerPaddingTop = 10,
}: StaffMicBarFabOverlayProps) {
  return (
    <View style={[styles.micFabOverlay, { paddingTop: innerPaddingTop }]} pointerEvents="box-none">
      <View style={styles.micFabRow}>
        <View style={styles.micFabSide} pointerEvents="none" />
        <View style={styles.tabSlot}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Queue, Staff Command Center and voice"
            accessibilityHint="Opens Staff Command Center. Voice controls can be added here."
            onPress={() => onMicPress?.()}
            onLongPress={() => onMicLongPress?.()}
            style={styles.tabPress}
          >
            <View style={styles.micLift}>
              <QueueMicButton />
            </View>
          </Pressable>
        </View>
        <View style={styles.micFabSide} pointerEvents="none" />
      </View>
    </View>
  );
}

/** Center mic + “Queue” label (single in-flow block). Prefer `StaffMicBarQueueColumn` + `StaffMicBarFabOverlay` when the parent must clip neumorphic borders. */
export function StaffMicBarButton({ onMicPress, onMicLongPress }: StaffMicBarButtonProps) {
  return (
    <View style={styles.tabSlot}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Queue, Staff Command Center and voice"
        accessibilityHint="Opens Staff Command Center. Voice controls can be added here."
        onPress={() => onMicPress?.()}
        onLongPress={() => onMicLongPress?.()}
        style={styles.tabPress}
      >
        <View style={styles.micLift}>
          <QueueMicButton />
        </View>
        <Text style={styles.queueLabel}>Queue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  micHost: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    backgroundColor: "transparent",
  },
  canvas: {
    position: "absolute",
  },
  iconSlot: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  tabSlot: {
    flex: 1,
    alignItems: "center",
  },
  micFlowSpacer: {
    height: MIC_FLOW_SPACER_HEIGHT,
  },
  micFabOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  micFabRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
  },
  micFabSide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  tabPress: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  /** Pulls the mic circle upward over the content; more negative = higher. */
  micLift: {
    marginTop: -45,
    marginBottom: 4,
  },
  queueLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
});
