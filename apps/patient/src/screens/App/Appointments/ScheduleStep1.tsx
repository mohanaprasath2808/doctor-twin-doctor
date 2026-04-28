import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import SelectSearchSheet from "../../../components/BottomSheets/SelectSearchSheet";
import type { SelectSearchSheetItem } from "../../../components/BottomSheets/SelectSearchSheet";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import TickIcon from "../../../assets/icons/tick.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import DoctorIcon from "../../../assets/icons/doctor.svg";
import AetnaPpoIcon from "../../../assets/icons/aetnaPpo.svg";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const VISIT_REASONS = [
  "General Consultation",
  "Follow-Up",
  "Annual Physical",
  "Medication Refill",
  "Other",
];

const PROVIDER_ITEMS: SelectSearchSheetItem[] = [
  { id: "p1", label: "Dr. Shahinaz Twin", image: DoctorTempImage },
  { id: "p2", label: "Dr. Lisa Shaw", image: DoctorTempImage },
];

const INSURANCE_ITEMS: SelectSearchSheetItem[] = [
  { id: "i1", label: "Aetna PPO" },
  { id: "i2", label: "Aetna PPO" },
  { id: "i3", label: "Aetna PPO" },
];

const ScheduleStep1 = () => {
  const navigation = useNavigation<any>();
  const providerSheetRef = useRef<BottomSheetModal>(null);
  const insuranceSheetRef = useRef<BottomSheetModal>(null);

  const [selectedReasonIndex, setSelectedReasonIndex] = useState(0);
  const [otherReason, setOtherReason] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    PROVIDER_ITEMS[0]?.id ?? null,
  );
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(
    INSURANCE_ITEMS[0]?.id ?? null,
  );

  const providerLabel =
    PROVIDER_ITEMS.find((p) => p.id === selectedProviderId)?.label ?? "Dr. Shahinaz Twin";
  const insuranceLabel =
    INSURANCE_ITEMS.find((i) => i.id === selectedInsuranceId)?.label ?? "Aetna PPO";
  const selectedReason = VISIT_REASONS[selectedReasonIndex] ?? "";
  const isOtherSelected = selectedReason.toLowerCase() === "other";

  const renderReasonItem: ListRenderItem<string> = ({ item, index }) => {
    const isSelected = selectedReasonIndex === index;
    return (
      <View>
        <Pressable
          onPress={() => setSelectedReasonIndex(index)}
          style={({ pressed }) => [styles.reasonRow, pressed && styles.reasonRowPressed]}
        >
          {isSelected ? (
            <View style={styles.reasonSelectedWrap}>
              <LinearGradient
                colors={["#14B8D4", "#0E7490"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.reasonSelected}
              >
                <TickIcon width={14} height={11} />
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.reasonUnselectedWrap}>
              <InnerShadowIcon
                size={30}
                radius={15}
                surfaceColor={COLORS.INNER_SURFACE}
                icon={<View style={styles.radioEmpty} />}
              />
            </View>
          )}
          <Text style={styles.reasonText}>{item}</Text>
        </Pressable>
        {index < VISIT_REASONS.length - 1 ? <View style={styles.reasonDivider} /> : null}
      </View>
    );
  };

  const onProviderPicked = useCallback((id: string) => {
    setSelectedProviderId(id);
  }, []);

  const onInsurancePicked = useCallback((id: string) => {
    setSelectedInsuranceId(id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.progressRow}>
          <LinearGradient
            colors={["#14B8D4", "#0E7490"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.progressActive}
          />
          <View style={styles.progressInactive} />
        </View>

        <Text style={styles.stepText}>Step 1</Text>
        <Text style={styles.sectionTitle}>What&apos;s the reason for your visit?</Text>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.reasonsInner}
          borderRadius={10}
        >
          <FlatList
            data={VISIT_REASONS}
            keyExtractor={(item) => item}
            renderItem={renderReasonItem}
            scrollEnabled={false}
          />

          {isOtherSelected ? (
            <InputField
              value={otherReason}
              onChangeText={setOtherReason}
              placeholder="Please specify"
              containerStyle={styles.otherReasonField}
              borderRadius={64}
              minHeight={48}
            />
          ) : null}
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.sectionCardInner}
          borderRadius={10}
        >
          <Text style={styles.cardTitle}>Provider</Text>
          <Pressable
            onPress={() => providerSheetRef.current?.present()}
            style={({ pressed }) => [styles.dropdownPress, pressed && styles.dropdownPressPressed]}
          >
            <View pointerEvents="none">
              <InputField
                value={providerLabel}
                editable={false}
                placeholder="Select provider"
                leftIcon={<DoctorIcon width={18} height={18} />}
                rightIcon={<DropDownIcon width={10} height={10} />}
                onRightIconPress={() => providerSheetRef.current?.present()}
                containerStyle={styles.providerFieldContainer}
                borderRadius={64}
                height={46}
              />
            </View>
          </Pressable>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.sectionCardInner}
          borderRadius={10}
        >
          <Text style={styles.cardTitle}>Insurance</Text>
          <View style={styles.insuranceRow}>
            <View style={styles.insuranceLeft}>
              <InnerShadowIcon
                size={40}
                radius={10}
                surfaceColor={COLORS.INNER_SURFACE}
                icon={<AetnaPpoIcon width={22} height={22} />}
              />
              <Text style={styles.insuranceName}>{insuranceLabel}</Text>
            </View>
            <AppButton
              text="Change"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              width={72}
              height={32}
              borderRadius={60}
              textStyle={styles.changeBtnText}
              onPress={() => insuranceSheetRef.current?.present()}
            />
          </View>
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Next"
          height={48}
          onPress={() => navigation.navigate(navigationStrings.SCHEDULE_STEP_2)}
        />
      </View>

      <SelectSearchSheet
        ref={providerSheetRef}
        title="Select Provider"
        items={PROVIDER_ITEMS}
        selectedId={selectedProviderId}
        searchPlaceholder="Search Provider"
        onConfirm={onProviderPicked}
      />

      <SelectSearchSheet
        ref={insuranceSheetRef}
        title="Select Insurance"
        items={INSURANCE_ITEMS}
        selectedId={selectedInsuranceId}
        searchPlaceholder="Search insurance"
        onConfirm={onInsurancePicked}
      />
    </SafeAreaView>
  );
};

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
  progressRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressActive: {
    flex: 1,
    height: 12,
    borderRadius: 60,
    shadowColor: "#C1D5EE",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  progressInactive: {
    flex: 1,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#F7FBFF",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  stepText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  cardOuter: {
    marginTop: 16,
    width: "100%",
    alignSelf: "stretch",
  },
  reasonsInner: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  sectionCardInner: {
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
  providerFieldContainer: {
    marginTop: 0,
    width: "100%",
  },
  reasonRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  reasonRowPressed: {
    opacity: 0.95,
  },
  reasonSelectedWrap: {
    width: 30,
    height: 30,
    borderRadius: 60,
    shadowColor: "#34718D",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  reasonSelected: {
    width: 30,
    height: 30,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  reasonUnselectedWrap: {
    width: 30,
    height: 30,
  },
  radioEmpty: {
    width: 2,
    height: 2,
  },
  reasonText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  reasonDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginLeft: 48,
  },
  otherReasonField: {
    marginTop: 8,
    marginBottom: 4,
    width: "100%",
  },
  insuranceRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  insuranceLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
  },
  insuranceName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    paddingHorizontal: 16,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
});

export default ScheduleStep1;
