import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import EcgPadIcon from "../../../../assets/icon/ecgPadIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import XrayImage from "../../../../assets/image/tempImage/xrayImage.png";
import { COLORS } from "../../../../constants/theme";
import { getInitials } from "../../../../constants/contant";
import navigationStrings from "../../../../constants/navigationStrings";
import AppButton from "../../../../components/Common/AppButton";
import DoctorAvatar from "../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../components/Common/InsightMessageCard";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import ReusableButton from "../../../../neomorphism/ReusableButton";

type ImagingResultItem = {
  id: string;
  name: string;
  study: string;
  time: string;
  finding: string;
};

const IMAGING_RESULTS: ImagingResultItem[] = [
  {
    id: "1",
    name: "David Johnson",
    study: "Renal US",
    time: "10:23 PM",
    finding: "Left Kidney mass",
  },
  {
    id: "2",
    name: "David Johnson",
    study: "Renal US",
    time: "10:23 PM",
    finding: "Left Kidney mass",
  },
  {
    id: "3",
    name: "David Johnson",
    study: "Renal US",
    time: "10:23 PM",
    finding: "Left Kidney mass",
  },
];

const ImagingResults = () => {
  const navigation = useNavigation<any>();

  const renderResultItem = ({ item }: { item: ImagingResultItem }) => (
    <NeumorphicCard
      outerStyle={styles.resultCardOuter}
      innerStyle={styles.resultCardInner}
      borderRadius={12}
    >
      <View style={styles.resultTopRow}>
        <View style={styles.resultLeft}>
          <InnerShadowIcon
            size={40}
            icon={<Text style={styles.initials}>{getInitials(item.name)}</Text>}
          />
          <View style={styles.resultTextCol}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text style={styles.studyMeta}>
              {item.study} • {item.time}
            </Text>
          </View>
        </View>
        <Image source={XrayImage} style={styles.thumbnail} resizeMode="cover" />
      </View>
      <View style={styles.findingRow}>
        <EcgPadIcon width={16} height={16} />
        <Text style={styles.findingText}>{item.finding}</Text>
      </View>
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Imaging Results</Text>
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

        <View style={styles.messageRow}>
          <DoctorAvatar
            source={DoctorTempImage}
            imageSize={38}
            containerSize={44}
          />
          <InsightMessageCard
            style={styles.messageCard}
            title="Dr.Soliman,"
            subTitle="I've received abnormal imaging results. Shall I call the patients to schedule follow-up or show these to a staff member?"
            bgColor="#CBF0FF"
            titleStyle={styles.insightTitle}
            subTitleStyle={styles.insightSubTitle}
            titleSubTitleGap={4}
          />
        </View>

        <FlatList
          data={IMAGING_RESULTS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={renderResultItem}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          style={styles.resultsList}
        />

        <View style={styles.actionsRow}>
          <AppButton
            activeOpacity={0.8}
            style={styles.actionBtnBase}
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            text="Schedule Urgent Visit"
            textStyle={styles.outlineBtnText}
            onPress={() =>
              navigation.navigate(navigationStrings.URGENT_VISIT_SCHEDULING)
            }
          />
          <ReusableButton
            title="Delegate to staff"
            height={48}
            borderRadius={24}
            containerStyle={styles.delegateBtn}
            textStyle={styles.delegateBtnText}
            onPress={() => navigation.navigate(navigationStrings.REQUESTED_ASSIGNED)}
          />
        </View>

        <AppButton
          activeOpacity={0.8}
          style={styles.erBtn}
          borderWidth={1}
          borderColor={COLORS.ALERT}
          bgColor={COLORS.ALERT_LIGHT}
          text="Send to ER"
          textStyle={styles.erBtnText}
          onPress={() => navigation.navigate(navigationStrings.SEND_TO_ER)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImagingResults;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  header: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: { width: 40, height: 40 },
  avatarWrap: { alignItems: "center", marginTop: 4 },
  avatarWrapper: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 115,
  },
  avatar: { width: 150, height: 150, borderRadius: 115, resizeMode: "contain" },
  messageRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  messageCard: { flex: 1 },
  insightTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  insightSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_80,
    fontFamily: "SF-Pro-Display-Regular",
    lineHeight: 20,
  },
  resultsList: {
    marginTop: 16,
    padding: 2,
  },
  cardSeparator: { height: 14 },
  resultCardOuter: { width: "100%" },
  resultCardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  resultTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 10,
  },
  resultTextCol: { flex: 1, minWidth: 0 },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  studyMeta: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "400",
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  thumbnail: {
    width: 56,
    height: 44,
    borderRadius: 8,
  },
  findingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  findingText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  actionsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  actionBtnBase: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    minWidth: 0,
  },
  outlineBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Display-Medium",
    textAlign: "center",
  },
  delegateBtn: {
    flex: 1,
    minWidth: 0,
  },
  delegateBtnText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Medium",
  },
  erBtn: {
    marginTop: 14,
    height: 48,
    borderRadius: 24,
  },
  erBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.ALERT,
    fontFamily: "SF-Pro-Display-Medium",
  },
});
