import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import WarningIcon from "../../../../assets/icon/yellowWarningIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import { getInitials } from "../../../../constants/contant";

type VisitStatus = "Checked In" | "Waiting" | "In Room" | "Scheduled";

type TodayVisitItem = {
  id: string;
  name: string;
  gender: "Male" | "Female";
  age: number;
  time: string;
  status: VisitStatus;
  flagText?: string;
};

const VISITS: TodayVisitItem[] = [
  {
    id: "tv-1",
    name: "Sarah Williams",
    gender: "Female",
    age: 45,
    time: "07:00 PM",
    status: "Checked In",
    flagText: "Colonoscopy overdue",
  },
  {
    id: "tv-2",
    name: "Kathryn Murphy",
    gender: "Female",
    age: 45,
    time: "07:00 PM",
    status: "Waiting",
    flagText: "Mammogram overdue",
  },
  {
    id: "tv-3",
    name: "Annette Black",
    gender: "Male",
    age: 45,
    time: "07:00 PM",
    status: "In Room",
    flagText: "Refill request",
  },
  {
    id: "tv-4",
    name: "Theresa Webb",
    gender: "Female",
    age: 45,
    time: "07:00 PM",
    status: "Scheduled",
    flagText: "Diabetes",
  },
  {
    id: "tv-5",
    name: "Jacob Jones",
    gender: "Female",
    age: 45,
    time: "07:00 PM",
    status: "Scheduled",
    flagText: "Insurance update needed",
  },
];

const TodayVisits = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return VISITS;
    return VISITS.filter((v) => v.name.toLowerCase().includes(q));
  }, [search]);

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
        <Text style={styles.headerTitle}>Today's Visits</Text>
        <View style={styles.headerSpacer} />
      </View>

      <InputField
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        leftIcon={<SearchIcon width={18} height={18} />}
        containerStyle={styles.searchInput}
        borderRadius={64}
        minHeight={46}
      />
    </View>
  );

  const renderItem = ({ item }: { item: TodayVisitItem }) => (
    <Pressable
      onPress={() =>
        navigation.navigate(navigationStrings.VISIT_HUB, {
          patient: {
            name: item.name,
            status: item.status,
            room: "Room 3",
            flagText: item.flagText,
          },
        })
      }
    >
      <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
        <View style={styles.topRow}>
          <View style={styles.leftRow}>
            <View style={styles.avatarWrap}>
              <InnerShadowIcon
                size={44}
                icon={
                  <Text style={styles.avatarInitials}>
                    {getInitials(item.name)}
                  </Text>
                }
              />
            </View>

            <View style={styles.mainTextWrap}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.subText}>
                {item.gender} • Age {item.age}
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>

          <View style={styles.rightCol}>
            <NeumorphicInnerShadowCard
              borderRadius={18}
              containerStyle={styles.statusOuter}
              contentStyle={styles.statusInner}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </NeumorphicInnerShadowCard>
          </View>
        </View>

        {item.flagText && (
          <View style={styles.flagRow}>
            <NeumorphicInnerShadowCard
              borderRadius={14}
              containerStyle={styles.flagOuter}
              contentStyle={styles.flagInner}
              darkShadowColor="#EDE0BE"
              lightShadowColor="#FFFFFF99"
            >
              <WarningIcon width={14} height={14} />
              <Text style={styles.flagText} numberOfLines={1}>
                {item.flagText}
              </Text>
            </NeumorphicInnerShadowCard>
            <RightArrowIcon width={10} height={10} />
          </View>
        )}
      </NeumorphicCard>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default TodayVisits;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerWrap: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
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
  searchInput: {
    paddingHorizontal: 0,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  leftRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  avatarInitials: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.PRIMARY,
  },
  mainTextWrap: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    lineHeight: 15,
    fontFamily: "SF-Pro-Text-Bold",
  },
  subText: {
    fontSize: 12,
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text",
  },
  timeText: {
    fontSize: 12,
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text",
  },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 2,
  },
  statusOuter: {
    minHeight: 28,
  },
  statusInner: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Medium",
  },
  flagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  flagOuter: {
    width: "auto",
    maxWidth: "80%",
  },
  flagInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  flagText: {
    fontSize: 12,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    flexShrink: 1,
  },
});

