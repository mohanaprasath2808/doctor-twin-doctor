import React, { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type BatchClaimRow = {
  id: string;
  code: string;
  dateOfService: string;
  selected: boolean;
};

const INITIAL_BATCH_CLAIMS: BatchClaimRow[] = [
  { id: "1", code: "99214", dateOfService: "12 Mar 2025", selected: false },
  { id: "2", code: "99212", dateOfService: "12 Mar 2025", selected: true },
  { id: "3", code: "99213", dateOfService: "12 Mar 2025", selected: false },
  { id: "4", code: "99215", dateOfService: "12 Mar 2025", selected: false },
  { id: "5", code: "99211", dateOfService: "12 Mar 2025", selected: false },
];

const BatchSignClaims = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [claims, setClaims] = useState(INITIAL_BATCH_CLAIMS);
  const [digitalSignature, setDigitalSignature] = useState("");

  const selectedCount = useMemo(
    () => claims.filter((row) => row.selected).length,
    [claims],
  );

  const toggleClaim = (id: string) => {
    setClaims((prev) =>
      prev.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row)),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Batch Sign Claims</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingWrapper
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        contentContainerStyle={styles.wrapperContent}
      >
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
          <Text style={styles.selectedHeading}>Selected Claims: {selectedCount}</Text>
          {claims.map((row, index) => (
            <View key={row.id}>
              <Pressable style={styles.claimRow} onPress={() => toggleClaim(row.id)}>
                <NeumorphicCheckboxMark selected={row.selected} />
                <View style={styles.claimTextCol}>
                  <Text style={styles.claimCode}>{row.code}</Text>
                  <Text style={styles.claimDate}>Date of service: {row.dateOfService}</Text>
                </View>
              </Pressable>
              {index < claims.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <Text style={styles.fieldLabel}>Digital Signature</Text>
        <InputField
          value={digitalSignature}
          onChangeText={setDigitalSignature}
          placeholder=""
          multiline
          minHeight={140}
          borderRadius={12}
          containerStyle={styles.signatureInput}
        />
      </KeyboardAvoidingWrapper>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.buttonRow}>
          <View style={styles.cancelWrap}>
            <AppButton
              text="Cancel"
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.SURFACE}
              textStyle={styles.cancelText}
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.applyWrap}>
            <ReusableButton
              title="Apply Digital Signature"
              onPress={() =>
                navigation.navigate(navigationStrings.ACTION_SUCCESS, {
                  title: "Signature applied",
                  subtitle: "Your Signature has been applied successfully!",
                  buttonTitle: "Confirm & Close",
                  resetRoutes: [
                    { name: navigationStrings.HOME },
                    { name: navigationStrings.REVENUE_DASHBOARD },
                    { name: navigationStrings.UNSIGNED_CLAIMS },
                  ],
                })
              }
              containerStyle={styles.applyBtn}
              textStyle={styles.applyBtnText}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BatchSignClaims;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 14,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  wrapperContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardOuter: {
    width: "100%",
    marginBottom: 16,
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  selectedHeading: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 8,
  },
  claimRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  claimTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  claimCode: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  claimDate: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 10,
  },
  signatureInput: {
    width: "100%",
    marginTop: 0,
  },
  footer: {
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  cancelWrap: {
    flex: 1,
  },
  applyWrap: {
    flex: 1,
  },
  cancelBtn: {
    height: 52,
    borderRadius: 26,
  },
  cancelText: {
    color: COLORS.ALERT,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
  applyBtn: {
    height: 52,
    borderRadius: 26,
  },
  applyBtnText: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
