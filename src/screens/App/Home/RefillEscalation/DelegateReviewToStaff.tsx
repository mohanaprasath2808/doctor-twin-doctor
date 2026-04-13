import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import NotificationIcon from "../../../../assets/icon/notificationIcon.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import DelegationHubIcon from "../../../../assets/icon/delegationHubIcon.svg";
import WarningIcon from "../../../../assets/icon/warningIcon.svg";
import ProfileIcon from "../../../../assets/icon/profile.svg";

const STAFF_LIST = [
  { id: "eva", name: "Eva", role: "Nurse" },
  { id: "jessie", name: "Jessie", role: "MA" },
  { id: "annie", name: "Annie", role: "Refill Pool" },
];

const REASON_LIST = [
  { id: "needs-labs", label: "Needs labs", icon: <CapsuleIcon width={16} height={16} /> },
  { id: "needs-appointment", label: "Needs appointment", icon: <CalendarIcon width={16} height={16} /> },
  { id: "med-recon", label: "Need med reconciliation", icon: <DelegationHubIcon width={16} height={16} /> },
  { id: "insurance", label: "Insurance / PA issue", icon: <WarningIcon width={16} height={16} /> },
  { id: "control-substance", label: "Control Substance", icon: <ProfileIcon width={16} height={16} /> },
];

const DelegateReviewToStaff = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Delegate Review to Staff</Text>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.promptText}>Choose the patient's refill for review?</Text>

        <NeumorphicCard outerStyle={styles.staffCardOuter} innerStyle={styles.staffCardInner} borderRadius={12}>
          {STAFF_LIST.map((item, index) => (
            <View key={item.id}>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <DoctorAvatar source={DoctorTempImage} imageSize={40} containerSize={40} middleRingGap={0} outerRingExtra={0} />
                  <View>
                    <Text style={styles.rowTitle}>{item.name}</Text>
                    <Text style={styles.rowSub}>{item.role}</Text>
                  </View>
                </View>
                <RightArrowIcon width={10} height={10} />
              </View>
              {index !== STAFF_LIST.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </NeumorphicCard>

        <Text style={styles.sectionTitle}>Reason</Text>

        <View style={styles.reasonList}>
          {REASON_LIST.map((item) => (
            <NeumorphicCard key={item.id} outerStyle={styles.reasonOuter} innerStyle={styles.reasonInner} borderRadius={12}>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <View style={styles.reasonIconWrap}>{item.icon}</View>
                  <Text style={styles.reasonLabel}>{item.label}</Text>
                </View>
                <RightArrowIcon width={10} height={10} />
              </View>
            </NeumorphicCard>
          ))}
        </View>

        <ReusableButton
          title="Order Labs"
          containerStyle={styles.footerBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    minHeight: 40,
    justifyContent: "center",
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
  },
  avatarWrap: { alignItems: "center", marginTop: 4 },
  avatarWrapper: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatar: { width: 68, height: 68, borderRadius: 115, resizeMode: "contain" },
  promptText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  staffCardOuter: { marginTop: 20 },
  staffCardInner: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8 },
  row: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTitle: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  rowSub: { color: COLORS.TEXT_60, fontSize: 11, fontWeight: "400" },
  divider: { height: 1, backgroundColor: COLORS.TEXT_10 },
  sectionTitle: {
    marginTop: 14,
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  reasonList: { marginTop: 8, gap: 10 },
  reasonOuter: {},
  reasonInner: { borderRadius: 12, paddingHorizontal: 10, minHeight: 50, justifyContent: "center" },
  reasonIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECF2F9",
  },
  reasonLabel: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  footerBtn: {
    marginTop: 16,
    height: 48,
    borderRadius: 24,
  },
});

export default DelegateReviewToStaff;
