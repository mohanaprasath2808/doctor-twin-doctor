import React, { useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import LabResultsIcon from "../../../assets/icons/labResults.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

export type LabResultDetailParams = {
  id: string;
  name: string;
  value: string;
  date: string;
  status: "normal" | "abnormal" | "critical";
};

const statusBadgeLabel = (status: LabResultDetailParams["status"]): string => {
  if (status === "normal") return "Normal";
  if (status === "critical") return "Critical";
  return "Abnormal";
};

const statusBadgePalette = (status: LabResultDetailParams["status"]) => {
  if (status === "normal") {
    return {
      bgColor: COLORS.SUCCESS_BG,
      textColor: COLORS.SUCCESS,
      darkShadowColor: "rgba(16, 185, 129, 0.35)",
    };
  }
  if (status === "critical") {
    return {
      bgColor: "#FFE4E4",
      textColor: "#C53030",
      darkShadowColor: "rgba(197, 48, 48, 0.35)",
    };
  }
  return {
    bgColor: COLORS.CRITICAL_BG,
    textColor: COLORS.CRITICAL,
    darkShadowColor: "rgba(255, 107, 107, 0.45)",
  };
};

const defaultNormalRange = (name: string): string => {
  switch (name) {
    case "Cholesterol":
      return "0 – 200";
    case "LDL Cholesterol":
      return "0 – 100";
    case "Vitamin D":
      return "30 – 100";
    case "Hemoglobin A1C":
      return "4.0 – 5.6";
    case "Triglycerides":
      return "0 – 150";
    default:
      return "—";
  }
};

const defaultExplanation = (name: string, status: LabResultDetailParams["status"]): string => {
  const topic = name.toLowerCase();
  if (status === "normal") {
    return `This means your ${topic} is within the expected range for most people.`;
  }
  if (status === "critical") {
    return `This result for ${topic} is significantly outside the expected range. Please follow up with your care team.`;
  }
  if (name === "Cholesterol") {
    return "This means your cholesterol is elevated, which may increase heart risk.";
  }
  return `This means your ${topic} is outside the normal range. Your doctor can explain what it means for you.`;
};

const buildSummary = (name: string, value: string, status: LabResultDetailParams["status"]) => {
  const main = value.split(" ")[0] ?? value;
  const topic = name.toLowerCase();
  if (status === "normal") {
    return `Your ${topic} is ${main}, which is in the normal range.`;
  }
  if (status === "critical") {
    return `Your ${topic} is ${main}, which is critically outside the normal range.`;
  }
  return `Your ${topic} is ${main}, which is higher than normal.`;
};

const LabResultDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const raw = (route.params ?? {}) as Partial<LabResultDetailParams>;
  const p: LabResultDetailParams = {
    id: raw.id ?? "—",
    name: raw.name ?? "Result",
    value: raw.value ?? "—",
    date: raw.date ?? "",
    status: raw.status ?? "normal",
  };

  const [normalRange, setNormalRange] = useState(() => defaultNormalRange(p.name));
  const [explanation, setExplanation] = useState(() => defaultExplanation(p.name, p.status));

  const palette = statusBadgePalette(p.status);
  const badgeLabel = statusBadgeLabel(p.status);
  const summary = useMemo(
    () => buildSummary(p.name, p.value, p.status),
    [p.name, p.value, p.status],
  );

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
          <Text style={styles.headerTitle}>Lab Result detail</Text>
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

        <Text style={styles.summary}>{summary}</Text>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.cardInner}
          borderRadius={12}
        >
          <View style={styles.cardRow}>
            <InnerShadowIcon icon={<LabResultsIcon width={18} height={18} />} size={40} radius={114} />
            <View style={styles.cardCenter}>
              <Text style={styles.testName}>{p.name}</Text>
              <Text style={styles.testValue}>{p.value}</Text>
            </View>
            <View style={styles.badgeWrap}>
              <DeltaBadge
                value={badgeLabel}
                bgColor={palette.bgColor}
                darkShadowColor={palette.darkShadowColor}
                textColor={palette.textColor}
                height={24}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.fieldLabel}>Normal range</Text>
          <NeumorphicInnerShadowCard
            borderRadius={50}
            containerStyle={styles.insetOuter}
            contentStyle={styles.insetInner}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          >
            <TextInput
              value={normalRange}
              onChangeText={setNormalRange}
              style={styles.rangeText}
              placeholder="Normal range"
              placeholderTextColor={COLORS.TEXT_40}
            />
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <View>
          <NeumorphicCard
            outerStyle={[styles.cardOuter, { marginTop: 20 }]}
            innerStyle={styles.explainCardInner}
            borderRadius={12}
          >
            <Text style={styles.previewTitle}>Simple Explanation</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.messageOuter}
              contentStyle={styles.messageInner}
              darkShadowColor={COLORS.DARK_SHADOW}
              lightShadowColor={COLORS.LIGHT_SHADOW}
            >
              <TextInput
                value={explanation}
                onChangeText={setExplanation}
                multiline
                style={styles.messageText}
                placeholder="Explanation"
                placeholderTextColor={COLORS.TEXT_40}
                textAlignVertical="top"
              />
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>
        </View>

        <View style={styles.footerActions}>
          <View style={styles.actionRow}>
            <AppButton
              text="Repeat Lab"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => undefined}
            />
            <ReusableButton
              title="Schedule Follow-up"
              containerStyle={styles.actionBtn}
              textStyle={styles.primaryText}
              onPress={() => undefined}
            />
          </View>
          <View style={styles.actionRow}>
            <AppButton
              text="Lifestyle Guidance"
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.secondaryText}
              style={styles.actionBtn}
              onPress={() => undefined}
            />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginTop: 30,
  },
  avatarWrapper: {
    width: 240,
    height: 240,
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
    width: 150,
    height: 150,
    borderRadius: 115,
    resizeMode: "contain",
  },
  summary: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  cardOuter: { width: "100%", marginTop: 30 },
  cardInner: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  explainCardInner: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCenter: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
    justifyContent: "center",
  },
  testName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  testValue: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_80,
  },
  badgeWrap: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 12,
  },
  fieldLabel: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  previewTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
  },
  insetOuter: { marginTop: 10 },
  insetInner: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  rangeText: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
  },
  messageOuter: { marginTop: 10 },
  messageInner: {
    padding: 14,
    minHeight: 100,
  },
  messageText: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
  },
  footerActions: {
    marginTop: 24,
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
  primaryText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default LabResultDetail;
