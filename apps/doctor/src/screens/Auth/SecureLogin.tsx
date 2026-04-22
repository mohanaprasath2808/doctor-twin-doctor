import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { hasLocalSession } from "../../auth/localSession";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import { AuthContext } from "../../context/AuthContext";
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
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("SecureLogin must be used within AuthContextProvider");
  }
  const { setIsLogin } = auth;
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

  const canGoBack = navigation.canGoBack();

  const continueOnboarding = useCallback(() => {
    navigation.navigate(navigationStrings.SET_USER_PIN);
  }, [navigation]);

  const onFaceIdPress = useCallback(async () => {
    setBiometricBusy(true);
    try {
      const stored = await hasLocalSession();
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
        setIsLogin(true);
      }
    } finally {
      setBiometricBusy(false);
    }
  }, [continueOnboarding, setIsLogin]);

  const onOptionPress = (id: string) => {
    if (id === "face-id") {
      if (!faceIdAvailable) {
        Alert.alert(
          "Face ID not supported",
          Platform.OS === "ios"
            ? "This device does not support Face ID."
            : "This device does not support face unlock (e.g. fingerprint-only phones). Use User PIN or SSO.",
        );
        return;
      }
      void onFaceIdPress();
      return;
    }
    continueOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {canGoBack ? (
          <IconComponent
            icon={<BackIcon width={22} height={22} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <View style={styles.headerSpacer} />
        )}
        <Text style={styles.headerTitle}>Secure Login</Text>
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

      {biometricBusy ? (
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
            disabled={biometricBusy}
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
