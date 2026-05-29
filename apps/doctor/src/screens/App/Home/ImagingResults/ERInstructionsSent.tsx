import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import { COLORS } from "../../../../constants/theme";
import { openPhoneDialer } from "../../../../constants/contant";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import { URGENT_VISIT_NOTIFICATIONS } from "./imagingAssignmentTypes";
import ImagingNotificationSection from "./ImagingNotificationSection";

const PATIENT_PHONE = "+15551234567";

const ERInstructionsSent = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>ER Instructions sent</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>ER Instructions Sent</Text>
        <Text style={styles.subTitle}>
          ER Instructions were sent to Sarah Willaims
        </Text>

        <NeumorphicCard
          outerStyle={styles.recommendationOuter}
          innerStyle={styles.recommendationInner}
          borderRadius={14}
        >
          <Text style={styles.recommendationText}>
            Recommend immediate evaluation for possible stroke/TIA
          </Text>
          <Text style={styles.referenceLog}>
            Retrieve log GGH78292 23 Apr 2025 03:11 PM
          </Text>
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Call Patient"
            textStyle={styles.outlineBtnText}
            onPress={() => openPhoneDialer(PATIENT_PHONE)}
          />
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Message"
            textStyle={styles.outlineBtnText}
            onPress={() => {}}
          />
        </View>

        <ImagingNotificationSection items={URGENT_VISIT_NOTIFICATIONS} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ERInstructionsSent;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  avatarWrap: { alignItems: "center", marginTop: 8 },
  avatarWrapper: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatarImage: { width: 110, height: 110, borderRadius: 55, resizeMode: "contain" },
  title: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  subTitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  recommendationOuter: { width: "100%", marginTop: 20 },
  recommendationInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  recommendationText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Medium",
  },
  referenceLog: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  actionsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  actionBtnBase: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    minWidth: 0,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
});
