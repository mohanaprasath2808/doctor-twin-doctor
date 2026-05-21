import React from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DummyReportImage from "../../../assets/image/tempImage/dummyReport.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

/**
 * Full-screen document preview (mirrors patient `ViewDocument`: safe area, scroll, back-only header, large image).
 */
type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_VIEW_DOCUMENT>;

const DocumentsViewDocument = ({ navigation }: Props) => (
  <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <IconComponent
          icon={<BackArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.previewWrap}>
        <Image source={DummyReportImage} style={styles.previewImage} resizeMode="cover" />
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default DocumentsViewDocument;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
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
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  previewWrap: {
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  previewImage: {
    width: "100%",
    maxWidth: 430,
    height: 530,
  },
});
