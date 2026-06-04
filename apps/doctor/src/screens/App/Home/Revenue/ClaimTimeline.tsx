import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphismProgressTracker, {
  type ProgressTrackerStep,
} from "../../../../neomorphism/NeumorphismProgressTracker";

const CLAIM_TIMELINE_STEPS: ProgressTrackerStep[] = [
  { id: "visit", label: "Visit created", completed: true, dateLabel: "06:40 PM" },
  { id: "generated", label: "Claim generated", completed: false, dateLabel: "06:45 PM" },
  { id: "submitted", label: "Submitted to payer", completed: false, dateLabel: "06:50 PM" },
  { id: "denial", label: "Denial Code", completed: false, dateLabel: "07:05 PM" },
  { id: "appeal", label: "Appeal submitted", completed: false, dateLabel: "07:20 PM" },
  { id: "paid", label: "Paid", completed: false, dateLabel: "07:50 PM" },
];

const ClaimTimeline = () => {
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
          <Text style={styles.headerTitle}>Claim Timeline</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.timelineOuter}
          innerStyle={styles.timelineInner}
          borderRadius={14}
          clipInner={false}
        >
          <NeumorphismProgressTracker steps={CLAIM_TIMELINE_STEPS} />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimTimeline;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  timelineOuter: {
    marginTop: 24,
    width: "100%",
  },
  timelineInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});
