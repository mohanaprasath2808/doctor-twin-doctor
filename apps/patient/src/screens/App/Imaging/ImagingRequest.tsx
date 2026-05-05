import React, { useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal as BSModal } from "@gorhom/bottom-sheet";

import SelectPharmacySheet, {
  type SelectListItem,
} from "../../../components/BottomSheets/SelectPharmacySheet";
import AppButton from "../../../components/Common/AppButton";
import FilterChip from "../../../components/Common/FilterChip";
import NeumorphicCard from "../../../components/Common/NeumorphicCard";
import { COLORS } from "../../../constants/theme";
import navigationStrings from "../../../constants/navigationStrings";
import IconComponent from "../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../neomorphism/InnerShadowIcon";
import InputField from "../../../neomorphism/InputField";
import ReusableButton from "../../../neomorphism/ReusableButton";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import NotificationIcon from "../../../assets/icons/notificationIcon.svg";
import LabLocationPinIcon from "../../../assets/icons/labLocationPin.svg";

type ImagingTypeFilter = "xray" | "mri" | "ct" | "other";

const IMAGING_TYPE_FILTERS: { key: ImagingTypeFilter; label: string }[] = [
  { key: "xray", label: "X-Ray" },
  { key: "mri", label: "MRI" },
  { key: "ct", label: "CT Scan" },
  { key: "other", label: "Others" },
];

const LOCATION_ITEMS: SelectListItem[] = [
  { id: "torrance-1", label: "Torrance Imaging Center" },
  { id: "torrance-2", label: "Torrance Imaging Center" },
  { id: "torrance-3", label: "Torrance Imaging Center" },
];

const ImagingRequest = () => {
  const navigation = useNavigation<any>();
  const locationSheetRef = useRef<BSModal>(null);

  const [selectedType, setSelectedType] = useState<ImagingTypeFilter>("xray");
  const [reason, setReason] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>("torrance-2");
  const [locationName, setLocationName] = useState("Torrance Imaging Center");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconComponent
            icon={<LeftArrowIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Imaging Request</Text>
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

        <NeumorphicCard outerStyle={styles.cardOuter} innerStyle={styles.cardInner} borderRadius={10}>
          <Text style={styles.sectionTitle}>Type</Text>
          <FlatList
            data={IMAGING_TYPE_FILTERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.filtersRow}
            ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
            style={styles.filtersList}
            renderItem={({ item }) => (
              <FilterChip
                title={item.label}
                selected={item.key === selectedType}
                onPress={() => setSelectedType(item.key)}
                height={40}
                borderRadius={20}
                style={styles.filterPressable}
                selectedTextStyle={styles.filterSelectedText}
                textStyle={styles.filterText}
              />
            )}
          />
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={[styles.cardOuter, styles.cardGap]}
          innerStyle={styles.reasonCardInner}
          borderRadius={10}
        >
          <Text style={styles.sectionTitle}>Reason</Text>
          <Text style={styles.fieldLabel}>Reason</Text>
          <InputField
            value={reason}
            onChangeText={setReason}
            placeholder="Enter reason"
            multiline
            numberOfLines={5}
            minHeight={120}
            borderRadius={14}
            containerStyle={styles.reasonInput}
          />
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

        <View style={styles.bottomActions}>
          <View style={styles.btnHalf}>
            <AppButton
              activeOpacity={0.85}
              width="100%"
              height={48}
              borderRadius={24}
              borderWidth={1}
              borderColor={COLORS.PRIMARY}
              bgColor={COLORS.SURFACE}
              text="Schedule Imaging"
              textStyle={styles.scheduleText}
              onPress={() => undefined}
            />
          </View>
          <View style={styles.btnHalf}>
            <ReusableButton
              title="Directions"
              height={48}
              borderRadius={24}
              width="100%"
              containerStyle={styles.directionsBtnWrap}
              onPress={() => undefined}
            />
          </View>
        </View>
      </View>

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

export default ImagingRequest;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  cardOuter: {
    marginTop: 20,
    width: "100%",
  },
  cardGap: {
    marginTop: 16,
  },
  cardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  filtersList: {
  },
  filtersRow: {
    paddingRight: 8,
    paddingVertical: 10,
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
  reasonCardInner: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  fieldLabel: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_60,
  },
  reasonInput: {
    marginTop: 6,
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
    lineHeight: 18,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "500",
  },
  changeBtn: {
    width: 72,
    height: 32,
    borderRadius: 16,
  },
  changeBtnText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: "500",
  },
  bottomActions: {
    marginTop: "auto",
    marginBottom: 18,
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  btnHalf: {
    flex: 1,
    minWidth: 0,
  },
  scheduleText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "600",
  },
  directionsBtnWrap: {
    height: 48,
  },
});
