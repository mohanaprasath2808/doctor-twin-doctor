import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";
import UnselectedIcon from "../../../../assets/icon/unSelectedIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../../../constants/navigationStrings";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import RefillsIcon from "../../../../assets/icon/refillsIcon.svg";
import RevenueIcon from "../../../../assets/icon/revenueIcon.svg";
import PlusIcon from "../../../../assets/icon/plusIcon.svg";
const TODO_DATA = [
  {
    id: "review-lab-results",
    title: "Review Lab Results",
    checked: true,
    icon: <ScheduleIcon width={18} height={18} />,
  },
  {
    id: "call-thompson",
    title: "Call Mr. Thompson",
    checked: false,
    icon: <MessageIcon width={18} height={18} />,
  },
  {
    id: "complete-billing",
    title: "Complete Billing Reports",
    checked: false,
    icon: <RefillsIcon width={18} height={18} />,
  },
  {
    id: "order-supplies",
    title: "Order Medical Supplies",
    checked: false,
    icon: <RevenueIcon width={18} height={18} />,
  },
];

const ToDoList = () => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: (typeof TODO_DATA)[number] }) => (
    <View style={styles.itemContainer}>
      <NeumorphicCard
        outerStyle={styles.itemOuter}
        innerStyle={styles.itemInner}
        borderRadius={12}
      >
        <View style={styles.itemLeft}>
          {item.checked ? (
            <SelectedIcon width={22} height={22} />
          ) : (
            <InnerShadowIcon
              size={22}
              icon={<View style={styles.emptyCheckIcon} />}
            />
            // <UnselectedIcon width={30} height={30} />
          )}
          <InnerShadowIcon icon={item.icon} size={40} />
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      </NeumorphicCard>
    </View>
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
        <Text style={styles.headerTitle}>To Do List</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={TODO_DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          activeOpacity={0.85}
          style={styles.addTaskBtn}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          leftIcon={<PlusIcon width={16} height={16} />}
          text="Add New Task"
          textStyle={styles.addTaskBtnText}
          onPress={() => navigation.navigate(navigationStrings.CREATE_TASK)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ToDoList;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  headerTitle: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  listContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 },
  itemContainer: { backgroundColor: COLORS.SURFACE },
  itemOuter: { width: "100%" },
  itemInner: {
    height: 62,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  emptyCheckIcon: { width: 1, height: 1 },
  itemText: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: "auto",
  },
  addTaskBtn: {
    borderRadius: 26,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  addTaskBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "600" },
  listContainer: { flex: 1, marginTop: 20 },
});
