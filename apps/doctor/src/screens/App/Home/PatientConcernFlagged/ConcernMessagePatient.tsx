import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import PlusIcon from "../../../../assets/icon/plusIcon.svg";
import LockIcon from "../../../../assets/icon/lockIcon.svg";
import UtilizationIcon from "../../../../assets/icon/utilizationIcon.svg";
import CalendarBlueIcon from "../../../../assets/icon/calendarBlueIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicToggleSwitch from "../../../../components/Common/NeumorphicSwitch";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import NeumorphicCheckboxMark from "../../../../components/Common/NeumorphicCheckboxMark";

const DEFAULT_MESSAGE =
  "We need to reabsorb for your suggest patient. Please call back urgent";

const ConcernMessagePatient = () => {
  const navigation = useNavigation<any>();
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [convertTask, setConvertTask] = useState(false);
  const [labsSelected, setLabsSelected] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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
          innerStyle={styles.messageCardInner}
          borderRadius={12}
        >
          <Text style={styles.cardLabel}>Message</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.messageShadowCard}
            contentStyle={styles.messageShadowContent}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor={COLORS.LIGHT_SHADOW}
            width={"100%"}
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              multiline
              placeholder="Write a message"
              placeholderTextColor={COLORS.TEXT_50}
              style={styles.messageInput}
              textAlignVertical="top"
            />
          </NeumorphicInnerShadowCard>
          <AppButton
            text="Attach"
            leftIcon={<PlusIcon />}
            iconSize={16}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.attachText}
            style={styles.attachButton}
            onPress={() => { }}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.rowCardInner}
          borderRadius={12}
        >
          <InnerShadowIcon icon={<LockIcon width={18} height={18} />} size={40} />
          <Text style={styles.rowTitle}>Convert to Task for Staff</Text>
          <NeumorphicToggleSwitch
            value={convertTask}
            onValueChange={setConvertTask}
          />
        </NeumorphicCard>

        <Pressable
          onPress={() =>
            navigation.navigate(navigationStrings.FULL_PATIENT_CHART)
          }
        >
          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.rowCardInner}
            borderRadius={12}
          >
            <InnerShadowIcon
              icon={<UtilizationIcon width={18} height={18} />}
              size={40}
            />
            <Text style={styles.rowTitle}>Full Patient Chart</Text>
            <RightArrowIcon width={14} height={14} />
          </NeumorphicCard>
        </Pressable>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.labsCardInner}
          borderRadius={12}
        >
          <Pressable
            style={styles.labsCheckRow}
            onPress={() => setLabsSelected((prev) => !prev)}
          >
            <NeumorphicCheckboxMark selected={labsSelected} />
            <Text style={styles.rowTitle}>BMP + HBA1C</Text>
          </Pressable>
          <View style={styles.divider} />
          <View style={styles.labsBottomRow}>
            <View style={styles.labsBottomLeft}>
              <InnerShadowIcon
                icon={<CalendarBlueIcon width={18} height={18} />}
                size={40}
              />
              <Text style={styles.monthAgoText}>6 month ago</Text>
            </View>
            <NeumorphicToggleSwitch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
            />
          </View>
        </NeumorphicCard>

        <ReusableButton
          title="Send"
          width="100%"
          height={48}
          borderRadius={24}
          containerStyle={styles.sendBtn}
          textStyle={styles.sendBtnText}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConcernMessagePatient;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  cardOuter: { width: "100%", marginTop: 14 },
  messageCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Medium",
  },
  messageShadowCard: { width: "100%" },
  messageShadowContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 120,
  },
  messageInput: {
    flex: 1,
    minHeight: 100,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
    padding: 0,
  },
  attachButton: {
    height: 44,
    borderRadius: 22,
  },
  attachText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  rowCardInner: {
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
    fontFamily: "SF-Pro-Display-Medium",
  },
  labsCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  labsCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  divider: {
    marginVertical: 12,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  labsBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labsBottomLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  monthAgoText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Display-Medium",
  },
  sendBtn: { marginTop: 24 },
  sendBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
