import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { hasAuthSession, hasCompletedOnboarding } from "../../utils/authStorage";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import { useAuthStore } from "../../store/useAuthStore";
import { useAppStore } from "../../store/useAppStore";
import { handleResendOtp as requestResendOtp } from "../../service/authService";
import IconComponent from "../../neomorphism/IconComponent";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import BackIcon from "../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../assets/icon/rightArrow.svg";
import FaceScanIcon from "../../assets/icon/faceScanIcon.svg";
import PasswordIcon from "../../assets/icon/lockIcon.svg";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import { useToast } from "react-native-toast-notifications";
const FACE_ID_LABEL = Platform.OS === "ios" ? "Face ID" : "Face unlock";

const FACE_PROMPT = Platform.OS === "ios" ? "Unlock with Face ID" : "Unlock with face unlock";

function hasFaceRecognitionHardware(types: LocalAuthentication.AuthenticationType[]): boolean {
  return types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
}

const SECURE_OPTIONS = [
  {
    id: "face-id",
    label: FACE_ID_LABEL,
    icon: <FaceScanIcon width={18} height={18} />,
  },
  {
    id: "user-pin",
    label: "User PIN",
    icon: <PasswordIcon width={18} height={18} />,
  },
  {
    id: "sso-login",
    label: "SSO Login",
    icon: <PasswordIcon width={18} height={18} />,
  },
];

const SecureLogin = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const setIsLogin = useAuthStore((s) => s.setIsLogin);
  const userData = useAuthStore((s) => s.userData);
  console.log(userData, "userData in SecureLogin Screen");
  const getUser = useAuthStore((s) => s.getUser);
  const logout = useAuthStore((s) => s.logout);
  const loading = useAppStore((s) => s.loading);
  const setLoading = useAppStore((s) => s.setLoading);
  const [biometricBusy, setBiometricBusy] = useState(false);
  /** Face ID / face unlock hardware reported by the OS (fingerprint-only devices stay false). */
  const [faceIdAvailable, setFaceIdAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!cancelled) {
        setFaceIdAvailable(hasFaceRecognitionHardware(types));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  useFocusEffect(
    useCallback(() => {
      void getUser();
    }, [getUser]),
  );
  const continueOnboarding = useCallback(() => {
    navigation.navigate(navigationStrings.SET_USER_PIN);
  }, [navigation]);

  const onFaceIdPress = useCallback(async () => {
    setBiometricBusy(true);
    try {
      const stored = await hasAuthSession();
      if (!stored) {
        Alert.alert(
          "Complete setup first",
          "Finish sign-in once. After that you can use Face ID the next time you open the app.",
          [{ text: "Continue", onPress: continueOnboarding }],
        );
        return;
      }

      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert("Not available", "This device does not support biometric authentication.");
        return;
      }

      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!hasFaceRecognitionHardware(types)) {
        Alert.alert(
          "Face ID not supported",
          Platform.OS === "ios"
            ? "This device does not support Face ID. Use an iPhone with Face ID, or sign in with User PIN / SSO below."
            : "This device does not report face unlock hardware (fingerprint-only devices are not supported for this option). Use User PIN or SSO below.",
        );
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert(
          "Face ID not set up",
          Platform.OS === "ios"
            ? "Enroll Face ID in Settings → Face ID & Passcode."
            : "Enroll face unlock in Settings → Security (or Security & privacy).",
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: FACE_PROMPT,
        fallbackLabel: "Use passcode",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        if (await hasCompletedOnboarding()) {
          setIsLogin(true);
        } else {
          navigation.navigate(navigationStrings.ONBOARDING_STACK);
        }
      }
    } finally {
      setBiometricBusy(false);
    }
  }, [continueOnboarding, navigation, setIsLogin]);

  const onOptionPress = (id: string) => {
    toast.hideAll();
    switch (id) {
      case "face-id":
        if (!faceIdAvailable) {
          Alert.alert(
            "Face ID not supported",
            Platform.OS === "ios"
              ? "This device does not support Face ID."
              : "This device does not support face unlock (e.g. fingerprint-only phones). Use User PIN or SSO.",
          );
          return;
        }
        void (async () => {
          const email = userData?.email?.trim();
          if (!email) {
            toast.show("No saved email. Sign in with Login first.", { type: "warning" });
            return;
          }
          if (userData?.face_id_set !== true) {
            setLoading(true);
            try {
              const result: any = await requestResendOtp(email, "faceId");
              if (!result.ok) {
                toast.show("Could not send code. Try again.", { type: "danger" });
                return;
              }
              toast.show(`Otp code: ${result.data.data.otp}`, { type: "success" });
              navigation.navigate(navigationStrings.OTP_VERIFICATION, {
                email,
                source: "faceId",
              });
            } finally {
              setLoading(false);
            }
            return;
          }

          await onFaceIdPress();
        })();
        return;
      case "sso-login":
        navigation.navigate(navigationStrings.SSO_SIGN_IN, { email: userData?.email });
        return;
      case "user-pin": {
        void (async () => {
          const email = userData?.email?.trim();
          if (!email) {
            toast.show("No saved email. Sign in with Login first.", { type: "warning" });
            return;
          }
          const hasUserPin = Boolean(userData?.user_pin_set);
          if (hasUserPin) {
            navigation.navigate(navigationStrings.SET_USER_PIN, {
              mode: "verify",
            });
            return;
          }

          setLoading(true);
          try {
            const result: any = await requestResendOtp(email, "pinOtp");
            if (!result.ok) {
              toast.show("Could not send code. Try again.", { type: "danger" });
              return;
            }
            toast.show(`Otp code: ${result.data.data.otp}`, { type: "success" });
            navigation.navigate(navigationStrings.OTP_VERIFICATION, {
              source: "pinOtp",
              email,
            });
          } finally {
            setLoading(false);
          }
        })();
        return;
      }
      default:
        continueOnboarding();
    }
  };

  //handle back blocked toast
  const showBackBlockedToast = useCallback(() => {
    toast.show("You cannot go back from this screen.", { type: "warning" });
  }, [toast]);

  useFocusEffect(
    useCallback(() => {
      // Blocks iOS swipe-back, header back, and programmatic back pops while this screen is focused.
      const unsubscribeBeforeRemove = navigation.addListener("beforeRemove", (e: any) => {
        e.preventDefault();
        showBackBlockedToast();
      });

      // Blocks Android hardware back button.
      const backSub = BackHandler.addEventListener("hardwareBackPress", () => {
        showBackBlockedToast();
        return true;
      });

      return () => {
        unsubscribeBeforeRemove();
        backSub.remove();
      };
    }, [navigation, showBackBlockedToast]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* {canGoBack ? (
          <IconComponent
            icon={<BackIcon width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            onPress={handleGoBack}
          />
        ) : (
          <View style={styles.headerSpacer} />
        )} */}
        <Text style={styles.headerTitle}>Secure Login</Text>
        <Pressable
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Logout",
                style: "destructive",
                onPress: () => {
                  void (async () => {
                    await logout();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: navigationStrings.LOGIN }],
                    });
                  })();
                },
              },
            ]);
          }}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        {/* <View style={styles.headerSpacer} /> */}
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

      {biometricBusy || loading ? (
        <View style={styles.busyWrap}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY_DARK} />
        </View>
      ) : null}

      <View style={styles.optionsWrap}>
        {SECURE_OPTIONS.map((option) => (
          <Pressable
            key={option.id}
            style={[
              styles.optionPress,
              option.id === "face-id" && !faceIdAvailable && styles.optionDisabled,
            ]}
            disabled={biometricBusy || loading}
            onPress={() => onOptionPress(option.id)}
          >
            <NeumorphicCard
              outerStyle={styles.optionOuter}
              innerStyle={styles.optionInner}
              borderRadius={12}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionLeft}>
                  <InnerShadowIcon size={40} icon={option.icon} />
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
                <RightArrowIcon width={10} height={10} />
              </View>
            </NeumorphicCard>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SecureLogin;

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
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
  headerSpacer: {
    width: 40,
  },
  logoutBtn: {
    position: "absolute",
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  logoutText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
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
  welcomeText: {
    marginTop: 16,
    textAlign: "center",
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "600",
  },
  busyWrap: {
    marginTop: 16,
    alignItems: "center",
  },
  optionsWrap: {
    marginTop: 30,
    gap: 20,
  },
  optionPress: {
    width: "100%",
  },
  optionDisabled: {
    opacity: 0.45,
  },
  optionOuter: {
    width: "100%",
  },
  optionInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionLabel: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
});
