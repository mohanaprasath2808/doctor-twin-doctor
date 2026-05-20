import React, { useMemo } from "react";
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { getInitials } from "../../constants/constant";
import { COLORS } from "../../constants/theme";
import type { BillingItem } from "../../screens/utills/billingStatus";
import { BillingStatusBadge } from "../../screens/utills/billingStatus";
import InnerShadowIcon from "../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../neomorphism/NeumorphicCard";

const BG = COLORS.INNER_SURFACE;

export type PatientDetailCardItem = Pick<BillingItem, "patientName" | "patientMeta"> & {
  status?: BillingItem["status"];
};

export type PatientDetailCardProps = {
  item: PatientDetailCardItem;
  avatarSource?: ImageSourcePropType;
  /** When true, shows initials inside `InnerShadowIcon` instead of the photo avatar. */
  useInitialsAvatar?: boolean;
  initialsTextColor?: string;
  borderRadius?: number;
  outerStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
};

const PatientDetailCard = ({
  item,
  avatarSource = DoctorTempImage,
  useInitialsAvatar = false,
  initialsTextColor = "#166534",
  borderRadius = 10,
  outerStyle,
  innerStyle,
  badgeTextStyle,
}: PatientDetailCardProps) => {
  const initials = useMemo(() => getInitials(item.patientName), [item.patientName]);
  const showBadge = item.status != null;

  return (
    <NeumorphicCard
      borderRadius={borderRadius}
      backgroundColor={BG}
      outerStyle={[styles.cardOuter, outerStyle]}
      innerStyle={[styles.cardInner, innerStyle]}
    >
      <View style={styles.patientRow}>
        {useInitialsAvatar ? (
          <InnerShadowIcon
            size={40}
            radius={20}
            icon={
              <Text style={[styles.initialsText, { color: initialsTextColor }]} numberOfLines={1}>
                {initials}
              </Text>
            }
          />
        ) : (
          <Image source={avatarSource} style={styles.avatar} />
        )}
        <View style={styles.patientText}>
          <Text style={styles.patientName} numberOfLines={1}>
            {item.patientName}
          </Text>
          <Text style={styles.patientMeta}>{item.patientMeta}</Text>
        </View>
        {showBadge ? (
          <BillingStatusBadge status={item.status!} textStyle={[styles.badgeText, badgeTextStyle]} height={26} radius={13} />
        ) : null}
      </View>
    </NeumorphicCard>
  );
};

export default PatientDetailCard;

const styles = StyleSheet.create({
  cardOuter: { width: "100%", marginTop: 14 },
  cardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientText: { flex: 1, gap: 3, minWidth: 0 },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: { fontSize: 12, color: COLORS.TEXT_60, fontFamily: "SF-Pro-Display-Regular" },
  badgeText: { fontSize: 12, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  initialsText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
