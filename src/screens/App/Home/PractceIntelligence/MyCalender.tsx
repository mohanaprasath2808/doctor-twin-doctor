import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DAY_ITEM_WIDTH = 150;
const SIDE_PADDING = (SCREEN_WIDTH - DAY_ITEM_WIDTH) / 2;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const dayListRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

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

  const onDayScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / DAY_ITEM_WIDTH);
    const bounded = Math.max(0, Math.min(index, days.length - 1));
    setActiveIndex(bounded);
    dayListRef.current?.scrollToOffset({
      offset: bounded * DAY_ITEM_WIDTH,
      animated: true,
    });
  };

  const renderDayItem = ({
    item,
    index,
  }: {
    item: (typeof days)[number];
    index: number;
  }) => {
    const isActive = index === activeIndex;
    const inputRange = [
      (index - 1) * DAY_ITEM_WIDTH,
      index * DAY_ITEM_WIDTH,
      (index + 1) * DAY_ITEM_WIDTH,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.86, 1, 0.86],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.dayItem,
          !isActive && styles.dayItemInactive,
          { transform: [{ scale }], opacity },
        ]}
      >
        <Image
          source={OverlayImage}
          style={styles.dayOverlay}
          resizeMode="contain"
        />
        <View style={styles.dayContent}>
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
      </Animated.View>
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
        <Animated.FlatList
          ref={dayListRef}
          horizontal
          data={days}
          keyExtractor={(item) => item.id}
          renderItem={renderDayItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
          snapToInterval={DAY_ITEM_WIDTH}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum
          onMomentumScrollEnd={onDayScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          bounces={false}
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
  dayItem: {
    width: DAY_ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  dayItemInactive: { opacity: 0.45 },
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
  dayTextInactive: { color: COLORS.PRIMARY },
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
