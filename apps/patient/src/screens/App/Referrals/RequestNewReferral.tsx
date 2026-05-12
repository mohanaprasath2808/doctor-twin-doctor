import React, { useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";

import SpecialtyBottomSheetModal from "../../../components/BottomSheets/App/SelectSpecialitySheet";
import InsuranceBottomSheetModal from "../../../components/BottomSheets/App/InsuranceBottomSheetModal";
import LocationBottomSheetModal from "../../../components/BottomSheets/App/LocationBottomSheetModal";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import PharmacyIcon from "../../../assets/icons/preferredLocationIcon.svg";

const RequestNewReferral = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const specialtySheetRef = useRef<BottomSheetModal>(null);
  const insuranceSheetRef = useRef<BottomSheetModal>(null);
  const locationSheetRef = useRef<BottomSheetModal>(null);

  const [reason, setReason] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Request New Referral</Text>
            <View style={styles.notifWrap}>
              <IconComponent
                icon={<NotificationIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
              />
              <View style={styles.notifDot} />
            </View>
          </View>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Specialty</Text>
            <Text style={styles.fieldLabel}>Specialty</Text>
            <Pressable
              onPress={() => specialtySheetRef.current?.present()}
              style={({ pressed }) => [
                styles.dropdownPress,
                pressed && styles.dropdownPressPressed,
              ]}
            >
              <View pointerEvents="none">
                <InputField
                  value=""
                  editable={false}
                  placeholder="Select Specialty"
                  rightIcon={<DropDownIcon width={10} height={10} />}
                  onRightIconPress={() => specialtySheetRef.current?.present()}
                  containerStyle={styles.fieldTight}
                  borderRadius={64}
                  height={46}
                />
              </View>
            </Pressable>
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.reasonCardInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Reason</Text>
            <Text style={styles.fieldLabel}>Reason</Text>
            <InputField
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason"
              multiline
              numberOfLines={5}
              minHeight={120}
              borderRadius={14}
              containerStyle={styles.reasonInput}
            />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Insurance</Text>
            <Text style={styles.fieldLabel}>Insurance</Text>
            <Pressable
              onPress={() => insuranceSheetRef.current?.present()}
              style={({ pressed }) => [
                styles.dropdownPress,
                pressed && styles.dropdownPressPressed,
              ]}
            >
              <View pointerEvents="none">
                <InputField
                  value=""
                  editable={false}
                  placeholder="Select Insurance"
                  rightIcon={<DropDownIcon width={10} height={10} />}
                  onRightIconPress={() => insuranceSheetRef.current?.present()}
                  containerStyle={styles.fieldTight}
                  borderRadius={64}
                  height={46}
                />
              </View>
            </Pressable>
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Preferred Location</Text>
            <View style={styles.locationRow}>
              <InnerShadowIcon
                icon={<PharmacyIcon width={18} height={18} />}
                size={40}
                radius={114}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <Text style={styles.locationText} numberOfLines={2}>
                Los Angeles, CA
              </Text>
              <AppButton
                text="Change"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                width={76}
                height={26}
                borderRadius={60}
                elevated
                textStyle={styles.changeBtnText}
                style={styles.changeBtn}
                onPress={() => locationSheetRef.current?.present()}
              />
            </View>
          </NeumorphicCard>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <ReusableButton
            title="Submit Referral Request"
            height={52}
            borderRadius={28}
            width="100%"
            onPress={() => undefined}
            textStyle={styles.submitBtnText}
          />
        </View>
      </View>

      <SpecialtyBottomSheetModal ref={specialtySheetRef} />

      <InsuranceBottomSheetModal ref={insuranceSheetRef} title="Select Insurance" />

      <LocationBottomSheetModal ref={locationSheetRef} title="Select Location" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    textAlign: "center",
  },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  cardOuter: {
    marginTop: 20,
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  reasonCardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  fieldLabel: {
    marginTop: 20,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  dropdownPress: {
    borderRadius: 64,
  },
  dropdownPressPressed: {
    opacity: 0.92,
  },
  fieldTight: {
    marginTop: 8,
    marginBottom: 0,
  },
  reasonInput: {
    marginTop: 8,
    marginBottom: 0,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
    fontFamily: "SF-Pro-Text-Medium",
  },
  changeBtn: {
    flexShrink: 0,
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.PRIMARY,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.WHITE,
  },
});

export default RequestNewReferral;
