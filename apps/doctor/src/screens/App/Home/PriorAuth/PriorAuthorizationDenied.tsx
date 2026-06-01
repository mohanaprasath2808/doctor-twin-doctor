import React, { useCallback, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import NotificationIcon from "../../../../assets/icon/notificationIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import InnerShadowView from "../../../../neomorphism/InnerShadowView";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const PATIENT_NAME = "Sarah Williams";

function DenialReasonBox() {
  const [box, setBox] = useState({ w: 0, h: 0 });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox((prev) =>
      prev.w === width && prev.h === height ? prev : { w: width, h: height },
    );
  }, []);

  return (
    <View style={styles.denialShell} onLayout={onLayout}>
      {box.w > 0 && box.h > 0 ? (
        <View style={styles.denialShadow} pointerEvents="none">
          <InnerShadowView
            width={box.w}
            height={box.h}
            borderRadius={10}
            color={COLORS.SURFACE}
            darkShadowDx={4}
            darkShadowDy={4}
            darkShadowBlur={14}
            darkShadowColor={COLORS.DARK_SHADOW}
            lightShadowDx={-4}
            lightShadowDy={-4}
            lightShadowBlur={9}
            lightShadowColor={COLORS.LIGHT_SHADOW}
          />
        </View>
      ) : null}
      <View style={styles.denialContent}>
        <Text style={styles.denialText}>
          Clear Health Insurance was denied due to obesity not being a covered
          indication.
        </Text>
        <Text style={[styles.denialText, styles.denialTextSpaced]}>
          Additional documentation such as BMI/diet history is required to
          appeal.
        </Text>
      </View>
    </View>
  );
}

const PriorAuthorizationDenied = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Dr.Twin Listening...</Text>
          <IconComponent
            icon={<NotificationIcon width={20} height={20} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => {}}
          />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <View style={styles.messageRow}>
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
          <InsightMessageCard
            style={styles.insightCard}
            title="Prior Authorization"
            subTitle="Coverage barrier found"
            bgColor="#CBF0FF"
            titleStyle={styles.insightTitle}
            subTitleStyle={styles.insightSubTitle}
            titleSubTitleGap={4}
          />
        </View>

        <NeumorphicCard
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={14}
        >
          <View style={styles.patientTopRow}>
            <InnerShadowIcon
              size={44}
              icon={
                <Text style={styles.initials}>{getInitials(PATIENT_NAME)}</Text>
              }
            />
            <View style={styles.patientTextCol}>
              <Text style={styles.patientName}>{PATIENT_NAME}</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>

          <Text style={styles.medicationLine}>
            <Text style={styles.medicationBold}>Ozempic</Text>
            {" 1 mg Pen injection"}
          </Text>

          <View style={styles.divider} />

          <DenialReasonBox />
        </NeumorphicCard>

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Edit PA"
            textStyle={styles.outlineBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.EDIT_PRIOR_AUTHORIZATION)
            }
          />
          <ReusableButton
            title="Message Patient"
            height={48}
            borderRadius={24}
            containerStyle={styles.messageBtnWrap}
            textStyle={styles.messageBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.MESSAGE_PATIENT)
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriorAuthorizationDenied;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
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
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Pro-Text-Bold",
  },
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
  messageRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  insightCard: { flex: 1 },
  insightTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  insightSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Display-Regular",
  },
  patientCardOuter: { width: "100%", marginTop: 16 },
  patientCardInner: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  patientTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientTextCol: { flex: 1, minWidth: 0 },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  medicationLine: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  medicationBold: {
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  denialShell: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  denialShadow: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  denialContent: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  denialText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
  },
  denialTextSpaced: { marginTop: 10 },
  actionsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  actionBtnBase: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    minWidth: 0,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
    textAlign: "center",
  },
  messageBtnWrap: { flex: 1, minWidth: 0 },
  messageBtnText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
});
