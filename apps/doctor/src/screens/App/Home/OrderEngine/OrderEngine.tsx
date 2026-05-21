import React, { Fragment, ReactNode } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import PrimaryDocIcon from "../../../../assets/icon/primaryDocIcon.svg";
import RightArrow from "../../../../assets/icon/rightArrow.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import XrayThumb from "../../../../assets/image/tempImage/xrayImage.png";
import { COLORS } from "../../../../constants/theme";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

const INSIGHT_TITLE =
  "Dr. Soliman, based on John Miller's visit, I recommend the following lab and imaging orders.";
const INSIGHT_SUB = "Would you like to proceed?";

type OrderLine = {
  id: string;
  icon: ReactNode;
  title: string;
  sub: string;
  rightLabel?: string;
  showChevron?: boolean;
};

const LAB_LINES: OrderLine[] = [
  {
    id: "cbc",
    icon: <LabReportIcon width={18} height={18} />,
    title: "CBC",
    sub: "Priority Today",
    rightLabel: "Today",
  },
  {
    id: "cmp",
    icon: <LabReportIcon width={18} height={18} />,
    title: "Comprehensive Metabolic Panel",
    sub: "Routine",
    rightLabel: "Today",
  },
];

const IMAGING_LINES: OrderLine[] = [
  {
    id: "us",
    icon: (
      <Image source={XrayThumb} style={{ width: 22, height: 22, borderRadius: 4 }} resizeMode="cover" />
    ),
    title: "Abdominal Ultrasound",
    sub: "Scheduled by Today",
    showChevron: true,
  },
];

const MED_LINES: OrderLine[] = [
  {
    id: "lipitor",
    icon: <CapsuleIcon width={18} height={18} />,
    title: "Lipitor 20 mg",
    sub: "Dosage: Take 1 nightly • 2 refills",
    showChevron: true,
  },
];

const REFERRAL_LINES: OrderLine[] = [
  {
    id: "neph",
    icon: <PrimaryDocIcon width={18} height={18} />,
    title: "Nephrology Referral",
    sub: "Referred Clinic • Nearby • 6 months ago",
    showChevron: true,
  },
];

function OrderRow({
  icon,
  title,
  sub,
  rightLabel,
  showChevron,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  rightLabel?: string;
  showChevron?: boolean;
}) {
  return (
    <View style={styles.orderRow}>
      <InnerShadowIcon size={40} radius={20} icon={icon} />
      <View style={styles.orderMid}>
        <Text style={styles.orderTitle}>{title}</Text>
        <Text style={styles.orderSub}>{sub}</Text>
      </View>
      {rightLabel ? <Text style={styles.orderRight}>{rightLabel}</Text> : null}
      {showChevron ? <RightArrow width={14} height={14} style={styles.chevron} /> : null}
    </View>
  );
}

function OrderCategoryCard({ title, lines }: { title: string; lines: OrderLine[] }) {
  return (
    <NeumorphicCard outerStyle={styles.categoryOuter} innerStyle={styles.categoryInner} borderRadius={12}>
      <Text style={styles.categoryTitle}>{title}</Text>
      {lines.map((line, index) => (
        <Fragment key={line.id}>
          <OrderRow
            icon={line.icon}
            title={line.title}
            sub={line.sub}
            rightLabel={line.rightLabel}
            showChevron={line.showChevron}
          />
          {index < lines.length - 1 ? <View style={styles.rowSep} /> : null}
        </Fragment>
      ))}
    </NeumorphicCard>
  );
}

const OrderEngine = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 12 }]}
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
          <Text style={styles.headerTitle}>Order Engine</Text>
          <View style={styles.headerSpacer} />
        </View>

        <NeumorphicCard outerStyle={styles.patientCardOuter} innerStyle={styles.patientCardInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
            <View style={styles.patientTextCol}>
              <Text style={styles.drName}>Dr. Soliman</Text>
              <Text style={styles.patientMeta}>John Miller • Age 45 • Female</Text>
              <Text style={styles.visitMeta}>
                Level 1 follow-up visit <Text style={styles.visitMetaDot}> · </Text>2 months ago
              </Text>
            </View>
          </View>
        </NeumorphicCard>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.heroAvatar}
          wrapperStyle={styles.heroWrapper}
          overlayStyle={styles.heroOverlay}
          imageStyle={styles.heroImage}
        />

        <Text style={styles.heroCaption}>Dr. Twin coordinating order management</Text>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
          <InsightMessageCard
            title={INSIGHT_TITLE}
            subTitle={INSIGHT_SUB}
            bgColor="#E1F5FE"
            style={styles.messageCard}
            titleStyle={styles.insightTitle}
            subTitleStyle={styles.insightSub}
            titleSubTitleGap={6}
          />
        </View>

        <OrderCategoryCard title="Lab Orders" lines={LAB_LINES} />
        <OrderCategoryCard title="Imaging Orders" lines={IMAGING_LINES} />
        <OrderCategoryCard title="Medication Orders" lines={MED_LINES} />
        <OrderCategoryCard title="Referral Orders" lines={REFERRAL_LINES} />

        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            <AppButton
              text="Adjust Orders"
              width="100%"
              height={52}
              borderRadius={26}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              textStyle={[styles.outlineLabel, styles.outlineColor]}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.actionCell}>
            <ReusableButton
              title="Place Orders"
              height={52}
              borderRadius={26}
              onPress={() => navigation.navigate(navigationStrings.ORDER_SUCCESSFULLY_PLACED)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderEngine;

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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: {
    width: "100%",
    marginTop: 16,
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
    color: COLORS.TEXT_DARK,
  },
  visitMeta: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  visitMetaDot: {
    color: COLORS.TEXT_40,
  },
  heroAvatar: {
    alignSelf: "center",
    marginTop: 20,
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
  heroCaption: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  messageRow: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  messageCard: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    lineHeight: 20,
  },
  insightSub: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    lineHeight: 20,
  },
  categoryOuter: {
    width: "100%",
    marginTop: 14,
  },
  categoryInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.TEXT_DARK,
    marginBottom: 10,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  orderMid: {
    flex: 1,
    minWidth: 0,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
  },
  orderSub: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
  },
  orderRight: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.TEXT_70,
  },
  chevron: {
    marginLeft: 4,
  },
  rowSep: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 8,
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
});
