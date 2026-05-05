import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import { useAuthStore } from "../../store/useAuthStore";
import IconComponent from "../../neomorphism/IconComponent";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import BackIcon from "../../assets/icon/backArrow.svg";
import WarningIcon from "../../assets/icon/warningIcon.svg";
import AppointmentCalendarIcon from "../../assets/icon/appointmentCalendarIcon.svg";
import RightArrowIcon from "../../assets/icon/rightArrow.svg";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import navigationStrings from "../../constants/navigationStrings";

const LAB_ALERTS = [
  {
    id: "critical-potassium",
    title: "Critically high potassium",
    subTitle: "Immediate attention needed for Sarah Williams",
  },
  {
    id: "dangerous-lab",
    title: "Dangerous Lab Result",
    subTitle: "For David Johnson",
  },
  {
    id: "neuro-symptom",
    title: "Possible neurological sympsiom",
    subTitle: "Dizzy nembiode reported by John Martiz",
  },
];

const EmergencyAccess = () => {
  const navigation = useNavigation<any>();
  const setIsLogin = useAuthStore((s) => s.setIsLogin);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={22} height={22} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Emergency Access</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.imageContainer}
        wrapperStyle={styles.wrapper}
        overlayStyle={styles.overlayImage}
        imageStyle={styles.image}
      />

      <Text style={styles.welcomeText}>Welcome Back Dr.Twin</Text>

      <NeumorphicCard
        outerStyle={styles.noticeOuter}
        innerStyle={styles.noticeInner}
        borderRadius={12}
      >
        <View style={styles.row}>
          <InnerShadowIcon icon={<WarningIcon width={16} height={16} />} size={40} radius={20} />
          <Text style={styles.noticeText}>This is a private, HIPAA-compliant environment</Text>
        </View>
      </NeumorphicCard>

      <View style={styles.alertList}>
        {LAB_ALERTS.map((alert) => (
          <NeumorphicCard
            key={alert.id}
            outerStyle={styles.alertOuter}
            innerStyle={styles.alertInner}
            borderRadius={12}
          >
            <View style={styles.row}>
              <InnerShadowIcon
                icon={<AppointmentCalendarIcon width={18} height={18} />}
                size={40}
                radius={20}
              />
              <View style={styles.alertTextWrap}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertSubTitle}>{alert.subTitle}</Text>
              </View>
            </View>
          </NeumorphicCard>
        ))}
      </View>

      <Pressable
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: navigationStrings.SECURE_LOGIN }],
          });
        }}
      >
        <NeumorphicCard
          outerStyle={styles.continueOuter}
          innerStyle={styles.continueInner}
          borderRadius={12}
        >
          <View style={styles.continueRow}>
            <View style={styles.row}>
              <InnerShadowIcon
                icon={<AppointmentCalendarIcon width={18} height={18} />}
                size={40}
                radius={20}
              />
              <Text style={styles.continueText}>Continue to full login</Text>
            </View>
            <View style={styles.arrowContainer}>
              <RightArrowIcon width={10} height={10} />
            </View>
          </View>
        </NeumorphicCard>
      </Pressable>

      <Text style={styles.footerHint}>Recommend it using regularly</Text>
    </SafeAreaView>
  );
};

export default EmergencyAccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
  imageContainer: {
    marginTop: 24,
  },
  wrapper: {
    width: 190,
    height: 190,
  },
  overlayImage: {
    borderRadius: 94,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 55,
  },
  welcomeText: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "600",
  },
  noticeOuter: {
    marginTop: 30,
  },
  noticeInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noticeText: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
  },
  alertList: {
    marginTop: 18,
    gap: 14,
  },
  alertOuter: {
    width: "100%",
  },
  alertInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  alertTextWrap: {
    flex: 1,
  },
  alertTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  alertSubTitle: {
    marginTop: 2,
    color: COLORS.TEXT_60,
    fontSize: 12,
    fontWeight: "400",
  },
  continueOuter: {
    marginTop: 18,
  },
  continueInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  continueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  footerHint: {
    marginTop: 74,
    marginBottom: 8,
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
  },
  arrowContainer: {
    paddingRight: 7,
  },
});
