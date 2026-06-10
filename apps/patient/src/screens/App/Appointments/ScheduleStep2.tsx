import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import type { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import StepProgressRow from "../../../components/Common/StepProgressRow";
import IconComponent from "../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import SelectSimpleSheet from "../../../components/BottomSheets/SelectSimpleSheet";
import NeumorphicRadioMark from "../../../neomorphism/NeumorphicRadioMark";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import { AppContext } from "../../../context/AppContext";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";

const CATEGORY_OPTIONS = ["Primary Care", "Dermatology", "Pediatrics", "Cardiology", "Orthopedics"];


const APPOINTMENT_TYPES: { value: string; label: string }[] = [
  { value: "physical_exam", label: "Physical Exam (PE)" },
  { value: "follow_up", label: "Follow Up (FU)" },
  { value: "new_patient", label: "New Patient (NP)" },
  { value: "pre_op", label: "Pre-Op (PO)" },
  { value: "hospital_follow_up", label: "Hospital Follow-Up (HOSFU)" },
  { value: "pap_smear", label: "Pap Smear (PS)" },
  { value: "specific_problem", label: "Specific Problem (SP)" },
  { value: "telemedicine", label: "Telemedicine (TELMED)" },
  { value: "weight_loss_club", label: "Weight Loss Club (WLC)" },
];

const ScheduleStep2 = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const toast = useToast();
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("ScheduleStep2 must be used within AppContextProvider");
  }
  const { createAppointment } = appContext;

  const appointmentId: string | undefined = route?.params?.appointmentId;
  const categorySheetRef = useRef<BSModal>(null);
  const snapPoints = useMemo(() => ["45%"], []);

  const [category, setCategory] = useState(CATEGORY_OPTIONS[0] ?? "");
  const [appointmentType, setAppointmentType] = useState<string>("pe");
  const [submitting, setSubmitting] = useState(false);

  const categoryItems = useMemo(
    () => CATEGORY_OPTIONS.map((c) => ({ id: c, label: c })),
    [],
  );
  

  const onPickCategory = useCallback((pickedId: string) => {
    setCategory(pickedId);
  }, []);

  const onNext = useCallback(async () => {
    const apptId = String(appointmentId ?? "").trim();
    const categoryValue = String(category ?? "").trim();
    const appointmentTypeLabel =
      APPOINTMENT_TYPES.find((t) => t.value === appointmentType)?.label ?? "";

    if (!apptId) {
      toast.show("Appointment ID missing. Please restart scheduling.", { type: "danger" });
      navigation.navigate(navigationStrings.SCHEDULE_STEP_1);
      return;
    }
    if (!categoryValue) {
      toast.show("Please select category.", { type: "danger" });
      return;
    }
    if (!appointmentTypeLabel) {
      toast.show("Please select appointment type.", { type: "danger" });
      return;
    }

    setSubmitting(true);
    const res = await createAppointment({
      step: 2,
      appointment_id: apptId,
      category: categoryValue,
      appointment_type: appointmentTypeLabel,
    });
    setSubmitting(false);

    if (!res.ok) {
      toast.show(res.error || "Something went wrong.", { type: "danger" });
      return;
    }

    navigation.navigate(navigationStrings.SCHEDULE_STEP_3, {
      appointmentId: apptId,
      reason: route?.params?.reason,
      provider_name: route?.params?.provider_name,
      category: categoryValue,
      appointment_type: appointmentTypeLabel,
    });
  }, [appointmentId, appointmentType, category, createAppointment, navigation, route?.params, toast]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>Schedule Appointment</Text>
        </View>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StepProgressRow
          totalSteps={3}
          currentStep={2}
          onStepPress={(step) => {
            if (step === 1) {
              navigation.navigate(navigationStrings.SCHEDULE_STEP_1);
            }
            if (step === 3) {
              navigation.navigate(navigationStrings.SCHEDULE_STEP_3);
            }
          }}
          containerStyle={styles.progressRow}
          segmentHeight={12}
          segmentBorderRadius={12}
          activeGradientColors={["#14B8D4", "#0E7490"]}
          activeShadowColor="#C1D5EE"
          activeShadowOpacity={0.3}
          activeShadowRadius={4}
          activeShadowOffset={{ width: 2, height: 2 }}
        />

        <Text style={styles.stepText}>Step 2</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.cardTitle}>Category</Text>
          <Pressable
            onPress={() => categorySheetRef.current?.present()}
            style={({ pressed }) => [styles.dropdownPress, pressed && styles.dropdownPressPressed]}
          >
            <View pointerEvents="none">
              <InputField
                value={category}
                editable={false}
                placeholder="Select category"
                rightIcon={<DropDownIcon width={10} height={10} />}
                onRightIconPress={() => categorySheetRef.current?.present()}
                containerStyle={styles.categoryFieldContainer}
                borderRadius={64}
                height={38}
              />
            </View>
          </Pressable>
        </NeumorphicCard>

        <Text style={styles.sectionTitle}>Appointment Type</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.radioCardInner} borderRadius={10}>
          {APPOINTMENT_TYPES.map((opt, idx) => {
            const selected = appointmentType === opt.value;
            return (
              <View key={opt.value}>
                <Pressable
                  onPress={() => setAppointmentType(opt.value)}
                  style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
                >
                  <NeumorphicRadioMark selected={selected} />
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                </Pressable>
                {idx < APPOINTMENT_TYPES.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title={submitting ? "Loading..." : "Next"}
          height={48}
          borderRadius={25}
          width="100%"
          gradientColors={["#22D3EE", "#0F766E"]}
          backgroundColor={COLORS.PRIMARY}
          disabled={submitting}
          onPress={onNext}
          containerStyle={styles.doneBtn}
        />
      </View>

      <SelectSimpleSheet
        ref={categorySheetRef as any}
        title="Select Category"
        items={categoryItems}
        selectedId={category || null}
        onConfirm={onPickCategory}
      />
    </SafeAreaView>
  );
};

export default ScheduleStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  headerRow: {
    marginTop: Platform.OS === "ios" ? 8 : 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 40,
    height: 40,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  progressRow: {
    marginTop: 20,
  },
  stepText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  cardOuter: {
    marginTop: 16,
    width: "100%",
    alignSelf: "stretch",
  },
  cardInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  dropdownPress: {
    marginTop: 8,
    width: "100%",
    borderRadius: 64,
  },
  dropdownPressPressed: {
    opacity: 0.92,
  },
  categoryFieldContainer: {
    marginTop: 0,
    width: "100%",
  },
  radioCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  optionRowPressed: {
    opacity: 0.88,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    paddingHorizontal: 16,
  },
  doneBtn: {
    alignSelf: "stretch",
  },
});
