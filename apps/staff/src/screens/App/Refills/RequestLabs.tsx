import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import PadEcgIcon from "../../../assets/icon/padEcg.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import NeumorphicCheckboxMark from "../../../components/Common/NeumorphicCheckboxMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const REQUIRED_LABS = ["ALT / AST", "Potassium", "Serum Creatinine"];

const RequestLabs = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedLabs, setSelectedLabs] = useState<Record<string, boolean>>({
    "ALT / AST": true,
    Potassium: false,
    "Serum Creatinine": false,
  });

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  const toggleLab = (lab: string) => {
    setSelectedLabs((prev) => ({ ...prev, [lab]: !prev[lab] }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 198 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Request Labs</Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={[styles.sectionOuter, { marginTop: 20 }]}
            innerStyle={styles.requiredLabsInner}
          >
            <Text style={styles.sectionTitle}>Required Labs</Text>
            {REQUIRED_LABS.map((lab, index) => (
              <View key={lab}>
                <Pressable style={styles.labRow} onPress={() => toggleLab(lab)}>
                  <NeumorphicCheckboxMark selected={selectedLabs[lab]} />
                  <Text style={styles.labText}>{lab}</Text>
                </Pressable>
                {index !== REQUIRED_LABS.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))}
          </NeumorphicCard>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.orderLabsInner}
          >
            <View style={styles.orderHeader}>
              <DoctorAvatar source={DoctorTempImage} imageSize={44} containerSize={50} />
              <View style={styles.orderTextCol}>
                <Text style={styles.orderTitle}>Order Labs</Text>
                <NeumorphicInnerShadowCard
                  fullWidth={false}
                  borderRadius={16}
                  containerStyle={styles.orderPillOuter}
                  contentStyle={styles.orderPillInner}
                  darkShadowColor={COLORS.DARK_SHADOW}
                  lightShadowColor={COLORS.LIGHT_SHADOW}
                >
                  <View style={styles.orderPillRow}>
                    <PadEcgIcon width={12} height={12} />
                    <Text style={styles.orderPillText}>Order Labs</Text>
                  </View>
                </NeumorphicInnerShadowCard>
              </View>
              <DeltaBadge
                value="Routine"
                height={30}
                radius={15}
                bgColor="#FFF8D9"
                textColor="#D49A1E"
                darkShadowColor="#F0E2A6"
                lightShadowColor="#FFFFFF99"
                textStyle={styles.badgeText}
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.orderBody}>Labs required before safe refill</Text>
            <Text style={styles.orderBody}>Last potassium levels 4 months old</Text>
          </NeumorphicCard>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <View style={styles.footerGrid}>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={48}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Order Labs"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={48}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Notify Patient"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={48}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Schedule visit"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={48}
              borderRadius={25}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.INNER_SURFACE}
              text="Assign"
              textStyle={styles.outlineButtonText}
              onPress={() => { }}
            />
          </View>
        </View>
        <ReusableButton
          title="Send Message"
          height={48}
          borderRadius={25}
          width="100%"
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          onPress={() => { }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RequestLabs;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { paddingBottom: 8 },
  container: { paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  sectionOuter: { width: "100%", marginBottom: 20 },
  requiredLabsInner: { paddingHorizontal: 10, paddingTop: 12, paddingBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "500", fontFamily: "SF-Pro-Display-Semibold", color: COLORS.TEXT_DARK },
  labRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  labText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  orderLabsInner: { paddingHorizontal: 10, paddingVertical: 14 },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  orderTextCol: {
    flex: 1,
    minWidth: 0,
  },
  orderTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 6,
  },
  orderPillOuter: {
    alignSelf: "flex-start",
  },
  orderPillInner: {
    minHeight: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
  },
  orderPillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  orderPillText: {
    color: COLORS.TEXT_DARK,
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  badgeText: { fontSize: 12, fontWeight: "600", fontFamily: "SF-Pro-Display-Semibold" },
  orderBody: {
    marginTop: 14,
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 18,
  },
  footerHalf: {
    width: "47.5%",
    minWidth: 0,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
