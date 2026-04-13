import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InputField from "../../../../neomorphism/InputField";
import AppButton from "../../../../components/Common/AppButton";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import PlusIcon from "../../../../assets/icon/plusIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";
import UtilizationIcon from "../../../../assets/icon/utilizationIcon.svg";
import SelectedIcon from "../../../../assets/icon/selectedIcon.svg";

const MessagePatient = () => {
  const navigation = useNavigation<any>();
  const [message, setMessage] = useState("");
  const [convertTask, setConvertTask] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Message Patient</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={10}
        >
          <Text style={styles.cardLabel}>Message</Text>
          <InputField
            value={message}
            onChangeText={setMessage}
            placeholder="Write a Message"
            multiline
            minHeight={120}
            borderRadius={10}
            containerStyle={styles.messageInput}
          />
          <AppButton
            text="Attach"
            leftIcon={<PlusIcon />}
            iconSize={18}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.attachText}
            style={styles.attachButton}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.simpleRowCardInner}
          borderRadius={10}
        >
          <InnerShadowIcon
            size={40}
            icon={<PatientIcon width={20} height={20} />}
          />
          <Text style={styles.rowTitle}>Convert to Task for Staff</Text>
          <NeumorphicSwitch
            value={convertTask}
            onValueChange={setConvertTask}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.simpleRowCardInner}
          borderRadius={10}
        >
          <InnerShadowIcon
            size={40}
            icon={<UtilizationIcon width={20} height={20} />}
          />
          <Text style={styles.rowTitle}>Full Patient Chart</Text>
          <RightArrowIcon width={14} height={14} />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={10}
        >
          <View style={styles.selectedRow}>
            <SelectedIcon width={20} height={20} />
            <Text style={[styles.rowTitle, { marginLeft: 8 }]}>
              BMP + HBA1C
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.bottomRow}>
            <View style={styles.bottomLeft}>
              <InnerShadowIcon
                size={40}
                icon={<PatientIcon width={20} height={20} />}
              />
              <Text style={styles.monthAgoText}>6 month ago</Text>
            </View>
            <NeumorphicSwitch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
            />
          </View>
        </NeumorphicCard>

        <View style={styles.submitWrap}>
          <ReusableButton
            title="Send"
            width="100%"
            height={48}
            borderRadius={24}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagePatient;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  cardOuter: { marginTop: 14, marginHorizontal: 16 },
  cardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  cardLabel: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_DARK },
  messageInput: { marginTop: 10 },
  attachButton: { marginTop: 12, height: 42, borderRadius: 21 },
  attachText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
  simpleRowCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginLeft: 2,
  },
  selectedRow: { flexDirection: "row", alignItems: "center" },
  separator: { marginVertical: 12, height: 1, backgroundColor: COLORS.TEXT_10 },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  submitWrap: { marginTop: 24, marginHorizontal: 16 },
  monthAgoText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_80,
    marginLeft: 8,
  },
});
