import React, { useCallback, useMemo, type ReactNode } from "react";
import { FlatList, StyleSheet, Text, useWindowDimensions } from "react-native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import NeumorphicQuickActionTile from "../../components/neomorphism/NeumorphicQuickActionTile";
import ProfileAvatar from "../../components/neomorphism/ProfileAvatar";
import { hasPositiveBadgeCount } from "../../constants/constant";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";
import RefillsGreenIcon from "../../assets/icon/refillsIcon.svg";
import MessageGreenIcon from "../../assets/icon/messageIcon.svg";
import LabGreenIcon from "../../assets/icon/conicalIcon.svg";
import ScheduleGreenIcon from "../../assets/icon/schedulingIcon.svg";
import ProfileGreenIcon from "../../assets/icon/profileGreenIcon.svg";
import BillingGreenIcon from "../../assets/icon/billingIcon.svg";
import EligibilityGreenIcon from "../../assets/icon/eligibilityIcon.svg";
import DocumentGreenIcon from "../../assets/icon/documentIcon.svg";
import TasksGreenIcon from "../../assets/icon/tasksIcon.svg";
import DelegationGreenIcon from "../../assets/icon/delegationIcon.svg";
import RefillRedIcon from "../../assets/icon/refillRedIcon.svg";
import MessageRedIcon from "../../assets/icon/messageRedIcon.svg";
import LabRedIcon from "../../assets/icon/conicalRedIcon.svg";
import ScheduleRedIcon from "../../assets/icon/scheduleRedIcon.svg";
import ProfileRedIcon from "../../assets/icon/profileRedIcon.svg";
import BillingRedIcon from "../../assets/icon/billingRedIcon.svg";
import EligibilityRedIcon from "../../assets/icon/eligibiltyRedIcon.svg";
import DocumentRedIcon from "../../assets/icon/documentRedIcon.svg";
import TasksRedIcon from "../../assets/icon/tasksRedIcon.svg";
import DelegationRedIcon from "../../assets/icon/delegationRedIcon.svg";

const DISPLAY_NAME = "Dr.Twin";

type TileItem = {
  label: string;
  iconGreen: ReactNode;
  iconRed: ReactNode;
  dataCount?: string;
  onPress?: () => void;
};

const GRID_COLUMNS = 4;
/** Horizontal gap between tiles in a row and vertical gap between rows. */
const GRID_GAP = 16;
const H_PADDING = 16;

type AppTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
  TaskInbox: undefined;
  Scheduling: undefined;
};

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppTabParamList>,
  BottomTabNavigationProp<AppTabParamList>
>;

const Home = () => {
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const tileWidth = useMemo(() => {
    const inner = windowWidth - H_PADDING * 2;
    return (inner - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
  }, [windowWidth]);

  const openCalendar = useCallback(() => {
    navigation.navigate(navigationStrings.CALENDAR);
  }, [navigation]);

  const noop = useCallback(() => {}, []);

  const openTaskInbox = useCallback(() => {
    navigation.navigate(navigationStrings.TASK_INBOX);
  }, [navigation]);

  const openScheduling = useCallback(() => {
    navigation.navigate(navigationStrings.SCHEDULING);
  }, [navigation]);

  const openStaff = useCallback(() => {
    const parent = navigation.getParent();
    parent?.navigate(navigationStrings.STAFF as never);
  }, [navigation]);

  const tiles = useMemo<TileItem[]>(
    () => [
      {
        label: "Refills",
        iconGreen: <RefillsGreenIcon width={32} height={32} />,
        iconRed: <RefillRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: noop,
      },
      {
        label: "Messages",
        iconGreen: <MessageGreenIcon width={32} height={32} />,
        iconRed: <MessageRedIcon width={32} height={32} />,
        dataCount: "0",
        onPress: noop,
      },
      {
        label: "Labs",
        iconGreen: <LabGreenIcon width={32} height={32} />,
        iconRed: <LabRedIcon width={32} height={32} />,
        dataCount: "3",
        onPress: noop,
      },
      {
        label: "Scheduling",
        iconGreen: <ScheduleGreenIcon width={32} height={32} />,
        iconRed: <ScheduleRedIcon width={32} height={32} />,
        dataCount: "0",
        onPress: openScheduling,
      },
      {
        label: "Delegation",
        iconGreen: <DelegationGreenIcon width={32} height={32} />,
        iconRed: <DelegationRedIcon width={32} height={32} />,
        dataCount: "0",
        onPress: noop,
      },
      {
        label: "Eligibility",
        iconGreen: <EligibilityGreenIcon width={32} height={32} />,
        iconRed: <EligibilityRedIcon width={32} height={32} />,
        dataCount: "0",
        onPress: noop,
      },
      {
        label: "Document",
        iconGreen: <DocumentGreenIcon width={32} height={32} />,
        iconRed: <DocumentRedIcon width={32} height={32} />,
        dataCount: "0",
        onPress: noop,
      },
      {
        label: "Tasks",
        iconGreen: <TasksGreenIcon width={32} height={32} />,
        iconRed: <TasksRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: openTaskInbox,
      },
      {
        label: "Billing",
        iconGreen: <BillingGreenIcon width={32} height={32} />,
        iconRed: <BillingRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: noop,
      },
      {
        label: "Staff",
        iconGreen: <ProfileGreenIcon width={32} height={32} />,
        iconRed: <ProfileRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: openStaff,
      },
    ],
    [noop, openScheduling, openTaskInbox, openStaff],
  );

  const totalRows = Math.ceil(tiles.length / GRID_COLUMNS);

  const listHeader = useMemo(
    () => (
      <>
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
      </>
    ),
    [],
  );

  const renderTile = useCallback(
    ({ item, index }: { item: TileItem; index: number }) => {
      const rowIndex = Math.floor(index / GRID_COLUMNS);
      return (
        <NeumorphicQuickActionTile
          onPress={item.onPress ?? noop}
          icon={hasPositiveBadgeCount(item.dataCount) ? item.iconRed : item.iconGreen}
          label={item.label}
          badge={item.dataCount}
          containerStyle={[
            styles.tileContainer,
            { width: tileWidth },
            index % GRID_COLUMNS !== GRID_COLUMNS - 1 && styles.tileSpacingRight,
            rowIndex < totalRows - 1 && styles.rowSpacing,
          ]}
        />
      );
    },
    [noop, tileWidth, totalRows],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={tiles}
        numColumns={GRID_COLUMNS}
        keyExtractor={(item) => item.label}
        renderItem={renderTile}
        ListHeaderComponent={listHeader}
        contentContainerStyle={[styles.scroll, { paddingBottom: Math.max(insets.bottom, 10) + 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        columnWrapperStyle={styles.row}
      />
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
    marginBottom: 40,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_80,
    textAlign: "center",
  },
  tileContainer: {
    marginBottom: 0,
  },
  /** `gap` / `rowGap` are unreliable on some Android RN builds; use margins instead. */
  tileSpacingRight: {
    marginRight: GRID_GAP,
  },
  rowSpacing: {
    marginBottom: GRID_GAP,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
