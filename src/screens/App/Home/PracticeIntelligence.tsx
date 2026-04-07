import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import DeltaBadge from "../../../components/Common/DeltaBadge";
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
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
          <View style={styles.messageCard}>
            <Text style={styles.messageHeading}>
              Here is your daily practice performance analysis
            </Text>
            <Text style={styles.messageSub}>
              Would you like to review the key metrics
            </Text>
          </View>
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.primaryBtn, styles.actionBtnShadow]}
            onPress={() => navigation.navigate(navigationStrings.REPORT_HUB)}
          >
            <Text style={styles.primaryBtnText}>View Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.secondaryBtn, styles.actionBtnShadow]}
          >
            <Text style={styles.secondaryBtnText}>Exit Insights</Text>
          </TouchableOpacity>
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
  <View style={styles.metricCardOuter}>
    <View
      pointerEvents="none"
      style={[
        styles.metricCardShadowLayer,
        styles.metricCardShadowDark,
        { borderRadius: 14 },
      ]}
    />
    <View
      pointerEvents="none"
      style={[
        styles.metricCardShadowLayer,
        styles.metricCardShadowLight,
        { borderRadius: 14 },
      ]}
    />
    <View
      pointerEvents="none"
      style={[
        styles.metricCardShadowLayer,
        styles.metricCardShadowSoft,
        { borderRadius: 14 },
      ]}
    />
    <View style={styles.metricCard}>
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
          bgColor={positive ? "#D3FFF1" : "#FDECEC"}
          darkShadowColor={positive ? "#A9E9D5" : "#F2CACA"}
          textColor={positive ? COLORS.GREEN : COLORS.ALERT}
        />
        <Text style={styles.lastWeek}>From last week</Text>
      </View>
    </View>
  </View>
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
  messageCard: {
    flex: 1,
    backgroundColor: "#CBF0FF",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  messageHeading: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  messageSub: {
    color: COLORS.TEXT_70,
    fontSize: 14,
    marginTop: 6,
    fontWeight: "400",
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
    position: "relative",
    overflow: "visible",
    borderRadius: 10,
  },
  metricCardShadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.SURFACE,
  },
  metricCardShadowDark: {
    ...Platform.select({
      ios: {
        shadowColor: "#C8CBCC",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  metricCardShadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
    }),
  },
  metricCardShadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
    }),
  },
  metricCard: {
    width: "100%",
    backgroundColor: COLORS.SURFACE,
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
  actionBtnShadow: {
    boxShadow:
      "4px 4px 20px 0px #C8CBCC, 2px 2px 4px 0px rgba(114, 142, 171, 0.1)",
    elevation: 6,
  },
  primaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 26,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.SURFACE,
  },
  primaryBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.ALERT,
    borderRadius: 26,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDECEC",
  },
  secondaryBtnText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
});

export default PracticeIntelligence;
