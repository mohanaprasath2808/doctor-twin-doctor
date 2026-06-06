import React, { useRef, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import PlusIcon from "../../../../assets/icon/plusIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import ReturnToCoderReasonBottomSheetModal from "../../../../components/BottomSheets/ReturnToCoderReasonBottomSheetModal";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import type { ReturnToCoderParams } from "./claimsTypes";

const ReturnToCoder = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ ReturnToCoder: ReturnToCoderParams }, "ReturnToCoder">>();
  const patientName = route.params.patientName ?? "Sarah Williams";
  const claimNumber = route.params.claimNumber ?? "#12345";

  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const reasonSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

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
        <Text style={styles.headerTitle}>Return to Coder</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingWrapper
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        contentContainerStyle={styles.wrapperContent}
      >
        <View style={styles.form}>
          <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={14}>
            <Image source={DoctorTempImage} style={styles.avatar} />
            <View style={styles.patientText}>
              <Text style={styles.patientName} numberOfLines={1}>
                {patientName}
              </Text>
              <Text style={styles.claimNumber}>Claim: {claimNumber}</Text>
            </View>
          </NeumorphicCard>

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
                borderRadius={64}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Add Comment</Text>
          <InputField
            placeholder="Add additional instructions for coder..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={5}
            borderRadius={12}
            minHeight={120}
            containerStyle={styles.inputNoTopSpace}
          />

          <Text style={styles.label}>Attachments</Text>
          <AppButton
            text="Attach"
            leftIcon={<PlusIcon width={18} height={18} />}
            iconSize={18}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.attachText}
            style={styles.attachButton}
            onPress={() => { }}
          />
        </View>
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
          <View style={styles.sendWrap}>
            <ReusableButton
              title="Send to Coder"
              onPress={() => navigation.navigate(navigationStrings.CODER_REVIEW_QUEUE)}
              containerStyle={styles.sendBtn}
              textStyle={{ fontFamily: "SF-Pro-Display-Semibold" }}
            />
          </View>
        </View>
      </View>

      <ReturnToCoderReasonBottomSheetModal
        ref={reasonSheetRef}
        selectedValue={reason}
        onSelectDone={(value) => setReason(value)}
      />
    </SafeAreaView>
  );
};

export default ReturnToCoder;

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
  footer: {
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 8,
  },
  patientOuter: {
    width: "100%",
    marginBottom: 4,
  },
  patientInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  patientText: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  claimNumber: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
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
  attachText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  attachButton: {
    height: 48,
    borderRadius: 24,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  cancelWrap: {
    flex: 1,
  },
  sendWrap: {
    flex: 1,
  },
  cancelBtn: {
    height: 52,
    borderRadius: 26,
  },
  cancelText: {
    color: COLORS.ALERT,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  sendBtn: {
    height: 52,
    borderRadius: 26,
  },
});
