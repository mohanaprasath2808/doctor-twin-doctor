import React, { useCallback, useContext, useMemo } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import GraphFlowIcon from "../../../assets/icon/graphFlow.svg";
import MessageHelpIcon from "../../../assets/icon/messageHelpIcon.svg";
import SettingsIcon from "../../../assets/icon/settings.svg";
import OverlayImage from "../../../assets/image/imageBgShadow.png";
import AppButton from "../../../components/Common/AppButton";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import NeumorphicInnerShadowCard from "../../../components/neomorphism/NeumorphicInnerShadowCard";
import ProfileAvatar from "../../../components/neomorphism/ProfileAvatar";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../context/AuthContext";
import type { AppStackParamList } from "../../../router/App/AppStack";

type PerformanceItem = {
  id: string;
  value: string;
  label: string;
};

type RecognitionItem = {
  id: string;
  initials: string;
  name: string;
  role: string;
  message: string;
};

type LinkItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  routeName: typeof navigationStrings.HELP_TRAINING | typeof navigationStrings.GENERAL_SETTINGS;
};

const PERFORMANCE_ITEMS: PerformanceItem[] = [
  { id: "critical", value: "3", label: "Critical Interventions" },
  { id: "overdue", value: "5", label: "Overdue Tasks Resolved" },
  { id: "completed", value: "42", label: "Tasks Completed Today" },
];

const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    id: "bernard",
    initials: "BG",
    name: "Bernard",
    role: "Billing Manager",
    message: "Great job managing Mrs. Wilson's case.",
  },
  {
    id: "dr-shahinaz",
    initials: "DS",
    name: "Dr. Shahinaz",
    role: "Doctor",
    message: "Excellent teamwork in diabetes care.",
  },
];

const LINK_ITEMS: LinkItem[] = [
  {
    id: "help",
    label: "Help & Training",
    icon: <MessageHelpIcon width={20} height={20} />,
    routeName: navigationStrings.HELP_TRAINING,
  },
  {
    id: "settings",
    label: "General Settings",
    icon: <SettingsIcon width={20} height={20} />,
    routeName: navigationStrings.GENERAL_SETTINGS,
  },
];

const H_PADDING = 16;
/** Space above bottom tab bar so footer CTAs receive touches reliably. */
const TAB_BAR_CLEARANCE = 110;
const END_SHIFT_BUTTON_HEIGHT = 52;

const Profile = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  if (!authContext) {
    throw new Error("Profile must be used within AuthContextProvider");
  }

  const { setIsLogin } = authContext;
  const stars = useMemo(() => Array.from({ length: 5 }), []);

  const openEndShiftSummary = useCallback(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate(navigationStrings.END_SHIFT_SUMMARY as never);
      return;
    }
    navigation.navigate(navigationStrings.END_SHIFT_SUMMARY);
  }, [navigation]);

  const footerBottomPad = Math.max(insets.bottom, 12) + TAB_BAR_CLEARANCE;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}
            />
            <Text style={styles.headerTitle}>My Profile</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatarContainer}
            wrapperStyle={styles.heroAvatarWrap}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />
          <Text style={styles.heroSubtitle}>Here's your Profile.</Text>

          <NeumorphicCard borderRadius={10} outerStyle={{ marginTop: 30, marginHorizontal: H_PADDING }} innerStyle={styles.identityCardInner}>
            <View style={styles.identityRow}>
              <InnerShadowIcon
                size={60}
                icon={<MaterialCommunityIcons name="account" size={22} color={COLORS.PRIMARY} />}
              />
              <View style={styles.identityInfo}>
                <Text style={styles.identityName}>Sarah Williams</Text>
                <Text style={styles.identityMeta}>RN - Age 45</Text>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingRow}>
                  {stars.map((_, index) => (
                    <MaterialIcons key={`star-${index}`} name="star" size={20} color="#E6C343" />
                  ))}
                </View>
              </View>

            </View>
          </NeumorphicCard>

          <NeumorphicCard borderRadius={10} outerStyle={{ marginTop: 20, marginHorizontal: H_PADDING }} innerStyle={styles.identityCardInner}>
            <View style={styles.miniCardRow}>
              <NeumorphicInnerShadowCard
                borderRadius={10}
                backgroundColor={COLORS.INNER_SURFACE}
                containerStyle={styles.miniCard}
                contentStyle={styles.miniCardContent}
              >
                <IconComponent
                  width={40}
                  height={40}
                  radius={62}
                  icon={<MaterialCommunityIcons name="shield-check-outline" size={22} color={COLORS.PRIMARY} />}
                  onPress={() => { }}
                />
                <Text style={styles.miniCardLabel}>Trusted Teammate</Text>
              </NeumorphicInnerShadowCard>
              <NeumorphicInnerShadowCard
                borderRadius={10}
                backgroundColor={COLORS.INNER_SURFACE}
                containerStyle={styles.miniCard}
                contentStyle={styles.miniCardContent}
              >
                <IconComponent
                  width={40}
                  height={40}
                  radius={62}
                  icon={
                    <MaterialCommunityIcons
                      name="badge-account-horizontal-outline"
                      size={22}
                      color={COLORS.PRIMARY}
                    />
                  }
                  onPress={() => { }}
                />
                <Text style={styles.miniCardLabel}>Badges</Text>
              </NeumorphicInnerShadowCard>
            </View>
          </NeumorphicCard>


          <View style={styles.linkList}>
            {LINK_ITEMS.map((item, index) => (
              <View key={item.id} style={index !== 0 ? styles.linkSeparator : undefined}>
                <NeumorphicCard
                  borderRadius={10}
                  innerStyle={styles.linkCardInner}
                  onPress={() => navigation.navigate(item.routeName)}
                >
                  <View style={styles.linkRow}>
                    <InnerShadowIcon
                      size={40}
                      icon={
                        item.icon
                      }
                    />
                    <Text style={styles.linkLabel}>{item.label}</Text>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color={COLORS.TEXT_60}
                      style={styles.linkChevron}
                    />
                  </View>
                </NeumorphicCard>
              </View>
            ))}
          </View>

          <NeumorphicCard borderRadius={10} outerStyle={{ marginHorizontal: H_PADDING, marginTop: 20 }} innerStyle={styles.performanceCardInner}>
            <Text style={styles.sectionTitle}>Performance</Text>

            <FlatList
              data={PERFORMANCE_ITEMS}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.performanceDivider} />}
              contentContainerStyle={{ marginTop: 20 }}
              renderItem={({ item }) => (
                <View style={styles.performanceRow}>
                  <InnerShadowIcon
                    size={40}
                    icon={<GraphFlowIcon width={20} height={20} />}
                  />
                  <Text style={styles.performanceText}>
                    {item.value} {item.label}
                  </Text>
                </View>
              )}
            />
          </NeumorphicCard>

          <Text style={[styles.sectionTitle, { marginTop: 20, marginHorizontal: H_PADDING }]}>Recognition</Text>
          <View style={styles.recognitionList}>
            {RECOGNITION_ITEMS.map((item, index) => (
              <View key={item.id} style={index > 0 ? styles.recognitionSeparator : undefined}>
                <NeumorphicCard borderRadius={10} innerStyle={styles.recognitionCardInner}>
                  <View style={styles.recognitionHeader}>
                    <InnerShadowIcon
                      size={40}
                      icon={<Text style={styles.initialsText}>{item.initials}</Text>}
                    />
                    <View style={styles.recognitionHeaderText}>
                      <Text style={styles.recognitionName}>{item.name}</Text>
                      <Text style={styles.recognitionRole}>{item.role}</Text>
                    </View>
                  </View>
                  <NeumorphicInnerShadowCard
                    borderRadius={10}
                    backgroundColor={COLORS.INNER_SURFACE}
                    containerStyle={styles.recognitionMessageCard}
                    contentStyle={styles.recognitionMessageCardContent}
                  >
                    <Text style={styles.recognitionMessage}>{item.message}</Text>
                  </NeumorphicInnerShadowCard>
                </NeumorphicCard>
              </View>
            ))}
          </View>
          <View style={[styles.endShiftFooter]}>
            <AppButton
              text="End Shift"
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.TOAST_ERROR_BG}
              borderRadius={60}
              height={END_SHIFT_BUTTON_HEIGHT}
              textStyle={styles.endShiftText}
              style={styles.endShiftButton}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
              onPress={openEndShiftSummary}
            />
          </View>
        </ScrollView>


      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: H_PADDING,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  heroAvatarContainer: {
    marginTop: 20,
  },
  heroAvatarWrap: {
    width: 188,
    height: 188,
  },
  heroOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  heroImage: {
    width: 116,
    height: 116,
    borderRadius: 100,
    resizeMode: "cover",
  },
  heroSubtitle: {
    marginTop: 4,
    marginBottom: 14,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
  },
  identityCardInner: {
    padding: 10,
  },
  identityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  identityInfo: {
    flex: 1,
    marginLeft: 10,
  },
  identityName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  identityMeta: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.TEXT_80,
    fontWeight: "500",
  },
  ratingContainer: {
    height: "100%",
    alignItems: "flex-end",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  miniCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  miniCard: {
    height: 90,
    width: "48%",
  },
  miniCardContent: {
    height: "100%",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  miniCardLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  linkList: {
    marginTop: 20,
    marginHorizontal: H_PADDING,
  },
  linkSeparator: {
    marginTop: 12,
  },
  linkCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  linkChevron: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  performanceCardInner: {
    padding: 10,
  },
  performanceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  performanceText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  performanceDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 5,
  },
  recognitionCardInner: {
    padding: 10,
  },
  recognitionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  recognitionHeaderText: {
    marginLeft: 10,
    flex: 1,
  },
  recognitionName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  recognitionRole: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  initialsText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  recognitionMessageCard: {
    marginTop: 16,
  },
  recognitionMessageCardContent: {
    minHeight: 0,
    padding: 10,
  },
  recognitionMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
  },
  recognitionList: {
    marginTop: 20,
    marginHorizontal: H_PADDING,
  },
  recognitionSeparator: {
    marginTop: 12,
  },
  endShiftFooter: {
    paddingHorizontal: H_PADDING,
    paddingTop: 15,
    paddingBottom: 25,
  },
  endShiftButton: {
    width: "100%",
  },
  endShiftText: {
    color: COLORS.ALERT,
    fontSize: 16,
    fontWeight: "500",
  },
});
