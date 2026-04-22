import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const PendingApprovals = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Pending Approvals</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
          <View style={styles.topRow}>
            <Image source={DoctorTempImage} style={styles.avatar} />
            <View style={styles.topTextWrap}>
              <Text style={styles.name}>Michelle Lewis</Text>
              <Text style={styles.meta}>Female • Age 45</Text>
              <Text style={styles.dueText}>Due Today 03:00 PM</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <NeumorphicInnerShadowCard
            borderRadius={100}
            containerStyle={styles.shadowTextOuter}
            contentStyle={styles.shadowTextInner}
            darkShadowColor="#C8CBCC99"
            lightShadowColor="#FFFFFFCC"
          >
            <Text style={styles.pillText}>Wellness Checkup</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
          <Text style={styles.sectionTitle}>Request Details</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.shadowTextOuter}
            contentStyle={styles.requestContent}
            darkShadowColor="#C8CBCC99"
            lightShadowColor="#FFFFFFCC"
          >
            <Text style={styles.requestText}>
              I summarize due need for hypothyridism medication schedules medication
            </Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard borderRadius={12} backgroundColor={COLORS.INNER_SURFACE} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>
          <View style={styles.insuranceRow}>
            <InnerShadowIcon
              size={38}
              icon={<MaterialCommunityIcons name="shield-check-outline" size={18} color={COLORS.PRIMARY} />}
            />
            <View style={styles.insuranceTextWrap}>
              <Text style={styles.insuranceTitle}>Blue Cross Blue</Text>
              <Text style={styles.memberId}>Member ID:BHHGJSJ9833</Text>
            </View>
            <DeltaBadge
              value="Active"
              height={28}
              radius={14}
              bgColor="#D3FFF1"
              darkShadowColor="#A9E9D5"
              lightShadowColor="#FFFFFFCC"
              textColor="#10B981"
              textStyle={styles.badgeText}
            />
          </View>
        </NeumorphicCard>
      </View>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <View style={styles.footerHalf}>
          <AppButton
            activeOpacity={0.85}
            width="100%"
            height={50}
            borderRadius={25}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor="#FDECEC"
            text="Deny"
            textStyle={styles.denyText}
            onPress={() => { }}
          />
        </View>
        <View style={styles.footerHalf}>
          <ReusableButton
            title="Approve"
            height={50}
            borderRadius={25}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            onPress={() => { }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PendingApprovals;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { marginBottom: 16 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 12 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  topTextWrap: { flex: 1, minWidth: 0 },
  name: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  meta: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_70 },
  dueText: { marginTop: 3, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.TEXT_20, marginVertical: 12 },
  shadowTextOuter: { alignSelf: "flex-start" },
  shadowTextInner: { paddingHorizontal: 14, paddingVertical: 8 },
  pillText: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  sectionTitle: { fontSize: 16, fontWeight: "500", color: COLORS.TEXT_DARK, marginBottom: 10 },
  requestContent: { minHeight: 54, paddingHorizontal: 12, paddingVertical: 10, justifyContent: "center" },
  requestText: { fontSize: 14, fontWeight: "400", color: COLORS.TEXT_70 },
  insuranceRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  insuranceTextWrap: { flex: 1, minWidth: 0 },
  insuranceTitle: { fontSize: 14, fontWeight: "500", color: COLORS.TEXT_DARK },
  memberId: { marginTop: 2, fontSize: 12, fontWeight: "400", color: COLORS.TEXT_60 },
  badgeText: { fontSize: 12, fontWeight: "500" },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    gap: 12,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerHalf: { flex: 1, minWidth: 0 },
  denyText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
});
