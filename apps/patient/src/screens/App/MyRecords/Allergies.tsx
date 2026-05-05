import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import WarningTealIcon from "../../../assets/icons/warningTeal.svg";

type AllergySeverity = "moderate" | "severe" | "mild";

type AllergyItem = {
  id: string;
  title: string;
  reaction: string;
  severity: AllergySeverity;
};

const ALLERGIES: AllergyItem[] = [
  { id: "a1", title: "Penicillin", reaction: "Rash", severity: "moderate" },
  { id: "a2", title: "Peanuts", reaction: "Swelling", severity: "severe" },
  { id: "a3", title: "Dust", reaction: "Sneezing", severity: "mild" },
];

const paletteForSeverity = (severity: AllergySeverity) => {
  if (severity === "moderate") {
    return {
      value: "Moderate",
      bgColor: "#FFF6D9",
      textColor: "#D6AD3D",
      darkShadowColor: "rgba(214, 173, 61, 0.35)",
    };
  }
  if (severity === "severe") {
    return {
      value: "Severe",
      bgColor: "#FFE4E4",
      textColor: "#D87474",
      darkShadowColor: "rgba(216, 116, 116, 0.35)",
    };
  }
  return {
    value: "Mild",
    bgColor: "#E9EAED",
    textColor: "#6F6F6F",
    darkShadowColor: "rgba(111, 111, 111, 0.2)",
  };
};

const Allergies = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: AllergyItem }) => {
    const palette = paletteForSeverity(item.severity);
    return (
      <NeumorphicCard
        outerStyle={styles.cardOuter}
        innerStyle={styles.cardInner}
        borderRadius={10}
        onPress={() =>
          navigation.navigate(navigationStrings.ALLERGY_DETAIL, {
            id: item.id,
            title: item.title,
            reaction: item.reaction,
            severity: item.severity,
          })
        }
      >
        <InnerShadowIcon
          icon={<WarningTealIcon width={18} height={18} />}
          size={40}
          radius={20}
          surfaceColor={COLORS.INNER_SURFACE}
        />
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>Reaction: {item.reaction}</Text>
        </View>
        <DeltaBadge
          value={palette.value}
          bgColor={palette.bgColor}
          darkShadowColor={palette.darkShadowColor}
          textColor={palette.textColor}
          height={26}
        />
      </NeumorphicCard>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Allergies</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <FlatList
          data={ALLERGIES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Allergies;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    minHeight: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  cardTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
});
