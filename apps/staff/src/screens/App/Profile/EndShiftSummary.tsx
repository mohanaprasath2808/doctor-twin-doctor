import React, { useContext } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import StatusDot from "../../../components/Common/StatusDot";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import { AuthContext } from "../../../context/AuthContext";

type SummaryMetric = {
  id: string;
  value: string;
  label: string;
};

type SummaryBullet = {
  id: string;
  text: string;
  dotColor: string;
};

const METRICS: SummaryMetric[] = [
  { id: "tasks", value: "12", label: "Tasks" },
  { id: "patients", value: "4", label: "Patients handled" },
];

const CRITICAL_ALERTS: SummaryBullet[] = [
  { id: "alert-1", text: "Chest pain case - Escalated", dotColor: "#FF6F6F" },
  { id: "alert-2", text: "High BP patient - Needs follow-up", dotColor: "#FF6F6F" },
];

const OVERDUE_TASKS: SummaryBullet[] = [
  { id: "overdue-1", text: "Lab review pending", dotColor: "#7A7A7A" },
  { id: "overdue-2", text: "Patient callback", dotColor: "#7A7A7A" },
  { id: "overdue-3", text: "Insurance verification", dotColor: "#7A7A7A" },
];

const H_PADDING = 16;
const TAB_BAR_CLEARANCE = 110;

const EndShiftSummary = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("EndShiftSummary must be used within AuthContextProvider");
  }
  const { setIsLogin } = authContext;
  const bottomPad = Math.max(insets.bottom, 12) + TAB_BAR_CLEARANCE;

  const renderBulletItem = ({ item }: { item: SummaryBullet }) => (
    <View style={styles.bulletRow}>
      <StatusDot color={item.dotColor} size={8} />
      <Text style={styles.bulletText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>End Shift Summary</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatarContainer}
            wrapperStyle={styles.heroAvatarWrap}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />
          <Text style={styles.heroSubtitle}>Here's your shift summary.</Text>

          <NeumorphicCard borderRadius={12} innerStyle={styles.sectionCardInner} outerStyle={styles.sectionCard}>
            <Text style={styles.sectionHeading}>Completed Today</Text>
            <View style={styles.metricsRow}>
              {METRICS.map((metric) => (
                <NeumorphicInnerShadowCard
                  key={metric.id}
                  borderRadius={10}
                  backgroundColor={COLORS.INNER_SURFACE}
                  containerStyle={styles.metricInnerCard}
                  contentStyle={styles.metricInnerContent}
                >
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                </NeumorphicInnerShadowCard>
              ))}
            </View>
          </NeumorphicCard>

          <NeumorphicCard borderRadius={12} innerStyle={styles.sectionCardInner} outerStyle={styles.sectionCard}>
            <Text style={styles.sectionHeading}>Critical Alerts ({CRITICAL_ALERTS.length})</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              backgroundColor={COLORS.INNER_SURFACE}
              containerStyle={styles.listInnerCard}
              contentStyle={styles.listInnerContent}
            >
              <FlatList
                data={CRITICAL_ALERTS}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={renderBulletItem}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              />
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <NeumorphicCard borderRadius={12} innerStyle={styles.sectionCardInner} outerStyle={styles.sectionCard}>
            <Text style={styles.sectionHeading}>Overdue Tasks ({OVERDUE_TASKS.length})</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              backgroundColor={COLORS.INNER_SURFACE}
              containerStyle={styles.listInnerCard}
              contentStyle={styles.listInnerContent}
            >
              <FlatList
                data={OVERDUE_TASKS}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={renderBulletItem}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              />
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <View style={styles.actionRow}>
            <AppButton
              text="End Shift"
              // width="48%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor="#FDECEC"
              textStyle={styles.endShiftText}
              onPress={() => { setIsLogin(false) }}
            />
            {/* <AppButton
              text="Review Shift"
              width="48%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.reviewText}
              onPress={() => navigation.goBack()}
            /> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EndShiftSummary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: H_PADDING,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  heroAvatarContainer: {
    marginTop: 20,
  },
  heroAvatarWrap: {
    width: 188,
    height: 188,
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  heroImage: {
    width: 116,
    height: 116,
    borderRadius: 100,
    resizeMode: "cover",
  },
  heroSubtitle: {
    marginTop: 6,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
  sectionCard: {
    marginTop: 14,
  },
  sectionCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  metricsRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  metricInnerCard: {
    flex: 1,
  },
  metricInnerContent: {
    minHeight: 0,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  metricLabel: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    textAlign: "center",
  },
  listInnerCard: {
    marginTop: 12,
  },
  listInnerContent: {
    minHeight: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bulletText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  itemSeparator: {
    height: 8,
  },
  actionRow: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  endShiftText: {
    color: COLORS.ALERT,
    fontSize: 16,
    fontWeight: "500",
  },
  reviewText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});
