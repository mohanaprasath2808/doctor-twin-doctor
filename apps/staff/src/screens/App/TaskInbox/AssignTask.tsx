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
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import NeumorphicRadioMark from "../../../components/Common/NeumorphicRadioMark";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import ReusableButton from "../../../components/neomorphism/ReusableButton";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../router/App/AppStack";

type StaffBadgeVariant = "full" | "soon" | "tomorrow" | "break";

type StaffMember = {
  id: string;
  name: string;
  age: number;
  availability: string;
  badgeLabel: string;
  variant: StaffBadgeVariant;
  avatar: ImageSourcePropType;
};

const STAFF_LIST: StaffMember[] = [
  {
    id: "bernard",
    name: "Bernard",
    age: 49,
    availability: "Available",
    badgeLabel: "Full Now",
    variant: "full",
    avatar: DoctorTempImage,
  },
  {
    id: "allison",
    name: "Allison",
    age: 36,
    availability: "Online Now",
    badgeLabel: "Available soon",
    variant: "soon",
    avatar: DoctorTempImage,
  },
  {
    id: "sarah",
    name: "Sarah",
    age: 41,
    availability: "Online Now",
    badgeLabel: "Returns Tomorrow",
    variant: "tomorrow",
    avatar: DoctorTempImage,
  },
  {
    id: "clayton",
    name: "Clayton",
    age: 52,
    availability: "Available",
    badgeLabel: "On Break Now",
    variant: "break",
    avatar: DoctorTempImage,
  },
];

const badgePalette = (v: StaffBadgeVariant) => {
  switch (v) {
    case "full":
      return {
        bg: "#D3FFF1",
        text: "#10B981",
        dark: "#A9E9D5",
      };
    case "soon":
    case "tomorrow":
      return {
        bg: "#FFFDF8",
        text: "#EEB621",
        dark: "#EDE0BE",
      };
    case "break":
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


const AssignTask = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute();

  const [selectedId, setSelectedId] = useState(STAFF_LIST[0].id);

  const selectedStaff = useMemo(
    () => STAFF_LIST.find((s) => s.id === selectedId) ?? STAFF_LIST[0],
    [selectedId],
  );


  const renderStaff = useCallback(
    ({ item }: { item: StaffMember }) => {
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
                  <Text style={styles.staffAge} numberOfLines={1} ellipsizeMode="tail">
                    {` • Age ${item.age}`}
                  </Text>
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
        <View style={styles.header}>
          <IconComponent
            icon={<BackArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => { navigation.goBack() }}
          />
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            Assign Task
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          data={STAFF_LIST}
          keyExtractor={(item) => item.id}
          renderItem={renderStaff}
          style={styles.staffList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <View style={styles.footerDock}>
        <View style={styles.footerRow}>
          <AppButton
            activeOpacity={0.85}
            width="48%"
            height={48}
            borderRadius={26}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.INNER_SURFACE}
            text="Change Staff"
            textStyle={styles.footerOutlineText}
            onPress={() => { }}
          />
          <AppButton
            activeOpacity={0.85}
            width="48%"
            height={48}
            borderRadius={26}
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor="#FDECEC"
            text="Escalate"
            textStyle={styles.footerEscalateText}
            onPress={() => { navigation.navigate(navigationStrings.ESCALATE_TASK) }}
          />
        </View>
        <ReusableButton
          title={`Assign to ${selectedStaff.name}`}
          height={52}
          borderRadius={26}
          gradientColors={["#A7F3D0", "#166534"]}
          backgroundColor={COLORS.PRIMARY}
          containerStyle={styles.assignPrimary}
          onPress={() => { }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AssignTask;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  mainColumn: {
    flex: 1,
    minHeight: 0,
  },
  staffList: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  contextHint: {
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.TEXT_60,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
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
  footerDock: {
    paddingHorizontal: 16,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  footerOutlineText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "600",
  },
  footerEscalateText: {
    color: COLORS.ALERT,
    fontSize: 15,
    fontWeight: "600",
  },
  assignPrimary: {
    marginBottom: 4,
  },
});
