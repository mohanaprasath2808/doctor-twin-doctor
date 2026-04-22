import React from "react";
import {
  Image,
  FlatList,
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

const APPOINTMENTS = [
  {
    id: "1",
    datetime: "Mon, Apr 30 – 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic \u00b7 Torrance, CA",
  },
  {
    id: "2",
    datetime: "Mon, Apr 30 – 3:00 PM",
    doctor: "Follow-up with Dr. Shahinaz Soliman",
    clinic: "Soliman Care Clinic \u00b7 Torrance, CA",
  },
];

const Appointments = () => {
  const navigation = useNavigation<any>();
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
      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.85} style={styles.backButton} onPress={() => navigation.goBack()}>
          <LeftArrowIcon width={26} height={26} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>Appointments</Text>
        </View>
        <View style={styles.headerRightSpacer} />
      </View>

      <View style={styles.tabsRow}>
        <TouchableOpacity activeOpacity={0.9} style={styles.upcomingTabTouchable}>
          <LinearGradient
            colors={["#5ED9EC", "#14B8D4"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.upcomingTab}
          >
            <Text style={styles.upcomingTabText}>Upcoming</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={styles.pastTab}>
          <Text style={styles.pastTabText}>Past</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={APPOINTMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 8 : 16,
    paddingHorizontal: 16,
  },
  headerTitleWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  headerRightSpacer: {
    width: 40,
    height: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.18,
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },
  tabsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
  },
  upcomingTabTouchable: {
    borderRadius: 114,
    shadowColor: "#3F97B2",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  upcomingTab: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 114,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  upcomingTabText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.WHITE,
  },
  pastTab: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SURFACE,
    shadowColor: "#C8CBCC",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    ...Platform.select({
      android: { elevation: 3 },
    }),
  },
  pastTabText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.TEXT_PRIMARY_80,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 24,
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
});

export default Appointments;