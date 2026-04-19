import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MicIcon from "../../assets/icon/micIcon.svg";
import InnerShadowView from "../neomorphism/InnerShadowView";
import { COLORS } from "../../constants/theme";

/** Center FAB size — matches design (80×80). */
export const QUEUE_MIC_SIZE = 80;
const MIC_RADIUS = QUEUE_MIC_SIZE / 2;
const INNER_FACE = QUEUE_MIC_SIZE - 2;
const INNER_FACE_RADIUS = MIC_RADIUS - 1;
const INNER_SHADOW_SIZE = INNER_FACE - 8;
const INNER_SHADOW_RADIUS = INNER_SHADOW_SIZE / 2;

/**
 * Neumorphic Queue mic: linear fill (#CFEFDC → #429761), 1px dual LinearGradient border,
 * inner mint shadow, and drop shadows per Figma (green + white + soft).
 */
export const QueueMicButton: React.FC = () => {
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
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowGreen, { borderRadius: MIC_RADIUS }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowLight, { borderRadius: MIC_RADIUS }]}
      />
      <View
        pointerEvents="none"
        style={[styles.shadowLayer, styles.shadowSoft, { borderRadius: MIC_RADIUS }]}
      />

      <View style={[styles.faceStack, { borderRadius: MIC_RADIUS }]}>
        <LinearGradient
          colors={["#D6E3F3", "#FFFFFF"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[styles.border, { borderRadius: MIC_RADIUS }]}
        >
          <LinearGradient
            colors={["#FFFFFF", "rgba(255, 255, 255, 0)"]}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={[
              styles.innerClip,
              {
                width: INNER_FACE,
                height: INNER_FACE,
                borderRadius: INNER_FACE_RADIUS,
              },
            ]}
          >
            <LinearGradient
              colors={["#CFEFDC", "#429761"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.innerShadowSlot} pointerEvents="none">
              <InnerShadowView
                width={INNER_SHADOW_SIZE}
                height={INNER_SHADOW_SIZE}
                borderRadius={INNER_SHADOW_RADIUS}
                color="#CFEFDC"
                darkShadowDx={4}
                darkShadowDy={4}
                darkShadowBlur={14}
                darkShadowColor="#B5F4CC"
                lightShadowDx={-2}
                lightShadowDy={-2}
                lightShadowBlur={6}
                lightShadowColor="#FFFFFF66"
              />
            </View>
            <View style={styles.iconSlot} pointerEvents="none">
              <MicIcon width={28} height={28} />
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

type StaffMicBarButtonProps = {
  onMicPress?: () => void;
  onMicLongPress?: () => void;
};

/** Center mic + “Queue” label. Parent passes `onMicPress` (e.g. navigate Home + voice later). */
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
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.SURFACE,
  },
  shadowGreen: {
    ...Platform.select({
      ios: {
        shadowColor: "#65B382",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "4px 4px 20px 0px rgba(101, 179, 130, 0.8)",
        elevation: 0,
      },
    }),
  },
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "-6px -6px 20px 0px #FFFFFF",
      },
    }),
  },
  shadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        boxShadow: "2px 2px 4px 0px rgba(114, 142, 171, 0.1)",
      },
    }),
  },
  faceStack: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  border: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 1,
    overflow: "hidden",
  },
  innerClip: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  innerShadowSlot: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
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
  tabPress: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  /** Pulls the mic circle upward over the content; more negative = higher. */
  micLift: {
    marginTop: -50,
    marginBottom: 4,
  },
  queueLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
});
