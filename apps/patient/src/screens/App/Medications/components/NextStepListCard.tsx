import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../../constants/theme";
import RightArrowIcon from "../../../../assets/icons/rightArrowIcon.svg";
import type { NextStepItem } from "../types/medications.types";

type NextStepListCardProps = {
  item: NextStepItem;
  icon: React.ReactNode;
  onPress: () => void;
  outerStyle?: object;
};

const NextStepListCard = ({ item, icon, onPress, outerStyle }: NextStepListCardProps) => (
  <Pressable onPress={onPress}>
    <NeumorphicCard
      outerStyle={[styles.cardOuter, outerStyle]}
      innerStyle={styles.cardInner}
      borderRadius={10}
    >
      <InnerShadowIcon
        icon={icon}
        size={40}
        radius={20}
        surfaceColor={COLORS.INNER_SURFACE}
      />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
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
  textWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
});

export default NextStepListCard;
