import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CalendarIcon from "../../assets/icon/calendarIcon.svg";
import ProfileIcon from "../../assets/icon/profileIcon.svg";
import { StaffMicBarButton } from "../../components/navigation/QueueMicTabButton";
import navigationStrings from "../../constants/navigationStrings";
import Calendar from "../../screens/App/Calendar";
import Home from "../../screens/App/Home";
import Profile from "../../screens/App/Profile";
import { COLORS } from "../../constants/theme";

const Tab = createBottomTabNavigator();

function StaffTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 10);
  const active = state.routes[state.index]?.name;

  const isActive = (name: string) => active === name;
  const tint = (name: string) => (isActive(name) ? COLORS.PRIMARY : COLORS.TEXT_60);

  return (
    <View style={[styles.tabBarWrap, { paddingBottom: bottomPad, paddingTop: 10 }]}>
      <Pressable
        style={styles.sideTab}
        onPress={() => navigation.navigate(navigationStrings.CALENDAR)}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive(navigationStrings.CALENDAR) }}
      >
        <CalendarIcon width={24} height={24} color={tint(navigationStrings.CALENDAR)} />
        <Text style={[styles.tabLabel, { color: tint(navigationStrings.CALENDAR) }]}>Calendar</Text>
      </Pressable>

      <StaffMicBarButton
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
        <Text style={[styles.tabLabel, { color: tint(navigationStrings.PROFILE) }]}>Profile</Text>
      </Pressable>
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
  tabBarWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: COLORS.INNER_SURFACE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 68,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
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
