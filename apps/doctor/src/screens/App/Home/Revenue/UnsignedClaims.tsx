import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ClaimListItemCard from "./components/ClaimListItemCard";
import type { ClaimListItem } from "./claimsTypes";

const UNSIGNED_CLAIMS: ClaimListItem[] = [
  {
    id: "sarah-williams-1",
    name: "Sarah Williams",
    date: "23/12/2024",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "cotmg-dply",
    name: "Cotmg Dply",
    date: "23/12/2024",
    statusLabel: "Missing Diagnosis",
    badgeVariant: "error",
    initials: "CD",
  },
  {
    id: "sarah-williams-2",
    name: "Sarah Williams",
    date: "23/12/2024",
    statusLabel: "Dx mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams-3",
    name: "Sarah Williams",
    date: "23/12/2024",
    statusLabel: "Docs missing",
    badgeVariant: "warning",
    avatarSource: DoctorTempImage,
  },
];

const UnsignedClaims = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

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
        <Text style={styles.headerTitle}>Unsigned Claims</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={UNSIGNED_CLAIMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClaimListItemCard
            item={item}
            onPress={() =>
              navigation.navigate(navigationStrings.CLAIM_SIGNATURE, { claimId: item.id })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPad + 16 }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default UnsignedClaims;

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
});
