import React, { useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DocumentsMissingInfoBottomSheetModal from "../../../components/BottomSheets/DocumentsMissingInfoBottomSheetModal";
import {
  ChannelCheckboxRows,
  createDefaultChannelSelection,
  type ChannelSelectionState,
  type DocumentChannelId,
} from "../../../components/Common/ChannelCheckboxRows";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InputField from "../../../components/neomorphism/InputField";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import PatientDetailCard from "../../../components/Common/PatientDetailCard";
import { navigateDocumentsActionCompleted } from "./documentsFlowNavigation";

const BG = COLORS.INNER_SURFACE;

type Props = NativeStackScreenProps<AppStackParamList, typeof navigationStrings.DOCUMENTS_REQUEST_INFO>;

const DocumentsRequestInfo = ({ route, navigation }: Props) => {
  const { item } = route.params;
  const insets = useSafeAreaInsets();
  const missingSheetRef = useRef<BSModal>(null);
  const [missingInfo, setMissingInfo] = useState<string | null>(null);
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
        <Text style={styles.headerTitle}>Request Info</Text>
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

            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner}>
              <Text style={styles.fieldLabel}>Missing info</Text>
              <Pressable onPress={() => missingSheetRef.current?.present()}>
                <View pointerEvents="none">
                  <InputField
                    value={missingInfo ?? ""}
                    editable={false}
                    placeholder="Select missing info"
                    rightIcon={<MaterialCommunityIcons name="chevron-down" size={20} color={COLORS.TEXT_60} />}
                    borderRadius={64}
                    height={46}
                    isFocused={false}
                    containerStyle={styles.inputNoTop}
                  />
                </View>
              </Pressable>

              <Text style={[styles.fieldLabel, styles.fieldLabelSpaced]}>Message</Text>
              <InputField
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                minHeight={110}
                borderRadius={10}
                isFocused={false}
                containerStyle={styles.inputNoTop}
                placeholder="Write message"
              />
            </NeumorphicCard>

            <Text style={styles.outsideChannelTitle}>Channel</Text>
            <NeumorphicCard borderRadius={12} backgroundColor={BG} outerStyle={styles.channelCardOuter} innerStyle={styles.channelCardInner}>
              <ChannelCheckboxRows channels={channels} onToggle={toggleChannel} />
            </NeumorphicCard>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: bottomPad }]}>
            <ReusableButton
              title="Send Request"
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() =>
                navigateDocumentsActionCompleted(navigation, {
                  title: "Request sent",
                  description: "Your information request has been sent to the patient.",
                  buttonText: "Back to Dashboard",
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <DocumentsMissingInfoBottomSheetModal
        ref={missingSheetRef}
        selectedValue={missingInfo}
        onSelectDone={setMissingInfo}
      />
    </SafeAreaView>
  );
};

export default DocumentsRequestInfo;

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
  fieldLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 6,
  },
  fieldLabelSpaced: { marginTop: 14 },
  inputNoTop: { marginTop: 0 },
  outsideChannelTitle: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  channelCardOuter: { width: "100%", marginTop: 0 },
  channelCardInner: { paddingHorizontal: 12, paddingVertical: 4 },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
});
