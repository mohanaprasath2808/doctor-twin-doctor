import React, { useMemo } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import { COLORS } from "../../../constants/theme";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import InsuranceIcon from "../../../assets/icons/insurance.svg";
import InsuranceCardPlaceholder from "../../../assets/images/tempImage/dummyReport.png";

/** Screen horizontal padding token. */
const HORIZONTAL = 16;
/** Inset around insurance card thumbnails (front & back). */
const CARD_IMAGE_INSET = 16;
/** Rounded corners for both card images. */
const CARD_IMAGE_BORDER_RADIUS = 12;
/** Outer inset frame height — inner image slot + `CARD_IMAGE_INSET` top & bottom. */
const INSURANCE_CARD_INSET_TOTAL_H = 234;

export type InsuranceVerifiedDetailParams = {
  carrierName: string;
  memberId: string;
  groupNumber: string;
};

const InsuranceVerifiedDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const carrierName = useMemo(
    () => route?.params?.carrierName ?? "Insurance",
    [route?.params?.carrierName],
  );
  const memberId = useMemo(() => route?.params?.memberId ?? "", [route?.params?.memberId]);
  const groupNumber = useMemo(() => route?.params?.groupNumber ?? "", [route?.params?.groupNumber]);

  const headerTitle = useMemo(() => {
    const parts = carrierName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 3) return `${parts[0]} ${parts[1]}`;
    return carrierName;
  }, [carrierName]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle} numberOfLines={1}>
          {headerTitle}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NeumorphicCard
          outerStyle={styles.summaryOuter}
          innerStyle={styles.summaryInner}
          borderRadius={10}
        >
          <View style={styles.summaryRow}>
            <InnerShadowIcon
              icon={<InsuranceIcon width={20} height={20} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.summaryTextWrap}>
              <Text style={styles.carrierName} numberOfLines={1}>
                {carrierName}
              </Text>
              <Text style={styles.metaLine}>
                Member ID:<Text style={styles.memberIdValue}>{" " + memberId}</Text>
              </Text>
              <Text style={styles.metaLine}>
                Group Number:<Text style={styles.memberIdValue}>{" " + groupNumber}</Text>
              </Text>
            </View>
            <View style={styles.badgeWrap}>
              <DeltaBadge
                icon={null}
                value="Verified"
                bgColor="#D3FFF1"
                darkShadowColor="#A9E9D5"
                lightShadowColor="#FFFFFF99"
                textColor={COLORS.SUCCESS}
                height={28}
                textStyle={styles.statusBadgeText}
              />
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.insuranceCardSectionOuter}
          innerStyle={styles.insuranceCardSectionInner}
          borderRadius={10}
        >
          <Text style={styles.sectionHeading}>Insurance Card</Text>

          <Text style={styles.uploadLabel}>Insurance Card (Front)</Text>
          <NeumorphicInnerShadowCard
            borderRadius={CARD_IMAGE_BORDER_RADIUS}
            height={INSURANCE_CARD_INSET_TOTAL_H}
            innerShadowHeight={INSURANCE_CARD_INSET_TOTAL_H}
            backgroundColor={COLORS.INNER_SURFACE}
            containerStyle={styles.imageInsetOuter}
            contentStyle={styles.imageInsetContent}
          >
            <View style={styles.insuranceCardImageClip}>
              <Image
                source={InsuranceCardPlaceholder}
                style={styles.insuranceCardImage}
                resizeMode="contain"
              />
            </View>
          </NeumorphicInnerShadowCard>

          <Text style={[styles.uploadLabel, styles.uploadLabelSpacing]}>Insurance Card (Back)</Text>
          <NeumorphicInnerShadowCard
            borderRadius={CARD_IMAGE_BORDER_RADIUS}
            height={INSURANCE_CARD_INSET_TOTAL_H}
            innerShadowHeight={INSURANCE_CARD_INSET_TOTAL_H}
            backgroundColor={COLORS.INNER_SURFACE}
            containerStyle={styles.imageInsetOuter}
            contentStyle={styles.imageInsetContent}
          >
            <View style={styles.insuranceCardImageClip}>
              <Image
                source={InsuranceCardPlaceholder}
                style={styles.insuranceCardImage}
                resizeMode="contain"
              />
            </View>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsuranceVerifiedDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 18,
    paddingBottom: 28,
  },
  summaryOuter: {
    width: "100%",
  },
  summaryInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  summaryTextWrap: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  carrierName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  metaLine: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  memberIdValue: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_80,
    fontFamily: "SF-Pro-Text-Medium",
  },
  badgeWrap: {
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
  },
  insuranceCardSectionOuter: {
    marginTop: 22,
    width: "100%",
  },
  insuranceCardSectionInner: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  uploadLabel: {
    marginTop: 14,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  uploadLabelSpacing: {
    marginTop: 20,
  },
  imageInsetOuter: {
    alignSelf: "stretch",
    width: "100%",
  },
  imageInsetContent: {
    width: "100%",
    height: INSURANCE_CARD_INSET_TOTAL_H,
    flexDirection: "column",
    padding: CARD_IMAGE_INSET,
    overflow: "hidden",
  },
  insuranceCardImageClip: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    borderRadius: CARD_IMAGE_BORDER_RADIUS,
    overflow: "hidden",
  },
  insuranceCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: CARD_IMAGE_BORDER_RADIUS,
  },
});
