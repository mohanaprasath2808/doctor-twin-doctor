import React, { useCallback, useRef, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import SelectAndCallPatientSheet, {
  type CallPatientOption,
} from "../../../components/BottomSheets/SelectAndCallPatientSheet";
import AppButton from "../../../components/Common/AppButton";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";
import CallIcon from "../../../assets/icon/callWhiteIcon.svg";

const DEFAULT_PATIENT: CallPatientOption = {
  id: "1",
  name: "Sarah Williams",
  age: 45,
  room: "5",
  avatar: DoctorTempImage,
};

const REASON_FOR_CALL = "Could you clarify the dosage for Ganesh Kumar's insulin?";

const CallPatient = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const patientSheetRef = useRef<BSModal>(null);
  const [patient, setPatient] = useState<CallPatientOption>(DEFAULT_PATIENT);
  const bottomPad = Math.max(insets.bottom, 12) + 12;

  const openPatientSheet = useCallback(() => {
    patientSheetRef.current?.present();
  }, []);

  const goToAutoNote = useCallback(() => {
    navigation.navigate(navigationStrings.CALL_PATIENT_AUTO_NOTE);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Call Patient</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatarContainer}
            wrapperStyle={styles.heroAvatarWrap}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />
          <Text style={styles.heroSubtitle}>How can I assist?</Text>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.sectionInner}
          >
            <View style={styles.patientRow}>
              <Image source={patient.avatar} style={styles.patientAvatar} />
              <View style={styles.patientTextWrap}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <View style={styles.patientMetaRow}>
                  <Text style={styles.patientMeta}>Age {patient.age}</Text>
                  <View style={styles.patientMetaSeparator} />
                  <Text style={styles.patientMeta}>Room: {patient.room}</Text>
                </View>
              </View>
              <AppButton
                activeOpacity={0.85}
                width={65}
                height={28}
                borderRadius={18}
                borderWidth={1}
                borderColor={COLORS.PRIMARY}
                bgColor={COLORS.INNER_SURFACE}
                text="Change"
                textStyle={styles.changeBtnText}
                onPress={openPatientSheet}
              />
            </View>
          </NeumorphicCard>

          <NeumorphicCard
            borderRadius={12}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.sectionOuter}
            innerStyle={styles.sectionInner}
          >
            <Text style={styles.sectionTitle}>Reason for call</Text>
            <NeumorphicInnerShadowCard
              borderRadius={10}
              containerStyle={styles.reasonShadowOuter}
              contentStyle={styles.reasonShadowInner}
              darkShadowColor="#C8CBCC99"
              lightShadowColor="#FFFFFFCC"
            >
              <Text style={styles.reasonText}>{REASON_FOR_CALL}</Text>
            </NeumorphicInnerShadowCard>
          </NeumorphicCard>

          <View style={styles.insightRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={32} containerSize={38} />
            <InsightMessageCard
              title="Dr.Twin"
              subTitle={`Hi Mrs. ${patient.name} I'm calling to follow up. How are you feeling?`}
              bgColor="#CBF0FF"
              subTitleStyle={styles.insightBody}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottomPad }]}>
          <ReusableButton
            title="Call"
            height={48}
            borderRadius={26}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            leftIcon={<CallIcon />}
            onPress={goToAutoNote}
            textStyle={styles.callBtnText}
          />
        </View>
      </View>

      <SelectAndCallPatientSheet
        ref={patientSheetRef}
        selectedPatientId={patient.id}
        onSelectDone={setPatient}
      />
    </SafeAreaView>
  );
};

export default CallPatient;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  heroAvatarContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  heroAvatarWrap: {
    width: 200,
    height: 200,
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  heroImage: {
    width: 124,
    height: 124,
    resizeMode: "contain",
    borderRadius: 100,
  },
  heroSubtitle: {
    marginTop: 4,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  sectionOuter: {
    width: "100%",
    marginBottom: 16,
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  patientTextWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    minWidth: 0,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  patientMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    flexWrap: "wrap",
    gap: 6,
  },
  patientMeta: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Text-Regular",
  },
  patientMetaSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 10,
    fontFamily: "SF-Pro-Text-Medium",
  },
  reasonShadowOuter: {
    width: "100%",
  },
  reasonShadowInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  reasonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
  },
  insightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 4,
  },
  insightBody: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  callBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
