import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import StatusDot from "../../../components/Common/StatusDot";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import BillingIcon from "../../../assets/icons/billing.svg";
import MedicationRefillsIcon from "../../../assets/icons/medicationRefills.svg";
import InsuranceIcon from "../../../assets/icons/insurance.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const Billing = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
          <Text style={styles.headerTitle}>Billing</Text>
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

        <Text style={styles.subGreeting}>
          You have one statement ready.{"\n"}Would you like to review or pay?
        </Text>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={10}
          onPress={() => navigation.navigate(navigationStrings.STATEMENT_DETAIL)}
        >
          <InnerShadowIcon
            icon={<BillingIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <View style={styles.cardMainText}>
            <Text style={styles.cardTitle}>Statements</Text>
            <Text style={styles.cardSubtitle}>1 Statement Ready</Text>
          </View>
          <View style={styles.statementRight}>
            <StatusDot color={COLORS.CRITICAL} size={16} text="1" />
            <RightArrowIcon width={10} height={10} />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={10}
        >
          <InnerShadowIcon
            icon={<MedicationRefillsIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <View style={styles.cardMainText}>
            <Text style={styles.cardTitle}>Pay Balance</Text>
          </View>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.balanceInsetOuter}
            contentStyle={styles.balanceInsetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.balanceAmount}>$86.00</Text>
          </NeumorphicInnerShadowCard>
          <RightArrowIcon width={10} height={10} />
        </NeumorphicCard>

        <View style={styles.halfRow}>
          <NeumorphicCard
            outerStyle={styles.halfOuter}
            innerStyle={styles.halfInner}
            borderRadius={10}
          >
            <InnerShadowIcon
              icon={<BillingIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.halfTextWrap}>
              <Text style={styles.halfTitle}>Payment Plan</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={styles.halfOuter}
            innerStyle={styles.halfInner}
            borderRadius={10}
          >
            <InnerShadowIcon
              icon={<InsuranceIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.halfTextWrap}>
              <Text style={styles.halfTitle}>Insurance{"\n"}& Eligibility</Text>
            </View>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Billing;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 120 },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  avatarWrap: { alignItems: "center", marginTop: 26 },
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
  avatar: { width: 124, height: 124, borderRadius: 115, resizeMode: "contain" },
  subGreeting: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardOuter: {
    marginTop: 18,
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  cardMainText: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  statementRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  balanceInsetOuter: {
    width: 78,
  },
  balanceInsetInner: {
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  halfRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 12,
  },
  halfOuter: {
    flex: 1,
    minWidth: 0,
  },
  halfInner: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },
  halfTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  halfTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
});
