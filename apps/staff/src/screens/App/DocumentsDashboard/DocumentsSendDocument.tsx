import React, { useMemo, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import ZoomIcon from "../../../assets/icon/zoomIn.svg";
import DummyReportImage from "../../../assets/image/tempImage/dummyReport.png";
import {
  ChannelCheckboxRows,
  createDefaultChannelSelection,
  type ChannelSelectionState,
  type DocumentChannelId,
} from "../../../components/Common/ChannelCheckboxRows";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";
import { navigateDocumentsActionCompleted } from "./documentsFlowNavigation";

const BG = COLORS.INNER_SURFACE;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_SEND>;

const DocumentsSendDocument = ({ route, navigation }: Props) => {
  const { item } = route.params;
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState<ChannelSelectionState>(createDefaultChannelSelection());

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
        <Text style={styles.headerTitle}>Send document</Text>
        <View style={styles.headerSpacer} />
      </View>
    ),
    [navigation],
  );

  const toggleChannel = (id: DocumentChannelId) => {
    setChannels((prev) => ({ ...prev, [id]: !prev[id] }));
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


            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.previewCardInner}>
              <Text style={styles.blockHeading}>Preview</Text>
              <View style={styles.previewWrap}>
                <NeumorphicInnerShadowCard
                  borderRadius={12}
                  backgroundColor={COLORS.SURFACE}
                  containerStyle={styles.previewInnerOuter}
                  contentStyle={styles.previewInnerContent}
                  darkShadowColor={"#C1D5EE"}
                  lightShadowColor={"#FFFFFFE0"}
                  fullWidth
                >
                  <Image source={DummyReportImage} style={styles.previewImage} resizeMode="contain" />
                </NeumorphicInnerShadowCard>
                <View style={styles.zoomBtnWrap} pointerEvents="box-none">
                  <IconComponent
                    icon={<ZoomIcon width={16} height={16} />}
                    width={36}
                    height={36}
                    radius={18}
                    onPress={() => navigation.navigate(navigationStrings.DOCUMENTS_VIEW_DOCUMENT)}
                  />
                </View>
              </View>
            </NeumorphicCard>

            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.sectionTitle}>Message</Text>
              <InputField
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                minHeight={110}
                borderRadius={10}
                isFocused={false}
                containerStyle={styles.inputNoTop}
                placeholder="Sharing your document..."
              />
            </NeumorphicCard>

            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.sectionTitle}>Channel</Text>
              <ChannelCheckboxRows channels={channels} onToggle={toggleChannel} />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Send Message"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigateDocumentsActionCompleted(navigation, {
                  title: "Send Successfully",
                  description: "Document has been sent to the patient successfully.",
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

export default DocumentsSendDocument;

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
  blockHeading: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  sectionOuter: { width: "100%", marginTop: 14 },
  sectionInner: { paddingHorizontal: 12, paddingVertical: 14 },
  previewCardInner: { paddingHorizontal: 12, paddingVertical: 12 },
  previewWrap: { position: "relative", width: "100%" },
  previewInnerOuter: { width: "100%" },
  previewInnerContent: { paddingHorizontal: 8, paddingVertical: 8 },
  previewImage: { width: "100%", height: 220, borderRadius: 8 },
  zoomBtnWrap: { position: "absolute", right: 4, top: 4 },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  inputNoTop: { marginTop: 0 },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
