import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import CheckedListPadIcon from "../../../assets/icons/checkedListPadIcon.svg";
import ImagingResultsIcon from "../../../assets/icons/imagingResults.svg";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

type ImagingResultsDetailsParams = {
  id?: string;
  name?: string;
  date?: string;
  status?: "completed" | "pending";
  reportFile?: string;
  reportSize?: string;
};

const ImagingResultsDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params ?? {}) as ImagingResultsDetailsParams;
  const status = params.status ?? "completed";
  const palette =
    status === "completed"
      ? {
          value: "Completed",
          bgColor: "#D3FFF1",
          textColor: "#10B981",
          darkShadowColor: "rgba(16, 185, 129, 0.35)",
        }
      : {
          value: "Pending",
          bgColor: "#FFF6D9",
          textColor: "#D6AD3D",
          darkShadowColor: "rgba(214, 173, 61, 0.35)",
        };

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
          <Text style={styles.headerTitle}>{params.name ?? "Imaging Result"}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.summaryText}>Good news. Your X-ray looks normal.</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <View style={styles.rowTop}>
            <InnerShadowIcon
              icon={<ImagingResultsIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.titleWrap}>
              <Text style={styles.itemTitle}>{params.name ?? "Chest X-Ray"}</Text>
              <Text style={styles.itemDate}>{params.date ?? "20 April 2025"}</Text>
            </View>
            <DeltaBadge
              value={palette.value}
              bgColor={palette.bgColor}
              darkShadowColor={palette.darkShadowColor}
              textColor={palette.textColor}
              height={24}
            />
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Report Preview</Text>

          <View style={styles.reportRow}>
            <InnerShadowIcon
              icon={<CheckedListPadIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.titleWrap}>
              <Text style={styles.itemTitle}>{params.reportFile ?? "report_xray.pdf"}</Text>
              <Text style={styles.itemDate}>{params.reportSize ?? "245 KB"}</Text>
            </View>
            <AppButton
              text="View"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.viewText}
              style={styles.viewBtn}
              onPress={() =>
                navigation.navigate(navigationStrings.VIEW_REPORT, {
                  reportFile: params.reportFile ?? "report_xray.pdf",
                })
              }
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.summaryOuter]}
          innerStyle={styles.summaryInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Summary</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.messageOuter}
            contentStyle={styles.messageInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.messageText}>No abnormalities detected.</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <View style={styles.footerActions}>
          <View style={styles.actionRow}>
            <AppButton
              text="Request Call-back"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => undefined}
            />
            <AppButton
              text="Message care team"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => undefined}
            />
          </View>
          <ReusableButton
            title="Schedule Follow-up"
            containerStyle={styles.primaryBtn}
            textStyle={styles.primaryText}
            onPress={() => undefined}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImagingResultsDetails;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: { width: 40, height: 40 },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 24,
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
    width: 124,
    height: 124,
    borderRadius: 115,
    resizeMode: "contain",
  },
  summaryText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  cardOuter: { width: "100%", marginTop: 22 },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reportRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  itemDate: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_50,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 14,
  },
  sectionTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  viewBtn: {
    width: 68,
    height: 28,
    borderRadius: 16,
  },
  viewText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
  summaryOuter: {
    marginTop: 18,
  },
  summaryInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  messageOuter: { marginTop: 10 },
  messageInner: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  messageText: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
  },
  footerActions: {
    marginTop: 18,
    gap: 12,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
  primaryBtn: {
    height: 48,
    borderRadius: 24,
  },
  primaryText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: "500",
  },
});
