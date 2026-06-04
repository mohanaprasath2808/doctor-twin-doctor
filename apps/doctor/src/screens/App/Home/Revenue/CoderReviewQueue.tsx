import React, { useMemo, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ClaimStatusBadge from "./components/ClaimStatusBadge";

type CoderReviewItem = {
  id: string;
  name: string;
  reason: string;
  comment: string;
  avatarSource: typeof DoctorTempImage;
};

const CODER_REVIEW_QUEUE: CoderReviewItem[] = [
  {
    id: "john-miller-1",
    name: "John Miller",
    reason: "CPT mismatch",
    comment: "Please update CPT to 99214",
    avatarSource: DoctorTempImage,
  },
  {
    id: "john-miller-2",
    name: "John Miller",
    reason: "Missing documentation",
    comment: "Attach visit note before resubmitting",
    avatarSource: DoctorTempImage,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    reason: "Incorrect modifier",
    comment: "Review modifier on line 2",
    avatarSource: DoctorTempImage,
  },
];

const CoderReviewQueue = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CODER_REVIEW_QUEUE;
    return CODER_REVIEW_QUEUE.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query),
    );
  }, [search]);

  const renderItem = ({ item }: { item: CoderReviewItem }) => (
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
      <View style={styles.topRow}>
        <Image source={item.avatarSource} style={styles.avatar} />
        <View style={styles.topTextCol}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.reason} numberOfLines={1}>
            Reason: {item.reason}
          </Text>
        </View>
        <ClaimStatusBadge label="Returned for Fix" variant="neutral" />
      </View>
      <View style={styles.divider} />
      <Text style={styles.commentLabel}>Comment:</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
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
        <Text style={styles.headerTitle}>Coder Review Queue</Text>
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
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPad + 16 }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CoderReviewQueue;

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
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  topTextCol: {
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
  reason: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 12,
  },
  commentLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
