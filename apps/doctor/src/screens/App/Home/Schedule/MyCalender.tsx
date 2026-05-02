import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import { Image } from "react-native";
import navigationStrings from "../../../../constants/navigationStrings";
import PlusIcon from "../../../../assets/icon/plusIcon.svg";
import Carousel from "react-native-reanimated-carousel";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DAY_ITEM_WIDTH = 150;

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MyCalender = () => {
  const navigation = useNavigation<any>();
  const initialDayIndex = 1;
  const [activeIndex, setActiveIndex] = useState(initialDayIndex);

  const days = useMemo(() => {
    const today = new Date();
    return [0, 1, 2, 3, 4, 5].map((offset) => {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      return {
        id: String(offset),
        day: d.getDate(),
        weekDay: weekday[d.getDay()],
        month: month[d.getMonth()],
      };
    });
  }, []);

  const events = [
    {
      id: "1",
      title: "Staff Meeting",
      subtitle: "Conference room",
      time: "02:30\nPM",
    },
    {
      id: "2",
      title: "Marketing Review",
      subtitle: "Zoom Call",
      time: "03:30\nPM",
    },
    {
      id: "3",
      title: "Research Discussion",
      subtitle: "Dr.Adam Office",
      time: "05:30\nPM",
    },
  ];

  const renderDayItem = ({
    item,
    index,
  }: {
    item: (typeof days)[number];
    index: number;
  }) => {
    const isActive = index === activeIndex;

    return (
      <View style={[styles.dayItem, !isActive && styles.dayItemInactive]}>
        <Image
          source={OverlayImage}
          style={[styles.dayOverlay, !isActive && styles.dayOverlayInactive]}
          resizeMode="contain"
        />
        <View style={[styles.dayContent, !isActive && styles.dayContentInactive]}>
          <Text style={[styles.dayMonth, !isActive && styles.dayTextInactive]}>
            {item.month}
          </Text>
          <Text style={[styles.dayNumber, !isActive && styles.dayTextInactive]}>
            {item.day}
          </Text>
          <Text style={[styles.dayWeek, !isActive && styles.dayTextInactive]}>
            {item.weekDay}
          </Text>
        </View>
      </View>
    );
  };

  const renderEventItem = ({ item }: { item: (typeof events)[number] }) => (
    <NeumorphicCard
      outerStyle={styles.eventOuter}
      innerStyle={styles.eventInner}
      borderRadius={12}
      onPress={() =>
        navigation.navigate(navigationStrings.EVENT_DETAILS, {
          showMap: item.subtitle !== "Zoom Call",
        })
      }
    >
      <View style={styles.leftAccent} />
      <View style={styles.eventLeft}>
        <InnerShadowIcon
          icon={<CalendarIcon width={18} height={18} />}
          size={36}
        />
        <View>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventSub}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.eventRight}>
        <InnerShadowIcon
          icon={
            <View style={styles.timeWrap}>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          }
          size={48}
          radius={10}
        />
        <RightArrowIcon width={10} height={10} />
      </View>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>My Calender</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.topArea}>
        <Carousel
          width={DAY_ITEM_WIDTH}
          height={170}
          data={days}
          renderItem={renderDayItem}
          defaultIndex={initialDayIndex}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.62,
            parallaxScrollingOffset: 78,
          }}
          loop={false}
          onSnapToItem={setActiveIndex}
          style={styles.dayCarousel}
        />
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={styles.eventsList}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        scrollEnabled={false}
      />

      <View style={styles.buttonContainer}>
        <AppButton
          leftIcon={<PlusIcon width={16} height={16} />}
          text="Add Event"
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.buttonText}
          style={styles.button}
          onPress={() => navigation.navigate(navigationStrings.ADD_EVENT)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  topArea: { marginTop: 18, height: 182 },
  dayCarousel: { width: "100%" },
  dayItem: {
    width: DAY_ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  dayItemInactive: { opacity: 0.44 },
  dayOverlay: {
    position: "absolute",
    width: 150,
    height: 150,
  },
  dayContent: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  dayContentInactive: {
    transform: [{ scale: 0.9 }],
  },
  dayOverlayInactive: {
    opacity: 0.72,
  },
  dayMonth: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  dayNumber: {
    color: COLORS.PRIMARY,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 32,
  },
  dayWeek: {
    color: COLORS.PRIMARY,
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 14,
    textAlign: "center",
  },
  dayTextInactive: { color: COLORS.TEXT_40 },
  eventsList: { paddingHorizontal: 16, paddingTop: 4 },
  eventOuter: { width: "100%" },
  eventInner: {
    height: 64,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftAccent: {
    position: "absolute",
    left: 0,
    top: 6,
    bottom: 6,
    width: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 999,
  },
  eventLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  eventTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  eventSub: { color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400" },
  eventRight: { flexDirection: "row", alignItems: "center", gap: 20 },
  timeWrap: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: COLORS.PRIMARY,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 15,
  },
  buttonContainer: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  button: { height: 52, borderRadius: 26 },
  buttonText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "600" },
});

export default MyCalender;
