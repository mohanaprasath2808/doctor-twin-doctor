import React, { useCallback, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import SelectPharmacySheet from "../../../components/BottomSheets/SelectPharmacySheet";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import ConicalFlaskIcon from "../../../assets/icons/conicalFlaskIcon.svg";
import CalendarWithClockIcon from "../../../assets/icons/calendarWithClockIcon.svg";
import MessageIcon from "../../../assets/icons/message.svg";
import PharmacyIcon from "../../../assets/icons/pharmacyIcon.svg";
import NextStepListCard from "./components/NextStepListCard";
import NextStepUploadRow from "./components/NextStepUploadRow";
import type { NextStepItem, PharmacyInfo } from "./types/medications.types";

const HORIZONTAL = 16;

/** Replace with API when integrated. */
const DEFAULT_PHARMACY: PharmacyInfo = {
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

/** Replace with API when integrated. */
const NAV_NEXT_STEPS: NextStepItem[] = [
  { id: "schedule_labs", title: "Schedule Labs", subtitle: "Blood panel labs" },
  { id: "schedule_visit", title: "Schedule Visit", subtitle: "Follow-up appointment" },
  { id: "message_staff", title: "Message Staff" },
];

const NextSteps = () => {
  const navigation = useNavigation<any>();
  const pharmacySheetRef = useRef<BottomSheetModal>(null);

  const [pharmacyId, setPharmacyId] = useState(DEFAULT_PHARMACY.id);
  const [pharmacyName, setPharmacyName] = useState(DEFAULT_PHARMACY.name);
  const [pharmacyAddress, setPharmacyAddress] = useState(DEFAULT_PHARMACY.address);

  const onStepPress = useCallback(
    (item: NextStepItem) => {
      if (item.id === "schedule_labs") {
        navigation.navigate(navigationStrings.LAB_REQUEST);
        return;
      }
      if (item.id === "schedule_visit") {
        navigation.navigate(navigationStrings.SCHEDULE_STEP_1);
        return;
      }
      if (item.id === "message_staff") {
        navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
          screen: navigationStrings.NOTIFICATIONS,
        });
      }
    },
    [navigation],
  );

  const onPharmacyConfirmed = useCallback((id: string) => {
    const picked = PHARMACY_PICKER_ITEMS.find((p) => p.id === id);
    if (!picked) return;
    setPharmacyId(id);
    const [name, ...rest] = picked.label.split(" - ");
    setPharmacyName(name);
    setPharmacyAddress(rest.join(" - ") || DEFAULT_PHARMACY.address);
  }, []);

  const iconForStep = (id: string) => {
    if (id === "schedule_labs") {
      return <ConicalFlaskIcon width={18} height={18} />;
    }
    if (id === "schedule_visit") {
      return <CalendarWithClockIcon width={18} height={18} />;
    }
    return <MessageIcon width={18} height={18} />;
  };

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
        <Text style={styles.headerTitle}>Next Steps</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {NAV_NEXT_STEPS.map((item, index) => (
          <NextStepListCard
            key={item.id}
            item={item}
            icon={iconForStep(item.id)}
            onPress={() => onStepPress(item)}
            outerStyle={index > 0 ? styles.cardGap : undefined}
          />
        ))}

        <NextStepUploadRow
          title="Upload document"
          onUploadPress={() => navigation.navigate(navigationStrings.MEDICATION_UPLOAD_FILE)}
          outerStyle={styles.cardGap}
        />

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.pharmacyCardInner}
          borderRadius={10}
        >
          <Text style={styles.pharmacySectionTitle}>Confirm Pharmacy</Text>
          <View style={styles.pharmacyRow}>
            <InnerShadowIcon
              icon={<PharmacyIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.pharmacyTextWrap}>
              <Text style={styles.pharmacyName}>{pharmacyName}</Text>
              <Text style={styles.pharmacyAddress}>{pharmacyAddress}</Text>
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
              onPress={() => pharmacySheetRef.current?.present()}
            />
          </View>
        </NeumorphicCard>
      </ScrollView>

      <SelectPharmacySheet
        ref={pharmacySheetRef}
        title="Select Pharmacy"
        items={PHARMACY_PICKER_ITEMS}
        selectedId={pharmacyId}
        onConfirm={onPharmacyConfirmed}
      />
    </SafeAreaView>
  );
};

export default NextSteps;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 14,
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 32,
  },
  cardGap: {
    marginTop: 14,
  },
  cardOuter: {
    width: "100%",
  },
  pharmacyCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  pharmacySectionTitle: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  pharmacyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pharmacyTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  pharmacyName: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  pharmacyAddress: {
    marginTop: 4,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
  },
  changeBtnText: {
    ...TEXT.captionSemibold,
    color: COLORS.PRIMARY,
  },
});
