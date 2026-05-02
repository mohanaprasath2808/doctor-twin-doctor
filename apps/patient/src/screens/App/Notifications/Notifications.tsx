import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import MessageIcon from "../../../assets/icons/message.svg";
import LabResultsIcon from "../../../assets/icons/labResults.svg";
import ScheduleIcon from "../../../assets/icons/schedule.svg";
import WarningRedIcon from "../../../assets/icons/warningRed.svg";
import WarningTealIcon from "../../../assets/icons/warningTeal.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";

type NotificationFilter = "all" | "urgent" | "this_week" | "critical";

const NOTIFICATION_FILTERS: { key: NotificationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "urgent", label: "Urgent" },
  { key: "this_week", label: "This Week" },
  { key: "critical", label: "Critical" },
];

type NotificationRow = {
  id: string;
  icon: "urgent" | "message" | "lab" | "followup" | "appointment";
  title: string;
  subtitle?: string;
  timeRight: string;
  showChevron: boolean;
  tags: NotificationFilter[];
};

const NOTIFICATION_ROWS: NotificationRow[] = [
  {
    id: "1",
    icon: "urgent",
    title: "Your doctor flagged an urgent message",
    timeRight: "15 mins ago",
    showChevron: true,
    tags: ["all", "urgent", "this_week", "critical"],
  },
  {
    id: "2",
    icon: "message",
    title: "New Message from Dr. Soliman",
    timeRight: "1 hour ago",
    showChevron: false,
    tags: ["all", "this_week"],
  },
  {
    id: "3",
    icon: "lab",
    title: "New lab result available",
    subtitle: "About hour ago",
    timeRight: "1 hour ago",
    showChevron: false,
    tags: ["all", "this_week"],
  },
  {
    id: "4",
    icon: "followup",
    title: "Your doctor recommends a follow-up",
    timeRight: "Monday",
    showChevron: false,
    tags: ["all", "urgent", "this_week"],
  },
  {
    id: "5",
    icon: "appointment",
    title: "You have an appointment",
    subtitle: "Tue, 30 Apr 2025 at 12:00 PM",
    timeRight: "Monday",
    showChevron: true,
    tags: ["all", "this_week"],
  },
];

const iconSize = 40;

const rowIcon = (icon: NotificationRow["icon"]) => {
  switch (icon) {
    case "urgent":
      return (
        <InnerShadowIcon
          size={iconSize}
          surfaceColor={COLORS.CRITICAL_BG}
          icon={<WarningRedIcon width={18} height={18} />}

        />
      );
    case "message":
      return (
        <InnerShadowIcon
          size={iconSize}
          icon={<MessageIcon width={18} height={18} />}
        />
      );
    case "lab":
      return (
        <InnerShadowIcon
          size={iconSize}
          icon={<LabResultsIcon width={18} height={18} />}
        />
      );
    case "followup":
      return (
        <InnerShadowIcon
          size={iconSize}
          icon={<WarningTealIcon width={18} height={18} />}
        />
      );
    case "appointment":
      return (
        <InnerShadowIcon
          size={iconSize}
          icon={<ScheduleIcon width={20} height={20} />}
        />
      );
    default:
      return null;
  }
};

const Notifications = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<NotificationFilter>("all");

  const filteredRows = useMemo(() => {
    if (selectedFilter === "all") {
      return NOTIFICATION_ROWS;
    }
    return NOTIFICATION_ROWS.filter((row) => row.tags.includes(selectedFilter));
  }, [selectedFilter]);


  const renderRow = ({ item }: { item: NotificationRow }) => (
    <NeumorphicCard
      outerStyle={[styles.cardOuter]}
      innerStyle={styles.cardInner}
      borderRadius={10}
      onPress={() => undefined}
      activeOpacity={0.88}
    >
      <View style={styles.cardRow}>
        {rowIcon(item.icon)}
        <View style={styles.cardCenter}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.cardSubtitle}>{item.subtitle}</Text>}
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.timeRight}>{item.timeRight}</Text>
          {item.showChevron ? (
            <View style={styles.chevronWrap}>
              <RightArrowIcon width={10} height={10} />
            </View>
          ) : null}
        </View>
      </View>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Notifications</Text>
            <View style={styles.headerSpacer} />
          </View>

          <FlatList
            data={NOTIFICATION_FILTERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.filtersRow}
            ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
            style={styles.filtersList}
            renderItem={({ item }) => (
              <FilterChip
                title={item.label}
                selected={item.key === selectedFilter}
                onPress={() => setSelectedFilter(item.key)}
                height={40}
                borderRadius={20}
                style={styles.filterPressable}
                selectedTextStyle={styles.filterSelectedText}
                textStyle={styles.filterText}
              />
            )}
          />

          <FlatList
            data={filteredRows}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.cardsList}
            contentContainerStyle={styles.cardsListContent}
            renderItem={renderRow}
            ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  filtersList: {
    // marginTop: 16,
  },
  filtersRow: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  filterSeparator: {
    width: 10,
  },
  filterPressable: {},
  filterText: {
    color: COLORS.TEXT_PRIMARY_60,
    fontSize: 14,
    fontWeight: "500",
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardsList: {
    paddingHorizontal: 16,
  },
  cardsListContent: {
    paddingBottom: 15,
  },
  cardSeparator: {
    height: 16,
  },
  cardOuter: {
    alignSelf: "center",
    width: "100%",
    height: 64,
  },
  cardInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardCenter: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    height: "100%",
    marginLeft: 12,
    paddingRight: 8,
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
    color: COLORS.TEXT_PRIMARY_70,
  },
  cardRight: {
    alignItems: "flex-end",
    minWidth: 56,
  },
  timeRight: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_50,
    textAlign: "right",
  },
  chevronWrap: {
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notifications;
