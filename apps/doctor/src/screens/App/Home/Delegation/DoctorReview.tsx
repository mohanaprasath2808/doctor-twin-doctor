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

const DoctorReview = () => {
  const navigation = useNavigation<any>();
  const [notes, setNotes] = useState(
    "Add a follow-up note based on her blood pressure concerns",
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

            <View style={styles.refillPill}>
              <Text style={styles.refillPillText}>Metformin refill prepared</Text>
            </View>
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
              minHeight={54}
              borderRadius={14}
              multiline
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
            />
          </View>

          <View style={styles.actionRow}>
            <AppButton
              text="Reject"
              activeOpacity={0.85}
              style={styles.actionButton}
              borderWidth={1}
              borderColor="#FF8D8D"
              bgColor="#FFF0F0"
              borderRadius={22}
              textStyle={styles.rejectActionText}
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
            />
          </View>

          <AppButton
            text="Approve"
            activeOpacity={0.85}
            style={styles.approveButton}
            borderRadius={24}
            bgColor={COLORS.PRIMARY}
            textStyle={styles.approveButtonText}
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
    marginTop: 16,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: "cover",
  },
  smallAvatar: {
    width: 36,
    height: 36,
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
    fontWeight: "600",
  },
  personMeta: {
    marginTop: 2,
    color: COLORS.TEXT_50,
    fontSize: 14,
    fontWeight: "400",
  },
  refillPill: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: COLORS.DARK_SHADOW,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 3,
  },
  refillPillText: {
    color: COLORS.TEXT_70,
    fontSize: 15,
    fontWeight: "500",
  },
  staffName: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    fontWeight: "600",
  },
  staffRole: {
    marginTop: 2,
    color: COLORS.TEXT_50,
    fontSize: 13,
    fontWeight: "400",
  },
  messageText: {
    marginTop: 14,
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
  },
  notesTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  notesInput: {
    marginTop: 12,
    marginBottom: 0,
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
    height: 40,
  },
  secondaryActionText: {
    color: "#4D559F",
    fontSize: 15,
    fontWeight: "600",
  },
  rejectActionText: {
    color: "#FF7E7E",
    fontSize: 15,
    fontWeight: "600",
  },
  approveButton: {
    height: 42,
  },
  approveButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default DoctorReview;
