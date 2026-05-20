import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, type RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CalendarIcon from "../../assets/icon/calendarIcon.svg";
import MicIcon from "../../assets/icon/micIcon.svg";
import ProfileIcon from "../../assets/icon/profileIcon.svg";
import NeumorphicCard from "../../components/neomorphism/NeumorphicCard";
import InnerShadowIcon from "../../components/neomorphism/InnerShadowIcon";
import { QueueMicButton } from "../../components/navigation/QueueMicTabButton";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";
import HomeScreen from "../../screens/App/Home";
import Profile from "../../screens/App/Profile/Profile";
import Queue from "../../screens/App/Queue";

const Tab = createBottomTabNavigator();

/**
 * Add route names here when a nested flow under the Home tab should hide bottom tabs.
 * Example: full-screen forms, media capture, or other focused experiences.
 */
/** Extend this list when the Home tab hosts a navigator and screens should hide the tab bar */
const HIDE_TABS_ON_ROUTES: readonly string[] = [];

const isTabHiddenForRoute = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const nestedRouteName = getFocusedRouteNameFromRoute(route);
  return nestedRouteName != null && HIDE_TABS_ON_ROUTES.includes(nestedRouteName);
};

type TabName =
  | typeof navigationStrings.HOME
  | typeof navigationStrings.QUEUE
  | typeof navigationStrings.PROFILE;

const TAB_SCREENS: Array<{ name: TabName; label: string; component: React.ComponentType<any> }> = [
  { name: navigationStrings.HOME, label: "Home", component: HomeScreen },
  { name: navigationStrings.QUEUE, label: "Queue", component: Queue },
  { name: navigationStrings.PROFILE, label: "Profile", component: Profile },
];

const TAB_ICON: Record<TabName, React.ComponentType<{ width?: number; height?: number }>> = {
  [navigationStrings.HOME]: CalendarIcon,
  [navigationStrings.QUEUE]: MicIcon,
  [navigationStrings.PROFILE]: ProfileIcon,
};

const MIN_BOTTOM_INSET = Platform.select({ ios: 14, android: 20, default: 14 });
const QUEUE_SIZE = 80;
const QUEUE_RADIUS = QUEUE_SIZE / 2;

function StaffTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const active = state.routes[state.index]?.name as TabName;
  const homeRoute = state.routes.find((r) => r.name === navigationStrings.HOME);
  const hideBar = homeRoute != null && isTabHiddenForRoute(homeRoute as any);
  if (hideBar) return null;

  return (
    <View
      style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, MIN_BOTTOM_INSET) }]}
    >
      <View style={styles.tabBarCardWrap}>
        <NeumorphicCard
          borderRadius={16}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.tabNeumorphOuter}
          innerStyle={styles.tabNeumorphInner}
        >
          <View style={styles.tabRow}>
            {TAB_SCREENS.map((tab) => {
              const Icon = TAB_ICON[tab.name];
              const selected = active === tab.name;
              const isCenter = tab.name === navigationStrings.QUEUE;
              return (
                <Pressable
                  key={tab.name}
                  onPress={() => navigation.navigate(tab.name)}
                  style={[styles.tabPress, isCenter && styles.centerSlot]}
                  accessibilityRole="button"
                  accessibilityLabel={tab.label}
                  accessibilityState={{ selected }}
                >
                  {isCenter ? (
                    <View style={styles.queuePlaceholder} />
                  ) : selected ? (
                    <InnerShadowIcon size={50} radius={25} icon={<Icon width={22} height={22} />} />
                  ) : (
                    <View style={styles.inactiveIconWrap}>
                      <Icon width={22} height={22} />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.tabLabel,
                      selected ? styles.tabLabelActive : styles.tabLabelInactive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </NeumorphicCard>

        <Pressable
          style={styles.queueOverlayPress}
          onPress={() => navigation.navigate(navigationStrings.QUEUE)}
          accessibilityRole="button"
          accessibilityLabel="Queue"
          accessibilityState={{ selected: active === navigationStrings.QUEUE }}
        >
          <View style={styles.queueActiveOuter}>
            <QueueMicButton />
          </View>
        </Pressable>
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
      {TAB_SCREENS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ title: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBarHost: {
    overflow: "hidden",
    backgroundColor: COLORS.INNER_SURFACE,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarOuter: {
    width: "100%",
    backgroundColor: COLORS.INNER_SURFACE,
    overflow: "visible",
  },
  tabBarCardWrap: {
    marginHorizontal: 12,
    position: "relative",
    overflow: "visible",
  },
  tabNeumorphOuter: {
    width: "100%",
  },
  tabNeumorphInner: {
    minHeight: 84,
    paddingVertical: 10,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  tabPress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerSlot: {
    paddingTop: 6,
  },
  queuePlaceholder: {
    width: 50,
    height: 50,
  },
  queueOverlayPress: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    zIndex: 20,
  },
  inactiveIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.95,
  },
  queueActiveOuter: {
    width: QUEUE_SIZE,
    height: QUEUE_SIZE,
    borderRadius: QUEUE_RADIUS,
    marginTop: -16,
    position: "relative",
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  tabLabelActive: {
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
  tabLabelInactive: {
    color: COLORS.TEXT_50,
    fontWeight: "400",
  },
});
