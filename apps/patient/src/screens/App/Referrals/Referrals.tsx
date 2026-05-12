import React, { useContext, useMemo } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import NeumorphicQuickActionTile from "../../../components/Common/NeumorphicQuickActionTile";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import IconComponent from "../../../neomorphism/IconComponent";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";

import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import LabResultsIcon from "../../../assets/icons/labResults.svg";
import ReferralIcon from "../../../assets/icons/referral.svg";
import CheckedListPadIcon from "../../../assets/icons/checkedListPadIcon.svg";
import PharmacyIcon from "../../../assets/icons/pharmacyIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import TrackReferralsIcon from "../../../assets/icons/trackReferralIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import { AuthContext } from "../../../context/AuthContext";

type ReferralMenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const MENU_ITEMS: Omit<ReferralMenuItem, "onPress">[] = [
  { id: "lab-requests", label: "Lab Requests", icon: <LabResultsIcon width={32} height={32} /> },
  {
    id: "new-referral",
    label: "Request New Referral",
    icon: <ReferralIcon width={32} height={32} />,
  },
  { id: "track", label: "Track Referrals", icon: <TrackReferralsIcon width={32} height={32} /> },
];

const Referrals = () => {
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Referrals must be used within AuthContextProvider");
  }
  const { userData, localUserData } = authContext;
  const horizontalPadding = 16;
  const gap = 14;
  const visibleSlots = Math.min(3, MENU_ITEMS.length);
  const contentInnerWidth = screenWidth - horizontalPadding * 2;
  const itemColumnWidth = (contentInnerWidth - gap * (visibleSlots - 1)) / visibleSlots;
  const outerDiameter = Math.min(118, Math.max(88, itemColumnWidth - 10));
  const innerShadowDiameter = Math.max(70, outerDiameter - 22);

  /** Resolved display name string (prefer API user; else secure-store hydrated user). */
  const displayName = useMemo(() => {
    const fromApi = userData?.name;
    const fromLocal = localUserData?.name;
    return fromApi ?? fromLocal ?? "there";
  }, [userData, localUserData]);
  const menuData: ReferralMenuItem[] = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        onPress: () => {
          if (item.id === "lab-requests") {
            navigation.navigate(navigationStrings.LAB_REQUEST);
          }
          if (item.id === "new-referral") {
            navigation.navigate(navigationStrings.REQUEST_NEW_REFERRAL);
          }
          /** Extend: track referrals stack when wired */
        },
      })),
    [navigation],
  );

  const renderMenuItem = ({ item, index }: ListRenderItemInfo<ReferralMenuItem>) => (
    <NeumorphicQuickActionTile
      containerStyle={[
        styles.menuTile,
        {
          width: itemColumnWidth,
          marginRight: index === MENU_ITEMS.length - 1 ? 0 : gap,
        },
      ]}
      outerDiameter={outerDiameter}
      innerShadowDiameter={innerShadowDiameter}
      icon={item.icon}
      label={item.label}
      labelNumberOfLines={2}
      labelStyle={styles.menuLabel}
      onPress={item.onPress}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Referrals</Text>
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

        <Text style={styles.greeting}>Hi {displayName ?? "there"},</Text>
        <Text style={styles.subGreeting}>how can I assist you with referrals today?</Text>

        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
          contentContainerStyle={styles.horizontalListContent}
          renderItem={renderMenuItem}
        />

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate(navigationStrings.CONSULT_REPORTS_INBOX)}
          style={styles.consultTouchable}
        >
          <NeumorphicCard
            outerStyle={styles.fullCardOuter}
            innerStyle={styles.consultInner}
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
          >
            <InnerShadowIcon
              icon={<CheckedListPadIcon width={18} height={18} />}
              size={40}
              radius={114}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.consultTitle}>Consult Reports Inbox</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>
        </TouchableOpacity>

        <NeumorphicCard
          outerStyle={[styles.fullCardOuter, styles.pharmacyOuter]}
          innerStyle={styles.pharmacyInner}
          borderRadius={10}
          backgroundColor={COLORS.INNER_SURFACE}
        >
          <View style={styles.pharmacyLeft}>
            <InnerShadowIcon
              icon={<PharmacyIcon width={18} height={18} />}
              size={40}
              radius={114}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <View style={styles.pharmacyTextCol}>
              <Text style={styles.pharmacyName}>CVS Pharmacy</Text>
              <Text style={styles.pharmacySub}>Torrance Crossroads</Text>
            </View>
          </View>
          <AppButton
            activeOpacity={0.85}
            style={styles.changeBtn}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            text="Change"
            textStyle={styles.changeBtnText}
            onPress={() => undefined}
          />
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Referrals;

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
    paddingBottom: 120,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    paddingHorizontal: 0,
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
    backgroundColor: COLORS.ALERT,
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
  greeting: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  subGreeting: {
    marginTop: 2,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
    marginBottom: 8,
    paddingHorizontal: 8,
    fontFamily: "SF-Pro-Text-Regular",
  },
  horizontalList: {
    flexGrow: 0,
    marginHorizontal: -4,
    maxHeight: 200,
  },
  horizontalListContent: {
    paddingTop: 20,
    paddingBottom: 8,
    paddingRight: 4,
  },
  menuTile: {
    marginBottom: 0,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
    lineHeight: 18,
  },
  consultTouchable: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  fullCardOuter: {
    width: "100%",
  },
  /** Space between Consult card and Pharmacy card — margin on outer, not inner (avoids in-card banding). */
  pharmacyOuter: {
    marginTop: 20,
    width: "100%",
    overflow: "visible",
  },
  consultInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  consultTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  pharmacyInner: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    minHeight: 56,
  },
  pharmacyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  pharmacyTextCol: {
    flex: 1,
    minWidth: 0,
  },
  pharmacyName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
  },
  pharmacySub: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
    fontFamily: "SF-Pro-Text-Regular",
  },
  changeBtn: {
    width: 72,
    height: 28,
    borderRadius: 17,
    flexShrink: 0,
  },
  changeBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
});
