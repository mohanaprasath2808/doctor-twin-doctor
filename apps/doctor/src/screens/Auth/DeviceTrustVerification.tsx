import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import IconComponent from "../../neomorphism/IconComponent";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import NeumorphicCheckboxMark from "../../components/Common/NeumorphicCheckboxMark";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../neomorphism/ReusableButton";
import AppButton from "../../components/Common/AppButton";
import OtpTextInput from "../../components/Auth/OtpTextInput";
import BackIcon from "../../assets/icon/backArrow.svg";
import WarningIcon from "../../assets/icon/warningIcon.svg";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { useAuthStore } from "../../store/useAuthStore";
import {
  handleFetchBackupCodes as fetchBackupCodes,
  handleVerifyBackupCode,
} from "../../service/authService";
import { useToast } from "react-native-toast-notifications";
import { useAppStore } from "../../store/useAppStore";
import type { DeviceTrustVerificationRouteParams } from "../../types/authRoute";
const DeviceTrustVerification = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [otp, setOtp] = useState("");
  const [trustDevice, setTrustDevice] = useState(true);
  const userData = useAuthStore((s) => s.userData);
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const setIsLogin = useAuthStore((s) => s.setIsLogin);
  useEffect(() => {
    const { prefillOtp } = (route.params ?? {}) as DeviceTrustVerificationRouteParams;
    if (prefillOtp && typeof prefillOtp === "string") {
      setOtp(prefillOtp);
    }
  }, [route.params]);
  //handle confirm
  const handleConfirm = async () => {
    toast.hideAll();
    if (otp.trim().length !== 4) {
      toast.show("Please enter a valid 4-digit backup code.", { type: "warning" });
      return;
    }
    if (!trustDevice) {
      toast.show("Please trust the device to continue.", { type: "warning" });
      return;
    }
    if (!userData?.email) {
      toast.show("User email not found. Please login again.", { type: "danger" });
      return;
    }
    setLoading(true);
    try {
      const response = await handleVerifyBackupCode(userData?.email, otp);
      if (response.ok) {
        toast.show("Backup code verified successfully.", { type: "success" });
        setIsLogin(true);
      } else {
        toast.show("Failed to verify backup code. Please try again.", { type: "danger" });
      }
    } catch (error) {
      toast.show("Failed to verify backup code. Please try again.", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  //handle fetch backup codes
  const handleFetchBackupCodes = async () => {
    toast.hideAll();
    if (!userData?.email) {
      toast.show("User email not found. Please login again.", { type: "danger" });
      return;
    }
    setLoading(true);

    try {
      const response: any = await fetchBackupCodes(userData.email);
      console.log(response, "response in handleFetchBackupCodes");
      if (response.ok) {
        navigation.navigate(navigationStrings.OTP_VERIFICATION, {
          email: userData.email,
          source: "backupcode",
        });
        const toastOtp = response?.data?.data?.otp;
        toast.show(`Otp code : ${toastOtp}`, { type: "success" });
      } else {
        toast.show("Failed to fetch backup codes. Please try again.", { type: "danger" });
      }
    } catch (error) {
      toast.show("Failed to fetch backup codes. Please try again.", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={22} height={22} />}
          width={40}
          height={40}
          radius={20}
          style={styles.headerBackBtn}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Device Trust Verification</Text>
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.imageContainer}
        wrapperStyle={styles.wrapper}
        overlayStyle={styles.overlayImage}
        imageStyle={styles.image}
      />

      <NeumorphicCard
        outerStyle={styles.noticeOuter}
        innerStyle={styles.noticeInner}
        borderRadius={12}
      >
        <View style={styles.noticeRow}>
          <InnerShadowIcon icon={<WarningIcon width={16} height={16} />} size={40} radius={20} />
          <View style={styles.noticeTextWrap}>
            <Text style={styles.noticeTitle}>Emergency access</Text>
            <Text style={styles.noticeSubText}>For urgent access, how critical above device</Text>
          </View>
        </View>
      </NeumorphicCard>

      <View style={styles.otpWrap}>
        <OtpTextInput otp={otp} setOtp={setOtp} containerStyle={styles.otpInputTight} />
      </View>

      <ReusableButton
        title={loading ? "Verifying..." : "Confirm"}
        onPress={handleConfirm}
        containerStyle={styles.confirmBtn}
        backgroundColor="#2E3A8C"
        textColor="#FFFFFF"
      />

      <AppButton
        text="Use Backup code"
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        textStyle={styles.backupText}
        style={styles.backupBtn}
        onPress={handleFetchBackupCodes}
      />

      <NeumorphicCard
        outerStyle={styles.trustOuter}
        innerStyle={styles.trustInner}
        borderRadius={10}
      >
        <Pressable style={styles.trustRow} onPress={() => setTrustDevice(!trustDevice)}>
          <NeumorphicCheckboxMark selected={trustDevice} />
          <Text style={styles.trustText}>Trust this device</Text>
        </Pressable>
      </NeumorphicCard>

      <Text style={styles.footerHint}>Recommend it using regularly</Text>
    </SafeAreaView>
  );
};

export default DeviceTrustVerification;

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
    justifyContent: "center",
  },
  headerBackBtn: {
    position: "absolute",
    left: 0,
  },
  headerTitle: {
    textAlign: "center",
    alignSelf: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
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
  noticeOuter: {
    marginTop: 30,
  },
  noticeInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  noticeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noticeTextWrap: {
    flex: 1,
  },
  noticeTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  noticeSubText: {
    marginTop: 4,
    color: COLORS.TEXT_70,
    fontSize: 14,
    fontWeight: "400",
  },
  otpWrap: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  otpInputTight: {
    columnGap: 10,
  },
  confirmBtn: {
    marginTop: 40,
  },
  backupBtn: {
    marginTop: 20,
    height: 48,
    borderRadius: 24,
  },
  backupText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  trustOuter: {
    marginTop: 30,
  },
  trustInner: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trustText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  footerHint: {
    marginTop: "auto",
    marginBottom: Platform.OS === "ios" ? 8 : 20,
    textAlign: "center",
    color: COLORS.TEXT_60,
    fontSize: 14,
    fontWeight: "400",
  },
});
