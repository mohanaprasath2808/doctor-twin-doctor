import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import FaceScanIcon from "../../../../assets/icon/faceScanIcon.svg";
import RightArrow from "../../../../assets/icon/rightArrow.svg";
import UploadIcon from "../../../../assets/icon/uploadIcon.svg";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type UploadOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const UPLOAD_OPTIONS: UploadOption[] = [
  { id: "camera", label: "Camera Scan", icon: <FaceScanIcon width={20} height={20} /> },
  { id: "file", label: "Upload File", icon: <UploadIcon width={20} height={20} /> },
];

const UploadDocuments = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Upload Documents</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {UPLOAD_OPTIONS.map((option) => (
          <NeumorphicCard
            key={option.id}
            outerStyle={styles.optionOuter}
            innerStyle={styles.optionInner}
            borderRadius={14}
            onPress={() => {}}
          >
            <View style={styles.optionRow}>
              <InnerShadowIcon size={44} radius={22} icon={option.icon} />
              <Text style={styles.optionLabel}>{option.label}</Text>
              <RightArrow width={10} height={10} style={styles.chevron} />
            </View>
          </NeumorphicCard>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <ReusableButton
          title="Attach & Continue"
          height={52}
          borderRadius={26}
          containerStyle={styles.continueBtn}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadDocuments;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Bold",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
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
    paddingBottom: 16,
    gap: 12,
  },
  optionOuter: {
    width: "100%",
  },
  optionInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  chevron: {
    opacity: 0.6,
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
  },
  continueBtn: {
    width: "100%",
  },
});
