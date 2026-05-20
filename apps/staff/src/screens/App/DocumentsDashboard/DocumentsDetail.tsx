import React, { useMemo } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import ShieldIcon from "../../../assets/icon/sheildIcon.svg";
import DummyReportImage from "../../../assets/image/tempImage/dummyReport.png";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import FormEditIcon from "../../../assets/icon/formEditIcon.svg";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const BG = COLORS.INNER_SURFACE;

const STATUS_BADGE = {
  bg: "#FFF8DB",
  text: "#D49A1E",
  dark: "#F2D790",
} as const;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_DETAIL>;

const DocumentsDetail = ({ route, navigation }: Props) => {
  const { item } = route.params;
  const showInsurance = Boolean(item.payerName && item.memberId);

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Document Detail</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {header}

        <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.blockInner}>
          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              <InnerShadowIcon icon={<FormEditIcon width={18} height={18} />} size={44} radius={22} />
              <View style={styles.statusTextWrap}>
                <Text style={styles.docTitle} numberOfLines={1}>
                  {item.documentTitle}
                </Text>
                <Text style={styles.dueLabel}>{item.dueLabel}</Text>
              </View>
            </View>
            <DeltaBadge
              value={item.statusLabel}
              height={26}
              radius={13}
              bgColor={STATUS_BADGE.bg}
              darkShadowColor={STATUS_BADGE.dark}
              lightShadowColor="#FFFFFF99"
              textColor={STATUS_BADGE.text}
              textStyle={styles.statusBadgeText}
            />
          </View>
        </NeumorphicCard>

        {showInsurance ? (
          <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.blockInner}>
            <Text style={styles.sectionLabel}>Insurance</Text>
            <View style={styles.row}>
              <InnerShadowIcon icon={<ShieldIcon width={18} height={18} />} size={44} radius={22} />
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowTextStrong}>{item.payerName}</Text>
                <Text style={styles.rowSubText}>Member ID: {item.memberId}</Text>
              </View>
            </View>
          </NeumorphicCard>
        ) : null}

        <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.blockInner}>
          <View style={styles.patientRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={40} containerSize={46} />
            <View style={styles.patientText}>
              <Text style={styles.rowTextStrong} numberOfLines={1}>
                {item.patientName}
              </Text>
              <Text style={styles.rowSubText}>{item.patientMeta}</Text>
            </View>
          </View>
        </NeumorphicCard>


        <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.documentCardInner}>
          <Text style={styles.documentSectionLabel}>Document</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            backgroundColor={COLORS.SURFACE}
            containerStyle={styles.previewOuter}
            contentStyle={styles.previewContent}
            darkShadowColor={"#C1D5EE"}
            lightShadowColor={"#FFFFFFE0"}
            fullWidth
          >
            <Image source={DummyReportImage} style={styles.previewImage} resizeMode="contain" />
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle="Dr.Twin suggest send this form within 48 hours to ensure the urgency"
            bgColor="#CBF0FF"
            subTitleStyle={styles.insightBody}
          />
        </View>

        <View style={styles.actionsGrid}>
          <View style={styles.actionsRow}>
            <AppButton
              text="Upload"
              width="48%"
              height={46}
              borderRadius={23}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.outlineBtnText}
              onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_UPLOAD, { item })}
            />
            <ReusableButton
              title="Send"
              height={46}
              borderRadius={23}
              width="48%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              textStyle={styles.sendBtnText}
              onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_SEND, { item })}
            />
          </View>
          <View style={styles.actionsRow}>
            <AppButton
              text="Assign"
              width="48%"
              height={46}
              borderRadius={23}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.outlineBtnText}
              onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_ASSIGN, { item })}
            />
            <AppButton
              text="Request"
              width="48%"
              height={46}
              borderRadius={23}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.outlineBtnText}
              onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_REQUEST_INFO, { item })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentsDetail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 10,
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
  headerSpacer: { width: 40, height: 40 },
  cardOuter: { width: "100%", marginTop: 14 },
  blockInner: { paddingHorizontal: 12, paddingVertical: 14 },
  documentCardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  statusTextWrap: { flex: 1, minWidth: 0, gap: 4 },
  docTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  dueLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  sectionLabel: {
    marginBottom: 10,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  documentSectionLabel: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowTextWrap: { flex: 1, minWidth: 0, gap: 3 },
  rowTextStrong: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  rowSubText: { fontSize: 12, color: COLORS.TEXT_60, fontFamily: "SF-Pro-Display-Regular" },
  patientRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  patientText: { flex: 1, minWidth: 0, gap: 3 },
  previewOuter: { width: "100%" },
  previewContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  previewImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  messageRow: { marginTop: 18, flexDirection: "row", alignItems: "flex-start", gap: 8 },
  insightBody: {
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 18,
  },
  actionsGrid: { marginTop: 40, gap: 12 },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  outlineBtnText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  sendBtnText: { fontSize: 15, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
});
