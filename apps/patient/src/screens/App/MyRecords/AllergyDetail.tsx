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
import WarningTealIcon from "../../../assets/icons/warningTeal.svg";
import TickIcon from "../../../assets/icons/tickIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const paletteForSeverity = (severity: "moderate" | "severe" | "mild") => {
  if (severity === "moderate") {
    return {
      value: "Moderate",
      bgColor: "#FFF6D9",
      textColor: "#D6AD3D",
      darkShadowColor: "rgba(214, 173, 61, 0.35)",
    };
  }
  if (severity === "severe") {
    return {
      value: "Severe",
      bgColor: "#FFE4E4",
      textColor: "#D87474",
      darkShadowColor: "rgba(216, 116, 116, 0.35)",
    };
  }
  return {
    value: "Mild",
    bgColor: "#E9EAED",
    textColor: "#6F6F6F",
    darkShadowColor: "rgba(111, 111, 111, 0.2)",
  };
};

const AllergyDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const title = route?.params?.title ?? "Penicillin";
  const reaction = route?.params?.reaction ?? "Rash";
  const severity = (route?.params?.severity ?? "moderate") as "moderate" | "severe" | "mild";
  const palette = paletteForSeverity(severity);

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
          <Text style={styles.headerTitle}>Allergy Detail Screen</Text>
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

        <Text style={styles.heroText}>You’re allergic to penicillin. I’ll help{"\n"}you stay safe.</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <InnerShadowIcon
            icon={<WarningTealIcon width={18} height={18} />}
            size={40}
            radius={20}
            surfaceColor={COLORS.INNER_SURFACE}
          />
          <View style={styles.itemTextWrap}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSub}>Reaction: {reaction}</Text>
          </View>
          <DeltaBadge
            value={palette.value}
            bgColor={palette.bgColor}
            darkShadowColor={palette.darkShadowColor}
            textColor={palette.textColor}
            height={26}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>What It Means</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.insetOuter}
            contentStyle={styles.descInsetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <Text style={styles.descText}>
              This medication may cause an allergic reaction, so it should be avoided.
            </Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Safety Info</Text>
          <View style={styles.infoRow}>
            <InnerShadowIcon
              icon={<TickIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.infoText}>Avoid penicillin-based drugs</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <InnerShadowIcon
              icon={<TickIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.infoText}>Inform all healthcare providers</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.cardGap]} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Emergency Guidance</Text>
          <View style={styles.infoRow}>
            <InnerShadowIcon
              icon={<WarningTealIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.infoText}>Difficulty breathing</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <InnerShadowIcon
              icon={<WarningTealIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.infoText}>Swelling of face/lips</Text>
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
              title="Update Allergy Info"
              containerStyle={styles.actionBtn}
              onPress={() => undefined}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllergyDetail;

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
  itemTextWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 10,
    marginRight: 10,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  insetOuter: { marginTop: 10 },
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
  infoRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginTop: 10,
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
