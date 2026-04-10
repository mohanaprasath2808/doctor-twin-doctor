import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import BackIcon from "../../assets/icon/backArrow.svg";
import NotificationIcon from "../../assets/icon/notificationIcon.svg";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import PatientIcon from "../../assets/icon/patientIcon.svg";
import HomeIcon from "../../assets/icon/unSelectedIcon.svg";
import ScribeIcon from "../../assets/icon/scribeIcon.svg";
import { useNavigation } from "@react-navigation/native";

const chartData = [
  { value: 5.6 },
  { value: 5.8 },
  { value: 5.7 },
  { value: 6.0 },
  { value: 5.9 },
  { value: 6.2 },
  { value: 6.4 },
  { value: 6.1 },
  { value: 6.6 },
  { value: 6.5 },
  { value: 6.9 },
  { value: 7.2 },
  { value: 7.0 },
  { value: 7.3 },
  { value: 7.5 },
  { value: 7.1 },
  { value: 7.6 },
  { value: 7.9 },
  { value: 8.2 },
  { value: 9.2 },
];

const LabAlertDecision = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Dr.Twin Listening...</Text>
          <IconComponent
            icon={<NotificationIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
          />
        </View>

        <View style={styles.avatarWrap}>
          <Image source={DoctorTempImage} style={styles.avatar} />
        </View>

        <NeumorphicCard outerStyle={styles.alertOuter} innerStyle={styles.alertInner} borderRadius={14}>
          <View style={styles.alertBadge} />
          <Text style={styles.alertTitle}>Laboratory Alert</Text>
          <Text style={styles.alertSub}>Abnormal lab needs your decision.</Text>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.mainCardOuter} innerStyle={styles.mainCardInner} borderRadius={12}>
          <View style={styles.patientTop}>
            <View style={styles.patientMetaWrap}>
              <InnerShadowIcon icon={<Text style={styles.initials}>SW</Text>} size={40} />
              <View>
                <Text style={styles.patientName}>Sarah Williams</Text>
                <Text style={styles.patientMeta}>Female • Age 45</Text>
              </View>
            </View>
            <View style={styles.criticalBadge}>
              <Text style={styles.criticalText}>Critical</Text>
            </View>
          </View>

          <Text style={styles.chartTitle}>HbA1c 9.2%</Text>
          <View style={styles.chartWrap}>
            <LineChart
              data={chartData}
              areaChart
              color="#F08FA2"
              thickness={2}
              startFillColor="#FDE6EC"
              endFillColor="#FDE6EC"
              startOpacity={0.45}
              endOpacity={0.02}
              hideDataPoints
              hideAxesAndRules
              disableScroll
              adjustToWidth
              isAnimated={false}
              initialSpacing={0}
              endSpacing={0}
            />
          </View>

          <View style={styles.xAxisRow}>
            <Text style={styles.axisText}>wed</Text>
            <Text style={styles.axisText}>6.9</Text>
            <Text style={styles.axisText}>6.6</Text>
            <Text style={styles.axisText}>6 months ago</Text>
            <Text style={styles.axisText}>2.4</Text>
          </View>

          <View style={styles.separator} />

          <NeumorphicCard outerStyle={styles.notesOuter} innerStyle={styles.notesInner} borderRadius={10}>
            <Text style={styles.noteItem}>• Renal Function labs are Overdue</Text>
            <Text style={styles.noteItem}>• A1C level elevated</Text>
          </NeumorphicCard>
        </NeumorphicCard>

        <View style={styles.actionsGrid}>
          <ReusableButton title="Order Repeat Test" width="48%" height={48} borderRadius={24} textColor={COLORS.PRIMARY} />
          <ReusableButton title="Delegate" width="48%" height={48} borderRadius={24} textColor={COLORS.PRIMARY} />
          <ReusableButton title="Review Full chart" width="48%" height={48} borderRadius={24} textColor={COLORS.PRIMARY} />
          <ReusableButton title="Escalate Urgent" width="48%" height={48} borderRadius={24} textColor={COLORS.PRIMARY} />
        </View>

        <ReusableButton
          title="Schedule Patient"
          width="100%"
          height={48}
          borderRadius={24}
          containerStyle={styles.scheduleBtn}
        />

        <NeumorphicCard outerStyle={styles.bottomOuter} innerStyle={styles.bottomInner} borderRadius={14}>
          <View style={styles.bottomItem}>
            <HomeIcon width={18} height={18} />
            <Text style={styles.bottomText}>Home</Text>
          </View>
          <View style={styles.centerMicWrap}>
            <InnerShadowIcon icon={<ScribeIcon width={20} height={20} />} size={72} />
            <Text style={styles.bottomSelected}>Queue</Text>
          </View>
          <View style={styles.bottomItem}>
            <PatientIcon width={18} height={18} />
            <Text style={styles.bottomText}>Patients</Text>
          </View>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LabAlertDecision;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 22 },
  header: { marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 30 / 1.5, fontWeight: "600" },
  avatarWrap: { marginTop: 12, alignItems: "center" },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  alertOuter: { marginTop: 12, marginLeft: 30 },
  alertInner: { borderRadius: 14, backgroundColor: "#BDEEFF", paddingVertical: 12, paddingHorizontal: 14 },
  alertBadge: { position: "absolute", left: -20, top: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: "#FFFFFF" },
  alertTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  alertSub: { marginTop: 4, color: COLORS.TEXT_80, fontSize: 16 / 1.2, fontWeight: "400" },
  mainCardOuter: { marginTop: 16 },
  mainCardInner: { borderRadius: 12, padding: 12 },
  patientTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  patientMetaWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  initials: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "500" },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  patientMeta: { marginTop: 2, color: COLORS.TEXT_70, fontSize: 14, fontWeight: "400" },
  criticalBadge: { paddingHorizontal: 12, height: 28, borderRadius: 14, backgroundColor: "#FDECEC", alignItems: "center", justifyContent: "center" },
  criticalText: { color: "#F08D9D", fontSize: 13, fontWeight: "500" },
  chartTitle: { marginTop: 14, color: "#ED7E92", fontSize: 32 / 1.5, fontWeight: "600" },
  chartWrap: { marginTop: 8, height: 110 },
  xAxisRow: { marginTop: 8, flexDirection: "row", justifyContent: "space-between" },
  axisText: { color: COLORS.TEXT_50, fontSize: 12, fontWeight: "400" },
  separator: { marginTop: 10, height: 1, backgroundColor: COLORS.TEXT_10 },
  notesOuter: { marginTop: 12 },
  notesInner: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 },
  noteItem: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500", marginVertical: 3 },
  actionsGrid: { marginTop: 16, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 10 },
  scheduleBtn: { marginTop: 14 },
  bottomOuter: { marginTop: 18 },
  bottomInner: { borderRadius: 14, paddingHorizontal: 26, paddingVertical: 14, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  bottomItem: { alignItems: "center", gap: 6 },
  bottomText: { color: COLORS.TEXT_50, fontSize: 12, fontWeight: "400" },
  centerMicWrap: { alignItems: "center", marginTop: -18 },
  bottomSelected: { marginTop: 4, color: COLORS.TEXT_DARK, fontSize: 12, fontWeight: "500" },
});
