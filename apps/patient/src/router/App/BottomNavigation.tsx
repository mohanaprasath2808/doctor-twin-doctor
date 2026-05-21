import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import { BottomInnerShadowIcon, type BorderRingGradient } from "../../neomorphism/bottomBar";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";
import Home from "../../screens/App/Home";
import Messages from "../../screens/App/Messages/Messages";
import Medications from "../../screens/App/Medications/Medications";
import Settings from "../../screens/App/Settings";
import HomeActiveIcon from "../../assets/icons/homeActive.svg";
import HomeInactiveIcon from "../../assets/icons/homeInactive.svg";
import MessageActiveIcon from "../../assets/icons/messageActive.svg";
import MessageInactiveIcon from "../../assets/icons/messageInactive.svg";
import MedRefillsActiveIcon from "../../assets/icons/medRefillsActive.svg";
import MedRefillsInactiveIcon from "../../assets/icons/medRefillsInactive.svg";
import MoreActiveIcon from "../../assets/icons/moreActive.svg";
import MoreInactiveIcon from "../../assets/icons/moreInactive.svg";

const Tab = createBottomTabNavigator();

/**
 * When `insets.bottom` is 0 (common on Android), still lift content above system nav / gesture area.
 * Matches staff `BottomNavigation` padding behavior.
 */
const MIN_BOTTOM_INSET = Platform.select({ ios: 14, android: 20, default: 14 });
const EXTRA_TAB_PADDING = 8;

const TAB_BAR_ROW_HEIGHT = 84;
/** Equal inset above and below the icon row inside the neumorphic card. */
const TAB_BAR_INNER_PADDING_V = 10;

const TAB_SCREENS = [
  { name: navigationStrings.HOME, label: "Home", component: Home },
  { name: navigationStrings.MESSAGES, label: "Message", component: Messages },
  { name: navigationStrings.MEDICATIONS, label: "Med Refills", component: Medications },
  { name: navigationStrings.SETTINGS, label: "More", component: Settings },
] as const;

/** Figma: Doctor Twin patient secondary / active tab fill */
const ACTIVE_TAB_BG = "#14B8D4";
const ACTIVE_TAB_RING: BorderRingGradient = {
  colors: ["#D6E3F3", "#FFFFFF"],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
};
const ACTIVE_TAB_RING_HIGHLIGHT: BorderRingGradient = {
  colors: ["#FFFFFF", "rgba(255, 255, 255, 0)"],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 },
};
/**
 * Matches doctor `InnerShadowView` Skia sense: there, defaults are dark (2,2) / light (-2,-2)
 * → dark bottom-right, light top-left. For tab: dark along top, specular along bottom: negate
 * only `dy` at 4px: dark (4, -4), light (-4, 4). See `apps/doctor/.../InnerShadowView.tsx`.
 */
const ACTIVE_TAB_INNER_SHADOW = {
  darkShadowDx: 4,
  darkShadowDy: -4,
  darkShadowBlur: 14,
  darkShadowColor: "#34718D",
  lightShadowDx: -4,
  lightShadowDy: 4,
  lightShadowBlur: 9,
  lightShadowColor: "rgba(255, 255, 255, 0.6)",
} as const;
const ACTIVE_ICON_SIZE = 50;

type TabName = (typeof TAB_SCREENS)[number]["name"];

const TAB_ICONS: Record<
  TabName,
  { Active: typeof HomeActiveIcon; Inactive: typeof HomeInactiveIcon }
> = {
  [navigationStrings.HOME]: { Active: HomeActiveIcon, Inactive: HomeInactiveIcon },
  [navigationStrings.MESSAGES]: { Active: MessageActiveIcon, Inactive: MessageInactiveIcon },
  [navigationStrings.MEDICATIONS]: {
    Active: MedRefillsActiveIcon,
    Inactive: MedRefillsInactiveIcon,
  },
  [navigationStrings.SETTINGS]: { Active: MoreActiveIcon, Inactive: MoreInactiveIcon },
};

function PatientTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const active: TabName = state.routes[state.index]?.name as TabName;
  const isActive = (name: TabName) => active === name;

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
            {TAB_SCREENS.map((tab) => {
              const selected = isActive(tab.name);
              const { Active, Inactive } = TAB_ICONS[tab.name];
              return (
                <Pressable
                  key={tab.name}
                  style={styles.sideTab}
                  onPress={() => navigation.navigate(tab.name)}
                  accessibilityRole="button"
                  accessibilityLabel={tab.label}
                  accessibilityState={{ selected }}
                >
                  {selected ? (
                    <BottomInnerShadowIcon
                      size={ACTIVE_ICON_SIZE}
                      radius={ACTIVE_ICON_SIZE / 2}
                      surfaceColor={ACTIVE_TAB_BG}
                      borderWidth={1}
                      borderRingGradient={ACTIVE_TAB_RING}
                      borderRingHighlight={ACTIVE_TAB_RING_HIGHLIGHT}
                      innerShadowProps={ACTIVE_TAB_INNER_SHADOW}
                      icon={<Active width={24} height={24} />}
                    />
                  ) : (
                    <View style={styles.inactiveIconWrap}>
                      <Inactive width={24} height={24} />
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
      </View>
    </View>
  );
}

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.HOME}
      tabBar={(props) => <PatientTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarHost,
      }}
    >
      {TAB_SCREENS.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
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
    paddingVertical: TAB_BAR_INNER_PADDING_V,
    minHeight: TAB_BAR_ROW_HEIGHT,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  sideTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.95,
  },
  tabLabel: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  tabLabelActive: {
    color: COLORS.PRIMARY,
  },
  tabLabelInactive: {
    color: COLORS.TEXT_PRIMARY_50,
    fontWeight: "400",
  },
});
