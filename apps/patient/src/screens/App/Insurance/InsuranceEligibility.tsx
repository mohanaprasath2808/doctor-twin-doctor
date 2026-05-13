import React, { useState } from "react";
import {
  FlatList,
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
import InsuranceIcon from "../../../assets/icons/insurance.svg";
import WhitePlusIcon from "../../../assets/icons/whitePlusIcon.svg";
import navigationStrings from "../../../constants/navigationStrings";

type TabKey = "all" | "pending" | "rejected" | "verified";

type InsuranceRowStatus = "verified" | "pending" | "rejected" | "need_update" | "expired";

type InsurancePlanRow = {
  id: string;
  carrierName: string;
  memberId: string;
  groupNumber: string;
  status: InsuranceRowStatus;
};

const TABS_GAP = 10;
const HORIZONTAL = 16;
/** Inner face height for unselected `NeumorphicCard` chips. */
const TAB_HEIGHT = 40;
/**
 * Selected `ReusableButton` must match unselected outer height: `NeumorphicCard` wraps the face
 * with `border` `padding: 1` (+2 px vs inner `TAB_HEIGHT`).
 */
const TAB_CHIP_OUTER_HEIGHT = TAB_HEIGHT + 2;
const TAB_BORDER_RADIUS = 20;
/** Vertical inset so tab chip / `ReusableButton` / `NeumorphicCard` shadows are not clipped (doctor `Patients` uses an open row, not a height-capped list). */
const TAB_ROW_VERTICAL_PAD = 12;

/** Same gradient styling as appointments primary actions. */
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const TABS: { key: TabKey; label: string; width: number }[] = [
  { key: "all", label: "All", width: 86 },
  { key: "pending", label: "Pending", width: 118 },
  { key: "rejected", label: "Rejected", width: 120 },
  { key: "verified", label: "Verified", width: 118 },
];

const MOCK_INSURANCE: InsurancePlanRow[] = [
  {
    id: "1",
    carrierName: "Blue Cross Blue Shield",
    memberId: "BHHGJSJ9833",
    groupNumber: "12345",
    status: "verified",
  },
  {
    id: "2",
    carrierName: "United Healthcare Choice",
    memberId: "UMH98234102",
    groupNumber: "99821",
    status: "verified",
  },
  {
    id: "3",
    carrierName: "Aetna PPO Premier",
    memberId: "AETPX772199",
    groupNumber: "44001",
    status: "pending",
  },
  {
    id: "4",
    carrierName: "Cigna Open Access Plus",
    memberId: "CGN884120",
    groupNumber: "77220",
    status: "rejected",
  },
  {
    id: "5",
    carrierName: "Humana Preferred",
    memberId: "HMN3340192",
    groupNumber: "50112",
    status: "need_update",
  },
  {
    id: "6",
    carrierName: "Kaiser Permanente",
    memberId: "KP20199401",
    groupNumber: "90100",
    status: "expired",
  },
];

/** Same `{ bg, fg, shadow }` + `DeltaBadge` wiring as past appointments (`Appointments` `renderPast`). */
function appointmentStyleStatusBadge(status: InsuranceRowStatus): {
  label: string;
  bg: string;
  fg: string;
  shadow: string;
} {
  switch (status) {
    case "verified":
      return {
        label: "Verified",
        bg: "#D3FFF1",
        fg: COLORS.SUCCESS,
        shadow: "#A9E9D5",
      };
    case "pending":
      return {
        label: "Pending",
        bg: COLORS.ESCALATION_BG,
        fg: COLORS.ESCALATION,
        shadow: "rgba(238, 182, 33, 0.35)",
      };
    case "rejected":
      return {
        label: "Rejected",
        bg: "#FDECEC",
        fg: COLORS.ALERT,
        shadow: "#F2CACA",
      };
    case "need_update":
      return {
        label: "Need Update",
        bg: "#DBEAFE",
        fg: "#1E40AF",
        shadow: "rgba(30, 64, 175, 0.2)",
      };
    default:
      return {
        label: "Expired",
        bg: COLORS.CRITICAL_BG,
        fg: COLORS.CRITICAL,
        shadow: "#F2CACA",
      };
  }
}

/** Selected `ReusableButton` gradient; unselected `NeumorphicCard` — mirrors `AppointmentTabChip`. */
const InsuranceFilterChip = ({
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

const InsuranceEligibility = () => {
  const navigation = useNavigation<any>();
  /** Visual tab selection only; list is never filtered by tab. */
  const [tab, setTab] = useState<TabKey>("all");

  const navigateForRow = (row: InsurancePlanRow) => {
    if (row.status === "verified") {
      navigation.navigate(navigationStrings.INSURANCE_VERIFIED_DETAIL, {
        carrierName: row.carrierName,
        memberId: row.memberId,
        groupNumber: row.groupNumber,
      });
      return;
    }
    if (row.status === "need_update") {
      navigation.navigate(navigationStrings.INSURANCE_NEED_UPDATE_DETAIL, {
        status: "need_update",
      });
    }
  };

  const renderRow: ListRenderItem<InsurancePlanRow> = ({ item }) => {
    const statusStyle = appointmentStyleStatusBadge(item.status);
    const navigable = item.status === "verified" || item.status === "need_update";

    const cardFace = (
      <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
        <View style={styles.cardTopRow}>
          <InnerShadowIcon
            icon={<InsuranceIcon width={20} height={20} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <View style={styles.infoTextWrap}>
            <Text style={styles.carrierName} numberOfLines={1}>
              {item.carrierName}
            </Text>
            <Text style={styles.memberId}>
              Member ID:<Text style={styles.memberIdValue}>{" " + item.memberId}</Text>
            </Text>
          </View>
          <View style={styles.statusBadgeWrap}>
            <DeltaBadge
              icon={null}
              value={statusStyle.label}
              bgColor={statusStyle.bg}
              darkShadowColor={statusStyle.shadow}
              lightShadowColor="#FFFFFF99"
              textColor={statusStyle.fg}
              height={28}
              textStyle={styles.statusBadgeText}
            />
          </View>
        </View>
      </NeumorphicCard>
    );

    if (!navigable) {
      return cardFace;
    }

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${item.carrierName}, ${statusStyle.label}`}
        onPress={() => navigateForRow(item)}
        style={({ pressed }) => [pressed && styles.rowPressed]}
      >
        {cardFace}
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
        <Text style={styles.headerTitle}>Insurance & Eligibility</Text>
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
          <InsuranceFilterChip
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
        data={MOCK_INSURANCE}
        keyExtractor={(row) => row.id}
        renderItem={renderRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <ReusableButton
          title="Add New Insurance"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          leadingIcon={<WhitePlusIcon width={16} height={16} />}
          onPress={() =>
            navigation.navigate(navigationStrings.ADD_NEW_INSURANCE, { update: false })
          }
          containerStyle={styles.footerCta}
        />
      </View>
    </SafeAreaView>
  );
};

export default InsuranceEligibility;

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
    fontFamily: "SF-Pro-Text-Medium",
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
    backgroundColor: COLORS.CRITICAL,
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
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  infoTextWrap: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  statusBadgeWrap: {
    flexShrink: 0,
  },
  carrierName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  memberId: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  memberIdValue: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_80,
    fontFamily: "SF-Pro-Text-Medium",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 18 : 10,
  },
  footerCta: {
    alignSelf: "stretch",
  },
  rowPressed: {
    opacity: Platform.OS === "ios" ? 0.94 : 1,
  },
});
