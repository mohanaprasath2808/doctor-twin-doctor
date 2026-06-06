import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../../constants/theme";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import ClaimStatusBadge from "./ClaimStatusBadge";
import type { ClaimListItem } from "../claimsTypes";

type ClaimListItemCardProps = {
  item: ClaimListItem;
  onPress?: () => void;
};

const ClaimListItemCard = ({ item, onPress }: ClaimListItemCardProps) => (
  <NeumorphicCard
    outerStyle={styles.cardOuter}
    innerStyle={styles.cardInner}
    borderRadius={12}
    onPress={onPress}
  >
    <View style={styles.row}>
      {item.avatarSource ? (
        <Image source={item.avatarSource} style={styles.avatar} />
      ) : (
        <InnerShadowIcon
          size={44}
          radius={22}
          icon={
            <Text style={styles.initials} numberOfLines={1}>
              {item.initials ?? ""}
            </Text>
          }
        />
      )}
      <View style={styles.textCol}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        {item.secondaryLine ? (
          <Text style={styles.date} numberOfLines={1}>
            {item.secondaryLine}
          </Text>
        ) : null}
        {item.date ? (
          <Text style={styles.date} numberOfLines={1}>
            {item.date}
          </Text>
        ) : null}
      </View>
      <ClaimStatusBadge label={item.statusLabel} variant={item.badgeVariant} />
    </View>
  </NeumorphicCard>
);

export default ClaimListItemCard;

const styles = StyleSheet.create({
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  initials: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  textCol: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
});
