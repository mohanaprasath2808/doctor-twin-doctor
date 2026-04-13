import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import LabsTrendChart from "./LabsTrendChart";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import PatientIcon from "../../../../assets/icon/patientIcon.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import UtilizationIcon from "../../../../assets/icon/utilizationIcon.svg";

const Vitals = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const metricName = route?.params?.metricName ?? "Vitals";
  const metricValue = route?.params?.metricValue ?? "9.2%";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>{metricName}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <NeumorphicCard outerStyle={styles.metricsOuter} innerStyle={styles.metricsInner} borderRadius={12}>
          <View style={styles.metricsRow}>
            <MetricItem icon={<CalendarIcon width={18} height={18} />} value="120 /80 mg" label="BP history" />
            <MetricItem icon={<PatientIcon width={18} height={18} />} value="265 lbs" label="Weight trend" />
          </View>
          <View style={[styles.metricsRow, styles.metricsRowBottom]}>
            <MetricItem icon={<MessageIcon width={18} height={18} />} value="98" label="Pulse" />
            <MetricItem icon={<UtilizationIcon width={18} height={18} />} value="42" label="Oxygen" />
          </View>
        </NeumorphicCard>
        <NeumorphicCard outerStyle={styles.chartOuter} innerStyle={styles.chartInner} borderRadius={12}>
          <LabsTrendChart title={metricName} value={metricValue} />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const MetricItem = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <View style={styles.metricItem}>
    <InnerShadowIcon size={42} icon={icon} />
    <View style={styles.metricTextWrap}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  </View>
);

export default Vitals;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  metricsOuter: { marginTop: 4 },
  metricsInner: { paddingHorizontal: 12, paddingVertical: 10 },
  metricsRow: { flexDirection: "row", justifyContent: "space-between" },
  metricsRowBottom: { marginTop: 12 },
  metricItem: { width: "48%", flexDirection: "row", alignItems: "center" },
  metricTextWrap: { marginLeft: 10, flex: 1 },
  metricValue: { fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500" },
  metricLabel: { marginTop: 2, fontSize: 12, color: COLORS.TEXT_60, fontWeight: "400" },
  chartOuter: { marginTop: 16 },
  chartInner: { paddingHorizontal: 10, paddingVertical: 10 },
});
