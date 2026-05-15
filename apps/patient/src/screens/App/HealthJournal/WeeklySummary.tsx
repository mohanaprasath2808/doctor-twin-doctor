import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import AppointmentsRemindersIcon from "../../../assets/icons/calendarWithClockIcon.svg";
import DoctorIcon from "../../../assets/icons/doctorBlueIcon.svg";
import HospitalIcon from "../../../assets/icons/hospitalIcon.svg";
import TickIcon from "../../../assets/icons/tickIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

type SummaryRow = {
  id: string;
  icon: React.ReactNode;
  primary: string;
  secondary?: string;
};

const THIS_WEEK_ROWS: SummaryRow[] = [
  {
    id: "bp",
    icon: <AppointmentsRemindersIcon width={18} height={18} />,
    primary: "Stable",
    secondary: "Blood Pressure",
  },
  {
    id: "weight",
    icon: <DoctorIcon width={18} height={18} />,
    primary: "1.2 lb",
    secondary: "Weight",
  },
  {
    id: "glucose",
    icon: <HospitalIcon width={18} height={18} />,
    primary: "Controlled",
    secondary: "Glucose",
  },
];

const HIGHLIGHT_ROWS: SummaryRow[] = [
  { id: "h1", icon: <TickIcon width={18} height={18} />, primary: "BP improving" },
  { id: "h2", icon: <TickIcon width={18} height={18} />, primary: "Weight reduced" },
  { id: "h3", icon: <TickIcon width={18} height={18} />, primary: "Glucose steady" },
];

const FOOTER_BTN_HEIGHT = 48;

const WeeklySummary = () => {
  const navigation = useNavigation<any>();

  const renderRow = (row: SummaryRow, showDivider: boolean) => (
    <View key={row.id}>
      {showDivider ? <View style={styles.divider} /> : null}
      <View style={styles.row}>
        <InnerShadowIcon
          icon={row.icon}
          size={40}
          radius={20}
          surfaceColor={COLORS.INNER_SURFACE}
        />
        <View style={styles.rowTextWrap}>
          <Text style={styles.rowPrimary}>{row.primary}</Text>
          {row.secondary ? <Text style={styles.rowSecondary}>{row.secondary}</Text> : null}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconComponent
              icon={<LeftArrowIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Weekly Summary</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ProfileAvatar
            overlaySource={OverlayImage}
            imageSource={DoctorTempImage}
            containerStyle={styles.avatarWrap}
            wrapperStyle={styles.avatarWrapper}
            overlayStyle={styles.avatarOverlay}
            imageStyle={styles.avatar}
          />

          <NeumorphicCard
            outerStyle={styles.sectionOuter}
            innerStyle={styles.sectionInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>This week</Text>
            {THIS_WEEK_ROWS.map((row, index) => renderRow(row, index > 0))}
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.sectionOuter, styles.sectionGap]}
            innerStyle={styles.sectionInner}
            borderRadius={10}
          >
            <Text style={styles.sectionTitle}>Highlights</Text>
            {HIGHLIGHT_ROWS.map((row, index) => renderRow(row, index > 0))}
          </NeumorphicCard>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton
            text="Share with Doctor"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            width="100%"
            height={FOOTER_BTN_HEIGHT}
            borderRadius={24}
            textStyle={styles.shareButtonText}
            onPress={() => undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
  },
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
  sectionOuter: {
    marginTop: 16,
    width: "100%",
  },
  sectionGap: {
    marginTop: 14,
  },
  sectionInner: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  rowTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  rowPrimary: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  rowSecondary: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 8 : 12,
    backgroundColor: COLORS.SURFACE,
  },
  shareButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default WeeklySummary;
