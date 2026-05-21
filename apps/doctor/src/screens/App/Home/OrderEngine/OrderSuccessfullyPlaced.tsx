import React, { Fragment, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import DownArrow from "../../../../assets/icon/downArrow.svg";
import LockIcon from "../../../../assets/icon/lockIcon.svg";
import RightArrow from "../../../../assets/icon/rightArrow.svg";
import SelectedCheckBox from "../../../../assets/icon/selectedCheckBoxIcon.svg";
import GreenTickImage from "../../../../assets/image/greenTick.png";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import NeumorphicSwitch from "../../../../components/Common/NeumorphicSwitch";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const INSIGHT_TITLE = "Orders Successfully Submitted for Dr. Soliman";
const INSIGHT_SUB = "Here are the details.";
const REFERENCE_LOG = "Reference log GGH78292 23 Apr 2025 03:11 PM";

type AutoVariant = "check-down" | "check" | "notify-switch" | "follow-chevron";

type AutoRow = {
  id: string;
  variant: AutoVariant;
  label: string;
  sub?: string;
};

const AUTO_ROWS: AutoRow[] = [
  { id: "a1", variant: "check-down", label: "Saved to records" },
  { id: "a2", variant: "check", label: "To: Quest Diagnostics" },
  { id: "a3", variant: "check", label: "Radmet Imaging Center" },
  { id: "a4", variant: "notify-switch", label: "Patient Notified" },
  { id: "a5", variant: "follow-chevron", label: "Follow-Up reminder set", sub: "2 weeks" },
];

const OrderSuccessfullyPlaced = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;
  const [patientNotified, setPatientNotified] = useState(true);

  const onDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: navigationStrings.BOTTOM_NAVIGATION }],
    });
  };

  const renderAutoRow = (row: AutoRow) => {
    const leadIcon =
      row.variant === "notify-switch" || row.variant === "follow-chevron" ? (
        <InnerShadowIcon size={40} radius={20} icon={<LockIcon width={16} height={16} />} />
      ) : (
        <InnerShadowIcon size={40} radius={20} icon={<SelectedCheckBox width={18} height={18} />} />
      );

    const trail =
      row.variant === "check-down" ? (
        <DownArrow width={14} height={14} style={styles.trailIcon} />
      ) : row.variant === "notify-switch" ? (
        <NeumorphicSwitch value={patientNotified} onValueChange={setPatientNotified} />
      ) : row.variant === "follow-chevron" ? (
        <RightArrow width={14} height={14} style={styles.trailIcon} />
      ) : null;

    return (
      <View style={styles.autoRow}>
        {leadIcon}
        <View style={styles.autoRowMid}>
          <Text style={styles.autoLabel}>{row.label}</Text>
          {row.sub ? <Text style={styles.autoSub}>{row.sub}</Text> : null}
        </View>
        {trail}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 16 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle} numberOfLines={2}>
            Order Successfully Placed
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={GreenTickImage}
          containerStyle={styles.heroAvatar}
          wrapperStyle={styles.heroWrapper}
          overlayStyle={styles.heroOverlay}
          imageStyle={styles.heroImage}
        />

        <Text style={styles.successTitle}>Orders successfully placed</Text>
        <Text style={styles.successSub}>Today · 2 days ago</Text>

        <NeumorphicCard outerStyle={styles.patientCardOuter} innerStyle={styles.patientCardInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
            <View style={styles.patientTextCol}>
              <Text style={styles.drName}>Dr. Soliman</Text>
              <Text style={styles.patientMeta}>John Miller • Age 45 • Female</Text>
            </View>
          </View>
          <View style={styles.insightRow}>
            <InnerShadowIcon size={40} radius={20} icon={<SelectedCheckBox width={18} height={18} />} />
            <InsightMessageCard
              title={INSIGHT_TITLE}
              subTitle={INSIGHT_SUB}
              bgColor="#E8F8EF"
              style={styles.insightCard}
              titleStyle={styles.insightTitle}
              subTitleStyle={styles.insightSub}
              titleSubTitleGap={4}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.autoCardOuter} innerStyle={styles.autoCardInner} borderRadius={12}>
          <Text style={styles.autoSectionTitle}>Auto Actions</Text>
          {AUTO_ROWS.map((row, index) => (
            <Fragment key={row.id}>
              {renderAutoRow(row)}
              {index < AUTO_ROWS.length - 1 ? <View style={styles.rowDivider} /> : null}
            </Fragment>
          ))}
        </NeumorphicCard>

        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            <ReusableButton title="Done" height={52} borderRadius={26} onPress={onDone} />
          </View>
          <View style={styles.actionCell}>
            <AppButton
              text="View in Chart"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={[styles.outlineLabel, styles.outlineColor]}
              onPress={() => navigation.navigate(navigationStrings.FULL_PATIENT_CHART)}
            />
          </View>
        </View>

        <Text style={styles.referenceText}>{REFERENCE_LOG}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSuccessfullyPlaced;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    textAlign: "center",
  },
  headerSpacer: { width: 40, height: 40 },
  heroAvatar: {
    alignSelf: "center",
    marginTop: 12,
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
  successTitle: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
  },
  successSub: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  patientCardOuter: {
    width: "100%",
    marginTop: 20,
  },
  patientCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  patientTextCol: {
    flex: 1,
    minWidth: 0,
  },
  drName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
  },
  patientMeta: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_70,
  },
  insightRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  insightCard: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.GREEN,
    lineHeight: 18,
  },
  insightSub: {
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  autoCardOuter: {
    width: "100%",
    marginTop: 16,
  },
  autoCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  autoSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
    marginBottom: 8,
  },
  autoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  autoRowMid: {
    flex: 1,
    minWidth: 0,
  },
  autoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  autoSub: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  trailIcon: {
    opacity: 0.55,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 4,
    marginLeft: 50,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
    alignItems: "stretch",
  },
  actionCell: {
    flex: 1,
    minWidth: 0,
  },
  outlineLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  outlineColor: {
    color: COLORS.PRIMARY_DARK,
  },
  referenceText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.TEXT_60,
  },
});
