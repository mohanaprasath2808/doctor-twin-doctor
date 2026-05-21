import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import InsuranceIcon from "../../../assets/icons/insurance.svg";

const HORIZONTAL = 16;
const FOOTER_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

/** Only param sent from navigator — no policy / identifiers in route. */
export type InsuranceNeedUpdateDetailParams = {
  status: "need_update";
};

const MOCK_SUMMARY_CARD = {
  carrierName: "Blue Cross Blue Shield",
  memberId: "BHHGJSJ9833",
  groupNumber: "12345",
};

const MISSING_INFO_INITIAL = "Unclear Insurance card";

const MESSAGE_INITIAL = "Please upload insurance card";

const InsuranceNeedUpdateDetail = () => {
  const navigation = useNavigation<any>();

  const [missingInfoText, setMissingInfoText] = useState(MISSING_INFO_INITIAL);
  const [messageText, setMessageText] = useState(MESSAGE_INITIAL);

  const missingInfoMultiline = missingInfoText.length > 30;
  const messageMultiline = messageText.length > 30;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle} numberOfLines={2}>
            Request Info for Insurance
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
                  {MOCK_SUMMARY_CARD.carrierName}
                </Text>
                <Text style={styles.metaLine}>
                  Member ID:
                  <Text style={styles.memberIdValue}>{" " + MOCK_SUMMARY_CARD.memberId}</Text>
                </Text>
                <Text style={styles.metaLine}>
                  Group Number:
                  <Text style={styles.memberIdValue}>{" " + MOCK_SUMMARY_CARD.groupNumber}</Text>
                </Text>
              </View>
              <View style={styles.badgeWrap}>
                <DeltaBadge
                  icon={null}
                  value="Need Update"
                  bgColor="#DBEAFE"
                  darkShadowColor="rgba(30, 64, 175, 0.2)"
                  lightShadowColor="#FFFFFF99"
                  textColor="#1E40AF"
                  height={28}
                  textStyle={styles.statusBadgeText}
                />
              </View>
            </View>
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.blockOuter}
            innerStyle={styles.blockInner}
            borderRadius={12}
          >
            <Text style={styles.blockTitle}>Missing Info</Text>
            <InputField
              value={missingInfoText}
              onChangeText={setMissingInfoText}
              multiline={missingInfoMultiline}
              scrollEnabled={!missingInfoMultiline}
              borderRadius={14}
              placeholder="Missing information from staff"
              containerStyle={styles.fieldUnderTitle}
            />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.blockOuter}
            innerStyle={styles.blockInner}
            borderRadius={12}
          >
            <Text style={styles.blockTitle}>Message</Text>
            <InputField
              value={messageText}
              onChangeText={setMessageText}
              multiline={messageMultiline}
              scrollEnabled={!messageMultiline}
              borderRadius={14}
              placeholder="Message from staff"
              containerStyle={styles.fieldUnderTitle}
            />
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton
            title="Update Insurance"
            height={48}
            gradientColors={FOOTER_GRADIENT}
            onPress={() =>
              navigation.navigate(navigationStrings.ADD_NEW_INSURANCE, { update: true })
            }
            containerStyle={styles.footerCta}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InsuranceNeedUpdateDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
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
    paddingBottom: 20,
    gap: 14,
    flexGrow: 1,
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
  blockOuter: {
    width: "100%",
  },
  blockInner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  fieldUnderTitle: {
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 18 : 10,
  },
  footerCta: {
    alignSelf: "stretch",
  },
});
