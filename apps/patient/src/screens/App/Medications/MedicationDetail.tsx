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
import SelectPharmacySheet from "../../../components/BottomSheets/SelectPharmacySheet";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import CalendarWithClockIcon from "../../../assets/icons/calendarWithClockIcon.svg";
import DoctorBlueIcon from "../../../assets/icons/doctorBlueIcon.svg";
import PharmacyIcon from "../../../assets/icons/pharmacyIcon.svg";
import BellIcon from "../../../assets/icons/bell.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import PharmacyChangeRow from "./components/PharmacyChangeRow";
import {
  DEFAULT_PHARMACY,
  fetchMedicationDetail,
  getPharmacyPickerItems,
} from "./data/medications.repository";
import type { MedicationDetail as MedicationDetailModel, MedicationDetailParams } from "./types/medications.types";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

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
        <Text style={styles.errorText}>Medication not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
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
            <Text style={styles.heroSubtitle}>{detail.instructions}</Text>
            <Text style={styles.heroSubtitle}>{detail.schedule}</Text>
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
            icon={<DoctorBlueIcon width={18} height={18} />}
            title={detail.prescriber}
            subtitle="Prescriber"
          />
          <View style={styles.divider} />
          <InfoRow
            icon={<PharmacyIcon width={18} height={18} />}
            title={detail.pharmacy.contactLine}
            subtitle={`${detail.pharmacy.name} ${detail.pharmacy.address}`}
          />
        </NeumorphicCard>

        <ReusableButton
          title="Request Refill"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={[styles.refillBtn, styles.cardGap]}
          onPress={() =>
            navigation.navigate(navigationStrings.REQUEST_REFILL, { medicationId: detail.id })
          }
        />

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
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 32,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  errorText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_70,
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
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
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
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  infoSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  refillBtn: {
    alignSelf: "stretch",
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
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
});
