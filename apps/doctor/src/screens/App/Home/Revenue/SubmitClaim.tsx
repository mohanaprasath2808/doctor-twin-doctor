import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import TimerIcon from "../../../../assets/icon/clock.svg";
import ProfileIcon from "../../../../assets/icon/blueProfile.svg";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const SubmitClaim = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 100 }]}
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
          <Text style={styles.headerTitle}>Submit Claim</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={14}>
          <View style={styles.detailRow}>
            <InnerShadowIcon size={44} radius={22} icon={<ProfileIcon width={18} height={18} />} />
            <View style={styles.detailText}>
              <Text style={styles.detailValue}>BlueCross</Text>
              <Text style={styles.detailLabel}>Payer</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <InnerShadowIcon size={44} radius={22} icon={<TimerIcon width={18} height={18} />} />
            <View style={styles.detailText}>
              <Text style={styles.detailValue}>$250</Text>
              <Text style={styles.detailLabel}>Amount</Text>
            </View>
          </View>
        </NeumorphicCard>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <ReusableButton
          title="Confirm Submission"
          height={52}
          borderRadius={26}
          containerStyle={styles.confirmBtn}
          onPress={() =>
            navigation.navigate(navigationStrings.ACTION_SUCCESS, {
              title: "Claim Submitted",
              subtitle: "Tracking ID: #12345",
              layout: "dualActions",
              secondaryButtonTitle: "Track Status",
              primaryButtonTitle: "Back to Dashboard",
              trackRouteName: navigationStrings.CLAIM_TIMELINE,
              resetRoutes: [
                { name: navigationStrings.HOME },
                { name: navigationStrings.REVENUE_DASHBOARD },
              ],
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SubmitClaim;

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
    paddingTop: 6,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
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
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  detailText: {
    flex: 1,
    gap: 3,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 4,
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  confirmBtn: {
    width: "100%",
  },
});
