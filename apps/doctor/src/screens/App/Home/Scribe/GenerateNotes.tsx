import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CopyIcon from "../../../../assets/icon/copyIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import PatientTempImage from "../../../../assets/image/tempImage/fakeID.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type SoapSection = {
  key: string;
  letter: string;
  title: string;
  body: string;
};

const SOAP_SECTIONS: SoapSection[] = [
  {
    key: "s",
    letter: "S",
    title: "Subjective",
    body: "Night time wheezing, SOB",
  },
  {
    key: "o",
    letter: "O",
    title: "Objective",
    body: "Clear to auscultation, FEV 65%",
  },
  {
    key: "a",
    letter: "A",
    title: "Assessment",
    body: "Moderate persistent, asthma worsening",
  },
  {
    key: "p",
    letter: "P",
    title: "Plan",
    body: "ICS/LABA combo, call if no improvement",
  },
];

const PATIENT_MESSAGE =
  "Can we increase the dose of my prescription? It doesn't seem to be helping like it used to.";
const DOCTOR_MESSAGE =
  "Certainly, Dr.Soliman. I'll assign this refill request for you. Who would you like me to send it to?";

function SoapCard({ section }: { section: SoapSection }) {
  return (
    <NeumorphicCard
      outerStyle={styles.soapOuter}
      innerStyle={styles.soapInner}
      borderRadius={14}
    >
      <View style={styles.soapTopRow}>
        <InnerShadowIcon
          size={36}
          icon={<Text style={styles.soapLetter}>{section.letter}</Text>}
        />
        <Text style={styles.soapTitle}>{section.title}</Text>
      </View>
      <Text style={styles.soapBody}>{section.body}</Text>
      <Pressable>
        <NeumorphicCard
          outerStyle={styles.copyOuter}
          innerStyle={styles.copyInner}
          borderRadius={62

          }
        >

          <CopyIcon width={14} height={14} />
          <Text style={styles.copyText}>Copy</Text>
        </NeumorphicCard>
      </Pressable>
    </NeumorphicCard>
  );
}

const GenerateNotes = () => {
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
          <Text style={styles.headerTitle}>AI Scribe</Text>
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

        <View style={styles.transcriptHeader}>
          <Text style={styles.sectionTitle}>Transcript</Text>
          <Pressable>
            <NeumorphicCard
              outerStyle={styles.copyAllOuter}
              innerStyle={styles.copyAllInner}
              borderRadius={62

              }
            >
              <CopyIcon width={14} height={14} />
              <Text style={styles.copyAllText}>Copy all</Text>
            </NeumorphicCard>
          </Pressable>
        </View>

        <View style={styles.chatBlock}>
          <View style={styles.patientRow}>
            <Image source={PatientTempImage} style={styles.chatAvatar} resizeMode="cover" />
            <View style={styles.chatCol}>
              <Text style={styles.chatRole}>Patient</Text>
              <NeumorphicCard
                outerStyle={styles.bubbleOuter}
                innerStyle={styles.bubbleInner}
                borderRadius={14}
              >
                <Text style={styles.chatText}>{PATIENT_MESSAGE}</Text>
              </NeumorphicCard>
            </View>
          </View>

          <View style={styles.doctorRow}>
            <View style={styles.chatColDoctor}>
              <Text style={[styles.chatRole, styles.chatRoleRight]}>Doctor</Text>
              <View style={styles.doctorBubbleRow}>
                <InsightMessageCard
                  style={styles.insightBubble}
                  title={DOCTOR_MESSAGE}
                  subTitle=""
                  bgColor="#CBF0FF"
                  titleStyle={styles.chatText}
                  subTitleStyle={styles.hiddenSub}
                  titleSubTitleGap={0}
                />
                <DoctorAvatar
                  source={DoctorTempImage}
                  imageSize={38}
                  containerSize={44}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.soapGrid}>
          {SOAP_SECTIONS.map((section) => (
            <SoapCard key={section.key} section={section} />
          ))}
        </View>

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Visit Summary"
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.GENERATE_SUMMARY)}
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Review & Edit"
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.REVIEW_AND_EDIT)}
          />
        </View>

        <ReusableButton
          title="Print Referral"
          height={48}
          borderRadius={24}
          containerStyle={styles.printBtn}
          textStyle={styles.printBtnText}
          onPress={() => { }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GenerateNotes;

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
  transcriptHeader: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  copyAllOuter: { minWidth: 96 },
  copyAllInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  copyAllText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  chatBlock: { marginTop: 14, gap: 16 },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  doctorRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  chatAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  chatCol: { flex: 1, minWidth: 0, gap: 4 },
  chatColDoctor: { flex: 1, minWidth: 0, gap: 4 },
  chatRole: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Medium",
  },
  chatRoleRight: { textAlign: "right" },
  bubbleOuter: { width: "100%" },
  bubbleInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  doctorBubbleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: 10,
  },
  insightBubble: { flex: 1, maxWidth: "82%" },
  chatText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  hiddenSub: { height: 0, fontSize: 0, marginTop: 0 },
  soapGrid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  soapOuter: { width: "48%" },
  soapInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    minHeight: 140,
  },
  soapTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  soapLetter: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  soapTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  soapBody: {
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 17,
    fontFamily: "SF-Pro-Display-Regular",
  },
  copyOuter: { alignSelf: "flex-start" },
  copyInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  copyText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Medium",
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
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
  printBtn: { marginTop: 14 },
  printBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
