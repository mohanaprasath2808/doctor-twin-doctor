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
import LabClipboardIcon from "../../../assets/icons/labClipboard.svg";

type ProblemStatus = "active" | "resolved";

type ProblemItem = {
  id: string;
  title: string;
  since: string;
  status: ProblemStatus;
};

const PROBLEMS: ProblemItem[] = [
  { id: "p1", title: "Hypertension", since: "23 Jan 2020", status: "active" },
  { id: "p2", title: "Type 2 Diabetes", since: "23 Jan 2020", status: "active" },
  { id: "p3", title: "Asthma", since: "23 Jan 2020", status: "resolved" },
];

const paletteForStatus = (status: ProblemStatus) =>
  status === "active"
    ? {
        value: "Active",
        bgColor: "#D3FFF1",
        textColor: "#10B981",
        darkShadowColor: "rgba(16, 185, 129, 0.35)",
      }
    : {
        value: "Resolved",
        bgColor: "#D3FFF1",
        textColor: "#39A071",
        darkShadowColor: "rgba(57, 160, 113, 0.35)",
      };

const ProblemList = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: ProblemItem }) => {
    const palette = paletteForStatus(item.status);
    return (
      <NeumorphicCard
        outerStyle={styles.cardOuter}
        innerStyle={styles.cardInner}
        borderRadius={10}
        onPress={() =>
          navigation.navigate(navigationStrings.PROBLEM_DETAIL, {
            id: item.id,
            title: item.title,
            since: item.since,
            status: item.status,
          })
        }
      >
        <InnerShadowIcon
          icon={<LabClipboardIcon width={18} height={18} />}
          size={40}
          radius={20}
          surfaceColor={COLORS.INNER_SURFACE}
        />
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>Since: {item.since}</Text>
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
          <Text style={styles.headerTitle}>Problem List</Text>
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
          data={PROBLEMS}
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

export default ProblemList;

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
