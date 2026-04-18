import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";

const DoctorReview = () => {
  const navigation = useNavigation<any>();
  const [notes, setNotes] = useState(
    "Add a follow-up note based on her blood pressure concerns",
  );
  const [refillMessage, setRefillMessage] = useState(
    "Metformin refill prepared",
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackIcon width={16} height={16} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Doctor Review</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.patientCardInner}
            borderRadius={14}
          >
            <View style={styles.personRow}>
              <Image source={DoctorTempImage} style={styles.avatar} />
              <View style={styles.personTextWrap}>
                <Text style={styles.personName}>Sarah Williams</Text>
                <Text style={styles.personMeta}>Female • Age 45</Text>
              </View>
            </View>

            <InputField
              value={refillMessage}
              onChangeText={setRefillMessage}
              placeholder="Refill message"
              containerStyle={styles.refillInput}
              minHeight={40}
            />

          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.messageCardInner}
            borderRadius={14}
          >
            <View style={styles.personRow}>
              <Image source={DoctorTempImage} style={styles.smallAvatar} />
              <View style={styles.personTextWrap}>
                <Text style={styles.staffName}>Rebecca K</Text>
                <Text style={styles.staffRole}>Staff</Text>
              </View>
            </View>

            <Text style={styles.messageText}>
              Critical Labs indicate probable liver damage. Twin recommends urgent
              call.
            </Text>
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.notesCardInner}
            borderRadius={14}
          >
            <Text style={styles.notesTitle}>Notes</Text>
            <InputField
              value={notes}
              onChangeText={setNotes}
              placeholder="Add notes"
              containerStyle={styles.notesInput}
              multiline
              minHeight={56}
              borderRadius={10}
            />
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.actionRow}>
            <AppButton
              text="Reopen"
              activeOpacity={0.85}
              style={styles.actionButton}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              borderRadius={22}
              textStyle={styles.secondaryActionText}
              onPress={() => navigation.navigate(navigationStrings.REOPEN_TASK)}
            />
            <AppButton
              text="Reassign"
              activeOpacity={0.85}
              style={styles.actionButton}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              borderRadius={22}
              textStyle={styles.secondaryActionText}
              onPress={() => navigation.navigate(navigationStrings.REASSIGN_TASK)}
            />
          </View>

          <View style={styles.actionRow}>
            <AppButton
              text="Reject"
              activeOpacity={0.85}
              style={styles.actionButton}
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.ALERT_LIGHT}
              borderRadius={22}
              textStyle={styles.rejectActionText}
              onPress={() => navigation.navigate(navigationStrings.REJECT_TASK)}
            />
            <AppButton
              text="Escalate"
              activeOpacity={0.85}
              style={styles.actionButton}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              borderRadius={22}
              textStyle={styles.secondaryActionText}
              onPress={() => navigation.navigate(navigationStrings.ESCALATION_TASK)}
            />
          </View>
          <ReusableButton
            title="Approve"
            containerStyle={styles.approveButton}
            textStyle={styles.approveButtonText}
            backgroundColor="#2E3A8C"
            textColor="#FFFFFF"
            onPress={() => navigation.navigate(navigationStrings.COMPLETION_TASK)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  cardOuter: {
    marginTop: 30,
    width: "100%",
  },
  patientCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  messageCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  notesCardInner: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 114,
    resizeMode: "cover",
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 18,
    resizeMode: "cover",
  },
  personTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  personName: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  personMeta: {
    marginTop: 2,
    color: COLORS.TEXT_50,
    fontSize: 14,
    fontWeight: "400",
  },
  staffName: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  staffRole: {
    marginTop: 2,
    color: COLORS.TEXT_50,
    fontSize: 12,
    fontWeight: "400",
  },
  messageText: {
    marginTop: 14,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
  },
  notesTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  notesInput: {
    marginTop: 10
  },
  refillInput: {
    marginTop: 20
  },
  footer: {
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: COLORS.SURFACE,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 26,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  rejectActionText: {
    color: COLORS.ALERT,
    fontSize: 16,
    fontWeight: "500",
  },
  // approveButton: {
  //   flex: 1,
  //   borderRadius: 26,
  //   height: 48,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // approveButtonText: {
  //   color: COLORS.WHITE,
  //   fontSize: 16,
  //   fontWeight: "500",
  // },
  approveButton: { height: 48, borderRadius: 24 },
  approveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" }
});

export default DoctorReview;
