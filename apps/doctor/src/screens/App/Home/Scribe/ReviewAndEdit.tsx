import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import EditIcon from "../../../../assets/icon/editIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InputField from "../../../../neomorphism/InputField";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";

const PATIENT_NAME = "Mrs. Barsoum";
const PATIENT_INITIALS = "BM";

const VISIT_SUMMARY =
  "Mrs.Barsoum, reported she is doing well and her condition is more controlled with her current medication regimen. She has been following up on several orders. I just have some.";

const DEFAULT_OBJECTIVE = "Mrs.Barsoum med an maintainey medus";

const ReviewAndEdit = () => {
  const navigation = useNavigation<any>();
  const [objectiveText, setObjectiveText] = useState(DEFAULT_OBJECTIVE);
  const [isEditingObjective, setIsEditingObjective] = useState(false);

  const handleSaveObjective = () => {
    setIsEditingObjective(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Review & Edit</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={14}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Visit Summary</Text>
            <NeumorphicInnerShadowCard
              borderRadius={14}
              containerStyle={styles.urgencyOuter}
              contentStyle={styles.urgencyInner}
              darkShadowColor="#EDE0BE"
              lightShadowColor="#FFFFFF99"
            >
              <Text style={styles.urgencyText}>Moderate Urgency</Text>
            </NeumorphicInnerShadowCard>
          </View>

          <View style={styles.patientRow}>
            <InnerShadowIcon
              size={44}
              icon={<Text style={styles.initials}>{PATIENT_INITIALS}</Text>}
            />
            <Text style={styles.patientName}>{PATIENT_NAME}</Text>
          </View>

          <Text style={styles.summaryBody}>{VISIT_SUMMARY}</Text>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.objectiveInner}
          borderRadius={14}
        >
          <Text style={styles.cardTitle}>Objective</Text>

          <View style={styles.objectiveFieldRow}>
            <InputField
              value={objectiveText}
              onChangeText={setObjectiveText}
              editable={isEditingObjective}
              multiline={isEditingObjective ? true : false}
              containerStyle={styles.objectiveInput}
              minHeight={isEditingObjective ? 120 : 46}
              borderRadius={isEditingObjective ? 10 : 114}
            />
            {!isEditingObjective ? (
              <IconComponent
                icon={<EditIcon width={16} height={16} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => setIsEditingObjective(true)}
              />
            ) : null}
          </View>
        </NeumorphicCard>

        {isEditingObjective ? (
          <AppButton
            activeOpacity={0.8}
            style={styles.saveBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Save"
            textStyle={styles.outlineBtnText}
            onPress={handleSaveObjective}
          />
        ) : (
          <>
            <View style={styles.actionsRow}>
              <AppButton
                activeOpacity={0.8}
                style={styles.actionBtn}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                text="Insert into EMR"
                textStyle={styles.outlineBtnText}
                onPress={() => { }}
              />
              <AppButton
                activeOpacity={0.8}
                style={styles.actionBtn}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                text="Save Draft"
                textStyle={styles.outlineBtnText}
                onPress={() => { }}
              />
            </View>

            <AppButton
              activeOpacity={0.8}
              style={styles.saveBtn}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              text="Save"
              textStyle={styles.outlineBtnText}
              onPress={() => { }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewAndEdit;

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
  avatarWrap: { alignItems: "center", marginTop: 4 },
  avatarWrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 115,
    resizeMode: "contain",
  },
  listeningText: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  cardOuter: { width: "100%", marginTop: 16 },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  urgencyOuter: {},
  urgencyInner: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.ESCALATION_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  summaryBody: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  objectiveInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  objectiveFieldRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  objectiveInput: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 0,
    minWidth: 0,
  },
  actionsRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    minWidth: 0,
  },
  saveBtn: {
    marginTop: 14,
    height: 48,
    borderRadius: 24,
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
});
