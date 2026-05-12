import React, { useMemo, useState } from "react";
import { FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type Nurse = {
  id: string;
  name: string;
  role: string;
  avatar: typeof DoctorTempImage;
};

const NURSES: Nurse[] = [
  { id: "eva", name: "Eva", role: "Nurse", avatar: PatientAvatarImage },
  { id: "jenn", name: "Jenn P", role: "Assistant staff", avatar: PatientAvatarImage },
  { id: "annie-ward", name: "Annie", role: "Ward Boy", avatar: DoctorTempImage },
  { id: "annie-medical", name: "Annie", role: "Medical Assistant", avatar: DoctorTempImage },
];

const AssignNurse = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(NURSES[0].id);
  const [notes, setNotes] = useState("");

  const selectedNurse = useMemo(
    () => NURSES.find((nurse) => nurse.id === selectedId) ?? NURSES[0],
    [selectedId],
  );

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
            <Text style={styles.headerTitle}>Assign Nurse</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.patientCardInner}
          >
            <View style={styles.patientRow}>
              <Image source={DoctorTempImage} style={styles.patientAvatar} />
              <View style={styles.patientText}>
                <Text style={styles.patientName}>Michelle Lewis</Text>
                <Text style={styles.meta}>Female  •  Age 45</Text>
                <Text style={styles.dueText}>Due Today 03:00 PM</Text>
              </View>
              <DeltaBadge
                value="Critical"
                height={26}
                radius={13}
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
            <Text style={styles.sectionTitle}>List of Staff</Text>
            <FlatList
              data={NURSES}
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
                </Pressable>
              )}
            />
          </NeumorphicCard>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.notesOuter}
            innerStyle={styles.notesInner}
          >
            <Text style={styles.sectionTitle}>Your Notes</Text>
            <InputField
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter notes"
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

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title={selectedNurse ? "Assign Nurse" : "Assign Nurse"}
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() => { }}
          textStyle={styles.fillButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default AssignNurse;

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
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { marginBottom: 18 },
  patientCardInner: { paddingHorizontal: 10, paddingVertical: 12 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientAvatar: { width: 48, height: 48, borderRadius: 24, resizeMode: "cover" },
  patientText: { flex: 1, minWidth: 0 },
  patientName: { fontSize: 15, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  meta: { marginTop: 3, fontSize: 12, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_60 },
  dueText: { marginTop: 3, fontSize: 12, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_60 },
  badgeText: { fontSize: 11, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  listInner: { paddingHorizontal: 12, paddingTop: 14, paddingBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "500", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20 },
  staffRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 11 },
  staffAvatar: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  staffText: { flex: 1, minWidth: 0 },
  staffName: { fontSize: 14, fontWeight: "500", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  staffRole: { marginTop: 3, fontSize: 12, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular", color: COLORS.TEXT_70 },
  notesOuter: { marginBottom: 20 },
  notesInner: { paddingHorizontal: 10, paddingTop: 12, paddingBottom: 16 },
  notesInput: { marginTop: 10 },
  notesInputField: { fontSize: 14, fontWeight: "400", fontFamily: "SF-Pro-Display-Regular" },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.INNER_SURFACE },
  fillButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
