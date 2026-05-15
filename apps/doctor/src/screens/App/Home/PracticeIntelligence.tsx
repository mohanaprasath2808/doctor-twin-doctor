import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import BackIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import RevenueIcon from "../../../assets/icon/revenueIcon.svg";
import DelegationHubIcon from "../../../assets/icon/delegationHubIcon.svg";
import ScheduleIcon from "../../../assets/icon/scheduleIcon.svg";
import TodayVisitIcon from "../../../assets/icon/todayVisitIcon.svg";
import RecallIcon from "../../../assets/icon/recallIcon.svg";
import UtilizationIcon from "../../../assets/icon/utilizationIcon.svg";
import PatientIcon from "../../../assets/icon/patientIcon.svg";
import IncreaseIcon from "../../../assets/icon/increaseIcon.svg";
import DecreaseIcon from "../../../assets/icon/decreaseIcon.svg";
import navigationStrings from "../../../constants/navigationStrings";
const PracticeIntelligence = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
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
          <Text style={styles.headerTitle}>Practice Intelligence</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.title}>Dr. Twin delivering practice insights</Text>

        <View style={styles.messageRow}>
          {/* Temporary disabled */}
          {/* <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          /> */}
          <InsightMessageCard
            title="Here is your daily practice performance analysis"
            subTitle="Would you like to review the key metrics"
            bgColor="#CBF0FF"
          />
        </View>

        <View style={styles.grid}>
          <MetricCard
            icon={<RevenueIcon width={18} height={18} />}
            title="Revenue"
            value="$33,722"
            delta="+5.5"
            positive
          />
          <MetricCard
            icon={<PatientIcon width={18} height={18} />}
            title="Patient"
            value="233"
            delta="-5"
          />
          <MetricCard
            icon={<RecallIcon width={18} height={18} />}
            title="Recalls"
            value="34"
            delta="+5.5"
            positive
          />
          <MetricCard
            icon={<UtilizationIcon width={18} height={18} />}
            title="Utilization"
            value="$33,722"
            delta="-5"
          />
        </View>

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="View Reports"
            textStyle={styles.primaryBtnText}
            onPress={() => navigation.navigate(navigationStrings.REPORT_HUB)}
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={COLORS.ALERT_LIGHT}
            text="Exit Insights"
            textStyle={styles.secondaryBtnText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MetricCard = ({
  icon,
  title,
  value,
  delta,
  positive = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  delta: string;
  positive?: boolean;
}) => (
  <NeumorphicCard
    outerStyle={styles.metricCardOuter}
    innerStyle={styles.metricCard}
    borderRadius={14}
  >
    <View style={styles.metricHeader}>
      <InnerShadowIcon icon={icon} size={40} />
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <View style={styles.metricFooter}>
      <DeltaBadge
        icon={
          positive ? (
            <IncreaseIcon width={12} height={12} />
          ) : (
            <DecreaseIcon width={12} height={12} />
          )
        }
        value={delta}
        height={24}
        bgColor={positive ? "#D3FFF1" : COLORS.ALERT_LIGHT}
        darkShadowColor={positive ? "#A9E9D5" : "#F2CACA"}
        lightShadowColor="#FFFFFF99"
        textColor={positive ? COLORS.GREEN : COLORS.ALERT}
      />
      <Text style={styles.lastWeek}>From last week</Text>
    </View>
  </NeumorphicCard>
);

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
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    textAlign: "center",
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
  avatar: { width: 150, height: 150, borderRadius: 115, resizeMode: "contain" },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  messageRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  grid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    columnGap: 16,
  },
  metricCardOuter: {
    width: "47.5%",
    borderRadius: 10,
  },
  metricCard: {
    width: "100%",
    borderRadius: 10,
    padding: 12,
  },
  metricHeader: { flexDirection: "row", alignItems: "center", gap: 15 },
  metricTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  metricValue: {
    marginTop: 16,
    color: COLORS.TEXT_DARK,
    fontSize: 24,
    fontWeight: "500",
  },
  metricFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  lastWeek: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
  actionsRow: { marginTop: 20, flexDirection: "row", gap: 12 },
  actionBtnBase: {
    flex: 1,
    borderRadius: 26,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  secondaryBtnText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
});

export default PracticeIntelligence;
