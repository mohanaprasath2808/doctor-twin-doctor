import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import NurseIcon from "../../../../assets/icon/nurseIcon.svg";
import ReportIcon from "../../../../assets/icon/reportIcon.svg";
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
  "Dr. Soliman, based on John Miller's visit, I recommend the following lab and imaging orders. Would you like to proceed?";

type LabLine = {
  id: string;
  title: string;
  sub: string;
  rightLabel: string;
};

type ImagingLine = {
  id: string;
  imageSource: ImageSourcePropType;
  title: string;
  sub: string;
};

type MedLine = {
  id: string;
  name: string;
  dose?: string;
  subSegments: string[];
};

type ReferralLine = {
  id: string;
  title: string;
  titleSuffix: string;
  sub: string;
};

const LAB_LINES: LabLine[] = [
  {
    id: "cbc",
    title: "CBC",
    sub: "Priority Today",
    rightLabel: "Today",
  },
  {
    id: "cmp",
    title: "Comprehensive Metabolic Panel",
    sub: "Routine",
    rightLabel: "Today",
  },
];

const IMAGING_LINES: ImagingLine[] = [
  {
    id: "us",
    imageSource: XrayThumb,
    title: "Abdominal Ultrasound",
    sub: "Scheduled by Today",
  },
];

const MED_LINES: MedLine[] = [
  {
    id: "lipitor",
    name: "Lipitor",
    dose: "20 mg",
    subSegments: ["Dosage: Take 1 night", "2 refills"],
  },
  {
    id: "neph",
    name: "Nephrology Referral",
    subSegments: ["Referred Clinic:", "Nearby", "6 months ago"],
  },
];

const REFERRAL_LINES: ReferralLine[] = [
  {
    id: "cardio",
    title: "Me Ponn",
    titleSuffix: "Today",
    sub: "Putaine",
  },
];

function RowSeparator() {
  return <View style={styles.rowSep} />;
}

const OrderEngine = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const bottomPad = 16 + insets.bottom;

  const renderLabLine: ListRenderItem<LabLine> = useCallback(
    ({ item }) => (
      <View style={styles.orderRow}>
        <InnerShadowIcon size={40} radius={20} icon={<LabReportIcon width={18} height={18} />} />
        <View style={styles.orderMid}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={[styles.orderSub, styles.orderSubPlain]}>{item.sub}</Text>
        </View>
        <Text style={styles.orderRight}>{item.rightLabel}</Text>
      </View>
    ),
    [],
  );

  const renderImagingLine: ListRenderItem<ImagingLine> = useCallback(
    ({ item }) => (
      <View style={styles.orderRow}>
        <Image source={item.imageSource} style={styles.orderThumb} resizeMode="cover" />
        <View style={styles.orderMid}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={[styles.orderSub, styles.orderSubPlain]}>{item.sub}</Text>
        </View>
        <RightArrow width={14} height={14} style={styles.chevron} />
      </View>
    ),
    [],
  );

  const renderMedLine: ListRenderItem<MedLine> = useCallback(
    ({ item }) => (
      <View style={styles.orderRow}>
        <InnerShadowIcon
          size={40}
          radius={20}
          icon={
            item.id === "lipitor" ? (
              <CapsuleIcon width={18} height={18} />
            ) : (
              <NurseIcon width={18} height={18} />
            )
          }
        />
        <View style={styles.orderMid}>
          <View style={styles.titleRow}>
            <Text style={styles.orderTitle}>{item.name}</Text>
            {item.dose ? <Text style={styles.medDose}>{item.dose}</Text> : null}
          </View>
          <View style={styles.orderSubRow}>
            {item.subSegments.map((segment, index) => (
              <View key={`${segment}-${index}`} style={styles.orderSubPart}>
                {index > 0 ? <View style={styles.metaDot} /> : null}
                <Text style={styles.orderSub}>{segment}</Text>
              </View>
            ))}
          </View>
        </View>
        <RightArrow width={14} height={14} style={styles.chevron} />
      </View>
    ),
    [],
  );

  const renderReferralLine: ListRenderItem<ReferralLine> = useCallback(
    ({ item }) => (
      <View style={styles.orderRow}>
        <InnerShadowIcon size={40} radius={20} icon={<ReportIcon width={18} height={18} />} />
        <View style={styles.orderMid}>
          <View style={styles.titleRow}>
            <Text style={styles.orderTitle}>{item.title}</Text>
            <Text style={styles.titleSuffix}>{item.titleSuffix}</Text>
          </View>
          <Text style={[styles.orderSub, styles.orderSubPlain]}>{item.sub}</Text>
        </View>
        <RightArrow width={14} height={14} style={styles.chevron} />
      </View>
    ),
    [],
  );

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

        <NeumorphicCard
          outerStyle={styles.patientCardOuter}
          innerStyle={styles.patientCardInner}
          borderRadius={12}
        >
          <View style={styles.patientRow}>
            <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
            <View style={styles.patientTextCol}>
              <Text style={styles.drName}>Dr.Soliman</Text>
              <View style={styles.patientMetaRow}>
                <Text style={styles.patientMeta}>John Miller</Text>
                <View style={styles.metaDot} />
                <Text style={styles.patientMeta2}>Age 45</Text>
                <View style={styles.metaDot} />
                <Text style={styles.patientMeta2}>Female</Text>
              </View>
            </View>
          </View>
          <Text style={styles.visitMeta}>Level 1 follow-up visit</Text>
          <Text style={styles.visitMeta2}>2 months ago</Text>
        </NeumorphicCard>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.heroAvatar}
          wrapperStyle={styles.heroWrapper}
          overlayStyle={styles.heroOverlay}
          imageStyle={styles.heroImage}
        />

        <Text style={styles.heroCaption}>Dr.Twin coordinating order management</Text>

        <View style={styles.messageRow}>
          <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
          <InsightMessageCard
            title={INSIGHT_TITLE}
            bgColor="#E1F5FE"
            style={styles.messageCard}
            titleStyle={styles.insightTitle}
            titleSubTitleGap={6}
          />
        </View>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Lab Orders</Text>
          <FlatList
            data={LAB_LINES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={renderLabLine}
            ItemSeparatorComponent={RowSeparator}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Imaging Orders</Text>
          <FlatList
            data={IMAGING_LINES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={renderImagingLine}
            ItemSeparatorComponent={RowSeparator}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Medication Orders</Text>
          <FlatList
            data={MED_LINES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={renderMedLine}
            ItemSeparatorComponent={RowSeparator}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.categoryOuter}
          innerStyle={styles.categoryInner}
          borderRadius={12}
        >
          <Text style={styles.categoryTitle}>Referral Orders</Text>
          <FlatList
            data={REFERRAL_LINES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            removeClippedSubviews={false}
            renderItem={renderReferralLine}
            ItemSeparatorComponent={RowSeparator}
          />
        </NeumorphicCard>

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
              textStyle={[styles.outlineLabel]}
              onPress={() => navigation.navigate(navigationStrings.ORDER_UPDATED)}
            />
          </View>
          <View style={styles.actionCell}>
            <ReusableButton
              title="Place Orders"
              height={52}
              borderRadius={26}
              textStyle={[styles.outlineLabel2]}
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
    fontFamily: "SF-Pro-Text-Semibold",
  },
  headerSpacer: { width: 40, height: 40 },
  patientCardOuter: {
    width: "100%",
    marginTop: 24,
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
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  patientMeta: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
  },
  patientMeta2: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_70,
  },
  patientMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TEXT_50,
  },
  visitMeta: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_70,
  },
  visitMeta2: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "SF-Pro-Text-Regular",
    color: COLORS.TEXT_60,
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
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Medium",
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
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Regular",
    lineHeight: 18,
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
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SF-Pro-Text-Medium",
    color: COLORS.TEXT_DARK,
    marginBottom: 17,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  orderThumb: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  orderMid: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 6,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Medium",
  },
  titleSuffix: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Regular",
  },
  medDose: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  orderSub: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Text-Regular",
  },
  orderSubPlain: {
    marginTop: 3,
  },
  orderSubRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    marginTop: 3,
  },
  orderSubPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  orderRight: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Text-Regular",
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
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "500",
    color: COLORS.PRIMARY,
  },
  outlineLabel2: {
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "500",
    color: COLORS.WHITE,
  },
});
