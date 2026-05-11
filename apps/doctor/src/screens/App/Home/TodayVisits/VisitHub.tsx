import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import WarningIcon from "../../../../assets/icon/yellowWarningIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import ReportIcon from "../../../../assets/icon/reportIcon.svg";
import NurseIcon from "../../../../assets/icon/nurseIcon.svg";
import LotusIcon from "../../../../assets/icon/lotusIcon.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import RefillsIcon from "../../../../assets/icon/refillsIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";
import ShieldIcon from "../../../../assets/icon/shieldIcon.svg";

type RouteParams = {
  patient?: {
    name: string;
    status?: string;
    room?: string;
    flagText?: string;
  };
};

type HubTile = {
  id: string;
  title: string;
  icon: React.ReactNode;
  badgeCount?: number;
  onPress?: () => void;
};

const VisitHub = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params ?? {}) as RouteParams;

  const patient = params.patient ?? {
    name: "Sarah Williams",
    status: "Waiting",
    room: "Room 3",
    flagText: "Mammogram overdue",
  };

  const tiles: HubTile[] = useMemo(() => {
    const patientParams = { patient };

    return [
      {
        id: "clinical",
        title: "Clinical\nsummary",
        icon: <ReportIcon width={18} height={18} />,
        onPress: () => navigation.navigate(navigationStrings.CLINICAL_SUMMARY, patientParams),
      },
      {
        id: "reception",
        title: "Reception\nIntake",
        icon: <NurseIcon width={18} height={18} />,
        onPress: () => navigation.navigate(navigationStrings.RECEPTION_INTAKE, patientParams),
      },
      {
        id: "preventive",
        title: "Preventive\nCare",
        icon: <LotusIcon width={18} height={18} />,
        onPress: () => navigation.navigate(navigationStrings.PREVENTIVE_CARE, patientParams),
      },
      {
        id: "results",
        title: "Recent\nResults",
        icon: <LabReportIcon width={18} height={18} />,
        badgeCount: 5,
        onPress: () => navigation.navigate(navigationStrings.RECENT_RESULTS, patientParams),
      },
      {
        id: "messages",
        title: "Messages",
        icon: <MessageIcon width={18} height={18} />,
        onPress: () => navigation.navigate(navigationStrings.VISIT_MESSAGES, patientParams),
      },
      {
        id: "refills",
        title: "Refill\nRequests",
        icon: <RefillsIcon width={18} height={18} />,
        badgeCount: 2,
        onPress: () => navigation.navigate(navigationStrings.REFILL_REQUESTS, patientParams),
      },
      {
        id: "consults",
        title: "Recent\nConsults",
        icon: <PatientIcon width={18} height={18} />,
        onPress: () => navigation.navigate(navigationStrings.RECENT_CONSULTS, patientParams),
      },
      {
        id: "auth",
        title: "Authorizations",
        icon: <ShieldIcon width={18} height={18} />,
        onPress: () => navigation.navigate(navigationStrings.PRIOR_AUTHORIZATION, patientParams),
      },
    ];
  }, [navigation, patient]);

  const renderHeader = () => (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<BackIcon width={16} height={16} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Visit Hub</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.avatarContainer}
        wrapperStyle={styles.avatarWrapper}
        overlayStyle={styles.avatarOverlay}
        imageStyle={styles.avatarImage}
      />

      <Text style={styles.patientName}>{patient.name}</Text>
      <Text style={styles.patientMeta}>
        {patient.room ? patient.room : "Room 3"} • {patient.status ? patient.status : "Waiting"}
      </Text>

      {patient.flagText && (
        <NeumorphicCard
          outerStyle={styles.alertOuter}
          innerStyle={styles.alertInner}
          borderRadius={14}
          backgroundColor="#FFF9E9"
        >
          <View style={styles.alertRow}>
            <InnerShadowIcon icon={<WarningIcon width={14} height={14} />} size={34} />
            <Text style={styles.alertText}>
              <Text style={styles.alertPrefix}>PPO</Text>
              {/* <Text style={styles.alertSpacer}> </Text> */}{" "}
              {patient.flagText}
            </Text>
          </View>
        </NeumorphicCard>
      )}
    </View>
  );

  const renderTile = ({ item }: { item: HubTile }) => (
    <View style={styles.tileCell}>
      <NeumorphicCard
        outerStyle={styles.tileOuter}
        innerStyle={styles.tileInner}
        borderRadius={14}
        onPress={item.onPress}
      >
        <View style={styles.tileLeft}>
          <InnerShadowIcon icon={item.icon} size={40} />
          <Text style={styles.tileText} numberOfLines={2}>
            {item.title}
          </Text>

        </View>

        <View style={styles.tileRight}>
          {item.badgeCount && (
            <View style={styles.badgeDot}>
              <Text style={styles.badgeText}>{item.badgeCount}</Text>
            </View>
          )}
          <RightArrowIcon width={10} height={10} />
        </View>


      </NeumorphicCard>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={tiles}
        keyExtractor={(t) => t.id}
        numColumns={2}
        renderItem={renderTile}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <NeumorphicCard
            outerStyle={styles.ordersOuter}
            innerStyle={styles.ordersInner}
            borderRadius={14}
            onPress={() => navigation.navigate(navigationStrings.ORDER_HUB, { patient })}
          >
            <View style={styles.ordersLeft}>
              <InnerShadowIcon icon={<ReportIcon width={18} height={18} />} size={40} />
              <Text style={styles.ordersText}>Orders & Referrals</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        }
      />
    </SafeAreaView>
  );
};

export default VisitHub;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerWrap: {
    paddingTop: 10,
    paddingBottom: 12,
    alignItems: "center",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    paddingTop: 8,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarOverlay: {
    borderRadius: 90,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    paddingTop: 4,
    fontSize: 14,
    color: COLORS.TEXT_70,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
  },
  alertOuter: {
    width: "100%",
    marginTop: 14,
  },
  alertInner: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Text-Regular",
  },
  alertPrefix: {
    color: COLORS.TEXT_DARK,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  gridRow: {
    gap: 8,
    marginBottom: 10,
  },
  tileCell: {
    flex: 1,
    maxWidth: "50%",
  },
  tileOuter: {
    width: "100%",
  },
  tileInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tileLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    maxWidth: "56%",
  },
  tileText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  tileRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  badgeDot: {
    alignSelf: "flex-end",
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: COLORS.ALERT,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  ordersOuter: {
    width: "100%",
    marginTop: 6,
  },
  ordersInner: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ordersLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ordersText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});

