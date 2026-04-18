import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../../constants/theme";
import IconComponent from "../../../../neomorphism/IconComponent";
import InnerShadowIcon from "../../../../neomorphism/InnerShadowIcon";
import NeumorphicCard from "../../../../components/Common/NeumorphicCard";
import AppButton from "../../../../components/Common/AppButton";
import InputField from "../../../../neomorphism/InputField";
import BackIcon from "../../../../assets/icon/backArrow.svg";
import CalendarIcon from "../../../../assets/icon/calendarIcon.svg";
import ScheduleIcon from "../../../../assets/icon/scheduleIcon.svg";
import MessageIcon from "../../../../assets/icon/messageIcon.svg";
import RightArrowIcon from "../../../../assets/icon/rightArrow.svg";
import ZoomCallIcon from "../../../../assets/icon/zoomCallIcon.svg";
import { openGoogleMapsByCoords } from "../../../../constants/contant";
const EventDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const showMap = route?.params?.showMap ?? true;
  const title = "Staff Meeting";
  const date = "24 Mar 2026";
  const time = "02:00 PM - 03:00 PM";
  const location = "Chennai, Tamil Nadu";
  const locationCoords = { latitude: 13.0827, longitude: 80.2707 };
  const [description, setDescription] = useState("Discuss weekly updates");
  const canShowMap = showMap && !!locationCoords;

  const onOpenGoogleMaps = async () => {
    if (!locationCoords) return;
    await openGoogleMapsByCoords(locationCoords.latitude, locationCoords.longitude);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.header}>
        <View style={styles.backWrap}>
          <IconComponent
            icon={<BackIcon width={18} height={18} />}
            width={40}
            height={40}
            radius={20}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text style={styles.headerTitle}>Event Details</Text>
      </View>

      <View style={styles.content}>
        <NeumorphicCard
          outerStyle={styles.detailsOuter}
          innerStyle={styles.detailsInner}
          borderRadius={14}
        >
          <Text style={styles.eventTitle}>{title}</Text>

          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<CalendarIcon width={20} height={20} />}
              size={40}
            />
            <View>
              <Text style={styles.detailMainText}>{date}</Text>
              <Text style={styles.detailLabel}>Date</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <InnerShadowIcon
              icon={<ScheduleIcon width={20} height={20} />}
              size={36}
            />
            <View>
              <Text style={styles.detailMainText}>{time}</Text>
              <Text style={styles.detailLabel}>Time</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.locationRow}>
            <View style={styles.detailRow}>
              <InnerShadowIcon
                icon={<MessageIcon width={20} height={20} />}
                size={36}
              />
              <View>
                <Text style={styles.detailMainText}>{location}</Text>
                <Text style={styles.detailLabel}>Location</Text>
              </View>
            </View>
            <IconComponent
              icon={<ZoomCallIcon width={16} height={16} />}
              width={30}
              height={30}
              radius={15}
              onPress={() => { }}
            />
          </View>
        </NeumorphicCard>

        <NeumorphicCard
          outerStyle={styles.descriptionOuter}
          innerStyle={styles.descriptionInner}
          borderRadius={14}
        >
          <Text style={styles.descriptionTitle}>Description</Text>
          <InputField
            value={description}
            onChangeText={setDescription}
            editable={true}
            borderRadius={10}
            minHeight={38}
            containerStyle={styles.descriptionInputContainer}
            style={styles.descriptionText}
          />
        </NeumorphicCard>

        {canShowMap && (
          <NeumorphicCard
            outerStyle={styles.mapOuter}
            innerStyle={styles.mapInner}
            borderRadius={14}
          >
            <Text style={styles.mapTitle}>Map</Text>
            <Pressable style={styles.mapPreview} onPress={onOpenGoogleMaps}>
              <Text style={styles.mapPreviewText}>Open in Google Maps</Text>
            </Pressable>
          </NeumorphicCard>
        )}
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <AppButton
            text="Delete event"
            borderWidth={1}
            borderColor={COLORS.ALERT}
            bgColor={COLORS.ALERT_LIGHT}
            textStyle={styles.deleteText}
            style={styles.actionButton}
            onPress={() => { }}
          />
        </View>
        <View style={styles.buttonHalf}>
          <AppButton
            text="Edit event"
            borderWidth={1}
            borderColor={COLORS.PRIMARY_DARK}
            bgColor={COLORS.SURFACE}
            textStyle={styles.editText}
            style={styles.actionButton}
            onPress={() => { }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: {
    marginTop: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  backWrap: {
    position: "absolute",
    left: 16,
    top: 0,
  },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  content: { paddingHorizontal: 16, paddingTop: 30, gap: 18 },
  detailsOuter: { width: "100%" },
  detailsInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  eventTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  detailMainText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "500" },
  detailLabel: { color: COLORS.TEXT_60, fontSize: 12, fontWeight: "400" },
  separator: {
    height: 1,
    backgroundColor: COLORS.TEXT_10,
    marginVertical: 14,
    marginHorizontal: 10,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  descriptionOuter: { width: "100%", marginTop: 10 },
  descriptionInner: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  descriptionTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  descriptionInputContainer: { marginTop: 0 },
  descriptionText: { color: COLORS.TEXT_DARK, fontSize: 14, fontWeight: "400" },
  mapOuter: { width: "100%" },
  mapInner: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  mapTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  mapPreview: {
    height: 140,
    borderRadius: 10,
    backgroundColor: "#E8EDF3",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPreviewText: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonRow: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingBottom: 25,
    flexDirection: "row",
    gap: 12,
  },
  buttonHalf: { flex: 1 },
  actionButton: { height: 48, borderRadius: 24 },
  deleteText: { color: COLORS.ALERT, fontSize: 16, fontWeight: "500" },
  editText: { color: COLORS.PRIMARY_DARK, fontSize: 16, fontWeight: "500" },
});

export default EventDetails;
