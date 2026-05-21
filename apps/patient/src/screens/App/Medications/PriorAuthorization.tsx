import React, { useCallback, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import AppButton from "../../../components/Common/AppButton";
import DocumentUploadField from "../../../components/Common/DocumentUploadField";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import SelectPharmacySheet from "../../../components/BottomSheets/SelectPharmacySheet";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import MessageWithQuestionIcon from "../../../assets/icons/messageWithQuestion.svg";
import PharmacyIcon from "../../../assets/icons/pharmacyIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import { DEFAULT_PHARMACY, getPharmacyPickerItems } from "./MedicationDetail";
import type { PriorAuthorizationParams } from "./types/medications.types";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const STATUS_PALETTE = {
  value: "Pending",
  bgColor: "#FFF6D9",
  textColor: "#D6AD3D",
  darkShadowColor: "rgba(214, 173, 61, 0.35)",
};

const PriorAuthorization = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { medicationId } = (route.params ?? {}) as PriorAuthorizationParams;
  const pharmacySheetRef = useRef<BottomSheetModal>(null);

  const [pharmacyId, setPharmacyId] = useState(DEFAULT_PHARMACY.id);
  const [pharmacyName, setPharmacyName] = useState(DEFAULT_PHARMACY.name);
  const [pharmacyAddress, setPharmacyAddress] = useState(DEFAULT_PHARMACY.address);

  const onPharmacyConfirmed = useCallback((id: string) => {
    const picked = getPharmacyPickerItems().find((p) => p.id === id);
    if (!picked) return;
    setPharmacyId(id);
    const [name, ...rest] = picked.label.split(" - ");
    setPharmacyName(name);
    setPharmacyAddress(rest.join(" - ") || DEFAULT_PHARMACY.address);
  }, []);

  const onSubmit = useCallback(() => {
    navigation.navigate(navigationStrings.REQUEST_REFILL, { medicationId });
  }, [medicationId, navigation]);

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
          <Text style={styles.headerTitle}>Prior Authorization</Text>
          <View style={styles.headerSpacer} />
        </View>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Status</Text>
          <NeumorphicInnerShadowCard
            borderRadius={114}
            backgroundColor={STATUS_PALETTE.bgColor}
            darkShadowColor={STATUS_PALETTE.darkShadowColor}
            containerStyle={styles.statusBadgeOuter}
            contentStyle={styles.statusBadgeInner}
          >
            <Text style={[styles.statusText, { color: STATUS_PALETTE.textColor }]}>
              {STATUS_PALETTE.value}
            </Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.sectionInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Upload insurance card</Text>
          <DocumentUploadField
            label="Insurance Card (Front)"
            hint="Upload document"
            containerStyle={styles.uploadFieldGap}
            onUploadPress={() => undefined}
          />
          <DocumentUploadField
            label="Insurance Card (Back)"
            hint="Upload document"
            onUploadPress={() => undefined}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.sectionInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Confirm Pharmacy</Text>
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

        <Pressable
          onPress={() => navigation.navigate(navigationStrings.PRIOR_AUTH_QUESTIONNAIRE)}
        >
          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.questionnaireInner}
            borderRadius={10}
          >
            <InnerShadowIcon
              icon={<MessageWithQuestionIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.questionnaireTitle}>Complete questionnaire</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </Pressable>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.sectionInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Upload supporting documents</Text>
          <DocumentUploadField label="Upload Document" hint="Upload document" onUploadPress={() => undefined} />
        </NeumorphicCard>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Submit"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={styles.submitBtn}
          onPress={onSubmit}
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

export default PriorAuthorization;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
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
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  cardOuter: {
    width: "100%",
  },
  cardGap: {
    marginTop: 14,
  },
  sectionInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    ...TEXT.cardTitle,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  statusBadgeOuter: {
    alignSelf: "flex-start",
  },
  statusBadgeInner: {
    borderRadius: 114,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    ...TEXT.captionSemibold,
  },
  uploadFieldGap: {
    marginBottom: 16,
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
  questionnaireInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  questionnaireTitle: {
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
  submitBtn: {
    alignSelf: "stretch",
  },
});
