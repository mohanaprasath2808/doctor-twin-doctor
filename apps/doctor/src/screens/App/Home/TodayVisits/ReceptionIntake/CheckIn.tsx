import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import NeumorphicToggleSwitch from "../../../../../components/Common/NeumorphicSwitch";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import TimerIcon from "../../../../../assets/icon/timerIcon.svg";
import TickIcon from "../../../../../assets/icon/tickIcon.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";

const CheckIn = () => {
  const navigation = useNavigation<any>();
  const [arrived, setArrived] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Check-In</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.profileCardInner} borderRadius={12}>
          <View style={styles.patientTopRow}>
            <Image source={DoctorTempImage} style={styles.patientImage} />
            <View style={styles.patientInfo}>
              <View style={styles.patientNameRow}>
                <Text style={styles.patientName}>Emily Clark</Text>
                <Text style={styles.patientAge}>45F</Text>
              </View>
              <View style={styles.patientTimeRow}>
                <TimerIcon width={14} height={14} />
                <Text style={styles.patientTime}>10:30 AM</Text>
              </View>
            </View>
          </View>

          <View style={styles.visitMetaRow}>
            <View style={styles.visitMetaItem}>
              <Text style={styles.metaLabel}>Visit Type</Text>
              <Text style={styles.metaValue}>Annual Physical</Text>
            </View>
            <View style={styles.visitMetaItem}>
              <Text style={styles.metaLabel}>Provider</Text>
              <Text style={styles.metaValue}>Dr. Shahinaz</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <InnerShadowIcon icon={<TickIcon width={18} height={18} />} size={40} />
              <Text style={styles.rowTitle}>Mark as Arrived</Text>
            </View>
            <NeumorphicToggleSwitch value={arrived} onValueChange={setArrived} />
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Arrival Time</Text>
          <View style={styles.row}>
            <InnerShadowIcon icon={<TimerIcon width={18} height={18} />} size={40} />
            <View style={styles.itemTextWrap}>
              <Text style={styles.rowTitle}>10:22 AM</Text>
              <Text style={styles.rowSubtitle}>Time</Text>
            </View>
          </View>
        </NeumorphicCard>

        <ReusableButton
          title="Confirm Check-In"
          height={50}
          borderRadius={25}
          containerStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          onPress={() =>
            navigation.navigate(navigationStrings.RECEPTION_INTAKE_COMPLETED, {
              title: "Check-In Completed",
              buttonText: "Back to Intake",
              backRouteName: navigationStrings.RECEPTION_INTAKE,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    paddingTop: 12,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarOverlay: {
    borderRadius: 90,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  listeningText: {
    marginTop: 8,
    marginBottom: 28,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  cardOuter: {
    width: "100%",
    marginBottom: 18,
  },
  profileCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientInfo: {
    flex: 1,
    gap: 6,
  },
  patientNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientAge: {
    fontSize: 14,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  patientTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  patientTime: {
    fontSize: 12,
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  visitMetaRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  visitMetaItem: {
    width: "48%",
    gap: 4,
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
    marginBottom: 14,
  },
  row: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  rowSubtitle: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  itemTextWrap: {
    flex: 1,
    gap: 3,
  },
  confirmButton: {
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
