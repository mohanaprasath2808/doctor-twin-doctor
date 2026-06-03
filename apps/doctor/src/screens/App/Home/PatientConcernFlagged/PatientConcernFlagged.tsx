import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import NotificationIcon from "../../../../assets/icon/notificationIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import StatusDot from "../../../../components/Common/StatusDot";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const PATIENT_NAME = "Sarah Williams";
const PATIENT_MESSAGE =
  "Hi Dr.Soliman, I have been feeling very dizzy and lightheaded this week and ny left arm is tingling. I need to see you soon please.";

const FLAGGED_CONCERNS = [
  { id: "1", text: "Dizziness with left arm tingling", color: COLORS.ESCALATION_DARK },
  { id: "2", text: "Possible neurological concern.", color: COLORS.ESCALATION_DARK },
];

const PatientConcernFlagged = () => {
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
          <Text style={styles.headerTitle}>Dr.Twin Listening...</Text>
          <IconComponent
            icon={<NotificationIcon width={20} height={20} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => { }}
          />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <View style={styles.messageRow}>
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
          <InsightMessageCard
            style={styles.insightCard}
            title="Patient concern flagged"
            subTitle="Read escalation message"
            bgColor="#CBF0FF"
            titleStyle={styles.insightTitle}
            subTitleStyle={styles.insightSubTitle}
            titleSubTitleGap={4}
          />
        </View>

        <NeumorphicCard
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={12}
        >
          <View style={styles.patientTopRow}>
            <View style={styles.patientLeft}>
              <InnerShadowIcon
                size={40}
                icon={
                  <Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>
                }
              />
              <Text style={styles.patientName}>{PATIENT_NAME}</Text>
            </View>
            <Text style={styles.timestamp}>06:44 PM</Text>
          </View>

          <Text style={styles.patientMessage}>{PATIENT_MESSAGE}</Text>

          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.analysisCard}
            contentStyle={styles.analysisContent}
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
            {FLAGGED_CONCERNS.map((item, index) => (
              <View
                key={item.id}
                style={[styles.concernRow, index > 0 && styles.concernRowSpaced]}
              >
                <StatusDot
                  color={item.color}
                  size={8}
                  outerGradientColors={[COLORS.LIGHT_SHADOW, COLORS.DARK_SHADOW]}
                />
                <Text style={styles.concernText}>{item.text}</Text>
              </View>
            ))}
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <View style={styles.actionsGrid}>
          <AppButton
            activeOpacity={0.8}
            style={styles.gridBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Schedule Urgent"
            textStyle={styles.outlineBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.URGENT_VISIT_SCHEDULING)
            }
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.gridBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Delegate Nurse"
            textStyle={styles.outlineBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.REQUESTED_ASSIGNED)
            }
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.gridBtn}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={COLORS.ALERT_LIGHT}
            text="Send to ER"
            textStyle={styles.alertBtnText}
            onPress={() => navigation.navigate(navigationStrings.SEND_TO_ER)}
          />
          <ReusableButton
            title="Message Patient"
            height={48}
            borderRadius={24}
            containerStyle={styles.messageBtnWrap}
            textStyle={styles.messageBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.PATIENT_CONCERN_MESSAGE_PATIENT)
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientConcernFlagged;

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
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
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
  messageRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  insightCard: { flex: 1 },
  insightTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  insightSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Display-Regular",
  },
  patientCardOuter: { width: "100%", marginTop: 16 },
  patientCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  patientTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  patientLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 8,
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
  timestamp: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  patientMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  analysisCard: { marginTop: 2 },
  analysisContent: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  concernRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  concernRowSpaced: { marginTop: 10 },
  concernText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  actionsGrid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  gridBtn: {
    width: "48%",
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
  alertBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.ALERT,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
  messageBtnWrap: {
    width: "48%",
  },
  messageBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
});
