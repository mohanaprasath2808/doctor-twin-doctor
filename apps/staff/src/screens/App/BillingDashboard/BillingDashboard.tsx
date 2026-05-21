import React from "react";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import BillingGreenIcon from "../../../assets/icon/formBillingIcon.svg";
import ClaimIssueIcon from "../../../assets/icon/greenHazardIcon.svg";
import CodingQuestionIcon from "../../../assets/icon/formWithQuestion.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicQuickActionTile from "../../../components/neomorphism/NeumorphicQuickActionTile";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import OrbitCluster, { OrbitClusterNode } from "../Labs/components/OrbitCluster";
import type { BillingCategoryKey } from "./billingCategoryTypes";
import BillingDashboardItemCard from "./components/BillingDashboardItemCard";
import type { BillingItem } from "../../utills/billingStatus";

const HEADER_H = 52;
const BG = COLORS.INNER_SURFACE;

type BillingNode = OrbitClusterNode & {
  label: string;
  subLabel: string;
  key: BillingCategoryKey;
  badge?: string;
};

const BILLING_NODES: BillingNode[] = [
  {
    id: "coding",
    label: "Coding Question",
    subLabel: "",
    key: "coding-question",
    figmaLeft: 20,
    figmaTop: 50,
    figmaWrapW: 110,
  },
  {
    id: "patient-billing",
    label: "Patient Billing",
    subLabel: "",
    key: "patient-billing",
    figmaLeft: 296,
    figmaTop: 50,
    figmaWrapW: 104,
  },
  {
    id: "claim-issue",
    label: "Claim Issue",
    subLabel: "",
    key: "claim-issue",
    figmaLeft: 44,
    figmaTop: 235,
    figmaWrapW: 104,
  },
];

/** Short preview of list-style cards (same component as category list). */
const DASHBOARD_PREVIEW_ITEMS: BillingItem[] = [
  {
    id: "dash-1",
    patientName: "Brian Carter",
    patientMeta: "Female • Age 45",
    payerName: "Blue Cross Blue",
    memberId: "BHHGJSJ9833",
    status: "Pending",
    issue: "Prior auth issue",
  },
  {
    id: "dash-2",
    patientName: "Brian Carter",
    patientMeta: "Female • Age 45",
    payerName: "Blue Cross Blue",
    memberId: "BHHGJSJ9833",
    status: "Pending",
    issue: "Refund request",
  },
  {
    id: "dash-3",
    patientName: "Brian Carter",
    patientMeta: "Female • Age 45",
    payerName: "Blue Cross Blue",
    memberId: "BHHGJSJ9833",
    status: "Pending",
    issue: "Copay",
    assigneeName: "Brian Carter",
  },
];

const BillingDashboard = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { width: sw, height: sh } = useWindowDimensions();
  const availH = sh - insets.top - insets.bottom - HEADER_H;
  const orbitH = Math.round(availH * 0.46);

  const renderOrbitIcon = (node: BillingNode, size: number) => {
    switch (node.key) {
      case "coding-question":
        return <CodingQuestionIcon width={size} height={size} />;
      case "patient-billing":
        return <BillingGreenIcon width={size} height={size} />;
      case "claim-issue":
        return <ClaimIssueIcon width={size} height={size} />;
      default:
        return <CodingQuestionIcon width={size} height={size} />;
    }
  };

  const renderTopCluster = () => (
    <OrbitCluster
      orbitH={orbitH}
      sw={sw}
      nodes={BILLING_NODES}
      centerLabel="Dr.Twin"
      centerImageSource={DoctorTempImage}
      centerOverlaySource={OverlayImage}
      centerLabelStyle={styles.drTwinLabel}
      renderNode={({ node, sx, btnSize }) => {
        const iconSize = Math.round(26 * sx);
        const innerD = Math.round(btnSize * 0.82);
        return (
          <>
            <NeumorphicQuickActionTile
              onPress={() =>
                navigation.navigate(navigationStrings.BILLING_CATEGORY_LIST, { categoryKey: node.key })
              }
              icon={renderOrbitIcon(node, iconSize)}
              label={node.label}
              badge={node.badge}
              outerDiameter={btnSize}
              innerShadowDiameter={innerD}
              innerShadowBorderRadius={Math.round(innerD / 2)}
              containerStyle={styles.quickTileContainer}
              labelNumberOfLines={2}
              badgeTextStyle={{
                fontSize: Math.round(9 * sx),
                fontWeight: "700",
                fontFamily: "SF-Pro-Display-Semibold",
              }}
            />
            {node.subLabel ? (
              <Text style={styles.nodeSubLabel} numberOfLines={2}>
                {node.subLabel}
              </Text>
            ) : null}
          </>
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header]}>
          <IconComponent
            icon={<BackArrowIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Billing Dashboard</Text>
          <View style={styles.headerBellWrap}>
            <IconComponent
              icon={<MaterialCommunityIcons name="bell-outline" size={20} color={COLORS.TEXT_DARK} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => { }}
            />
            <View style={styles.bellDot} />
          </View>
        </View>
        {renderTopCluster()}

        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>Recents</Text>
          {DASHBOARD_PREVIEW_ITEMS.map((item, index) => (
            <BillingDashboardItemCard
              key={item.id}
              item={item}
              outerStyle={index === 0 ? styles.previewFirstCard : undefined}
              onPress={() => navigation.navigate(navigationStrings.BILLING_DETAIL, { item })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: Platform.OS === "ios" ? 8 : 6,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerBellWrap: {
    position: "relative",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.ALERT,
  },
  drTwinLabel: {
    marginTop: 5,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  quickTileContainer: {
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  nodeSubLabel: {
    marginTop: 2,
    lineHeight: 15,
    fontSize: 11,
    fontFamily: "SF-Pro-Display-Regular",
    color: COLORS.TEXT_60,
    textAlign: "center",
  },
  previewSection: {
    paddingHorizontal: 16,
  },
  previewTitle: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  previewFirstCard: {
    marginTop: 0,
  },
});

