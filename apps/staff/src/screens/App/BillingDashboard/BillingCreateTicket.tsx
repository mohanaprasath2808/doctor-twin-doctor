import React, { useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import PlusIcon from "../../../assets/icon/greenPlusIcon.svg";
import BillingIssueTypeBottomSheetModal from "../../../components/BottomSheets/BillingIssueTypeBottomSheetModal";
import AppButton from "../../../components/Common/AppButton";
import FilterChip from "../../../components/Common/FilterChip";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";

const BG = COLORS.INNER_SURFACE;

const PRIORITIES = ["Low", "Medium", "High"] as const;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.BILLING_CREATE_TICKET>;

const BillingCreateTicket = ({ route, navigation }: Props) => {
  const item = route.params.item;
  const insets = useSafeAreaInsets();
  const issueSheetRef = useRef<BSModal>(null);
  const [issueType, setIssueType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>("Low");

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Create Ticket</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.column}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.content, { paddingBottom: 16 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {header}

            <PatientDetailCard item={item} outerStyle={styles.patientCardOuter} />

            <NeumorphicCard borderRadius={10} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.blockTitle}>Ticket details</Text>
              <Text style={styles.fieldLabel}>Issue Type</Text>
              <Pressable onPress={() => issueSheetRef.current?.present()}>
                <View pointerEvents="none">
                  <InputField
                    value={issueType ?? ""}
                    editable={false}
                    placeholder="Select type"
                    rightIcon={<MaterialCommunityIcons name="chevron-down" size={18} color={COLORS.TEXT_60} />}
                    borderRadius={64}
                    height={46}
                    isFocused={false}
                    containerStyle={styles.inputNoTop}
                  />
                </View>
              </Pressable>

              <Text style={styles.fieldLabelSpaced}>Description</Text>
              <InputField
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={6}
                minHeight={120}
                borderRadius={10}
                isFocused={false}
                containerStyle={styles.inputNoTop}
                placeholder="Write description"
              />
            </NeumorphicCard>

            <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.blockTitle}>Priority</Text>
              <View style={styles.priorityRow}>
                {PRIORITIES.map((p) => (
                  <FilterChip key={p} title={p} selected={priority === p} onPress={() => setPriority(p)} />
                ))}
              </View>
            </NeumorphicCard>

            <NeumorphicCard borderRadius={10} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.blockTitle}>Attachments</Text>
              <Text style={styles.fieldLabel}>Attachments</Text>
              <AppButton
                text="Attach file"
                leftIcon={<PlusIcon />}
                iconSize={18}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                textStyle={styles.attachText}
                height={46}
                borderRadius={60}
                onPress={() => { }}
              />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Create Ticket"
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigation.navigate(navigationStrings.BILLING_ACTION_COMPLETED, {
                  title: "Action completed",
                  description: "Ticket has been created successfully",
                  buttonText: "Back to Billing",
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <BillingIssueTypeBottomSheetModal
        ref={issueSheetRef}
        selectedIssueType={issueType}
        onSelectDone={(value) => setIssueType(value)}
      />
    </SafeAreaView>
  );
};

export default BillingCreateTicket;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  keyboardRoot: { flex: 1 },
  column: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, flexGrow: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 10,
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
  patientCardOuter: { marginTop: 20 },
  sectionOuter: { width: "100%", marginTop: 14 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 14 },
  blockTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-M edium",
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 6,
  },
  fieldLabelSpaced: {
    marginTop: 12,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 6,
  },
  inputNoTop: { marginTop: 0 },
  priorityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  attachText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
