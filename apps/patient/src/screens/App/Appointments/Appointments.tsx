import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import AppointmentDummy from "../../../assets/images/tempImage/appointmentDummy.png";
import WhitePlusIcon from "../../../assets/icons/whitePlusIcon.svg";
type TabKey = "upcoming" | "past";

type UpcomingAppointment = {
  id: string;
  datetime: string;
  doctor: string;
  clinic: string;
};

type PastAppointment = UpcomingAppointment & {
  status: "cancelled" | "completed";
};

const UPCOMING: UpcomingAppointment[] = [
  {
    id: "u1",
    datetime: "Mon, Apr 30 – 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic · Torrance, CA",
  },
  {
    id: "u2",
    datetime: "Mon, Apr 30 – 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic · Torrance, CA",
  },
  {
    id: "3",
    datetime: "Thu, Apr 04 – 2:00 PM",
    doctor: "Consult with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic \u00b7 Torrance, CA",
  },
];

const PAST: PastAppointment[] = [
  {
    id: "p1",
    datetime: "Mon, Apr 30 — 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic · Torrance, CA",
    status: "cancelled",
  },
  {
    id: "p2",
    datetime: "Mon, Apr 30 — 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic · Torrance, CA",
    status: "completed",
  },
];

const TABS_GAP = 10;
const HORIZONTAL = 16;

/** Shared fill gradient for `ReusableButton` usages on this screen. */
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const HEIGHT_CARD_ROW_BTN = 40;
const HEIGHT_SCHEDULE_FOOTER = 48;

const Appointments = () => {
  const navigation = useNavigation<any>();
  const { width: windowWidth } = useWindowDimensions();
  const [tab, setTab] = useState<TabKey>("upcoming");

  const tabChipWidth = useMemo(
    () => Math.max(120, Math.floor((windowWidth - HORIZONTAL * 2 - TABS_GAP) / 2)),
    [windowWidth],
  );

  const listData = tab === "upcoming" ? UPCOMING : PAST;

  const renderUpcoming: ListRenderItem<UpcomingAppointment> = ({ item }) => (
    <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
      <View style={styles.cardTopRow}>
        <Image source={AppointmentDummy} style={styles.avatar} />
        <View style={styles.infoTextWrap}>
          <Text style={styles.datetimeText}>{item.datetime}</Text>
          <Text style={styles.doctorText}>{item.doctor}</Text>
          <Text style={styles.clinicText}>{item.clinic}</Text>
        </View>
      </View>
      <AppButton
        text="View Details"
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        height={HEIGHT_CARD_ROW_BTN}
        borderRadius={60}
        width="100%"
        textStyle={styles.outlineButtonText}
        onPress={() => navigation.navigate(navigationStrings.APPOINTMENT_DETAIL)}
      />
    </NeumorphicCard>
  );

  const renderPast: ListRenderItem<PastAppointment> = ({ item }) => {
    const statusStyle =
      item.status === "cancelled"
        ? { bg: "#FDECEC", fg: COLORS.ALERT, shadow: "#F2CACA", label: "Cancelled" as const }
        : { bg: "#D3FFF1", fg: COLORS.SUCCESS, shadow: "#A9E9D5", label: "Completed" as const };

    return (
      <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
        <View style={styles.cardTopRow}>
          <Image source={AppointmentDummy} style={styles.avatar} />
          <View style={styles.infoTextWrap}>
            <Text style={styles.datetimeText}>{item.datetime}</Text>
            <Text style={styles.doctorText}>{item.doctor}</Text>
            <Text style={styles.clinicText}>{item.clinic}</Text>
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
        <View style={styles.pastActionsRow}>
          <View style={styles.halfBtn}>
            <AppButton
              text="Reschedule"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              height={HEIGHT_CARD_ROW_BTN}
              borderRadius={60}
              width="100%"
              textStyle={styles.outlineButtonText}
              onPress={() => {}}
            />
          </View>
          <View style={styles.halfBtn}>
            <ReusableButton
              title="View Details"
              gradientColors={REUSABLE_GRADIENT}
              onPress={() => navigation.navigate(navigationStrings.APPOINTMENT_DETAIL)}
              height={HEIGHT_CARD_ROW_BTN}
              width="100%"
              borderRadius={60}
              containerStyle={styles.cardPrimaryBtn}
            />
          </View>
        </View>
      </NeumorphicCard>
    );
  };

  const keyExtractor = (item: UpcomingAppointment | PastAppointment) => item.id;

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
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.tabsRow}>
        <AppointmentTabChip
          title="Upcoming"
          chipWidth={tabChipWidth}
          selected={tab === "upcoming"}
          onPress={() => setTab("upcoming")}
        />
        <AppointmentTabChip
          title="Past"
          chipWidth={tabChipWidth}
          selected={tab === "past"}
          onPress={() => setTab("past")}
        />
      </View>

      <FlatList
        style={styles.list}
        data={listData}
        keyExtractor={keyExtractor}
        extraData={tab}
        renderItem={
          tab === "upcoming"
            ? (renderUpcoming as ListRenderItem<(typeof listData)[number]>)
            : (renderPast as ListRenderItem<(typeof listData)[number]>)
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No appointments found.</Text>}
      />

      <View style={styles.footer}>
        <ReusableButton
          title="Schedule New Appointment"
          gradientColors={REUSABLE_GRADIENT}
          height={HEIGHT_SCHEDULE_FOOTER}
          leadingIcon={<WhitePlusIcon width={16} height={16} />}
          onPress={() => navigation.navigate(navigationStrings.SCHEDULE_STEP_1)}
          containerStyle={styles.scheduleCta}
        />
      </View>
    </SafeAreaView>
  );
};

/** Selected: same gradient `ReusableButton` as footer; unselected: `NeumorphicCard`. */
const AppointmentTabChip = ({
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
        height={40}
        backgroundColor="#14B8D4"
        borderRadius={20}
        containerStyle={styles.tabSelectedBtn}
        textStyle={styles.tabReusableTitle}
      />
    </View>
  ) : (
    <Pressable onPress={onPress} style={[styles.filterPress, { width: chipWidth }]}>
      <NeumorphicCard
        outerStyle={[styles.tabCardOuter, { width: chipWidth }]}
        innerStyle={styles.tabCardInner}
        borderRadius={20}
      >
        <Text style={styles.unselectedTabLabel} numberOfLines={1}>
          {title}
        </Text>
      </NeumorphicCard>
    </Pressable>
  );

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: 6,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  tabsRow: {
    marginTop: 20,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    gap: TABS_GAP,
    alignItems: "center",
  },
  filterPress: {
    flexShrink: 0,
  },
  tabCardOuter: {},
  tabCardInner: {
    paddingHorizontal: 18,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  tabSelectedBtn: {
    alignSelf: "stretch",
  },
  tabReusableTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 8,
  },
  unselectedTabLabel: {
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 16,
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 16 : 8,
  },
  scheduleCta: {
    alignSelf: "stretch",
  },
  /** Primary actions in cards — same gradient + sizing family as footer CTA. */
  cardPrimaryBtn: {
    alignSelf: "stretch",
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  infoTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  datetimeText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  doctorText: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  clinicText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  statusBadgeWrap: {
    flexShrink: 0,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  pastActionsRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  halfBtn: {
    flex: 1,
    minWidth: 0,
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_70,
    fontWeight: "500",
  },
});

export default Appointments;
