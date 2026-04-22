import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import TickIcon from "../../assets/icons/tick.svg";
import BellIcon from "../../assets/icons/bell.svg";
import DropDownIcon from "../../assets/icons/dropDown.svg";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import ReusableButton from "../../neomorphism/ReusableButton";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import SelectLocationBottomSheet from "../../components/App/BottomSheets/SelectLocationBottomSheet";
import navigationStrings from "../../constants/navigationStrings";

const COMMUNICATION_LABELS = ["Email", "App Notification", "SMS"];

/** Lighter inset than before — softer dark edge, gentler highlight */
const LIGHT_INNER_SHADOW = {
  darkShadowDx: 2,
  darkShadowDy: 2,
  darkShadowBlur: 6,
  darkShadowColor: "#A0A4A855",
  lightShadowDx: -2,
  lightShadowDy: -2,
  lightShadowBlur: 4,
  lightShadowColor: "#FFFFFFCC",
} as const;

const SetPreferences = () => {
  const navigation = useNavigation<any>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [communicationChecked, setCommunicationChecked] = useState<boolean[]>(() =>
    Array.from({ length: COMMUNICATION_LABELS.length }, (_, index) => index === 0),
  );
  const [pharmacySheetVisible, setPharmacySheetVisible] = useState(false);
  const [pharmacyLabel, setPharmacyLabel] = useState<string | null>(null);

  const toggleCommunication = (index: number) => {
    setCommunicationChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const renderCommunicationItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.communicationRow}
      onPress={() => toggleCommunication(index)}
    >
      {communicationChecked[index] ? (
        <View style={[styles.communicationCheckbox, styles.communicationCheckboxChecked]}>
          <TickIcon width={12} height={10} />
        </View>
      ) : (
        <View style={styles.communicationCheckboxInnerWrap}>
          <InnerShadowView
            width={20}
            height={20}
            borderRadius={6}
            color={COLORS.SURFACE}
            {...LIGHT_INNER_SHADOW}
          />
        </View>
      )}
      <Text style={styles.communicationText}>{item}</Text>
      {index < COMMUNICATION_LABELS.length - 1 ? <View style={styles.divider} /> : null}
    </TouchableOpacity>
  );

  return (
    <>
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
          <Text style={styles.title}>Set Preferences</Text>
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

      <View style={styles.pharmacyCard}>
        <Text style={styles.sectionHeading}>Pharmacy</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Pharmacy</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.dropdownField}
            onPress={() => setPharmacySheetVisible(true)}
          >
            <Text
              style={[
                styles.dropdownPlaceholder,
                pharmacyLabel ? styles.dropdownValue : null,
              ]}
            >
              {pharmacyLabel ?? "Select Pharmacy"}
            </Text>
            <DropDownIcon width={10} height={10} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.notificationCard}>
        <View style={styles.notificationLeft}>
          <View style={styles.iconShell}>
            <InnerShadowView
              width={40}
              height={40}
              borderRadius={20}
              color={COLORS.SURFACE}
              {...LIGHT_INNER_SHADOW}
            />
            <View style={styles.iconOverlay}>
              <BellIcon width={20} height={20} />
            </View>
          </View>
          <Text style={styles.notificationText}>Enable Notifications</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.toggleWrap}
          onPress={() => setNotificationsEnabled((prev) => !prev)}
        >
          <InnerShadowView
            width={52}
            height={28}
            borderRadius={114}
            color={COLORS.SURFACE}
            {...LIGHT_INNER_SHADOW}
          />
          <View
            style={[
              styles.toggleThumb,
              notificationsEnabled ? styles.toggleThumbOn : styles.toggleThumbOff,
            ]}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>Communication</Text>

      <View style={styles.communicationCard}>
        <FlatList
          data={COMMUNICATION_LABELS}
          keyExtractor={(item) => item}
          renderItem={renderCommunicationItem}
          scrollEnabled={false}
        />
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
          onPress={() => navigation.navigate(navigationStrings.SYNC)}
        />
      </View>
    </SafeAreaView>
    <SelectLocationBottomSheet
      visible={pharmacySheetVisible}
      onClose={() => setPharmacySheetVisible(false)}
      onConfirm={(name) => setPharmacyLabel(name)}
    />
    </>
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
  pharmacyCard: {
    marginTop: 8,
    width: "100%",
    maxWidth: 382,
    alignSelf: "center",
    backgroundColor: COLORS.SURFACE,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 14,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  sectionHeading: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  inputGroup: {
    marginTop: 16,
    gap: 4,
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  dropdownField: {
    height: 46,
    borderRadius: 64,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  dropdownPlaceholder: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_40,
  },
  dropdownValue: {
    color: COLORS.TEXT_PRIMARY,
  },
  notificationCard: {
    marginTop: 20,
    width: "100%",
    maxWidth: 382,
    alignSelf: "center",
    minHeight: 68,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  notificationLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconShell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  iconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  toggleWrap: {
    width: 52,
    height: 28,
    borderRadius: 114,
    justifyContent: "center",
  },
  toggleThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 62,
    top: 4,
    backgroundColor: "#0E7490",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  toggleThumbOn: {
    right: 4,
  },
  toggleThumbOff: {
    left: 4,
      opacity: 0.7,
    backgroundColor: COLORS.WHITE,
  },
  sectionLabel: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  communicationCard: {
    marginTop: 14,
    width: "100%",
    maxWidth: 382,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 10,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  communicationRow: {
    minHeight: 50,
    justifyContent: "center",
    paddingLeft: 36,
    position: "relative",
  },
  communicationCheckbox: {
    position: "absolute",
    left: 0,
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  communicationCheckboxChecked: {
    backgroundColor: "#0E7490",
    shadowColor: "#34718D99",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  communicationCheckboxInnerWrap: {
    position: "absolute",
    left: 0,
    width: 20,
    height: 20,
    borderRadius: 6,
    overflow: "hidden",
  },
  communicationText: {
    fontSize: 14,
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

export default SetPreferences;