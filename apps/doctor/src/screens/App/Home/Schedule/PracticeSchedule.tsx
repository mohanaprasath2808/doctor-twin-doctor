import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import TodayVisitIcon from "../../../../assets/icon/todayVisitIcon.svg";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";
import RefillsIcon from "../../../../assets/icon/refillsIcon.svg";
import DelegationHubIcon from "../../../../assets/icon/delegationHubIcon.svg";
import UtilizationIcon from "../../../../assets/icon/utilizationIcon.svg";
import navigationStrings from "../../../../constants/navigationStrings";

const DATA = [
  {
    id: "physicals",
    title: "Physicals",
    icon: <TodayVisitIcon width={18} height={18} />,
  },
  {
    id: "pre-ops",
    title: "Pre-Ops",
    icon: <ScheduleIcon width={18} height={18} />,
  },
  {
    id: "med-spa",
    title: "Med Spa",
    icon: <RefillsIcon width={18} height={18} />,
  },
  {
    id: "hospital-rounds",
    title: "Hospital Rounds",
    icon: <DelegationHubIcon width={18} height={18} />,
  },
  {
    id: "follow-ups",
    title: "Follow Ups",
    icon: <UtilizationIcon width={18} height={18} />,
  },
];

const PracticeSchedule = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: (typeof DATA)[number] }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        item.id === "physicals"
          ? navigation.navigate(navigationStrings.PHYSICALS)
          : item.id === "pre-ops"
          ? navigation.navigate(navigationStrings.PRE_OPS)
          : item.id === "med-spa"
          ? navigation.navigate(navigationStrings.MED_SPA)
          : item.id === "hospital-rounds"
            ? navigation.navigate(navigationStrings.HOSPITAL_ROUNDS)
            : item.id === "follow-ups"
              ? navigation.navigate(navigationStrings.FOLLOW_UPS)
            : undefined
      }
    >
      <NeumorphicCard
        outerStyle={styles.itemOuter}
        innerStyle={styles.itemInner}
        borderRadius={12}
      >
        <View style={styles.itemLeft}>
          <InnerShadowIcon icon={item.icon} size={40} />
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
        <RightArrowIcon width={12} height={12} />
      </NeumorphicCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Practice Schedule</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          activeOpacity={0.85}
          style={styles.backBtn}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          text="View Full Schedule"
          textStyle={styles.backBtnText}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  listContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 },
  itemOuter: { width: "100%" },
  itemInner: {
    height: 62,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  itemText: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: "auto",
  },
  backBtn: {
    borderRadius: 26,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "600" },
  listContainer: { flex: 1, marginTop: 20 },
});

export default PracticeSchedule;
