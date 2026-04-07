import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import BackIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import TodayVisitIcon from "../../../assets/icon/todayVisitIcon.svg";
import RevenueIcon from "../../../assets/icon/revenueIcon.svg";
import UtilizationIcon from "../../../assets/icon/utilizationIcon.svg";
import PatientIcon from "../../../assets/icon/patientIcon.svg";
import InteligentIcon from "../../../assets/icon/intelliganceIcon.svg";
import navigationStrings from "../../../constants/navigationStrings";

const ReportHub = () => {
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
          <Text style={styles.headerTitle}>Report Hub</Text>
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

        <View style={styles.messageRow}>
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
          <View style={styles.messageCard}>
            <Text style={styles.messageHeading}>Hi Dr.Twin</Text>
            <Text style={styles.messageSub}>
              Please choose a report category:
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <CategoryCard
            icon={<TodayVisitIcon width={18} height={18} />}
            title={"Clinical\nPerformance"}
            points={[
              "Care gaps",
              "Preventive compliance",
              "Chronic disease control",
            ]}
          />
          <CategoryCard
            icon={<RevenueIcon width={18} height={18} />}
            title={"Revenue\nIntelligence"}
            points={["Coding improvement", "Missed charges", "Denial Risk"]}
          />
          <CategoryCard
            icon={<UtilizationIcon width={18} height={18} />}
            title={"Operational\nFlow"}
            points={["Bottlenecks", "Wait time", "Staff load"]}
          />
          <CategoryCard
            icon={<PatientIcon width={18} height={18} />}
            title={"Patient\nIntelligence"}
            points={["High-risk patients", "Non-compliant", "Recall targets"]}
          />
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.aiCard}>
          <InnerShadowIcon
            icon={<InteligentIcon width={24} height={24} />}
            size={34}
          />
          <View style={styles.aiTextWrap}>
            <Text style={styles.aiTitle}>AI Learning & Automation</Text>
            <Text style={styles.aiSub}>AI confidence • Automation success</Text>
            <Text style={styles.aiSub}>Brain learning trends</Text>
          </View>
          <Text style={styles.aiArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backBtn}
          onPress={() =>
            navigation.navigate(navigationStrings.PRACTICE_INTELLIGENCE)
          }
        >
          <Text style={styles.backBtnText}>Back to inteligence</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const CategoryCard = ({
  icon,
  title,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  points: string[];
}) => (
  <View style={styles.categoryCardOuter}>
    <View
      pointerEvents="none"
      style={[styles.categoryCardShadowLayer, styles.categoryCardShadowDark]}
    />
    <View
      pointerEvents="none"
      style={[styles.categoryCardShadowLayer, styles.categoryCardShadowLight]}
    />
    <View
      pointerEvents="none"
      style={[styles.categoryCardShadowLayer, styles.categoryCardShadowSoft]}
    />
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <InnerShadowIcon icon={icon} size={34} />
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
      <View style={styles.pointsWrap}>
        {points.map((point) => (
          <Text key={point} style={styles.pointText}>
            • {point}
          </Text>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
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
  messageRow: {
    marginTop: 8,
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
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 6,
  },
  grid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  categoryCardOuter: {
    width: "48%",
    position: "relative",
    overflow: "visible",
    borderRadius: 14,
  },
  categoryCardShadowLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 14,
  },
  categoryCardShadowDark: {
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
  categoryCardShadowLight: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
    }),
  },
  categoryCardShadowSoft: {
    ...Platform.select({
      ios: {
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
    }),
  },
  categoryCard: {
    width: "100%",
    backgroundColor: COLORS.SURFACE,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  categoryTitle: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  pointsWrap: { marginTop: 10, gap: 6 },
  pointText: { color: COLORS.TEXT_70, fontSize: 14 },
  aiCard: {
    marginTop: 12,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#A0B4C8",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  aiTextWrap: { flex: 1, marginLeft: 10 },
  aiTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  aiSub: { color: COLORS.TEXT_60, fontSize: 14 },
  aiArrow: { color: COLORS.TEXT_50, fontSize: 28, lineHeight: 28 },
  backBtn: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 26,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.SURFACE,
    shadowColor: "#A0B4C8",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  backBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "600" },
});

export default ReportHub;
