import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { AppContext } from "../../context/AppContext";
import NotificationIcon from "../../assets/icon/notificationIcon.svg";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import DoctorAvatar from "../../components/Common/DoctorAvatar";
import DeltaBadge from "../../components/Common/DeltaBadge";
import InteligentIcon from "../../assets/icon/intelliganceIcon.svg";
import CalendarIcon from "../../assets/icon/calendarBlueIcon.svg";
import ScribeIcon from "../../assets/icon/scribeIcon.svg";
import MessageIcon from "../../assets/icon/messageIcon.svg";
import DelegationHubIcon from "../../assets/icon/delegationHubIcon.svg";
import HandsFreeModeIcon from "../../assets/icon/handsFreeModeIcon.svg";
import RevenueIcon from "../../assets/icon/revenueIcon.svg";
import RefillsIcon from "../../assets/icon/refillsIcon.svg";
import ScheduleIcon from "../../assets/icon/scheduleIcon.svg";
import TodayVisitIcon from "../../assets/icon/todayVisitIcon.svg";
import PatientIcon from "../../assets/icon/patientIcon.svg";
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
  {
    id: 11,
    label: "Patient",
    icon: () => <PatientIcon width={18} height={18} />,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const CARD_CORNER_RADIUS = 12;

// ─── Main Screen ─────────────────────────────────────────────────────────────

const Home = () => {
  const navigation = useNavigation<any>();
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useContext must be used within AppContextProvider");
  }
  const { notificationsData, messagesData } = appContext;
  const gridItems = GRID_ITEMS.map((item) =>
    item.id === 2
      ? {
          ...item,
          badge:
            messagesData.length > 0 ? String(messagesData.length) : undefined,
          badgeType: messagesData.length > 0 ? ("dot" as const) : undefined,
        }
      : item.id === 1
        ? {
            ...item,
            onPress: () =>
              navigation.navigate(navigationStrings.PRACTICE_INTELLIGENCE),
          }
        : item.id === 7
          ? {
              ...item,
              onPress: () => navigation.navigate(navigationStrings.SCHEDULE),
            }
          : item.id === 11
            ? {
                ...item,
                onPress: () => navigation.navigate(navigationStrings.PATIENTS),
              }
            : item,
  );

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
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
    </View>
  );
  const renderItem = ({ item }: { item: GridItem }) => (
    <TouchableOpacity
      style={styles.gridCell}
      activeOpacity={0.8}
      onPress={() => item.onPress?.()}
    >
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
            <Text style={styles.cardLabel}>{item.label}</Text>
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
  },
  greetingBold: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
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
    fontWeight: "500",
    color: COLORS.PRIMARY,
    lineHeight: 20,
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
    marginBottom: 16,
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
    alignItems: "center",
    gap: 6,
  },
});
