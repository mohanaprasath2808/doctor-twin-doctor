import React from "react";
import { FlatList, Image, ImageSourcePropType, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import DeltaBadge from "./DeltaBadge";
import NeumorphicRadioMark from "./NeumorphicRadioMark";
import NeumorphicCard from "../neomorphism/NeumorphicCard";
import { COLORS } from "../../constants/theme";

export type StaffRadioListBadge = {
  value: string;
  bgColor?: string;
  darkShadowColor?: string;
  lightShadowColor?: string;
  textColor?: string;
};

export type StaffRadioListRowModel = {
  id: string;
  name: string;
  avatarSource: ImageSourcePropType;
  subtitle?: string;
  badge?: StaffRadioListBadge;
};

type StaffRadioListInCardProps = {
  staffList: StaffRadioListRowModel[];
  selectedId: string;
  onSelectId: (id: string) => void;
  borderRadius?: number;
  backgroundColor?: string;
  outerStyle?: StyleProp<ViewStyle>;
};

/**
 * Single `NeumorphicCard` containing a staff picker list (radio + avatar + name + subtitle or badge).
 */
const StaffRadioListInCard = ({
  staffList,
  selectedId,
  onSelectId,
  borderRadius = 12,
  backgroundColor = COLORS.INNER_SURFACE,
  outerStyle,
}: StaffRadioListInCardProps) => (
  <NeumorphicCard
    borderRadius={borderRadius}
    backgroundColor={backgroundColor}
    outerStyle={[styles.sectionOuter, outerStyle]}
    innerStyle={styles.listInner}
  >
    <FlatList
      data={staffList}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      renderItem={({ item }) => (
        <Pressable style={styles.staffRow} onPress={() => onSelectId(item.id)}>
          <NeumorphicRadioMark selected={selectedId === item.id} />
          <Image source={item.avatarSource} style={styles.staffAvatar} />
          <View style={styles.staffText}>
            <Text style={styles.staffName} numberOfLines={1}>
              {item.name}
            </Text>
            {item.badge ? (
              <DeltaBadge
                value={item.badge.value}
                height={28}
                radius={14}
                bgColor={item.badge.bgColor ?? "#FDECEC"}
                darkShadowColor={item.badge.darkShadowColor ?? "#F2CACA"}
                lightShadowColor={item.badge.lightShadowColor ?? "#F2CACA"}
                textColor={item.badge.textColor ?? "#FF6B6B"}
                textStyle={styles.badgeText}
                width={"50%"}
              />
            ) : item.subtitle ? (
              <Text style={styles.staffSub} numberOfLines={2}>
                {item.subtitle}
              </Text>
            ) : null}
          </View>
        </Pressable>
      )}
    />
  </NeumorphicCard>
);

export default StaffRadioListInCard;

const styles = StyleSheet.create({
  sectionOuter: { width: "100%" },
  listInner: { paddingHorizontal: 12, paddingVertical: 6 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20 },
  staffRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10 },
  staffAvatar: { width: 40, height: 40, borderRadius: 20 },
  staffText: { flex: 1, minWidth: 0, gap: 4 },
  staffName: { fontSize: 14, fontWeight: "600", color: COLORS.TEXT_DARK, fontFamily: "SF-Pro-Display-Semibold" },
  staffSub: { fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70, fontFamily: "SF-Pro-Display-Regular" },
  badgeText: { fontSize: 11, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
});
