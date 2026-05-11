import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import RedWarningIcon from "../../../../assets/icon/redWarningIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

type SummarySection = {
  id: "problems" | "medications" | "labs" | "risks";
  title: string;
};

const SECTIONS: SummarySection[] = [
  { id: "problems", title: "Patient problems" },
  { id: "medications", title: "Active medications" },
  { id: "labs", title: "Key labs" },
  { id: "risks", title: "Risk flags" },
];

const ClinicalSummary = () => {
  const navigation = useNavigation<any>();

  const renderHeader = () => (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<BackIcon width={16} height={16} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Clinical Summary</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.avatarContainer}
        wrapperStyle={styles.avatarWrapper}
        overlayStyle={styles.avatarOverlay}
        imageStyle={styles.avatarImage}
      />

      <Text style={styles.listeningText}>Dr.Twin Listening...</Text>
    </View>
  );

  const renderProblems = () => (
    <>
      <View style={styles.patientRow}>
        <Image source={DoctorTempImage} style={styles.patientImage} />
        <View style={styles.patientTextWrap}>
          <Text style={styles.patientName}>Sarah Williams</Text>
          <Text style={styles.patientMeta}>Female • Age 45</Text>
        </View>
      </View>

      <NeumorphicInnerShadowCard
        borderRadius={100}
        containerStyle={styles.problemPillOuter}
        contentStyle={styles.problemPillInner}
        darkShadowColor="#D8DEE5"
      >
        <Text style={styles.problemPillText}>55-year-old female with diabetes and CKD stage 3</Text>
      </NeumorphicInnerShadowCard>
    </>
  );

  const renderMedication = () => (
    <View style={styles.itemRow}>
      <InnerShadowIcon icon={<CapsuleIcon width={18} height={18} />} size={40} />
      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle}>Lipitor 20 mg</Text>
        <Text style={styles.itemSubtitle}>Dosage: Take 1 night • 2 refills</Text>
      </View>
    </View>
  );

  const renderLabs = () => (
    <View style={styles.itemRow}>
      <InnerShadowIcon icon={<LabReportIcon width={18} height={18} />} size={40} />
      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle}>HbA1c 9.1</Text>
        <Text style={styles.itemSubtitle}>Priority Today</Text>
      </View>
      <Text style={styles.rightText}>1 month ago</Text>
    </View>
  );

  const renderRisks = () => (
    <View style={styles.itemRow}>
      <InnerShadowIcon
        icon={<RedWarningIcon width={18} height={18} />}
        size={40}
        shadowColor="#F0C7C7"
        lightShadowColor="#FFFFFF"
        backgroundColor="#FFE9E9"
      />
      <Text style={styles.riskText}>Renal Function labs are Overdue</Text>
    </View>
  );

  const renderSection = ({ item }: { item: SummarySection }) => (
    <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner} borderRadius={12}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.id === "problems" && renderProblems()}
      {item.id === "medications" && renderMedication()}
      {item.id === "labs" && renderLabs()}
      {item.id === "risks" && renderRisks()}
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={SECTIONS}
        keyExtractor={(section) => section.id}
        renderItem={renderSection}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={styles.sectionGap} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ClinicalSummary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerWrap: {
    paddingTop: 10,
    paddingBottom: 22,
    alignItems: "center",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    paddingTop: 12,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarOverlay: {
    borderRadius: 90,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  listeningText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  sectionOuter: {
    width: "100%",
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
    marginBottom: 10,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  patientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  patientTextWrap: {
    flex: 1,
    gap: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    fontSize: 13,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  problemPillOuter: {
    marginTop: 12,
    width: "100%",
  },
  problemPillInner: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  problemPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    textAlign: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    gap: 10,
  },
  itemTextWrap: {
    flex: 1,
    gap: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  rightText: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  riskText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  sectionGap: {
    height: 18,
  },
});

