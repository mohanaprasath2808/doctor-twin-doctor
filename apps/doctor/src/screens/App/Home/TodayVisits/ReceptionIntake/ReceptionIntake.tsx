import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import DoctorAvatar from "../../../../../components/Common/DoctorAvatar";
import InsightMessageCard from "../../../../../components/Common/InsightMessageCard";
import AppButton from "../../../../../components/Common/AppButton";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import RightArrowIcon from "../../../../../assets/icon/rightArrow.svg";
import TickIcon from "../../../../../assets/icon/tickIcon.svg";
import CardIcon from "../../../../../assets/icon/cardIcon.svg";
import LabReportIcon from "../../../../../assets/icon/labReportIcon.svg";
import PatientIcon from "../../../../../assets/icon/patientIcon.svg";
import WarningIcon from "../../../../../assets/icon/warningIcon.svg";
import ReportIcon from "../../../../../assets/icon/reportIcon.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";

type IntakeTile = {
  id: string;
  title: string;
  icon: React.ReactNode;
  routeName?: string;
};

const INTAKE_TILES: IntakeTile[] = [
  {
    id: "check-in",
    title: "Check-In",
    icon: <TickIcon width={18} height={18} />,
    routeName: navigationStrings.RECEPTION_CHECK_IN,
  },
  { id: "insurance", title: "Insurance", icon: <CardIcon width={18} height={18} /> },
  { id: "demographics", title: "Demograp...", icon: <LabReportIcon width={18} height={18} /> },
  { id: "patient-info", title: "Patient Info", icon: <PatientIcon width={18} height={18} /> },
  { id: "emergency", title: "Emergency", icon: <WarningIcon width={18} height={18} /> },
  { id: "forms", title: "Forms", icon: <ReportIcon width={18} height={18} /> },
];

const ReceptionIntake = () => {
  const navigation = useNavigation<any>();

  const renderHeader = () => (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <IconComponent
          icon={<BackIcon width={16} height={16} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Reception Intake</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ProfileAvatar
        overlaySource={OverlayImage}
        imageSource={DoctorTempImage}
        containerStyle={styles.avatarContainer}
        wrapperStyle={styles.avatarWrapper}
        overlayStyle={styles.avatarOverlay}
        imageStyle={styles.avatarImage}
      />

      <Text style={styles.greetingTitle}>Dr. Twin greeting the patient</Text>

      <View style={styles.messageRow}>
        <DoctorAvatar source={DoctorTempImage} imageSize={38} containerSize={44} />
        <InsightMessageCard
          title="Welcome to the Clinic"
          subTitle="How can I assist the patient today?"
          bgColor="#CBF0FF"
          style={styles.messageCard}
          titleStyle={styles.messageTitle}
          subTitleStyle={styles.messageSubtitle}
          titleSubTitleGap={4}
        />
      </View>
    </View>
  );

  const renderTile = ({ item }: { item: IntakeTile }) => (
    <View style={styles.tileCell}>
      <NeumorphicCard
        outerStyle={styles.tileOuter}
        innerStyle={styles.tileInner}
        borderRadius={14}
        onPress={item.routeName ? () => navigation.navigate(item.routeName) : undefined}
      >
        <View style={styles.tileLeft}>
          <InnerShadowIcon icon={item.icon} size={40} />
          <Text style={styles.tileText} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
        <RightArrowIcon width={10} height={10} />
      </NeumorphicCard>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <AppButton
        text="Adjust Orders"
        width="48%"
        height={50}
        borderRadius={25}
        borderWidth={1}
        borderColor={COLORS.PRIMARY}
        bgColor={COLORS.SURFACE}
        textStyle={styles.adjustButtonText}
        shadowStyle={styles.buttonShadow}
      />
      <ReusableButton
        title="Place Orders"
        width="48%"
        height={50}
        borderRadius={25}
        containerStyle={styles.placeButton}
        textStyle={styles.placeButtonText}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={INTAKE_TILES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderTile}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default ReceptionIntake;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerWrap: {
    paddingTop: 10,
    paddingBottom: 18,
    alignItems: "center",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    paddingTop: 8,
  },
  avatarWrapper: {
    width: 170,
    height: 170,
  },
  avatarOverlay: {
    borderRadius: 90,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  greetingTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  messageRow: {
    width: "100%",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  messageCard: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  messageSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.TEXT_70,
    fontFamily: "SF-Pro-Display-Regular",
  },
  gridRow: {
    gap: 14,
    marginBottom: 14,
  },
  tileCell: {
    flex: 1,
    maxWidth: "50%",
  },
  tileOuter: {
    width: "100%",
  },
  tileInner: {
    minHeight: 64,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tileLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tileText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  adjustButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  buttonShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  placeButton: {
    shadowColor: "#303DA3",
  },
  placeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
