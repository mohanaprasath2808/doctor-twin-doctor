import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import AppButton from "../../../../components/Common/AppButton";
import StatusDot from "../../../../components/Common/StatusDot";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import LabsTrendChart from "./LabsTrendChart";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import NotificationIcon from "../../../../assets/icon/notificationIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import navigationStrings from "../../../../constants/navigationStrings";

const LabAlertDecision = () => {
  const navigation = useNavigation<any>();
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
          wrapperStyle={styles.avatarWrapper}
          imageStyle={styles.avatarImage}
        />
        <View style={styles.messageRow}>
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
          <InsightMessageCard
            title="Laboratory Alert"
            subTitle="Abnormal lab needs your decision."
            bgColor="#CBF0FF"
            titleStyle={styles.alertTitle}
            subTitleStyle={styles.alertSubTitle}
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
                icon={<Text style={styles.initials}>SW</Text>}
              />
              <View style={styles.nameWrap}>
                <Text style={styles.patientName}>Sarah Williams</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>Female</Text>
                  <View style={styles.metaDot} />
                  <Text style={styles.metaText}>Age 45</Text>
                </View>
              </View>
            </View>
            <NeumorphicCard
              outerStyle={styles.criticalOuter}
              innerStyle={styles.criticalInner}
              borderRadius={14}
              backgroundColor={COLORS.ALERT_LIGHT}
            >
              <Text style={styles.criticalText}>Critical</Text>
            </NeumorphicCard>
          </View>
          <View style={styles.inlineChartWrap}>
            <LabsTrendChart title="HbA1c" value="9.2%" />
          </View>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.innerAlertCard}
            contentStyle={styles.innerAlertContent}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor="#C8CBCC"
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor="#FFFFFF99"
          >
            <View style={styles.alertLineRow}>
              <StatusDot color="#FF6B6B" style={styles.alertDot} />
              <Text style={styles.alertLine}>
                Renal Function labs are Overdue
              </Text>
            </View>
            <View style={[styles.alertLineRow, { marginTop: 10 }]}>
              <StatusDot color="#EEB621" style={styles.alertDot} />
              <Text style={styles.alertLine}>A1C level elevated</Text>
            </View>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>
        <View style={styles.actionsGrid}>
          <AppButton
            text="Order Repeat Test"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
            onPress={() => navigation.navigate(navigationStrings.LABS_DETAIL)}
          />
          <AppButton
            text="Delegate"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
          />
          <AppButton
            text="Review Full chart"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
            onPress={() =>
              navigation.navigate(navigationStrings.FULL_PATIENT_CHART)
            }
          />
          <AppButton
            text="Escalate Urgent"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
          />
        </View>
        <View style={styles.spaceBetween}>
          <ReusableButton
            title="Schedule Patient"
            width="100%"
            height={44}
            borderRadius={22}
            textStyle={styles.scheduleBtnText}
            containerStyle={styles.scheduleBtnWrap}
            onPress={() =>
              navigation.navigate(navigationStrings.SCHEDULE_VISIT)
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LabAlertDecision;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.PRIMARY },
  avatarWrapper: { width: 180, height: 180 },
  avatarImage: { width: 110, height: 110, borderRadius: 55 },
  messageRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 16,
  },
  alertTitle: { fontSize: 14, fontWeight: "500", color: COLORS.PRIMARY },
  alertSubTitle: { fontSize: 14, fontWeight: "400", color: COLORS.TEXT_80 },
  patientCardOuter: { marginTop: 14, marginHorizontal: 16 },
  patientCardInner: { padding: 12 },
  patientTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  patientLeft: { flexDirection: "row", flex: 1, marginRight: 10 },
  initials: { fontSize: 16, fontWeight: "600", color: COLORS.PRIMARY_DARK },
  nameWrap: { marginLeft: 10 },
  patientName: { fontSize: 16, fontWeight: "600", color: COLORS.TEXT_DARK },
  metaRow: { marginTop: 2, flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 13, color: COLORS.TEXT_70, fontWeight: "400" },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
    marginHorizontal: 6,
  },
  criticalOuter: { minWidth: 72 },
  criticalInner: {
    height: 28,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  criticalText: { color: COLORS.ALERT, fontSize: 12, fontWeight: "500" },
  inlineChartWrap: { marginBottom: 25 },
  innerAlertCard: { marginBottom: 6 },
  innerAlertContent: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: "center",
  },
  alertLine: { fontSize: 14, color: COLORS.TEXT_DARK, fontWeight: "500" },
  alertLineRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  alertDot: { marginRight: 8 },
  actionsGrid: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
  actionButton: { width: "48%", height: 48, borderRadius: 24 },
  actionText: { fontSize: 16, color: COLORS.PRIMARY_DARK, fontWeight: "500" },
  scheduleBtnWrap: { marginTop: 14 },
  scheduleBtnText: { fontSize: 16, fontWeight: "600", color: COLORS.WHITE },
  spaceBetween: { paddingHorizontal: 16, marginTop: 10 },
});
