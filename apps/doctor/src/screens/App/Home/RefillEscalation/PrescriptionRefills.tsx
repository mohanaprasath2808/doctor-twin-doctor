import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import MinusIcon from "../../../../assets/icon/minus.svg";
import PlusIcon from "../../../../assets/icon/plus.svg";
import WarningIcon from "../../../../assets/icon/warningIcon.svg";
import TickIcon from "../../../../assets/icon/tickIcon.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import LastVisitIcon from "../../../../assets/icon/appointmentCalendarIcon.svg";
import PharmacyIcon from "../../../../assets/icon/pharmacyIcon.svg";
import LapReportIcon from "../../../../assets/icon/ecgPadIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

const REFILL_ROWS = [
  { id: "refills", title: "Refills", subTitle: "3 remaining" },
  { id: "qty", title: "Qty", subTitle: "#90 tablets" },
];

const INFO_ROWS = [
  { id: "last-visit", icon: <LastVisitIcon width={20} height={20} />, title: "15 March 2024", subTitle: "Last Visit" },
  { id: "safety-warnings", icon: <TickIcon width={20} height={20} />, title: "Safety Warnings", subTitle: "Monitoring" },
  { id: "pharmacy", icon: <PharmacyIcon width={20} height={20} />, title: "RDS Pharmacy", subTitle: "Pharmacy" },
  { id: "labs", icon: <LapReportIcon width={20} height={20} />, title: "Labs", subTitle: "• Missing lab tests" },
];

const PrescriptionRefills = () => {
  const navigation = useNavigation<any>();
  const [qtyCount, setQtyCount] = useState(1);
  const [refillCount, setRefillCount] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Prescription Refills</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={10}>
          <View style={styles.patientRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={60} containerSize={60} middleRingGap={0} outerRingExtra={0} />
            <View>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.rxOuter} innerStyle={styles.rxInner} borderRadius={10}>
          <View style={styles.medRow}>
            <InnerShadowIcon icon={<CapsuleIcon width={18} height={18} />} size={40} />
            <View>
              <Text style={styles.medTitle}>Lipitor</Text>
              <Text style={styles.medSub}>20 mg</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <FlatList
            data={REFILL_ROWS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            renderItem={({ item }) => (
              <View style={styles.metricRow}>
                <View style={styles.metricInfo}>
                  <Text style={styles.metricTitle}>{item.title}</Text>
                  <Text style={styles.metricSub}>{item.subTitle}</Text>
                </View>
                <View style={styles.counterWrap}>
                  <IconComponent
                    icon={<MinusIcon width={10} height={10} />}
                    width={32}
                    height={30}
                    radius={15}
                    onPress={() => setRefillCount((v) => Math.max(0, v - 1))}
                  />
                  <Text style={styles.counterValue}>{refillCount}</Text>
                  <IconComponent
                    icon={<PlusIcon width={10} height={10} />}
                    width={32}
                    height={30}
                    radius={15}
                    onPress={() => setRefillCount((v) => v + 1)}
                  />
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.infoOuter} innerStyle={styles.infoInner} borderRadius={10}>
          <FlatList
            data={INFO_ROWS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <InfoRow icon={item.icon} title={item.title} subTitle={item.subTitle} />
            )}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.alertOuter} innerStyle={styles.alertInner} borderRadius={10} backgroundColor="#FFF6E5">
          <View style={styles.alertRow}>
            <InnerShadowIcon icon={<WarningIcon width={18} height={18} />} size={36} />
            <Text style={styles.alertText}><Text style={styles.alertTextBold}>Lab overdue:</Text> BMP and eGFR are 10 overdue</Text>
          </View>
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.requestBtn}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={"#FF6B6B"}
            text="Request Review"
            textStyle={styles.requestText}
          />
          <ReusableButton title="Send Refill" containerStyle={styles.sendBtn} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ icon, title, subTitle }: { icon: React.ReactNode; title: string; subTitle: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <InnerShadowIcon icon={icon} size={40} />
      <View>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoSub}>{subTitle}</Text>
      </View>
    </View>
    <RightArrowIcon width={10} height={10} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  patientOuter: { marginTop: 30 },
  patientInner: { borderRadius: 10, padding: 10 },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  patientMeta: { color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400", marginTop: 2 },
  rxOuter: { marginTop: 20 },
  rxInner: { borderRadius: 10 },
  medRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10, paddingTop: 10 },
  medTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  medSub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 1 },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 14 },
  metricRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 },
  metricInfo: { flex: 1 },
  metricTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  metricSub: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400" },
  counterWrap: { flexDirection: "row", alignItems: "center", gap: 12 },
  counterOuter: { width: 32 },
  counterInner: { height: 30, alignItems: "center", justifyContent: "center", borderRadius: 10 },
  counterValue: { color: COLORS.TEXT_70, fontSize: 18, fontWeight: "400" },
  infoOuter: { marginTop: 20 },
  infoInner: { borderRadius: 10, padding: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  infoLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  infoTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  infoSub: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400", marginTop: 1 },
  alertOuter: { marginTop: 20 },
  alertInner: { borderRadius: 10, padding: 10, minHeight: 54, justifyContent: "center" },
  alertRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  alertText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400", flex: 1 },
  alertTextBold: { color: COLORS.PRIMARY_DARK, fontSize: 14, fontWeight: "500" },
  actionRow: { marginTop: 16, flexDirection: "row", gap: 12 },
  requestBtn: { flex: 1, height: 48, borderRadius: 24 },
  requestText: { color: "#FF7A7A", fontSize: 16, fontWeight: "500" },
  sendBtn: { flex: 1, height: 48, borderRadius: 24 },
});

export default PrescriptionRefills;
