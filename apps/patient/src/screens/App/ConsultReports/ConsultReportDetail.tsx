import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import CheckedListPadIcon from "../../../assets/icons/checkedListPadIcon.svg";
import ImagingResultsIcon from "../../../assets/icons/imagingResults.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

/**
 * Static consult report detail UI (no route props). Wired from inbox list tap.
 */
const ConsultReportDetail = () => {
  const navigation = useNavigation<any>();

  const goShare = () => navigation.navigate(navigationStrings.SHARE_CONSULT_REPORT);

  const reportSummary = "No serious condition detected";
  const reportSummaryMultiline = reportSummary.length > 30;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Consult Report Detail</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.summaryIntro}>Here's your latest consult report summary.</Text>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.reportCardInner}
          borderRadius={10}
        >
          <View style={styles.reportTop}>
            <InnerShadowIcon
              icon={<CheckedListPadIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.reportTopText}>
              <Text style={styles.reportTitle}>Dermatology Visit Notes</Text>
              <Text style={styles.reportMeta}>20 April 2025</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.previewLabel}>Report Preview</Text>
          <View style={styles.previewRow}>
            <InnerShadowIcon
              icon={<ImagingResultsIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.previewTextCol}>
              <Text style={styles.fileName}>report_xray.pdf</Text>
              <Text style={styles.fileSize}>245 KB</Text>
            </View>
            <AppButton
              elevated={false}
              text="View"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.viewBtnText}
              style={styles.viewBtn}
              height={24}
              borderRadius={64}
              onPress={goShare}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.summaryCardInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Report Summary</Text>
          <InputField
            value={reportSummary}
            editable={false}
            multiline={reportSummaryMultiline}
            numberOfLines={reportSummaryMultiline ? 5 : 1}
            minHeight={reportSummaryMultiline ? 120 : undefined}
            scrollEnabled={!reportSummaryMultiline}
            borderRadius={14}
            containerStyle={styles.summaryInput}
          />
        </NeumorphicCard>

        <View style={styles.bottomActions}>
          <View style={styles.btnHalf}>
            <AppButton
              text="Message Doctor"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => undefined}
            />
          </View>
          <View style={styles.btnHalf}>
            <AppButton
              text="Share Report"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={goShare}
            />
          </View>
        </View>

        <ReusableButton
          title="Download PDF"
          containerStyle={styles.downloadBtn}
          onPress={() => undefined}
          textStyle={styles.downloadBtnText}
          height={48}
          borderRadius={64}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsultReportDetail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  notifWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ALERT,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 16,
  },
  avatarWrapper: {
    width: 210,
    height: 210,
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
  avatar: {
    width: 138,
    height: 138,
    borderRadius: 69,
    resizeMode: "contain",
  },
  summaryIntro: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 12,
    fontFamily: "SF-Pro-Text-Medium",
  },
  cardOuter: { width: "100%" },
  cardGap: { marginTop: 16 },
  reportCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 12,
  },
  reportTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  reportTopText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  reportMeta: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginHorizontal: 0,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  previewTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  fileSize: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  viewBtn: {
    width: 72,
    minWidth: 72,
    flexShrink: 0,
  },
  viewBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  summaryCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  summaryInput: {
    width: "100%",
  },
  bottomActions: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  btnHalf: {
    flex: 1,
  },
  actionBtn: {
    width: "100%",
    height: 46,
    borderRadius: 24,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  downloadBtn: {
    marginTop: 20,
  },
  downloadBtnText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
