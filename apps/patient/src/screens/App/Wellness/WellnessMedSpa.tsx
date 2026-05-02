import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../neomorphism/IconComponent";
import NeumorphicQuickActionTile from "../../../components/Common/NeumorphicQuickActionTile";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import WellnessIcon from "../../../assets/icons/lotus.svg";
import GlucoseIcon from "../../../assets/icons/glucose.svg";
import DoctorIcon from "../../../assets/icons/semiGirlIcon.svg";
import DiamondIcon from "../../../assets/icons/diamond.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const WellnessMedSpa = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Wellness & MedSpa</Text>
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

        <Text style={styles.heading}>Hi Sarah, welcome to our wellness services</Text>
        <Text style={styles.subHeading}>How can we make you feel great today?</Text>

        <View style={styles.quickActionsRow}>
          <NeumorphicQuickActionTile
            onPress={() => navigation.navigate(navigationStrings.TREATMENT_MENU)}
            icon={<WellnessIcon width={34} height={34} />}
            label="MedSpa"
            containerStyle={styles.quickActionTile}
            outerDiameter={94}
            innerShadowDiameter={76}
          />
          <NeumorphicQuickActionTile
            onPress={() => { }}
            icon={<GlucoseIcon width={34} height={34} />}
            label="IV Hydration"
            containerStyle={styles.quickActionTile}
            outerDiameter={94}
            innerShadowDiameter={76}
          />
          <NeumorphicQuickActionTile
            onPress={() => navigation.navigate(navigationStrings.BEFORE_AFTER_GALLERY)}
            icon={<DoctorIcon width={34} height={34} />}
            label="Before & After Gallery"
            containerStyle={styles.quickActionTile}
            outerDiameter={94}
            innerShadowDiameter={76}
          />
        </View>

        <NeumorphicCard
          outerStyle={styles.membershipOuter}
          innerStyle={styles.membershipInner}
          borderRadius={10}
          onPress={() => navigation.navigate(navigationStrings.MEMBERSHIP)}
        >
          <InnerShadowIcon icon={<DiamondIcon width={20} height={20} />} size={40} radius={114} />
          <Text style={styles.membershipText}>Membership</Text>
          <View style={styles.arrowWrap}>
            <RightArrowIcon width={10} height={10} />
          </View>
        </NeumorphicCard>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
    marginTop: 12,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    resizeMode: "cover",
  },
  heading: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  subHeading: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  quickActionsRow: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionTile: {
    width: "33.33%",
  },
  membershipOuter: {
    marginTop: 18,
    width: "100%",
  },
  membershipInner: {
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  membershipText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  arrowWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
});

export default WellnessMedSpa;
