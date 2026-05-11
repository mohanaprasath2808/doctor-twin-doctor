import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import AppButton from "../../../../../components/Common/AppButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../../../../assets/image/greenTick.png";

type CompletedRouteParams = {
  title?: string;
  buttonText?: string;
  backRouteName?: string;
};

const ReceptionIntakeCompleted = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params ?? {}) as CompletedRouteParams;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerSpacer} />
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.centerContent}>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={GreenTickImage}
            containerStyle={styles.iconContainer}
            wrapperStyle={styles.iconWrapper}
            overlayStyle={styles.iconOverlay}
            imageStyle={styles.iconImage}
          />

          <Text style={styles.title}>{params.title ?? "Completed"}</Text>

          <AppButton
            text={params.buttonText ?? "Back to Intake"}
            height={50}
            borderRadius={25}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.backButtonText}
            shadowStyle={styles.backButtonShadow}
            onPress={() => navigation.navigate(params.backRouteName ?? navigationStrings.RECEPTION_INTAKE)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReceptionIntakeCompleted;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 140,
  },
  iconContainer: {
    paddingBottom: 12,
  },
  iconWrapper: {
    width: 180,
    height: 180,
  },
  iconOverlay: {
    borderRadius: 90,
  },
  iconImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  title: {
    marginBottom: 28,
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  backButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  backButtonShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
});
