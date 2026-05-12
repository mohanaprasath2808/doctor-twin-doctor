import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import GreenTickImage from "../../../assets/image/greenTick.png";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import { DELEGATION_HOME_ROUTE, type DelegationFlowParamList } from "./delegationTypes";

const TIMER_TEXT = "00:02:14";

function TimerPill() {
  return (
    <NeumorphicInnerShadowCard
      fullWidth={false}
      height={38}
      borderRadius={10}
      backgroundColor={COLORS.INNER_SURFACE}
      containerStyle={styles.timerOuter}
      contentStyle={styles.timerInner}
    >
      <Text style={styles.timerText}>{TIMER_TEXT}</Text>
    </NeumorphicInnerShadowCard>
  );
}

const DelegationActionCompleted = () => {
  const navigation = useNavigation<NativeStackNavigationProp<DelegationFlowParamList>>();
  const route = useRoute<RouteProp<DelegationFlowParamList, "DelegationActionCompleted">>();
  const insets = useSafeAreaInsets();

  const title = route.params?.title ?? "Task Assigned";
  const description = route.params?.description ?? "Task has been assigned successfully";
  const buttonText = route.params?.buttonText ?? "Back to Tasks";
  const showTimer = route.params?.showTimer ?? false;

  const backToTasks = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: DELEGATION_HOME_ROUTE }],
    });
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
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Completion your Action</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.heroSection}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            wrapperStyle={styles.avatarWrapper}
            imageStyle={styles.avatarImage}
          />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
        {showTimer ? <TimerPill /> : null}

        <View style={styles.footer}>
          <ReusableButton
            title={buttonText}
            height={52}
            borderRadius={26}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            onPress={backToTasks}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DelegationActionCompleted;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.INNER_SURFACE },
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 16 },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  heroSection: {
    marginTop: 120,
    alignItems: "center",
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    color: COLORS.TEXT_DARK,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "SF-Pro-Display-Regular",
    color: COLORS.TEXT_70,
    lineHeight: 21,
  },
  timerOuter: {
    marginTop: 16,
    alignSelf: "center",
  },
  timerInner: {
    minWidth: 120,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
    letterSpacing: 1,
  },
  footer: {
    marginTop: 36,
  },
});
