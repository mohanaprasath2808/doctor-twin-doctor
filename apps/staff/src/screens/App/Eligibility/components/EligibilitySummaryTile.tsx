import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import EligibilityGreenIcon from "../../../../assets/icon/eligibilityIcon.svg";
import NeumorphicQuickActionTile from "../../../../components/neomorphism/NeumorphicQuickActionTile";
import { ACCENT_ALERT } from "../eligibilityPriorAuthConstants";
import { eligibilityPriorAuthStyles as styles } from "../eligibilityPriorAuthStyles";
import type { SummarySpot } from "../eligibilityPriorAuthTypes";

function summaryTileIcon(spot: SummarySpot, iconSize: number, wellSize: number) {
  const wellStyle = [styles.summaryIconWellSlot, { width: wellSize, height: wellSize }];
  if (spot.key === "issue") {
    return (
      <View style={wellStyle}>
        <EligibilityGreenIcon width={iconSize} height={iconSize} />
      </View>
    );
  }
  if (spot.key === "denial") {
    return (
      <View style={wellStyle}>
        <MaterialCommunityIcons name="alert-outline" size={iconSize} color={ACCENT_ALERT} />
      </View>
    );
  }
  return (
    <View style={wellStyle}>
      <MaterialCommunityIcons name={spot.icon} size={iconSize} color={spot.iconColor} />
    </View>
  );
}

type Props = {
  spot: SummarySpot;
  outerDiameter: number;
  innerShadowDiameter: number;
  iconSize: number;
  slotWidth: number;
  onPress: () => void;
};

/**
 * Matches `Home.tsx` orb: same diameters, inner well tint, `NeumorphicQuickActionTile` shadows only (no extra host).
 */
export default function EligibilitySummaryTile({
  spot,
  outerDiameter,
  innerShadowDiameter,
  iconSize,
  slotWidth,
  onPress,
}: Props) {
  return (
    <Pressable style={[styles.summaryColumn, { width: slotWidth }]} onPress={onPress}>
      <View style={[styles.summaryOrbCluster, { width: outerDiameter }]}>
        <NeumorphicQuickActionTile
          hideFooter
          label=""
          onPress={onPress}
          icon={summaryTileIcon(spot, iconSize, innerShadowDiameter)}
          innerShadowColor={spot.wellTint}
          outerDiameter={outerDiameter}
          innerShadowDiameter={innerShadowDiameter}
          innerShadowBorderRadius={Math.round(innerShadowDiameter / 2)}
          containerStyle={[styles.summaryQuickTileCircleOnly, { width: outerDiameter }]}
        />
        <View pointerEvents="none" style={styles.summaryPillOverlap}>
          <View style={styles.summaryTagChip}>
            <Text style={styles.summaryTagChipText} numberOfLines={1}>
              {spot.pillLabel}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.summaryHeadline} numberOfLines={2} ellipsizeMode="tail">
        {spot.title}
      </Text>
      <Text style={styles.summaryMeta} numberOfLines={1} ellipsizeMode="tail">
        {spot.patientLine}
      </Text>
      <Text style={styles.summaryMetaSecond} numberOfLines={1} ellipsizeMode="tail">
        {spot.insurerLine}
      </Text>
    </Pressable>
  );
}
