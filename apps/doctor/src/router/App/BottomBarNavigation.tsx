import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, type RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import AppStack from "./AppStack";
import Queue from "../../screens/App/Queue";
import Patients from "../../screens/App/Home/Patient/Patients";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import ListIcon from "../../assets/icon/listIcon.svg";
import MicOutlineIcon from "../../assets/icon/micOutlineIcon.svg";
import PatientIcon from "../../assets/icon/patientIcon.svg";

const Tab = createBottomTabNavigator();

/**
 * Add route names here when a specific flow should hide bottom tabs.
 * Example: full-screen forms, media capture, or other focused experiences.
 */
const HIDE_TABS_ON_ROUTES = [navigationStrings.ADD_EVENT, navigationStrings.EVENT_DETAILS] as const;

const isTabHiddenForRoute = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const nestedRouteName = getFocusedRouteNameFromRoute(route);
  return nestedRouteName != null && HIDE_TABS_ON_ROUTES.includes(nestedRouteName as any);
};

type TabName = "HomeTab" | "QueueTab" | "PatientsTab";

const TAB_SCREENS: Array<{ name: TabName; label: string; component: React.ComponentType<any> }> = [
  { name: "HomeTab", label: "Home", component: AppStack },
  { name: "QueueTab", label: "Queue", component: Queue },
  { name: "PatientsTab", label: "Patients", component: Patients },
];

const TAB_ICON: Record<TabName, React.ComponentType<{ width?: number; height?: number }>> = {
  HomeTab: ListIcon,
  QueueTab: MicOutlineIcon,
  PatientsTab: PatientIcon,
};

const MIN_BOTTOM_INSET = Platform.select({ ios: 14, android: 20, default: 14 });
const QUEUE_SIZE = 80;
const QUEUE_RADIUS = QUEUE_SIZE / 2;
const QUEUE_INNER = QUEUE_SIZE - 2;
const QUEUE_INNER_RADIUS = QUEUE_INNER / 2;

function DoctorTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const active = state.routes[state.index]?.name as TabName;
  const homeRoute = state.routes.find((r) => r.name === "HomeTab");
  const hideBar = homeRoute != null && isTabHiddenForRoute(homeRoute as any);
  if (hideBar) return null;

  return (
    <View
      style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, MIN_BOTTOM_INSET) }]}
    >
      <View style={styles.tabBarCardWrap}>
        <NeumorphicCard
          borderRadius={16}
          outerStyle={styles.tabNeumorphOuter}
          innerStyle={styles.tabNeumorphInner}
        >
          <View style={styles.tabRow}>
            {TAB_SCREENS.map((tab) => {
              const Icon = TAB_ICON[tab.name];
              const selected = active === tab.name;
              const isCenter = tab.name === "QueueTab";
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
          onPress={() => navigation.navigate("QueueTab")}
          accessibilityRole="button"
          accessibilityLabel="Queue"
          accessibilityState={{ selected: active === "QueueTab" }}
        >
          <View style={styles.queueActiveOuter}>
            <View pointerEvents="none" style={[styles.queueShadowLayer, styles.queueShadowDark]} />
            <View pointerEvents="none" style={[styles.queueShadowLayer, styles.queueShadowLight]} />
            <View pointerEvents="none" style={[styles.queueShadowLayer, styles.queueShadowSoft]} />
            <LinearGradient
              colors={["#D6E3F3", "#FFFFFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.queueBorderGradient}
            >
              <LinearGradient
                colors={["#111747", "#303DA3"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.queueInner}
              >
                <View pointerEvents="none" style={styles.queueInnerShadowWrap}>
                  <InnerShadowView
                    width={QUEUE_INNER}
                    height={QUEUE_INNER}
                    borderRadius={QUEUE_INNER_RADIUS}
                    color="#303DA3"
                    // Figma: inset 4px 4px 14px #C1D5EE
                    darkShadowDx={4}
                    darkShadowDy={4}
                    darkShadowBlur={14}
                    darkShadowColor="#C1D5EE"
                    // Disable opposite-side light bloom
                    lightShadowDx={0}
                    lightShadowDy={0}
                    lightShadowBlur={0}
                    lightShadowColor="#FFFFFF00"
                  />
                </View>
                <MicOutlineIcon width={36} height={36} />
              </LinearGradient>
            </LinearGradient>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const BottomBarNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <DoctorTabBar {...props} />}
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

const styles = StyleSheet.create({
  tabBarHost: {
    overflow: "visible",
    backgroundColor: COLORS.SURFACE,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarOuter: {
    width: "100%",
    backgroundColor: COLORS.SURFACE,
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
    backgroundColor: COLORS.SURFACE,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: COLORS.SURFACE,
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
  },
  queueShadowLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: QUEUE_RADIUS,
  },
  queueShadowDark: {
    ...Platform.select({
      ios: {
        // Figma: 4px 4px 20px #6F8CB0CC
        shadowColor: "#6F8CB0",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "4px 4px 20px 0px #6F8CB0CC",
        elevation: 0,
      },
    }),
  },
  queueShadowLight: {
    ...Platform.select({
      ios: {
        // Figma: -6px -6px 20px #FFFFFF
        shadowColor: "#FFFFFF",
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        boxShadow: "-6px -6px 20px 0px #FFFFFF",
      },
    }),
  },
  queueShadowSoft: {
    ...Platform.select({
      ios: {
        // Figma: 2px 2px 4px #728EAB1A
        shadowColor: "#728EAB",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        boxShadow: "2px 2px 4px 0px #728EAB1A",
      },
    }),
  },
  queueBorderGradient: {
    flex: 1,
    borderRadius: QUEUE_RADIUS,
    padding: 1,
  },
  queueInner: {
    flex: 1,
    borderRadius: QUEUE_RADIUS - 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  queueInnerShadowWrap: {
    ...StyleSheet.absoluteFillObject,
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

export default BottomBarNavigation;
