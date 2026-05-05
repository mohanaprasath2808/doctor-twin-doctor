import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import ReferralIcon from "../../../assets/icons/referral.svg";

const FORMS = [
  { title: "School Form", subtitle: "Required for admission" },
  { title: "Work Note", subtitle: "Sick leave documentation" },
  { title: "Physical Exam Form", subtitle: "" },
];

const FormsLibrary = () => {
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
          <Text style={styles.headerTitle}>Forms Library</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.cardsBlock}>
          {FORMS.map((item) => (
            <NeumorphicCard
              key={item.title}
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={10}
            >
              <InnerShadowIcon
                icon={<ReferralIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.subtitle ? <Text style={styles.cardSubtitle}>{item.subtitle}</Text> : null}
              </View>
              <AppButton
                text="Download"
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                textStyle={styles.downloadText}
                style={styles.downloadBtn}
                onPress={() => undefined}
              />
            </NeumorphicCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormsLibrary;

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
  cardsBlock: {
    marginTop: 18,
    gap: 12,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    minHeight: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  cardTextWrap: {
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
  downloadBtn: {
    width: 92,
    height: 36,
    borderRadius: 18,
  },
  downloadText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
});
