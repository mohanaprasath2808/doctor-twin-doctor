import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import InsuranceIcon from "../../../assets/icons/insurance.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const ImmunizationRecord = () => {
  const navigation = useNavigation<any>();

  const rows = [
    { title: "COVID-19 Vaccine", subtitle: "Johnson & Johnson" },
    { title: "Tdap Vaccine", subtitle: "20 April 2025" },
    { title: "MMR Vaccine", subtitle: "20 April 2025" },
    { title: "Hepatitis B", subtitle: "Multiple doses" },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Immunization Record</Text>
            <View style={styles.notifWrap}>
              <IconComponent
                icon={<NotificationIcon width={18} height={18} />}
                width={40}
                height={40}
                radius={20}
                onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
              />
              <View style={styles.notifDot} />
            </View>
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.avatarWrap}
            wrapperStyle={styles.avatarWrapper}
            overlayStyle={styles.avatarOverlay}
            imageStyle={styles.avatar}
          />

          <Text style={styles.subGreeting}>Here&apos;s your immunization record.</Text>

          <View style={styles.cardsBlock}>
            {rows.map((row) => (
              <NeumorphicCard
                key={row.title}
                outerStyle={styles.cardOuter}
                innerStyle={styles.cardInner}
                borderRadius={10}
              >
                <InnerShadowIcon
                  icon={<InsuranceIcon width={18} height={18} />}
                  size={40}
                  radius={20}
                  surfaceColor={COLORS.INNER_SURFACE}
                />
                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>{row.title}</Text>
                  <Text style={styles.cardSubtitle}>{row.subtitle}</Text>
                </View>
              </NeumorphicCard>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            text="Export record"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.exportText}
            style={[styles.exportBtn, styles.exportBtnFooter]}
            onPress={() => undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImmunizationRecord;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 120 },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  avatarWrap: { alignItems: "center", marginTop: 20 },
  avatarWrapper: {
    width: 210,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatar: { width: 124, height: 124, borderRadius: 115, resizeMode: "contain" },
  subGreeting: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardsBlock: {
    flex: 1,
    marginTop: 18,
    gap: 12,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    minHeight: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  cardTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  exportBtn: {
    marginTop: 18,
    width: "100%",
    height: 48,
    borderRadius: 24,
  },
  exportBtnFooter: {
    marginTop: 0,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.SURFACE,
  },
  exportText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});
