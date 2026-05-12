import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../assets/icon/backArrow.svg";

const AddDiagnosis = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [diagnosis, setDiagnosis] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.root}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
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
              <Text style={styles.headerTitle}>Add Diagnosis</Text>
              <View style={styles.headerSpacer} />
            </View>

            <Text style={styles.fieldLabel}>Diagnosis</Text>
            <InputField
              value={diagnosis}
              onChangeText={setDiagnosis}
              placeholder="Hypertension"
              multiline
              minHeight={160}
              borderRadius={12}
              containerStyle={styles.inputTight}
            />
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Save"
              height={52}
              borderRadius={26}
              containerStyle={styles.cta}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddDiagnosis;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  flex: { flex: 1 },
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_70,
    marginTop: 16,
  },
  inputTight: {
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.TEXT_10,
  },
  cta: {},
});
