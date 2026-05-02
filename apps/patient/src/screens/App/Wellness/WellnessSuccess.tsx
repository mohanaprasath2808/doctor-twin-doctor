import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import GreenTickImage from "../../../assets/images/greenTick.png";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import navigationStrings from "../../../constants/navigationStrings";

const WellnessSuccess = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const title = route?.params?.title ?? "Book Appointed";
  const message = route?.params?.message ?? "Appointment Booked Successfully";
  const subtitle = route?.params?.subtitle ?? "I'll remind you and stay with you.";
  const primaryButtonLabel = route?.params?.primaryButtonLabel ?? "View Appointment";
  const primaryButtonRoute = route?.params?.primaryButtonRoute ?? navigationStrings.APPOINTMENTS;
  const secondaryButtonLabel = route?.params?.secondaryButtonLabel ?? "Back to Wellness";
  const secondaryButtonRoute = route?.params?.secondaryButtonRoute ?? navigationStrings.WELLNESS_MEDSPA;

  const onSecondaryPress = () => {
    if (secondaryButtonRoute !== navigationStrings.WELLNESS_MEDSPA) {
      navigation.navigate(secondaryButtonRoute);
      return;
    }

    const state = navigation.getState();
    const routes = state?.routes ?? [];
    const wellnessIdx = routes.findIndex(
      (r: { name: string }) => r.name === navigationStrings.WELLNESS_MEDSPA,
    );

    if (wellnessIdx >= 0) {
      const nextRoutes = routes
        .slice(0, wellnessIdx + 1)
        .map((r: { name: string; params?: object }) => ({
        name: r.name,
        params: r.params,
      }));
      navigation.dispatch(
        CommonActions.reset({
          index: nextRoutes.length - 1,
          routes: nextRoutes,
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: navigationStrings.BOTTOM_NAVIGATION },
            { name: navigationStrings.WELLNESS_MEDSPA },
          ],
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            containerStyle={styles.imageContainer}
            wrapperStyle={styles.avatarWrap}
            overlayStyle={styles.overlayImage}
            imageStyle={styles.avatarImage}
          />

          <Text style={styles.title}>{message}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.actionRow}>
            <AppButton
              text={primaryButtonLabel}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={styles.viewText}
              height={48}
              borderRadius={28}
              width="100%"
              style={styles.actionBtn}
              onPress={() => navigation.navigate(primaryButtonRoute)}
            />
            <ReusableButton
              title={secondaryButtonLabel}
              gradientColors={["#22D3EE", "#0F766E"]}
              height={48}
              borderRadius={28}
              width="100%"
              containerStyle={styles.actionBtn}
              onPress={onSecondaryPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    paddingHorizontal: 16,
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
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  actionRow: {
    marginTop: 36,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
  },
  viewText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 150,
  },
  avatarWrap: {
    width: 210,
    height: 210,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 105,
  },
  avatarImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    borderRadius: 65,
  },
});

export default WellnessSuccess;
