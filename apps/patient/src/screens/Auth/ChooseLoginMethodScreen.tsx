import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import FaceIdIcon from "../../assets/icons/faceId.svg";
import PinIcon from "../../assets/icons/pin.svg";
import MessageIcon from "../../assets/icons/message.svg";
import RightArrowIcon from "../../assets/icons/rightArrowIcon.svg";
import type { OtpVerificationFlow } from "../../constants/authNavigation";
import { StackActions, useNavigation } from "@react-navigation/native";

const DISPLAY_NAME = "Sarah";

const ICON_SIZE = 18;

const ChooseLoginMethodScreen = () => {
  const navigation = useNavigation<any>();

  const goToOtp = (flow: OtpVerificationFlow) => {
    navigation.dispatch(StackActions.push(navigationStrings.OTP_VERIFICATION, { flow }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>Welcome Back, {DISPLAY_NAME}</Text>
        <Text style={styles.subtitle}>Please sign in to your account.</Text>

        <View style={styles.cards}>
          <LoginMethodRow
            label="Face ID"
            icon={<FaceIdIcon width={ICON_SIZE} height={ICON_SIZE} />}
            onPress={() => goToOtp("faceId")}
          />
          <LoginMethodRow
            label="User PIN"
            icon={<PinIcon width={ICON_SIZE} height={ICON_SIZE} />}
            onPress={() => goToOtp("userPin")}
          />
          <LoginMethodRow
            label="Login with OTP"
            icon={<MessageIcon width={ICON_SIZE} height={ICON_SIZE} />}
            onPress={() => goToOtp("otpFromChooser")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type RowProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const LoginMethodRow: React.FC<RowProps> = ({ label, icon, onPress }) => (
  <NeumorphicCard
    outerStyle={styles.cardOuter}
    innerStyle={styles.cardInner}
    borderRadius={12}
    onPress={onPress}
    activeOpacity={0.88}
  >
    <InnerShadowIcon icon={icon} size={40} radius={20} />
    <Text style={styles.rowLabel}>{label}</Text>
    <RightArrowIcon width={10} height={10} />
  </NeumorphicCard>
);

export default ChooseLoginMethodScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: Platform.OS === "ios" ? 12 : 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 4,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayImage: {
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    textAlign: "center",
  },
  cards: {
    marginTop: 36,
    gap: 14,
  },
  cardOuter: {
    width: "100%",
    minHeight: 60,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 60,
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
});
