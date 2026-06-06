import React, { useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import AdjustPaymentReasonBottomSheetModal from "../../../../components/BottomSheets/AdjustPaymentReasonBottomSheetModal";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import type { AdjustPaymentParams } from "./claimsTypes";

const AdjustPayment = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ AdjustPayment: AdjustPaymentParams }, "AdjustPayment">>();
  const insets = useSafeAreaInsets();
  const reasonSheetRef = useRef<BottomSheetModal>(null);

  const [amount, setAmount] = useState(route.params?.amount ?? "$180");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

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
        <Text style={styles.headerTitle}>Adjust Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingWrapper
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        contentContainerStyle={styles.wrapperContent}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Amount</Text>
          <InputField
            placeholder="$0"
            value={amount}
            onChangeText={setAmount}
            containerStyle={styles.inputNoTopSpace}
            minHeight={46}
            borderRadius={12}
          />

          <Text style={styles.label}>Reason</Text>
          <Pressable onPress={() => reasonSheetRef.current?.present()}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select reason"
                value={reason}
                editable={false}
                rightIcon={<DownArrowIcon width={12} height={12} />}
                containerStyle={styles.inputNoTopSpace}
                minHeight={46}
                borderRadius={12}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Notes</Text>
          <InputField
            placeholder="Add notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={5}
            borderRadius={12}
            minHeight={120}
            containerStyle={styles.inputNoTopSpace}
          />
        </View>
      </KeyboardAvoidingWrapper>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <ReusableButton
          title="Save adjustment"
          height={52}
          borderRadius={26}
          containerStyle={styles.confirmBtn}
          onPress={() => navigation.goBack()}
        />
      </View>

      <AdjustPaymentReasonBottomSheetModal
        ref={reasonSheetRef}
        selectedValue={reason}
        onSelectDone={(value) => setReason(value)}
      />
    </SafeAreaView>
  );
};

export default AdjustPayment;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  flex: {
    flex: 1,
  },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
    paddingBottom: 16,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
    marginTop: 4,
  },
  inputNoTopSpace: {
    marginTop: 0,
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  confirmBtn: {
    width: "100%",
  },
});
