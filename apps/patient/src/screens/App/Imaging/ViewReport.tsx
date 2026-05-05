import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import ZoomIn from "../../../assets/icons/zoomIn.svg";
import DownloadIcon from "../../../assets/icons/downloadIcon.svg";
import ShareIcon from "../../../assets/icons/shareIcon.svg";
import ReportPreviewImage from "../../../assets/images/tempImage/dummyReport.png";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";

const ViewReport = () => {
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
          <Text style={styles.headerTitle}>View Report</Text>
          <View style={styles.headerSpacer} />
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
            <Image source={ReportPreviewImage} style={styles.previewImage} />

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
          <InnerShadowIcon
            icon={<DownloadIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <Text style={styles.actionTitle}>Download PDF</Text>
          <RightArrowIcon width={10} height={10} />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.actionCardOuter, styles.actionGap]}
          innerStyle={styles.actionCardInner}
          borderRadius={10}
          onPress={() => undefined}
        >
          <InnerShadowIcon
            icon={<ShareIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <Text style={styles.actionTitle}>Share</Text>
          <RightArrowIcon width={10} height={10} />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewReport;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
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
  sectionTitle: {
    marginTop: 16,
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  previewOuter: {
    marginTop: 12,
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
    backgroundColor: COLORS.INNER_SURFACE,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    height: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  actionTitle: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
  },
});
