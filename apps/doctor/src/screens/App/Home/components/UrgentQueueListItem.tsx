import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicGradientCard from "../../../../components/Common/NeumorphicGradientCard";
import { COLORS } from "../../../../constants/theme";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";

export type UrgentQueueItem = {
  id: string;
  label: string;
  badgeLabel: string;
  icon: React.ReactNode;
};

type UrgentQueueListItemProps = {
  item: UrgentQueueItem;
  onPress?: () => void;
};

const UrgentQueueListItem = ({ item, onPress }: UrgentQueueListItemProps) => (
  <Pressable style={styles.wrap} onPress={onPress}>
    <NeumorphicGradientCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={14}
    >
      <View style={styles.row}>
        <InnerShadowIcon
          size={44}
          radius={22}
          icon={item.icon}
        />
        <Text style={styles.label} numberOfLines={2}>
          {item.label}
        </Text>
      </View>
    </NeumorphicGradientCard>

    <NeumorphicCard
      outerStyle={styles.badgeOuter}
      innerStyle={styles.badgeInner}
      borderRadius={18}
    >
      <Text style={styles.badgeText} numberOfLines={1}>
        {item.badgeLabel}
      </Text>
    </NeumorphicCard>
  </Pressable>
);

export default UrgentQueueListItem;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    position: "relative",
    paddingBottom: 14,
    overflow: "visible",
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    minHeight: 72,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingRight: 72,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.SURFACE,
    fontFamily: "SF-Pro-Text-Semibold",
    lineHeight: 20,
  },
  badgeOuter: {
    position: "absolute",
    right: 12,
    bottom: 0,
    maxWidth: "58%",
  },
  badgeInner: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
