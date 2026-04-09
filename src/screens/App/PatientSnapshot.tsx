import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import AppButton from "../../components/Common/AppButton";
import NeumorphicCard from "../../components/Common/NeumorphicCard";
import DeltaBadge from "../../components/Common/DeltaBadge";
import BackIcon from "../../assets/icon/backArrow.svg";
import DoctorTempImage from "../../assets/image/tempImage/doctorTempImage.png";
import ZoomCallIcon from "../../assets/icon/zoomCallIcon.svg";
import MessageIcon from "../../assets/icon/messageIcon.svg";
import ScheduleIcon from "../../assets/icon/scheduleIcon.svg";
import PlusIcon from "../../assets/icon/plusIcon.svg";
import ScribeIcon from "../../assets/icon/scribeIcon.svg";
import WarningIcon from "../../assets/icon/warningIcon.svg";
import BrainIcon from "../../assets/icon/brainIcon.svg";
import XrayImage from "../../assets/image/tempImage/xrayImage.png";
import CapsuleIcon from "../../assets/icon/capsuleIcon.svg";
const TOP_ACTIONS = [
  { label: "Call", icon: <ZoomCallIcon /> },
  { label: "Message", icon: <MessageIcon /> },
  { label: "Schedule", icon: <ScheduleIcon /> },
  { label: "Task", icon: <PlusIcon /> },
  { label: "Scribe", icon: <ScribeIcon /> },
];
const CLINICAL_ACTIONS = [
  { label: "Regenerate", icon: <BrainIcon /> },
  { label: "Add to note", icon: <PlusIcon /> },
  { label: "Copy text", icon: <ScribeIcon /> },
];
const OPEN_TALK_METRICS = [
  { label: "Refills", value: "2" },
  { label: "Labs", value: "1" },
  { label: "Imaging", value: "0" },
  { label: "PAP", value: "1" },
  { label: "Messages", value: "3" },
  { label: "Billing", value: "1" },
  { label: "Lab Gaps", value: "4" },
];
const MEDS = [
  { name: "Lipitor 20 mg", dose: "EID" },
  { name: "Metformin 500mg", dose: "Daily" },
];

type MedTab = "active" | "safety";

const PatientSnapshot = () => {
  const navigation = useNavigation<any>();
  const [selectedMedTab, setSelectedMedTab] = useState<MedTab>("active");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.backWrap}>
            <IconComponent
              icon={<BackIcon width={16} height={16} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={styles.headerTitle}>Patient Snapshot</Text>
        </View>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.topCardInner}
        >
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.avatar} />
            <View style={styles.patientDetails}>
              <Text style={styles.patientName}>Sarah Williams</Text>
              <View style={styles.patientMetaRow}>
                <Text style={styles.patientMeta}>Female</Text>
                <View style={styles.metaDot} />
                <Text style={styles.patientMeta}>Age 45</Text>
                <View style={styles.metaDot} />
                <Text style={styles.patientMeta}>02/12/1992</Text>
              </View>
            </View>
          </View>
          <View style={styles.topActionListWrap}>
            <FlatList
              data={TOP_ACTIONS}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topActionList}
              ItemSeparatorComponent={() => <View style={styles.hSpace8} />}
              renderItem={({ item }) => (
                <AppButton
                  text={item.label}
                  leftIcon={item.icon}
                  iconSize={18}
                  borderWidth={1}
                  useGradientBorder
                  bgColor={COLORS.SURFACE}
                  style={styles.smallActionBtn}
                  textStyle={[styles.smallBtnText, styles.primaryBtnText]}
                />
              )}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={[styles.warnInner, { backgroundColor: "#FFF9E9" }]}
        >
          <View style={styles.warnRow}>
            <InnerShadowIcon
              icon={<WarningIcon width={18} height={18} />}
              size={36}
            />
            <Text style={styles.warnText}>
              Abnormal Lab:
              <Text style={styles.warnTextBold}>
                {" "}
                A1c 9.2% - needs sign-off
              </Text>
            </Text>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.sectionInner}
        >
          <Text style={styles.sectionTitle}>Clinical Summary</Text>
          <Text style={styles.summaryText}>
            DM2, HTN, CKD2. Last visit 3 months ago. A1c trending up. On
            metformin...
          </Text>
          <View style={styles.separator} />
          <View style={styles.topActionListWrap}>
            <FlatList
              data={CLINICAL_ACTIONS}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topActionList}
              ItemSeparatorComponent={() => <View style={styles.hSpace8} />}
              renderItem={({ item }) => (
                <AppButton
                  text={item.label}
                  leftIcon={item.icon}
                  iconSize={16}
                  borderWidth={1}
                  useGradientBorder
                  bgColor={COLORS.SURFACE}
                  style={styles.mediumActionBtn}
                  textStyle={[styles.smallBtnText, styles.primaryBtnText]}
                />
              )}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.sectionInner}
        >
          <Text style={styles.sectionTitle}>Open Talk</Text>
          <FlatList
            data={OPEN_TALK_METRICS}
            keyExtractor={(item) => item.label}
            numColumns={4}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.talkList}
            columnWrapperStyle={styles.talkListRow}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.metricItemWrap,
                  index >= 4 && styles.metricItemWrapWide,
                ]}
              >
                <NeumorphicCard
                  outerStyle={styles.metricOuter}
                  innerStyle={styles.metricInner}
                  borderRadius={10}
                >
                  <Text style={styles.metricValue}>{item.value}</Text>
                  <Text style={styles.metricLabel}>{item.label}</Text>
                </NeumorphicCard>
              </View>
            )}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.sectionInner}
        >
          <Text style={styles.sectionTitle}>Medications & Safety</Text>
          <View style={styles.medTabs}>
            <MedFilterChip
              title="Active Meds"
              selected={selectedMedTab === "active"}
              onPress={() => setSelectedMedTab("active")}
            />
            <MedFilterChip
              title="Safety / Interactions"
              selected={selectedMedTab === "safety"}
              onPress={() => setSelectedMedTab("safety")}
            />
          </View>
          {MEDS.map((med, index) => (
            <View key={med.name}>
              <View style={styles.medRow}>
                <InnerShadowIcon
                  icon={<CapsuleIcon width={18} height={18} />}
                  size={40}
                />
                <View>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDose}>{med.dose}</Text>
                </View>
              </View>
              {index < MEDS.length - 1 ? (
                <View style={styles.medSeparator} />
              ) : null}
            </View>
          ))}
          <View style={styles.actionRow}>
            <AppButton
              text="Renew"
              borderWidth={1}
              useGradientBorder
              bgColor={COLORS.SURFACE}
              style={styles.medActionBtn}
              textStyle={[styles.smallBtnText, styles.primaryBtnText]}
            />
            <AppButton
              text="Modify"
              borderWidth={1}
              useGradientBorder
              bgColor={COLORS.SURFACE}
              style={styles.medActionBtn}
              textStyle={[styles.smallBtnText, styles.primaryBtnText]}
            />
            <AppButton
              text="Stop"
              borderWidth={1}
              borderColor="#FF6B6B"
              bgColor="#FDECEC"
              style={styles.medActionBtn}
              textStyle={[styles.smallBtnText, styles.alertBtnText]}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.cardOuter}
          innerStyle={styles.sectionInner}
        >
          <Text style={styles.sectionTitle}>Imaging Panel</Text>
          <View style={styles.imagingRow}>
            <Image source={XrayImage} style={styles.imagingThumb} />
            <View style={styles.imagingInfo}>
              <Text style={styles.medName}>Chest X-Ray</Text>
              <Text style={styles.medDose}>Normal</Text>
            </View>
            <AppButton
              text="View Report"
              borderWidth={1}
              useGradientBorder
              bgColor={COLORS.SURFACE}
              style={styles.mediumActionBtn}
              textStyle={[styles.smallBtnText, styles.primaryBtnText]}
            />
          </View>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientSnapshot;

const MedFilterChip = ({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={styles.medFilterPress}>
    {selected ? (
      <DeltaBadge
        icon={null}
        value={title}
        height={40}
        bgColor="#CBF0FF"
        darkShadowColor="#C8CBCC"
        lightShadowColor="#FFFFFF99"
        textColor={COLORS.PRIMARY}
        textStyle={styles.selectedMedFilterText}
      />
    ) : (
      <NeumorphicCard
        outerStyle={styles.medFilterOuter}
        innerStyle={styles.medFilterInner}
        borderRadius={17}
      >
        <Text style={styles.inactiveTabText}>{title}</Text>
      </NeumorphicCard>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 20, gap: 12 },
  header: {
    marginTop: 6,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backWrap: { position: "absolute", left: 0, top: 0 },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  cardOuter: { width: "100%", marginTop: 16 },
  topActionListWrap: { marginBottom: 12 },
  topCardInner: { borderRadius: 12 },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  patientDetails: { flex: 1 },
  patientName: { color: COLORS.TEXT_DARK, fontSize: 16, fontWeight: "500" },
  patientMetaRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  patientMeta: { color: COLORS.TEXT_70, fontSize: 14, fontWeight: "400" },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
  },
  topActionList: {
    marginTop: 10,
    paddingVertical: 2,
    paddingLeft: 12,
    paddingRight: 0,
  },
  smallBtnText: { fontSize: 14, fontWeight: "500" },
  smallActionBtn: { height: 40, borderRadius: 20, paddingHorizontal: 14 },
  mediumActionBtn: { height: 40, borderRadius: 20, paddingHorizontal: 18 },
  medActionBtn: { height: 40, borderRadius: 20, flex: 1 },
  primaryBtnText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "500" },
  alertBtnText: { color: COLORS.ALERT },
  hSpace8: { width: 8 },
  warnInner: { borderRadius: 10, padding: 10 },
  warnRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  warnIcon: { color: COLORS.ALERT, fontSize: 12, fontWeight: "700" },
  warnText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "500" },
  warnTextBold: { color: COLORS.TEXT_80, fontSize: 14, fontWeight: "500" },
  sectionInner: { borderRadius: 10 },
  sectionTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  summaryText: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    lineHeight: 17,
    paddingHorizontal: 12,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginTop: 12,
    marginBottom: 4,
  },
  talkList: {
    marginTop: 12,
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 14,
  },
  talkListRow: { justifyContent: "space-between" },
  metricItemWrap: { width: "23%" },
  metricItemWrapWide: { width: "31.5%" },
  metricOuter: { width: "100%" },
  metricInner: { borderRadius: 8, paddingVertical: 8, alignItems: "center" },
  metricValue: { color: COLORS.TEXT_DARK, fontSize: 20, fontWeight: "600" },
  metricLabel: { color: COLORS.TEXT_60, fontSize: 10, marginTop: 2 },
  medTabs: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  medFilterPress: { flexShrink: 1 },
  medFilterOuter: {},
  medFilterInner: {
    borderRadius: 17,
    height: 34,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveTabText: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "500" },
  selectedMedFilterText: { fontSize: 12, fontWeight: "500" },
  medRow: {
    marginTop: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
  },
  medSeparator: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginHorizontal: 10,
  },
  medName: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: "500" },
  medDose: {
    color: COLORS.TEXT_80,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 1,
  },
  actionRow: {
    flex: 1,
    marginTop: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  imagingRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  imagingThumb: { width: 60, height: 60, borderRadius: 8 },
  imagingInfo: { flex: 1 },
});
