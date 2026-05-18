import React from "react";
import { StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../../constants/theme";
import PharmacyIcon from "../../../../assets/icons/pharmacyIcon.svg";
import RightArrowIcon from "../../../../assets/icons/rightArrowIcon.svg";
import type { PharmacyListItem } from "../types/medications.types";

type PharmacyListCardProps = {
  item: PharmacyListItem;
};

const PharmacyListCard = ({ item }: PharmacyListCardProps) => (
  <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
    <InnerShadowIcon
      icon={<PharmacyIcon width={18} height={18} />}
      size={40}
      radius={20}
      surfaceColor={COLORS.INNER_SURFACE}
    />
    <View style={styles.cardTextWrap}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.address}</Text>
    </View>
    <RightArrowIcon width={10} height={10} />
  </NeumorphicCard>
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
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
});

export default PharmacyListCard;
