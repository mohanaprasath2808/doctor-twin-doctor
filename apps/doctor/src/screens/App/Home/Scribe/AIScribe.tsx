import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrowIcon from "../../../../assets/icon/downArrow.svg";
import ProfileIcon from "../../../../assets/icon/profile.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import PatientTempImage from "../../../../assets/image/tempImage/fakeID.png";
import { COLORS } from "../../../../constants/theme";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import SelectSearchSheet, {
  SelectSearchSheetItem,
} from "../../../../components/BottomSheets/SelectSearchSheet";
import IconComponent from "../../../../neomorphism/IconComponent";
import InputField from "../../../../neomorphism/InputField";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import navigationStrings from "../../../../constants/navigationStrings";

const LANGUAGE_OPTIONS: SelectSearchSheetItem[] = [
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "ja", label: "Japanese" },
  { id: "fr", label: "French" },
];

const MOCK_CHAT = {
  assistant:
    "Certainly, Dr.Soliman, I'll assign this refill request for you. Who would you like me to send it to?",
  patient:
    "He tenido dolor en el pecho y a veces siento falta de aire.",
};

const AIScribe = () => {
  const navigation = useNavigation<any>();
  const languageSheetRef = useRef<BSModal>(null);

  const [patientName, setPatientName] = useState("");
  const [languageId, setLanguageId] = useState("es");
  const [isCapturing, setIsCapturing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const languageLabel = useMemo(
    () => LANGUAGE_OPTIONS.find((l) => l.id === languageId)?.label ?? "Spanish",
    [languageId],
  );

  const handleLanguageConfirm = useCallback((id: string) => {
    setLanguageId(id);
  }, []);

  const renderLanguageField = () => (
    <Pressable onPress={() => languageSheetRef.current?.present()}>
      <View pointerEvents="none">
        <InputField
          value={languageLabel}
          editable={false}
          rightIcon={<DownArrowIcon width={12} height={12} />}
          containerStyle={styles.inputNoTopSpace}
          minHeight={46}
          borderRadius={64}
        />
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
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
          <Text style={styles.headerTitle}>AI Scribe</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        {!isCapturing ? (
          <>
            <Text style={styles.fieldLabel}>Patient Name</Text>
            <InputField
              placeholder="Enter Patient Name"
              value={patientName}
              onChangeText={setPatientName}
              leftIcon={<ProfileIcon width={18} height={18} />}
              containerStyle={styles.inputNoTopSpace}
              minHeight={46}
              borderRadius={64}
            />
          </>
        ) : (
          <>
            {renderLanguageField()}

            <View style={styles.chatSection}>
              <View style={styles.assistantRow}>
                <InsightMessageCard
                  style={styles.assistantBubble}
                  title={MOCK_CHAT.assistant}
                  subTitle=""
                  bgColor="#CBF0FF"
                  titleStyle={styles.assistantText}
                  subTitleStyle={styles.assistantTextHidden}
                  titleSubTitleGap={0}
                />
                <DoctorAvatar
                  source={DoctorTempImage}
                  imageSize={38}
                  containerSize={44}
                />
              </View>

              <View style={styles.patientRow}>
                <Image source={PatientTempImage} style={styles.patientAvatar} resizeMode="cover" />
                <NeumorphicCard
                  outerStyle={styles.patientBubbleOuter}
                  innerStyle={styles.patientBubbleInner}
                  borderRadius={14}
                >
                  <Text style={styles.patientText}>{MOCK_CHAT.patient}</Text>
                </NeumorphicCard>
              </View>
            </View>

            <View style={styles.controlRow}>
              <AppButton
                activeOpacity={0.8}
                style={styles.controlBtn}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                text="Pause"
                textStyle={styles.controlBtnText}
                onPress={() => setIsPaused(true)}
                // disabled={isPaused}
              />
              <AppButton
                activeOpacity={0.8}
                style={styles.controlBtn}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.SURFACE}
                text="Resume"
                textStyle={styles.controlBtnText}
                onPress={() => setIsPaused(false)}
                // disabled={!isPaused}
              />
            </View>

            <ReusableButton
              title="Stop & Generate Note"
              height={48}
              borderRadius={24}
              containerStyle={styles.primaryBtn}
              textStyle={styles.primaryBtnText}
              onPress={() =>
                navigation.navigate(navigationStrings.GENERATE_NOTES)
              }
            />
          </>
        )}
      </ScrollView>

      {!isCapturing ? (
        <View style={styles.footer}>
          {renderLanguageField()}
          <ReusableButton
            title="Capture Conversation"
            height={48}
            borderRadius={24}
            containerStyle={styles.primaryBtn}
            textStyle={styles.primaryBtnText}
            onPress={() => setIsCapturing(true)}
          />
        </View>
      ) : null}

      <SelectSearchSheet
        ref={languageSheetRef}
        title="Select Language"
        items={LANGUAGE_OPTIONS}
        selectedId={languageId}
        searchPlaceholder="Search language"
        onConfirm={handleLanguageConfirm}
      />
    </SafeAreaView>
  );
};

export default AIScribe;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  avatarWrap: { alignItems: "center", marginTop: 4 },
  avatarWrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 115,
    resizeMode: "contain",
  },
  listeningText: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
  fieldLabel: {
    marginTop: 20,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  inputNoTopSpace: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 16,
    backgroundColor: COLORS.SURFACE,
  },
  primaryBtn: {
    width: "100%",
    marginTop: 15,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
  chatSection: {
    marginTop: 20,
    gap: 16,
  },
  assistantRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  assistantBubble: {
    flex: 1,
  },
  assistantText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  assistantTextHidden: {
    height: 0,
    marginTop: 0,
    fontSize: 0,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  patientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  patientBubbleOuter: {
    flex: 1,
  },
  patientBubbleInner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  patientText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  controlRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  controlBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    minWidth: 0,
  },
  controlBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
});
