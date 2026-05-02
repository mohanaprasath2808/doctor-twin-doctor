import React, { useMemo, useState } from "react";
import { FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type Staff = {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeType?: "critical" | "urgent";
};

const STAFF: Staff[] = [
  { id: "eva", name: "Eva", subtitle: "Critical tomorrow" },
  { id: "jenn", name: "Jenn P", subtitle: "Urgent today", badge: "Urgent today", badgeType: "urgent" },
  { id: "annie-1", name: "Annie", subtitle: "Routine Monday" },
  { id: "annie-2", name: "Annie", subtitle: "Routine Monday" },
];

const SchedulingAssignTask = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(STAFF[0].id);
  const [notes, setNotes] = useState("");

  const selectedStaff = useMemo(
    () => STAFF.find((s) => s.id === selectedId) ?? STAFF[0],
    [selectedId],
  );

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
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
            <Text style={styles.headerTitle}>Assign Task</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={[styles.sectionOuter, { height: 80 }]} innerStyle={[styles.sectionInner, { height: 80 }]}>
            <View style={styles.patientRow}>
              <Image source={DoctorTempImage} style={styles.patientAvatar} />
              <View style={styles.patientText}>
                <Text style={styles.patientName}>Michelle Lewis</Text>
                <Text style={styles.meta}>Female • Age 45</Text>
                <Text style={styles.due}>Due Today 03:00 PM</Text>
              </View>
              <DeltaBadge
                value="Critical"
                height={28}
                radius={14}
                bgColor="#FDECEC"
                darkShadowColor={"#F2CACA"}
                lightShadowColor="#F2CACA"
                textColor="#FF6B6B"
                textStyle={styles.badgeText}
              />
            </View>
          </NeumorphicCard>

          <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.listInner}>
            <FlatList
              data={STAFF}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              renderItem={({ item }) => (
                <Pressable style={styles.staffRow} onPress={() => setSelectedId(item.id)}>
                  <NeumorphicRadioMark selected={selectedId === item.id} />
                  <Image source={DoctorTempImage} style={styles.staffAvatar} />
                  <View style={styles.staffText}>
                    <Text style={styles.staffName}>{item.name}</Text>
                    {item.badge ? (
                      <DeltaBadge
                        value={item.badge}
                        height={28}

                        radius={14}
                        bgColor="#FDECEC"
                        darkShadowColor={"#F2CACA"}
                        lightShadowColor="#F2CACA"
                        textColor="#FF6B6B"
                        textStyle={styles.badgeText}
                      />
                    ) : (
                      <Text style={styles.staffSub}>{item.subtitle}</Text>
                    )}
                  </View>
                </Pressable>
              )}
            />
          </NeumorphicCard>

          <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
            <Text style={styles.notesTitle}>Your Notes</Text>
            <InputField
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter notes"
              containerStyle={styles.notesInput}
              borderRadius={10}
            />
          </NeumorphicCard>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title={selectedStaff ? "Assign Task" : "Assign Task"}
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() => navigation.navigate(navigationStrings.SCHEDULING_NOTIFY_PATIENT)}
        />
      </View>
    </SafeAreaView>
  );
};

export default SchedulingAssignTask;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
  container: { paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
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
  sectionInner: { paddingHorizontal: 12, paddingVertical: 12 },
  listInner: { paddingHorizontal: 12, paddingVertical: 6 },
  patientRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, height: "100%" },
  patientAvatar: { width: 60, height: 60, borderRadius: 29 },
  patientText: { flex: 1, height: "100%", flexDirection: "column", justifyContent: "center" },
  patientName: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  meta: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  due: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20 },
  staffRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10 },
  staffAvatar: { width: 40, height: 40, borderRadius: 20 },
  staffText: { flex: 1, minWidth: 0 },
  staffName: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  staffSub: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  urgentBadgeText: { fontSize: 12, fontWeight: "600" },
  notesTitle: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_DARK },
  notesInput: { marginTop: 8 },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.INNER_SURFACE },
});
