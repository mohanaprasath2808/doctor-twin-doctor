import React, { useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import OverlayImage from "../../assets/image/imageBgShadow.png";
import AlertIcon from "../../assets/icon/alertIcon.svg";
import ConicalIcon from "../../assets/icon/conicalIcon.svg";
import EarnIcon from "../../assets/icon/earnIcon.svg";
import InsuranceIcon from "../../assets/icon/insuranceIcon.svg";
import MessageIcon from "../../assets/icon/messageIcon.svg";
import VoiceIcon from "../../assets/icon/voiceIcon.svg";
import InnerShadowIcon from "../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../components/neomorphism/NeumorphicCard";
import NeumorphicQuickActionTile from "../../components/neomorphism/NeumorphicQuickActionTile";
import ProfileAvatar from "../../components/neomorphism/ProfileAvatar";
import ReusableButton from "../../components/neomorphism/ReusableButton";
import NeumorphicSwitch from "../../components/Common/NeumorphicSwitch";
import { greetingLabel } from "../../constants/constant";
import navigationStrings from "../../constants/navigationStrings";
import { COLORS } from "../../constants/theme";

const DISPLAY_NAME = "Lorena";

const ShiftStart = () => {
  const navigation = useNavigation<NavigationProp<Record<string, undefined | object>>>();
  const greet = useMemo(() => greetingLabel(), []);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const goHome = () => {
    navigation.navigate(navigationStrings.BOTTOM_NAVIGATION, {
      screen: navigationStrings.HOME,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        >
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.imageContainer}
            wrapperStyle={styles.avatarWrap}
            overlayStyle={styles.overlayImage}
            imageStyle={styles.avatarImage}
          />
          <Text style={styles.greeting}>
            {greet} {DISPLAY_NAME}
          </Text>

          <NeumorphicCard
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.badgeCard}
            innerStyle={styles.badgeCardInner}
            borderRadius={10}
          >
            <View style={styles.badgeRow}>
              <View style={styles.earnSlot}>
                <EarnIcon width={40} height={40} />
              </View>
              <Text style={styles.badgeText}>
                You earned the <Text style={styles.badgeBold}>Hard Working badge</Text> yesterday. I
                have 3 urgent items ready.
              </Text>
            </View>
          </NeumorphicCard>

          <View style={styles.tilesRow}>
            <NeumorphicQuickActionTile
              onPress={() => {}}
              icon={<ConicalIcon width={28} height={28} />}
              label="Sarah Johnson"
              subtitle="Overdue Labs"
              containerStyle={styles.tileCol}
            />
            <NeumorphicQuickActionTile
              onPress={() => {}}
              icon={<MessageIcon width={28} height={28} />}
              label="Brian Carter"
              subtitle="Urgent Message"
              badge="1"
              containerStyle={styles.tileCol}
            />
            <NeumorphicQuickActionTile
              onPress={() => {}}
              icon={<InsuranceIcon width={28} height={28} />}
              label="Henry Patel"
              subtitle="Insurance Issue"
              badge="3"
              containerStyle={styles.tileCol}
            />
          </View>

          <NeumorphicCard outerStyle={styles.rowCard} innerStyle={styles.rowCardInner}>
            <View style={styles.rowBetween}>
              <InnerShadowIcon icon={<VoiceIcon width={24} height={24} />} size={40} radius={20} />
              <Text style={styles.rowTitle} numberOfLines={2}>
                Enable Voice Mode
              </Text>
              <NeumorphicSwitch value={voiceEnabled} onValueChange={setVoiceEnabled} />
            </View>
          </NeumorphicCard>

          <NeumorphicCard outerStyle={styles.rowCard} innerStyle={styles.rowCardInner}>
            <TouchableOpacity activeOpacity={0.65} style={styles.rowBetween}>
              <InnerShadowIcon icon={<AlertIcon width={24} height={24} />} size={40} radius={20} />
              <Text style={[styles.rowTitle, styles.rowTitleFlex]} numberOfLines={2}>
                Review Urgent
              </Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>3</Text>
              </View>
            </TouchableOpacity>
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.ctaFooter}>
          <ReusableButton
            title="Start Shift"
            onPress={goHome}
            containerStyle={styles.cta}
            gradientColors={["#A7F3D0", "#166534"]}
            backgroundColor={COLORS.PRIMARY}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShiftStart;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  body: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ctaFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 8 : 12,
  },
  avatarWrap: {
    width: 230,
    height: 230,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 110,
  },
  avatarImage: {
    width: 142,
    height: 142,
    resizeMode: "contain",
    borderRadius: 110,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  badgeCard: {
    marginTop: 30,
    width: "100%",
  },
  badgeCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  earnSlot: {
    marginRight: 12,
  },
  badgeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_80,
  },
  badgeBold: {
    fontWeight: "500",
  },
  tilesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    width: "100%",
    columnGap: 8,
  },
  tileCol: {
    flex: 1,
    minWidth: 0,
    marginBottom: 8,
  },
  rowCard: {
    marginTop: 16,
    width: "100%",
  },
  rowCardInner: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  rowTitleFlex: {
    marginRight: 8,
  },
  countBadge: {
    width: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: COLORS.ALERT,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: "500",
  },
  cta: {
    marginBottom: 0,
  },
});
