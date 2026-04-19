import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import LabLocationPin from "../../../assets/icons/labLocationPin.svg";
import TickIcon from "../../../assets/icons/tickIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const LabRequest = () => {
  const navigation = useNavigation<any>();
  const [reason, setReason] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Lab Request</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.instruction}>
          Your doctor requested a cholesterol panel.
        </Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Test Location</Text>
          <View style={styles.locationRow}>
            <InnerShadowIcon icon={<LabLocationPin width={18} height={18} />} size={40} radius={114} />
            <View style={styles.locationTextCol}>
              <Text style={styles.locationName}>Quest Diagnostics</Text>
              <Text style={styles.locationAddress}>
                2118 Thornridge Cir. Syracuse, Connecticut 35624
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.walkInRow}>
            <InnerShadowIcon icon={<TickIcon width={18} height={18} />} size={40} radius={114} />
            <Text style={styles.walkInText}>Walk-in Available</Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.reasonCardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Reason</Text>
          <Text style={styles.fieldLabel}>Reason</Text>
          <InputField
            value={reason}
            onChangeText={setReason}
            placeholder="Enter reason"
            multiline
            numberOfLines={5}
            minHeight={120}
            borderRadius={14}
            containerStyle={styles.reasonInput}
          />
        </NeumorphicCard>

        <View style={styles.bottomActions}>
          <View style={styles.btnHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={48}
              borderRadius={24}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              text="Change Location"
              textStyle={styles.changeLocationText}
              onPress={() => undefined}
            />
          </View>
          <View style={styles.btnHalf}>
            <ReusableButton
              title="Directions"
              height={48}
              borderRadius={24}
              width="100%"
              containerStyle={styles.directionsBtnWrap}
              onPress={() => undefined}
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 30,
  },
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 115,
    resizeMode: "contain",
  },
  instruction: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 8,
  },
  cardOuter: {
    marginTop: 30,
    width: "100%",
  },
  cardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  reasonCardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  locationRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  locationTextCol: {
    flex: 1,
    minWidth: 0,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  locationAddress: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 16,
  },
  walkInRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  walkInText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  fieldLabel: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  reasonInput: {
    marginTop: 6,
  },
  bottomActions: {
    marginTop: 24,
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  btnHalf: {
    flex: 1,
    minWidth: 0,
  },
  changeLocationText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "600",
  },
  directionsBtnWrap: {
    height: 48,
  },
});

export default LabRequest;
