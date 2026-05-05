import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import GreenTickImage from "../../../assets/images/greenTick.png";
import OverlayImage from "../../../assets/images/imageBgShadow.png";

const PaymentSuccessful = () => {
  const navigation = useNavigation<any>();

  const backHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: navigationStrings.BOTTOM_NAVIGATION }],
      }),
    );
  };

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
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          containerStyle={styles.imageContainer}
          wrapperStyle={styles.avatarWrap}
          overlayStyle={styles.overlayImage}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.title}>Payment Successful</Text>

        <NeumorphicCard outerStyle={styles.detailsOuter} innerStyle={styles.detailsInner} borderRadius={10}>
          <View style={styles.lineRow}>
            <Text style={styles.lineLeft}>Amount Paid</Text>
            <Text style={styles.lineRight}>$85.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.lineRow}>
            <Text style={styles.lineLeft}>Date</Text>
            <Text style={styles.lineRight}>24 Mar 2026</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.lineRow}>
            <Text style={styles.lineLeft}>Transaction ID</Text>
            <Text style={styles.lineRight}>#TX12345</Text>
          </View>
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <AppButton
            text="Email Receipt"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.secondaryText}
            style={styles.actionBtn}
            onPress={() => undefined}
          />
          <AppButton
            text="Back to Home"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.secondaryText}
            style={styles.actionBtn}
            onPress={backHome}
          />
        </View>

        <ReusableButton
          title="Download Receipt"
          containerStyle={styles.primaryBtn}
          textStyle={styles.primaryText}
          onPress={() => undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccessful;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSpacer: { width: 40, height: 40 },
  imageContainer: {
    alignItems: "center",
    marginTop: 70,
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
  title: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  detailsOuter: {
    marginTop: 24,
    width: "100%",
  },
  detailsInner: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  lineLeft: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  lineRight: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  actionRow: {
    marginTop: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  primaryBtn: {
    marginTop: 16,
    height: 48,
    borderRadius: 24,
  },
  primaryText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "500",
  },
});
