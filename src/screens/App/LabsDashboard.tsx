import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import DeltaBadge from "../../components/Common/DeltaBadge";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import BackIcon from "../../assets/icon/backArrow.svg";
import navigationStrings from "../../constants/navigationStrings";
import { getInitials } from "../../constants/contant";

type LabsFilter = "all" | "abnormal" | "critical" | "overdue";
type LabItem = {
  id: string;
  name: string;
  gender: string;
  age: string;
  label: string;
  timeAgo: string;
};

const LABS_DATA: LabItem[] = [
  {
    id: "lab-1",
    name: "David Johnson",
    gender: "Male",
    age: "Age 41",
    label: "High Cholesterol",
    timeAgo: "29 mins ago",
  },
  {
    id: "lab-2",
    name: "David Johnson",
    gender: "Male",
    age: "Age 41",
    label: "High Cholesterol",
    timeAgo: "29 mins ago",
  },
  {
    id: "lab-3",
    name: "David Johnson",
    gender: "Male",
    age: "Age 41",
    label: "High Cholesterol",
    timeAgo: "29 mins ago",
  },
  {
    id: "lab-4",
    name: "David Johnson",
    gender: "Male",
    age: "Age 41",
    label: "High Cholesterol",
    timeAgo: "29 mins ago",
  },
  {
    id: "lab-5",
    name: "David Johnson",
    gender: "Male",
    age: "Age 41",
    label: "High Cholesterol",
    timeAgo: "29 mins ago",
  },
];

const LabsDashboard = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<LabsFilter>("all");

  const filterItems: { key: LabsFilter; title: string }[] = [
    { key: "all", title: "All" },
    { key: "abnormal", title: "Abnormal" },
    { key: "critical", title: "Critical" },
    { key: "overdue", title: "Overdue" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pageContent}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Labs Dashboard</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersRow}
        >
          {filterItems.map((item) => (
            <Pressable
              key={item.key}
              onPress={() => setSelectedFilter(item.key)}
              style={styles.filterPress}
            >
              {selectedFilter === item.key ? (
                <DeltaBadge
                  icon={null}
                  value={item.title}
                  width={item.title.length > 4 ? 120 : 72}
                  height={40}
                  bgColor="#CBF0FF"
                  darkShadowColor="#C8CBCC"
                  lightShadowColor="#FFFFFF99"
                  textColor={COLORS.PRIMARY}
                  textStyle={styles.selectedFilterText}
                />
              ) : (
                <NeumorphicCard
                  outerStyle={[
                    styles.filterOuter,
                    { width: item.title.length > 4 ? 120 : 72 },
                  ]}
                  innerStyle={styles.filterInner}
                  borderRadius={20}
                >
                  <Text style={styles.filterText}>{item.title}</Text>
                </NeumorphicCard>
              )}
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.listContent}>
          {LABS_DATA.map((item) => (
            <NeumorphicCard
              key={item.id}
              outerStyle={styles.labCardOuter}
              innerStyle={styles.labCardInner}
              borderRadius={12}
              onPress={() => navigation.navigate(navigationStrings.LAB_ALERT_DECISION)}
            >
              <View style={styles.topRow}>
                <View style={styles.patientLeft}>
                  <InnerShadowIcon
                    size={40}
                    icon={
                      <Text style={styles.initials}>
                        {getInitials(item.name)}
                      </Text>
                    }
                  />
                  <View style={styles.textBlock}>
                    <Text style={styles.patientName}>{item.name}</Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.patientMeta}>{item.gender}</Text>
                      <View style={styles.metaDot} />
                      <Text style={styles.patientMeta}>{item.age}</Text>
                    </View>
                  </View>
                </View>

                <ReusableButton
                  title="Review"
                  width={74}
                  height={30}
                  borderRadius={16}
                  containerStyle={styles.reviewButtonWrap}
                  textStyle={styles.reviewText}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.bottomRow}>
                <Text style={styles.labLabel}>{item.label}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
              </View>
            </NeumorphicCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LabsDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  pageContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  filtersRow: {
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 0,
    paddingLeft: 16,
    paddingRight: 30,
  },
  filtersScroll: {
    marginHorizontal: -16,
    paddingLeft: 16,
  },
  filterPress: {
    marginRight: 12,
    marginBottom: 6,
  },
  filterOuter: {
    height: 40,
  },
  filterInner: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  filterText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontFamily: "Manrope-SemiBold",
  },
  selectedFilterText: {
    fontSize: 14,
    fontFamily: "Manrope-SemiBold",
  },
  listContent: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  labCardOuter: {
    marginBottom: 14,
  },
  labCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  patientLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  textBlock: {
    marginLeft: 10,
  },
  initials: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  patientMeta: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  metaRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
    alignSelf: "center",
  },
  reviewText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.WHITE,
  },
  reviewButtonWrap: {
    alignSelf: "flex-start",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  timeAgo: {
    fontSize: 10,
    fontWeight: "500",
    color: COLORS.TEXT_50,
  },
});
