import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import ReusableButton from "../../../../../neomorphism/ReusableButton";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import EditIcon from "../../../../../assets/icon/editIcon.svg";
import MailIcon from "../../../../../assets/icon/emailIconBlue.svg";
import CalendarIcon from "../../../../../assets/icon/calendarBlueIcon.svg";
import LabLocationIcon from "../../../../../assets/icon/labLocationIcon.svg";
import CallIcon from "../../../../../assets/icon/callIcon.svg";
import CallIconRed from "../../../../../assets/icon/callIconRed.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";

type DetailRow = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const DEMOGRAPHIC_ROWS: DetailRow[] = [
  {
    id: "phone",
    title: "(555) 987-6543",
    subtitle: "Phone number",
    icon: <CallIcon width={18} height={18} />,
  },
  {
    id: "dob",
    title: "05 / 12 / 1969",
    subtitle: "Date of Birth",
    icon: <CalendarIcon width={18} height={18} />,
  },
  {
    id: "email",
    title: "sarah@example.com",
    subtitle: "Email address",
    icon: <MailIcon width={18} height={18} />,
  },
  {
    id: "address",
    title: "123 Main St",
    subtitle: "Anytown, CA",
    icon: <LabLocationIcon width={18} height={18} />,
  },
];

const Demographics = () => {
  const navigation = useNavigation<any>();

  const renderDetailRow = (item: DetailRow, isLast: boolean) => (
    <View key={item.id}>
      <View style={styles.detailRow}>
        <InnerShadowIcon
          icon={item.icon}
          size={40}
        />
        <View style={styles.detailTextWrap}>
          <Text style={styles.detailTitle}>{item.title}</Text>
          <Text style={styles.detailSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.divider} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <IconComponent
            icon={<BackIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Demographics</Text>
          <IconComponent
            icon={<EditIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.navigate(navigationStrings.RECEPTION_EDIT_DEMOGRAPHICS)}
          />
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarContainer}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatarImage}
        />

        <Text style={styles.listeningText}>Dr.Twin Listening...</Text>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.patientImage} />
            <Text style={styles.patientName}>Sarah Johnson</Text>
          </View>
          <View style={styles.divider} />
          {DEMOGRAPHIC_ROWS.map((row, index) =>
            renderDetailRow(row, index === DEMOGRAPHIC_ROWS.length - 1),
          )}
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.emergencyOuter} innerStyle={styles.emergencyInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.emergencyRow}>
            <InnerShadowIcon
              icon={<CallIconRed width={18} height={18} />}
              size={40}
              backgroundColor="#FFE9E9"
              darkShadowColor="#F0C7C7"
              shadowColor="#F0C7C7"
            />
            <View style={styles.emergencyTextWrap}>
              <Text style={styles.emergencyName}>John Johnson</Text>
              <Text style={styles.emergencyPhone}>(555) 987-6543</Text>
            </View>
          </View>
        </NeumorphicCard>

        <ReusableButton
          title="Confirm"
          height={50}
          borderRadius={25}
          containerStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          onPress={() =>
            navigation.navigate(navigationStrings.RECEPTION_INTAKE_COMPLETED, {
              title: "Confirmed",
              buttonText: "Back to Intake",
              backRouteName: navigationStrings.RECEPTION_INTAKE,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Demographics;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
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
  avatarContainer: {
    paddingTop: 10,
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
  listeningText: {
    marginTop: 8,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,

  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Medium",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailTextWrap: {
    flex: 1,
    gap: 3,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    lineHeight: 19,
  },
  detailSubtitle: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  divider: {
    marginVertical: 10,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  emergencyOuter: {
    width: "100%",
    marginTop: 18,
  },
  emergencyInner: {
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
    marginBottom: 12,
  },
  confirmButton: {
    marginTop: 28,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SF-Pro-Display-Semibold",
  },
  emergencyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emergencyTextWrap: {
    flex: 1,
    gap: 3,
  },
  emergencyName: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Regular",
  },
  emergencyPhone: {
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    fontWeight: "500",
    fontFamily: "SF-Pro-Display-Semibold",
  },
});
