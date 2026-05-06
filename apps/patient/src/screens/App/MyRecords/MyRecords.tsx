import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import LabClipboardIcon from "../../../assets/icons/labClipboard.svg";
import WarningTealIcon from "../../../assets/icons/warningTeal.svg";
import InsuranceIcon from "../../../assets/icons/insurance.svg";
import ReferralIcon from "../../../assets/icons/referral.svg";
import MyRecordsIcon from "../../../assets/icons/myRecords.svg";
import DownloadIcon from "../../../assets/icons/downloadIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const MyRecords = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
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
          <Text style={styles.headerTitle}>My Records</Text>
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

        <Text style={styles.greeting}>Hi Sarah,</Text>
        <Text style={styles.subGreeting}>
          here are your medical records.{"\n"}How can I assist you today?
        </Text>

        <View style={styles.cardsBlock}>
          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.PROBLEM_LIST)}
          >
            <InnerShadowIcon
              icon={<LabClipboardIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Problem List</Text>
              <Text style={styles.cardSubtitle}>Hypertension, Allergies</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.ALLERGIES)}
          >
            <InnerShadowIcon
              icon={<WarningTealIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Allergies</Text>
              <Text style={styles.cardSubtitle}>Penicillin, Peanuts</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.IMMUNIZATION_RECORD)}
          >
            <InnerShadowIcon
              icon={<InsuranceIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Immunizations</Text>
            </View>
            <DeltaBadge
              value="Up to Date"
              bgColor="#FFF6D9"
              darkShadowColor="rgba(214, 173, 61, 0.35)"
              textColor="#D6AD3D"
              height={24}
            />
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.FORMS_LIBRARY)}
          >
            <InnerShadowIcon
              icon={<ReferralIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Forms Library</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.PRACTICE_DOCUMENTS)}
          >
            <InnerShadowIcon
              icon={<MyRecordsIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Practice Documents</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.UPLOAD_CENTER)}
          >
            <InnerShadowIcon
              icon={<DownloadIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>Upload Center</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </View>

        <AppButton
          text="Export"
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.exportText}
          style={styles.exportBtn}
          onPress={() => undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRecords;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
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
  greeting: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  subGreeting: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  cardsBlock: {
    marginTop: 18,
  },
  cardOuter: {
    width: "100%",
  },
  cardGap: {
    marginTop: 12,
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
  exportText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});
