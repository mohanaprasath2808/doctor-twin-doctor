import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../assets/image/greenTick.png";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const RING_SIZES = [176, 216, 256, 296] as const;
const RING_CONTAINER = 320;

const TaskCompleted = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const backToList = useCallback(() => {
    navigation.navigate(navigationStrings.TASK_INBOX);
  }, [navigation]);

  const bottomPad = Math.max(insets.bottom, 12) + 16;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={goBack}
          />
          <View style={styles.headerCenter} />
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.heroSection}>
          <View style={styles.ringsOuter}>
            {RING_SIZES.map((size, i) => (
              <View
                key={size}
                pointerEvents="none"
                style={[
                  styles.ring,
                  {
                    left: (RING_CONTAINER - size) / 2,
                    top: (RING_CONTAINER - size) / 2,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    opacity: 0.42 - i * 0.09,
                  },
                ]}
              />
            ))}
            <View style={styles.avatarOverlay} pointerEvents="box-none">
              <ProfileAvatar
                overlaySource={OverlayImage}
                imageSource={GreenTickImage}
                wrapperStyle={styles.avatarWrapper}
                imageStyle={styles.avatarImage}
              />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Task Completed</Text>
        <Text style={styles.subtitle}>Shall I proceed to the next urgent task?</Text>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle="Next urgent task"
            bgColor="#CBF0FF"
            subTitleStyle={styles.insightText}
          />
        </View>

        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={52}
          borderRadius={26}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.INNER_SURFACE}
          text="Back to list"
          textStyle={styles.backToListText}
          onPress={backToList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskCompleted;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerCenter: {
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  heroSection: {
    marginTop: 12,
    alignItems: "center",
  },
  ringsOuter: {
    width: RING_CONTAINER,
    height: RING_CONTAINER,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "rgba(100, 110, 125, 0.28)",
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    marginTop: 0,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  messageRow: {
    marginTop: 28,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  insightText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3D6B7A",
  },
  backToListText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
});
