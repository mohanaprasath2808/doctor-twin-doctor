import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import ReusableButton from "../../neomorphism/ReusableButton";
import BirthIcon from "../../assets/icons/birth.svg";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import navigationStrings from "../../constants/navigationStrings";

const VerifyIdentity = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LeftArrowIcon width={26} height={26} />
      </TouchableOpacity>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.imageContainer}
        wrapperStyle={styles.wrapper}
        overlayStyle={styles.overlayImage}
        imageStyle={styles.image}
      />

      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.subtitle}>
        Hi Sarah, we&apos;re here to confirm your identity for security.
      </Text>

      <View style={styles.fields}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.readOnlyRow}>
            <View style={styles.phonePrefix}>
              <Text style={styles.flagEmoji}>🇬🇧</Text>
              <Text style={styles.chevron}>▼</Text>
            </View>
            <View style={styles.verticalRule} />
            <Text style={styles.readOnlyValue}>0123456789</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Birth of Date</Text>
          <View style={styles.readOnlyRow}>
            <BirthIcon width={18} height={18} />
            <Text style={[styles.readOnlyValue, styles.dobValue]}>27/03/1997</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <ReusableButton
          title="Next"
          textColor="#FFFFFF"
          gradientColors={["#14B8D4", "#0E7490"]}
          backgroundColor="#0E7490"
          borderRadius={30}
          height={48}
          containerStyle={styles.nextButton}
          onPress={() => navigation.navigate(navigationStrings.ACCEPT_CONSENT)}
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
  backButton: {
    marginTop: Platform.OS === "ios" ? 8 : 16,
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
  imageContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    marginTop: -45,
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
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "600",
    letterSpacing: 0.22,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 20,
    width: "100%",
    maxWidth: 352,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_80,
    textAlign: "left",
  },
  fields: {
    marginTop: 20,
    gap: 24,
    width: "100%",
    maxWidth: 374,
    alignSelf: "center",
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  readOnlyRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 64,
    backgroundColor: COLORS.SURFACE,
    gap: 10,
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  phonePrefix: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagEmoji: {
    fontSize: 18,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 8,
    lineHeight: 10,
    color: COLORS.TEXT_PRIMARY_60,
    marginTop: 2,
  },
  verticalRule: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.TEXT_PRIMARY_20,
    marginHorizontal: 2,
  },
  readOnlyValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  dobValue: {
    flex: 0,
    marginLeft: 0,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 24,
    width: "100%",
    maxWidth: 374,
    alignSelf: "center",
  },
  nextButton: {
    marginBottom: 4,
  },
});

export default VerifyIdentity;
