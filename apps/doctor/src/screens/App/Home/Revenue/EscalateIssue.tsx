import React, { useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import EditIcon from "../../../../assets/icon/taskEditIcon.svg";
import ProfileIcon from "../../../../assets/icon/blueProfile.svg";
import RightArrow from "../../../../assets/icon/rightArrow.svg";
import TicketIcon from "../../../../assets/icon/ticketIcon.svg";
import EscalatePriorityBottomSheetModal from "../../../../components/BottomSheets/EscalatePriorityBottomSheetModal";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InputField from "../../../../neomorphism/InputField";
import KeyboardAvoidingWrapper from "../../../../neomorphism/KeyboardAvoidingWrapper";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type EscalationOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const ESCALATION_OPTIONS: EscalationOption[] = [
  {
    id: "billing-manager",
    label: "Send to billing manager",
    icon: <ProfileIcon width={20} height={20} />,
  },
  {
    id: "internal-ticket",
    label: "Open internal ticket",
    icon: <TicketIcon width={20} height={20} />,
  },
  {
    id: "documentation",
    label: "Request documentation",
    icon: <EditIcon width={20} height={20} />,
  },
];

const EscalateIssue = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const prioritySheetRef = useRef<BottomSheetModal>(null);
  const [priority, setPriority] = useState("");
  const [note, setNote] = useState("");

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
        <Text style={styles.headerTitle}>Escalate Issue</Text>
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
          {ESCALATION_OPTIONS.map((option) => (
            <NeumorphicCard
              key={option.id}
              outerStyle={styles.optionOuter}
              innerStyle={styles.optionInner}
              borderRadius={14}
              onPress={() => { }}
            >
              <View style={styles.optionRow}>
                <InnerShadowIcon size={44} radius={22} icon={option.icon} />
                <Text style={styles.optionLabel}>{option.label}</Text>
                <RightArrow width={10} height={10} style={styles.chevron} />
              </View>
            </NeumorphicCard>
          ))}

          <Text style={styles.label}>Priority</Text>
          <Pressable onPress={() => prioritySheetRef.current?.present()}>
            <View pointerEvents="none">
              <InputField
                placeholder="Select priority"
                value={priority}
                editable={false}
                rightIcon={<DownArrowIcon width={12} height={12} />}
                containerStyle={styles.inputNoTopSpace}
                minHeight={46}
                borderRadius={114}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Add Note</Text>
          <InputField
            placeholder="Enter note"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={5}
            borderRadius={12}
            minHeight={120}
            containerStyle={styles.inputNoTopSpace}
          />
        </ScrollView>
      </KeyboardAvoidingWrapper>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <ReusableButton
          title="Submit Escalation"
          height={52}
          borderRadius={26}
          containerStyle={styles.submitBtn}
          onPress={() => navigation.goBack()}
        />
      </View>

      <EscalatePriorityBottomSheetModal
        ref={prioritySheetRef}
        selectedValue={priority}
        onSelectDone={(value) => setPriority(value)}
      />
    </SafeAreaView>
  );
};

export default EscalateIssue;

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
    paddingBottom: 10,
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
    gap: 12,
  },
  optionOuter: {
    width: "100%",
  },
  optionInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  chevron: {
    opacity: 0.6,
  },
  label: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  inputNoTopSpace: {
    marginTop: 0,
    width: "100%",
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  submitBtn: {
    width: "100%",
  },
});
