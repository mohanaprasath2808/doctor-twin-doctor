import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import AppButton from "../../../../components/Common/AppButton";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import FilterChip from "../../../../components/Common/FilterChip";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import SearchIcon from "../../../../assets/icon/searchIcon.svg";
import PlusIcon from "../../../../assets/icon/bluePlusIcn.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

type FilterType = "all" | "completed" | "inProgress" | "waiting";
type TaskStatus = "Waiting for Approval" | "Completed" | "In Progress";

type TaskItem = {
  id: string;
  name: string;
  assignee: string;
  task: string;
  status: TaskStatus;
  initials?: string;
  image?: any;
};

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "inProgress", label: "In Progress" },
  { key: "waiting", label: "Waiting for Approval" },
];

const TASKS: TaskItem[] = [
  {
    id: "john",
    name: "John Miller",
    assignee: "Maria (MA)",
    task: "Refill Request",
    status: "Waiting for Approval",
    initials: "SW",
  },
  {
    id: "sarah",
    name: "Sarah Williams",
    assignee: "Office Manager",
    task: "Lab Call",
    status: "Completed",
    image: DoctorTempImage,
  },
  {
    id: "susan",
    name: "Susan Harris",
    assignee: "Scheduler",
    task: "Appointment Scheduling",
    status: "In Progress",
    initials: "SW",
  },
  {
    id: "patrick",
    name: "Patrick Johnson",
    assignee: "Maria (MA)",
    task: "Refill Request",
    status: "Waiting for Approval",
    initials: "PJ",
  },
];

const StaffConsole = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return TASKS.filter((task) => {
      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "completed" && task.status === "Completed") ||
        (selectedFilter === "inProgress" && task.status === "In Progress") ||
        (selectedFilter === "waiting" &&
          task.status === "Waiting for Approval");

      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.name.toLowerCase().includes(normalizedSearch) ||
        task.task.toLowerCase().includes(normalizedSearch) ||
        task.assignee.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackIcon width={16} height={16} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Staff Console</Text>
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

          <FlatList
            data={FILTERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.filtersRow}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            style={styles.filtersList}
            renderItem={({ item, index }) => (
              <FilterChip
                title={item.label}
                selected={item.key === selectedFilter}
                onPress={() => setSelectedFilter(item.key)}
                height={40}
                borderRadius={20}
                style={[
                  styles.filterPressable
                ]}
                selectedTextStyle={styles.filterSelectedText}
                textStyle={styles.filterText}
              />
            )}
          />

          <Text style={styles.sectionTitle}>Today</Text>

          <View style={styles.cardsList}>
            {filteredTasks.map((item) => (
              <NeumorphicCard
                key={item.id}
                outerStyle={styles.cardOuter}
                innerStyle={styles.cardInner}
                borderRadius={14}
                onPress={() =>
                  navigation.navigate(navigationStrings.DOCTOR_REVIEW)
                }
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.personRow}>
                    {item.image ? (
                      <Image source={item.image} style={styles.personImage} />
                    ) : (
                      <InnerShadowIcon
                        size={40}
                        icon={<Text style={styles.initials}>{item.initials}</Text>}
                      />
                    )}

                    <View style={styles.personTextWrap}>
                      <Text style={styles.personName}>{item.name}</Text>
                      <Text style={styles.personAssignee}>
                        Assigned to: {item.assignee}
                      </Text>
                    </View>
                  </View>

                  <DeltaBadge
                    icon={null}
                    value={item.status}
                    height={28}
                    bgColor={getStatusBadgePalette(item.status).backgroundColor}
                    darkShadowColor={getStatusBadgePalette(item.status).textColor}
                    lightShadowColor="#FFFFFF"
                    textColor={getStatusBadgePalette(item.status).textColor}
                    textStyle={styles.statusText}
                  />
                </View>

                <View style={styles.cardBottomRow}>
                  <Text style={styles.taskText}>{item.task}</Text>
                  <AppButton
                    text="Timeline"
                    activeOpacity={0.85}
                    width={76}
                    height={28}
                    borderRadius={18}
                    borderWidth={1}
                    bgColor={COLORS.SURFACE}
                    borderColor={COLORS.PRIMARY}
                    textStyle={styles.timelineText}
                    onPress={() =>
                      navigation.navigate(navigationStrings.DOCTOR_REVIEW)
                    }
                  />
                </View>
              </NeumorphicCard>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            text="Add New Task"
            height={52}
            borderRadius={60}
            borderColor={COLORS.PRIMARY}
            borderWidth={1}
            bgColor={COLORS.SURFACE}
            leftIcon={<PlusIcon />}
            iconSize={16}
            textStyle={styles.addTaskText}
            style={styles.addTaskButton}
            onPress={() => navigation.navigate(navigationStrings.DELEGATION_CREATE_TASK)}
          />

        </View>
      </View>
    </SafeAreaView>
  );
};

const getStatusBadgePalette = (status: TaskStatus) =>
  status === "Completed"
    ? {
      backgroundColor: "#DDF9EE",
      textColor: "#39C89A",
    }
    : status === "In Progress"
      ? {
        backgroundColor: "#FFF4D6",
        textColor: "#EEB621",
      }
      : {
        backgroundColor: "#FFF4D6",
        textColor: "#F0B640",
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
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  searchInput: {
    marginTop: 12,
  },
  filtersList: {
    marginTop: 16,
  },
  filtersRow: {
    paddingRight: 8,
  },
  filterPressable: {
  },
  filterText: {
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "500",
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 30,
    color: COLORS.TEXT_70,
    fontSize: 16,
    fontWeight: "500",
  },
  cardsList: {
    marginTop: 14,
    gap: 16,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  personRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  personImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  initials: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  personTextWrap: {
    flex: 1,
  },
  personName: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "600",
  },
  personAssignee: {
    marginTop: 2,
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "500",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  cardBottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  taskText: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
  },
  timelineText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: COLORS.SURFACE,
  },
  addTaskButton: {
    marginBottom: 14,
  },
  addTaskText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  bottomBarOuter: {
    width: "100%",
  },
  bottomBarInner: {
    minHeight: 74,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 72,
  },
  tabIconWrap: {
    minHeight: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    color: COLORS.TEXT_40,
    opacity: 0.8,
  },
  tabLabel: {
    marginTop: 4,
    color: COLORS.TEXT_50,
    fontSize: 12,
    fontWeight: "500",
  },
  centerTab: {
    marginTop: -34,
    alignItems: "center",
  },
  centerAvatarOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.SURFACE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.DARK_SHADOW,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 8,
  },
  centerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: "cover",
  },
  centerTabText: {
    marginTop: 4,
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "600",
  },
});

export default StaffConsole;
