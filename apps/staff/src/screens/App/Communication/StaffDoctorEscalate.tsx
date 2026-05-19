import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import SelectPrioritySheet from "../../../components/BottomSheets/SelectPrioritySheet";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import DownArrowIcon from "../../../assets/icon/downArrowIcon.svg";
const STATIC_NAME = "Seffesa";
const STATIC_ROLE = "MA";
const STATIC_SUBTEXT = "Patient passes";

const STAFF_OPTIONS = [
  { id: "eva", name: "Eva", role: "Nurse" },
  { id: "jenn", name: "Jenn P", role: "PA" },
  { id: "annie-billing", name: "Annie", role: "Billing" },
  { id: "dr-annie", name: "Dr. Annie", role: "Doctor" },
] as const;

const REASON_MIN_HEIGHT = 120;
const REASON_MAX_HEIGHT = 120;

const StaffDoctorEscalate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const prioritySheetRef = useRef<BSModal>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const bottomPad = Math.max(insets.bottom, 12) + 12;
  const noop = useCallback(() => {}, []);

  const toggleStaff = useCallback((id: string) => {
    setSelectedStaffId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.body}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View style={styles.header}>
              <IconComponent
                icon={<BackArrowIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerTitle}>Escalate</Text>
              <View style={styles.headerSpacer} />
            </View>

            <NeumorphicCard
              borderRadius={10}
              backgroundColor={COLORS.INNER_SURFACE}
              outerStyle={styles.sectionOuter}
              innerStyle={styles.sectionInner}
            >
              <View style={styles.senderRow}>
                <Image source={DoctorTempImage} style={styles.avatar} />
                <View style={styles.senderTextWrap}>
                  <Text style={styles.senderName}>
                    {STATIC_NAME} <Text style={styles.roleText}>({STATIC_ROLE})</Text>
                  </Text>
                  <Text style={styles.subText}>{STATIC_SUBTEXT}</Text>
                </View>
              </View>
            </NeumorphicCard>

            <NeumorphicCard
              borderRadius={10}
              backgroundColor={COLORS.INNER_SURFACE}
              outerStyle={styles.sectionOuter}
              innerStyle={styles.listInner}
            >
              <FlatList
                data={[...STAFF_OPTIONS]}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({ item }) => (
                  <Pressable style={styles.staffRow} onPress={() => toggleStaff(item.id)}>
                    <NeumorphicRadioMark selected={selectedStaffId === item.id} />
                    <Image source={DoctorTempImage} style={styles.staffAvatar} />
                    <View style={styles.staffTextWrap}>
                      <Text style={styles.staffName}>{item.name}</Text>
                      <Text style={styles.staffRole}>{item.role}</Text>
                    </View>
                  </Pressable>
                )}
              />
            </NeumorphicCard>

            <NeumorphicCard
              borderRadius={10}
              backgroundColor={COLORS.INNER_SURFACE}
              outerStyle={styles.sectionOuter}
              innerStyle={styles.sectionInner}
            >
              <Text style={styles.fieldLabel}>Priority</Text>
              <Pressable onPress={() => prioritySheetRef.current?.present()}>
                <View pointerEvents="none">
                  <InputField
                    value={priority ?? ""}
                    editable={false}
                    placeholder="Select priority"
                    rightIcon={<DownArrowIcon width={12} height={12} />}
                    borderRadius={22}
                    minHeight={40}
                    isFocused={false}
                    containerStyle={styles.priorityInput}
                  />
                </View>
              </Pressable>

              <Text style={[styles.fieldLabel, { marginTop: 20 }]}>Reason for escalation</Text>
              <InputField
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={5}
                minHeight={REASON_MIN_HEIGHT}
                borderRadius={10}
                containerStyle={styles.reasonInput}
                style={styles.reasonInputField}
                placeholder="Write about Reason for escalation"
              />
            </NeumorphicCard>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          <ReusableButton
            title="Escalate Now"
            height={52}
            borderRadius={26}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            onPress={noop}
            textStyle={styles.escalateBtnText}
          />
        </View>
      </View>

      <SelectPrioritySheet
        ref={prioritySheetRef}
        selectedValue={priority}
        onSelectDone={setPriority}
      />
    </SafeAreaView>
  );
};

export default StaffDoctorEscalate;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
  keyboardAvoid: {
    flex: 1,
    minHeight: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  sectionOuter: {
    width: "100%",
    marginBottom: 16,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  listInner: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  senderTextWrap: {
    flex: 1,
    marginLeft: 10,
    minWidth: 0,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Medium",
  },
  subText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
  },
  staffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  staffAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  staffTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  staffName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  staffRole: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  fieldLabelWithTop: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_60,
  },
  priorityInput: {
    marginTop: 6,
  },
  reasonInput: {
    marginTop: 6,
  },
  reasonInputField: {
    maxHeight: REASON_MAX_HEIGHT,
    textAlignVertical: "top",
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
  },
  footer: {
    flexShrink: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  escalateBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
