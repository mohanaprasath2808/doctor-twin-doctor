import React, { useMemo, useState } from "react";
import {
  Image,
  FlatList,
  Pressable,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../constants/theme";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import AppointmentDummy from "../../../assets/images/tempImage/appointmentDummy.png";
import navigationStrings from "../../../constants/navigationStrings";
import FilterChip from "../../../components/Common/FilterChip";
import DeltaBadge from "../../../components/Common/DeltaBadge";
import IconComponent from "../../../neomorphism/IconComponent";

const APPOINTMENTS = [
  {
    id: "1",
    status: "upcoming" as const,
    datetime: "Mon, Apr 30 – 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic \u00b7 Torrance, CA",
  },
  {
    id: "2",
    status: "upcoming" as const,
    datetime: "Tue, May 7 – 11:30 AM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic \u00b7 Torrance, CA",
  },
  {
    id: "3",
    status: "past" as const,
    datetime: "Thu, Apr 04 – 2:00 PM",
    doctor: "Consult with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic \u00b7 Torrance, CA",
  },
];

const APPOINTMENT_FILTERS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
] as const;

type AppointmentFilterKey = (typeof APPOINTMENT_FILTERS)[number]["key"];

const Appointments = () => {
  const navigation = useNavigation<any>();
  const [selectedFilter, setSelectedFilter] = useState<AppointmentFilterKey>("upcoming");

  const visibleAppointments = useMemo(() => {
    return APPOINTMENTS.filter((item) => item.status === selectedFilter);
  }, [selectedFilter]);

  const renderAppointmentCard = ({ item }: { item: (typeof APPOINTMENTS)[number] }) => (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <Image source={AppointmentDummy} style={styles.avatar} />
        <View style={styles.infoTextWrap}>
          <Text style={styles.datetimeText}>{item.datetime}</Text>
          <Text style={styles.doctorText}>{item.doctor}</Text>
          <Text style={styles.clinicText}>{item.clinic}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity activeOpacity={0.85} style={styles.scheduleTouchable} onPress={() => navigation.navigate(navigationStrings.SCHEDULE_STEP_1)}>
          <View style={styles.scheduleInner}>
            <Text style={styles.scheduleText} numberOfLines={1}>
              Schedule Appointment
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} style={styles.detailsTouchable}>
          <LinearGradient
            colors={["#14B8D4", "#0E7490"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.detailsGradient}
          >
            <Text style={styles.detailsText}>View Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconComponent
          icon={<LeftArrowIcon width={18} height={18} />}
          width={40}
          height={40}
          radius={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={APPOINTMENT_FILTERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        extraData={selectedFilter}
        contentContainerStyle={styles.filtersRow}
        ItemSeparatorComponent={() => <View style={styles.filterSeparator} />}
        style={styles.filtersList}
        renderItem={({ item }) =>
          item.key === selectedFilter ? (
            <Pressable
              onPress={() => setSelectedFilter(item.key)}
              style={styles.filterPressable}
            >
              <DeltaBadge
                value={item.label}
                width={96}
                height={40}
                radius={20}
                bgColor="#5ED9EC"
                darkShadowColor="#3F97B2"
                textColor={COLORS.WHITE}
                textStyle={styles.filterSelectedText}
              />
            </Pressable>
          ) : (
            <FilterChip
              title={item.label}
              selected={false}
              onPress={() => setSelectedFilter(item.key)}
              height={40}
              borderRadius={20}
              style={styles.filterPressable}
              textStyle={styles.filterText}
            />
          )
        }
      />

      <FlatList
        data={visibleAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No appointments found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 8 : 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_PRIMARY,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  filtersList: {
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 16,
  },
  filtersRow: {
    alignItems: "center",
    paddingRight: 8,
  },
  filterSeparator: {
    width: 10,
  },
  filterPressable: {},
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY_80,
  },
  filterSelectedText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    gap: 20,
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 382,
    alignSelf: "center",
    minHeight: 142,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 13,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 114,
    resizeMode: "cover",
  },
  infoTextWrap: {
    marginLeft: 10,
    flex: 1,
  },
  datetimeText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
  },
  doctorText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY,
  },
  clinicText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_70,
  },
  actionsRow: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  scheduleTouchable: {
    flex: 1,
    borderRadius: 60,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  scheduleInner: {
    height: 40,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#0E7490",
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  scheduleText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: "#0E7490",
    textAlign: "center",
  },
  detailsTouchable: {
    flex: 1,
    borderRadius: 60,
    shadowColor: "#34718D",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 5 },
    }),
  },
  detailsGradient: {
    height: 40,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  detailsText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.WHITE,
    textAlign: "center",
  },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY_70,
    fontWeight: "500",
  },
});

export default Appointments;