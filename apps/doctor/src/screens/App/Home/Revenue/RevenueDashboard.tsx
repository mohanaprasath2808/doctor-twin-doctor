import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import NotificationIcon from "../../../../assets/icon/notificationIcon.svg";
import RightArrow from "../../../../assets/icon/rightArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";
import { useAppStore } from "../../../../store/useAppStore";

type RevenueRow = {
  id: string;
  label: string;
  action: string;
  alert?: boolean;
};

const REVENUE_ROWS: RevenueRow[] = [
  { id: "ar", label: "Account Receivable", action: "View Summary" },
  { id: "incomplete", label: "Claims Incomplete", action: "35 Need Fixing" },
  { id: "unsigned", label: "Unsigned Claims", action: "17 Need Review" },
  { id: "denied", label: "Denied Claims", action: "8 Denied Claims" },
  { id: "payments", label: "Payments Month to Date", action: "View Payments" },
  { id: "charges", label: "Charges Month to Date", action: "View Charges" },
  {
    id: "records",
    label: "Claims Need Records Submission",
    action: "12 Need Document",
  },
  {
    id: "denial-stats",
    label: "Denial Reasons Statistics",
    action: "$345 Written Off",
  },
  { id: "flags", label: "Flags", action: "5 Billing Alerts", alert: true },
];

function ActionPill({ label, alert }: { label: string; alert?: boolean }) {
  return (
    <NeumorphicCard
      outerStyle={styles.pillOuter}
      innerStyle={styles.pillInner}
      borderRadius={18}
    >
      <Text style={[styles.pillText, alert && styles.pillTextAlert]} numberOfLines={1}>
        {label}
      </Text>
      <RightArrow width={10} height={10} style={styles.pillArrow} />
    </NeumorphicCard>
  );
}

const RevenueDashboard = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const notificationsData = useAppStore((s) => s.notificationsData);
  const bottomPad = 16 + insets.bottom;

  const renderRow: ListRenderItem<RevenueRow> = useCallback(
    ({ item }) => (
      <NeumorphicCard
        outerStyle={styles.rowOuter}
        innerStyle={styles.rowInner}
        borderRadius={12}
        onPress={
          item.id === "ar"
            ? () => navigation.navigate(navigationStrings.ACCOUNT_RECEIVABLE)
            : item.id === "incomplete"
              ? () => navigation.navigate(navigationStrings.CLAIMS_NEED_FIXING)
              : item.id === "unsigned"
                ? () => navigation.navigate(navigationStrings.UNSIGNED_CLAIMS)
                : item.id === "denied"
                  ? () => navigation.navigate(navigationStrings.DENIED_CLAIMS)
                  : item.id === "payments"
                    ? () => navigation.navigate(navigationStrings.PAYMENTS_MONTH_TO_DATE)
                    : item.id === "charges"
                      ? () => navigation.navigate(navigationStrings.CHARGES_MONTH_TO_DATE)
                      : undefined
        }
      >
        <Text style={styles.rowLabel}>{item.label}</Text>
        <ActionPill label={item.action} alert={item.alert} />
      </NeumorphicCard>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.SURFACE} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingLight}>Good Morning</Text>
              <Text style={styles.greetingBold}>Dr. Soliman</Text>
            </View>
          </View>
          <View style={styles.bellWrap}>
            <IconComponent
              icon={<NotificationIcon width={20} height={20} />}
              width={44}
              height={44}
              radius={22}
              onPress={() => {}}
            />
            {notificationsData.length > 1 && <View style={styles.bellDot} />}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Revenue Dashboard</Text>

        <FlatList
          data={REVENUE_ROWS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          removeClippedSubviews={false}
          renderItem={renderRow}
          ItemSeparatorComponent={() => <View style={styles.rowGap} />}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />

        <ReusableButton
          title="Message to Biller"
          height={52}
          borderRadius={26}
          containerStyle={styles.messageBtn}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RevenueDashboard;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  greetingLight: {
    fontSize: 16,
    color: COLORS.TEXT_80,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
  },
  greetingBold: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    paddingTop: 3,
  },
  bellWrap: {
    width: 44,
    height: 44,
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.ALERT,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Semibold",
    color: COLORS.TEXT_DARK,
  },
  list: {
    width: "100%",
    overflow: "visible",
  },
  listContent: {
    overflow: "visible",
    paddingVertical: 6,
  },
  rowGap: {
    height: 10,
  },
  rowOuter: {
    width: "100%",
    overflow: "visible",
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowLabel: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
    lineHeight: 18,
  },
  pillOuter: {
    flexShrink: 0,
    maxWidth: "52%",
  },
  pillInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pillText: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.PRIMARY_DARK,
  },
  pillTextAlert: {
    color: COLORS.ALERT,
  },
  pillArrow: {
    opacity: 0.7,
  },
  messageBtn: {
    marginTop: 24,
    width: "100%",
  },
});
