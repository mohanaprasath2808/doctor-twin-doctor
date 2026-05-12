import React, { useMemo, useState } from "react";
import { FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import PatientAvatarImage from "../../../assets/image/patientGaneshTemp.png";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { DelegationFlowParamList } from "./delegationTypes";

type AssignmentRouteName = "DelegationAssignTask" | "DelegationReassignTask";
type StaffStatus = "online" | "availableSoon" | "returnsTomorrow" | "onBreak";

type StaffMember = {
  id: string;
  name: string;
  role: string;
  status: StaffStatus;
  avatar: typeof DoctorTempImage;
};

const STAFF_LIST: StaffMember[] = [
  { id: "eva", name: "Eva", role: "Nurse", status: "online", avatar: DoctorTempImage },
  { id: "jenn", name: "Jenn P", role: "Assistant staff", status: "availableSoon", avatar: PatientAvatarImage },
  { id: "annie-ward", name: "Annie", role: "Ward Boy", status: "returnsTomorrow", avatar: DoctorTempImage },
  { id: "annie-medical", name: "Annie", role: "Medical Assistant", status: "onBreak", avatar: DoctorTempImage },
];

const statusConfig = {
  online: {
    label: "Online",
    bgColor: "#D3FFF1",
    textColor: "#21C683",
    darkShadowColor: "#B8E3CC",
  },
  availableSoon: {
    label: "Available soon",
    bgColor: "#FFF8D9",
    textColor: "#D49A1E",
    darkShadowColor: "#F0E2A6",
  },
  returnsTomorrow: {
    label: "Returns Tomorrow",
    bgColor: "#FFF8D9",
    textColor: "#D49A1E",
    darkShadowColor: "#F0E2A6",
  },
  onBreak: {
    label: "On Break Now",
    bgColor: "#FDECEC",
    textColor: COLORS.ALERT,
    darkShadowColor: "#F2CACA",
  },
} satisfies Record<StaffStatus, { label: string; bgColor: string; textColor: string; darkShadowColor: string }>;

function StaffStatusBadge({ status }: { status: StaffStatus }) {
  const tone = statusConfig[status];

  return (
    <DeltaBadge
      value={tone.label}
      height={24}
      radius={12}
      bgColor={tone.bgColor}
      textColor={tone.textColor}
      darkShadowColor={tone.darkShadowColor}
      lightShadowColor="#FFFFFF99"
      textStyle={styles.statusText}
    />
  );
}

const DelegationTaskAssignment = () => {
  const navigation = useNavigation<NativeStackNavigationProp<DelegationFlowParamList>>();
  const route = useRoute<RouteProp<DelegationFlowParamList, AssignmentRouteName>>();
  const insets = useSafeAreaInsets();
  const mode = route.params?.mode ?? "assign";
  const isReassign = mode === "reassign";
  const [selectedId, setSelectedId] = useState(STAFF_LIST[0].id);
  const [notes, setNotes] = useState("");

  const selectedStaff = useMemo(
    () => STAFF_LIST.find((staff) => staff.id === selectedId) ?? STAFF_LIST[0],
    [selectedId],
  );

  const bottomPad = Math.max(insets.bottom, 12) + 8;
  const headerTitle = isReassign ? "Reassign Task" : "Assign Task";
  const fieldTitle = isReassign ? "Reason for reassign" : "Your Notes";
  const inputLabel = isReassign ? "Reason" : undefined;
  const placeholder = isReassign ? "Enter reason" : "Enter notes";
  const buttonTitle = isReassign ? "Reassign Task" : "Assign Task";

  const completeAssignment = () => {
    navigation.navigate(navigationStrings.DELEGATION_ACTION_COMPLETED, {
      title: isReassign ? "Reassigned Successfully" : "Task Assigned",
      description: `Task has been assigned to ${selectedStaff.name} successfully`,
      buttonText: isReassign ? "Back to Tasks" : "View Task",
      showTimer: !isReassign,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.mainColumn}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 82 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <IconComponent
                icon={<BackArrowIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerTitle}>{headerTitle}</Text>
              <View style={styles.headerSpacer} />
            </View>

            {isReassign ? (
              <NeumorphicCard
                borderRadius={12}
                backgroundColor={COLORS.INNER_SURFACE}
                outerStyle={styles.sectionOuter}
                innerStyle={styles.currentAssigneeInner}
              >
                <Text style={styles.sectionTitle}>Current assignee</Text>
                <View style={styles.currentAssigneeRow}>
                  <Image source={PatientAvatarImage} style={styles.currentAvatar} />
                  <View>
                    <Text style={styles.staffName}>Rebecca K</Text>
                    <Text style={styles.staffRole}>Staff</Text>
                  </View>
                </View>
              </NeumorphicCard>
            ) : null}

            <NeumorphicCard
              borderRadius={12}
              backgroundColor={COLORS.INNER_SURFACE}
              outerStyle={styles.sectionOuter}
              innerStyle={styles.listInner}
            >
              <Text style={styles.sectionTitle}>List of Staff</Text>
              <FlatList
                data={STAFF_LIST}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({ item }) => (
                  <Pressable style={styles.staffRow} onPress={() => setSelectedId(item.id)}>
                    <NeumorphicRadioMark selected={selectedId === item.id} />
                    <Image source={item.avatar} style={styles.staffAvatar} />
                    <View style={styles.staffText}>
                      <Text style={styles.staffName}>{item.name}</Text>
                      <Text style={styles.staffRole}>{item.role}</Text>
                    </View>
                    <StaffStatusBadge status={item.status} />
                  </Pressable>
                )}
              />
            </NeumorphicCard>

            <NeumorphicCard
              borderRadius={12}
              backgroundColor={COLORS.INNER_SURFACE}
              outerStyle={styles.sectionOuter}
              innerStyle={styles.notesSectionInner}
            >
              <Text style={styles.sectionTitle}>{fieldTitle}</Text>
              {inputLabel ? <Text style={styles.inputLabel}>{inputLabel}</Text> : null}
              <InputField
                value={notes}
                onChangeText={setNotes}
                placeholder={placeholder}
                multiline
                numberOfLines={6}
                minHeight={120}
                borderRadius={10}
                containerStyle={styles.notesInput}
                style={styles.notesInputField}
              />
            </NeumorphicCard>
          </View>
        </ScrollView>
      </View>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title={buttonTitle}
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={completeAssignment}
        />
      </View>
    </SafeAreaView>
  );
};

export default DelegationTaskAssignment;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  mainColumn: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
  container: { paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { marginBottom: 20 },
  currentAssigneeInner: { paddingHorizontal: 12, paddingVertical: 12 },
  currentAssigneeRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  currentAvatar: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  listInner: { paddingHorizontal: 12, paddingTop: 14, paddingBottom: 4 },
  notesSectionInner: { paddingHorizontal: 10, paddingTop: 12, paddingBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_DARK },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20 },
  staffRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 11 },
  staffAvatar: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  staffText: { flex: 1, minWidth: 0 },
  staffName: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  staffRole: { marginTop: 3, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  statusText: { fontSize: 11, fontWeight: "600" },
  inputLabel: { marginTop: 16, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  notesInput: { marginTop: 10 },
  notesInputField: { fontSize: 14, fontWeight: "400" },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.INNER_SURFACE },
});
