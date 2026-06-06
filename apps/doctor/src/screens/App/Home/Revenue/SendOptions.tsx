import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import BillingWithCurrencyIcon from "../../../../assets/icon/billingWithCurrency.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";
import ProfileIcon from "../../../../assets/icon/blueProfile.svg";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicRadioMark from "../../../../components/Common/NeumorphicRadioMark";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InputField from "../../../../neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type SendOptionId = "coder" | "billing" | "provider" | "message";

type SendOption = {
  id: SendOptionId;
  label: string;
  icon: React.ReactNode;
};

const SEND_OPTIONS: SendOption[] = [
  { id: "coder", label: "Send to Coder", icon: <ProfileIcon width={18} height={18} /> },
  {
    id: "billing",
    label: "Send to Billing Team",
    icon: <BillingWithCurrencyIcon width={18} height={18} />,
  },
  { id: "provider", label: "Send to Provider", icon: <PatientIcon width={18} height={18} /> },
  {
    id: "message",
    label: "Internal Message Thread",
    icon: <MessageIcon width={18} height={18} />,
  },
];

const SendOptions = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<SendOptionId>("coder");
  const [message, setMessage] = useState("");

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
        <Text style={styles.headerTitle}>Send Options</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingWrapper
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        contentContainerStyle={styles.wrapperContent}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {SEND_OPTIONS.map((option) => (
            <NeumorphicCard
              key={option.id}
              outerStyle={styles.optionOuter}
              innerStyle={styles.optionInner}
              borderRadius={14}
              onPress={() => setSelected(option.id)}
            >
              <View style={styles.optionRow}>
                <NeumorphicRadioMark selected={selected === option.id} />
                <InnerShadowIcon size={44} radius={22} icon={option.icon} />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </View>
            </NeumorphicCard>
          ))}

          <Text style={styles.messageLabel}>Add a message (optional)</Text>
          <InputField
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            borderRadius={12}
            minHeight={100}
            containerStyle={styles.messageInput}
          />
        </ScrollView>
      </KeyboardAvoidingWrapper>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <ReusableButton
          title="Send Packet"
          height={52}
          borderRadius={26}
          containerStyle={styles.sendBtn}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default SendOptions;

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
    flexGrow: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  optionOuter: {
    width: "100%",
  },
  optionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  messageLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Medium",
  },
  messageInput: {
    marginTop: 0,
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  sendBtn: {
    width: "100%",
  },
});
