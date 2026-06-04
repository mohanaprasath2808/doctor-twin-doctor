import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ClaimListItemCard from "./components/ClaimListItemCard";
import type { ClaimListItem } from "./claimsTypes";

const DENIED_CLAIMS: ClaimListItem[] = [
  {
    id: "john-miller",
    name: "John Miller",
    secondaryLine: "BCBS · $145",
    date: "",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    secondaryLine: "Aetna · $220",
    date: "",
    statusLabel: "Medical necessity",
    badgeVariant: "warning",
    avatarSource: DoctorTempImage,
  },
  {
    id: "mike-thompson",
    name: "Mike Thompson",
    secondaryLine: "Cigna · $98",
    date: "",
    statusLabel: "Duplicate claim",
    badgeVariant: "error",
    avatarSource: DoctorTempImage,
  },
  {
    id: "emma-davis",
    name: "Emma Davis",
    secondaryLine: "Humana · $310",
    date: "",
    statusLabel: "CPT mismatch",
    badgeVariant: "error",
    initials: "ED",
  },
];

const DeniedClaims = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return DENIED_CLAIMS;
    return DENIED_CLAIMS.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.secondaryLine?.toLowerCase().includes(query) ||
        item.statusLabel.toLowerCase().includes(query),
    );
  }, [search]);

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
        <Text style={styles.headerTitle}>Denied Claims</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchWrap}>
        <InputField
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          leftIcon={<SearchIcon width={18} height={18} />}
          borderRadius={64}
          containerStyle={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClaimListItemCard
            item={item}
            onPress={() =>
              navigation.navigate(navigationStrings.DENIED_DETAILS, { claimId: item.id })
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

export default DeniedClaims;

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
    paddingBottom: 10,
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
  searchWrap: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    width: "100%",
    marginTop: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  separator: {
    height: 12,
  },
});
