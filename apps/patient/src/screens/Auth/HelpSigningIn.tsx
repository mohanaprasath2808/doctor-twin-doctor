import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import ForgotPasswordIcon from "../../assets/icons/forgotPassword.svg";
import PrivacyIcon from "../../assets/icons/privacy.svg";
import ContactSupportIcon from "../../assets/icons/contactSupport.svg";

const HelpRow = ({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress?: () => void;
}) => (
  <TouchableOpacity activeOpacity={0.85} style={styles.helpRow} onPress={onPress}>
    <View style={styles.leftWrap}>
      <View style={styles.iconWrap}>
        <View style={styles.iconInnerShadow}>
          <InnerShadowView width={40} height={40} borderRadius={20} color="#F7FBFF" />
        </View>
        {icon}
      </View>
      <View>
        <Text style={styles.rowTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const HelpSigningIn = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.heading}>Having trouble logging in?</Text>

        <View style={styles.mainCard}>
            <HelpRow
              title="Forgot Password?"
              subtitle="Reset it in a few steps"
              icon={<ForgotPasswordIcon width={20} height={20} />}
              onPress={() => navigation.navigate(navigationStrings.FORGOT_PASSWORD)}
            />
          <View style={styles.divider} />
          <HelpRow
            title="Trouble with Face ID or PIN?"
            subtitle="Privacy & Security Help"
            icon={<PrivacyIcon width={20} height={20} />}
            onPress={() => {}}
          />
        </View>

        <View style={styles.supportCard}>
          <HelpRow title="Contact Support" icon={<ContactSupportIcon width={20} height={20} />} />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.backButton}
        onPress={() => navigation.navigate(navigationStrings.LOGIN)}
      >
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 10,
  },
  avatarContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 10 : 20,
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
  heading: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 0.22,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "600",
  },
  mainCard: {
    marginTop: 20,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 10,
    paddingVertical: 6,
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  supportCard: {
    marginTop: 14,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 10,
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  helpRow: {
    height: 66,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconInnerShadow: {
    position: "absolute",
  },
  rowTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  rowSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  chevron: {
    fontSize: 24,
    lineHeight: 24,
    color: COLORS.TEXT_PRIMARY_50,
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 30,
    height: 48,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
});

export default HelpSigningIn;
