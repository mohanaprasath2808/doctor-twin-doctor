import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import LabClipboardIcon from "../../../assets/icons/labClipboard.svg";
import TickIcon from "../../../assets/icons/tickIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const ProblemDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const title = route?.params?.title ?? "Hypertension";
  const since = route?.params?.since ?? "23 Jan 2020";

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
          <Text style={styles.headerTitle}>Problem Detail</Text>
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

        <Text style={styles.heroText}>You have hypertension. I’ll help you{"\n"}manage it.</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <View style={styles.topRow}>
            <InnerShadowIcon
              icon={<LabClipboardIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.itemTextWrap}>
              <Text style={styles.itemTitle}>{title}</Text>
              <Text style={styles.itemSub}>Diagnosed: {since}</Text>
            </View>
            <DeltaBadge
              value="Active"
              bgColor="#D3FFF1"
              darkShadowColor="rgba(16, 185, 129, 0.35)"
              textColor="#10B981"
              height={26}
            />
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Latest BP</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.insetOuter}
            contentStyle={styles.bpInsetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.bpValue}>140 / 90</Text>
            <Text style={styles.bpDate}>20 April 2025</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Description</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.insetOuter}
            contentStyle={styles.descInsetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.descText}>
              This means your blood pressure is higher than normal, which can affect your heart over time.
            </Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Current Management</Text>
          <View style={styles.managementRow}>
            <InnerShadowIcon
              icon={<TickIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.managementText}>Taking medication</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.managementRow}>
            <InnerShadowIcon
              icon={<TickIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.managementText}>Monitoring BP regularly</Text>
          </View>
        </NeumorphicCard>

        <View style={styles.bottomActions}>
          <View style={styles.btnHalf}>
            <AppButton
              text="Message Doctor"
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
              title="Schedule Follow-up"
              containerStyle={styles.actionBtn}
              onPress={() => undefined}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProblemDetail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  headerSpacer: { width: 40, height: 40 },
  avatarWrap: { alignItems: "center", marginTop: 20 },
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
  heroText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardOuter: { marginTop: 18, width: "100%" },
  cardGap: { marginTop: 14 },
  cardInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  itemSub: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  insetOuter: { marginTop: 10 },
  bpInsetInner: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bpValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  bpDate: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  descInsetInner: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  managementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  managementText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  bottomActions: {
    marginTop: 18,
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
