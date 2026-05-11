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
import OverlayImage from "../../../../assets/image/imageBgShadow.png";
import DoctorTempImage from "../../../../assets/image/tempImage/doctorTempImage.png";
import XrayImage from "../../../../assets/image/tempImage/xrayImage.png";

type ResultItem = {
  id: string;
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
};

type ResultSection = {
  id: "labs" | "radiology";
  title: string;
  type: "lab" | "radiology";
  data: ResultItem[];
};

const LAB_RESULTS: ResultItem[] = [
  { id: "a1c", title: "A1C — 8.1", subtitle: "1 month ago" },
  { id: "creatinine", title: "Creatinine — 1.5", subtitle: "1 month ago" },
  { id: "ldl", title: "LDL — 142", subtitle: "1 month ago" },
];

const RADIOLOGY_RESULTS: ResultItem[] = [
  { id: "xray", title: "Chest X-ray", subtitle: "1 month ago", image: XrayImage },
  { id: "colonoscopy", title: "Colonoscopy report", subtitle: "1 month ago", image: XrayImage },
];

const SECTIONS: ResultSection[] = [
  { id: "labs", title: "Labs", type: "lab", data: LAB_RESULTS },
  { id: "radiology", title: "Radiology", type: "radiology", data: RADIOLOGY_RESULTS },
];

const RecentResults = () => {
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
        <Text style={styles.headerTitle}>Recent Results</Text>
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

  const renderLabItem = ({ item }: { item: ResultItem }) => (
    <View style={styles.itemRow}>
      <InnerShadowIcon icon={<LabReportIcon width={18} height={18} />} size={40} />
      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderRadiologyItem = ({ item }: { item: ResultItem }) => (
    <View style={styles.itemRow}>
      <Image source={item.image ?? XrayImage} style={styles.radiologyImage} />
      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderSection = ({ item }: { item: ResultSection }) => (
    <NeumorphicCard outerStyle={styles.sectionOuter} innerStyle={styles.sectionInner} borderRadius={12}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        keyExtractor={(result) => result.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={item.type === "lab" ? renderLabItem : renderRadiologyItem}
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

export default RecentResults;

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
  radiologyImage: {
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

