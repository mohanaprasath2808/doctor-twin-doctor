import React from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import ProfileAvatar from "../../../../components/Auth/ProfileAvatar";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import LabReportIcon from "../../../../assets/icon/labReportIcon.svg";
import CapsuleIcon from "../../../../assets/icon/capsuleIcon.svg";
import NurseIcon from "../../../../assets/icon/nurseIcon.svg";
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import XrayImage from "../../../../assets/image/tempImage/xrayImage.png";

type OrderItem = {
  id: string;
  title: string;
  subtitle: string;
  rightText?: string;
  image?: ImageSourcePropType;
};

type OrderSection = {
  id: "labs" | "imaging" | "medication" | "referrals";
  title: string;
  type: "lab" | "imaging" | "medication" | "referral";
  data: OrderItem[];
};

const SECTIONS: OrderSection[] = [
  {
    id: "labs",
    title: "Lab Orders",
    type: "lab",
    data: [
      { id: "cbc", title: "CBC", subtitle: "Priority Today", rightText: "Today" },
      {
        id: "cmp",
        title: "Comprehensive Metabolic Panel",
        subtitle: "Routine",
        rightText: "Today",
      },
    ],
  },
  {
    id: "imaging",
    title: "Imaging Orders",
    type: "imaging",
    data: [
      {
        id: "ultrasound",
        title: "Abnormal Ultrasound",
        subtitle: "Scheduled by Today",
        image: XrayImage,
      },
    ],
  },
  {
    id: "medication",
    title: "Medication Orders",
    type: "medication",
    data: [
      {
        id: "lipitor",
        title: "Lipitor 20 mg",
        subtitle: "Dosage: Take 1 night • 2 refills",
      },
      {
        id: "nephrology",
        title: "Nephrology Referral",
        subtitle: "Referred Clinic • Nearby • 6 months ago",
      },
    ],
  },
  {
    id: "referrals",
    title: "Referral Orders",
    type: "referral",
    data: [{ id: "me-ponn", title: "Me Ponn", subtitle: "Putaine", rightText: "Today" }],
  },
];

const OrderHub = () => {
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
        <Text style={styles.headerTitle}>Order Hub</Text>
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

      <Text style={styles.listeningText}>Dr.Twin Listening...</Text>
    </View>
  );

  const getOrderIcon = (type: OrderSection["type"]) => {
    switch (type) {
      case "medication":
        return <CapsuleIcon width={18} height={18} />;
      case "referral":
        return <NurseIcon width={18} height={18} />;
      default:
        return <LabReportIcon width={18} height={18} />;
    }
  };

  const renderOrderItem = (type: OrderSection["type"]) =>
    function OrderRow({ item }: { item: OrderItem }) {
      return (
        <View style={styles.itemRow}>
          {type === "imaging" ? (
            <Image source={item.image ?? XrayImage} style={styles.orderImage} />
          ) : (
            <InnerShadowIcon icon={getOrderIcon(type)} size={40} />
          )}

          <View style={styles.itemTextWrap}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>

          {!!item.rightText && <Text style={styles.rightText}>{item.rightText}</Text>}
        </View>
      );
    };

  const renderSection = ({ item }: { item: OrderSection }) => (
    <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner} borderRadius={12}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        keyExtractor={(order) => order.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={renderOrderItem(item.type)}
      />
    </NeumorphicCard>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <FlatList
        data={SECTIONS}
        keyExtractor={(section) => section.id}
        renderItem={renderSection}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={styles.sectionGap} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrderHub;

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
    paddingBottom: 22,
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
    paddingTop: 12,
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
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    fontFamily: "SF-Pro-Text-Bold",
  },
  sectionOuter: {
    width: "100%",
  },
  sectionInner: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Text-Bold",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    gap: 10,
  },
  itemTextWrap: {
    flex: 1,
    gap: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_DARK,
    fontFamily: "SF-Pro-Display-Semibold",
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  rightText: {
    fontSize: 12,
    color: COLORS.TEXT_60,
    fontFamily: "SF-Pro-Display-Regular",
  },
  orderImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.TEXT_20,
  },
  sectionGap: {
    height: 18,
  },
});

