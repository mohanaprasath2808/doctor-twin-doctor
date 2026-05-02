import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import NeumorphicCard from "../../components/Common/NeumorphicCard";
import IconComponent from "../../neomorphism/IconComponent";
import InnerShadowIcon from "../../neomorphism/InnerShadowIcon";
import { COLORS } from "../../constants/theme";
import navigationStrings from "../../constants/navigationStrings";
import LeftArrowIcon from "../../assets/icons/leftArrow.svg";
import EditPencilIcon from "../../assets/icons/editIcon.svg";
import PhoneIcon from "../../assets/icons/phoneIcon.svg";
import PhoneIconRed from "../../assets/icons/redPhoneIcon.svg";
import MailIcon from "../../assets/icons/mailBox.svg";
import LabLocationPin from "../../assets/icons/labLocationPin.svg";
import DoctorTempImage from "../../assets/images/tempImage/doctorTempImage.png";

const ICON_INNER = 18;

const MyProfile = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
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
          <Text style={styles.headerTitle}>My Profile</Text>
          <IconComponent
            icon={<EditPencilIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.navigate(navigationStrings.EDIT_PROFILE)}
          />
        </View>

        <NeumorphicCard
          outerStyle={styles.mainCardOuter}
          innerStyle={styles.mainCardInner}
          borderRadius={10}
          backgroundColor={COLORS.WHITE}
        >
          <View style={styles.profileHeader}>
            <Image source={DoctorTempImage} width={80} height={80} style={styles.avatarImage} />
            <Text style={styles.profileName}>Sarah Johnson</Text>
          </View>

          <View style={[styles.infoRow, { marginTop: 30 }]}>
            <InnerShadowIcon
              icon={<PhoneIcon width={ICON_INNER} height={ICON_INNER} />}
              size={40}
              radius={114}
            />
            <View style={styles.infoTextCol}>
              <Text style={styles.infoPrimary}>(555) 987-6543</Text>
              <Text style={styles.infoSubtitle}>Phone number</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <InnerShadowIcon
              icon={<MailIcon width={ICON_INNER} height={ICON_INNER} />}
              size={40}
              radius={114}
            />
            <View style={styles.infoTextCol}>
              <Text style={styles.infoPrimary}>sarah@example.com</Text>
              <Text style={styles.infoSubtitle}>Email address</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <InnerShadowIcon
              icon={<LabLocationPin width={20} height={20} />}
              size={40}
              radius={114}
            />
            <View style={styles.infoTextCol}>
              <Text style={styles.infoPrimary}>123 Main St</Text>
              <Text style={styles.infoSubtitle}>Anytown, CA</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.emergencyCardOuter}
          innerStyle={styles.emergencyCardInner}
          borderRadius={10}
          backgroundColor={COLORS.WHITE}
        >
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          <View style={styles.emergencyRow}>
            <InnerShadowIcon
              icon={<PhoneIconRed width={ICON_INNER} height={ICON_INNER} />}
              size={40}
              radius={114}
              surfaceColor={COLORS.CRITICAL_BG}
            />
            <View style={styles.infoTextCol}>
              <Text style={styles.emergencyName}>John Johnson</Text>
              <Text style={styles.emergencyPhone}>(555) 987-6543</Text>
            </View>
          </View>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    paddingBottom: 120,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 6 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  mainCardOuter: {
    marginTop: 30,
  },
  mainCardInner: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarOverlay: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 70,
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    resizeMode: "contain",
  },
  profileName: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.TEXT_PRIMARY_10,
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTextCol: {
    marginLeft: 12,
    flex: 1,
  },
  infoPrimary: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  infoSubtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  emergencyCardOuter: {
    marginTop: 16,
  },
  emergencyCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  emergencyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emergencyName: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  emergencyPhone: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
});

export default MyProfile;
