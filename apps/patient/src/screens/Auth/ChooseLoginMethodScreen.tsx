import React, { useCallback, useContext, useMemo } from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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
import type { OtpVerificationFlow } from "../../types/authRoute";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../../context/AuthContext";
import { Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { getOnboardingCompleted } from "../../utils/authStorage";

const ICON_SIZE = 18;

const ChooseLoginMethodScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  //CONTEXT
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("ChooseLoginMethodScreen must be used within AuthContextProvider");
  }
  const {
    setLoading,
    loading,
    handleResendOtp,
    localUserData,
    logout,
    setIsLogin,
    handleGetUser,
    userData,
  } = authContext;

  const profile = useMemo(() => {
    const apiPhone = userData?.phone != null ? String(userData.phone).trim() : "";
    if (apiPhone) return userData;
    const localPhone = localUserData?.phone != null ? String(localUserData.phone).trim() : "";
    if (localPhone) return localUserData;
    return userData ?? localUserData ?? undefined;
  }, [userData, localUserData]);

  const onFaceIdPress = useCallback(async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        toast.show("This device does not support biometric authentication.", { type: "warning" });
        return;
      }
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        toast.show(
          Platform.OS === "ios"
            ? "Enroll Face ID in Settings → Face ID & Passcode."
            : "Enroll face unlock in Settings → Security.",
          { type: "warning" },
        );
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: Platform.OS === "ios" ? "Unlock with Face ID" : "Unlock with face unlock",
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
      });
      if (result.success) {
        const onboardingCompleted = await getOnboardingCompleted();
        if (String(onboardingCompleted) === "true") {
          setIsLogin(true);
          return;
        }
        navigation.navigate(navigationStrings.VERIFY_IDENTITY);
      }
    } catch {
      toast.show("Could not authenticate with Face ID.", { type: "danger" });
    }
  }, [navigation, setIsLogin, toast]);

  useFocusEffect(
    useCallback(() => {
      void handleGetUser();
    }, [handleGetUser]),
  );

  //handle press
  const handlePress = async (otpType: OtpVerificationFlow) => {
    toast.hideAll();
    const phone = profile?.phone;
    if (!phone) {
      toast.show("Please enter phone number", { type: "warning" });
      return;
    }

    const hasFaceId = Boolean((profile as any)?.face_id_set ?? (profile as any)?.faceIdSet);
    const hasUserPin = Boolean((profile as any)?.user_pin_set ?? (profile as any)?.userPinSet);

    if (otpType === "faceId" && hasFaceId) {
      await onFaceIdPress();
      return;
    }
    if (otpType === "pinOtp" && hasUserPin) {
      navigation.navigate(navigationStrings.USER_PIN);
      return;
    }
    try {
      setLoading(true);
      const result: any = await handleResendOtp(phone, otpType);
      console.log(result, "result in handlePress in choose login method screen");
      if (result?.ok) {
        toast.show(`Otp code : ${result?.data?.otp}`, { type: "success" });
        if (otpType === "faceId") {
          navigation.navigate(navigationStrings.OTP_VERIFICATION, {
            phone,
            otpType: "faceId",
          });
          return;
        }
        if (otpType === "pinOtp") {
          navigation.navigate(navigationStrings.OTP_VERIFICATION, {
            phone,
            otpType: "pinOtp",
          });
          return;
        }
        if (otpType === "login") {
          navigation.navigate(navigationStrings.OTP_VERIFICATION, {
            phone,
            otpType: "login",
            loginWithOtp: true,
          });
          return;
        }
      } else {
        toast.show(result?.error || "Something went wrong", { type: "danger" });
      }
    } catch (error: any) {
      const message = error?.error || "Something went wrong";
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <View style={{ width: 60 }} />
        <Text style={styles.headerTitle}>Choose login method</Text>
        <Pressable
          onPress={() => {
            void logout();
          }}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
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

        <Text style={styles.title}>Welcome Back, {profile?.name}</Text>
        <Text style={styles.subtitle}>Please sign in to your account.</Text>

        {loading && <ActivityIndicator size="large" color={COLORS.PRIMARY} />}
        <View style={styles.cards}>
          <LoginMethodRow
            label="Face ID"
            icon={<FaceIdIcon width={ICON_SIZE} height={ICON_SIZE} />}
            onPress={() => handlePress("faceId")}
          />
          <LoginMethodRow
            label="User PIN"
            icon={<PinIcon width={ICON_SIZE} height={ICON_SIZE} />}
            onPress={() => handlePress("pinOtp")}
          />
          <LoginMethodRow
            label="Login with OTP"
            icon={<MessageIcon width={ICON_SIZE} height={ICON_SIZE} />}
            onPress={() => handlePress("login")}
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
    borderRadius={10}
    onPress={onPress}
    activeOpacity={0.88}
  >
    <InnerShadowIcon icon={icon} size={40} radius={114} />
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
  headerRow: {
    marginTop: Platform.OS === "ios" ? 6 : 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "600",
  },
  logoutBtn: {
    width: 60,
    alignItems: "flex-end",
    paddingVertical: 6,
  },
  logoutText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
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
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_80,
    textAlign: "center",
  },
  cards: {
    marginTop: 36,
    gap: 24,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
});
