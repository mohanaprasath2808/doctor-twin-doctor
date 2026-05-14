import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import {
  ChannelCheckboxRows,
  createDefaultChannelSelection,
  type ChannelSelectionState,
  type DocumentChannelId,
} from "../../../components/Common/ChannelCheckboxRows";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";

const BG = COLORS.INNER_SURFACE;

const QUICK_REPLIES = ["Resubmitting with correct code", "Pending insurance review"] as const;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.BILLING_ANSWER>;

const BillingAnswer = ({ route, navigation }: Props) => {
  const item = route.params.item;
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState<ChannelSelectionState>(createDefaultChannelSelection());

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Answer</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  const toggleChannel = (id: DocumentChannelId) => {
    setChannels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const appendQuickReply = (text: string) => {
    setMessage((prev) => (prev.trim().length ? `${prev.trim()} ${text}` : text));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.column}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.content, { paddingBottom: 16 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {header}

            <PatientDetailCard item={item} outerStyle={styles.patientCardOuter} />

            <NeumorphicCard borderRadius={10} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.sectionTitle}>Message</Text>
              <InputField
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={6}
                minHeight={120}
                borderRadius={10}
                isFocused={false}
                containerStyle={styles.inputNoTop}
                placeholder="Enter the message"
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
                {QUICK_REPLIES.map((label) => (
                  <Pressable key={label} onPress={() => appendQuickReply(label)} style={styles.chipWrap}>
                    <NeumorphicCard borderRadius={10} backgroundColor={BG} outerStyle={styles.chipOuter} innerStyle={styles.chipInner}>
                      <Text style={styles.chipText} numberOfLines={2}>
                        {label}
                      </Text>
                    </NeumorphicCard>
                  </Pressable>
                ))}
              </ScrollView>
            </NeumorphicCard>

            <NeumorphicCard borderRadius={10} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.sectionTitle}>Channel</Text>
              <ChannelCheckboxRows channels={channels} onToggle={toggleChannel} />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Send"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigation.navigate(navigationStrings.BILLING_ACTION_COMPLETED, {
                  title: "Action completed",
                  description: "Your message has been sent successfully",
                  buttonText: "Back to Billing",
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BillingAnswer;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  keyboardRoot: { flex: 1 },
  column: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, flexGrow: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: { marginTop: 20 },
  sectionOuter: { width: "100%", marginTop: 14 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 14 },
  sectionTitle: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  inputNoTop: { marginTop: 0 },
  chipsRow: { flexDirection: "row", gap: 10, paddingTop: 12, paddingBottom: 2 },
  chipWrap: { padding: 4 },
  chipOuter: { marginTop: 0 },
  chipInner: { paddingHorizontal: 12, paddingVertical: 10 },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
