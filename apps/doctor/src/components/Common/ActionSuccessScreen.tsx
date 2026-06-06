import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import OverlayImage from "../../assets/image/imageBgShadow.png";
import GreenTickImage from "../../assets/image/greenTick.png";
import { COLORS } from "../../constants/theme";
import AppButton from "./AppButton";
import ProfileAvatar from "../Auth/ProfileAvatar";
import IconComponent from "../../neomorphism/IconComponent";
import ReusableButton from "../../neomorphism/ReusableButton";
import BackIcon from "../../assets/icon/backArrow.svg";

export type ActionSuccessScreenProps = {
  title: string;
  subtitle?: string;
  buttonTitle?: string;
  onBackPress?: () => void;
  onConfirmPress: () => void;
  showBackButton?: boolean;
  /** Two-button row: outline left, primary gradient right */
  layout?: "single" | "dualActions";
  secondaryButtonTitle?: string;
  onSecondaryPress?: () => void;
  primaryButtonTitle?: string;
};

const ActionSuccessScreen = ({
  title,
  subtitle,
  buttonTitle = "Confirm & Close",
  onBackPress,
  onConfirmPress,
  showBackButton = true,
  layout = "single",
  secondaryButtonTitle = "Track Status",
  onSecondaryPress,
  primaryButtonTitle = "Back to Dashboard",
}: ActionSuccessScreenProps) => (
  <ScrollView
    style={styles.scroll}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.header}>
      {showBackButton && onBackPress ? (
        <IconComponent
          icon={<BackIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={onBackPress}
        />
      ) : (
        <View style={styles.headerSpacer} />
      )}
      <View style={styles.headerSpacer} />
    </View>

    <ProfileAvatar
      overlaySource={OverlayImage}
      imageSource={GreenTickImage}
      containerStyle={styles.avatarWrap}
      wrapperStyle={styles.avatarWrapper}
      overlayStyle={styles.avatarOverlay}
      imageStyle={styles.avatarImage}
    />

    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

    {layout === "dualActions" ? (
      <View style={styles.dualRow}>
        <View style={styles.dualHalf}>
          <AppButton
            text={secondaryButtonTitle}
            height={48}
            borderRadius={24}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.dualOutlineText}
            style={styles.dualBtn}
            onPress={onSecondaryPress}
          />
        </View>
        <View style={styles.dualHalf}>
          <ReusableButton
            title={primaryButtonTitle}
            height={48}
            borderRadius={24}
            containerStyle={styles.dualBtn}
            textStyle={styles.confirmBtnText}
            onPress={onConfirmPress}
          />
        </View>
      </View>
    ) : (
      <ReusableButton
        title={buttonTitle}
        width="100%"
        height={48}
        borderRadius={24}
        containerStyle={styles.confirmBtn}
        textStyle={styles.confirmBtnText}
        onPress={onConfirmPress}
      />
    )}
  </ScrollView>
);

export default ActionSuccessScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    flexGrow: 1,
  },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 40,
  },
  avatarWrapper: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "contain",
  },
  title: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 20,
    fontFamily: "SF-Pro-Display-Regular",
    paddingHorizontal: 24,
  },
  confirmBtn: {
    marginTop: 32,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Text-Medium",
  },
  dualRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    width: "100%",
  },
  dualHalf: {
    flex: 1,
    minWidth: 0,
  },
  dualBtn: {
    width: "100%",
  },
  dualOutlineText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
});
