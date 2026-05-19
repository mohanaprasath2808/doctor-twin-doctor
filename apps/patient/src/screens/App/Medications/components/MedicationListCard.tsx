import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../../../constants/theme";
import { TEXT } from "../../../../constants/typography";
import MedicationsIcon from "../../../../assets/icons/medications.svg";
import YellowWarningIcon from "../../../../assets/icons/yellowWarningIcon.svg";
import RightArrowIcon from "../../../../assets/icons/rightArrowIcon.svg";

export type MedicationListCardItem = {
  id: string;
  name: string;
  instructions: string;
  lastRefillDate: string;
  pharmacyOnFile?: boolean;
};

type MedicationListCardProps = {
  item: MedicationListCardItem;
  onPress: (medicationId: string) => void;
};

const MedicationListCard = ({ item, onPress }: MedicationListCardProps) => (
  <Pressable onPress={() => onPress(item.id)}>
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
      <InnerShadowIcon
        icon={<MedicationsIcon width={18} height={18} />}
        size={40}
        radius={20}
        surfaceColor={COLORS.INNER_SURFACE}
      />
      <View style={styles.cardTextWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
          {item.pharmacyOnFile ? (
            <NeumorphicInnerShadowCard
              borderRadius={114}
              containerStyle={styles.pharmacyBadgeOuter}
              contentStyle={styles.pharmacyBadgeInner}
              darkShadowColor="#EDE0BE"
              backgroundColor="#FFFDF8"
              lightShadowColor="#FFFFFF99"
            >
              <YellowWarningIcon width={12} height={12} />
              <Text style={styles.pharmacyBadgeText}>Pharmacy on File</Text>
            </NeumorphicInnerShadowCard>
          ) : null}
        </View>
        <Text style={styles.cardSubtitle}>{item.instructions}</Text>
        <Text style={styles.cardMeta}>Last refill date: {item.lastRefillDate}</Text>
      </View>
      <RightArrowIcon width={10} height={10} />
    </NeumorphicCard>
  </Pressable>
);

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTitle: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
    flexShrink: 1,
  },
  pharmacyBadgeOuter: {
    flexShrink: 0,
    width: "auto",
    maxWidth: "100%",
  },
  pharmacyBadgeInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pharmacyBadgeText: {
    ...TEXT.captionSemibold,
    color: "#EEB621",
  },
  cardSubtitle: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  cardMeta: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
});

export default MedicationListCard;
