import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import StatusDot from "../../../../components/Common/StatusDot";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import LabsTrendChart from "./LabsTrendChart";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import LabLocationIcon from "../../../../assets/icon/labLocationIcon.svg";
import navigationStrings from "../../../../constants/navigationStrings";

const LabsDetail = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Labs Detail</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={12}
        >
          <View style={styles.patientTopRow}>
            <View style={styles.patientLeft}>
              <InnerShadowIcon
                size={40}
                icon={
                  <Text style={styles.initials}>
                    {getInitials("Sarah Williams")}
                  </Text>
                }
              />
              <View style={styles.nameWrap}>
                <Text style={styles.patientName}>Sarah Williams</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>Female</Text>
                  <View style={styles.metaDot} />
                  <Text style={styles.metaText}>Age 45</Text>
                </View>
              </View>
            </View>
            <NeumorphicCard
              outerStyle={styles.criticalOuter}
              innerStyle={styles.criticalInner}
              borderRadius={14}
              backgroundColor="#FDECEC"
            >
              <Text style={styles.criticalText}>Critical</Text>
            </NeumorphicCard>
          </View>
          <View style={styles.inlineChartWrap}>
            <LabsTrendChart title="HbA1c" value="9.2%" />
          </View>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.innerAlertCard}
            contentStyle={styles.innerAlertContent}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor="#C8CBCC"
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor="#FFFFFF99"
          >
            <View style={styles.alertLineRow}>
              <StatusDot color="#FF6B6B" style={styles.alertDot} />
              <Text style={styles.alertLine}>
                Renal Function labs are Overdue
              </Text>
            </View>
            <View style={[styles.alertLineRow, { marginTop: 10 }]}>
              <StatusDot color="#EEB621" style={styles.alertDot} />
              <Text style={styles.alertLine}>A1C level elevated</Text>
            </View>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.locationOuter}
          innerStyle={styles.locationInner}
          borderRadius={12}
          onPress={() => navigation.navigate(navigationStrings.LAB_LOCATION)}
        >
          <View style={styles.locationRow}>
            <InnerShadowIcon
              size={40}
              icon={<LabLocationIcon width={20} height={20} />}
            />
            <Text style={styles.locationText}>Lab Location</Text>
            <RightArrowIcon width={10} height={10} />
          </View>
        </NeumorphicCard>

        <View style={styles.actionsGrid}>
          <AppButton
            text="Convert to Task"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
          />
          <ReusableButton
            title="Send Lab Orders"
            width="48%"
            height={48}
            borderRadius={24}
            textStyle={styles.reusableActionText}
            onPress={() => navigation.navigate(navigationStrings.ORDER_SENT)}
          />
          <AppButton
            text="Message Patient"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
            onPress={() =>
              navigation.navigate(navigationStrings.MESSAGE_PATIENT)
            }
          />
          <AppButton
            text="Call Patient"
            style={styles.actionButton}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.actionText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LabsDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { flexGrow: 1, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: { marginHorizontal: 16 },
  patientCardInner: { padding: 12 },
  patientTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  patientLeft: { flexDirection: "row", flex: 1, marginRight: 10 },
  initials: { fontSize: 16, fontWeight: "600", color: COLORS.PRIMARY_DARK },
  nameWrap: { marginLeft: 10 },
  patientName: { fontSize: 16, fontWeight: "600", color: COLORS.TEXT_DARK },
  metaRow: { marginTop: 2, flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 12, color: COLORS.TEXT_70, fontWeight: "400" },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
    marginHorizontal: 6,
  },
  criticalOuter: { minWidth: 72 },
  criticalInner: {
    height: 28,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  criticalText: { color: COLORS.ALERT, fontSize: 12, fontWeight: "500" },
  inlineChartWrap: {
    marginBottom: 20,
  },
  innerAlertCard: { marginBottom: 6 },
  innerAlertContent: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: "center",
  },
  alertLine: { fontSize: 14, color: COLORS.TEXT_DARK, fontWeight: "500" },
  alertLineRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  alertDot: { marginRight: 8 },
  locationOuter: { marginHorizontal: 16, marginTop: 16 },
  locationInner: { paddingHorizontal: 12, paddingVertical: 12 },
  locationRow: { flexDirection: "row", alignItems: "center" },
  locationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
  actionsGrid: {
    marginTop: "auto",
    paddingTop: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
    marginBottom: 24,
  },
  actionButton: { width: "48%", height: 48, borderRadius: 24 },
  actionText: { fontSize: 16, color: COLORS.PRIMARY_DARK, fontWeight: "500" },
  reusableActionText: { fontSize: 16, color: COLORS.WHITE, fontWeight: "600" },
});
