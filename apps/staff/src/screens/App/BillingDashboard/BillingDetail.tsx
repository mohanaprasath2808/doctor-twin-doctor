import React, { useMemo } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import ShieldIcon from "../../../assets/icon/sheildIcon.svg";
import ClaimIssueIcon from "../../../assets/icon/redWarningIcon.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.BILLING_DETAIL>;

const BG = COLORS.INNER_SURFACE;

const BillingDetail = ({ route, navigation }: Props) => {
  const item = route.params.item;

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
        <Text style={styles.headerTitle}>Billing Detail</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {header}

        <PatientDetailCard item={item} outerStyle={styles.cardOuter} innerStyle={styles.cardInner} />

        <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.blockInner}>
          <Text style={styles.sectionTitle}>Issue</Text>
          <View style={styles.row}>
            <InnerShadowIcon icon={<ClaimIssueIcon width={18} height={18} />} size={44} radius={22} />
            <Text style={styles.rowText}>{item.issue}</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.blockInner}>
          <Text style={styles.sectionTitle}>Insurance</Text>
          <View style={styles.row}>
            <InnerShadowIcon icon={<ShieldIcon width={18} height={18} />} size={44} radius={22} />
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTextStrong}>{item.payerName}</Text>
              <Text style={styles.rowSubText}>Member ID: {item.memberId}</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard borderRadius={14} backgroundColor={BG} outerStyle={styles.cardOuter} innerStyle={styles.blockInner}>
          <Text style={styles.sectionTitle}>Assign to</Text>
          <View style={styles.assignRow}>
            <Image source={DoctorTempImage} style={styles.assignAvatar} />
            <View style={styles.assignText}>
              <Text style={styles.rowTextStrong}>Rebaccca K</Text>
              <Text style={styles.rowSubText}>Nurse</Text>
            </View>
          </View>
        </NeumorphicCard>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle="Dr.Twin suggest that reimbursement was denied due to lack of documented pain assessment."
            bgColor="#CBF0FF"
            subTitleStyle={styles.insightBody}
          />
        </View>

        <View style={styles.actionsRow}>
          <AppButton
            text="Forward"
            width="48%"
            height={46}
            borderRadius={23}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.BILLING_FORWARD, { item })}
          />
          <AppButton
            text="Create Ticket"
            width="48%"
            height={46}
            borderRadius={23}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.BILLING_CREATE_TICKET, { item })}
          />
        </View>

        <ReusableButton
          title="Answer"
          height={52}
          borderRadius={26}
          containerStyle={styles.answerBtn}
          textStyle={styles.answerText}
          onPress={() => navigation.navigate(navigationStrings.BILLING_ANSWER, { item })}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingDetail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
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
  cardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  blockInner: { paddingHorizontal: 12, paddingVertical: 14 },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowText: { flex: 1, color: COLORS.TEXT_DARK, fontFamily: "SF-Pro-Display-Regular" },
  rowTextWrap: { flex: 1, minWidth: 0, gap: 3 },
  rowTextStrong: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  rowSubText: { fontSize: 12, color: COLORS.TEXT_60, fontFamily: "SF-Pro-Display-Regular" },
  assignRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  assignAvatar: { width: 40, height: 40, borderRadius: 20 },
  assignText: { flex: 1, minWidth: 0, gap: 3 },
  messageRow: { marginTop: 18, flexDirection: "row", alignItems: "flex-start", gap: 8 },
  insightBody: {
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 18,
  },
  actionsRow: { marginTop: 18, flexDirection: "row", justifyContent: "space-between", gap: 12 },
  outlineBtnText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  answerBtn: { marginTop: 18 },
  answerText: { fontSize: 16, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
});

