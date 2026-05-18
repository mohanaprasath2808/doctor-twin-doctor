import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphismProgressTracker from "../../../neomorphism/NeumorphismProgressTracker";
import type { ProgressTrackerStep } from "../../../neomorphism/NeumorphismProgressTracker";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import YellowWarningIcon from "../../../assets/icons/yellowWarningIcon.svg";
import {
  fetchMedicationDetail,
  fetchRefillProgressSteps,
  MOCK_REFILL_ACTION,
} from "./data/medications.repository";
import type { MedicationDetail, RefillStatusParams } from "./types/medications.types";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const RefillStatus = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { medicationId } = (route.params ?? {}) as RefillStatusParams;

  const [detail, setDetail] = useState<MedicationDetail | null>(null);
  const [progressSteps, setProgressSteps] = useState<ProgressTrackerStep[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [medDetail, steps] = await Promise.all([
      fetchMedicationDetail(medicationId),
      fetchRefillProgressSteps(),
    ]);
    setDetail(medDetail);
    setProgressSteps(steps);
    setLoading(false);
  }, [medicationId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Refill Status</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={COLORS.PRIMARY} />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {detail ? (
            <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.heroInner} borderRadius={10}>
              <InnerShadowIcon
                icon={<MedicationsIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <View style={styles.heroTextWrap}>
                <Text style={styles.heroTitle}>{detail.name}</Text>
                <Text style={styles.heroSubtitle}>{detail.instructions}</Text>
              </View>
            </NeumorphicCard>
          ) : null}

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.progressInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Refill Progress</Text>
            <NeumorphismProgressTracker steps={progressSteps} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.actionInner}
            borderRadius={10}
          >
            <View style={styles.actionRow}>
              <InnerShadowIcon
                icon={<YellowWarningIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionTitle}>{MOCK_REFILL_ACTION.title}</Text>
                <Text style={styles.actionSubtitle}>{MOCK_REFILL_ACTION.subtitle}</Text>
              </View>
            </View>

            <ReusableButton
              title="View Next Steps"
              gradientColors={REUSABLE_GRADIENT}
              height={48}
              borderRadius={24}
              width="100%"
              containerStyle={styles.nextStepsBtn}
              onPress={() => navigation.navigate(navigationStrings.REFILL_NEXT_STEPS)}
            />
          </NeumorphicCard>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default RefillStatus;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 32,
  },
  cardOuter: {
    width: "100%",
  },
  cardGap: {
    marginTop: 14,
  },
  heroInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heroTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  progressInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  actionInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 14,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  actionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  nextStepsBtn: {
    alignSelf: "stretch",
  },
});
