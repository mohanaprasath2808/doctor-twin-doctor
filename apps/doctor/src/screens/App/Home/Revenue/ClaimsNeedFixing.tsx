import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ClaimStatusBadge from "./components/ClaimStatusBadge";
import type { ClaimListItem } from "./claimsTypes";

const CLAIMS_NEED_FIXING: ClaimListItem[] = [
  {
    id: "humana-1",
    name: "Humana",
    date: "23/12/2024",
    statusLabel: "Missing field",
    badgeVariant: "error",
    initials: "HU",
  },
  {
    id: "sarah-meditare",
    name: "Sarah Meditare",
    date: "23/12/2024",
    statusLabel: "Dx/CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "cigna-1",
    name: "Cigna",
    date: "23/12/2024",
    statusLabel: "Diagnosis mismatch",
    badgeVariant: "error",
    initials: "CD",
  },
  {
    id: "humana-2",
    name: "Humana",
    date: "23/12/2024",
    statusLabel: "Docs missing",
    badgeVariant: "warning",
    initials: "HU",
  },
];

const ClaimsNeedFixing = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const renderItem = ({ item }: { item: ClaimListItem }) => (
    <NeumorphicCard
      outerStyle={styles.cardOuter}
      innerStyle={styles.cardInner}
      borderRadius={12}
      onPress={() =>
        navigation.navigate(navigationStrings.CLAIM_DETAIL, { claimId: item.id })
      }
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
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <ClaimStatusBadge label={item.statusLabel} variant={item.badgeVariant} />
      </View>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Claims need Fixing</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={CLAIMS_NEED_FIXING}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPad + 16 }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ClaimsNeedFixing;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 14,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  separator: {
    height: 12,
  },
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
