import React, { useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import AppButton from "../../../components/Common/AppButton";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import DesktopIcon from "../../../assets/icons/desktopIcon.svg";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import ReusableButton from "../../../neomorphism/ReusableButton";

type TagFilter = "lab" | "imaging" | "insurance" | "other";

const TAG_FILTERS: { key: TagFilter; label: string }[] = [
  { key: "lab", label: "Lab" },
  { key: "imaging", label: "Imaging" },
  { key: "insurance", label: "Insurance" },
  { key: "other", label: "Other" },
];

const UploadCenter = () => {
  const navigation = useNavigation<any>();
  const [selectedTag, setSelectedTag] = useState<TagFilter>("lab");

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
          <Text style={styles.headerTitle}>Upload Center</Text>
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

        <Text style={styles.subGreeting}>You can upload external records here.</Text>

        <Text style={styles.sectionLabel}>Upload Document</Text>
        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.uploadCardInner} borderRadius={10}>
          <DesktopIcon width={22} height={22} />
          <Text style={styles.uploadHint}>Upload document</Text>
          <AppButton
            text="Upload"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.uploadBtnText}
            style={styles.uploadBtn}
            onPress={() => undefined}
          />
        </NeumorphicCard>

        <NeumorphicCard outerStyle={[styles.cardOuter, styles.tagsOuter]} innerStyle={styles.tagsInner} borderRadius={10}>
          <Text style={styles.tagsTitle}>Tags</Text>
          <FlatList
            data={TAG_FILTERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.filtersRow}
            ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
            style={styles.filtersList}
            renderItem={({ item }) => (
              <FilterChip
                title={item.label}
                selected={item.key === selectedTag}
                onPress={() => setSelectedTag(item.key)}
                height={40}
                borderRadius={20}
                style={styles.filterPressable}
                selectedTextStyle={styles.filterSelectedText}
                textStyle={styles.filterText}
              />
            )}
          />
        </NeumorphicCard>


      </ScrollView>
      <View style={styles.bottomActions}>
        <View style={styles.btnHalf}>
          <AppButton
            text="Request My Records"
            borderWidth={1}
            borderColor={COLORS.PRIMARY}
            bgColor={COLORS.SURFACE}
            textStyle={styles.secondaryText}
            style={styles.actionBtn}
            onPress={() => navigation.navigate(navigationStrings.REQUEST_RECORDS)}
          />
        </View>
        <View style={styles.btnHalf}>
          <ReusableButton
            title="Send Records"
            containerStyle={styles.actionBtn}
            onPress={() => undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadCenter;

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
  headerSpacer: { width: 40, height: 40 },
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
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  sectionLabel: {
    marginTop: 18,
    marginLeft: 2,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  cardOuter: {
    width: "100%",
    marginTop: 8,
  },
  uploadCardInner: {
    minHeight: 112,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  uploadHint: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  uploadBtn: {
    width: 70,
    height: 28,
    borderRadius: 17,
  },
  uploadBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  tagsOuter: {
    marginTop: 16,
  },
  tagsInner: {
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },
  tagsTitle: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  filtersList: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  filtersRow: {
    paddingHorizontal: 12,
    paddingRight: 8,
    alignItems: "center",
  },
  filterSeparator: {
    width: 10,
  },
  filterPressable: {},
  filterText: {
    color: COLORS.TEXT_PRIMARY_60,
    fontSize: 14,
    fontWeight: "500",
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "600",
  },
  bottomActions: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  btnHalf: {
    flex: 1,
    minWidth: 0,
  },
  actionBtn: {
    height: 48,
    borderRadius: 24,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
});
