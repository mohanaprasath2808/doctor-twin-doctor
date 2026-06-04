import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import BluePlusIcon from "../../../../assets/icon/bluePlusIcn.svg";
import YellowWarningIcon from "../../../../assets/icon/yellowWarningIcon.svg";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import PdfPreviewImage from "../../../../assets/image/tempImage/dummyReport.png";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import navigationStrings from "../../../../constants/navigationStrings";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const RevenuePdfPreview = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 100 }]}
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
          <Text style={styles.headerTitle}>PDF Preview</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.patientInner} borderRadius={14}>
          <Image source={DoctorTempImage} style={styles.avatar} />
          <View style={styles.patientText}>
            <Text style={styles.patientName}>Sarah Williams</Text>
            <Text style={styles.patientSub}>#12345</Text>
            <Text style={styles.patientSub}>Date of service: 12 Mar 2025</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.previewCardInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewFrame}>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.previewInsetOuter}
              contentStyle={styles.previewInsetInner}
            >
              <Image source={PdfPreviewImage} style={styles.previewImage} resizeMode="contain" />
            </NeumorphicInnerShadowCard>
            <View style={styles.zoomBtn}>
              <InnerShadowIcon
                size={36}
                radius={18}
                icon={<BluePlusIcon width={16} height={16} />}
              />
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.warningInner} borderRadius={14}>
          <View style={styles.warningRow}>
            <InnerShadowIcon
              size={36}
              radius={18}
              icon={<YellowWarningIcon width={16} height={16} />}
              backgroundColor="#FFF8DB"
            />
            <Text style={styles.warningText}>Please review before submitting to payer</Text>
          </View>
        </NeumorphicCard>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <ReusableButton
          title="Submit Claim"
          height={52}
          borderRadius={26}
          containerStyle={styles.submitBtn}
          onPress={() => navigation.navigate(navigationStrings.SUBMIT_CLAIM)}
        />
      </View>
    </SafeAreaView>
  );
};

export default RevenuePdfPreview;

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
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  cardOuter: {
    width: "100%",
    marginBottom: 14,
  },
  patientInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  patientText: {
    flex: 1,
    gap: 2,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  previewCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  previewFrame: {
    position: "relative",
  },
  previewInsetOuter: {
    width: "100%",
  },
  previewInsetInner: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 360,
  },
  zoomBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  warningInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFF8DB",
  },
  warningRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  submitBtn: {
    width: "100%",
  },
});
