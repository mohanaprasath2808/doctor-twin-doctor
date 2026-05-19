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

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import StatusDot from "../../../components/Common/StatusDot";
import SelectPharmacySheet from "../../../components/BottomSheets/SelectPharmacySheet";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import CalendarWithClockIcon from "../../../assets/icons/calendarWithClockIcon.svg";
import DoctorBlueIcon from "../../../assets/icons/doctorBlueIcon.svg";
import PharmacyIcon from "../../../assets/icons/pharmacyIcon.svg";
import BellIcon from "../../../assets/icons/bell.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import PharmacyChangeRow from "./components/PharmacyChangeRow";
import type {
  MedicationDetail as MedicationDetailModel,
  MedicationDetailParams,
  PharmacyInfo,
} from "./types/medications.types";

const HORIZONTAL = 16;

/** Replace with API when integrated. */
export const DEFAULT_PHARMACY: PharmacyInfo = {
  id: "pharmacy-1",
  name: "CVS Pharmacy",
  address: "Torrance Crossroads",
  phone: "440-784527",
  contactLine: "Torrance Crossroads tel.us.us: 440-784527",
};

const PHARMACY_PICKER_ITEMS = [
  { id: DEFAULT_PHARMACY.id, label: `${DEFAULT_PHARMACY.name} - ${DEFAULT_PHARMACY.address}` },
  { id: "pharmacy-2", label: "CVS Pharmacy - Redondo Beach" },
  { id: "pharmacy-3", label: "Walgreens - Manhattan Beach" },
];

const MEDICATION_DETAILS: Record<string, MedicationDetailModel> = {
  "med-1": {
    id: "med-1",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
    lastFilled: "24 Mar 2026",
    lastRefillDate: "21 Jun 2026",
    remainingRefills: 4,
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: {
      ...DEFAULT_PHARMACY,
      contactLine: "Torrance Crossroads tel.us.us: 440-784527",
    },
  },
  "med-2": {
    id: "med-2",
    name: "Lexapro 30 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
    lastFilled: "10 Mar 2026",
    lastRefillDate: "21 Jun 2026",
    remainingRefills: 4,
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
  "med-3": {
    id: "med-3",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    schedule: "17th Schedule",
    lastFilled: "24 Mar 2026",
    lastRefillDate: "21 Jun 2026",
    remainingRefills: 4,
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
  "stopped-1": {
    id: "stopped-1",
    name: "Lisinopril 20 mg",
    instructions: "Take 1 tablet daily",
    schedule: "Stopped",
    lastFilled: "24 Mar 2026",
    lastRefillDate: "21 Jun 2026",
    remainingRefills: 0,
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
  "stopped-2": {
    id: "stopped-2",
    name: "Lexapro 30 mg",
    instructions: "Take 1 tablet daily",
    schedule: "Stopped",
    lastFilled: "24 Mar 2026",
    lastRefillDate: "21 Jun 2026",
    remainingRefills: 0,
    prescriber: "Dr. Shahinaz Soliman",
    pharmacy: DEFAULT_PHARMACY,
  },
};

export function getPharmacyPickerItems() {
  return PHARMACY_PICKER_ITEMS;
}

/** Replace with API fetch when integrated. */
export async function fetchMedicationDetail(
  medicationId: string,
): Promise<MedicationDetailModel | null> {
  return MEDICATION_DETAILS[medicationId] ?? null;
}
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];
const INSTRUCTION_DOT_COLOR = "#9CA3AF";

const MedicationDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { medicationId } = (route.params ?? {}) as MedicationDetailParams;
  const pharmacySheetRef = useRef<BottomSheetModal>(null);

  const [detail, setDetail] = useState<MedicationDetailModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [pharmacyId, setPharmacyId] = useState(DEFAULT_PHARMACY.id);
  const [pharmacyName, setPharmacyName] = useState(DEFAULT_PHARMACY.name);
  const [pharmacyAddress, setPharmacyAddress] = useState(DEFAULT_PHARMACY.address);

  const loadDetail = useCallback(async () => {
    setLoading(true);
    const result = await fetchMedicationDetail(medicationId);
    setDetail(result);
    if (result?.pharmacy) {
      setPharmacyId(result.pharmacy.id);
      setPharmacyName(result.pharmacy.name);
      setPharmacyAddress(result.pharmacy.address);
    }
    setLoading(false);
  }, [medicationId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

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

  if (!detail) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={[styles.header, styles.headerPadded]}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Medication Detail</Text>
          <View style={styles.headerSpacer} />
        </View>
        <Text style={styles.errorText}>Medication not found.</Text>
      </SafeAreaView>
    );
  }

  const pharmacySubtitle = `${detail.pharmacy.name} ${detail.pharmacy.address}`;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Medication Detail</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.heroInner} borderRadius={10}>
          <InnerShadowIcon
            icon={<MedicationsIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>{detail.name}</Text>
            <Text style={styles.heroSubtitle}>Last refill date: {detail.lastRefillDate}</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.infoCardInner}
          borderRadius={10}
        >
          <InfoRow
            icon={<CalendarWithClockIcon width={18} height={18} />}
            title={detail.lastFilled}
            subtitle="Last filled"
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<MedicationsIcon width={18} height={18} />}
            title={String(detail.remainingRefills)}
            subtitle="Number of remaining refills"
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<DoctorBlueIcon width={18} height={18} />}
            title={detail.prescriber}
            subtitle="Prescriber"
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<PharmacyIcon width={18} height={18} />}
            title={detail.pharmacy.contactLine}
            subtitle={pharmacySubtitle}
          />
        </NeumorphicCard>

        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.instructionsInsetOuter}
            contentStyle={styles.instructionsInsetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <StatusDot color={INSTRUCTION_DOT_COLOR} size={8} />
            <Text style={styles.instructionText}>{detail.instructions}</Text>
          </NeumorphicInnerShadowCard>
        </View>

        <PharmacyChangeRow
          pharmacy={{ name: pharmacyName, address: pharmacyAddress }}
          onChangePress={() => pharmacySheetRef.current?.present()}
          outerStyle={styles.cardGap}
        />

        <Pressable onPress={() => undefined}>
          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.reminderInner}
            borderRadius={10}
          >
            <InnerShadowIcon
              icon={<BellIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.reminderTitle}>Smart Reminder</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Request Refill"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={styles.refillBtn}
          onPress={() =>
            navigation.navigate(navigationStrings.PRIOR_AUTHORIZATION, { medicationId: detail.id })
          }
        />
      </View>

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

const InfoRow = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <View style={styles.infoRow}>
    <InnerShadowIcon
      icon={icon}
      size={40}
      radius={20}
      surfaceColor={COLORS.INNER_SURFACE}
    />
    <View style={styles.infoTextWrap}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

export default MedicationDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerPadded: {
    paddingHorizontal: HORIZONTAL,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  errorText: {
    marginTop: 24,
    textAlign: "center",
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY_70,
    paddingHorizontal: HORIZONTAL,
  },
  cardOuter: {
    width: "100%",
  },
  cardGap: {
    marginTop: 14,
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
  infoCardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  infoTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  infoTitle: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  infoSubtitle: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  instructionsSection: {
    marginTop: 14,
    width: "100%",
  },
  sectionTitle: {
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  instructionsInsetOuter: {
    width: "100%",
  },
  instructionsInsetInner: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  instructionText: {
    flex: 1,
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY,
  },
  reminderInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reminderTitle: {
    flex: 1,
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 12 : 8,
    backgroundColor: COLORS.SURFACE,
  },
  refillBtn: {
    alignSelf: "stretch",
  },
});
