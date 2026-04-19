import React, { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import EarnIcon from "../../assets/icon/earnIcon.svg";
import NeumorphicQuickActionTile from "../../components/neomorphism/NeumorphicQuickActionTile";
import ProfileAvatar from "../../components/neomorphism/ProfileAvatar";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";

const DISPLAY_NAME = "Dr.Twin";

type TileItem = {
  label: string;
  subtitle?: string;
  badge?: string;
  onPress?: () => void;
};

const GRID_COLUMNS = 4;
const GRID_GAP = 8;
const H_PADDING = 16;
/** Approx. tab bar height (matches BottomNavigation) so content clears the bar. */
const TAB_BAR_HEIGHT = 68;

type AppTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
};

const Home = () => {
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();

  const tileWidth = useMemo(() => {
    const inner = windowWidth - H_PADDING * 2;
    return (inner - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
  }, [windowWidth]);

  const openCalendar = useCallback(() => {
    navigation.navigate(navigationStrings.CALENDAR);
  }, [navigation]);

  const openProfile = useCallback(() => {
    navigation.navigate(navigationStrings.PROFILE);
  }, [navigation]);

  const noop = useCallback(() => {}, []);

  const rows: TileItem[][] = [
    [
      { label: "Refills", subtitle: "Quick refill", onPress: noop },
      { label: "Messages", subtitle: "Inbox", badge: "1", onPress: noop },
      { label: "Labs", subtitle: "Results", badge: "3", onPress: noop },
      { label: "Calendar", subtitle: "Schedule", onPress: openCalendar },
    ],
    [
      { label: "Delegation", subtitle: "Assign work", onPress: noop },
      { label: "Eligibility", subtitle: "Coverage", onPress: noop },
      { label: "Document", subtitle: "Files", onPress: noop },
      { label: "Tasks", subtitle: "To-do", onPress: noop },
    ],
    [
      { label: "Billing", subtitle: "Claims", onPress: noop },
      { label: "Profile", subtitle: "Account", onPress: openProfile },
    ],
  ];

  const scrollBottomPad = TAB_BAR_HEIGHT + Math.max(insets.bottom, 10) + 16;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: scrollBottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
      >
        <Text style={styles.screenTitle}>Staff Command Center</Text>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.avatarWrap}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.avatarImage}
        />
        <Text style={styles.name}>{DISPLAY_NAME}</Text>

        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((tile) => (
                <NeumorphicQuickActionTile
                  key={tile.label}
                  onPress={tile.onPress ?? noop}
                  icon={<EarnIcon width={28} height={28} />}
                  label={tile.label}
                  subtitle={tile.subtitle}
                  badge={tile.badge}
                  containerStyle={{ width: tileWidth }}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    paddingHorizontal: 16,
  },
  screenTitle: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 4,
  },
  avatarWrap: {
    width: 230,
    height: 230,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  avatarImage: {
    width: 142,
    height: 142,
    resizeMode: "contain",
    borderRadius: 110,
  },
  name: {
    marginTop: 12,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    textAlign: "center",
  },
  grid: {
    width: "100%",
    rowGap: GRID_GAP,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
    justifyContent: "flex-start",
  },
});
