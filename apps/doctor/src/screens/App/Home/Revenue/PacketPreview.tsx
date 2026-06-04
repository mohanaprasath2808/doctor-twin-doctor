import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import AppButton from "../../../../components/Common/AppButton";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";

const VISIT_NOTE =
  "Patient presented with complaints of hypertension. Vital signs reviewed and medication adjusted. Follow-up scheduled in 4 weeks. Patient counseled on diet and exercise modifications.";

const SUPPORTING_DOCS = [
  { id: "1", name: "Visit_Note.pdf", size: "245 KB" },
  { id: "2", name: "Lab_Report.pdf", size: "245 KB" },
];

const PacketPreview = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Packet Preview</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Visit Note</Text>
          <NeumorphicInnerShadowCard
            borderRadius={10}
            containerStyle={styles.insetOuter}
            contentStyle={styles.insetInner}
          >
            <Text style={styles.insetText}>{VISIT_NOTE}</Text>
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>CPT Codes</Text>
          <View style={styles.codeRow}>
            <InnerShadowIcon size={44} radius={22} icon={<LabReportIcon width={18} height={18} />} />
            <View style={styles.codeTextCol}>
              <Text style={styles.codeValue}>99214</Text>
              <Text style={styles.codeLabel}>Office Visit – Established Patient</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>ICD Codes</Text>
          <View style={styles.codeRow}>
            <InnerShadowIcon size={44} radius={22} icon={<LabReportIcon width={18} height={18} />} />
            <View style={styles.codeTextCol}>
              <Text style={styles.codeValue}>I10</Text>
              <Text style={styles.codeLabel}>Essential (primary) hypertension</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.sectionInner} borderRadius={14}>
          <Text style={styles.sectionTitle}>Supporting documents</Text>
          {SUPPORTING_DOCS.map((doc, index) => (
            <View key={doc.id}>
              <View style={styles.docRow}>
                <InnerShadowIcon size={40} radius={20} icon={<LabReportIcon width={18} height={18} />} />
                <View style={styles.docTextCol}>
                  <Text style={styles.docName}>{doc.name}</Text>
                  <Text style={styles.docSize}>{doc.size}</Text>
                </View>
                <Pressable>
                  <View style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View</Text>
                  </View>
                </Pressable>
              </View>
              {index < SUPPORTING_DOCS.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            text="Send to Billing"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.SUBMIT_CLAIM)}
          />
          <AppButton
            text="Add Document"
            fullWidth={false}
            width="48%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.outlineBtnText}
            onPress={() => navigation.navigate(navigationStrings.UPLOAD_DOCUMENTS)}
          />
        </View>

        <ReusableButton
          title="Confirm & Export PDF"
          height={48}
          borderRadius={24}
          containerStyle={styles.exportBtn}
          onPress={() => navigation.navigate(navigationStrings.REVENUE_PDF_PREVIEW)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PacketPreview;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  cardOuter: {
    width: "100%",
    marginBottom: 14,
  },
  sectionInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  insetOuter: {
    width: "100%",
  },
  insetInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  insetText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 20,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  codeTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  codeValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  codeLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  docTextCol: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  docName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  docSize: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  viewBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  viewBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
    marginVertical: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
    lineHeight: 18,
  },
  exportBtn: {
    marginTop: 12,
    width: "100%",
  },
});
