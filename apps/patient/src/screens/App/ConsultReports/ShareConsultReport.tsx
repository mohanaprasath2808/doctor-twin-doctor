import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import ZoomIn from "../../../assets/icons/zoomIn.svg";
import DownloadIcon from "../../../assets/icons/downloadIcon.svg";
import ShareIcon from "../../../assets/icons/shareIcon.svg";
import SendIcon from "../../../assets/icons/sendIcon.svg";
import ConsultSharePreviewImage from "../../../assets/images/tempImage/dummyReport.png";

const ShareConsultReport = () => {
  const navigation = useNavigation<any>();

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
          <Text style={styles.headerTitle}>Share Report</Text>
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

        <Text style={styles.sectionTitle}>Preview</Text>
        <NeumorphicInnerShadowCard
          borderRadius={10}
          containerStyle={styles.previewOuter}
          contentStyle={styles.previewInner}
          darkShadowColor={"#C1D5EE"}
          lightShadowColor={"#FFFFFFE0"}
        >
          <View style={styles.previewImageWrap}>
            <Image
              source={ConsultSharePreviewImage}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.zoomIconWrap}>
            <IconComponent
              icon={<ZoomIn width={16} height={16} />}
              width={32}
              height={32}
              radius={16}
              onPress={() => navigation.navigate(navigationStrings.VIEW_PDF)}
            />
          </View>
        </NeumorphicInnerShadowCard>

        <NeumorphicCard
          outerStyle={styles.actionCardOuter}
          innerStyle={styles.actionCardInner}
          borderRadius={10}
          onPress={() => undefined}
        >
          <View style={styles.actionLeft}>
            <InnerShadowIcon
              icon={<DownloadIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.actionTitle} numberOfLines={1}>
              Download PDF
            </Text>
          </View>
          <RightArrowIcon width={10} height={10} />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.actionCardOuter, styles.actionGap]}
          innerStyle={styles.actionCardInner}
          borderRadius={10}
          onPress={() => undefined}
        >
          <View style={styles.actionLeft}>
            <InnerShadowIcon
              icon={<ShareIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.actionTitle} numberOfLines={1}>
              Share to Family
            </Text>
          </View>
          <RightArrowIcon width={10} height={10} />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.actionCardOuter, styles.actionGap]}
          innerStyle={styles.actionCardInner}
          borderRadius={10}
          onPress={() => undefined}
        >
          <View style={styles.actionLeft}>
            <InnerShadowIcon
              icon={<SendIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.actionTitle} numberOfLines={1}>
              Send to Portal
            </Text>
          </View>
          <RightArrowIcon width={10} height={10} />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareConsultReport;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
  sectionTitle: {
    marginTop: 16,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  previewOuter: {
    marginTop: 16,
    position: "relative",
  },
  previewInner: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  previewImageWrap: {
    overflow: "hidden",
    maxHeight: 330,
    width: "100%",
    borderRadius: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  previewImage: {
    width: "100%",
    height: 330,
  },
  zoomIconWrap: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  actionCardOuter: {
    marginTop: 20,
    width: "100%",
  },
  actionGap: {
    marginTop: 18,
  },
  actionCardInner: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  actionLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionTitle: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
    textAlign: "left",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
