import React, { useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import ReferralIcon from "../../../assets/icons/referral.svg";
import navigationStrings from "../../../constants/navigationStrings";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

type TabKey = "all" | "approved" | "pending";

type ReferralStatusKind = "approved" | "insurance_review";

type ReferralRow = {
  id: string;
  referralType: string;
  doctorName: string;
  dateLabel: string;
  kind: ReferralStatusKind;
};

const TABS_GAP = 10;
const HORIZONTAL = 16;
const TAB_HEIGHT = 40;
const TAB_CHIP_OUTER_HEIGHT = TAB_HEIGHT + 2;
const TAB_BORDER_RADIUS = 20;
const TAB_ROW_VERTICAL_PAD = 12;
const ICON_COL_W = 40;
const ICON_GAP = 10;

const TABS: { key: TabKey; label: string; width: number }[] = [
  { key: "all", label: "All", width: 86 },
  { key: "approved", label: "Approved", width: 118 },
  { key: "pending", label: "Pending", width: 118 },
];

const MOCK_REFERRALS: ReferralRow[] = [
  {
    id: "1",
    referralType: "Dermatology Referral",
    doctorName: "Dr. Lisa Shaw",
    dateLabel: "20 April 2025",
    kind: "approved",
  },
  {
    id: "2",
    referralType: "Dermatology Referral",
    doctorName: "Dr. Lisa Shaw",
    dateLabel: "20 April 2025",
    kind: "insurance_review",
  },
  {
    id: "3",
    referralType: "Cardiology Referral",
    doctorName: "Dr. Lisa Shaw",
    dateLabel: "20 April 2025",
    kind: "insurance_review",
  },
  {
    id: "4",
    referralType: "Dermatology Referral",
    doctorName: "Dr. Lisa Shaw",
    dateLabel: "20 April 2025",
    kind: "approved",
  },
  {
    id: "5",
    referralType: "Cardiology Referral",
    doctorName: "Dr. Lisa Shaw",
    dateLabel: "20 April 2025",
    kind: "insurance_review",
  },
];

function statusBadge(kind: ReferralStatusKind): {
  label: string;
  bg: string;
  fg: string;
  shadow: string;
} {
  if (kind === "approved") {
    return {
      label: "Approved",
      bg: COLORS.SUCCESS_BG,
      fg: COLORS.SUCCESS,
      shadow: "#A9E9D5",
    };
  }
  return {
    label: "Insurance Review",
    bg: "#FFF9E6",
    fg: "#B45309",
    shadow: "rgba(238, 182, 33, 0.35)",
  };
}

/** Same pattern as `InsuranceFilterChip` in `InsuranceEligibility`. */
const ReferralTabChip = ({
  title,
  chipWidth,
  selected,
  onPress,
}: {
  title: string;
  chipWidth: number;
  selected: boolean;
  onPress: () => void;
}) =>
  selected ? (
    <View style={[styles.filterPress, { width: chipWidth }]}>
      <ReusableButton
        title={title}
        gradientColors={["#3F97B2", "#14B8D4"]}
        borderGradientColors={["#D6E3F3", "#FFFFFF"]}
        onPress={onPress}
        width={chipWidth}
        height={TAB_CHIP_OUTER_HEIGHT}
        backgroundColor="#14B8D4"
        borderRadius={TAB_BORDER_RADIUS}
        containerStyle={styles.tabSelectedBtn}
        textStyle={styles.tabReusableTitle}
      />
    </View>
  ) : (
    <Pressable onPress={onPress} style={[styles.filterPress, { width: chipWidth }]}>
      <NeumorphicCard
        outerStyle={[styles.tabCardOuter, { width: chipWidth }]}
        innerStyle={styles.tabCardInner}
        borderRadius={TAB_BORDER_RADIUS}
      >
        <Text style={styles.unselectedTabLabel} numberOfLines={1}>
          {title}
        </Text>
      </NeumorphicCard>
    </Pressable>
  );

const ReferralStatus = () => {
  const navigation = useNavigation<any>();
  /** Tab UI only until API filtering is wired (see `MOCK_REFERRALS` → request by tab server-side or client-side). */
  const [tab, setTab] = useState<TabKey>("all");

  const renderRow: ListRenderItem<ReferralRow> = ({ item }) => {
    const st = statusBadge(item.kind);

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${item.referralType}, ${st.label}`}
        onPress={() => navigation.navigate(navigationStrings.REFERRAL_DETAIL)}
        style={({ pressed }) => [pressed && styles.rowPressed]}
      >
        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={10}
        >
          <View style={styles.cardRow}>
            <InnerShadowIcon
              icon={<ReferralIcon width={20} height={20} />}
              size={ICON_COL_W}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardMainCol}>
              <View style={styles.cardTopRow}>
                <View style={styles.titleCol}>
                  <Text style={styles.referralTitle} numberOfLines={1}>
                    {item.referralType}
                  </Text>
                </View>
                <View style={styles.badgeWrap}>
                  <DeltaBadge
                    icon={null}
                    value={st.label}
                    bgColor={st.bg}
                    darkShadowColor={st.shadow}
                    lightShadowColor="#FFFFFF99"
                    textColor={st.fg}
                    height={24}
                    textStyle={styles.statusBadgeText}
                  />
                </View>
              </View>
              <View style={styles.cardBottomRow}>
                <Image source={DoctorTempImage} style={styles.doctorAvatar} resizeMode="cover" />
                <Text style={styles.doctorName} numberOfLines={1}>
                  {item.doctorName}
                </Text>
                <Text style={styles.dateText}>{item.dateLabel}</Text>
              </View>
            </View>
          </View>
        </NeumorphicCard>
      </Pressable>
    );
  };

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
        <Text style={styles.headerTitle}>Referral Status</Text>
        <View style={styles.notifWrap}>
          <IconComponent
            icon={<NotificationIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
          />
          <View style={styles.notifDot} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBarScroll}
        contentContainerStyle={styles.tabBarContent}
        keyboardShouldPersistTaps="handled"
      >
        {TABS.map((item) => (
          <ReferralTabChip
            key={item.key}
            title={item.label}
            chipWidth={item.width}
            selected={tab === item.key}
            onPress={() => setTab(item.key)}
          />
        ))}
      </ScrollView>

      <FlatList
        style={styles.list}
        data={MOCK_REFERRALS}
        keyExtractor={(row) => row.id}
        renderItem={renderRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No referrals found.</Text>}
      />
    </SafeAreaView>
  );
};

export default ReferralStatus;

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
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  notifWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ALERT,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  tabBarScroll: {
    flexGrow: 0,
    marginTop: 18,
    overflow: "visible",
  },
  tabBarContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: HORIZONTAL,
    paddingRight: HORIZONTAL,
    paddingVertical: TAB_ROW_VERTICAL_PAD,
    gap: TABS_GAP,
  },
  filterPress: {
    flexShrink: 0,
    overflow: "visible",
  },
  tabCardOuter: {},
  tabCardInner: {
    paddingHorizontal: 16,
    height: TAB_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: TAB_BORDER_RADIUS,
  },
  tabSelectedBtn: {
    alignSelf: "stretch",
  },
  tabReusableTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
    paddingHorizontal: 6,
  },
  unselectedTabLabel: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Regular",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 10,
    paddingBottom: 28,
    gap: 18,
    flexGrow: 1,
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ICON_GAP,
  },
  cardMainCol: {
    flex: 1,
    minWidth: 0,
    gap: 0,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  titleCol: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 0,
  },
  referralTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
    lineHeight: 18,
    paddingVertical: 0,
    marginBottom: 0,
    ...Platform.select({
      android: { includeFontPadding: false },
      default: {},
    }),
  },
  badgeWrap: {
    flexShrink: 0,
    marginTop: -1,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -3,
  },
  doctorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  doctorName: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 15,
    ...Platform.select({
      android: { includeFontPadding: false },
      default: {},
    }),
  },
  dateText: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 15,
    ...Platform.select({
      android: { includeFontPadding: false },
      default: {},
    }),
    marginTop: 14,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  rowPressed: {
    opacity: Platform.OS === "ios" ? 0.94 : 1,
  },
});
