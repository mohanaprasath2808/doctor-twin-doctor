import React, { useMemo, useState } from "react";
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import AddIcon from "../../../assets/icon/greenPlusIcon.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import FilterChip from "../../../components/Common/FilterChip";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import DelegationActionCompleted from "./DelegationActionCompleted";
import DelegationEscalateMessage from "./DelegationEscalateMessage";
import DelegationTaskAssignment from "./DelegationTaskAssignment";
import { DELEGATION_HOME_ROUTE, type DelegationFlowParamList } from "./delegationTypes";
import OrbitCluster, { OrbitClusterNode } from "../Labs/components/OrbitCluster";

const HEADER_H = 52;
const BG = COLORS.INNER_SURFACE;
const TIMER_TEXT = "00:02:14";
const DelegationStack = createNativeStackNavigator<DelegationFlowParamList>();

type DelegationFilter = "all" | "pending" | "inProgress" | "completed";
type DelegationStatus = "critical" | "pending" | "completed";

type DelegationNode = OrbitClusterNode & {
  label: string;
  subLabel: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  badge?: string;
};

type DelegationTask = {
  id: string;
  title: string;
  patientName: string;
  age: number;
  assignee: string;
  dueText: string;
  status: DelegationStatus;
  filter: DelegationFilter;
};

const FILTERS: { key: DelegationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

const DELEGATION_NODES: DelegationNode[] = [
  {
    id: "critical-labs",
    label: "Critical Labs",
    subLabel: "Brian Carter\nToday 03:00 PM",
    icon: "flask-outline",
    iconColor: COLORS.ALERT,
    figmaLeft: 20,
    figmaTop: 50,
    figmaWrapW: 110,
  },
  {
    id: "missed-labs",
    label: "Missed Labs",
    subLabel: "Sarah Johnson\nTomorrow",
    icon: "flask-outline",
    iconColor: COLORS.ALERT,
    figmaLeft: 296,
    figmaTop: 50,
    figmaWrapW: 100,
  },
  {
    id: "appeal-left",
    label: "Insurance Appeal",
    subLabel: "Henry Patel\nRoutine 2 Days",
    icon: "shield-plus-outline",
    iconColor: COLORS.ALERT,
    figmaLeft: 30,
    figmaTop: 215,
    figmaWrapW: 118,
  },
  {
    id: "medication-renewal",
    label: "Medication Renewal",
    subLabel: "Susan Reed\nToday 04:00 PM",
    icon: "pill",
    iconColor: COLORS.PRIMARY,
    figmaLeft: 260,
    figmaTop: 215,
    figmaWrapW: 120,
  },
  {
    id: "appeal-center",
    label: "Insurance Appeal",
    subLabel: "Henry Patel\nRoutine 2 Days",
    icon: "shield-cross-outline",
    iconColor: COLORS.PRIMARY,
    figmaLeft: 150,
    figmaTop: 292,
    figmaWrapW: 112,
  },
];

const DELEGATION_TASKS: DelegationTask[] = [
  {
    id: "critical-labs-follow-up",
    title: "Critical Labs Follow-Up",
    patientName: "Brian Carter",
    age: 45,
    assignee: "Nancy T",
    dueText: "06:00 PM - 15 mins left",
    status: "critical",
    filter: "inProgress",
  },
  {
    id: "moderate-medication-info",
    title: "Moderate Medication Info",
    patientName: "Brian Carter",
    age: 45,
    assignee: "Rebecca K",
    dueText: "Today 06:00 PM",
    status: "pending",
    filter: "pending",
  },
  {
    id: "rx-denial-appeal",
    title: "Rx Denial Appeal",
    patientName: "James Wilson",
    age: 34,
    assignee: "Brian L",
    dueText: "Tomorrow",
    status: "pending",
    filter: "pending",
  },
];

const statusTone = {
  critical: {
    label: "Critical",
    bgColor: "#FDECEC",
    textColor: COLORS.ALERT,
    darkShadowColor: "#F2CACA",
    lightShadowColor: "#FFFFFF99",
  },
  pending: {
    label: "Pending",
    bgColor: "#FFF8D9",
    textColor: "#D49A1E",
    darkShadowColor: "#F0E2A6",
    lightShadowColor: "#FFFFFF99",
  },
  completed: {
    label: "Completed",
    bgColor: "#D3FFF1",
    textColor: "#39C89A",
    darkShadowColor: "#D2EBDC",
    lightShadowColor: "#FFFFFF",
  },
} satisfies Record<DelegationStatus, { label: string; bgColor: string; textColor: string; darkShadowColor: string; lightShadowColor: string }>;

function StatusBadge({ status }: { status: DelegationStatus }) {
  const tone = statusTone[status];

  return (
    <DeltaBadge
      value={tone.label}
      height={24}
      radius={12}
      bgColor={tone.bgColor}
      textColor={tone.textColor}
      darkShadowColor={tone.darkShadowColor}
      lightShadowColor={tone.lightShadowColor}
      textStyle={styles.statusText}
    />
  );
}

function TimerPill() {
  return (
    <NeumorphicInnerShadowCard
      fullWidth={false}
      height={26}
      borderRadius={13}
      backgroundColor="#F4FFF9"
      containerStyle={styles.timerOuter}
      contentStyle={styles.timerInner}
      darkShadowColor="#D2EBDC"
      lightShadowColor="#FFFFFF"
    >
      <Text style={styles.timerText}>{TIMER_TEXT}</Text>
    </NeumorphicInnerShadowCard>
  );
}

function DelegationTaskCard({
  task,
  onAssign,
  onReassign,
  onEscalate,
}: {
  task: DelegationTask;
  onAssign: () => void;
  onReassign: () => void;
  onEscalate: () => void;
}) {
  return (
    <NeumorphicCard
      borderRadius={10}
      backgroundColor={COLORS.INNER_SURFACE}
      outerStyle={styles.taskCard}
      innerStyle={styles.taskCardInner}
    >
      <View style={styles.cardTitleRow}>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {task.title}
        </Text>
        <TimerPill />
      </View>

      <View style={styles.patientRow}>
        <Image source={DoctorTempImage} style={styles.patientAvatar} />
        <Text style={styles.patientName} numberOfLines={1}>
          {task.patientName}
        </Text>
        <Text style={styles.patientMeta}>- Age {task.age}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.assigneeRow}>
        <Image source={DoctorTempImage} style={styles.assigneeAvatar} />
        <View style={styles.assigneeTextWrap}>
          <Text style={styles.assigneeName} numberOfLines={1}>
            {task.assignee}
          </Text>
          <Text style={styles.dueText} numberOfLines={1}>
            {task.dueText}
          </Text>
        </View>
        <StatusBadge status={task.status} />
      </View>

      <View style={styles.actionRow}>
        <View style={styles.actionItem}>
          <ReusableButton
            title="Assign"
            height={34}
            borderRadius={17}
            width="100%"
            textStyle={styles.assignText}
            onPress={onAssign}
          />
        </View>
        <View style={styles.actionItem}>
          <AppButton
            text="Reassign"
            height={34}
            borderRadius={17}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            textStyle={styles.reassignText}
            onPress={onReassign}
          />
        </View>
        <View style={styles.actionItem}>
          <AppButton
            text="Escalate"
            height={34}
            borderRadius={17}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={COLORS.INNER_SURFACE}
            textStyle={styles.escalateText}
            onPress={onEscalate}
          />
        </View>
      </View>
    </NeumorphicCard>
  );
}

const DelegationHome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<DelegationFlowParamList>>();
  const appNavigation = navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();
  const [activeFilter, setActiveFilter] = useState<DelegationFilter>("all");
  const { width: sw, height: sh } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availH = sh - insets.top - insets.bottom - HEADER_H;
  const orbitH = Math.max(360, Math.round(availH * 0.54));
  const bottomPad = Math.max(insets.bottom, 12) + 18;

  const visibleTasks = useMemo(() => {
    if (activeFilter === "all") return DELEGATION_TASKS;
    return DELEGATION_TASKS.filter((task) => task.filter === activeFilter);
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, { minHeight: HEADER_H }]}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Delegation</Text>
          <IconComponent
            icon={<AddIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => { }}
          />
        </View>

        <OrbitCluster
          orbitH={orbitH}
          sw={sw}
          nodes={DELEGATION_NODES}
          centerLabel="Dr.Twin"
          centerImageSource={DoctorTempImage}
          centerOverlaySource={OverlayImage}
          centerLabelStyle={styles.drTwinLabel}
          renderNode={({ node, sx, btnSize }) => {
            const iconSize = Math.round(26 * sx);
            const innerD = Math.round(btnSize * 0.82);

            return (
              <>
                <NeumorphicQuickActionTile
                  onPress={() => { }}
                  icon={<MaterialCommunityIcons name={node.icon} size={iconSize} color={node.iconColor} />}
                  label={node.label}
                  badge={node.badge}
                  outerDiameter={btnSize}
                  innerShadowDiameter={innerD}
                  innerShadowBorderRadius={Math.round(innerD / 2)}
                  containerStyle={styles.quickTileContainer}
                  badgeTextStyle={{
                    fontSize: Math.round(9 * sx),
                    fontWeight: "700",
                    fontFamily: "SF-Pro-Display-Semibold",
                  }}
                />
                <Text style={styles.nodeSubLabel} numberOfLines={2}>
                  {node.subLabel}
                </Text>
              </>
            );
          }}
        />

        <FlatList
          data={FILTERS}
          horizontal
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.filtersRow}
          ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
          renderItem={({ item }) => (
            <FilterChip
              title={item.label}
              selected={activeFilter === item.key}
              onPress={() => setActiveFilter(item.key)}
              height={40}
              borderRadius={114}
              selectedTextStyle={styles.filterSelectedText}
              textStyle={styles.filterText}
            />
          )}
        />

        <View style={styles.taskList}>
          {visibleTasks.map((task) => (
            <DelegationTaskCard
              key={task.id}
              task={task}
              onAssign={() =>
                navigation.navigate(navigationStrings.DELEGATION_ASSIGN_TASK, { mode: "assign" })
              }
              onReassign={() =>
                navigation.navigate(navigationStrings.DELEGATION_REASSIGN_TASK, { mode: "reassign" })
              }
              onEscalate={() => navigation.navigate(navigationStrings.DELEGATION_ESCALATE_MESSAGE)}
            />
          ))}
        </View>

      </ScrollView>

      <View style={styles.viewInboxButtonContainer}>
        <AppButton
          text="View Task Inbox"
          height={48}
          borderRadius={24}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.INNER_SURFACE}
          textStyle={styles.viewInboxText}
          style={styles.viewInboxButton}
          onPress={() => appNavigation?.navigate(navigationStrings.TASK_INBOX)}
        />
      </View>
    </SafeAreaView>
  );
};

const Delegation = () => (
  <DelegationStack.Navigator screenOptions={{ headerShown: false }}>
    <DelegationStack.Screen name={DELEGATION_HOME_ROUTE} component={DelegationHome} />
    <DelegationStack.Screen
      name={navigationStrings.DELEGATION_ASSIGN_TASK}
      component={DelegationTaskAssignment}
    />
    <DelegationStack.Screen
      name={navigationStrings.DELEGATION_REASSIGN_TASK}
      component={DelegationTaskAssignment}
    />
    <DelegationStack.Screen
      name={navigationStrings.DELEGATION_ESCALATE_MESSAGE}
      component={DelegationEscalateMessage}
    />
    <DelegationStack.Screen
      name={navigationStrings.DELEGATION_ACTION_COMPLETED}
      component={DelegationActionCompleted}
    />
  </DelegationStack.Navigator>
);

export default Delegation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 4,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  drTwinLabel: {
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  quickTileContainer: {
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  nodeSubLabel: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 14,
    fontFamily: "SF-Pro-Display-Regular",
    color: COLORS.TEXT_60,
    textAlign: "center",
  },
  filtersRow: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
  },
  filterSeparator: {
    width: 10,
  },
  filterText: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  taskList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  taskCard: {
    width: "100%",
  },
  taskCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  taskTitle: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  timerOuter: {
    alignSelf: "flex-start",
  },
  timerInner: {
    minWidth: 72,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    color: COLORS.PRIMARY,
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    letterSpacing: 0.5,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  patientAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
    resizeMode: "cover",
  },
  patientName: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  patientMeta: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    color: COLORS.TEXT_60,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 12,
  },
  assigneeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  assigneeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: "cover",
  },
  assigneeTextWrap: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  assigneeName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  dueText: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    color: COLORS.TEXT_60,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 14,
  },
  actionItem: {
    flex: 1,
    minWidth: 0,
  },
  assignText: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  reassignText: {
    color: COLORS.PRIMARY,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  escalateText: {
    color: COLORS.ALERT,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  viewInboxButton: {
  },
  viewInboxText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  viewInboxButtonContainer: {
    marginTop: 16,
    marginHorizontal: 16
  },
});
