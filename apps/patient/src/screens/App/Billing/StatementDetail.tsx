import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import BillingIcon from "../../../assets/icons/billing.svg";

const StatementDetail = () => {
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
          <Text style={styles.headerTitle}>Statement Detail</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.amountCardInner} borderRadius={10}>
          <NeumorphicInnerShadowCard
            borderRadius={14}
            containerStyle={styles.amountInsetOuter}
            contentStyle={styles.amountInsetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.amountText}>$85.00</Text>
            <Text style={styles.amountLabel}>Amount Due</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.smallGap]} innerStyle={styles.listCardInner} borderRadius={10}>
          <View style={styles.lineRow}>
            <Text style={styles.lineLeft}>Office Visit</Text>
            <Text style={styles.lineRight}>$100</Text>
          </View>
          <View style={styles.lineRow}>
            <Text style={styles.lineLeft}>Lab Processing</Text>
            <Text style={styles.lineRight}>$40</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.lineRow}>
            <Text style={styles.lineLeft}>Copay Applied</Text>
            <Text style={styles.negativeText}>-$55</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.smallGap]} innerStyle={styles.cptCardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>CPT Summary</Text>
          <View style={styles.cptRow}>
            <InnerShadowIcon
              icon={<BillingIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.cptName}>General consultation</Text>
            <NeumorphicInnerShadowCard
              borderRadius={12}
              containerStyle={styles.cptInsetOuter}
              contentStyle={styles.cptInsetInner}
              darkShadowColor={COLORS.DARK_SHADOW}
              lightShadowColor={COLORS.LIGHT_SHADOW}
            >
              <Text style={styles.cptCode}>93000</Text>
            </NeumorphicInnerShadowCard>
          </View>
        </NeumorphicCard>

        <View style={styles.bottomActions}>
          <View style={styles.btnHalf}>
            <AppButton
              text="Download PDF"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => undefined}
            />
          </View>
          <View style={styles.btnHalf}>
            <ReusableButton
              title="Pay Now"
              containerStyle={styles.actionBtn}
              onPress={() => navigation.navigate(navigationStrings.PAYMENT_SUCCESSFUL)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatementDetail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
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
  cardOuter: {
    width: "100%",
    marginTop: 18,
  },
  smallGap: {
    marginTop: 14,
  },
  amountCardInner: {
    padding: 10,
    borderRadius: 10,
  },
  amountInsetOuter: {
    width: "100%",
  },
  amountInsetInner: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  amountText: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  amountLabel: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  listCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  lineLeft: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  lineRight: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 2,
  },
  negativeText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.CRITICAL,
  },
  cptCardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cptRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cptName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cptInsetOuter: {
    width: 62,
  },
  cptInsetInner: {
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cptCode: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  bottomActions: {
    marginTop: "auto",
    paddingTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  btnHalf: {
    flex: 1,
    minWidth: 0,
  },
  actionBtn: {
    height: 48,
    borderRadius: 24,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});
