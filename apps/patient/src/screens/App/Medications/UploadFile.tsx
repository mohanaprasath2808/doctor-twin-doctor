import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DocumentUploadField from "../../../components/Common/DocumentUploadField";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

const UploadFile = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Upload File</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>Upload your document here</Text>

        <DocumentUploadField containerStyle={styles.fieldGap} onUploadPress={() => undefined} />

        <DocumentUploadField onUploadPress={() => undefined} />
      </ScrollView>

      <View style={styles.footer}>
        <ReusableButton
          title="Upload"
          gradientColors={REUSABLE_GRADIENT}
          height={48}
          borderRadius={24}
          width="100%"
          containerStyle={styles.submitBtn}
          onPress={() => undefined}
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadFile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: {
    flex: 1,
    ...TEXT.screenTitle,
    color: COLORS.TEXT_PRIMARY,
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
    paddingHorizontal: HORIZONTAL,
    paddingBottom: 16,
  },
  intro: {
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY_70,
    marginBottom: 16,
  },
  fieldGap: {
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: HORIZONTAL,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 12 : 8,
    backgroundColor: COLORS.SURFACE,
  },
  submitBtn: {
    alignSelf: "stretch",
  },
});
