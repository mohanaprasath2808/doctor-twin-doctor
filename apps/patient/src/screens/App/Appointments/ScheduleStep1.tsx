import React, { useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import TickIcon from "../../../assets/icons/tick.svg";
import DropDownIcon from "../../../assets/icons/dropDown.svg";
import DoctorIcon from "../../../assets/icons/doctor.svg";
import AetnaPpoIcon from "../../../assets/icons/aetnaPpo.svg";
import InnerShadowView from "../../../neomorphism/InnerShadowView";
import ReusableButton from "../../../neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";

const VISIT_REASONS = [
  "General Consultation",
  "Follow-Up",
  "Annual Physical",
  "Medication Refill",
  "Other",
];

const CHECKBOX_INNER = {
  darkShadowDx: 2,
  darkShadowDy: 2,
  darkShadowBlur: 6,
  darkShadowColor: "#A0A4A855",
  lightShadowDx: -2,
  lightShadowDy: -2,
  lightShadowBlur: 4,
  lightShadowColor: "#FFFFFFCC",
} as const;

const ScheduleStep1 = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [selectedReasonIndex, setSelectedReasonIndex] = useState(0);

  const renderReasonItem = ({ item, index }: { item: string; index: number }) => {
    const isSelected = selectedReasonIndex === index;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.reasonRow}
        onPress={() => setSelectedReasonIndex(index)}
      >
        {isSelected ? (
          <View style={styles.reasonSelectedWrap}>
            <LinearGradient
              colors={["#14B8D4", "#0E7490"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.reasonSelected}
            >
              <TickIcon width={14} height={11} />
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.reasonUnselectedWrap}>
            <InnerShadowView
              width={30}
              height={30}
              borderRadius={46}
              color={COLORS.SURFACE}
              {...CHECKBOX_INNER}
            />
          </View>
        )}
        <Text style={styles.reasonText}>{item}</Text>
        {index < VISIT_REASONS.length - 1 ? <View style={styles.reasonDivider} /> : null}
      </TouchableOpacity>
    );
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
          <Text style={styles.title}>Schedule Appointment</Text>
        </View>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressRow}>
          <LinearGradient
            colors={["#14B8D4", "#0E7490"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.progressActive}
          />
          <View style={styles.progressInactive} />
        </View>

        <Text style={styles.stepText}>Step 1</Text>
        <Text style={styles.sectionTitle}>What&apos;s the reason for your visit?</Text>

        <View style={styles.reasonsCard}>
          <FlatList
            data={VISIT_REASONS}
            keyExtractor={(item) => item}
            renderItem={renderReasonItem}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.providerCard}>
          <Text style={styles.cardTitle}>Provider</Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.providerField}>
            <View style={styles.providerLeft}>
              <DoctorIcon width={18} height={18} />
              <Text style={styles.providerName}>Dr. Shahinaz Twin</Text>
            </View>
            <DropDownIcon width={10} height={10} />
          </TouchableOpacity>
        </View>

        <View style={styles.insuranceCard}>
          <Text style={styles.cardTitle}>Insurance</Text>
          <View style={styles.insuranceRow}>
            <View style={styles.insuranceLeft}>
              <View style={styles.insuranceIconWrap}>
                <InnerShadowView
                  width={40}
                  height={40}
                  borderRadius={114}
                  color={COLORS.SURFACE}
                  {...CHECKBOX_INNER}
                />
                <View style={styles.insuranceIconOverlay}>
                  <AetnaPpoIcon width={20} height={20} />
                </View>
              </View>
              <Text style={styles.insuranceName}>Aetna PPO</Text>
            </View>
            <TouchableOpacity activeOpacity={0.85} style={styles.changeButton}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Next"
          textColor={COLORS.WHITE}
          gradientColors={["#14B8D4", "#0E7490"]}
          backgroundColor="#0E7490"
          borderRadius={60}
                  height={48}
                  onPress={() => navigation.navigate(navigationStrings.SCHEDULE_STEP_2)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 8 : 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 62,
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
  headerTitleWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 40,
    height: 40,
  },
  progressRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressActive: {
    flex: 1,
    height: 12,
    borderRadius: 60,
    shadowColor: "#C1D5EE",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  progressInactive: {
    flex: 1,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#F7FBFF",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  stepText: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  reasonsCard: {
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
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  reasonRow: {
    minHeight: 62,
    justifyContent: "center",
    paddingLeft: 46,
    position: "relative",
  },
  reasonSelectedWrap: {
    position: "absolute",
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 60,
    shadowColor: "#34718D",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  reasonSelected: {
    width: 30,
    height: 30,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  reasonUnselectedWrap: {
    position: "absolute",
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 46,
    overflow: "hidden",
  },
  reasonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  reasonDivider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  providerCard: {
    marginTop: 20,
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
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  providerField: {
    marginTop: 12,
    height: 46,
    borderRadius: 64,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  providerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  providerName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  insuranceCard: {
    marginTop: 20,
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
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  insuranceRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  insuranceLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  insuranceIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 114,
    overflow: "hidden",
  },
  insuranceIconOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  insuranceName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  changeButton: {
    width: 65,
    height: 28,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#0E7490",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.SURFACE,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    ...Platform.select({
      android: { elevation: 2 },
    }),
  },
  changeText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: "#0E7490",
  },
  footer: {
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 20 : 24,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});

export default ScheduleStep1;
