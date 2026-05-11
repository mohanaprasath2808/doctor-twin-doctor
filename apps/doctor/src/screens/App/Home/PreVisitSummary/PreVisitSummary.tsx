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
import BulbIcon from "../../../../assets/icon/bulbIcon.svg";
import TimerIcon from "../../../../assets/icon/timerIcon.svg";
import MailIcon from "../../../../assets/icon/mailIcon.svg";
import WarningIcon from "../../../../assets/icon/warningIcon.svg";
import RedWarningIcon from "../../../../assets/icon/redWarningIcon.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import NurseIcon from "../../../../assets/icon/nurseIcon.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import RefillsIcon from "../../../../assets/icon/refillsIcon.svg";
import PharmacyIcon from "../../../../assets/icon/pharmacyIcon.svg";
import PrimaryDocIcon from "../../../../assets/icon/primaryDocIcon.svg";
import ScribeIcon from "../../../../assets/icon/scribeIcon.svg";
import BluePlusIcn from "../../../../assets/icon/bluePlusIcn.svg";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";
import DelegationHubIcon from "../../../../assets/icon/delegationHubIcon.svg";
import ListIcon from "../../../../assets/icon/listIcon.svg";
import navigationStrings from "../../../../constants/navigationStrings";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";

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
  { id: "refill", label: "Refill", minWidth: 108, Icon: RefillsIcon },
  { id: "task", label: "Add to Task List", minWidth: 180, Icon: ListIcon },
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

type LabeledRow = { key: string; icon: React.ReactNode; text: string };

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
          {iconTint === "danger" ? (
            <View style={styles.iconDangerWrap}>
              <InnerShadowIcon size={40} radius={20} icon={item.icon} />
            </View>
          ) : (
            <InnerShadowIcon size={40} radius={20} icon={item.icon} />
          )}
        </View>
        <Text style={styles.rowText}>{item.text}</Text>
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
    icon: <LabReportIcon width={18} height={18} />,
    title: "Labs reviewed",
    sub: "Lipid panel • CMP",
    date: "Feb 24",
  },
  {
    id: "slv2",
    icon: <NurseIcon width={18} height={18} />,
    title: "Nurse triage note",
    sub: "BP 158/96 at visit",
    date: "Mar 2",
  },
  {
    id: "slv3",
    icon: <MailIcon width={18} height={18} />,
    title: "Patient message",
    sub: "Ongoing chest tightness x3 days",
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
    icon: <RefillsIcon width={18} height={18} />,
    name: "Atorvastatin",
    dose: "20 mg daily (refill due)",
  },
  {
    id: "m3",
    icon: <RedWarningIcon width={18} height={18} />,
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
    icon: <CalendarIcon width={18} height={18} />,
    title: "Lipid panel",
    sub: "LDL 157, HDL 42",
    date: "Jan 22",
  },
  {
    id: "r2",
    icon: <LabReportIcon width={18} height={18} />,
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
        iconSize={16}
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
          {item.danger ? (
            <View style={styles.iconDangerWrap}>
              <InnerShadowIcon size={40} radius={20} icon={item.icon} />
            </View>
          ) : (
            <InnerShadowIcon size={40} radius={20} icon={item.icon} />
          )}
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
    ({ item }) => <Text style={styles.planBullet}>• {item.text}</Text>,
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
                  <Text style={styles.timeText}>Scheduled at 10:30 AM</Text>
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
              <SectionTitle>Meds &amp; Safety</SectionTitle>
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
                icon: <ScribeIcon width={18} height={18} />,
                text: "Cardiology referral — not yet scheduled",
              },
              {
                key: "b",
                icon: <CalendarIcon width={18} height={18} />,
                text: "Repeat lipid panel — due 6 months ago",
              },
              {
                key: "c",
                icon: <LabReportIcon width={18} height={18} />,
                text: "Foot exam — incomplete",
              },
            ]}
          />

          <View style={styles.sectionBlock}>
            <NeumorphicCard
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={12}
            >
              <SectionTitle>Suggested Plan</SectionTitle>
              <FlatList
                data={SUGGESTED_PLAN_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                nestedScrollEnabled
                removeClippedSubviews={false}
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
    marginTop: 16,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.TEXT_80,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  sectionBlock: {
    marginTop: 20,
  },
  titleInCard: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
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
  iconDangerWrap: {
    borderRadius: 20,
    backgroundColor: COLORS.ALERT_LIGHT,
    overflow: "visible",
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    lineHeight: 20,
  },
  patientHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  patientHeadText: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  patientMeta: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.TEXT_70,
  },
  timeRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.TEXT_80,
  },
  reasonCol: {
    flex: 1,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  reasonBody: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.TEXT_80,
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
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  timelineSub: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.TEXT_80,
  },
  timelineDate: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    marginLeft: 4,
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
  planBullet: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.TEXT_DARK,
    marginBottom: 8,
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
  },
  startBtn: {
    marginTop: 0,
  },
  footerTagline: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.TEXT_70,
    textAlign: "center",
    lineHeight: 18,
  },
});
