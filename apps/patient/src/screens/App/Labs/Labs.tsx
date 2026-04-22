import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import BottomNavbar from "../../../components/App/BottomNavbar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicQuickActionTile from "../../../components/Common/NeumorphicQuickActionTile";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicCircle from "../../../neomorphism/NeumorphicCircle";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import LabResultsIcon from "../../../assets/icons/labResults.svg";
import LabClipboardIcon from "../../../assets/icons/checkedListPadIcon.svg";
import TrendsChartIcon from "../../../assets/icons/trendGraphIcon.svg";
import PremiumCrownIcon from "../../../assets/icons/crownIcon.svg";
import MedicationsIcon from "../../../assets/icons/medications.svg";
import PharmacyIcon from "../../../assets/icons/pharmacyIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const Labs = () => {
  const navigation = useNavigation<any>();

  const trendsCrown = (
    <NeumorphicCircle size={24} backgroundColor={COLORS.SECONDARY}>
      <PremiumCrownIcon width={14} height={14} />
    </NeumorphicCircle>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
          <Text style={styles.headerTitle}>Labs</Text>
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
        <Text style={styles.subGreeting}>how can I assist you with medications?</Text>

        <View style={styles.mainActionsRow}>
          <NeumorphicQuickActionTile
            containerStyle={styles.labMainTile}
            outerDiameter={110}
            innerShadowDiameter={90}
            icon={<LabResultsIcon width={44} height={44} />}
            onPress={() => navigation.navigate(navigationStrings.LAB_REQUEST)}
            label="Lab Requests"
            labelStyle={styles.labMainTileLabel}
          />
          <NeumorphicQuickActionTile
            containerStyle={styles.labMainTile}
            onPress={() => navigation.navigate(navigationStrings.LAB_RESULTS)}
            outerDiameter={110}
            innerShadowDiameter={90}
            icon={<LabClipboardIcon width={28} height={30} />}
            label="Lab Results"
            labelStyle={styles.labMainTileLabel}
          />
          <NeumorphicQuickActionTile
            containerStyle={styles.labMainTile}
            onPress={() => { }}
            outerDiameter={110}
            innerShadowDiameter={90}
            icon={<TrendsChartIcon width={32} height={32} />}
            label="Trends"
            topRightAccessory={trendsCrown}
            labelStyle={styles.labMainTileLabel}
          />
        </View>

        <View style={styles.secondaryRow}>
          <NeumorphicCard
            outerStyle={styles.halfCardOuter}
            innerStyle={styles.halfCardInner}
            borderRadius={10}
            activeOpacity={0.88}
          >
            <InnerShadowIcon icon={<LabResultsIcon width={18} height={18} />} size={40} radius={114} />
            <Text style={styles.halfCardTitle}>Request Test</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
          <NeumorphicCard
            outerStyle={styles.halfCardOuter}
            innerStyle={styles.halfCardInner}
            borderRadius={10}
            onPress={() => undefined}
            activeOpacity={0.88}
          >
            <InnerShadowIcon icon={<MedicationsIcon width={18} height={18} />} size={40} radius={114} />
            <Text style={styles.halfCardTitle}>Request Refill</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </View>

        <NeumorphicCard outerStyle={styles.pharmacyOuter} innerStyle={styles.pharmacyInner} borderRadius={10}>
          <View style={styles.pharmacyLeft}>
            <InnerShadowIcon icon={<PharmacyIcon width={18} height={18} />} size={40} radius={114} />
            <View style={styles.pharmacyTextCol}>
              <Text style={styles.pharmacyName}>CVS Pharmacy</Text>
              <Text style={styles.pharmacySub}>Torrance Crossroads</Text>
            </View>
          </View>
          <AppButton
            activeOpacity={0.85}
            style={styles.changeBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Change"
            textStyle={styles.changeBtnText}
            onPress={() => undefined}
          />
        </NeumorphicCard>
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
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
  avatarWrap: {
    alignItems: "center",
    marginTop: 30,
  },
  avatarWrapper: {
    width: 240,
    height: 240,
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 115,
    resizeMode: "contain",
  },
  greeting: {
    marginTop: 16,
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
    paddingHorizontal: 12,
  },
  mainActionsRow: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 17,
  },
  labMainTile: {
    flex: 1,
    minWidth: 0,
    marginBottom: 0,
  },
  labMainTileLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  secondaryRow: {
    marginTop: 30,
    flexDirection: "row",
    gap: 10,
  },
  halfCardOuter: {
    flex: 1,
    minWidth: 0,
  },
  halfCardInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  halfCardTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  pharmacyOuter: {
    marginTop: 20,
    width: "100%",
  },
  pharmacyInner: {
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pharmacyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  pharmacyTextCol: {
    flex: 1,
    minWidth: 0,
  },
  pharmacyName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  pharmacySub: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  changeBtn: {
    width: 65,
    height: 28,
    borderRadius: 17,
  },
  changeBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default Labs;
