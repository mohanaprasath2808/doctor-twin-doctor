import React from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import ReusableButton from "../../../neomorphism/ReusableButton";
import AppButton from "../../../components/Common/AppButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import DiamondIcon from "../../../assets/icons/diamond.svg";
import TickIcon from "../../../assets/icons/tickIcon.svg";
import DoctorIcon from "../../../assets/icons/doctor.svg";

type MembershipPlan = {
  id: string;
  title: string;
  iconType: "glow" | "peel";
  isNew?: boolean;
  features: string[];
};

const MEMBERSHIPS: MembershipPlan[] = [
  {
    id: "glow",
    title: "Glow Membership",
    iconType: "glow",
    isNew: true,
    features: ["10% off treatments", "1 Free chemical peel"],
  },
  {
    id: "chemical-peel",
    title: "Chemical Peel Membership",
    iconType: "peel",
    features: ["20% off all drips", "Monthly IV drip"],
  },
];

const Membership = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Membership</Text>
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

        <Text style={styles.heading}>Join our wellness membership to save.</Text>

        <FlatList
          style={styles.list}
          data={MEMBERSHIPS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
              <View style={styles.planTopRow}>
                <InnerShadowIcon
                  icon={
                    item.iconType === "glow" ? (
                      <DiamondIcon width={18} height={18} />
                    ) : (
                      <DoctorIcon width={18} height={18} />
                    )
                  }
                  size={40}
                  radius={20}
                />
                <Text style={styles.planTitle}>{item.title}</Text>
                {item.isNew ? (
                  <DeltaBadge
                    value="New"
                    width={44}
                    height={26}
                    radius={13}
                    bgColor="#D3FFF1"
                    textColor="#10B981"
                    darkShadowColor="#9FDFCA"
                    textStyle={styles.newBadgeText}
                  />
                ) : null}
              </View>

              <View style={styles.separator} />
              <Text style={styles.featuresTitle}>Features included</Text>
              {item.features.map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <InnerShadowIcon icon={<TickIcon width={16} height={16} />} size={32} radius={16} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}

              <ReusableButton
                title="Subscribe"
                height={46}
                borderRadius={24}
                width="100%"
                containerStyle={styles.subscribeBtn}
                onPress={() =>
                  navigation.navigate(navigationStrings.COMPLETE_SUBSCRIPTION, {
                    planTitle: item.title,
                    planPrice: "$49/month",
                  })
                }
              />
            </NeumorphicCard>
          )}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  content: {
    paddingBottom: 24,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 16,
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
  avatarWrap: { alignItems: "center", marginTop: 12 },
  avatarWrapper: { width: 200, height: 200 },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    resizeMode: "cover",
  },
  heading: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardOuter: { width: "100%" },
  cardInner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  planTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  planTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  newBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#10B981",
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 12,
  },
  featuresTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_70,
  },
  featureRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 29 / 2,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  subscribeBtn: {
    marginTop: 16,
  },
  cardSeparator: {
    height: 16,
  },
  manageBtn: {
    marginTop: 18,
  },
  manageText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    padding: 16,
  },
});

export default Membership;
