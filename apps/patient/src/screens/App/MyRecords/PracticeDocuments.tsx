import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";
import MyRecordsIcon from "../../../assets/icons/myRecords.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";

const DOCUMENT_ROWS = [
  { id: "clinic", label: "Clinic Policies" },
  { id: "privacy", label: "Privacy Notice" },
  { id: "instructions", label: "Patient Instructions" },
];

const PracticeDocuments = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
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
          <Text style={styles.headerTitle}>Practice Documents</Text>
          <View style={styles.notifWrap}>
            <IconComponent
              icon={<NotificationIcon width={18} height={18} />}
              width={40}
              height={40}
              radius={20}
              onPress={() => navigation.navigate(navigationStrings.NOTIFICATIONS)}
            />
            <View style={styles.notifDot} />
          </View>
        </View>

        <ProfileAvatar
          overlaySource={OverlayImage}
          imageSource={DoctorTempImage}
          containerStyle={styles.avatarWrap}
          wrapperStyle={styles.avatarWrapper}
          overlayStyle={styles.avatarOverlay}
          imageStyle={styles.avatar}
        />

        <Text style={styles.subGreeting}>Here are helpful clinic documents.</Text>

        <View style={styles.cardsBlock}>
          {DOCUMENT_ROWS.map((row) => (
            <NeumorphicCard
              key={row.id}
              outerStyle={styles.cardOuter}
              innerStyle={styles.cardInner}
              borderRadius={10}
              onPress={() => navigation.navigate(navigationStrings.VIEW_PDF)}
            >
              <InnerShadowIcon
                icon={<MyRecordsIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <Text style={styles.cardTitle}>{row.label}</Text>
              <RightArrowIcon width={10} height={10} />
            </NeumorphicCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PracticeDocuments;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.TEXT_PRIMARY },
  notifWrap: {
    width: 40,
    height: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.CRITICAL,
    borderWidth: 1.5,
    borderColor: COLORS.SURFACE,
  },
  avatarWrap: { alignItems: "center", marginTop: 20 },
  avatarWrapper: {
    width: 210,
    height: 210,
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
  avatar: { width: 124, height: 124, borderRadius: 115, resizeMode: "contain" },
  subGreeting: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardsBlock: {
    marginTop: 18,
    gap: 12,
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    minHeight: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
});
