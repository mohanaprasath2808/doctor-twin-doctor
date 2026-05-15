import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import StatusDot from "../../../components/Common/StatusDot";
import IconComponent from "../../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import HealthJournalTrendsChart from "./components/HealthJournalTrendsChart";
import {
  HEALTH_JOURNAL_TRENDS_CONFIGS,
  HealthJournalTrendType,
} from "./types/healthJournalTrendsConfig";

export type HealthJournalTrendsParams = {
  trendType?: HealthJournalTrendType;
};

const FOOTER_BTN_HEIGHT = 48;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const HealthJournalTrends = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const trendType: HealthJournalTrendType = route?.params?.trendType ?? "blood_pressure";
  const config = HEALTH_JOURNAL_TRENDS_CONFIGS[trendType];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>{config.title}</Text>
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

          <Text style={styles.statusMessage}>{config.statusMessage}</Text>

          <NeumorphicCard
            outerStyle={styles.sectionOuter}
            innerStyle={styles.trendsSectionInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Trends</Text>
            <HealthJournalTrendsChart chartLines={config.chartLines} legend={config.legend} />
            <View style={styles.legendRow}>
              {config.legend.map((item) => (
                <View key={item.key} style={styles.legendItem}>
                  <StatusDot color={item.color} size={8} />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.sectionOuter, styles.sectionGap]}
            innerStyle={styles.sectionInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Summary</Text>
            <NeumorphicInnerShadowCard
              borderRadius={12}
              containerStyle={styles.summaryInsetOuter}
              contentStyle={styles.summaryInsetInner}
              darkShadowColor={COLORS.DARK_SHADOW}
              lightShadowColor={COLORS.LIGHT_SHADOW}
            >
              <Text style={styles.summaryLabel}>{config.summaryLabel}</Text>
              <Text style={styles.summaryValue}>{config.summaryValue}</Text>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <View style={styles.midActionsRow}>
            <View style={styles.midActionHalf}>
              <AppButton
                text="Message Doctor"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                height={FOOTER_BTN_HEIGHT}
                borderRadius={24}
                width="100%"
                textStyle={styles.outlineBtnText}
                onPress={() => undefined}
              />
            </View>
            <View style={styles.midActionHalf}>
              <AppButton
                text="Lifestyle Tips"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                height={FOOTER_BTN_HEIGHT}
                borderRadius={24}
                width="100%"
                textStyle={styles.outlineBtnText}
                onPress={() => undefined}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton
            title="Set Reminder"
            height={FOOTER_BTN_HEIGHT}
            borderRadius={24}
            width="100%"
            gradientColors={REUSABLE_GRADIENT}
            onPress={() => undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 12,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    resizeMode: "cover",
  },
  statusMessage: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  sectionOuter: {
    marginTop: 18,
    width: "100%",
  },
  sectionGap: {
    marginTop: 14,
  },
  sectionInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  trendsSectionInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 6,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  legendRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
  },
  summaryInsetOuter: {
    marginTop: 8,
    width: "100%",
  },
  summaryInsetInner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  midActionsRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  midActionHalf: {
    flex: 1,
    minWidth: 0,
  },
  outlineBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 8 : 12,
    backgroundColor: COLORS.SURFACE,
  },
});

export default HealthJournalTrends;
