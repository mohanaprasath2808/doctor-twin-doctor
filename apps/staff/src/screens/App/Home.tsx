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
import CommunicationIcon from "../../assets/icon/communicationIcon.svg";
import CommunicationRedIcon from "../../assets/icon/communicationRedIcon.svg";
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

  /** Same scaling as patient Home: circle fits column width, inner well tracks outer. */
  const outerDiameter = useMemo(() => Math.min(88, tileWidth), [tileWidth]);
  const innerShadowDiameter = useMemo(() => Math.max(56, outerDiameter - 16), [outerDiameter]);

  const noop = useCallback(() => { }, []);

  const openTaskInbox = useCallback(() => {
    navigation.navigate(navigationStrings.TASK_INBOX);
  }, [navigation]);

  const openScheduling = useCallback(() => {
    navigation.navigate(navigationStrings.SCHEDULING);
  }, [navigation]);

  const openDelegation = useCallback(() => {
    navigation.navigate(navigationStrings.DELEGATION as never);
  }, [navigation]);

  const openLabs = useCallback(() => {
    navigation.navigate(navigationStrings.LABS as never);
  }, [navigation]);

  const openRefills = useCallback(() => {
    navigation.navigate(navigationStrings.REFILLS as never);
  }, [navigation]);

  const openBilling = useCallback(() => {
    navigation.navigate(navigationStrings.BILLING_DASHBOARD as never);
  }, [navigation]);

  const openDocumentsDashboard = useCallback(() => {
    navigation.navigate(navigationStrings.DOCUMENTS_DASHBOARD as never);
  }, [navigation]);

  const openStaff = useCallback(() => {
    const parent = navigation.getParent();
    parent?.navigate(navigationStrings.STAFF as never);
  }, [navigation]);

  const openCommunication = useCallback(() => {
    navigation.navigate(navigationStrings.COMMUNICATION as never);
  }, [navigation]);

  const tiles = useMemo<TileItem[]>(
    () => [
      {
        label: "Refills",
        iconGreen: <RefillsGreenIcon width={32} height={32} />,
        iconRed: <RefillRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: openRefills,
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
        onPress: openLabs,
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
        onPress: openDelegation,
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
        onPress: openDocumentsDashboard,
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
        onPress: openBilling,
      },
      {
        label: "Staff",
        iconGreen: <ProfileGreenIcon width={32} height={32} />,
        iconRed: <ProfileRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: openStaff,
      },
      {
        label: "Communication",
        iconGreen: <CommunicationIcon width={32} height={32} />,
        iconRed: <CommunicationRedIcon width={32} height={32} />,
        dataCount: "1",
        onPress: openCommunication,
      },
    ],
    [noop, openCommunication, openDelegation, openBilling, openLabs, openRefills, openScheduling, openTaskInbox, openStaff, openDocumentsDashboard],
  );

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
    ({ item, index }: { item: TileItem; index: number }) => (
      <NeumorphicQuickActionTile
        onPress={item.onPress ?? noop}
        icon={hasPositiveBadgeCount(item.dataCount) ? item.iconRed : item.iconGreen}
        label={item.label}
        badge={item.dataCount}
        labelNumberOfLines={1}
        outerDiameter={outerDiameter}
        innerShadowDiameter={innerShadowDiameter}
        containerStyle={[
          styles.tile,
          {
            width: tileWidth,
            marginRight: (index + 1) % GRID_COLUMNS === 0 ? 0 : GRID_GAP,
            marginBottom: GRID_GAP,
          },
        ]}
      />
    ),
    [innerShadowDiameter, noop, outerDiameter, tileWidth],
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
  /** Aligns with patient Home grid tiles; margins handle gaps (reliable on Android). */
  tile: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
