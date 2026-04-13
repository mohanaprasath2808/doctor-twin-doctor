import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import navigationStrings from "../../../../constants/navigationStrings";

const FullPatientChart = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Full Patient Chart</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar overlaySource={OverlayImage} imageSource={DoctorTempImage} wrapperStyle={styles.avatarWrapper} imageStyle={styles.avatarImage} />
        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        <NeumorphicCard outerStyle={styles.mainCardOuter} innerStyle={styles.mainCardInner} borderRadius={12}>
          <View style={styles.diabetesRow}>
            <InnerShadowIcon size={40} icon={<Text style={styles.iconText}>D</Text>} />
            <Text style={styles.diabetesTitle}>Diabetes Mellitus</Text>
          </View>
          <View style={styles.separator} />
          <InfoRow
            title="Vitals"
            subTitle="21:9 / 4.5 mg"
            onPress={() => navigation.navigate(navigationStrings.VITALS, { metricName: "Vitals", metricValue: "21:9 / 4.5 mg" })}
          />
          <InfoRow
            title="RBS"
            subTitle="5.5 mg"
            onPress={() => navigation.navigate(navigationStrings.VITALS, { metricName: "RBS", metricValue: "5.5 mg" })}
          />
          <InfoRow
            title="HBA1C"
            subTitle="9.2%"
            isAlert
            onPress={() => navigation.navigate(navigationStrings.VITALS, { metricName: "HBA1C", metricValue: "9.2%" })}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.diagnosisOuter} innerStyle={styles.diagnosisInner} borderRadius={12}>
          <Text style={styles.diagnosesTitle}>Diagnoses</Text>
          <DiagnosisRow label="Diabetes Mellitus" />
          <DiagnosisRow label="Hypertension" />
          <DiagnosisRow label="Hyperlipiemia" isLast />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({
  title,
  subTitle,
  isAlert = false,
  onPress,
}: {
  title: string;
  subTitle: string;
  isAlert?: boolean;
  onPress?: () => void;
}) => (
  <Pressable style={styles.infoRowWrap} onPress={onPress}>
    <View style={styles.infoRowLeft}>
      <InnerShadowIcon size={34} icon={<Text style={styles.iconTextSmall}>+</Text>} />
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={[styles.infoSubTitle, isAlert && styles.alertSubTitle]}>{subTitle}</Text>
      </View>
    </View>
    <RightArrowIcon width={12} height={12} />
  </Pressable>
);

const DiagnosisRow = ({ label, isLast = false }: { label: string; isLast?: boolean }) => (
  <View style={[styles.diagnosisRow, !isLast && styles.separatorBottom]}>
    <View style={styles.diagnosisLeft}>
      <View style={styles.dot} />
      <Text style={styles.diagnosisText}>{label}</Text>
    </View>
    <RightArrowIcon width={12} height={12} />
  </View>
);

export default FullPatientChart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE, paddingTop: 12 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_DARK },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 180, height: 180 },
  avatarImage: { width: 110, height: 110, borderRadius: 55 },
  listeningText: { textAlign: "center", marginTop: 8, fontSize: 16, color: COLORS.PRIMARY_DARK, fontWeight: "600" },
  mainCardOuter: { marginTop: 14 },
  mainCardInner: { padding: 12 },
  diabetesRow: { flexDirection: "row", alignItems: "center" },
  iconText: { fontSize: 16, fontWeight: "600", color: COLORS.PRIMARY_DARK },
  diabetesTitle: { marginLeft: 10, fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500" },
  separator: { marginTop: 12, marginBottom: 8, height: 1, backgroundColor: COLORS.TEXT_10 },
  infoRowWrap: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 8 },
  infoRowLeft: { flexDirection: "row", alignItems: "center" },
  iconTextSmall: { fontSize: 14, fontWeight: "600", color: COLORS.PRIMARY_DARK },
  infoTextWrap: { marginLeft: 10 },
  infoTitle: { fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500" },
  infoSubTitle: { marginTop: 2, fontSize: 12, color: COLORS.TEXT_60, fontWeight: "400" },
  alertSubTitle: { color: COLORS.ALERT, fontWeight: "500" },
  diagnosisOuter: { marginTop: 16 },
  diagnosisInner: { padding: 12 },
  diagnosesTitle: { fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500", marginBottom: 4 },
  diagnosisRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  separatorBottom: { borderBottomWidth: 1, borderBottomColor: COLORS.TEXT_10 },
  diagnosisLeft: { flexDirection: "row", alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.TEXT_40, marginRight: 10 },
  diagnosisText: { fontSize: 16, color: COLORS.TEXT_DARK, fontWeight: "500" },
});
