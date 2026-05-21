import React, { useCallback } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../assets/image/greenTick.png";
import IconComponent from "../../../components/neomorphism/IconComponent";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

const BillingActionCompleted = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute<RouteProp<AppStackParamList, "BillingActionCompleted">>();
  const insets = useSafeAreaInsets();

  const title = route.params?.title ?? "Action completed";
  const description = route.params?.description ?? "Your request has been completed successfully";
  const buttonText = route.params?.buttonText ?? "Back to Billing";
  const headerTitle = route.params?.headerTitle ?? "Completion your Action";
  const popCount = route.params?.popCount ?? 3;
  const completionNavigateTo = route.params?.completionNavigateTo;

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPrimaryDone = useCallback(() => {
    if (completionNavigateTo) {
      const state = navigation.getState();
      const targetIndex = state.routes.findIndex((r) => r.name === completionNavigateTo);
      if (targetIndex >= 0 && targetIndex < state.index) {
        navigation.pop(state.index - targetIndex);
        return;
      }
      navigation.navigate(completionNavigateTo as never);
      return;
    }
    navigation.pop(popCount);
  }, [completionNavigateTo, navigation, popCount]);

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
          <Text style={styles.headerTitle}>{headerTitle}</Text>
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

        <View style={styles.footer}>
          <ReusableButton
            title={buttonText}
            height={52}
            borderRadius={26}
            width="100%"
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
            onPress={onPrimaryDone}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingActionCompleted;

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
    width: 220,
    height: 220,
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
    color: COLORS.TEXT_DARK,
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 21,
    paddingHorizontal: 8,
  },
  footer: {
    marginTop: 36,
  },
});
