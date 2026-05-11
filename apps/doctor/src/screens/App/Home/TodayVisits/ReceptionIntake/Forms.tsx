import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import AppButton from "../../../../../components/Common/AppButton";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import ReportIcon from "../../../../../assets/icon/reportIcon.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";

type FormStatus = "Not Started" | "In progress" | "Completed";

type FormItem = {
  id: string;
  title: string;
  status: FormStatus;
  actionText?: string;
};

const FORM_ITEMS: FormItem[] = [
  { id: "consent", title: "Consent Form", status: "Not Started", actionText: "Start" },
  { id: "medical-history", title: "Medical History", status: "In progress", actionText: "Continue" },
  { id: "hipaa", title: "HIPAA Agreement", status: "Completed" },
];

const STATUS_STYLES: Record<FormStatus, { bg: string; text: string; dark: string }> = {
  "Not Started": { bg: "#FFE9E9", text: "#F09AA0", dark: "#F0C7C7" },
  "In progress": { bg: "#FFF8DB", text: COLORS.ESCALATION_DARK, dark: "#F2D790" },
  Completed: { bg: "#DDF8ED", text: COLORS.GREEN, dark: "#A9E4C7" },
};

const Forms = () => {
  const navigation = useNavigation<any>();

  const renderStatusBadge = (status: FormStatus) => {
    const statusStyle = STATUS_STYLES[status];

    return (
      <NeumorphicInnerShadowCard
        borderRadius={18}
        backgroundColor={statusStyle.bg}
        darkShadowColor={statusStyle.dark}
        lightShadowColor="#FFFFFFCC"
        containerStyle={styles.statusBadgeOuter}
        contentStyle={styles.statusBadgeInner}
      >
        <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
      </NeumorphicInnerShadowCard>
    );
  };

  const renderFormCard = (item: FormItem) => (
    <NeumorphicCard key={item.id} outerStyle={styles.formOuter} innerStyle={styles.formInner} borderRadius={12}>
      <View style={styles.formHeaderRow}>
        <View style={styles.formTitleRow}>
          <InnerShadowIcon icon={<ReportIcon width={18} height={18} />} size={40} />
          <Text style={styles.formTitle}>{item.title}</Text>
        </View>
        {renderStatusBadge(item.status)}
      </View>

      {item.actionText ? (
        <AppButton
          text={item.actionText}
          height={44}
          borderRadius={22}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.SURFACE}
          textStyle={styles.outlineButtonText}
          shadowStyle={styles.buttonShadow}
          style={styles.formActionButton}
        />
      ) : null}
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Forms</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        <NeumorphicCard outerStyle={styles.patientOuter} innerStyle={styles.patientInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.patientImage} />
            <View style={styles.patientTextWrap}>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>
        </NeumorphicCard>

        {FORM_ITEMS.map(renderFormCard)}

        <View style={styles.footer}>
          <AppButton
            text="Send to Patient"
            width="48%"
            height={50}
            borderRadius={25}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.sendButtonText}
            shadowStyle={styles.buttonShadow}
          />
          <ReusableButton
            title="Complete All"
            width="48%"
            height={50}
            borderRadius={25}
            textStyle={styles.completeButtonText}
            onPress={() =>
              navigation.navigate(navigationStrings.RECEPTION_INTAKE_COMPLETED, {
                title: "Forms Completed Successfully!",
                buttonText: "Back to Intake",
                backRouteName: navigationStrings.RECEPTION_INTAKE,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forms;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    paddingTop: 10,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarOverlay: {
    borderRadius: 90,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  listeningText: {
    marginTop: 8,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  patientOuter: {
    width: "100%",
    marginBottom: 18,
  },
  patientInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientTextWrap: {
    flex: 1,
    gap: 3,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  formOuter: {
    width: "100%",
    marginBottom: 18,
  },
  formInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  formHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  formTitleRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  formTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  statusBadgeOuter: {
    width: 94,
  },
  statusBadgeInner: {
    height: 28,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  formActionButton: {
    marginTop: 18,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  buttonShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  footer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sendButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
