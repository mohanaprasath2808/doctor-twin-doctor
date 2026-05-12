import React, { useRef, useState } from "react";
import { FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import PatientAvatarImage from "../../../assets/image/patientGaneshTemp.png";
import LocationBottomSheetModal from "../../../components/BottomSheets/LocationBottomSheetModal";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { DelegationFlowParamList } from "./delegationTypes";

type Doctor = {
  id: string;
  name: string;
  avatar: typeof DoctorTempImage;
};

const DOCTORS: Doctor[] = [
  { id: "eva", name: "Dr. Eva", avatar: DoctorTempImage },
  { id: "jenn", name: "Dr. Jenn P", avatar: PatientAvatarImage },
  { id: "annie-1", name: "Dr. Annie", avatar: DoctorTempImage },
  { id: "annie-2", name: "Dr. Annie", avatar: DoctorTempImage },
];

const PRIORITIES = ["Low", "Medium", "High", "Critical"];

const DelegationEscalateMessage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<DelegationFlowParamList>>();
  const insets = useSafeAreaInsets();
  const prioritySheetRef = useRef<BSModal>(null);
  const [selectedId, setSelectedId] = useState(DOCTORS[0].id);
  const [priority, setPriority] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
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
            <Text style={styles.headerTitle}>Escalate Message</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.patientInner}
          >
            <View style={styles.patientRow}>
              <Image source={PatientAvatarImage} style={styles.patientAvatar} />
              <View style={styles.patientText}>
                <Text style={styles.patientName}>Michelle Lewis</Text>
                <Text style={styles.meta}>Female - Age 45</Text>
              </View>
              <DeltaBadge
                value="Critical"
                height={28}
                radius={14}
                bgColor="#FDECEC"
                darkShadowColor="#F2CACA"
                lightShadowColor="#F2CACA"
                textColor={COLORS.ALERT}
                textStyle={styles.badgeText}
              />
            </View>
          </NeumorphicCard>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.listInner}
          >
            <FlatList
              data={DOCTORS}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              renderItem={({ item }) => (
                <Pressable style={styles.doctorRow} onPress={() => setSelectedId(item.id)}>
                  <NeumorphicRadioMark selected={selectedId === item.id} />
                  <Image source={item.avatar} style={styles.doctorAvatar} />
                  <Text style={styles.doctorName}>{item.name}</Text>
                </Pressable>
              )}
            />
          </NeumorphicCard>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.formInner}
          >
            <Text style={styles.label}>Priority</Text>
            <Pressable onPress={() => prioritySheetRef.current?.present()}>
              <View pointerEvents="none">
                <InputField
                  value={priority ?? ""}
                  editable={false}
                  placeholder="Select priority"
                  rightIcon={<MaterialCommunityIcons name="chevron-down" size={18} color={COLORS.TEXT_60} />}
                  borderRadius={64}
                  minHeight={48}
                  isFocused={false}
                  containerStyle={styles.priorityInput}
                />
              </View>
            </Pressable>

            <Text style={styles.labelWithTop}>Reason for escalation</Text>
            <InputField
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={6}
              minHeight={120}
              isFocused={false}
              borderRadius={10}
              style={styles.reasonInputField}
              containerStyle={styles.reasonInput}
              placeholder="Write about Reason for escalation"
            />
          </NeumorphicCard>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title="Escalate Now"
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() =>
            navigation.navigate(navigationStrings.DELEGATION_ACTION_COMPLETED, {
              title: "Action completed",
              description: "Escalation sent successfully",
              buttonText: "Back to Tasks",
            })
          }
        />
      </View>

      <LocationBottomSheetModal
        ref={prioritySheetRef}
        title="Select Priority"
        options={PRIORITIES}
        selectedValue={priority ?? PRIORITIES[0]}
        onSelectDone={(value) => setPriority(value)}
      />
    </SafeAreaView>
  );
};

export default DelegationEscalateMessage;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
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
  sectionOuter: { marginBottom: 18 },
  patientInner: { paddingHorizontal: 10, paddingVertical: 12 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientAvatar: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  patientText: { flex: 1, minWidth: 0 },
  patientName: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  meta: { marginTop: 3, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  listInner: { paddingHorizontal: 12, paddingVertical: 6 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20 },
  doctorRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 13 },
  doctorAvatar: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  doctorName: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  formInner: { paddingHorizontal: 10, paddingVertical: 14 },
  label: { fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  labelWithTop: { marginTop: 14, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  priorityInput: { marginTop: 6 },
  reasonInput: { marginTop: 6 },
  reasonInputField: { fontSize: 14, fontWeight: "400", color: COLORS.TEXT_40 },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.INNER_SURFACE },
});
