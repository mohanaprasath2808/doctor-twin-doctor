import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AddIcon from "../../../assets/icon/addIcon.svg";
import RightArrowIcon from "../../../assets/icon/rightArrowIcon.svg";
import FilterChip from "../../../components/Common/FilterChip";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowPill from "../../../components/neomorphism/InnerShadowPill";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList, PatientTaskDetailParams } from "../../../router/App/AppStack";

const FILTER_KEYS = ["All", "Urgent", "Docs", "Auth", "Billing"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const FILTER_ITEMS: { key: FilterKey; label: string }[] = FILTER_KEYS.map((key) => ({
  key,
  label: key,
}));

type TaskRow = {
  id: string;
  patientName: string;
  age: number;
  dueLabel: string;
  description: string;
  insurance: string;
  badges: string[];
  avatar: ImageSourcePropType;
  /** Second line under status (e.g. lab source). */
  detailLine?: string;
};

function taskToDetailParams(task: TaskRow): PatientTaskDetailParams {
  return {
    patientName: task.patientName,
    age: task.age,
    taskStatus: task.description,
    taskDetailLine: task.detailLine ?? `${task.insurance} • Dr. Davis, by Quest Labs`,
    dueBadgeText: task.dueLabel,
    avatar: task.id === "ganesh" ? "ganesh" : "default",
  };
}

const MOCK_TASKS: TaskRow[] = [
  {
    id: "ganesh",
    patientName: "Ganesh Kumar",
    age: 57,
    dueLabel: "Due in 2 hours",
    description: "Lab Result Missing",
    insurance: "Quest Labs",
    badges: [],
    avatar: DoctorTempImage,
    detailLine: "HDA1C • Dr. Davis, by Quest Labs",
  },
  {
    id: "1",
    patientName: "Henry Patel",
    age: 49,
    dueLabel: "Due 2 hrs",
    description: "Labs & Imaging Records Missing",
    insurance: "Aetna",
    badges: ["Back & Neck Injections", "PHI Release Form"],
    avatar: DoctorTempImage,
  },
  {
    id: "2",
    patientName: "Maria Santos",
    age: 62,
    dueLabel: "Due by end of day",
    description: "Need Release Form Signed",
    insurance: "Humana",
    badges: ["Authorization"],
    avatar: DoctorTempImage,
  },
  {
    id: "3",
    patientName: "James Chen",
    age: 38,
    dueLabel: "Due tomorrow",
    description: "Prior auth pending — imaging",
    insurance: "Cigna",
    badges: ["Billing", "Docs"],
    avatar: DoctorTempImage,
  },
];

const TAB_BAR_CLEARANCE = 110;

const TaskInbox = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const visibleTasks = useMemo(() => {
    switch (activeFilter) {
      case "All":
        return MOCK_TASKS;
      case "Urgent":
        return MOCK_TASKS.filter(
          (t) =>
            t.dueLabel.includes("2 hrs") ||
            t.dueLabel.includes("2 hours") ||
            t.dueLabel.includes("end of day"),
        );
      case "Docs":
        return MOCK_TASKS.filter(
          (t) =>
            t.description.toLowerCase().includes("record") ||
            t.description.toLowerCase().includes("form") ||
            t.badges.some((b) => b.toLowerCase().includes("phi")),
        );
      case "Auth":
        return MOCK_TASKS.filter(
          (t) =>
            t.badges.some((b) => b.toLowerCase().includes("auth")) ||
            t.description.toLowerCase().includes("auth"),
        );
      case "Billing":
        return MOCK_TASKS.filter((t) => t.badges.some((b) => b.toLowerCase().includes("billing")));
      default:
        return MOCK_TASKS;
    }
  }, [activeFilter]);

  const renderTaskRow = useCallback(
    ({ item: task }: { item: TaskRow }) => (
      <NeumorphicCard
        borderRadius={10}
        backgroundColor={COLORS.INNER_SURFACE}
        innerStyle={styles.cardInner}
        onPress={() =>
          navigation.navigate(navigationStrings.PATIENT_TASK_DETAIL, taskToDetailParams(task))
        }
        activeOpacity={0.88}
      >
        <View style={styles.cardTop}>
          <Image source={task.avatar} style={styles.patientAvatar} />
          <View style={styles.cardTopCenter}>
            <View style={styles.nameRow}>
              <Text style={styles.patientName} numberOfLines={1}>
                {task.patientName}
              </Text>
              <Text style={styles.age} numberOfLines={1}>
                {" "}
                • Age {task.age}
              </Text>
            </View>
            <Text style={styles.taskDescription} numberOfLines={2}>
              {task.description}
            </Text>
          </View>
          <View style={styles.dueLabelContainer}>
            <Text style={styles.dueLabel}>{task.dueLabel}</Text>

            <RightArrowIcon width={10} height={10} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBottom}>
          <Text style={styles.insurance} numberOfLines={1}>
            {task.insurance}
          </Text>
          <View style={styles.badges}>
            {task.badges.map((b) => (
              <InnerShadowPill key={b} label={b} />
            ))}
          </View>
        </View>
      </NeumorphicCard>
    ),
    [navigation],
  );

  const bottomPad = Math.max(insets.bottom, 12) + TAB_BAR_CLEARANCE;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: 32 + bottomPad }]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => { navigation.goBack() }}
            />
            <Text style={styles.headerTitle}>Task Inbox</Text>
            <IconComponent
              icon={
                <AddIcon width={18} height={18} />
              }
              onPress={() => { }}
              width={40}
              height={40}
              radius={20}
            />
          </View>

          <View style={styles.heroBlock}>
            <ProfileAvatar
              overlaySource={OverlayImage}
              imageSource={DoctorTempImage}
              containerStyle={styles.heroAvatarContainer}
              wrapperStyle={styles.heroAvatarWrap}
              overlayStyle={styles.heroOverlay}
              imageStyle={styles.heroImage}
            />
            <Text style={styles.greeting}>Shall I start with the urgent tasks?</Text>
          </View>

          <FlatList
            data={FILTER_ITEMS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.filtersRow}
            ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
            style={styles.filtersList}
            renderItem={({ item }) => (
              <FilterChip
                title={item.label}
                selected={activeFilter === item.key}
                onPress={() => setActiveFilter(item.key)}
                height={40}
                // width={60}
                borderRadius={114}
                style={styles.filterPressable}
                selectedTextStyle={styles.filterSelectedText}
                textStyle={styles.filterText}
              />
            )}
          />

          <FlatList
            data={visibleTasks}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.cardsList}
            contentContainerStyle={styles.cardsListContent}
            renderItem={renderTaskRow}
            ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TaskInbox;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {},
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
  },
  heroBlock: {
    paddingHorizontal: 16,
  },
  heroAvatarContainer: {
    marginTop: 30,
  },
  heroAvatarWrap: {
    width: 200,
    height: 200,
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  heroImage: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 100,
  },
  greeting: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  filtersList: {},
  filtersRow: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingRight: 8,
  },
  filterSeparator: {
    width: 10,
  },
  filterPressable: {},
  filterText: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "500",
  },
  cardsList: {
    paddingHorizontal: 16,
  },
  cardsListContent: {
    paddingBottom: 15,
    paddingTop: 10,
  },
  cardSeparator: {
    height: 16,
  },
  cardInner: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: "cover",
  },
  cardTopCenter: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    flexShrink: 1,
  },
  age: {
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontSize: 12,
  },
  taskDescription: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  dueLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    gap: 6,
  },
  dueLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    maxWidth: 100,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginTop: 16,
    marginBottom: 10,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  insurance: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    flexShrink: 0,
  },
  badges: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  chevron: {
    marginLeft: 6,
    fontSize: 22,
    fontWeight: "300",
    color: COLORS.TEXT_40,
  },
});
