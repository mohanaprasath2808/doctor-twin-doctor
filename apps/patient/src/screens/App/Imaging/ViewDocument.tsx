import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../constants/theme";
import IconComponent from "../../../neomorphism/IconComponent";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import PdfPreviewImage from "../../../assets/images/tempImage/dummyReport.png";

const ViewDocument = () => {
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
          <Text style={styles.headerTitle}>View PDF</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.previewWrap}>
          <Image source={PdfPreviewImage} style={styles.previewImage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewDocument;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  previewWrap: {
    marginTop: 50,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    maxWidth: 430,
    height: 530,
    resizeMode: "cover",
  },
});
