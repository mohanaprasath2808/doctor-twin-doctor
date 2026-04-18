import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import DeltaBadge from "../../../../components/Common/DeltaBadge";
import CardIcon from "../../../../assets/icon/cardIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import ShieldIcon from "../../../../assets/icon/shieldIcon.svg";
import TickIcon from "../../../../assets/icon/tickIcon.svg";
import ReportIcon from "../../../../assets/icon/listIcon.svg";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import FakeID from "../../../../assets/image/tempImage/fakeID.png";
import InnerShadowContainer from "../../../../neomorphism/InnerShadowContainer";

const PatientVerification = () => {
  const navigation = useNavigation<any>();
  const [hipaaConsent, setHipaaConsent] = useState(true);
  const [treatmentConsent, setTreatmentConsent] = useState(true);
  const [financialAgreement, setFinancialAgreement] = useState(true);

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
          <Text style={styles.headerTitle}>Patient Verification</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          wrapperStyle={styles.avatarWrapper}
          imageStyle={styles.avatarImage}
        />
        <Text style={styles.verifiedText}>Verified</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <View style={styles.idTopRow}>
            <Text style={styles.idTitle}>ID Verification</Text>
            <DeltaBadge
              icon={null}
              value="ID Captured"
              bgColor={COLORS.SUCCESS}
              darkShadowColor="#A9E9D5"
              lightShadowColor="#FFFFFF"
              textColor="#10B981"
              height={20}
              width={84}
              radius={114}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <InnerShadowContainer width={"100%"} borderRadius={10} height={234} color="#F7FBFF" darkShadowDx={2} darkShadowDy={2} darkShadowBlur={3} darkShadowColor="#C8CBCC99" lightShadowDx={-2} lightShadowDy={-2} lightShadowBlur={3} lightShadowColor="#FFFFFFCC" contentStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}>
              <Image source={FakeID} style={styles.idImage} />
            </InnerShadowContainer>
          </View>

          <NeumorphicCard outerStyle={styles.idCaptureCardOuter} innerStyle={styles.idCaptureCardInner} borderRadius={10}>
            <TouchableOpacity activeOpacity={0.8} style={styles.idCaptureRow}>
              <View style={styles.rowLeft}>
                <InnerShadowIcon icon={<CardIcon width={18} height={18} />} size={40} />
                <Text style={styles.rowLabel}>ID Capture</Text>
              </View>
              <RightArrowIcon width={10} height={10} />
            </TouchableOpacity>
          </NeumorphicCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Insurance Verification</Text>
          <View style={styles.insuranceRow}>
            <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
              <InnerShadowIcon icon={<ShieldIcon width={18} height={18} />} size={40} />
              <View style={styles.insuranceTextWrap}>
                <Text style={styles.insuranceName}>Blue Cross Blue</Text>
                <Text style={styles.insuranceSub}>Nathan Adams</Text>
                <Text style={styles.insuranceSub}>Member ID: BHHG JSJ.9833</Text>
                <Text style={styles.insuranceSub}>Plan ID:7363</Text>
              </View>
            </View>
            <DeltaBadge
              icon={null}
              value="Active"
              bgColor={COLORS.SUCCESS}
              darkShadowColor="#A9E9D5"
              lightShadowColor="#FFFFFF"
              textColor="#10B981"
              height={20}
              width={53}
              radius={114}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Consent Agreements</Text>
          <View style={{ height: 20 }} />

          <ConsentRow title="HIPAA Privacy Consent" subTitle="Signed 04/02/2024 10:32 PM" value={hipaaConsent} onValueChange={setHipaaConsent} />
          <View style={styles.divider} />
          <ConsentRow title="Consent to Treatment" subTitle="Signed 04/02/2024 10:32 PM" value={treatmentConsent} onValueChange={setTreatmentConsent} />
          <View style={styles.divider} />
          <ConsentRow title="Financial Agreement" subTitle="Signed 04/02/2024 10:32 PM" value={financialAgreement} onValueChange={setFinancialAgreement} />
          <View style={styles.divider} />
          <TouchableOpacity activeOpacity={0.8} style={styles.intakeRow}>
            <View style={styles.rowLeft}>
              <InnerShadowIcon icon={<ReportIcon width={18} height={18} />} size={40} />
              <Text style={styles.rowLabel}>Intake Forms</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </TouchableOpacity>
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Upload Insurance"
            textStyle={styles.outlineBtnText}
            onPress={() => { }}
          />
          <ReusableButton title="Capture ID" containerStyle={styles.actionBtn} onPress={() => { }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ConsentRow = ({
  title,
  subTitle,
  value,
  onValueChange,
}: {
  title: string;
  subTitle: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
}) => (
  <View style={styles.consentRow}>
    <View style={styles.rowLeft}>
      <InnerShadowIcon icon={<TickIcon width={18} height={18} />} size={40} />
      <View>
        <Text style={styles.rowLabel}>{title}</Text>
        <Text style={styles.rowSubLabel}>{subTitle}</Text>
      </View>
    </View>
    <NeumorphicSwitch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { marginTop: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "600" },
  headerSpacer: { width: 40, height: 40 },
  avatarWrapper: { width: 170, height: 170, marginTop: 20 },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  verifiedText: { marginTop: 0, textAlign: "center", color: COLORS.TEXT_DARK, fontSize: 20, fontWeight: "500" },
  sectionTitle: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  cardOuter: { marginTop: 30 },
  cardInner: { borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  idTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  idTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  idImage: { width: "100%", height: "100%", borderRadius: 10, resizeMode: "cover" },
  idCaptureCardOuter: { marginTop: 12 },
  idCaptureCardInner: { borderRadius: 10, padding: 10 },
  idCaptureRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  rowLabel: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  rowSubLabel: { color: COLORS.TEXT_70, fontSize: 12, fontWeight: "400", marginTop: 1 },
  insuranceRow: { flexDirection: "row", marginTop: 20, alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  insuranceTextWrap: { flex: 1 },
  insuranceName: { color: COLORS.TEXT_DARK, fontSize: 18, fontWeight: "500" },
  insuranceSub: { color: COLORS.TEXT_80, fontSize: 12, fontWeight: "400", marginTop: 2 },
  consentRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10, marginVertical: 14 },
  intakeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  actionRow: { marginTop: 30, flexDirection: "row", gap: 12 },
  actionBtn: { flex: 1, height: 48, borderRadius: 24 },
  outlineBtnText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: "500" },
});

export default PatientVerification;
