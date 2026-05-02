import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicQuickActionTile from "../../components/Common/NeumorphicQuickActionTile";
import IconComponent from "../../neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../constants/theme";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import AmbulanceIcon from "../../assets/icons/ambulanceIcon.svg";
import PhoneIcon from "../../assets/icons/callingPhone.svg";
import SkeletonWarningIcon from "../../assets/icons/skeletonWarning.svg";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/warningTempImg.png";

const EmergencySafety = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Emergency / Safety</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.warningTitle}>WARNING</Text>
        <Text style={styles.warningSubtitle}>If you have a medical emergency,{"\n"}call 911 or go to the ER immediately.</Text>

        <View style={styles.quickActionsRow}>
          <NeumorphicQuickActionTile
            onPress={() => { }}
            icon={<AmbulanceIcon width={30} height={30} />}
            label="Call 911"
            containerStyle={styles.quickTile}
            outerDiameter={96}
            innerShadowDiameter={78}
            innerShadowColor="#FDECEC"
          />
          <NeumorphicQuickActionTile
            onPress={() => { }}
            icon={<PhoneIcon width={30} height={30} />}
            label="Call Clinic"
            containerStyle={styles.quickTile}
            outerDiameter={96}
            innerShadowDiameter={78}
          />
          <NeumorphicQuickActionTile
            onPress={() => { }}
            icon={<SkeletonWarningIcon width={30} height={30} />}
            label="Poison Control"
            containerStyle={styles.quickTile}
            outerDiameter={96}
            innerShadowDiameter={78}
          />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>After Hours Instructions</Text>
          <NeumorphicInnerShadowCard borderRadius={10} containerStyle={styles.insetOuter} contentStyle={styles.insetInner}>
            <Text style={styles.instructionsText}>If clinic is closed, visit nearest ER.</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 20 },
  header: {
    marginTop: Platform.OS === "ios" ? 0 : 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  warningIconWrap: { alignItems: "center", marginTop: 12 },
  warningTitle: { marginTop: 6, textAlign: "center", fontSize: 16, fontWeight: "500", color: COLORS.TEXT_PRIMARY },
  warningSubtitle: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    lineHeight: 23,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 30,
  },
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
    borderRadius: 115,
  },
  avatarImage: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 115,
  },
  quickActionsRow: { marginTop: 30, flexDirection: "row", justifyContent: "space-between" },
  quickTile: { width: "33.33%" },
  cardOuter: { marginTop: 30, width: "100%" },
  cardInner: { paddingVertical: 12, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 17, fontWeight: "500", color: COLORS.TEXT_PRIMARY },
  insetOuter: { marginTop: 10 },
  insetInner: { paddingVertical: 10, paddingHorizontal: 10 },
  instructionsField: { marginTop: 0 },
  instructionsText: { fontSize: 14, fontWeight: "400", color: COLORS.TEXT_PRIMARY_70 },
});

export default EmergencySafety;
