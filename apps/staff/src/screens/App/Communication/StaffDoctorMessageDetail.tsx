import React, { useCallback } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const STATIC_NAME = "Seffesa";
const STATIC_ROLE = "MA";
const STATIC_SUBTEXT = "Patient passes";
const STATIC_WHEN = "Now";
const STATIC_MESSAGE = "Could you clarify the dosage for Ganesh Kumar's insulin?";

const StaffDoctorMessageDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + 12;
  const noop = useCallback(() => {}, []);

  const openReply = useCallback(() => {
    navigation.navigate(navigationStrings.STAFF_DOCTOR_REPLY);
  }, [navigation]);

  const openConvertToTask = useCallback(() => {
    navigation.navigate(navigationStrings.STAFF_DOCTOR_CONVERT_TO_TASK);
  }, [navigation]);

  const openEscalate = useCallback(() => {
    navigation.navigate(navigationStrings.STAFF_DOCTOR_ESCALATE);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>{STATIC_NAME}</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.sectionInner}
          >
            <View style={styles.senderRow}>
              <Image source={DoctorTempImage} style={styles.avatar} />
              <View style={styles.senderTextWrap}>
                <Text style={styles.senderName}>
                  {STATIC_NAME} <Text style={styles.roleText}>({STATIC_ROLE})</Text>
                </Text>
                <Text style={styles.subText}>{STATIC_SUBTEXT}</Text>
              </View>
              <Text style={styles.whenText}>{STATIC_WHEN}</Text>
            </View>
          </NeumorphicCard>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={[styles.sectionOuter, { marginTop: 6 }]}
            innerStyle={styles.sectionInner}
          >
            <Text style={styles.sectionTitle}>Message</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.messageShadowOuter}
              contentStyle={styles.messageShadowInner}
              darkShadowColor="#C8CBCC99"
              lightShadowColor="#FFFFFFCC"
            >
              <Text style={styles.messageText}>{STATIC_MESSAGE}</Text>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text="Reply"
                textStyle={styles.outlineBtnText}
                onPress={openReply}
              />
            </View>
            <View style={styles.footerHalf}>
              <ReusableButton
                title="Approve"
                height={48}
                borderRadius={24}
                width="100%"
                gradientColors={["#A7F3D0", "#166534"]}
                backgroundColor={COLORS.PRIMARY}
                onPress={noop}
                textStyle={styles.approveBtnText}
              />
            </View>
          </View>
          <View style={styles.footerRow}>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text="Convert to Task"
                textStyle={styles.outlineBtnText}
                onPress={openConvertToTask}
              />
            </View>
            <View style={styles.footerHalf}>
              <AppButton
                activeOpacity={0.85}
                width="100%"
                height={48}
                borderRadius={24}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text="Escalate"
                textStyle={styles.outlineBtnText}
                onPress={openEscalate}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StaffDoctorMessageDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  sectionOuter: {
    width: "100%",
    marginBottom: 16,
    marginTop: 16,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 44,
    borderRadius: 20,
    resizeMode: "cover",
  },
  senderTextWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Medium",
  },
  subText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  whenText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 10,
  },
  messageShadowOuter: {
    width: "100%",
  },
  messageShadowInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 18,
  },
  footerRow: {
    flexDirection: "row",
    gap: 10,
  },
  footerHalf: {
    flex: 1,
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  approveBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
