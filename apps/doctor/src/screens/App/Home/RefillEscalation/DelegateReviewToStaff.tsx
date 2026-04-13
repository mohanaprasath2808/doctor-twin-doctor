import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
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
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import LapReportIcon from "../../../../assets/icon/labReportIcon.svg";
import CalendarIcon from "../../../../assets/icon/appointmentCalendarIcon.svg";
import ShieldIcon from "../../../../assets/icon/shieldIcon.svg";
import LotusIcon from "../../../../assets/icon/lotusIcon.svg";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import navigationStrings from "../../../../constants/navigationStrings";

const STAFF_LIST = [
  { id: "eva", name: "Eva", role: "Nurse" },
  { id: "jessie", name: "Jessie", role: "MA" },
  { id: "annie", name: "Annie", role: "Refill Pool" },
];

const REASON_LIST = [
  { id: "needs-labs", label: "Needs labs", icon: <LapReportIcon width={16} height={16} /> },
  { id: "needs-appointment", label: "Needs appointment", icon: <CalendarIcon width={16} height={16} /> },
  { id: "med-recon", label: "Need med reconciliation", icon: <CapsuleIcon width={16} height={16} /> },
  { id: "insurance", label: "Insurance / PA issue", icon: <ShieldIcon width={16} height={16} /> },
  { id: "control-substance", label: "Control Substance", icon: <LotusIcon width={16} height={16} /> },
];

const DelegateReviewToStaff = () => {
  const navigation = useNavigation<any>();
  const onReasonPress = (reasonId: string) => {
    if (reasonId === "needs-labs") {
      navigation.navigate(navigationStrings.LABS_REVIEW);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        // contentContainerStyle={styles.content}
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

        <NeumorphicCard outerStyle={styles.staffCardOuter} innerStyle={styles.staffCardInner} borderRadius={10}>
          <FlatList
            data={STAFF_LIST}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
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
            )}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </NeumorphicCard>

        <Text style={styles.sectionTitle}>Reason</Text>

        <FlatList
          style={styles.reasonList}
          data={REASON_LIST}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <NeumorphicCard
              outerStyle={styles.reasonOuter}
              innerStyle={styles.reasonInner}
              borderRadius={10}
              onPress={() => onReasonPress(item.id)}
            >
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <InnerShadowIcon icon={item.icon} size={40} />
                  <Text style={styles.reasonLabel}>{item.label}</Text>
                </View>
                <RightArrowIcon width={10} height={10} />
              </View>
            </NeumorphicCard>
          )}
          ItemSeparatorComponent={() => <View style={styles.reasonSeparator} />}
          contentContainerStyle={{ marginBottom: 16 }}
        />

        <View style={{ marginHorizontal: 16 }}>
          <ReusableButton
            title="Order Labs"
            containerStyle={styles.footerBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    justifyContent: "center",
    paddingHorizontal: 16,
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
  staffCardOuter: { marginTop: 20, marginHorizontal: 16 },
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
    paddingHorizontal: 16,
  },
  reasonList: { marginTop: 8, },
  reasonSeparator: { height: 10 },
  reasonOuter: { marginHorizontal: 16 },
  reasonInner: { borderRadius: 12, paddingHorizontal: 10, minHeight: 50, justifyContent: "center" },
  reasonLabel: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  footerBtn: {
    marginTop: 16,
    height: 48,
    borderRadius: 24,
  },
});

export default DelegateReviewToStaff;