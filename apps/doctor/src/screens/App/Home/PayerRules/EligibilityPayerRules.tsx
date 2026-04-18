import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import AppButton from "../../../../components/Common/AppButton";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import ShieldIcon from "../../../../assets/icon/shieldIcon.svg";
import CardIcon from "../../../../assets/icon/cardIcon.svg";
import ReportIcon from "../../../../assets/icon/listIcon.svg";
import ProfileVerified from "../../../../assets/icon/profileWithTickIcon.svg";
import WarningIcon from "../../../../assets/icon/redWarningIcon.svg";
import DeductableIcon from "../../../../assets/icon/cutCurrencyIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

const EligibilityPayerRules = () => {
  const navigation = useNavigation<any>();
  const payerType = "HMO" as string;
  const isPPO = payerType === "PPO";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent icon={<BackIcon width={18} height={18} />} width={40} height={40} radius={20} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Eligibility & Payer Rules</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.patientCardOuter} innerStyle={styles.patientCardInner} borderRadius={10}>
          <View style={styles.patientTopRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={60} containerSize={60} middleRingGap={0} outerRingExtra={0} />
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <Text style={styles.patientMeta}>Female • Age 45 • 02/12/1992</Text>
            </View>
          </View>

          <View style={styles.patientBottomRow}>
            <View style={styles.payerLeft}>
              <InnerShadowIcon icon={<ShieldIcon width={18} height={18} />} size={40} />
              <View>
                <Text style={styles.payerTitle}>Blue Cross Blue Shield (HMO)</Text>
                <Text style={styles.payerSub}>Plan ID:7363</Text>
              </View>
            </View>
            <View style={styles.payerRight}>
              <DeltaBadge
                icon={null}
                value="Active"
                bgColor={COLORS.SUCCESS}
                darkShadowColor={"#A9E9D5"}
                lightShadowColor="#FFFFFF"
                textColor="#10B981"
                height={20}
                width={53}
                radius={114}
              />
            </View>

          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.listCardOuter} innerStyle={styles.listCardInner} borderRadius={10}>
          <DetailRow icon={<CardIcon width={18} height={18} />} title="Copay" value="$23 PCP" />
          <View style={styles.divider} />
          <DetailRow icon={<DeductableIcon width={18} height={18} />} title="Deductible" value="$1243 met /$3500" />
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <InnerShadowIcon icon={<ReportIcon width={18} height={18} />} size={40} />
              <Text style={styles.detailTitle}>Payer Rules</Text>
            </View>
            <DeltaBadge
              icon={null}
              value="Referal Required"
              bgColor="#FFFFFF"
              darkShadowColor="#F2CACA"
              lightShadowColor="#FFFFFF99"
              textColor="#FF6B6B"
              height={20}
              width={117}
              radius={114}
            />
          </View>
          <View style={styles.divider} />
          <DetailRow icon={<ProfileVerified width={18} height={18} />} title="Assigned PCP" value="Dr.Soliman" />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.rulesCardOuter} innerStyle={styles.rulesCardInner} borderRadius={10}>
          <View style={styles.rulesHeader}>
            <Text style={styles.rulesTitle}>Payer Rules</Text>
            <DeltaBadge
              icon={null}
              value={payerType}
              bgColor={COLORS.SURFACE}
              darkShadowColor="#C8CBCC"
              lightShadowColor="#FFFFFF99"
              textColor={COLORS.PRIMARY}
              height={24}
              radius={12}
            />
          </View>

          <NeumorphicCard outerStyle={styles.warningCardOuter} innerStyle={styles.warningCardInner} borderRadius={10} backgroundColor="#FDECEC">
            <View style={styles.warningRow}>
              <InnerShadowIcon icon={<WarningIcon width={18} height={18} />} size={40} />
              <View style={styles.warningTextWrap}>
                <Text style={styles.warningTitle}>Referral Required</Text>
                <Text style={styles.warningText}>Nathan Adams has an HMP plan and referral is required to see any specialist.</Text>
              </View>
            </View>
          </NeumorphicCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.requirementsCardOuter} innerStyle={styles.requirementsCardInner} borderRadius={10}>
          <View style={styles.rulesHeader}>
            <Text style={styles.rulesTitle}>Referral Requirements</Text>
            <DeltaBadge
              icon={null}
              value={payerType}
              bgColor={COLORS.SURFACE}
              darkShadowColor="#C8CBCC"
              lightShadowColor="#FFFFFF99"
              textColor={COLORS.PRIMARY}
              height={24}
              radius={12}
            />
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.bulletTextBold}>HMO:</Text> Referral required before any specialist visit</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.bulletTextBold}>PPO:</Text> Referral not required for specialist in network</Text>
          </View>
        </NeumorphicCard>

        <View style={styles.actionRow}>
          {!isPPO && (
            <AppButton activeOpacity={0.8} style={styles.actionBtn} borderWidth={1} borderColor={COLORS.PRIMARY} bgColor={COLORS.SURFACE} text="Add Referral" textStyle={styles.actionText} onPress={() => { }} />
          )}
          <AppButton activeOpacity={0.8} style={[styles.actionBtn, isPPO && styles.fullWidthActionBtn]} borderWidth={1} borderColor={COLORS.PRIMARY} bgColor={COLORS.SURFACE} text="Unlock Secure Form" textStyle={styles.actionText} onPress={() => { }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailLeft}>
      <InnerShadowIcon icon={icon} size={40} />
      <Text style={styles.detailTitle}>{title}</Text>
    </View>
    <View style={styles.detailRight}>
      <Text style={styles.detailValue}>{value}</Text>
      <RightArrowIcon width={10} height={10} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: { marginTop: 30 },
  patientCardInner: { borderRadius: 10, padding: 10 },
  patientTopRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientInfo: { flex: 1 },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  patientMeta: { color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400", marginTop: 2 },
  patientBottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 15 },
  payerLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  payerTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  payerSub: { color: COLORS.TEXT_60, fontSize: 14, fontWeight: "400", marginTop: 2 },
  payerRight: { height: "100%" },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 14 },
  listCardOuter: { marginTop: 20 },
  listCardInner: { borderRadius: 10, padding: 10 },
  detailRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  detailLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  detailTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  detailRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailValue: { color: COLORS.TEXT_DARK, fontSize: 12, fontWeight: "500" },
  rulesCardOuter: { marginTop: 20 },
  rulesCardInner: { borderRadius: 10, padding: 10 },
  rulesHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rulesTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  warningCardOuter: { marginTop: 10 },
  warningCardInner: { borderRadius: 10, padding: 10 },
  warningRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  warningTextWrap: { flex: 1 },
  warningTitle: { color: COLORS.ALERT, fontSize: 14, fontWeight: "500" },
  warningText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400", marginTop: 2, lineHeight: 20 },
  requirementsCardOuter: { marginTop: 20 },
  requirementsCardInner: { borderRadius: 10, padding: 10 },
  bulletRow: { marginTop: 10, flexDirection: "row", alignItems: "flex-start", gap: 8 },
  bullet: { color: COLORS.TEXT_70, fontSize: 16, fontWeight: "500", lineHeight: 20 },
  bulletText: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "400", flex: 1, lineHeight: 20 },
  bulletTextBold: { color: COLORS.TEXT_DARK, fontWeight: "500" },
  actionRow: { marginTop: 20, flexDirection: "row", gap: 12 },
  actionBtn: { flex: 1, height: 48, borderRadius: 24 },
  fullWidthActionBtn: { width: "100%" },
  actionText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
});

export default EligibilityPayerRules;
