import React, { useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";

import ProfileAvatar from "../../../components/Auth/ProfileAvatar";
import SelectPharmacySheet, {
  type SelectListItem,
} from "../../../components/BottomSheets/SelectPharmacySheet";
import AppButton from "../../../components/Common/AppButton";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import OverlayImage from "../../../assets/images/imageBgShadow.png";
import DoctorTempImage from "../../../assets/images/tempImage/doctorTempImage.png";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import ImagingResultsIcon from "../../../assets/icons/imagingResults.svg";
import CheckedListPadIcon from "../../../assets/icons/checkedListPadIcon.svg";
import LabLocationPinIcon from "../../../assets/icons/labLocationPin.svg";
import RightArrowIcon from "../../../assets/icons/rightArrowIcon.svg";

const LOCATION_ITEMS: SelectListItem[] = [
  { id: "torrance-1", label: "Torrance Imaging Center" },
  { id: "torrance-2", label: "Torrance Imaging Center" },
  { id: "torrance-3", label: "Torrance Imaging Center" },
];

const Imaging = () => {
  const navigation = useNavigation<any>();
  const locationSheetRef = useRef<BSModal>(null);

  const [selectedLocationId, setSelectedLocationId] = useState<string | null>("torrance-2");
  const [locationName, setLocationName] = useState("Torrance Imaging Center");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
          <Text style={styles.headerTitle}>Imaging</Text>
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

        <Text style={styles.subGreeting}>What type of imaging do you need?</Text>

        <View style={styles.cardsBlock}>
          <NeumorphicCard
            outerStyle={styles.cardOuter}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.IMAGING_REQUEST)}
            activeOpacity={0.88}
          >
            <InnerShadowIcon
              icon={<CheckedListPadIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.cardTitle}>Imaging Request</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.cardInner}
            borderRadius={10}
            onPress={() => navigation.navigate(navigationStrings.IMAGING_RESULTS)}
            activeOpacity={0.88}
          >
            <InnerShadowIcon
              icon={<ImagingResultsIcon width={18} height={18} />}
              size={40}
              radius={20}
              surfaceColor={COLORS.INNER_SURFACE}
            />
            <Text style={styles.cardTitle}>Imaging Results</Text>
            <RightArrowIcon width={10} height={10} />
          </NeumorphicCard>

          <NeumorphicCard
            outerStyle={[styles.cardOuter, styles.cardGap]}
            innerStyle={styles.locationCardInner}
            borderRadius={10}
          >
            <View style={styles.locationLeft}>
              <InnerShadowIcon
                icon={<LabLocationPinIcon width={18} height={18} />}
                size={40}
                radius={20}
                surfaceColor={COLORS.INNER_SURFACE}
              />
              <Text style={styles.locationTitle} numberOfLines={1}>
                {locationName}
              </Text>
            </View>
            <AppButton
              activeOpacity={0.85}
              style={styles.changeBtn}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              text="Change"
              textStyle={styles.changeBtnText}
              onPress={() => locationSheetRef.current?.present()}
            />
          </NeumorphicCard>
        </View>
      </ScrollView>

      <SelectPharmacySheet
        ref={locationSheetRef}
        items={LOCATION_ITEMS}
        selectedId={selectedLocationId}
        title="Select Location"
        onConfirm={(id) => {
          setSelectedLocationId(id);
          const row = LOCATION_ITEMS.find((item) => item.id === id);
          if (row) setLocationName(row.label);
        }}
      />
    </SafeAreaView>
  );
};

export default Imaging;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 120,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 4 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
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
  avatarWrap: {
    alignItems: "center",
    marginTop: 26,
  },
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
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 115,
    resizeMode: "contain",
  },
  subGreeting: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  cardsBlock: {
    marginTop: 28,
  },
  cardOuter: {
    alignSelf: "stretch",
  },
  cardGap: {
    marginTop: 18,
  },
  cardInner: {
    height: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
  },
  locationCardInner: {
    minHeight: 64,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  locationLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  locationTitle: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
  },
  changeBtn: {
    width: 65,
    height: 28,
    borderRadius: 16,
  },
  changeBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
});
