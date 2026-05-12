import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../constants/theme";
import navigationStrings from "../../../../../constants/navigationStrings";
import IconComponent from "../../../../../neomorphism/IconComponent";
import NeumorphicCard from "../../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../../components/Auth/ProfileAvatar";
import NeumorphicInnerShadowCard from "../../../../../neomorphism/NeumorphicInnerShadowCard";
import BackIcon from "../../../../../assets/icon/backArrow.svg";
import EditIcon from "../../../../../assets/icon/editIcon.svg";
import OverlayImage from "../../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../../assets/image/tempImage/doctorTempImage.png";
import FakeIdImage from "../../../../../assets/image/tempImage/fakeID.png";

const Insurance = () => {
  const navigation = useNavigation<any>();

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
          <Text style={styles.headerTitle}>Insurance</Text>
          <IconComponent
            icon={<EditIcon width={16} height={16} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.navigate(navigationStrings.RECEPTION_EDIT_INSURANCE)}
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

        <NeumorphicCard outerStyle={styles.profileOuter} innerStyle={styles.profileInner} borderRadius={12}>
          <View style={styles.patientRow}>
            <Image source={DoctorTempImage} style={styles.patientImage} />
            <View style={styles.patientTextWrap}>
              <Text style={styles.patientName}>Emily Clark</Text>
              <Text style={styles.patientMeta}>Female • Age 45</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Member ID</Text>
              <Text style={styles.metaValue}>987654321</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Insurance Provider</Text>
              <Text style={styles.metaValue}>Blue Cross</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Group Number</Text>
              <Text style={styles.metaValue}>12345</Text>
            </View>
          </View>
        </NeumorphicCard>

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={12}>
          <Text style={styles.sectionTitle}>Insurance Card</Text>

          <Text style={styles.cardLabel}>Insurance Card (Front)</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.insuranceCardOuter}
            contentStyle={styles.insuranceCardInner}
          >
            <Image source={FakeIdImage} style={styles.insuranceCardImage} />
          </NeumorphicInnerShadowCard>

          <Text style={[styles.cardLabel, styles.backCardLabel]}>Insurance Card (Back)</Text>
          <NeumorphicInnerShadowCard
            borderRadius={12}
            containerStyle={styles.insuranceCardOuter}
            contentStyle={styles.insuranceCardInner}
          >
            <Image source={FakeIdImage} style={styles.insuranceCardImage} />
          </NeumorphicInnerShadowCard>
        </NeumorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insurance;

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
  profileOuter: {
    width: "100%",
    marginBottom: 18,
  },
  profileInner: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  patientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientTextWrap: {
    flex: 1,
    gap: 3,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  patientMeta: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  metaRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  metaItem: {
    flex: 1,
    gap: 4,
  },
  metaLabel: {
    fontSize: 11,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  metaValue: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  cardOuter: {
    width: "100%",
  },
  cardInner: {
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 8,
  },
  backCardLabel: {
    marginTop: 18,
  },
  insuranceCardOuter: {
    width: "100%",
  },
  insuranceCardInner: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  insuranceCardImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
