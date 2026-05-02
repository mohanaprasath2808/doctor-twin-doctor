import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import WarningTriangleIcon from "../../../assets/icon/warningTriangleYellow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import InnerShadowIcon from "../../../components/neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";

type StaffBadgeVariant = "available" | "soon" | "break" | "breakShort";

type EscalateStaffMember = {
  id: string;
  name: string;
  age?: number;
  availability: string;
  badgeLabel: string;
  variant: StaffBadgeVariant;
  avatar: ImageSourcePropType;
};

const ESCALATE_STAFF: EscalateStaffMember[] = [
  {
    id: "davis",
    name: "Notify Dr. Davis",
    availability: "Available",
    badgeLabel: "Available Now",
    variant: "available",
    avatar: DoctorTempImage,
  },
  {
    id: "jason",
    name: "Jason",
    age: 34,
    availability: "Online Now",
    badgeLabel: "Available soon",
    variant: "soon",
    avatar: DoctorTempImage,
  },
  {
    id: "sarah",
    name: "Sarah",
    age: 41,
    availability: "Returns Tomorrow",
    badgeLabel: "On Break",
    variant: "break",
    avatar: DoctorTempImage,
  },
  {
    id: "clayton",
    name: "Clayton",
    age: 52,
    availability: "Available",
    badgeLabel: "10m Break Now",
    variant: "breakShort",
    avatar: DoctorTempImage,
  },
];

const badgePalette = (v: StaffBadgeVariant) => {
  switch (v) {
    case "available":
      return {
        bg: "#D3FFF1",
        text: "#10B981",
        dark: "#A9E9D5",
      };
    case "soon":
      return {
        bg: "#FFFDF8",
        text: "#EEB621",
        dark: "#EDE0BE",
      };
    case "break":
    case "breakShort":
      return {
        bg: "#FDECEC",
        text: "#C53030",
        dark: "rgba(197, 48, 48, 0.35)",
      };
    default:
      return {
        bg: COLORS.ACCENT,
        text: COLORS.PRIMARY,
        dark: COLORS.DARK_SHADOW,
      };
  }
};


const EscalateTask = () => {
  const navigation = useNavigation();

  const [selectedId, setSelectedId] = useState(ESCALATE_STAFF[0].id);

  const selectedStaff = useMemo(
    () => ESCALATE_STAFF.find((s) => s.id === selectedId) ?? ESCALATE_STAFF[0],
    [selectedId],
  );


  const renderStaff = useCallback(
    ({ item }: { item: EscalateStaffMember }) => {
      const pal = badgePalette(item.variant);
      return (
        <Pressable onPress={() => setSelectedId(item.id)} style={styles.rowPress}>
          <NeumorphicCard
            borderRadius={10}
            backgroundColor={COLORS.INNER_SURFACE}
            outerStyle={styles.staffCardOuter}
            innerStyle={styles.staffCardInner}
          >
            <View style={styles.staffRow}>
              <NeumorphicRadioMark selected={selectedId === item.id} />
              <View style={styles.avatarWrap}>
                <Image source={item.avatar} style={styles.avatar} />
              </View>
              <View style={styles.staffCenter}>
                <View style={styles.nameRow}>
                  <Text style={styles.staffName} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                  </Text>
                  {item.age != null ? (
                    <Text style={styles.staffAge} numberOfLines={1} ellipsizeMode="tail">
                      {` • Age ${item.age}`}
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.availability} numberOfLines={1} ellipsizeMode="tail">
                  {item.availability}
                </Text>
              </View>
              <View style={styles.badgeWrap}>
                <DeltaBadge
                  value={item.badgeLabel}
                  height={28}
                  radius={14}
                  bgColor={pal.bg}
                  darkShadowColor={pal.dark}
                  lightShadowColor="#FFFFFFCC"
                  textColor={pal.text}
                  textStyle={styles.badgeText}
                />
              </View>
            </View>
          </NeumorphicCard>
        </Pressable>
      );
    },
    [selectedId],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.mainColumn}>
        <View style={styles.pagePadding}>
          <View style={styles.header}>
            <IconComponent
              icon={<BackArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
              Escalate Task
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          <NeumorphicCard
            borderRadius={10}
            backgroundColor="#FFF9E9"
            outerStyle={styles.riskCardOuter}
            innerStyle={styles.riskCardInner}
          >
            <View style={styles.riskRow}>
              <InnerShadowIcon
                icon={<WarningTriangleIcon width={18} height={18} />}
                size={36}
                radius={114}
              />
              <View style={styles.riskTextCol}>
                <Text style={styles.riskTitle} numberOfLines={2}>
                  Moderate Risk
                </Text>
                <Text style={styles.riskBody} numberOfLines={4}>
                  Risk of delay in care management, and patient parameters worsening
                </Text>
              </View>
            </View>
          </NeumorphicCard>

        </View>

        <FlatList
          data={ESCALATE_STAFF}
          keyExtractor={(item) => item.id}
          renderItem={renderStaff}
          style={styles.staffList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <View style={[styles.pagePadding, styles.suggestionBlock]}>
          <View style={styles.messageRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
            <InsightMessageCard
              title="I suggest Bernard"
              subTitle="he's the most readily available."
              bgColor="#CBF0FF"
              titleStyle={styles.insightTitle}
              subTitleStyle={styles.insightSub}
            />
          </View>
        </View>
      </View>

      <View style={[styles.footerDock]}>
        <View style={styles.footerRow}>
          <View style={styles.footerHalf}>
            <ReusableButton
              title={`Assign to ${selectedStaff.name}`}
              height={52}
              borderRadius={26}
              width="100%"
              gradientColors={["#A7F3D0", "#166534"]}
              backgroundColor={COLORS.PRIMARY}
              onPress={() => { }}
            />
          </View>
          <View style={styles.footerHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.ALERT}
              bgColor={COLORS.INNER_SURFACE}
              text="Escalate"
              textStyle={styles.footerEscalateText}
              onPress={() => { }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EscalateTask;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  mainColumn: {
    flex: 1,
    minHeight: 0,
  },
  pagePadding: {
    paddingHorizontal: 16,
  },
  staffList: {
    flex: 1,
    paddingTop: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  contextHint: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_60,
  },
  riskCardOuter: {
    width: "100%",
  },
  riskCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  riskTextCol: {
    flex: 1,
    minWidth: 0,
  },
  riskTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_80,
  },
  riskBody: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_80,
  },
  listSectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_60,
    marginBottom: 10,
  },
  separator: {
    height: 12,
  },
  rowPress: {},
  staffCardOuter: {
    width: "100%",
  },
  staffCardInner: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  staffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarWrap: {
    marginLeft: 2,
  },
  staffCenter: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    minWidth: 0,
  },
  staffName: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  staffAge: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  availability: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  badgeWrap: {
    alignSelf: "center",
    maxWidth: 140,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  suggestionBlock: {
    marginTop: 20,
    paddingBottom: 8,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  suggestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  insightTitle: {
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
  },
  insightSub: {
    color: COLORS.TEXT_70,
  },
  footerDock: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  footerHalf: {
    flex: 1,
    minWidth: 0,
  },
  footerEscalateText: {
    color: COLORS.ALERT,
    fontSize: 16,
    fontWeight: "500",
  },
});
