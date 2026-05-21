import React from "react";
import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

import NeumorphicQuickActionTile from "../../../../components/neomorphism/NeumorphicQuickActionTile";
import { eligibilityPriorAuthStyles as styles } from "../eligibilityPriorAuthStyles";
import type { SummarySpot } from "../eligibilityPriorAuthTypes";

function SummaryGlyph({
  source,
  glyphSize,
  wellSize,
}: {
  source: ImageSourcePropType;
  glyphSize: number;
  wellSize: number;
}) {
  return (
    <View style={[styles.summaryIconWellSlot, summaryGlyphStyles.well, { width: wellSize, height: wellSize }]}>
      <Image source={source} style={{ width: glyphSize, height: glyphSize }} resizeMode="contain" />
    </View>
  );
}

function summaryTileIcon(spot: SummarySpot, iconSize: number, wellSize: number) {
  return <SummaryGlyph source={spot.iconSource} glyphSize={iconSize} wellSize={wellSize} />;
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

const summaryGlyphStyles = StyleSheet.create({
  well: {
    justifyContent: "center",
    alignItems: "center",
  },
});
