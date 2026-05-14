import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import StaffRadioListInCard, { type StaffRadioListRowModel } from "../../../components/Common/StaffRadioListInCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import { navigateDocumentsActionCompleted } from "./documentsFlowNavigation";

const BG = COLORS.INNER_SURFACE;

const STAFF_ROWS: StaffRadioListRowModel[] = [
  { id: "eva", name: "Dr. Eva", avatarSource: DoctorTempImage },
  { id: "jenn", name: "Jenn P", subtitle: "Office manager", avatarSource: DoctorTempImage },
  { id: "annie-dr", name: "Dr. Annie", avatarSource: DoctorTempImage },
  { id: "annie-ma", name: "Annie", subtitle: "Medical Assistant", avatarSource: DoctorTempImage },
];

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_ASSIGN>;

const DocumentsAssign = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(STAFF_ROWS[0].id);
  const [notes, setNotes] = useState("");

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
        <Text style={styles.headerTitle}>Assign</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

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

            <StaffRadioListInCard staffList={STAFF_ROWS} selectedId={selectedId} onSelectId={setSelectedId} />

            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.notesOuter} innerStyle={styles.notesInner}>
              <Text style={styles.notesTitle}>Your Notes</Text>
              <InputField
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                minHeight={100}
                borderRadius={10}
                isFocused={false}
                containerStyle={styles.notesInput}
                placeholder="Enter notes"
              />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Assign Task"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigateDocumentsActionCompleted(navigation, {
                  title: "Assigned Successfully",
                  description: "The document task has been assigned successfully.",
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

export default DocumentsAssign;

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
    marginBottom: 14,
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
  notesOuter: { width: "100%", marginTop: 16 },
  notesInner: { paddingHorizontal: 12, paddingVertical: 14 },
  notesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 8,
  },
  notesInput: { marginTop: 0 },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
