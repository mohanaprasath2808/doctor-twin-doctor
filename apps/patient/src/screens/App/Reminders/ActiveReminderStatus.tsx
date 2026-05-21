import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { TEXT } from "../../../constants/typography";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const HORIZONTAL = 16;
const REUSABLE_GRADIENT: [string, string] = ["#22D3EE", "#0F766E"];

type ActiveReminderStatusParams = {
  medication?: string;
  timeLabel?: string;
  frequency?: string;
  voice?: string;
};

const ActiveReminderStatus = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = (route.params ?? {}) as ActiveReminderStatusParams;

  const medication = params.medication ?? "Lisinopril";
  const time = params.timeLabel ?? "8:00 AM";
  const frequency = params.frequency ?? "Daily";
  const voice = params.voice ?? "Dr Shahinaz Twin";

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
        <Text style={styles.headerTitle}>Active Status</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.title}>Your reminder is active</Text>
        <Text style={styles.subtitle}>I will gently notify you.</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.infoInner} borderRadius={10}>
          <InfoRow label="Medication" value={medication} />
          <Divider />
          <InfoRow label="Time" value={`${time} ${frequency}`} />
          <Divider />
          <InfoRow label="Voice" value={voice} />
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <ReusableButton
            title="Pause"
            gradientColors={REUSABLE_GRADIENT}
            height={48}
            borderRadius={24}
            width="34%"
            onPress={() => undefined}
          />
          <AppButton
            text="Edit"
            width="30%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.editText}
            onPress={() => navigation.goBack()}
          />
          <AppButton
            text="Delete"
            width="30%"
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor="#FF6B6B"
            bgColor={COLORS.SURFACE}
            textStyle={styles.deleteText}
            onPress={() => undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

export default ActiveReminderStatus;

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
  content: {
    flex: 1,
    paddingHorizontal: HORIZONTAL,
    alignItems: "center",
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    borderRadius: 100,
  },
  title: {
    ...TEXT.sectionTitle,
    color: COLORS.TEXT_PRIMARY,
    marginTop: 2,
  },
  subtitle: {
    marginTop: 6,
    ...TEXT.caption,
    color: COLORS.TEXT_PRIMARY_60,
    marginBottom: 18,
  },
  cardOuter: {
    width: "100%",
  },
  infoInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: {
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY_60,
  },
  infoValue: {
    ...TEXT.body,
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  actionsRow: {
    marginTop: 18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  editText: {
    ...TEXT.body,
    color: COLORS.PRIMARY,
  },
  deleteText: {
    ...TEXT.body,
    color: "#FF6B6B",
  },
});

