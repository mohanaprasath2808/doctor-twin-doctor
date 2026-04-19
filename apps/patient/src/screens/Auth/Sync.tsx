import React, { useContext, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";
import OverlayImage from "../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";
import ProfileAvatar from "../../components/Auth/ProfileAvatar";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import TickIcon from "../../assets/icons/tick.svg";
import AppointmentsRemindersIcon from "../../assets/icons/appointmentsReminders.svg";
import MedicationRefillsIcon from "../../assets/icons/medicationRefills.svg";
import LabResultsIcon from "../../assets/icons/labResults.svg";
import InnerShadowView from "../../neomorphism/InnerShadowView";
import ReusableButton from "../../neomorphism/ReusableButton";
import { AuthContext } from "../../context/AuthContext";

/** Soft recessed inset (same idea as SetPreferences communication checkboxes). */
const SYNC_INNER_SHADOW = {
  darkShadowDx: 2,
  darkShadowDy: 2,
  darkShadowBlur: 6,
  darkShadowColor: "#A0A4A855",
  lightShadowDx: -2,
  lightShadowDy: -2,
  lightShadowBlur: 4,
  lightShadowColor: "#FFFFFFCC",
} as const;

const SYNC_ROWS: {
  id: string;
  label: string;
  Icon: typeof AppointmentsRemindersIcon;
}[] = [
  { id: "appointments", label: "Appointments Reminders", Icon: AppointmentsRemindersIcon },
  { id: "medication", label: "Medication Refills", Icon: MedicationRefillsIcon },
  { id: "labs", label: "Lab Results", Icon: LabResultsIcon },
];

const Sync = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const auth = useContext(AuthContext);
  const [checked, setChecked] = useState<boolean[]>(() =>
    Array.from({ length: SYNC_ROWS.length }, (_, i) => i === 0),
  );

  if (!auth) {
    throw new Error("Sync must be used within AuthContextProvider");
  }
  const { setIsLogin } = auth;

  const finishOnboarding = () => {
    setIsLogin(true);
  };

  const toggleRow = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const renderSyncRow = ({
    item,
    index,
  }: {
    item: (typeof SYNC_ROWS)[number];
    index: number;
  }) => {
    const isChecked = checked[index];
    const { Icon } = item;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.syncRow}
        onPress={() => toggleRow(index)}
      >
        <View style={styles.rowContent}>
          {isChecked ? (
            <View style={styles.checkboxCheckedOuter}>
              <LinearGradient
                colors={["#14B8D4", "#0E7490"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.checkboxCheckedGradient}
              >
                <TickIcon width={12} height={10} />
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.checkboxUncheckedWrap}>
              <InnerShadowView
                width={20}
                height={20}
                borderRadius={6}
                color={COLORS.SURFACE}
                {...SYNC_INNER_SHADOW}
              />
            </View>
          )}

          <View style={styles.iconShell}>
            <InnerShadowView
              width={40}
              height={40}
              borderRadius={20}
              color={COLORS.SURFACE}
              {...SYNC_INNER_SHADOW}
            />
            <View style={styles.iconOverlay}>
              <Icon width={20} height={20} />
            </View>
          </View>

          <Text style={styles.rowLabel}>{item.label}</Text>
        </View>
        {index < SYNC_ROWS.length - 1 ? <View style={styles.rowDivider} /> : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <LeftArrowIcon width={26} height={26} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>Syncing Health Data</Text>
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

      <View style={styles.copyBlock}>
        <Text style={styles.headline}>Syncing Your Chart...</Text>
        <Text style={styles.subline}>Pulling in your chart — medications, labs and more.</Text>
      </View>

      <View style={styles.card}>
        <FlatList
          data={SYNC_ROWS}
          keyExtractor={(item) => item.id}
          renderItem={renderSyncRow}
          scrollEnabled={false}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <ReusableButton
          title="Allow Notifications"
          textColor="#FFFFFF"
          gradientColors={["#14B8D4", "#0E7490"]}
          backgroundColor="#0E7490"
          borderRadius={60}
          height={48}
          containerStyle={styles.primaryButton}
          onPress={finishOnboarding}
        />
        <TouchableOpacity activeOpacity={0.85} style={styles.skipTouchable} onPress={finishOnboarding}>
          <View style={styles.skipInner}>
            <Text style={styles.skipText}>Skip for Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
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
    ...Platform.select({
      android: { elevation: 3 },
    }),
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
  copyBlock: {
    marginTop: 24,
    gap: 4,
    maxWidth: 382,
    alignSelf: "center",
    width: "100%",
  },
  headline: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  subline: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: "#6B6B6B",
  },
  card: {
    marginTop: 20,
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
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  syncRow: {
    position: "relative",
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 70,
    paddingVertical: 16,
    gap: 12,
  },
  checkboxCheckedOuter: {
    width: 20,
    height: 20,
    borderRadius: 6,
    shadowColor: "#34718D",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  checkboxCheckedGradient: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxUncheckedWrap: {
    width: 20,
    height: 20,
    borderRadius: 6,
    overflow: "hidden",
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
  rowLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginLeft: 0,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 16,
  },
  primaryButton: {
    marginBottom: 0,
  },
  skipTouchable: {
    width: "100%",
    maxWidth: 382,
    alignSelf: "center",
    borderRadius: 60,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },
  skipInner: {
    height: 48,
    borderRadius: 60,
    backgroundColor: COLORS.SURFACE,
    borderWidth: 1,
    borderColor: "#0E7490",
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#0E7490",
    textAlign: "center",
  },
});

export default Sync;
