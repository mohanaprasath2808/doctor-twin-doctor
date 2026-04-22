import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackArrowIcon from "../../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../../assets/image/tempImage/doctorTempImage.png";
import AppButton from "../../../components/Common/AppButton";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import DoctorAvatar from "../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../components/Common/InsightMessageCard";
import IconComponent from "../../../components/neomorphism/IconComponent";
import NeumorphicCard from "../../../components/neomorphism/NeumorphicCard";
import navigationStrings from "../../../constants/navigationStrings";
import { COLORS } from "../../../constants/theme";
import type { AppStackParamList } from "../../../router/App/AppStack";

type ActionItem = { key: string; label: string };

const ACTION_GRID: ActionItem[] = [
  { key: "complete", label: "Complete" },
  { key: "assign", label: "Assign / Reassign" },
  { key: "escalate", label: "Escalate" },
  { key: "message", label: "Message Patient" },
];

const FOOTER_ACTIONS: ActionItem[] = [
  { key: "take", label: "Take It" },
  { key: "reminder", label: "Reminder" },
];

const PatientTaskDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute<RouteProp<AppStackParamList, "PatientTaskDetail">>();
  const p = route.params;


  const insight1 =
    p.insightMessage1 ??
    "With only 2 hours left, I suggest contacting Quest Labs directly.";
  const insight2 = p.insightMessage2 ?? "Can cancel answer?";

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const scrollBottomPad = 24;

  const renderActionItem = useCallback(
    ({ item }: { item: ActionItem }) => (
      <View style={styles.gridCell}>
        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={40}
          borderRadius={60}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.INNER_SURFACE}
          text={item.label}
          textStyle={styles.gridBtnText}
          onPress={() => {
            if (item.key === "complete") {
              navigation.navigate(navigationStrings.TASK_COMPLETED);
            }
            if (item.key === "assign") {
              navigation.navigate(navigationStrings.ASSIGN_TASK, {
                patientName: p.patientName,
              });
            }
            if (item.key === "escalate") {
              navigation.navigate(navigationStrings.ESCALATE_TASK);
            }
          }}
        />
      </View>
    ),
    [navigation, p.patientName],
  );

  const renderFooterItem = useCallback(
    ({ item }: { item: ActionItem }) => (
      <View style={styles.footerCell}>
        <AppButton
          activeOpacity={0.85}
          width="100%"
          height={48}
          borderRadius={26}
          borderWidth={1}
          borderColor={COLORS.PRIMARY}
          bgColor={COLORS.INNER_SURFACE}
          text={item.label}
          textStyle={styles.footerBtnText}
          onPress={() => { }}
        />
      </View>
    ),
    [],
  );


  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: scrollBottomPad }]}
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
            onPress={goBack}
          />
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            {p.patientName}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard
          borderRadius={10}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
        >
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.patientAvatar} />
            <View style={styles.patientCenter}>
              <View style={styles.patientNameRow}>
                <Text
                  style={styles.patientNameOnly}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {p.patientName}
                </Text>
                <Text
                  style={styles.patientAge}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {` • Age ${p.age}`}
                </Text>
              </View>
              <Text
                style={styles.taskStatus}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {p.taskStatus}
              </Text>
              <Text
                style={styles.taskDetailLine}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {p.taskDetailLine}
              </Text>
            </View>
            <View style={styles.dueBadgeWrap}>
              <DeltaBadge
                value={p.dueBadgeText}
                width={100}
                height={30}
                radius={15}
                bgColor="#FDECEC"
                darkShadowColor="rgba(197, 48, 48, 0.35)"
                lightShadowColor="#FFFFFFCC"
                textColor="#C53030"
                textStyle={styles.dueDeltaText}
              />
            </View>
          </View>
        </NeumorphicCard>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={31} containerSize={40} />
          <InsightMessageCard
            subTitle={insight1}
            bgColor="#CBF0FF"
            subTitleStyle={styles.insightBody}
          />
        </View>

        <NeumorphicCard
          borderRadius={10}
          backgroundColor={COLORS.INNER_SURFACE}
          outerStyle={styles.actionCardOuter}
          innerStyle={styles.actionCardInner}
        >
          <Text style={styles.actionCardTitle}>Shall I request the result for you?</Text>
          <FlatList
            data={ACTION_GRID}
            keyExtractor={(item) => item.key}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridColumnWrap}
            renderItem={renderActionItem}
          />
        </NeumorphicCard>
      </ScrollView>

      <View style={[styles.bottomDock]}>
        <View style={styles.messageRowDocked}>
          <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
          <InsightMessageCard
            subTitle={insight2}
            bgColor="#CBF0FF"
            subTitleStyle={styles.insightBody}
          />
        </View>
        <FlatList
          data={FOOTER_ACTIONS}
          keyExtractor={(item) => item.key}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.footerColumnWrap}
          renderItem={renderFooterItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default PatientTaskDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  patientCardOuter: {
    marginTop: 20,
    width: "100%",
  },
  patientCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  patientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 116,
    marginRight: 12,
    resizeMode: "cover",
  },
  patientCenter: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  patientNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    minWidth: 0,
  },
  patientNameOnly: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
  },
  patientAge: {
    flexShrink: 0,
    fontWeight: "400",
    fontSize: 12,
    color: COLORS.TEXT_70,
  },
  taskStatus: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  taskDetailLine: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
  },
  dueBadgeWrap: {
    alignSelf: "flex-start",
    maxWidth: 100,
  },
  dueDeltaText: {
    fontSize: 11,
    fontWeight: "600",
  },
  messageRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  messageRowDocked: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 12,
  },
  insightBody: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "400",
  },
  actionCardOuter: {
    marginTop: 20,
    width: "100%",
  },
  actionCardInner: {
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
  },
  gridColumnWrap: {
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  gridCell: {
    flex: 1,
  },
  gridBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
  bottomDock: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.INNER_SURFACE,
  },
  footerColumnWrap: {
    justifyContent: "space-between",
    gap: 12,
  },
  footerCell: {
    flex: 1,
  },
  footerBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});
