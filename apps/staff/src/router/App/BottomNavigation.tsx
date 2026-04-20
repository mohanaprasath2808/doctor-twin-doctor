import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CalendarIcon from "../../assets/icon/calendarIcon.svg";
import ProfileIcon from "../../assets/icon/profileIcon.svg";
import NeumorphicCard from "../../components/neomorphism/NeumorphicCard";
import {
  StaffMicBarFabOverlay,
  StaffMicBarQueueColumn,
} from "../../components/navigation/QueueMicTabButton";
import navigationStrings from "../../constants/navigationStrings";
import Calendar from "../../screens/App/Calendar";
import Home from "../../screens/App/Home";
import Profile from "../../screens/App/Profile";
import { COLORS } from "../../constants/theme";

const Tab = createBottomTabNavigator();

/**
 * When `insets.bottom` is 0 (common on Android), still lift content above system nav / gesture area.
 * Added on top of `useSafeAreaInsets().bottom` for home indicator + comfort.
 */
const MIN_BOTTOM_INSET = Platform.select({ ios: 14, android: 20, default: 14 });
const EXTRA_TAB_PADDING = 8;

/** Inner tab row (Calendar | mic | Profile), excluding safe-area bottom padding. */
const TAB_BAR_ROW_HEIGHT = 84;
/** Must match `NeumorphicCard` inner padding and `StaffMicBarFabOverlay` so the mic lines up with the row. */
const TAB_BAR_INNER_PADDING_TOP = 10;

function StaffTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const active = state.routes[state.index]?.name;

  const isActive = (name: string) => active === name;
  const tint = (name: string) => (isActive(name) ? COLORS.PRIMARY : COLORS.TEXT_60);

  const bottomPad = Math.max(insets.bottom, MIN_BOTTOM_INSET) + EXTRA_TAB_PADDING;

  return (
    <View style={[styles.tabBarOuter, { paddingBottom: bottomPad }]}>
      <View style={styles.tabBarCardWrap}>
        <NeumorphicCard
          borderRadius={16}
          backgroundColor={COLORS.INNER_SURFACE}
          innerStyle={styles.neumorphicCardInner}
        >
          <View style={styles.tabRow}>
            <Pressable
              style={styles.sideTab}
              onPress={() => navigation.navigate(navigationStrings.CALENDAR)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive(navigationStrings.CALENDAR) }}
            >
              <CalendarIcon width={24} height={24} color={tint(navigationStrings.CALENDAR)} />
              <Text style={[styles.tabLabel, { color: tint(navigationStrings.CALENDAR) }]}>
                Calendar
              </Text>
            </Pressable>

            <StaffMicBarQueueColumn
              onMicPress={() => {
                navigation.navigate(navigationStrings.HOME);
              }}
            />

            <Pressable
              style={styles.sideTab}
              onPress={() => navigation.navigate(navigationStrings.PROFILE)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive(navigationStrings.PROFILE) }}
            >
              <ProfileIcon width={24} height={24} color={tint(navigationStrings.PROFILE)} />
              <Text style={[styles.tabLabel, { color: tint(navigationStrings.PROFILE) }]}>
                Profile
              </Text>
            </Pressable>
          </View>
        </NeumorphicCard>
        <StaffMicBarFabOverlay
          innerPaddingTop={TAB_BAR_INNER_PADDING_TOP}
          onMicPress={() => {
            navigation.navigate(navigationStrings.HOME);
          }}
        />
      </View>
    </View>
  );
}

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.HOME}
      tabBar={(props) => <StaffTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarHost,
      }}
    >
      <Tab.Screen name={navigationStrings.HOME} component={Home} />
      <Tab.Screen name={navigationStrings.CALENDAR} component={Calendar} />
      <Tab.Screen name={navigationStrings.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  /** Let the lifted center mic extend above the bar; default tab bar clips overflow. */
  tabBarHost: {
    overflow: "visible",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarOuter: {
    backgroundColor: COLORS.INNER_SURFACE,
    width: "100%",
    overflow: "visible",
  },
  tabBarCardWrap: {
    position: "relative",
    marginHorizontal: 12,
  },
  neumorphicCardInner: {
    paddingTop: TAB_BAR_INNER_PADDING_TOP,
    minHeight: TAB_BAR_ROW_HEIGHT,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  sideTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
});
