import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../../constants/theme";
import PharmacyIcon from "../../../../assets/icons/pharmacyIcon.svg";
import type { PharmacyInfo } from "../types/medications.types";

type PharmacyChangeRowProps = {
  pharmacy: Pick<PharmacyInfo, "name" | "address">;
  onChangePress: () => void;
  outerStyle?: object;
};

const PharmacyChangeRow = ({ pharmacy, onChangePress, outerStyle }: PharmacyChangeRowProps) => (
  <NeumorphicCard
    outerStyle={[styles.cardOuter, outerStyle]}
    innerStyle={styles.cardInner}
    borderRadius={10}
  >
    <InnerShadowIcon
      icon={<PharmacyIcon width={18} height={18} />}
      size={40}
      radius={20}
      surfaceColor={COLORS.INNER_SURFACE}
    />
    <View style={styles.textWrap}>
      <Text style={styles.title}>{pharmacy.name}</Text>
      <Text style={styles.subtitle}>{pharmacy.address}</Text>
    </View>
    <AppButton
      text="Change"
      borderWidth={1}
      borderColor={COLORS.PRIMARY}
      bgColor={COLORS.SURFACE}
      width={72}
      height={32}
      borderRadius={60}
      textStyle={styles.changeText}
      onPress={onChangePress}
    />
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
  changeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
});

export default PharmacyChangeRow;
