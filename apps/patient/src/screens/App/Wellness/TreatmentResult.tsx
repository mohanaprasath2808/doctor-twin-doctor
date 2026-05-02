import React, { useMemo } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import BeforeAfterTreatmentCard from "./components/BeforeAfterTreatmentCard";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import WellnessIcon from "../../../assets/icons/wellness.svg";
import WarningTealIcon from "../../../assets/icons/warningTeal.svg";

const TreatmentResult = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const treatmentTitle = useMemo(
    () => route?.params?.treatment?.title ?? "Juvederm Lip Fillers",
    [route?.params?.treatment?.title],
  );
  const treatmentSubtitle = useMemo(
    () => route?.params?.treatment?.subtitle ?? "Fuller Lips",
    [route?.params?.treatment?.subtitle],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Treatment Result</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.treatmentResultOuter}>
            <BeforeAfterTreatmentCard
              title={treatmentTitle}
              subtitle={treatmentSubtitle}
              showAction={false}
              showLabels
            />

          </View>

          <NeumorphicCard outerStyle={styles.infoOuter} innerStyle={styles.infoInner} borderRadius={12}>
            <InnerShadowIcon icon={<WellnessIcon width={18} height={18} />} size={40} radius={20} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>{treatmentTitle}</Text>
              <Text style={styles.infoSubtitle}>{treatmentSubtitle}</Text>
            </View>
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner} borderRadius={12}>
            <Text style={styles.sectionTitle}>Description</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.insetOuter}
              contentStyle={styles.insetInner}
            >
              <Text style={styles.descriptionText}>Enhances lip volume naturally.</Text>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.noticeOuter} innerStyle={styles.noticeInner} borderRadius={12}>
            <InnerShadowIcon icon={<WarningTealIcon width={16} height={16} />} size={40} radius={20} />
            <Text style={styles.noticeText}>
              <Text style={styles.noticeStrong}>Results may vary</Text> (consent notice)
            </Text>
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.footer}>
          <ReusableButton
            title="Book This Treatment"
            height={48}
            borderRadius={25}
            width="100%"
            gradientColors={["#22D3EE", "#0F766E"]}
            onPress={() =>
              navigation.navigate(navigationStrings.BOOK_APPOINTMENT, {
                treatment: { title: treatmentTitle },
                backRouteName: navigationStrings.BEFORE_AFTER_GALLERY,
                backButtonLabel: "Back to Gallery",
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
  },
  infoOuter: {
    marginTop: 18,
  },
  infoInner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  infoSubtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  sectionOuter: {
    marginTop: 14,
  },
  sectionInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 32 / 2,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  insetOuter: {
    marginTop: 10,
  },
  insetInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  descriptionText: {
    fontSize: 31 / 2,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  noticeOuter: {
    marginTop: 18,
  },
  noticeInner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  noticeStrong: {
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    paddingTop: 8,
  },
  treatmentResultOuter: {
    marginTop: 30,
  },
});

export default TreatmentResult;
