import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";

type ConsultItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
};

const CONSULTS: ConsultItem[] = [
  {
    id: "cardiology",
    title: "Cardiology consult",
    date: "20 April 2024",
    summary: "Echo shows mild left ventricular hypertrophy.\nRecommend follow-up in 6 months",
  },
  {
    id: "gi",
    title: "GI colonoscopy",
    date: "20 April 2024",
    summary: "Echo shows mild left ventricular hypertrophy.\nRecommend follow-up in 6 months",
  },
  {
    id: "derm",
    title: "Derm biopsy",
    date: "20 April 2024",
    summary: "Echo shows mild left ventricular hypertrophy.\nRecommend follow-up in 6 months",
  },
];

const RecentConsults = () => {
  const navigation = useNavigation<any>();

  const renderHeader = () => (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<BackIcon width={16} height={16} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Recent Consults</Text>
        <View style={styles.headerSpacer} />
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: ConsultItem }) => (
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
      <View style={styles.consultHeader}>
        <InnerShadowIcon icon={<LabReportIcon width={18} height={18} />} size={40} />
        <View style={styles.headerTextWrap}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      </View>

      <Text style={styles.summaryText}>{item.summary}</Text>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={CONSULTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RecentConsults;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerWrap: {
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  consultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTextWrap: {
    flex: 1,
    gap: 3,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  itemDate: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  summaryText: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Display-Regular",
  },
  cardGap: {
    height: 18,
  },
});

