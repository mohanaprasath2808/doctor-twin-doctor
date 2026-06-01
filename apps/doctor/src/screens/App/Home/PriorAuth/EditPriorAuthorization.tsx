import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const PATIENT_NAME = "Sarah Williams";

const DOCUMENT_CHECKLIST = [
  { id: "diagnoses", label: "Add Supporting Diagnoses" },
  { id: "labs", label: "Attach Lab/Imaging Results" },
  { id: "notes", label: "Attach Chart Notes" },
];

const EditPriorAuthorization = () => {
  const navigation = useNavigation<any>();

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
          <Text style={styles.headerTitle}>Edit Prior Authorization</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={14}
        >
          <View style={styles.patientRow}>
            <InnerShadowIcon
              size={44}
              icon={
                <Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>
              }
            />
            <View style={styles.patientTextCol}>
              <Text style={styles.patientName}>{PATIENT_NAME}</Text>
              <Text style={styles.messageCount}>4 messages</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            Diagnosis: morbid obesity and insurance rejection of bariatric surgery.
            Gastric sleeve. Patient is currently supervised diet coverage above is
            criteria.
          </Text>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={14}
        >
          <Text style={styles.sectionTitle}>Documents checklists</Text>
          {DOCUMENT_CHECKLIST.map((item, index) => (
            <View key={item.id}>
              {index > 0 ? <View style={styles.rowDivider} /> : null}
              <View style={styles.checklistRow}>
                <Text style={styles.checklistLabel}>{item.label}</Text>
                <AppButton
                  text="Upload"
                  width={88}
                  height={36}
                  borderRadius={18}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={COLORS.SURFACE}
                  textStyle={styles.uploadBtnText}
                  onPress={() => {}}
                />
              </View>
            </View>
          ))}
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={14}
        >
          <Text style={styles.sectionTitle}>Prior Documents</Text>
          <Text style={styles.bodyText}>
            Sarah Williams. Clear was rejected due to obesity not being cured and
            all missing documented documents errors and the above amendment search.
            Insurance denies.
          </Text>
        </NeumorphicCard>

        <ReusableButton
          title="Build Appeal"
          width="100%"
          height={48}
          borderRadius={24}
          containerStyle={styles.buildAppealBtn}
          textStyle={styles.buildAppealBtnText}
          onPress={() =>
            navigation.navigate(navigationStrings.PRIOR_AUTH_APPEAL_CREATED)
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPriorAuthorization;

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
  cardOuter: { width: "100%", marginTop: 16 },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientTextCol: { flex: 1, minWidth: 0 },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  messageCount: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  bodyText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 4,
  },
  checklistLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 10,
  },
  uploadBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  buildAppealBtn: { marginTop: 24 },
  buildAppealBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
