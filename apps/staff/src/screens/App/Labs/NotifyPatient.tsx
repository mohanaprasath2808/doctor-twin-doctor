import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import NeumorphicCheckboxMark from "../../../components/Common/NeumorphicCheckboxMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { getInitials } from "../../../constants/constant";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type Channel = "call" | "app" | "sms";

const PATIENT_NAME = "Helen Foster";
const CHANNELS: { id: Channel; label: string }[] = [
  { id: "call", label: "Call" },
  { id: "app", label: "App" },
  { id: "sms", label: "SMS" },
];

const NotifyPatient = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState(
    "We’re scheduling you for a follow-up visit.\nExpect a call soon",
  );
  const [selectedChannel, setSelectedChannel] = useState<Channel>("call");
  const [saveToRecord, setSaveToRecord] = useState(false);
  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 74 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Notify patient</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
            <View style={styles.patientRow}>
              <InnerShadowIcon
                size={40}
                icon={<Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>}
              />
              <View style={styles.patientText}>
                <Text style={styles.patientName}>{PATIENT_NAME}</Text>
                <Text style={styles.meta}>Female • Age 45</Text>
              </View>
            </View>
          </NeumorphicCard>

          <NeumorphicCard borderRadius={10} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
            <Text style={styles.sectionTitle}>Message</Text>
            <InputField
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={8}
              minHeight={240}
              isFocused={false}
              borderRadius={10}
              style={styles.messageInputField}
              containerStyle={styles.messageInput}
              placeholder="Type your message"
            />

            <Pressable style={styles.saveRow} onPress={() => setSaveToRecord((prev) => !prev)}>
              <NeumorphicCheckboxMark selected={saveToRecord} />
              <Text style={styles.saveLabel}>Save to patient record</Text>
            </Pressable>
          </NeumorphicCard>

          <Text style={styles.channelTitle}>Channel</Text>
          <NeumorphicCard borderRadius={10} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.channelInner}>
            {CHANNELS.map((channel, index) => (
              <View key={channel.id}>
                <View style={styles.channelRow}>
                  <PressableRow
                    label={channel.label}
                    selected={selectedChannel === channel.id}
                    onPress={() => setSelectedChannel(channel.id)}
                  />
                </View>
                {index !== CHANNELS.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </NeumorphicCard>
        </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <ReusableButton
          title="Send Message"
          height={50}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() =>
            navigation.navigate(navigationStrings.LABS_ACTION_COMPLETED, {
              title: "Action completed",
              description: "Patient has been notified successfully",
              buttonText: "Back to Labs",
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const PressableRow = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable style={styles.channelPressWrap} onPress={onPress}>
    <View style={styles.channelLeft}>
      <View style={styles.radioWrap}>
        <NeumorphicCheckboxMark selected={selected} />
      </View>
      <Text style={styles.channelLabel}>{label}</Text>
    </View>
  </Pressable>
);

export default NotifyPatient;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
  container: { paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { marginBottom: 16 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 12 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  initials: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  patientText: { flex: 1, minWidth: 0 },
  patientName: { fontSize: 15, fontWeight: "500", color: COLORS.TEXT_DARK },
  meta: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  sectionTitle: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  messageInput: { marginTop: 16 },
  messageInputField: { fontSize: 14, fontWeight: "400", color: COLORS.TEXT_40 },
  saveRow: { marginTop: 16, flexDirection: "row", alignItems: "center", gap: 10 },
  saveLabel: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  channelTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 8,
  },
  channelInner: { paddingHorizontal: 12, paddingVertical: 0 },
  channelRow: { minHeight: 52, justifyContent: "center" },
  channelPressWrap: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 },
  channelLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  radioWrap: { width: 30, height: 30, justifyContent: "center", alignItems: "center" },
  channelLabel: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20 },
  footer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: COLORS.INNER_SURFACE },
});
