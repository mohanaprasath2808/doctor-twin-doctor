import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import AppButton from "../../../../components/Common/AppButton";
import ReusableButton from "../../../../neomorphism/ReusableButton";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import BulbIcon from "../../../../assets/icon/infoIcon.svg";
import TimerIcon from "../../../../assets/icon/calendarBlackIcon.svg";
import MailIcon from "../../../../assets/icon/messageIcon.svg";
import WarningIcon from "../../../../assets/icon/infoBlueIcon.svg";
import RedWarningIcon from "../../../../assets/icon/redWarningIcon.svg";
import PharmacyRedIcon from "../../../../assets/icon/tabletRedIcon.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import TestTubeIcon from "../../../../assets/icon/testTubeIcon.svg";
import ResultIcon from "../../../../assets/icon/resultIcon.svg";
import RefillsIcon from "../../../../assets/icon/refillsIcon.svg";
import PharmacyIcon from "../../../../assets/icon/tabletBlueIcon.svg";
import PrimaryDocIcon from "../../../../assets/icon/ecgPadIcon.svg";
import LoopIcon from "../../../../assets/icon/loopBlueIcon.svg";
import BluePlusIcn from "../../../../assets/icon/orderBlueIcon.svg";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";
import DelegationHubIcon from "../../../../assets/icon/taskListIcon.svg";
import ListIcon from "../../../../assets/icon/listIcon.svg";
import navigationStrings from "../../../../constants/navigationStrings";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import DotIcon from "../../../../assets/icon/dotIcon.svg";
const INTRO = "Here's a quick summary before your visit. I've highlighted what needs attention.";

type ActionGlyph = React.ComponentType<{ width?: number; height?: number }>;

const ACTION_ITEMS: {
  id: string;
  label: string;
  minWidth: number;
  Icon: ActionGlyph;
}[] = [
  { id: "order", label: "Order", minWidth: 108, Icon: BluePlusIcn },
  { id: "message", label: "Message Staff", minWidth: 176, Icon: MailIcon },
  { id: "schedule", label: "Schedule Follow-Up", minWidth: 212, Icon: ScheduleIcon },
  { id: "refer", label: "Refer", minWidth: 96, Icon: DelegationHubIcon },
  { id: "refill", label: "Refill", minWidth: 108, Icon: DelegationHubIcon },
  { id: "task", label: "Add to Task List", minWidth: 180, Icon: DelegationHubIcon },
];

const SUGGESTED_PLAN_ITEMS = [
  {
    id: "plan-0",
    text: "Review BP control strategy and meds (consider ARB/maximize)",
  },
  {
    id: "plan-1",
    text: "Order lipid panel; intensify statin if LDL still elevated",
  },
  {
    id: "plan-2",
    text: "Chest pain: document HPI, consider ECG today; risk stratify",
  },
  {
    id: "plan-3",
    text: "Titrating DM meds; discuss CGM or intensifying therapy if A1c remains >8%",
  },
];

function Separator() {
  return <View style={styles.sep} />;
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.titleInCard}>{children}</Text>;
}

type LabeledRow = { key: string; icon: React.ReactNode; text: string; subText?: string };

function LabeledRowsCard({
  title,
  rows,
  iconTint,
}: {
  title: string;
  rows: LabeledRow[];
  iconTint?: "danger";
}) {
  const renderRow: ListRenderItem<LabeledRow> = useCallback(
    ({ item }) => (
      <View style={styles.labeledRow}>
        <View style={styles.iconShadowSlot}>
          <InnerShadowIcon
            size={40}
            radius={20}
            icon={item.icon}
            backgroundColor={iconTint === "danger" ? COLORS.ALERT_LIGHT : undefined}
          />
        </View>
        <View style={styles.rowTextCol}>
          <Text style={styles.rowText}>{item.text}</Text>
          {!!item.subText && <Text style={styles.rowSubText}>{item.subText}</Text>}
        </View>
      </View>
    ),
    [iconTint],
  );

  return (
    <View style={styles.sectionBlock}>
      <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
        <SectionTitle>{title}</SectionTitle>
        <FlatList
          data={rows}
          keyExtractor={(r) => r.key}
          scrollEnabled={false}
          nestedScrollEnabled
          removeClippedSubviews={false}
          style={styles.iconFlatList}
          contentContainerStyle={styles.iconFlatListContent}
          ItemSeparatorComponent={Separator}
          renderItem={renderRow}
        />
      </NeumorphicCard>
    </View>
  );
}

type TimelineItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  date: string;
};

const SINCE_LAST_VISIT_ITEMS: TimelineItem[] = [
  {
    id: "slv1",
    icon: <PrimaryDocIcon width={18} height={18} />,
    title: "New Cholesterol Panel",
    sub: "LDL cholesterocreased",
    date: "Feb 24",
  },
  {
    id: "slv2",
    icon: <TestTubeIcon width={18} height={18} />,
    title: "Stress Test",
    sub: "Mildly abnormal; follow-up not scheduled",
    date: "Mar 2",
  },
  {
    id: "slv3",
    icon: <MailIcon width={18} height={18} />,
    title: "Patient message",
    sub: "Reports some exertional chest pain",
    date: "Apr 5",
  },
];

type MedItem = {
  id: string;
  icon: React.ReactNode;
  name: string;
  dose: string;
  danger?: boolean;
};

const MEDS_ITEMS: MedItem[] = [
  {
    id: "m1",
    icon: <PharmacyIcon width={18} height={18} />,
    name: "Lisinopril",
    dose: "10 mg daily",
  },
  {
    id: "m2",
    icon: <PharmacyIcon width={18} height={18} />,
    name: "Atorvastatin",
    dose: "20 mg daily (refill due)",
  },
  {
    id: "m3",
    icon: <PharmacyRedIcon width={18} height={18} />,
    name: "Metformin",
    dose: "1000 mg BID • monitor renal function",
    danger: true,
  },
];

type ResultItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  date: string;
};

const RESULTS_ITEMS: ResultItem[] = [
  {
    id: "r1",
    icon: <ResultIcon width={18} height={18} />,
    title: "Lipid panel",
    sub: "LDL 157, HDL 42",
    date: "Jan 22",
  },
  {
    id: "r2",
    icon: <ResultIcon width={18} height={18} />,
    title: "A1c",
    sub: "8.2%",
    date: "Jan 22",
  },
];

const PreVisitSummary = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderAction = useCallback(({ item }: { item: (typeof ACTION_ITEMS)[number] }) => {
    const Glyph = item.Icon;
    return (
      <AppButton
        text={item.label}
        leftIcon={<Glyph />}
        iconSize={18}
        width={item.minWidth}
        height={44}
        borderRadius={22}
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        textStyle={styles.actionBtnText}
        style={styles.actionBtn}
      />
    );
  }, []);

  const renderTimeline: ListRenderItem<TimelineItem> = useCallback(({ item }) => {
    return (
      <View style={styles.timelineRow}>
        <View style={styles.iconShadowSlot}>
          <InnerShadowIcon size={40} radius={20} icon={item.icon} />
        </View>
        <View style={styles.timelineMain}>
          <Text style={styles.timelineTitle}>{item.title}</Text>
          <Text style={styles.timelineSub}>{item.sub}</Text>
        </View>
        <Text style={styles.timelineDate}>{item.date}</Text>
      </View>
    );
  }, []);

  const renderMed: ListRenderItem<MedItem> = useCallback(({ item }) => {
    return (
      <View style={styles.medRow}>
        <View style={styles.iconShadowSlot}>
          <InnerShadowIcon
            size={40}
            radius={20}
            icon={item.icon}
            backgroundColor={item.danger ? COLORS.ALERT_LIGHT : undefined}
          />
        </View>
        <View style={styles.medTextCol}>
          <Text style={styles.medName}>{item.name}</Text>
          <Text style={styles.medDose}>{item.dose}</Text>
        </View>
      </View>
    );
  }, []);

  const renderResult: ListRenderItem<ResultItem> = useCallback(({ item }) => {
    return (
      <View style={styles.timelineRow}>
        <View style={styles.iconShadowSlot}>
          <InnerShadowIcon size={40} radius={20} icon={item.icon} />
        </View>
        <View style={styles.timelineMain}>
          <Text style={styles.timelineTitle}>{item.title}</Text>
          <Text style={styles.timelineSub}>{item.sub}</Text>
        </View>
        <Text style={styles.timelineDate}>{item.date}</Text>
      </View>
    );
  }, []);

  const renderPlanLine: ListRenderItem<{ id: string; text: string }> = useCallback(
    ({ item }) => (
      <View style={[styles.planBulletRow]}>
        <DotIcon width={18} height={18} />
        <Text style={styles.planBullet}>{item.text}</Text>
      </View>
    ),
    [],
  );

  const bottomPad = 16 + insets.bottom;

  //handle start encounter
  const handleStartEncounter = () => {
    navigation.navigate(navigationStrings.END_ENCOUNTER as never);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled
        >
          <View style={styles.header}>
            <IconComponent
              icon={<BackIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Pre-Visit Summary</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.heroAvatar}
            wrapperStyle={styles.heroWrapper}
            overlayStyle={styles.heroOverlay}
            imageStyle={styles.heroImage}
          />

          <Text style={styles.intro}>{INTRO}</Text>

          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={12}
          >
            <View style={styles.patientHead}>
              <Image source={DoctorTempImage} style={styles.patientAvatar} />
              <View style={styles.patientHeadText}>
                <Text style={styles.patientName}>Amanda Patel</Text>
                <Text style={styles.patientMeta}>Annual Physical • Age 45 • Female</Text>
                <View style={styles.timeRow}>
                  <TimerIcon width={14} height={14} />
                  <Text style={styles.timeText}>
                    Scheduled at <Text style={styles.timeTextBold}>10:30 AM</Text>
                  </Text>
                </View>
              </View>
            </View>
            <Separator />
            <View style={styles.row}>
              <View style={styles.iconShadowSlot}>
                <InnerShadowIcon
                  size={40}
                  radius={20}
                  icon={<PrimaryDocIcon width={18} height={18} />}
                />
              </View>
              <View style={styles.reasonCol}>
                <Text style={styles.reasonLabel}>Reason</Text>
                <Text style={styles.reasonBody}>Routine check-up and cholesterol follow-up</Text>
              </View>
            </View>
          </NeumorphicCard>

          <LabeledRowsCard
            title="Visit Trigger"
            rows={[
              {
                key: "a",
                icon: <BulbIcon width={18} height={18} />,
                text: "Routine follow-up",
              },
              {
                key: "b",
                icon: <BulbIcon width={18} height={18} />,
                text: "Recent chest pain message",
              },
            ]}
          />

          <LabeledRowsCard
            title="Key Risks"
            iconTint="danger"
            rows={[
              {
                key: "a",
                icon: <RedWarningIcon width={18} height={18} />,
                text: "Uncontrolled hypertension",
              },
              {
                key: "b",
                icon: <RedWarningIcon width={18} height={18} />,
                text: "A1C elevated (8.2)",
              },
              {
                key: "c",
                icon: <RedWarningIcon width={18} height={18} />,
                text: "Chest pain reported",
              },
            ]}
          />

          <View style={styles.sectionBlock}>
            <NeumorphicCard
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={12}
            >
              <SectionTitle>Since Last Visit</SectionTitle>
              <FlatList
                data={SINCE_LAST_VISIT_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                nestedScrollEnabled
                removeClippedSubviews={false}
                style={styles.iconFlatList}
                contentContainerStyle={styles.iconFlatListContent}
                ItemSeparatorComponent={Separator}
                renderItem={renderTimeline}
              />
            </NeumorphicCard>
          </View>

          <LabeledRowsCard
            title="Active Problems"
            rows={[
              {
                key: "a",
                icon: <WarningIcon width={18} height={18} />,
                text: "Hypertension (uncontrolled)",
              },
              {
                key: "b",
                icon: <WarningIcon width={18} height={18} />,
                text: "Hyperlipidemia (uncontrolled)",
              },
              {
                key: "c",
                icon: <WarningIcon width={18} height={18} />,
                text: "Type 2 Diabetes (A1c 8.2, uncontrolled)",
              },
            ]}
          />

          <View style={styles.sectionBlock}>
            <NeumorphicCard
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={12}
            >
              <SectionTitle>Meds & Safety</SectionTitle>
              <FlatList
                data={MEDS_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                nestedScrollEnabled
                removeClippedSubviews={false}
                style={styles.iconFlatList}
                contentContainerStyle={styles.iconFlatListContent}
                ItemSeparatorComponent={Separator}
                renderItem={renderMed}
              />
            </NeumorphicCard>
          </View>

          <View style={styles.sectionBlock}>
            <NeumorphicCard
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={12}
            >
              <SectionTitle>Results</SectionTitle>
              <FlatList
                data={RESULTS_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                nestedScrollEnabled
                removeClippedSubviews={false}
                style={styles.iconFlatList}
                contentContainerStyle={styles.iconFlatListContent}
                ItemSeparatorComponent={Separator}
                renderItem={renderResult}
              />
            </NeumorphicCard>
          </View>

          <LabeledRowsCard
            title="Open Loops"
            rows={[
              {
                key: "a",
                icon: <LoopIcon width={18} height={18} />,
                text: "Cardiology referral — not yet scheduled",
                subText: "Needs scheduling",
              },
              {
                key: "b",
                icon: <LoopIcon width={18} height={18} />,
                text: "Repeat lipid panel — due 6 months ago",
                subText: "Overdue",
              },
              {
                key: "c",
                icon: <LoopIcon width={18} height={18} />,
                text: "Foot exam — incomplete",
                subText: "Complete at next visit",
              },
            ]}
          />

          <View style={styles.sectionBlock}>
            <NeumorphicCard
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={12}
            >
              <Text style={[styles.titleInCard, styles.planSectionTitle]}>Suggested Plan</Text>
              <FlatList
                data={SUGGESTED_PLAN_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                nestedScrollEnabled
                removeClippedSubviews={false}
                contentContainerStyle={styles.planListContent}
                renderItem={renderPlanLine}
              />
            </NeumorphicCard>
          </View>

          <View style={styles.actionsSection}>
            <FlatList
              horizontal
              data={ACTION_ITEMS}
              keyExtractor={(i) => i.id}
              renderItem={renderAction}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              removeClippedSubviews={false}
              contentContainerStyle={styles.actionsListInScroll}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            />
          </View>

          <View style={{ height: bottomPad + 100 }} />
        </ScrollView>

        <View style={[styles.bottomDock, { paddingBottom: bottomPad }]}>
          <ReusableButton
            title="Start Encounter"
            onPress={() => handleStartEncounter()}
            height={52}
            borderRadius={26}
            containerStyle={styles.startBtn}
            textStyle={styles.startBtnText}
          />
          <Text style={styles.footerTagline}>
            {"I'm ready when you are. Let's begin the visit."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PreVisitSummary;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: { width: 40, height: 40 },
  heroAvatar: {
    marginTop: 4,
  },
  heroWrapper: {
    width: 200,
    height: 200,
  },
  heroOverlay: {
    borderRadius: 100,
  },
  heroImage: {
    width: 120,
    height: 120,
  },
  intro: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    lineHeight: 20,
    color: COLORS.TEXT_DARK,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  sectionBlock: {
    marginTop: 20,
  },
  titleInCard: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,

    paddingTop: 12,
  },
  sep: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  labeledRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTextCol: {
    flex: 1,
  },
  iconShadowSlot: {
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  iconFlatList: {
    overflow: "visible",
  },
  iconFlatListContent: {
    flexGrow: 0,
    ...Platform.select({
      android: { paddingTop: 16, paddingBottom: 14 },
      default: { paddingTop: 14, paddingBottom: 12 },
    }),
  },
  rowText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
    lineHeight: 18,
  },
  rowSubText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_60,
    lineHeight: 16,
  },
  patientHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  patientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  patientHeadText: {
    flex: 1,
    gap: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    lineHeight: 18,
    fontFamily: "SF-Pro-Text-Medium",
  },
  patientMeta: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_70,
    lineHeight: 18,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_60,
    lineHeight: 14,
  },
  timeTextBold: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Bold",
    color: COLORS.TEXT_70,
    lineHeight: 14,
  },
  reasonCol: {
    flex: 1,
  },
  reasonLabel: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  reasonBody: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_60,
    lineHeight: 18,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timelineMain: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
    lineHeight: 18,
  },
  timelineSub: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_60,
    lineHeight: 18,
  },
  timelineDate: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_60,
    marginLeft: 4,
    lineHeight: 18,
  },
  medRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  medTextCol: {
    flex: 1,
  },
  medName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  medDose: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.TEXT_80,
  },
  planSectionTitle: {
    marginBottom: 12,
  },
  planListContent: {
    paddingBottom: 4,
  },
  planBullet: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  actionsSection: {
    marginTop: 24,
    marginHorizontal: -16,
  },
  actionsListInScroll: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 4,
    alignItems: "center",
  },
  bottomDock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.SURFACE,
  },
  actionBtn: {
    flexShrink: 0,
    marginBottom: 10,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  startBtn: {
    marginTop: 0,
  },
  footerTagline: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_70,
    textAlign: "center",
    lineHeight: 18,
  },
  planBulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    fontFamily: "SF-Pro-Text-Medium",
  },
});
