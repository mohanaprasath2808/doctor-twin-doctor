import React from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import BlueTickIcon from "../../../../assets/icon/tickBlueIcon.svg";
import RedWarningIcon from "../../../../assets/icon/redWarningIcon.svg";
import RightArrow from "../../../../assets/icon/rightArrow.svg";
import SelectedCheckBox from "../../../../assets/icon/tickGreyIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowContainer from "../../../../neomorphism/InnerShadowContainer";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const REFERENCE_LOG = "Reference log GGH78292 23 Apr 2025 03:11 PM";

type LabLine = {
  id: string;
  title: string;
  sub: string;
};

const LAB_LINES: LabLine[] = [
  { id: "cbc", title: "CBC", sub: "Priority Today" },
  { id: "cmp", title: "Comprehensive Metabolic Panel", sub: "Priority" },
];

function RowSeparator() {
  return <View style={styles.rowDivider} />;
}

const OrderUpdated = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const renderLabLine: ListRenderItem<LabLine> = ({ item }) => (
    <View style={styles.orderRow}>
      <InnerShadowIcon size={40} radius={20} icon={<BlueTickIcon width={18} height={18} />} />
      <View style={styles.orderMid}>
        <Text style={styles.orderTitle}>{item.title}</Text>
        <Text style={[styles.orderSub, styles.orderSubPlain]}>{item.sub}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 16 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Order Updated</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={12}
        >
          <View style={styles.patientHeaderRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
            <View style={styles.patientTextCol}>
              <View style={styles.nameBadgeRow}>
                <Text style={styles.drName}>Dr.Soliman</Text>
                <DeltaBadge
                  icon={null}
                  value="Pending Submission"
                  width={132}
                  height={26}
                  bgColor={COLORS.ESCALATION}
                  darkShadowColor="#F2D790"
                  lightShadowColor="#FFFFFF"
                  textColor={COLORS.ESCALATION_DARK}
                  textStyle={styles.pendingBadgeText}
                />
              </View>
              <View style={styles.patientMetaRow}>
                <Text style={styles.patientMeta}>John Miller</Text>
                <View style={styles.metaDot} />
                <Text style={styles.patientMeta2}>Age 45</Text>
                <View style={styles.metaDot} />
                <Text style={styles.patientMeta2}>Female</Text>
              </View>
            </View>
          </View>

          <InnerShadowContainer
            borderRadius={100}
            color="#F0F4F8"
            containerStyle={styles.insightContainer}
            contentStyle={styles.insightContent}
          >
            <SelectedCheckBox width={18} height={18} />
            <View style={styles.insightTextCol}>
              <Text style={styles.insightTitle}>Orders updated for Dr.Soliman</Text>
              <Text style={styles.insightSub}>Review and submit when ready</Text>
            </View>
          </InnerShadowContainer>
        </NeumorphicCard>

        <Text style={styles.sectionHeading}>Orders Adjusted</Text>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Removed</Text>
          <View style={styles.orderRow}>
            <InnerShadowIcon
              size={40}
              radius={20}
              icon={<RedWarningIcon width={18} height={18} />}
              backgroundColor={COLORS.ALERT_LIGHT}
            />
            <View style={styles.orderMid}>
              <Text style={styles.orderTitle}>Nephrology Referral</Text>
              <Text style={[styles.orderSub, styles.orderSubPlain]}>Soliman Clinic</Text>
            </View>
            <RightArrow width={14} height={14} style={styles.chevron} />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Lab Orders</Text>
          <FlatList
            data={LAB_LINES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={renderLabLine}
            ItemSeparatorComponent={RowSeparator}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Imaging Orders</Text>
          <View style={styles.orderRow}>
            <InnerShadowIcon size={40} radius={20} icon={<BlueTickIcon width={18} height={18} />} />
            <View style={styles.orderMid}>
              <Text style={styles.orderTitle}>Abnormal Ultrasound</Text>
              <Text style={[styles.orderSub, styles.orderSubPlain]}>Priority Tomorrow</Text>
            </View>
          </View>
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            <ReusableButton
              title="Submit Orders"
              height={52}
              borderRadius={26}
              onPress={() => navigation.navigate(navigationStrings.ORDER_SUCCESSFULLY_PLACED)}
              textStyle={styles.submitButtonText}
            />
          </View>
          <View style={styles.actionCell}>
            <AppButton
              text="Continue Editing"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={[styles.outlineLabel]}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>

        <Text style={styles.referenceText}>{REFERENCE_LOG}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderUpdated;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: {
    width: "100%",
    marginTop: 24,
  },
  patientCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  patientHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  patientTextCol: {
    flex: 1,
    minWidth: 0,
  },
  nameBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  drName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  pendingBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  patientMeta: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  patientMeta2: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_70,
  },
  patientMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
  },
  insightContainer: {
    marginTop: 14,
    width: "100%",
  },
  insightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  insightTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
    lineHeight: 18,
  },
  insightSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Text-Regular",
  },
  sectionHeading: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  categoryOuter: {
    width: "100%",
    marginTop: 12,
  },
  categoryInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  orderMid: {
    flex: 1,
    minWidth: 0,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  orderSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  orderSubPlain: {
    marginTop: 3,
  },
  chevron: {
    opacity: 0.55,
    marginLeft: 4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 8,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
    alignItems: "stretch",
  },
  actionCell: {
    flex: 1,
    minWidth: 0,
  },
  outlineLabel: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  referenceText: {
    marginTop: 16,
    textAlign: "left",
    fontSize: 12,
    fontFamily: "SF-Pro-Text-Regular",
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "500",
    color: COLORS.WHITE,
  },
});
