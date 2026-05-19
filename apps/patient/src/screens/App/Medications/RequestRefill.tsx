import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import NeumorphicRadioGroup from "../../../components/Common/NeumorphicRadioGroup";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import SelectSearchSheet from "../../../components/BottomSheets/SelectSearchSheet";
import SelectPharmacySheet from "../../../components/BottomSheets/SelectPharmacySheet";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import PharmacyChangeRow from "./components/PharmacyChangeRow";
import {
  DEFAULT_PHARMACY,
  fetchMedicationDetail,
  getPharmacyPickerItems,
} from "./MedicationDetail";
import type {
  MedicationDetail,
  RefillReason,
  RequestRefillParams,
} from "./types/medications.types";

const HORIZONTAL = 16;

/** Replace with API when integrated. */
const REFILL_MEDICATION_OPTIONS = [
  { id: "med-1", label: "Lisinopril 20 mg" },
  { id: "med-2", label: "Lexapro 30 mg" },
  { id: "med-3", label: "Lisinopril 20 mg" },
];

const REFILL_REASON_OPTIONS: { value: RefillReason; label: string }[] = [
  { value: "routine", label: "Routine refill" },
  { value: "ran_out", label: "Ran out" },
  { value: "traveling", label: "Traveling" },
  { value: "other", label: "Other" },
];
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const RequestRefill = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { medicationId } = (route.params ?? {}) as RequestRefillParams;

  const medicationSheetRef = useRef<BottomSheetModal>(null);
  const pharmacySheetRef = useRef<BottomSheetModal>(null);

  const [detail, setDetail] = useState<MedicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedicationId, setSelectedMedicationId] = useState(medicationId);
  const [selectedMedicationLabel, setSelectedMedicationLabel] = useState("");
  const [pharmacyId, setPharmacyId] = useState(DEFAULT_PHARMACY.id);
  const [pharmacyName, setPharmacyName] = useState(DEFAULT_PHARMACY.name);
  const [pharmacyAddress, setPharmacyAddress] = useState(DEFAULT_PHARMACY.address);
  const [reason, setReason] = useState<RefillReason>("routine");

  const medicationOptions = REFILL_MEDICATION_OPTIONS;

  const loadDetail = useCallback(async () => {
    setLoading(true);
    const result = await fetchMedicationDetail(medicationId);
    setDetail(result);
    if (result) {
      setSelectedMedicationId(result.id);
      setSelectedMedicationLabel(result.name);
      setPharmacyId(result.pharmacy.id);
      setPharmacyName(result.pharmacy.name);
      setPharmacyAddress(result.pharmacy.address);
    }
    setLoading(false);
  }, [medicationId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const onMedicationPicked = useCallback(
    async (id: string) => {
      setSelectedMedicationId(id);
      const picked = medicationOptions.find((m) => m.id === id);
      setSelectedMedicationLabel(picked?.label ?? "");
      const medDetail = await fetchMedicationDetail(id);
      if (medDetail) {
        setDetail(medDetail);
      }
    },
    [medicationOptions],
  );

  const onPharmacyConfirmed = useCallback((id: string) => {
    const picked = getPharmacyPickerItems().find((p) => p.id === id);
    if (!picked) return;
    setPharmacyId(id);
    const [name, ...rest] = picked.label.split(" - ");
    setPharmacyName(name);
    setPharmacyAddress(rest.join(" - ") || DEFAULT_PHARMACY.address);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Request Refill</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {detail ? (
          <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.heroInner} borderRadius={10}>
            <InnerShadowIcon
              icon={<MedicationsIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroTitle}>{detail.name}</Text>
              <Text style={styles.heroSubtitle}>{detail.instructions}</Text>
            </View>
          </NeumorphicCard>
        ) : null}

        <Text style={styles.sectionTitle}>Confirm Pharmacy</Text>
        <PharmacyChangeRow
          pharmacy={{ name: pharmacyName, address: pharmacyAddress }}
          onChangePress={() => pharmacySheetRef.current?.present()}
        />

        <Text style={[styles.sectionTitle, styles.sectionGap]}>Medication</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.fieldCardInner} borderRadius={10}>
          <Text style={styles.fieldLabel}>Medication</Text>
          <Pressable
            onPress={() => medicationSheetRef.current?.present()}
            style={({ pressed }) => [styles.dropdownPress, pressed && styles.dropdownPressPressed]}
          >
            <View pointerEvents="none">
              <InputField
                value={selectedMedicationLabel}
                editable={false}
                placeholder="Select Medication"
                rightIcon={<DropDownIcon width={10} height={10} />}
                onRightIconPress={() => medicationSheetRef.current?.present()}
                containerStyle={styles.medicationField}
                borderRadius={64}
                height={38}
              />
            </View>
          </Pressable>
        </NeumorphicCard>

        <View style={styles.reasonSection}>
          <NeumorphicRadioGroup
            sectionTitle="Reason"
            optional
            options={REFILL_REASON_OPTIONS}
            value={reason}
            onChange={setReason}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Review & Submit"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={styles.submitBtn}
          onPress={() =>
            navigation.navigate(navigationStrings.REFILL_STATUS, {
              medicationId: selectedMedicationId,
            })
          }
        />
      </View>

      <SelectSearchSheet
        ref={medicationSheetRef}
        title="Select Medication"
        items={medicationOptions}
        selectedId={selectedMedicationId}
        searchPlaceholder="Search medication"
        onConfirm={onMedicationPicked}
      />

      <SelectPharmacySheet
        ref={pharmacySheetRef}
        title="Select Pharmacy"
        items={getPharmacyPickerItems()}
        selectedId={pharmacyId}
        onConfirm={onPharmacyConfirmed}
      />
    </SafeAreaView>
  );
};

export default RequestRefill;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 14,
    paddingBottom: 16,
  },
  cardOuter: {
    width: "100%",
  },
  heroInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heroTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  heroTitle: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  heroSubtitle: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  sectionGap: {
    marginTop: 18,
  },
  fieldCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  fieldLabel: {
    marginBottom: 8,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  dropdownPress: {
    width: "100%",
  },
  dropdownPressPressed: {
    opacity: 0.92,
  },
  medicationField: {
    width: "100%",
  },
  reasonSection: {
    marginTop: 18,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 16 : 8,
  },
  submitBtn: {
    alignSelf: "stretch",
  },
});
