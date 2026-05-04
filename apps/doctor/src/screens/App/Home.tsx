import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { useAppStore } from "../../store/useAppStore";
import NotificationIcon from "../../assets/icon/notificationIcon.svg";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import DoctorAvatar from "../../components/Common/DoctorAvatar";
import DeltaBadge from "../../components/Common/DeltaBadge";
import InteligentIcon from "../../assets/icon/intelliganceIcon.svg";
import CalendarIcon from "../../assets/icon/calendarBlueIcon.svg";
import ScribeIcon from "../../assets/icon/scribeIcon.svg";
import MessageIcon from "../../assets/icon/messageIcon.svg";
import BrainIcon from "../../assets/icon/brainIcon.svg";
import DelegationHubIcon from "../../assets/icon/delegationHubIcon.svg";
import HandsFreeModeIcon from "../../assets/icon/handsFreeModeIcon.svg";
import RevenueIcon from "../../assets/icon/revenueIcon.svg";
import RefillsIcon from "../../assets/icon/refillsIcon.svg";
import ScheduleIcon from "../../assets/icon/scheduleIcon.svg";
import TodayVisitIcon from "../../assets/icon/todayVisitIcon.svg";
import PatientIcon from "../../assets/icon/patientIcon.svg";
import MicOutlineIcon from "../../assets/icon/micOutlineIcon.svg";
import navigationStrings from "../../constants/navigationStrings";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import IconComponent from "../../neomorphism/IconComponent";
// ─── Grid items ──────────────────────────────────────────────────────────────
type GridItem = {
  id: number;
  label: string;
  badge?: string;
  badgeType?: "dot" | "sub";
  icon: () => React.ReactNode;
  onPress?: () => void;
};

const GRID_ITEMS: GridItem[] = [
  {
    id: 1,
    label: "Practice\nIntelligence",
    icon: () => <InteligentIcon width={18} height={18} />,
  },
  {
    id: 2,
    label: "Messages",
    icon: () => <MessageIcon width={18} height={18} />,
  },
  {
    id: 3,
    label: "Calendar",
    icon: () => <CalendarIcon width={18} height={18} />,
  },
  {
    id: 4,
    label: "Today's Visit",
    badge: "12 Visits",
    badgeType: "sub",
    icon: () => <TodayVisitIcon width={18} height={18} />,
  },
  {
    id: 5,
    label: "Delegation\nhub",
    icon: () => <DelegationHubIcon width={18} height={18} />,
  },
  {
    id: 6,
    label: "Scribe",
    icon: () => <ScribeIcon width={18} height={18} />,
  },
  {
    id: 7,
    label: "Schedule",
    icon: () => <ScheduleIcon width={18} height={18} />,
  },
  {
    id: 8,
    label: "Hands-Free\nMode",
    icon: () => <HandsFreeModeIcon width={18} height={18} />,
  },
  {
    id: 9,
    label: "Revenue",
    icon: () => <RevenueIcon width={18} height={18} />,
  },
  {
    id: 10,
    label: "Refills",
    icon: () => <RefillsIcon width={18} height={18} />,
  },
  // {
  //   id: 11,
  //   label: "Patient",
  //   icon: () => <PatientIcon width={18} height={18} />,
  // },
  // {
  //   id: 12,
  //   label: "Labs",
  //   icon: () => <BrainIcon width={18} height={18} />,
  // },
  // {
  //   id: 13,
  //   label: "Payer Rules",
  //   icon: () => <BrainIcon width={18} height={18} />,
  // },
  // {
  //   id: 14,
  //   label: "Patient Verification",
  //   icon: () => <PatientIcon width={18} height={18} />,
  // },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const CARD_CORNER_RADIUS = 12;

// ─── Main Screen ─────────────────────────────────────────────────────────────

const Home = () => {
  const navigation = useNavigation<any>();
  const notificationsData = useAppStore((s) => s.notificationsData);
  const messagesData = useAppStore((s) => s.messagesData);
  const gridItems = GRID_ITEMS.map((item) => {
    switch (item.id) {
      case 1:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.PRACTICE_INTELLIGENCE),
        };
      case 2:
        return {
          ...item,
          badge: messagesData.length > 0 ? String(messagesData.length) : undefined,
          badgeType: messagesData.length > 0 ? ("dot" as const) : undefined,
        };
      case 10:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.REFILL_ESCALATION),
        };
      case 5:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.STAFF_CONSOLE),
        };
      case 7:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.SCHEDULE),
        };
      case 11:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.PATIENTS),
        };
      case 12:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.LABS_DASHBOARD),
        };
      case 13:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.ELIGIBILITY_PAYER_RULES),
        };
      case 14:
        return {
          ...item,
          onPress: () => navigation.navigate(navigationStrings.PATIENT_VERIFICATION),
        };
      default:
        return item;
    }
  });

  const renderListHeader = () => (
    <View style={styles.listHeader}>
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

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.imageContainer}
        wrapperStyle={styles.wrapper}
        overlayStyle={styles.overlayImage}
        imageStyle={styles.image}
      />

      {/* <TouchableOpacity
        activeOpacity={0.85}
        style={styles.morningBriefCta}
        onPress={() => navigation.navigate(navigationStrings.MORNING_BRIEF)}
      >
        <NeumorphicCard
          borderRadius={12}
          outerStyle={styles.morningBriefOuter}
          innerStyle={styles.morningBriefInner}
        >
          <InnerShadowIcon icon={<MicOutlineIcon width={16} height={16} />} size={34} radius={17} />
          <Text style={styles.morningBriefText}>Morning Brief</Text>
        </NeumorphicCard>
      </TouchableOpacity> */}
    </View>
  );
  const renderItem = ({ item }: { item: GridItem }) => (
    <TouchableOpacity style={styles.gridCell} activeOpacity={0.8} onPress={() => item.onPress?.()}>
      <View style={styles.cardOuter}>
        <NeumorphicCard
          borderRadius={CARD_CORNER_RADIUS}
          outerStyle={styles.cardNeumorphOuter}
          innerStyle={[styles.card, { borderRadius: CARD_CORNER_RADIUS }]}
        >
          <View style={styles.cardIconContainer}>
            <InnerShadowIcon icon={item.icon()} size={40} />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel} numberOfLines={2}>
              {item.label}
            </Text>
            {item.badgeType === "sub" && item.badge && (
              <DeltaBadge
                icon={null}
                value={item.badge}
                width={56}
                height={20}
                bgColor={COLORS.ACCENT}
                darkShadowColor="#C8CBCC"
                lightShadowColor="#FFFFFF99"
                textColor={COLORS.PRIMARY}
                textStyle={styles.subBadgeText}
              />
            )}
          </View>
        </NeumorphicCard>
        {item.badgeType === "dot" && item.badge && (
          <View style={styles.dotBadge}>
            <Text style={styles.dotBadgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.SURFACE} />
      <FlatList
        data={gridItems}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Home;

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  listHeader: {
    width: "100%",
  },

  // Header (horizontal padding comes from scrollContent only — keeps one edge line with the grid)
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
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

  // Doctor section
  doctorSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 4,
  },

  doctorImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // Grid (FlatList numColumns)
  gridRow: {
    gap: 16,
    marginBottom: 16,
  },
  gridCell: {
    flex: 1,
    maxWidth: "50%",
    overflow: "visible",
  },
  cardOuter: {
    width: "100%",
    position: "relative",
    overflow: "visible",
  },
  cardNeumorphOuter: {
    width: "100%",
  },
  card: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    position: "relative",
    zIndex: 1,
    overflow: "visible",
    borderWidth: 0,
  },
  cardIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextWrap: {
    flex: 1,
    gap: 4,
  },
  cardLabel: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    lineHeight: 20,
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "500",
  },
  subBadgeText: {
    fontSize: 10,
    fontWeight: "500",
  },
  dotBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.ALERT,
    alignItems: "center",
    justifyContent: "center",
  },
  dotBadgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "700",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  wrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 115,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  morningBriefCta: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 220,
    marginBottom: 16,
  },
  morningBriefOuter: {
    width: "100%",
  },
  morningBriefInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  morningBriefText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
  },
});
