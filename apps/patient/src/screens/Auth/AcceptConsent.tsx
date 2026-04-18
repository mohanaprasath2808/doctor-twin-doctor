import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import TickIcon from "../../assets/icons/tick.svg";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import navigationStrings from "../../constants/navigationStrings";

const CONSENT_LABELS = [
  "I agree to the Terms of Service",
  "I acknowledge the Privacy Policy",
  "I consent to receive important notifications",
  "I acknowledge HIPAA Consent",
];

const AcceptConsent = () => {
  const navigation = useNavigation<any>();
  const [consentChecked, setConsentChecked] = useState<boolean[]>(() =>
    CONSENT_LABELS.map((_, i) => i === 0),
  );

  const toggleConsent = (index: number) => {
    setConsentChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <LeftArrowIcon width={26} height={26} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>Accept Consent & Permissions</Text>
        </View>
        <View style={styles.headerRightSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.imageContainer}
        wrapperStyle={styles.wrapper}
        overlayStyle={styles.overlayImage}
        imageStyle={styles.image}
      />

      <Text style={styles.subtitle}>
        Please review and accept our terms and consents to get started.
      </Text>

      <View style={styles.consentCard}>
        {CONSENT_LABELS.map((label, index) => (
          <TouchableOpacity
            key={label}
            activeOpacity={0.85}
            style={styles.consentItem}
            onPress={() => toggleConsent(index)}
          >
            {consentChecked[index] ? (
              <View style={[styles.checkbox, styles.checkboxChecked]}>
                <TickIcon width={15} height={12} />
              </View>
            ) : (
              <View style={styles.checkboxInnerWrap}>
                <InnerShadowView
                  width={30}
                  height={30}
                  borderRadius={6}
                  color={COLORS.SURFACE}
                  darkShadowDx={4}
                  darkShadowDy={4}
                  darkShadowBlur={7}
                  darkShadowColor="#C8CBCC"
                  lightShadowDx={-4}
                  lightShadowDy={-4}
                  lightShadowBlur={5}
                  lightShadowColor="#FFFFFF99"
                />
              </View>
            )}
            <Text style={styles.consentText}>{label}</Text>
            {index < CONSENT_LABELS.length - 1 ? <View style={styles.divider} /> : null}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <ReusableButton
          title="Continue"
          textColor="#FFFFFF"
          gradientColors={["#14B8D4", "#0E7490"]}
          backgroundColor="#0E7490"
          borderRadius={30}
          height={48}
          containerStyle={styles.continueButton}
          onPress={() => navigation.navigate(navigationStrings.SET_PREFERENCES)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 8 : 16,
  },
  headerTitleWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  headerRightSpacer: {
    width: 40,
    height: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  wrapper: {
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
  image: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 115,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    maxWidth: 381,
    alignSelf: "center",
    width: "100%",
  },
  consentCard: {
    marginTop: 16,
    width: "100%",
    maxWidth: 382,
    alignSelf: "center",
    backgroundColor: COLORS.SURFACE,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  consentItem: {
    minHeight: 62,
    justifyContent: "center",
    paddingLeft: 46,
    position: "relative",
  },
  checkbox: {
    position: "absolute",
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInnerWrap: {
    position: "absolute",
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 6,
    overflow: "hidden",
  },
  checkboxChecked: {
    backgroundColor: "#0E7490",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  consentText: {
    fontSize: 32 / 2.2857,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 20 : 24,
  },
  continueButton: {
    marginBottom: 4,
  },
});

export default AcceptConsent;