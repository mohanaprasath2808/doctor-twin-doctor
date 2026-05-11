import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import StatusDot from "../../../../../components/Common/StatusDot";
import AppButton from "../../../../../components/Common/AppButton";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import EcgPadIcon from "../../../../../assets/icon/ecgPadIcon.svg";
import RedWarningIcon from "../../../../../assets/icon/redWarningIcon.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";

const RECENT_ACTIVITY = ["Lab test Feb 24", "Message Apr 8"];

const PatientSummary = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Patient Summary</Text>
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

        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.patientInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.patientImage} />
            <View style={styles.patientTextWrap}>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Visit Reason</Text>
          <View style={styles.iconRow}>
            <InnerShadowIcon icon={<EcgPadIcon width={18} height={18} />} size={40} />
            <Text style={styles.rowTitle}>Routine check-up</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.activityOuter}
            contentStyle={styles.activityInner}
          >
            {RECENT_ACTIVITY.map((activity) => (
              <View key={activity} style={styles.activityRow}>
                <StatusDot
                  color={COLORS.TEXT_60}
                  size={8}
                  outerGradientColors={[COLORS.LIGHT_SHADOW, COLORS.DARK_SHADOW]}
                />
                <Text style={styles.activityText}>{activity}</Text>
              </View>
            ))}
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <View style={styles.iconRow}>
            <InnerShadowIcon
              icon={<RedWarningIcon width={18} height={18} />}
              size={40}
              backgroundColor="#FFE9E9"
              darkShadowColor="#F0C7C7"
              shadowColor="#F0C7C7"
            />
            <Text style={styles.rowTitle}>Hypertension (uncontrolled)</Text>
          </View>
        </NeumorphicCard>

        <View style={styles.footer}>
          <AppButton
            text="Open Full Chart"
            width="48%"
            height={50}
            borderRadius={25}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.openChartText}
            shadowStyle={styles.buttonShadow}
          />
          <ReusableButton
            title="Confirm Patient"
            width="48%"
            height={50}
            borderRadius={25}
            textStyle={styles.confirmText}
            onPress={() =>
              navigation.navigate(navigationStrings.RECEPTION_INTAKE_COMPLETED, {
                title: "Patient Confirmation Successfully!",
                buttonText: "Back to Intake",
                backRouteName: navigationStrings.RECEPTION_INTAKE,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientSummary;

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
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    paddingTop: 10,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarOverlay: {
    borderRadius: 90,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  listeningText: {
    marginTop: 8,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  cardOuter: {
    width: "100%",
    marginBottom: 18,
  },
  patientInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientTextWrap: {
    flex: 1,
    gap: 3,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  activityOuter: {
    width: "100%",
  },
  activityInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  activityText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  footer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  openChartText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  buttonShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
