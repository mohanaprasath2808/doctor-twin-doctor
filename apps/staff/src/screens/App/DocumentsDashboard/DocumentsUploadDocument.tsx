import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import UploadIcon from "../../../assets/icon/uploadIcon.svg";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";
import { navigateDocumentsActionCompleted } from "./types/documentsFlowNavigation";

const BG = COLORS.INNER_SURFACE;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_UPLOAD>;

const DocumentsUploadDocument = ({ route, navigation }: Props) => {
  const { item } = route.params;
  const insets = useSafeAreaInsets();
  const [pickedName, setPickedName] = useState<string | null>(null);

  const bottomPad = Math.max(insets.bottom, 12) + 8;

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Upload Document</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  const pickDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
    if (!res.canceled && res.assets?.[0]) {
      setPickedName(res.assets[0].name ?? "Document");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.column}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.content, { paddingBottom: 16 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {header}

            <PatientDetailCard
              item={{ patientName: item.patientName, patientMeta: item.patientMeta }}
              useInitialsAvatar
              outerStyle={styles.patientCardOuter}
            />

            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.sectionTitle}>Attachments</Text>
              <Text style={styles.fieldLabel}>Document</Text>
              <NeumorphicCard
                borderRadius={12}
                backgroundColor={BG}
                outerStyle={styles.uploadDropOuter}
                innerStyle={styles.uploadDropContent}
              >
                <UploadIcon width={20} height={20} />
                <Text style={styles.uploadTitle}>{pickedName ?? "Upload document"}</Text>
                <AppButton
                  text="Upload"
                  width={120}
                  height={40}
                  borderRadius={20}
                  borderWidth={1}
                  borderColor={COLORS.PRIMARY}
                  bgColor={BG}
                  textStyle={styles.uploadOutlineText}
                  onPress={pickDocument}
                />
              </NeumorphicCard>
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Upload"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigateDocumentsActionCompleted(navigation, {
                  title: "Upload Successfully",
                  description: "The document has been uploaded successfully.",
                  buttonText: "Back to Dashboard",
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DocumentsUploadDocument;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  keyboardRoot: { flex: 1 },
  column: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, flexGrow: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 10,
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
  patientCardOuter: { marginTop: 4 },
  sectionOuter: { width: "100%", marginTop: 14 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 14 },
  sectionTitle: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  uploadDropOuter: { width: "100%", marginTop: 0 },
  uploadDropContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 10,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
  uploadOutlineText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
